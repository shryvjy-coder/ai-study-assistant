"""Pure offline tests. These must NEVER call Gemini or download NCERT PDFs."""
import json
from datetime import date
from pathlib import Path
import tempfile
import unittest

from free_queue import (
    CHAPTERS, eligible, identity, initial, load, reconcile, save, status,
    collected, MAX_BLOCKS,
)
from pipeline import select_chapters


class FreeChapterQueueTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.manifest = self.root / "manifest.json"
        self.notes = self.root / "notes.json"
        chapters = [
            {"number": number, "title": f"Official chapter {number}",
             "pdf": f"https://ncert.nic.in/textbook/pdf/iemh1{number:02}.pdf"}
            for number in range(1, 15)
        ]
        self.manifest.write_text(json.dumps({"chapters": chapters}), encoding="utf-8")
        self.notes.write_text(json.dumps({"chapters": chapters}), encoding="utf-8")
        self.code = "a" * 40
        self.ident = identity(self.manifest, self.notes, "gemini-3.8-flash", self.code)
        self.path = self.root / "queue.json"
        self.day = date(2026, 10, 12)

    def report(self, number, status="processed"):
        result = {"chapter_number": number, "chapter_title": f"Official chapter {number}",
                  "status": status}
        if status == "processed":
            result.update(candidate_lessons=[], verified_gaps=[])
        else:
            result.update(error="Offline source test", candidate_lessons=[])
        return result

    def test_schedule_all_pending_and_count_only_approved_manifest_numbers(self):
        q = initial(self.ident)
        self.assertEqual(eligible(q, self.day), list(CHAPTERS))
        self.assertEqual(status(q), "paused")
        self.assertEqual(len(q["items"]), 10)

    def test_independent_blocked_chapters_do_not_delay_other_chapters(self):
        q = initial(self.ident)
        reconcile(q, [5, 6, 7], [self.report(5, "blocked"),
                               self.report(6), self.report(7, "paused")], self.day)
        self.assertEqual(q["items"]["6"]["status"], "processed")
        self.assertEqual(q["items"]["5"]["retry_day"], "2026-10-14")
        self.assertNotIn(5, eligible(q, date(2026, 10, 13)))
        self.assertNotIn(6, eligible(q, date(2026, 10, 13)))
        self.assertIn(7, eligible(q, date(2026, 10, 13)))
        self.assertIn(5, eligible(q, date(2026, 10, 14)))

    def test_successful_results_survive_resume_without_repeat_calls(self):
        q = initial(self.ident)
        reconcile(q, [5, 6], [self.report(5)], self.day)
        save(self.path, q)
        revived = load(self.path, self.ident)
        self.assertNotIn(5, eligible(revived, self.day))
        self.assertIn(6, eligible(revived, self.day))
        self.assertEqual([x["chapter_number"] for x in collected(revived)], [5])

    def test_three_blocked_attempts_require_human_attention(self):
        q = initial(self.ident)
        for day in [date(2026, 10, 12), date(2026, 10, 14), date(2026, 10, 18)]:
            reconcile(q, [5], [self.report(5, "blocked")], day)
        self.assertEqual(q["items"]["5"]["blocks"], MAX_BLOCKS)
        self.assertNotIn(5, eligible(q, date(2026, 10, 31)))
        self.assertEqual(status(q), "needs_attention")

    def test_complete_means_ten_verified_chapters_not_ten_attempts(self):
        q = initial(self.ident)
        reconcile(q, list(CHAPTERS), [self.report(n) for n in CHAPTERS[:-1]], self.day)
        self.assertEqual(status(q), "paused")
        reconcile(q, [14], [self.report(14)], date(2026, 10, 13))
        self.assertEqual(status(q), "complete")
        self.assertEqual(len(collected(q)), 10)
        self.assertEqual(eligible(q, date(2026, 10, 15)), [])

    def test_reject_replays_of_another_source_or_model(self):
        save(self.path, initial(self.ident))
        different = dict(self.ident, model="gemini-other-model")
        with self.assertRaisesRegex(ValueError, "changed"):
            load(self.path, different)
        different = dict(self.ident, code_sha="b" * 40)
        with self.assertRaisesRegex(ValueError, "changed"):
            load(self.path, different)

    def test_reject_unknown_duplicate_or_unverified_results(self):
        q = initial(self.ident)
        with self.assertRaisesRegex(ValueError, "Unexpected"):
            reconcile(q, [5], [self.report(8)], self.day)
        with self.assertRaisesRegex(ValueError, "Unexpected"):
            reconcile(q, [5], [self.report(5), self.report(5)], self.day)
        with self.assertRaisesRegex(ValueError, "excessive"):
            reconcile(q, [6], [dict(self.report(6),
                candidate_lessons=[{}, {}, {}])], self.day)

    def test_manual_upgrade_only_repins_clean_state_without_model_calls(self):
        from argparse import Namespace
        from unittest.mock import patch
        from multiday_state import prepare, new_state
        old = new_state(code_sha="a"*40, notes_sha="c"*40,
                        model="gemini-3.8-flash", budget=6, run_id=12)
        writes = []
        config = Namespace(
            repo="example/studyai", event="workflow_dispatch",
            operation="upgrade", commit_sha="b"*40, run_id=13,
            model="gemini-3.8-flash", budget=6,
            output=self.root/"actions-output.txt",
            summary=self.root/"actions-summary.md",
        )
        with patch("multiday_state.load", return_value=(old,"etag")), \
             patch("multiday_state.branch_sha", return_value="c"*40), \
             patch("multiday_state.save", side_effect=lambda repo, data, **kwargs:
                   writes.append(data)):
            prepare(config)
        self.assertEqual(writes[-1]["automation_sha"], "b"*40)
        self.assertEqual(writes[-1]["notes_sha"], "c"*40)
        self.assertIsNone(writes[-1]["last_attempt_utc_day"])
        self.assertIn("run=false", config.output.read_text())
        old["resume_run_id"] = 111
        with patch("multiday_state.load", return_value=(old,"etag")):
            with self.assertRaisesRegex(ValueError, "migration"):
                prepare(config)

    def test_allow_selected_chapter_lists_but_reject_duplicates(self):
        self.assertEqual(select_chapters("5,7,8", list(range(1, 15))), [5, 7, 8])
        with self.assertRaisesRegex(ValueError, "duplicate"):
            select_chapters("5,5", list(range(1, 15)))
        with self.assertRaisesRegex(ValueError, "exist"):
            select_chapters("5,18", list(range(1, 15)))


if __name__ == "__main__":
    unittest.main()
