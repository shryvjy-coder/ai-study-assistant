#!/usr/bin/env python3
"""Offline contracts for manually armed, multi-day NCERT audit automation."""
import copy
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch
from argparse import Namespace
import json

from multiday_state import (
    new_state, validate_state, claim_day, report_state, advance, stop,
    prepare, CHAPTERS, MAX_CONSECUTIVE_PAUSES
)

MAIN_SHA = "a" * 40
NOTES_SHA = "b" * 40
OTHER_SHA = "c" * 40


def state():
    return new_state(
        code_sha=MAIN_SHA, notes_sha=NOTES_SHA,
        model="gemini-3.8-flash", budget=6, run_id=100,
    )


class MultiDayTests(unittest.TestCase):
    def test_workflow_requires_opt_in_and_keeps_publish_draft_only(self):
        workflow = (Path(__file__).resolve().parents[2] /
                    ".github/workflows/ncert-class9-multiday.yml").read_text()
        self.assertIn('options: [status, start, stop]', workflow)
        self.assertIn('cron: "15 9 * * *"', workflow)
        self.assertIn('default: "18"', workflow)
        self.assertIn('"18"', workflow)
        self.assertIn("if: steps.control.outputs.run == 'true'", workflow)
        self.assertIn("if: steps.notes-base.outcome == 'success'", workflow)
        self.assertIn("steps.review.outputs.exit_code == '0'", workflow)
        self.assertIn("gh pr create --draft", workflow)
        self.assertIn("resume_run_id", workflow)
        self.assertNotIn("gh pr merge", workflow)
        self.assertNotIn("\\${", workflow)
        self.assertIn("--exit-code", workflow)

    def test_start_arms_without_claiming_today_or_calling_model(self):
        s = state()
        self.assertTrue(s["enabled"])
        self.assertEqual(s["status"], "armed")
        self.assertEqual(s["chapters"], list(range(5, 15)))
        self.assertIsNone(s["last_attempt_utc_day"])
        self.assertIsNone(s["resume_run_id"])
        self.assertEqual(s["daily_budget"], 6)
        self.assertEqual(new_state(code_sha=MAIN_SHA, notes_sha=NOTES_SHA,
                                   model="gemini-3.8-flash", budget=18,
                                   run_id=101)["daily_budget"], 18)

    def test_start_rejects_untrusted_settings(self):
        bad = [
            {"code_sha": "notsha"},
            {"notes_sha": "truncated"},
            {"model": "unknown-expensive-model"},
            {"budget": 0},
            {"budget": 21},
            {"budget": 1.5},
            {"run_id": 0},
        ]
        for patch_value in bad:
            with self.subTest(value=patch_value), self.assertRaises(ValueError):
                new_state(**{
                    "code_sha": MAIN_SHA, "notes_sha": NOTES_SHA,
                    "model": "gemini-3.8-flash", "budget": 6,
                    "run_id": 100, **patch_value,
                })

    def test_armed_schedule_upgrades_to_18_after_safe_claim(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            original = state()
            config = Namespace(
                repo="example/studyai", event="schedule", operation="status",
                commit_sha=OTHER_SHA, model="gemini-3.8-flash",
                budget=18, run_id=201, output=root/"outputs",
                summary=root/"summary",
            )
            written = []
            with patch("multiday_state.load", return_value=(original, "etag")), \
                 patch("multiday_state.branch_sha", return_value=NOTES_SHA), \
                 patch("multiday_state.save", side_effect=lambda repo, new, **kwargs: written.append(new)):
                prepare(config)
            upgraded = written[-1]
            self.assertEqual(upgraded["daily_budget"], 18)
            self.assertEqual(upgraded["inflight_run_id"], 201)
            self.assertEqual(upgraded["last_run_id"], 201)
            self.assertEqual(upgraded["automation_sha"], MAIN_SHA)
            self.assertEqual(upgraded["notes_sha"], NOTES_SHA)
            self.assertEqual(upgraded["started_by_run_id"], 100)
            self.assertEqual(upgraded["progress_stage_count"], 0)
            self.assertIn("run=true", config.output.read_text())
            self.assertIn("budget=18", config.output.read_text())
            self.assertIn("code_sha="+MAIN_SHA, config.output.read_text())

    def test_existing_resume_run_does_not_silently_change_saved_budget(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            previous = state()
            previous["status"] = "paused"
            previous["last_run_id"] = 200
            previous["resume_run_id"] = 200
            config = Namespace(
                repo="example/studyai", event="schedule", operation="status",
                commit_sha=OTHER_SHA, model="gemini-3.8-flash",
                budget=18, run_id=201, output=root/"outputs",
                summary=root/"summary",
            )
            writes=[]
            with patch("multiday_state.load", return_value=(previous, "etag")), \
                 patch("multiday_state.branch_sha", return_value=NOTES_SHA), \
                 patch("multiday_state.save", side_effect=lambda repo, new, **kwargs: writes.append(new)):
                prepare(config)
            self.assertEqual(writes[-1]["daily_budget"], 6)
            self.assertEqual(writes[-1]["resume_run_id"], 200)
            self.assertIn("budget=6", config.output.read_text())

    def test_failed_scheduled_claim_cannot_increase_budget(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            previous = state()
            config = Namespace(
                repo="example/studyai", event="schedule", operation="status",
                commit_sha=OTHER_SHA, model="gemini-3.8-flash",
                budget=18, run_id=201, output=root/"outputs",
                summary=root/"summary",
            )
            changes=[]
            with patch("multiday_state.load", return_value=(previous, "etag")), \
                 patch("multiday_state.branch_sha", return_value=OTHER_SHA), \
                 patch("multiday_state.save", side_effect=lambda repo, new, **kwargs: changes.append(new)):
                prepare(config)
            self.assertEqual(changes[-1]["daily_budget"], 6)
            self.assertEqual(changes[-1]["status"], "needs_attention")
            self.assertIn("run=false", config.output.read_text())

    def test_daily_claim_is_at_most_one_run_per_day(self):
        s, go, _ = claim_day(
            state(), run_id=111, today="2026-10-12", current_notes_sha=NOTES_SHA)
        self.assertTrue(go)
        self.assertEqual(s["inflight_run_id"], 111)
        _, go2, reason = claim_day(s, run_id=112,
                                   today="2026-10-12", current_notes_sha=NOTES_SHA)
        self.assertFalse(go2)
        self.assertIn("already claimed", reason)

    def test_abandoned_prior_daily_run_disarms_instead_of_repaying(self):
        s, first, _ = claim_day(
            state(), run_id=101, today="2026-10-12",
            current_notes_sha=NOTES_SHA)
        self.assertTrue(first)
        # No finalize call was made, e.g. the GitHub runner disappeared.
        next_state, second, reason = claim_day(
            s, run_id=102, today="2026-10-13",
            current_notes_sha=NOTES_SHA)
        self.assertFalse(second)
        self.assertFalse(next_state["enabled"])
        self.assertEqual(next_state["status"], "needs_attention")
        self.assertIn("never finalized", reason)

    def test_source_drift_disarms_before_any_gemini_calls(self):
        s, allowed, reason = claim_day(
            state(), run_id=111, today="2026-10-12", current_notes_sha=OTHER_SHA)
        self.assertFalse(allowed)
        self.assertFalse(s["enabled"])
        self.assertEqual(s["status"], "needs_attention")
        self.assertIn("changed", reason)

    def test_disabled_state_never_runs_again_even_next_day(self):
        s = stop(state())
        result, allowed, _ = claim_day(
            s, run_id=200, today="2026-10-13", current_notes_sha=NOTES_SHA)
        self.assertFalse(allowed)
        self.assertFalse(result["enabled"])

    def test_paused_runs_chain_artifacts_and_reset_stalls_after_progress(self):
        s = state()
        for day, run, count in [
            ("2026-10-12", 101, 5),
            ("2026-10-13", 102, 10),
            ("2026-10-14", 103, 15),
            ("2026-10-15", 104, 20),
        ]:
            s, can_run, _ = claim_day(
                s, run_id=run, today=day, current_notes_sha=NOTES_SHA)
            self.assertTrue(can_run)
            s = advance(s, run_id=run, result="paused",
                        artifact_uploaded=True, checkpoint_count=count)
            self.assertTrue(s["enabled"])
            self.assertEqual(s["resume_run_id"], run)
            self.assertEqual(s["consecutive_pauses"], 0)

    def test_three_unproductive_pauses_trigger_attention_without_more_spending(self):
        s = state()
        for i in range(MAX_CONSECUTIVE_PAUSES):
            run = 200 + i
            s, ok, _ = claim_day(
                s, run_id=run, today=f"2026-10-{12+i:02d}",
                current_notes_sha=NOTES_SHA)
            self.assertTrue(ok)
            s = advance(s, run_id=run, result="paused",
                        artifact_uploaded=True, checkpoint_count=0)
        self.assertFalse(s["enabled"])
        self.assertEqual(s["status"], "needs_attention")
        self.assertEqual(s["consecutive_pauses"], MAX_CONSECUTIVE_PAUSES)

    def test_missing_artifact_or_regressed_checkpoint_disarms(self):
        s, _, _ = claim_day(
            state(), run_id=101, today="2026-10-12", current_notes_sha=NOTES_SHA)
        n = advance(s, run_id=101, result="paused",
                    artifact_uploaded=False, checkpoint_count=5)
        self.assertFalse(n["enabled"])
        self.assertIsNone(n["resume_run_id"])
        s["progress_stage_count"] = 3
        n = advance(s, run_id=101, result="paused",
                    artifact_uploaded=True, checkpoint_count=2)
        self.assertFalse(n["enabled"])
        self.assertEqual(n["status"], "needs_attention")

    def test_blocked_math_or_schema_error_stops_scheduling(self):
        s, _, _ = claim_day(
            state(), run_id=101, today="2026-10-12", current_notes_sha=NOTES_SHA)
        n = advance(s, run_id=101, result="blocked",
                    artifact_uploaded=True, checkpoint_count=4)
        self.assertFalse(n["enabled"])
        self.assertEqual(n["status"], "needs_attention")

    def test_completed_batch_disarms_and_only_records_draft_url(self):
        s, _, _ = claim_day(
            state(), run_id=101, today="2026-10-12", current_notes_sha=NOTES_SHA)
        n = advance(s, run_id=101, result="complete", artifact_uploaded=True,
                    checkpoint_count=46, draft_pr_url="https://github.com/x/y/pull/50")
        self.assertFalse(n["enabled"])
        self.assertEqual(n["status"], "complete")
        self.assertEqual(n["completed_run_id"], 101)
        self.assertEqual(n["draft_pr_url"], "https://github.com/x/y/pull/50")

    def test_publish_retry_retains_checkpoints_and_does_not_call_model(self):
        s, _, _ = claim_day(
            state(), run_id=101, today="2026-10-12", current_notes_sha=NOTES_SHA)
        n = advance(s, run_id=101, result="publish_retry",
                    artifact_uploaded=True, checkpoint_count=45)
        self.assertTrue(n["enabled"])
        self.assertEqual(n["status"], "publish_retry")
        self.assertEqual(n["resume_run_id"], 101)

    def test_report_must_process_all_ten_chapters(self):
        all_done = [{"chapter_number": n, "status": "processed"} for n in CHAPTERS]
        self.assertEqual(report_state(all_done, exit_code=0, publish_ok=True), "complete")
        self.assertEqual(report_state(all_done, exit_code=0, publish_ok=False), "publish_retry")
        self.assertEqual(report_state(all_done, exit_code=1, publish_ok=True), "blocked")
        partial = copy.deepcopy(all_done[:3])
        partial.append({"chapter_number": 8, "status": "paused"})
        self.assertEqual(report_state(partial, exit_code=1, publish_ok=False), "paused")
        self.assertEqual(report_state([{"chapter_number": 5, "status": "blocked"}],
                                      exit_code=1, publish_ok=False), "blocked")
        self.assertEqual(report_state(partial + [{"chapter_number": 5,
                                                  "status": "processed"}],
                                      exit_code=1, publish_ok=False), "blocked")
        self.assertEqual(report_state([], exit_code=0, publish_ok=True), "blocked")

    def test_completion_cannot_be_forged_with_wrong_sequence(self):
        wrong = [{"chapter_number": n, "status": "processed"}
                 for n in list(reversed(CHAPTERS))]
        self.assertEqual(report_state(wrong, exit_code=0, publish_ok=True), "blocked")

    def test_stale_run_cannot_advance_daily_pointer(self):
        s, _, _ = claim_day(
            state(), run_id=101, today="2026-10-12", current_notes_sha=NOTES_SHA)
        with self.assertRaisesRegex(ValueError, "stale"):
            advance(s, run_id=999, result="complete",
                    artifact_uploaded=True, checkpoint_count=40)

    def test_manual_start_status_stop_never_schedule_paid_calls(self):
        with TemporaryDirectory() as tmp:
            path = Path(tmp)
            out, summary = path / "outputs", path / "summary"
            config = Namespace(
                repo="example/studyai", event="workflow_dispatch",
                operation="start", commit_sha=MAIN_SHA, model="gemini-3.8-flash",
                budget=6, run_id=123, output=out, summary=summary
            )
            writes = []
            def saved(repo, data, **kwargs):
                writes.append(data)
            with patch("multiday_state.load", return_value=(None, None)), \
                 patch("multiday_state.branch_sha", return_value=NOTES_SHA), \
                 patch("multiday_state.save", side_effect=saved):
                prepare(config)
            self.assertTrue(writes[-1]["enabled"])
            self.assertNotIn("run=true", out.read_text())
            config.operation = "stop"
            with patch("multiday_state.load", return_value=(writes[-1], "sha")), \
                 patch("multiday_state.save", side_effect=saved):
                prepare(config)
            self.assertFalse(writes[-1]["enabled"])
            config.operation = "status"
            with patch("multiday_state.load", return_value=(writes[-1], "sha")):
                prepare(config)
            self.assertFalse("run=true" in out.read_text())

    def test_scheduled_tick_without_opt_in_is_a_noop(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            config = Namespace(
                repo="example/studyai", event="schedule", operation="status",
                commit_sha=MAIN_SHA, model="gemini-3.8-flash", budget=6,
                run_id=200, output=root / "outputs", summary=root / "summary",
            )
            with patch("multiday_state.load", return_value=(None, None)), \
                 patch("multiday_state.save") as saving:
                prepare(config)
                saving.assert_not_called()
            self.assertIn("run=false", config.output.read_text())


if __name__ == "__main__":
    unittest.main()
