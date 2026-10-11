"""Read-only, reviewer-only NCERT Class 9 Mathematics audit reporting.

This module never dispatches workflows, invokes Gemini, edits audit state or
publishes notes. Reports are loaded only from an explicitly configured,
server-side JSON artifact. All values shown to reviewers have provenance.
"""
from __future__ import annotations

import base64
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import threading
import time
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

REPO = "shryvjy-coder/ai-study-assistant"
STATE_REF = "automation/ncert-class9-multiday-state"
STATE_FILE = ".ncert-class9-multiday-state.json"
STATE_URL = (
    f"https://api.github.com/repos/{REPO}/contents/"
    f"{STATE_FILE}?ref={STATE_REF}"
)
REPORT_MAX_BYTES = 5_000_000
_cache_lock = threading.Lock()
_cache = {"until": 0.0, "state": None, "error": "Not fetched"}


def reviewer_allowed(user) -> bool:
    """Fail closed if the allowlist has not been configured."""
    allowed = {e.strip().lower() for e in
               os.getenv("STUDYAI_AUDIT_REVIEWERS", "").split(",") if e.strip()}
    return bool(user and allowed and user["email"].strip().lower() in allowed)


def _remote_controller():
    req = Request(STATE_URL, headers={
        "User-Agent": "StudyAI-Audit-Reviewer/1.0",
        "Accept": "application/vnd.github+json",
    })
    with urlopen(req, timeout=4) as stream:
        if stream.status != 200:
            raise ValueError("GitHub did not return a successful controller response")
        raw = stream.read(80_001)
    if len(raw) > 80_000:
        raise ValueError("GitHub controller response exceeded the expected size")
    envelope = json.loads(raw)
    encoded = envelope.get("content", "")
    decoded = base64.b64decode(encoded, validate=False)
    if len(decoded) > 20_000:
        raise ValueError("Controller JSON exceeds the expected size")
    state = json.loads(decoded)
    if (state.get("schema") != 1 or state.get("chapters") != list(range(5, 15))
            or state.get("status") not in
            {"armed", "running", "paused", "needs_attention", "complete", "stopped",
             "publish_retry"}):
        raise ValueError("Unrecognised controller state; refusing to infer progress")
    return {k: state.get(k) for k in (
        "enabled", "status", "chapters", "progress_stage_count", "last_run_id",
        "started_by_run_id", "completed_run_id", "draft_pr_url",
        "last_attempt_utc_day", "consecutive_pauses",
    )}


def controller_snapshot():
    now = time.monotonic()
    with _cache_lock:
        if now < _cache["until"]:
            return _cache["state"], _cache["error"]
        try:
            state = _remote_controller()
            error = None
        except (HTTPError, URLError, TimeoutError, OSError, ValueError,
                KeyError, TypeError, json.JSONDecodeError) as exc:
            state = None
            error = "Live GitHub controller unavailable: " + type(exc).__name__
        _cache.update(until=now + 120, state=state, error=error)
        return state, error


def _safe_text(value, limit=300):
    return str(value)[:limit] if isinstance(value, (str, int, float)) else ""


def _reports():
    """An operator can securely mount/download an audit.json on the server.

    Never accept a report path or arbitrary content from a browser request.
    Unknown or malformed report data is omitted, never treated as approved.
    """
    path = os.getenv("NCERT_AUDIT_REPORT_JSON", "").strip()
    if not path:
        return {}, "No verified audit.json report configured on the server", None
    try:
        report_file = Path(path).resolve(strict=True)
        if not report_file.is_file() or report_file.stat().st_size > REPORT_MAX_BYTES:
            raise ValueError("Report is missing, oversized, or not a regular file")
        records = json.loads(report_file.read_text(encoding="utf-8"))
        if not isinstance(records, list):
            raise ValueError("Expected audit.json to contain a chapter array")
        by_chapter = {}
        for record in records:
            if not isinstance(record, dict):
                raise ValueError("Invalid chapter report")
            number = record.get("chapter_number")
            if type(number) is not int or not 1 <= number <= 14 or number in by_chapter:
                raise ValueError("Invalid or repeated chapter number")
            if record.get("status") not in {"processed", "paused", "blocked"}:
                raise ValueError("Unrecognised report status")
            if not isinstance(record.get("qa") or {}, dict):
                raise ValueError("Malformed quality-assurance report")
            for field in ("coverage", "verified_gaps", "final_decisions",
                          "candidate_lessons", "math_decisions", "rejected_claims"):
                values = record.get(field) or []
                if not isinstance(values, list):
                    raise ValueError("Malformed report field: " + field)
                if field != "rejected_claims" and any(
                        not isinstance(value, dict) for value in values):
                    raise ValueError("Malformed report evidence: " + field)
            by_chapter[number] = record
        stamp = datetime.fromtimestamp(report_file.stat().st_mtime, timezone.utc).isoformat()
        return by_chapter, None, stamp
    except (OSError, UnicodeDecodeError, ValueError, json.JSONDecodeError) as exc:
        return {}, "Configured report is unavailable or invalid: " + type(exc).__name__, None


def build_snapshot(manifest_file: Path):
    manifest = json.loads(manifest_file.read_text(encoding="utf-8"))
    controller, controller_error = controller_snapshot()
    reports, report_error, report_time = _reports()
    chapters = []
    for item in manifest["chapters"]:
        number = item["number"]
        report = reports.get(number)
        status = "evidence_unavailable"
        if report:
            status = {
                "processed": "awaiting_human_review",
                "paused": "paused",
                "blocked": "blocked",
            }[report["status"]]
        elif controller and number in controller["chapters"]:
            batch = controller["status"]
            if batch == "armed" and not controller.get("last_run_id"):
                status = "scheduled"
            elif batch in {"running", "paused", "publish_retry"}:
                status = "report_unavailable_during_batch"
            elif batch == "complete":
                status = "report_unavailable_after_batch"
            elif batch == "needs_attention":
                status = "needs_attention"
            elif batch == "stopped":
                status = "stopped"
        row = {
            "number": number,
            "title": item["title"],
            "textbook_url": item["pdf"],
            "status": status,
            "human_review": "not_recorded",
            "metrics": None,
            "issues": [],
            "coverage": [],
            "proposals": [],
            "math_review": [],
        }
        if report:
            qa = report.get("qa") or {}
            coverage = report.get("coverage") or []
            proposals = report.get("candidate_lessons") or []
            gaps = report.get("verified_gaps") or []
            decisions = report.get("final_decisions") or []
            if not all(isinstance(group, list) for group in (coverage, proposals, gaps, decisions)):
                raise ValueError("Malformed audit artifact arrays")
            by_id = {d.get("id"): d.get("verdict") for d in decisions if isinstance(d, dict)}
            row["metrics"] = {
                "concepts": len(coverage) if coverage else qa.get("source_inventory"),
                "confirmed_gaps": len(gaps),
                "proposed_lessons": len(proposals),
                "unresolved_decisions": sum(1 for d in decisions if d.get("verdict") in
                                           {"unresolved", "uncertain"}),
                "maths_reviewed_candidates": qa.get("candidates_passed_independent_math_review"),
            } if report["status"] == "processed" else None
            row["coverage"] = [{
                "concept": _safe_text(c.get("concept"), 180),
                "page": c.get("page") if type(c.get("page")) is int else None,
                "inventory": _safe_text(c.get("status"), 25),
                "final": _safe_text(by_id.get(c.get("id")), 25),
            } for c in coverage[:60] if isinstance(c, dict)]
            row["issues"] = [_safe_text(x, 350) for x in
                             (report.get("rejected_claims") or [])[:30]]
            if report.get("error"):
                row["issues"].insert(0, _safe_text(report["error"], 350))
            row["proposals"] = [{
                "title": _safe_text(p.get("title"), 160),
                "section": _safe_text(p.get("section"), 160),
            } for p in proposals[:20] if isinstance(p, dict)]
            row["math_review"] = [{
                "id": d.get("id"),
                "verdict": _safe_text(d.get("verdict"), 25),
                "reason": _safe_text(d.get("reason"), 300),
            } for d in (report.get("math_decisions") or [])[:20]
               if isinstance(d, dict)]
        chapters.append(row)
    run_id = controller.get("last_run_id") if controller else None
    if type(run_id) is not int or run_id < 1:
        run_id = None
    draft_url = controller.get("draft_pr_url") if controller else None
    if not (isinstance(draft_url, str) and draft_url.startswith(
            f"https://github.com/{REPO}/pull/")):
        draft_url = None
    return {
        "ok": True,
        "course": manifest["course"],
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "controller": controller,
        "controller_error": controller_error,
        "controller_source": STATE_URL,
        "report_error": report_error,
        "report_loaded_at": report_time,
        "report_source": "server-side configured audit.json" if report_time else None,
        "last_run_url": f"https://github.com/{REPO}/actions/runs/{run_id}" if run_id else None,
        "draft_pr_url": draft_url,
        "chapters": chapters,
        "automated_reports_loaded": sum(ch["status"] == "awaiting_human_review"
                                        for ch in chapters),
        "human_approvals_recorded": 0,
    }
