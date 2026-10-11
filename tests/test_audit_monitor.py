"""Regression checks for the fail-closed, provenance-aware NCERT viewer."""
import json
import os
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

import audit_monitor


MANIFEST = Path(__file__).resolve().parents[1] / "automation/class9-maths/manifest.json"
CONTROLLER = {
    "enabled": True,
    "status": "paused",
    "chapters": list(range(5, 15)),
    "progress_stage_count": 3,
    "last_run_id": 123456,
    "started_by_run_id": 123400,
    "completed_run_id": None,
    "draft_pr_url": None,
}


class AuditMonitorTests(unittest.TestCase):
    def test_reviewer_allowlist_fails_closed(self):
        user = {"email": "reviewer@example.com"}
        with patch.dict(os.environ, {"STUDYAI_AUDIT_REVIEWERS": ""}):
            self.assertFalse(audit_monitor.reviewer_allowed(user))
        with patch.dict(os.environ, {"STUDYAI_AUDIT_REVIEWERS": "other@example.com"}):
            self.assertFalse(audit_monitor.reviewer_allowed(user))
        with patch.dict(os.environ, {"STUDYAI_AUDIT_REVIEWERS": "Other@Example.com, REVIEWER@example.com"}):
            self.assertTrue(audit_monitor.reviewer_allowed(user))

    def test_armed_controller_does_not_claim_chapters_audited(self):
        armed = {**CONTROLLER, "status": "armed", "last_run_id": None}
        with patch.dict(os.environ, {"NCERT_AUDIT_REPORT_JSON": ""}):
            with patch.object(audit_monitor, "controller_snapshot", return_value=(armed, None)):
                data = audit_monitor.build_snapshot(MANIFEST)
        self.assertEqual(len(data["chapters"]), 14)
        self.assertEqual(data["automated_reports_loaded"], 0)
        self.assertEqual(data["human_approvals_recorded"], 0)
        self.assertTrue(all(x["status"] == "scheduled" for x in data["chapters"][4:]))
        self.assertTrue(all(x["status"] == "evidence_unavailable" for x in data["chapters"][:4]))

    def test_valid_report_provides_real_metrics_without_human_approval(self):
        with TemporaryDirectory() as temp:
            artifact = Path(temp) / "audit.json"
            artifact.write_text(json.dumps([{
                "chapter_number": 5, "status": "processed",
                "coverage": [
                    {"id": 0, "concept": "An example concept", "page": 3,
                     "status": "missing"},
                    {"id": 1, "concept": "Second concept", "page": 5,
                     "status": "covered"},
                ],
                "verified_gaps": [{"concept": "An example concept"}],
                "final_decisions": [
                    {"id": 0, "verdict": "unresolved"},
                    {"id": 1, "verdict": "covered"},
                ],
                "candidate_lessons": [{"title": "A proposal", "section": "Examples"}],
                "rejected_claims": ["PDF coverage still needs checking"],
                "qa": {"candidates_passed_independent_math_review": 1},
            }]), encoding="utf-8")
            with patch.dict(os.environ, {"NCERT_AUDIT_REPORT_JSON": str(artifact)}):
                with patch.object(audit_monitor, "controller_snapshot",
                                  return_value=(CONTROLLER, None)):
                    data = audit_monitor.build_snapshot(MANIFEST)
        fifth = data["chapters"][4]
        self.assertEqual(fifth["status"], "awaiting_human_review")
        self.assertEqual(fifth["metrics"]["concepts"], 2)
        self.assertEqual(fifth["metrics"]["confirmed_gaps"], 1)
        self.assertEqual(fifth["metrics"]["unresolved_decisions"], 1)
        self.assertEqual(fifth["human_review"], "not_recorded")
        self.assertEqual(data["automated_reports_loaded"], 1)
        self.assertEqual(data["human_approvals_recorded"], 0)
        self.assertIsNone(data["chapters"][5]["metrics"])

    def test_invalid_artifact_cannot_invent_verified_counts(self):
        with TemporaryDirectory() as temp:
            artifact = Path(temp) / "audit.json"
            artifact.write_text('[{"chapter_number":5,"status":"approved"}]', encoding="utf-8")
            with patch.dict(os.environ, {"NCERT_AUDIT_REPORT_JSON": str(artifact)}):
                with patch.object(audit_monitor, "controller_snapshot",
                                  return_value=(CONTROLLER, None)):
                    data = audit_monitor.build_snapshot(MANIFEST)
        self.assertEqual(data["automated_reports_loaded"], 0)
        self.assertIn("invalid", data["report_error"].lower())

    def test_malformed_evidence_arrays_fail_closed(self):
        with TemporaryDirectory() as temp:
            artifact = Path(temp) / "audit.json"
            artifact.write_text(json.dumps([{
                "chapter_number": 5,
                "status": "processed",
                "coverage": "fabricated content instead of an inventory array",
            }]), encoding="utf-8")
            with patch.dict(os.environ, {"NCERT_AUDIT_REPORT_JSON": str(artifact)}):
                with patch.object(audit_monitor, "controller_snapshot",
                                  return_value=(CONTROLLER, None)):
                    data = audit_monitor.build_snapshot(MANIFEST)
        self.assertIsNotNone(data["report_error"])
        self.assertEqual(data["automated_reports_loaded"], 0)
        self.assertEqual(data["human_approvals_recorded"], 0)

    def test_flask_routes_reject_anonymous_or_unlisted_accounts(self):
        import app as server
        client = server.app.test_client()
        for endpoint in ("/internal/ncert-audit", "/api/internal/ncert-audit"):
            with patch.object(server, "current_user", return_value=None):
                self.assertEqual(client.get(endpoint).status_code, 401)
            with patch.dict(os.environ, {"STUDYAI_AUDIT_REVIEWERS": ""}):
                with patch.object(server, "current_user",
                                  return_value={"email": "reviewer@example.com"}):
                    self.assertEqual(client.get(endpoint).status_code, 403)

    def test_flask_routes_allow_only_named_reviewer(self):
        import app as server
        with patch.dict(os.environ, {"STUDYAI_AUDIT_REVIEWERS": "reviewer@example.com",
                                     "NCERT_AUDIT_REPORT_JSON": ""}):
            with patch.object(server, "current_user",
                              return_value={"email": "reviewer@example.com"}):
                with patch.object(audit_monitor, "controller_snapshot",
                                  return_value=(CONTROLLER, None)):
                    client = server.app.test_client()
                    page = client.get("/internal/ncert-audit")
                    response = client.get("/api/internal/ncert-audit")
        self.assertEqual(page.status_code, 200)
        self.assertIn(b"Curriculum quality control", page.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["chapters"][4]["status"],
                         "report_unavailable_during_batch")
        self.assertEqual(response.headers.get("Cache-Control"), "private, no-store")


if __name__ == "__main__":
    unittest.main()
