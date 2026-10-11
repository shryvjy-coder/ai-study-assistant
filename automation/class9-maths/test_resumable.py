#!/usr/bin/env python3
"""Offline resume and quota tests: no Gemini keys or network calls."""
import json
from pathlib import Path
import tempfile
import unittest

from deep_audit import review_chapter
from pipeline import normal, validate, generate_with_transient_retries
from resumable import (
    RequestPacer, RequestBudgetExhausted, StageCheckpoints, build_fingerprint
)
from test_deep_audit import sample_chapter, sample_pages, inventory, challenge, draft, math_review, closure


class ResumableAuditTests(unittest.TestCase):
    def checkpoint(self, root, *, model="mock-model", notes=None):
        chapter = sample_chapter()
        pdf = root / "chapter.pdf"
        if not pdf.exists():
            pdf.write_bytes(b"%PDF-1.4 test fixture")
        notes = notes or chapter
        fingerprint = build_fingerprint(
            pdf, notes, chapter, model,
            [Path(__file__).with_name("deep_audit.py"),
             Path(__file__).with_name("pipeline.py"),
             Path(__file__).with_name("resumable.py")],
        )
        return StageCheckpoints(root / "saved", chapter["number"], fingerprint)

    def responses(self, stage):
        return {"coverage": inventory, "challenge": challenge, "draft": draft,
                "math": math_review, "closure": closure}[stage]()

    def test_checkpoint_replays_successful_stages_without_requests(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            checkpoint = self.checkpoint(root)
            calls = []
            def ask(stage, prompt):
                calls.append(stage)
                return self.responses(stage)
            result = review_chapter(root / "chapter.pdf", sample_chapter(),
                                    sample_chapter(), sample_pages(), "mock-model",
                                    normal=normal, validate=validate,
                                    retry=generate_with_transient_retries,
                                    request=ask, checkpoint=checkpoint)
            self.assertEqual(len(calls), 5)
            self.assertEqual(len(result["candidate_lessons"]), 1)
            self.assertEqual(len(list(checkpoint.path.glob("*.json"))), 6)
            resumed = self.checkpoint(root)
            def fail_api(stage, prompt):
                self.fail("A completed stage must not call the model")
            again = review_chapter(root / "chapter.pdf", sample_chapter(),
                                   sample_chapter(), sample_pages(), "mock-model",
                                   normal=normal, validate=validate,
                                   retry=generate_with_transient_retries,
                                   request=fail_api, checkpoint=resumed)
            self.assertEqual(again, result)

    def test_partial_chapter_resume_does_not_repeat_earlier_stages(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            checkpoint = self.checkpoint(root)
            calls = []
            def failing(stage, prompt):
                calls.append(stage)
                if stage == "math":
                    raise RuntimeError("simulated Gemini outage")
                return self.responses(stage)
            with self.assertRaisesRegex(RuntimeError, "simulated"):
                review_chapter(root / "chapter.pdf", sample_chapter(),
                               sample_chapter(), sample_pages(), "mock-model",
                               normal=normal, validate=validate,
                               retry=generate_with_transient_retries,
                               request=failing, checkpoint=checkpoint)
            self.assertEqual(calls, ["coverage", "challenge", "draft", "math"])
            self.assertFalse((checkpoint.path / "math.json").exists())
            self.assertTrue((checkpoint.path / "draft.json").exists())
            resumed = self.checkpoint(root)
            resumed_calls = []
            def rest(stage, prompt):
                resumed_calls.append(stage)
                return self.responses(stage)
            final = review_chapter(root / "chapter.pdf", sample_chapter(),
                                   sample_chapter(), sample_pages(), "mock-model",
                                   normal=normal, validate=validate,
                                   retry=generate_with_transient_retries,
                                   request=rest, checkpoint=resumed)
            self.assertEqual(resumed_calls, ["math", "closure"])
            self.assertEqual(len(final["candidate_lessons"]), 1)

    def test_manual_math_restart_retains_earlier_stages(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            saved = self.checkpoint(root)
            def ask(stage, prompt):
                return self.responses(stage)
            review_chapter(root / "chapter.pdf", sample_chapter(),
                           sample_chapter(), sample_pages(), "mock-model",
                           normal=normal, validate=validate,
                           retry=generate_with_transient_retries,
                           request=ask, checkpoint=saved)
            saved.restart_from("math")
            self.assertTrue((saved.path / "coverage.json").exists())
            self.assertTrue((saved.path / "challenge.json").exists())
            self.assertTrue((saved.path / "draft.json").exists())
            self.assertFalse((saved.path / "math.json").exists())
            self.assertFalse((saved.path / "closure.json").exists())
            resumed = self.checkpoint(root)
            calls = []
            def retry_later(stage, prompt):
                calls.append(stage)
                return self.responses(stage)
            review_chapter(root / "chapter.pdf", sample_chapter(),
                           sample_chapter(), sample_pages(), "mock-model",
                           normal=normal, validate=validate,
                           retry=generate_with_transient_retries,
                           request=retry_later, checkpoint=resumed)
            self.assertEqual(calls, ["math", "closure"])

    def test_legacy_code_resume_revalidates_four_stages_then_calls_closure_once(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            chapter = sample_chapter()
            pdf = root / "source.pdf"
            pdf.write_bytes(b"%PDF-1.4 exact same textbook bytes")
            original = [Path(__file__).with_name(name)
                        for name in ("pipeline.py", "deep_audit.py", "resumable.py")]
            old_root = root / "old-code"
            old_root.mkdir()
            for source in original:
                (old_root / source.name).write_bytes(
                    source.read_bytes() + b"\n# harmless historical code revision\n")
            old_paths = [old_root / p.name for p in original]
            previous_fp = build_fingerprint(
                pdf, chapter, chapter, "mock-model", old_paths)
            current_fp = build_fingerprint(
                pdf, chapter, chapter, "mock-model", original)
            self.assertNotEqual(previous_fp, current_fp)
            checkpoint = StageCheckpoints(root / "saved", 4, previous_fp)
            calls = []
            def interrupted(stage, prompt):
                calls.append(stage)
                if stage == "closure":
                    raise RuntimeError("previous run failed at final reviewer")
                return self.responses(stage)
            with self.assertRaisesRegex(RuntimeError, "previous run failed"):
                review_chapter(pdf, chapter, chapter, sample_pages(), "mock-model",
                               normal=normal, validate=validate,
                               retry=generate_with_transient_retries,
                               request=interrupted, checkpoint=checkpoint)
            self.assertEqual(calls, ["coverage", "challenge", "draft", "math", "closure"])
            self.assertFalse((checkpoint.path / "closure.json").exists())
            with self.assertRaisesRegex(ValueError, "fingerprint mismatch"):
                StageCheckpoints(root / "saved", 4, current_fp)
            resumed = StageCheckpoints(
                root / "saved", 4, current_fp,
                previous_code_fingerprint=previous_fp)
            new_calls = []
            def new_request(stage, prompt):
                new_calls.append(stage)
                return self.responses(stage)
            result = review_chapter(
                pdf, chapter, chapter, sample_pages(), "mock-model",
                normal=normal, validate=validate, retry=generate_with_transient_retries,
                request=new_request, checkpoint=resumed)
            self.assertEqual(new_calls, ["closure"])
            self.assertEqual(len(result["candidate_lessons"]), 1)
            self.assertTrue((resumed.path / "closure.json").exists())

    def test_legacy_code_fingerprint_cannot_override_changed_source(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            original = root / "legacy"
            original.mkdir()
            pdf = root / "source.pdf"
            pdf.write_bytes(b"%PDF original")
            code = root / "deep_audit.py"
            code.write_text("old script")
            old = build_fingerprint(
                pdf, sample_chapter(), sample_chapter(), "model",
                [code])
            StageCheckpoints(root / "saved", 4, old)
            pdf.write_bytes(b"%PDF different")
            changed = build_fingerprint(
                pdf, sample_chapter(), sample_chapter(), "model", [code])
            with self.assertRaisesRegex(ValueError, "fingerprint mismatch"):
                StageCheckpoints(
                    root / "saved", 4, changed,
                    previous_code_fingerprint=changed)

    def test_changed_model_notes_or_pdf_refuses_checkpoint(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            self.checkpoint(root)
            with self.assertRaisesRegex(ValueError, "fingerprint mismatch"):
                self.checkpoint(root, model="different-model")
            altered = sample_chapter()
            altered["sections"][0]["subtopics"][0]["paragraphs"] = ["Updated notes"]
            with self.assertRaisesRegex(ValueError, "fingerprint mismatch"):
                self.checkpoint(root, notes=altered)
            (root / "chapter.pdf").write_bytes(b"%PDF-1.4 changed PDF")
            with self.assertRaisesRegex(ValueError, "fingerprint mismatch"):
                self.checkpoint(root)

    def test_changed_prompt_refuses_replay(self):
        with tempfile.TemporaryDirectory() as folder:
            checkpoint = self.checkpoint(Path(folder))
            checkpoint.fetch("coverage", "prompt 1", lambda *_: inventory())
            checkpoint.commit("coverage")
            resumed = self.checkpoint(Path(folder))
            with self.assertRaisesRegex(ValueError, "prompt"):
                resumed.fetch("coverage", "prompt 2",
                              lambda *_: self.fail("do not call model"))

    def test_no_checkpoint_of_unvalidated_stage(self):
        with tempfile.TemporaryDirectory() as folder:
            checkpoint = self.checkpoint(Path(folder))
            checkpoint.fetch("math", "prompt", lambda *_: {"not": "valid"})
            self.assertFalse((checkpoint.path / "math.json").exists())

    def test_corrupt_or_incomplete_checkpoint_fails_closed(self):
        with tempfile.TemporaryDirectory() as folder:
            checkpoint = self.checkpoint(Path(folder))
            (checkpoint.path / "coverage.json").write_text("not-json")
            with self.assertRaisesRegex(ValueError, "Invalid checkpoint"):
                checkpoint.fetch("coverage", "prompt", lambda *_: inventory())

    def test_request_budget_counts_failed_attempts_and_paces(self):
        now = [100.0]
        sleeps = []
        def clock():
            return now[0]
        def sleep(seconds):
            sleeps.append(seconds)
            now[0] += seconds
        pacer = RequestPacer(2, 25, clock=clock, sleep=sleep)
        calls = []
        def rejected():
            calls.append(1)
            raise RuntimeError("network failure")
        with self.assertRaisesRegex(RuntimeError, "network failure"):
            pacer(rejected)
        self.assertEqual(pacer(lambda: "ok"), "ok")
        self.assertEqual(sleeps, [25])
        with self.assertRaises(RequestBudgetExhausted):
            pacer(lambda: self.fail("would exceed budget"))
        self.assertEqual(pacer.attempts, 2)
        self.assertEqual(len(calls), 1)

    def test_invalid_budget_is_rejected(self):
        for invalid in (0, 21, -1, 1.5):
            with self.assertRaises(ValueError):
                RequestPacer(invalid)

    def test_quota_retries_consume_attempt_budget(self):
        class TooBusy(Exception):
            code = 503
        clock = [0.0]
        def sleep(seconds):
            clock[0] += seconds
        pacer = RequestPacer(2, 0, clock=lambda: clock[0], sleep=sleep)
        def always_busy():
            raise TooBusy()
        with self.assertRaises(RequestBudgetExhausted):
            generate_with_transient_retries(lambda: pacer(always_busy),
                                            sleep=sleep)
        self.assertEqual(pacer.attempts, 2)


if __name__ == "__main__":
    unittest.main()
