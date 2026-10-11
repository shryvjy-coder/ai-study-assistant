#!/usr/bin/env python3
"""Opt-in, per-day GitHub Actions state for the NCERT Class 9 deep-audit batch.

Schedule is a NO-OP until a user manually arms it. This script never calls Gemini.
State is held on a dedicated ref, never the website or the notes branch.
"""
from __future__ import annotations

import argparse
import base64
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import re
import subprocess
import sys

STATE_BRANCH = "automation/ncert-class9-multiday-state"
STATE_FILE = ".ncert-class9-multiday-state.json"
NOTES_BRANCH = "class9-maths-all-chapters-depth"
CHAPTERS = list(range(5, 15))
SCHEMA = 1
MAX_CONSECUTIVE_PAUSES = 3
MAX_DAILY_BUDGET = 18
# One-time approved change to the originally armed, not-yet-run 6-attempt batch.
# It is applied only after a scheduled day is safely claimed (and therefore
# only after the updated controller lands on the default branch).
PREVIOUS_DAILY_BUDGET = 6
HEX_SHA = re.compile(r"^[0-9a-f]{40}$")
REPO = re.compile(r"^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$")
ALLOWED_MODELS = ("gemini-3.8-flash",)


def check_sha(value: str) -> str:
    if not isinstance(value, str) or not HEX_SHA.fullmatch(value):
        raise ValueError("Expected a trusted 40-character Git commit SHA")
    return value


def new_state(*, code_sha: str, notes_sha: str, model: str, budget: int, run_id: int) -> dict:
    check_sha(code_sha)
    check_sha(notes_sha)
    if model not in ALLOWED_MODELS:
        raise ValueError("Unsupported Gemini model; check supported IDs and quotas")
    if type(budget) is not int or not 1 <= budget <= MAX_DAILY_BUDGET:
        raise ValueError("Daily API request cap must be 1–18")
    if type(run_id) is not int or run_id < 1:
        raise ValueError("Invalid GitHub Actions run ID")
    return {
        "schema": SCHEMA,
        "enabled": True,
        "status": "armed",
        "chapters": CHAPTERS.copy(),
        "model": model,
        "daily_budget": budget,
        "min_request_seconds": 35,
        "automation_sha": code_sha,
        "notes_sha": notes_sha,
        "resume_run_id": None,
        "inflight_run_id": None,
        "last_attempt_utc_day": None,
        "consecutive_pauses": 0,
        "progress_stage_count": 0,
        "last_run_id": None,
        "started_by_run_id": run_id,
        "completed_run_id": None,
        "draft_pr_url": None,
    }


def validate_state(state: dict) -> dict:
    if not isinstance(state, dict) or state.get("schema") != SCHEMA:
        raise ValueError("Unknown automated batch state schema")
    if state.get("chapters") != CHAPTERS:
        raise ValueError("Automated audit is restricted to Chapters 5–14")
    if state.get("model") not in ALLOWED_MODELS:
        raise ValueError("Unsupported model stored in batch state")
    check_sha(state.get("automation_sha"))
    check_sha(state.get("notes_sha"))
    if type(state.get("daily_budget")) is not int or not 1 <= state["daily_budget"] <= MAX_DAILY_BUDGET:
        raise ValueError("Invalid daily request budget in batch state")
    if type(state.get("enabled")) is not bool:
        raise ValueError("Missing enabled setting")
    for key in ("resume_run_id", "inflight_run_id", "last_run_id"):
        val = state.get(key)
        if val is not None and (type(val) is not int or val < 1):
            raise ValueError("Invalid run identifier: " + key)
    progress = state.get("progress_stage_count", 0)
    if type(progress) is not int or progress < 0 or progress > 100:
        raise ValueError("Invalid checkpoint progress count")
    return state


def claim_day(state: dict, *, run_id: int, today: str, current_notes_sha: str) -> tuple[dict, bool, str]:
    """Mark today as used BEFORE any Gemini API request is allowed."""
    state = validate_state(dict(state))
    check_sha(current_notes_sha)
    if not state["enabled"]:
        return state, False, "Batch not armed. Manually dispatch operation=start first."
    if state["last_attempt_utc_day"] == today:
        return state, False, "Daily batch already claimed a run today; no second quota-consuming attempt."
    if state["inflight_run_id"] is not None:
        # A prior scheduled run failed to finalize its checkpoint pointer.
        # Do not automatically replay and potentially repay for its stages.
        state["enabled"] = False
        state["status"] = "needs_attention"
        return state, False, ("A previous scheduled review never finalized; "
                              "stopped to avoid repeating untracked Gemini calls.")
    if state["notes_sha"] != current_notes_sha:
        state["enabled"] = False
        state["status"] = "needs_attention"
        state["inflight_run_id"] = None
        return state, False, "Notes branch changed since batch was armed; stopped without Gemini calls."
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", today):
        raise ValueError("Invalid UTC date")
    if type(run_id) is not int or run_id < 1:
        raise ValueError("Invalid run ID")
    state["last_attempt_utc_day"] = today
    state["inflight_run_id"] = run_id
    state["last_run_id"] = run_id
    state["status"] = "running"
    return state, True, "Daily review authorized by earlier explicit manual start."


def report_state(reports, *, exit_code: int, publish_ok: bool) -> str:
    """Classify a run WITHOUT treating partial progress as completion."""
    if not isinstance(reports, list) or not reports:
        return "blocked"
    seen = [r.get("chapter_number") for r in reports if isinstance(r, dict)]
    if len(set(seen)) != len(seen) or any(i not in CHAPTERS for i in seen):
        return "blocked"
    statuses = [r.get("status") for r in reports]
    if any(status == "blocked" for status in statuses):
        return "blocked"
    if all(status == "processed" for status in statuses) and seen == CHAPTERS:
        if exit_code == 0 and publish_ok:
            return "complete"
        return "publish_retry" if exit_code == 0 else "blocked"
    if statuses[-1] == "paused" and exit_code != 0:
        return "paused"
    return "blocked"


def advance(state: dict, *, run_id: int, result: str, artifact_uploaded: bool,
            checkpoint_count: int, draft_pr_url: str | None = None) -> dict:
    state = validate_state(dict(state))
    if state.get("inflight_run_id") != run_id:
        raise ValueError("Refusing stale or foreign run state update")
    state["inflight_run_id"] = None
    if result not in ("complete", "paused", "blocked", "publish_retry"):
        raise ValueError("Invalid batch result")
    if not artifact_uploaded:
        # Never schedule a new run if we cannot restore its most recent
        # source-bound checkpoint artifact. It may have used paid quota.
        state["enabled"] = False
        state["status"] = "needs_attention"
        return state
    if type(checkpoint_count) is not int or checkpoint_count < state.get("progress_stage_count", 0):
        state["enabled"] = False
        state["status"] = "needs_attention"
        return state
    progressed = checkpoint_count > state.get("progress_stage_count", 0)
    state["progress_stage_count"] = checkpoint_count
    state["resume_run_id"] = run_id
    if result == "complete":
        state["enabled"] = False
        state["status"] = "complete"
        state["completed_run_id"] = run_id
        state["consecutive_pauses"] = 0
        state["draft_pr_url"] = draft_pr_url
    elif result == "blocked":
        state["enabled"] = False
        state["status"] = "needs_attention"
    else:
        state["consecutive_pauses"] = (0 if progressed else state["consecutive_pauses"] + 1)
        if state["consecutive_pauses"] >= MAX_CONSECUTIVE_PAUSES:
            state["enabled"] = False
            state["status"] = "needs_attention"
        else:
            state["status"] = "paused" if result == "paused" else "publish_retry"
    return state


def stop(state: dict) -> dict:
    state = validate_state(dict(state))
    state["enabled"] = False
    state["status"] = "stopped"
    state["inflight_run_id"] = None
    return state


def _gh_api(*parts: str, missing_ok: bool = False) -> dict | None:
    proc = subprocess.run(["gh", "api", *parts], capture_output=True, text=True)
    if proc.returncode:
        if missing_ok and "404" in proc.stderr:
            return None
        raise RuntimeError("GitHub state API request failed: " +
                           proc.stderr.replace("\n", " ")[:300])
    return json.loads(proc.stdout)


def _remote_path(repo: str) -> str:
    return f"repos/{repo}/contents/{STATE_FILE}?ref={STATE_BRANCH}"


def load(repo: str) -> tuple[dict | None, str | None]:
    data = _gh_api(_remote_path(repo), missing_ok=True)
    if data is None:
        return None, None
    raw = base64.b64decode(data["content"])
    if len(raw) > 20_000:
        raise ValueError("Oversized stored batch state")
    return validate_state(json.loads(raw)), data["sha"]


def save(repo: str, state: dict, *, file_sha: str | None, base_sha: str) -> None:
    validate_state(state)
    if file_sha is None:
        # Create dedicated state branch once; never commit to main.
        exists = _gh_api(f"repos/{repo}/git/ref/heads/{STATE_BRANCH}", missing_ok=True)
        if exists is None:
            _gh_api("-X", "POST", f"repos/{repo}/git/refs",
                    "-f", f"ref=refs/heads/{STATE_BRANCH}",
                    "-f", f"sha={check_sha(base_sha)}")
    serialized = json.dumps(state, ensure_ascii=False, sort_keys=True,
                            separators=(",", ":")).encode("utf-8")
    encoded = base64.b64encode(serialized).decode("ascii")
    cmd = ["-X", "PUT", f"repos/{repo}/contents/{STATE_FILE}",
           "-f", f"message=NCERT multi-day audit state ({state['status']})",
           "-f", f"branch={STATE_BRANCH}", "-f", f"content={encoded}"]
    if file_sha is not None:
        cmd += ["-f", f"sha={file_sha}"]
    _gh_api(*cmd)


def branch_sha(repo: str, branch: str) -> str:
    value = _gh_api(f"repos/{repo}/git/ref/heads/{branch}")
    return check_sha(value["object"]["sha"])


def output(outputs: dict, *, output_file: Path, summary_file: Path, message: str) -> None:
    with output_file.open("a", encoding="utf-8") as f:
        for key, value in outputs.items():
            if value is None:
                value = ""
            f.write(f"{key}={str(value).lower() if isinstance(value, bool) else value}\n")
    with summary_file.open("a", encoding="utf-8") as f:
        f.write(f"\n### NCERT Class 9 Maths multi-day batch\n\n{message}\n")


def prepare(args: argparse.Namespace) -> None:
    state, etag = load(args.repo)
    operation = "tick" if args.event == "schedule" else args.operation
    out = {"run": False}
    if operation == "start":
        if state is not None and state["enabled"]:
            raise ValueError("Batch already armed; stop it explicitly before rearming")
        state = new_state(code_sha=args.commit_sha,
                          notes_sha=branch_sha(args.repo, NOTES_BRANCH),
                          model=args.model, budget=args.budget, run_id=args.run_id)
        save(args.repo, state, file_sha=etag, base_sha=args.commit_sha)
        message = "Armed for the NEXT scheduled daily tick. No Gemini API calls in this start run."
    elif operation == "stop":
        if state is not None:
            save(args.repo, stop(state), file_sha=etag, base_sha=args.commit_sha)
        message = "Batch stopped (or was never started). No Gemini API calls."
    elif operation == "status":
        message = ("Batch has not been armed." if state is None else
                   f"Enabled={state['enabled']}, status={state['status']}, "
                   f"last run={state['last_run_id']}, resume={state['resume_run_id']}.")
    elif operation == "tick":
        if state is None:
            message = "No opt-in state exists; scheduled tick did nothing."
        else:
            # No GitHub checkout of AI code, PDFs or model calls before this gate.
            if not state["enabled"]:
                message = f"Batch disabled: {state['status']}."
            else:
                next_state, run, message = claim_day(
                    state, run_id=args.run_id,
                    today=datetime.now(timezone.utc).date().isoformat(),
                    current_notes_sha=branch_sha(args.repo, NOTES_BRANCH))
                if run and (state["status"] == "armed"
                            and state["last_run_id"] is None
                            and state["daily_budget"] == PREVIOUS_DAILY_BUDGET
                            and args.budget == MAX_DAILY_BUDGET):
                    # Upgrade the existing opt-in batch without resetting its
                    # notes SHA, checkpoints, daily claim, or schedule. A failed
                    # claim never changes the budget or invokes Gemini.
                    next_state["daily_budget"] = MAX_DAILY_BUDGET
                    message += " Existing armed batch budget upgraded from 6 to 18 attempts."
                if next_state != state:
                    save(args.repo, next_state, file_sha=etag, base_sha=args.commit_sha)
                if run:
                    out = {
                        "run": True,
                        "code_sha": next_state["automation_sha"],
                        "notes_sha": next_state["notes_sha"],
                        "model": next_state["model"],
                        "budget": next_state["daily_budget"],
                        "resume_run_id": next_state["resume_run_id"],
                        "min_request_seconds": next_state["min_request_seconds"],
                    }
    else:
        raise ValueError("Unknown user operation")
    print(message, flush=True)
    output(out, output_file=args.output, summary_file=args.summary, message=message)


def finalize(args: argparse.Namespace) -> None:
    state, etag = load(args.repo)
    if state is None:
        raise ValueError("No state found for run finalization")
    try:
        reports = json.loads(args.report.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        reports = []
    result = report_state(reports, exit_code=args.exit_code,
                          publish_ok=(args.publish_ok == "true"))
    previous_state = dict(state)
    next_state = advance(state, run_id=args.run_id, result=result,
                         artifact_uploaded=(args.artifact_uploaded == "true"),
                         checkpoint_count=args.checkpoint_count,
                         draft_pr_url=(args.draft_url if args.draft_url else None))
    if previous_state != next_state:
        save(args.repo, next_state, file_sha=etag, base_sha=args.commit_sha)
    msg = (f"Run result: **{result}**. Enabled for later scheduled reviews: "
           f"**{next_state['enabled']}**. Checkpoint resume ID: "
           f"**{next_state['resume_run_id']}**. No automatic merge/deploy.")
    print(msg, flush=True)
    with args.summary.open("a", encoding="utf-8") as f:
        f.write("\n" + msg + "\n")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=["prepare", "finalize"])
    parser.add_argument("--repo", required=True)
    parser.add_argument("--event", default="workflow_dispatch")
    parser.add_argument("--operation", choices=["start", "stop", "status"], default="status")
    parser.add_argument("--commit-sha", required=True)
    parser.add_argument("--run-id", type=int, required=True)
    parser.add_argument("--model", default=ALLOWED_MODELS[0])
    parser.add_argument("--budget", type=int, default=18)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--summary", type=Path, required=True)
    parser.add_argument("--report", type=Path)
    parser.add_argument("--exit-code", type=int, default=1)
    parser.add_argument("--publish-ok", default="false")
    parser.add_argument("--artifact-uploaded", default="false")
    parser.add_argument("--checkpoint-count", type=int, default=0)
    parser.add_argument("--draft-url", default="")
    args = parser.parse_args()
    if not REPO.fullmatch(args.repo):
        parser.error("Invalid repository identifier")
    check_sha(args.commit_sha)
    if args.command == "prepare":
        if not args.output:
            parser.error("--output required for prepare")
        prepare(args)
    else:
        if not args.report:
            parser.error("--report required for finalize")
        finalize(args)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (ValueError, RuntimeError) as error:
        print(f"::error::{error}", file=sys.stderr)
        sys.exit(1)
