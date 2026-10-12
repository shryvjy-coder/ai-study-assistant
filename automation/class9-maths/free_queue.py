#!/usr/bin/env python3
"""Quota-aware chapter queue for the FREE, opt-in NCERT audit.

This module NEVER invokes an AI model or downloads a textbook. It schedules
independent verified chapters and persists their reviewed reports in the SAME
trusted GitHub Actions checkpoint artifact as stage checkpoints. The separate
pipeline alone owns the hard budget and rate-pacing of real Gemini attempts.

Plan -> pipeline (--chapter comma-list, shared RequestPacer) -> reconcile.
A blocked PDF or chapter doesn't stop the others. Publication is impossible
until every expected chapter has a successfully validated final report.
"""
from __future__ import annotations

import argparse
from datetime import date, timedelta
import hashlib
import json
from pathlib import Path
import re

CHAPTERS = tuple(range(5, 15))
SCHEMA = 1
MAX_BYTES = 2_000_000
MAX_BLOCKS = 3
MAX_LESSONS = 2


def _sha(raw: bytes) -> str:
    return hashlib.sha256(raw).hexdigest()


def identity(manifest: Path, notes: Path, model: str, code_sha: str) -> dict:
    if not re.fullmatch(r"[0-9a-f]{40}", code_sha):
        raise ValueError("Invalid trusted review-code SHA")
    data = json.loads(manifest.read_text(encoding="utf-8"))
    nums = tuple(int(x["number"]) for x in data["chapters"])
    if nums != tuple(range(1, 15)):
        raise ValueError("Expected official 14-chapter manifest")
    other = json.loads(notes.read_text(encoding="utf-8"))
    if tuple(int(x["number"]) for x in other["chapters"]) != nums:
        raise ValueError("Exported notes don't match approved chapter list")
    for a, b in zip(data["chapters"], other["chapters"]):
        if a["title"] != b["title"]:
            raise ValueError("Manifest and exported notes chapter mismatch")
    if not model or len(model) > 100:
        raise ValueError("Invalid model")
    return {
        "code_sha": code_sha,
        "manifest_sha256": _sha(manifest.read_bytes()),
        "notes_sha256": _sha(notes.read_bytes()),
        "model": model,
    }


def initial(ident: dict) -> dict:
    return {"schema": SCHEMA, "identity": ident, "items": {
        str(number): {"status": "pending", "blocks": 0, "retry_day": None}
        for number in CHAPTERS
    }}


def load(path: Path, ident: dict) -> dict:
    if not path.exists():
        return initial(ident)
    if path.stat().st_size > MAX_BYTES:
        raise ValueError("Oversized chapter queue; refusing untrusted resume")
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict) or data.get("schema") != SCHEMA:
        raise ValueError("Unsupported queue schema")
    if data.get("identity") != ident:
        raise ValueError("Queue sources, model, or pinned audit code changed: explicit rearm required")
    items = data.get("items")
    if not isinstance(items, dict) or set(items) != {str(n) for n in CHAPTERS}:
        raise ValueError("Queue contains unknown or missing chapters")
    for record in items.values():
        if not isinstance(record, dict) or record.get("status") not in (
            "pending", "paused", "blocked", "processed"
        ):
            raise ValueError("Invalid queued chapter status")
        blocks = record.get("blocks")
        if type(blocks) is not int or not 0 <= blocks <= MAX_BLOCKS:
            raise ValueError("Invalid retry counter")
        retry_day = record.get("retry_day")
        if retry_day is not None:
            date.fromisoformat(retry_day)
        if record["status"] == "processed":
            report = record.get("report")
            if not isinstance(report, dict) or report.get("status") != "processed":
                raise ValueError("Missing verified successful chapter report")
    return data


def save(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    raw = json.dumps(data, ensure_ascii=False, sort_keys=True, indent=2) + "\n"
    if len(raw.encode("utf-8")) > MAX_BYTES:
        raise ValueError("Queue report exceeds safe artifact size")
    temp = path.with_name(path.name + ".tmp")
    temp.write_text(raw, encoding="utf-8")
    temp.replace(path)


def eligible(queue: dict, today: date) -> list[int]:
    # Work on pending and partially staged chapters first. Blocked chapters
    # return after a measured cooldown instead of repeatedly eating the budget.
    chosen = []
    for number in CHAPTERS:
        record = queue["items"][str(number)]
        if record["status"] == "processed" or record["blocks"] >= MAX_BLOCKS:
            continue
        retry_day = record["retry_day"]
        if retry_day and date.fromisoformat(retry_day) > today:
            continue
        chosen.append(number)
    return chosen


def reconcile(queue: dict, attempted: list[int], reports: list, today: date) -> dict:
    if not isinstance(reports, list):
        raise ValueError("Invalid audit report")
    allowed = set(attempted)
    reported = set()
    for report in reports:
        if not isinstance(report, dict):
            raise ValueError("Malformed individual chapter report")
        number = report.get("chapter_number")
        if type(number) is not int or number not in allowed or number in reported:
            raise ValueError("Unexpected, repeated or unrequested chapter result")
        reported.add(number)
        record = queue["items"][str(number)]
        status = report.get("status")
        if status == "processed":
            lessons = report.get("candidate_lessons")
            if not isinstance(lessons, list) or len(lessons) > MAX_LESSONS:
                raise ValueError("Unverified or excessive candidate lessons")
            record.update(status="processed", blocks=0, retry_day=None, report=report)
        elif status == "paused":
            record.update(status="paused", retry_day=None)
        elif status == "blocked":
            blocks = record["blocks"] + 1
            record.update(status="blocked", blocks=blocks,
                          retry_day=(today + timedelta(days=2 ** blocks)).isoformat())
        else:
            raise ValueError("Unknown chapter audit outcome")
    return queue


def collected(queue: dict) -> list[dict]:
    return [queue["items"][str(n)]["report"] for n in CHAPTERS
            if queue["items"][str(n)]["status"] == "processed"]


def status(queue: dict) -> str:
    if len(collected(queue)) == len(CHAPTERS):
        return "complete"
    if any(x["blocks"] >= MAX_BLOCKS for x in queue["items"].values()):
        return "needs_attention"
    return "paused"


def summary(queue: dict) -> str:
    counts = {kind: sum(record["status"] == kind for record in queue["items"].values())
              for kind in ("processed", "pending", "paused", "blocked")}
    return ("Verified chapters: {processed}/10; pending: {pending}; "
            "paused: {paused}; temporarily blocked: {blocked}. "
            "Queue state: " + status(queue) + ".").format(**counts)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("action", choices=("plan", "reconcile"))
    parser.add_argument("--manifest", type=Path, required=True)
    parser.add_argument("--notes", type=Path, required=True)
    parser.add_argument("--queue", type=Path, required=True)
    parser.add_argument("--model", required=True)
    parser.add_argument("--code-sha", required=True)
    parser.add_argument("--today", default=date.today().isoformat())
    parser.add_argument("--plan", type=Path, required=True)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--github-output", type=Path)
    args = parser.parse_args()
    today = date.fromisoformat(args.today)
    ident = identity(args.manifest, args.notes, args.model, args.code_sha)
    queue = load(args.queue, ident)
    if args.action == "plan":
        selected = eligible(queue, today)
        args.plan.parent.mkdir(parents=True, exist_ok=True)
        save(args.queue, queue)
        args.plan.write_text(json.dumps(selected) + "\n", encoding="utf-8")
        if args.github_output:
            with args.github_output.open("a", encoding="utf-8") as output:
                output.write("chapters=" + ",".join(map(str, selected)) + "\n")
                output.write("has_work=" + str(bool(selected)).lower() + "\n")
        print(summary(queue) + " Scheduled: " + (",".join(map(str, selected)) or "none"))
        return 0
    selected = json.loads(args.plan.read_text(encoding="utf-8"))
    if not isinstance(selected, list) or any(
        type(n) is not int or n not in CHAPTERS for n in selected
    ) or len(set(selected)) != len(selected):
        raise ValueError("Invalid selected chapter list")
    if not args.output:
        parser.error("--output required to reconcile")
    raw_path = args.output / "audit.json"
    reports = json.loads(raw_path.read_text(encoding="utf-8")) if raw_path.exists() else []
    reconcile(queue, selected, reports, today)
    save(args.queue, queue)
    merged = collected(queue)
    args.output.mkdir(parents=True, exist_ok=True)
    (args.output / "audit.json").write_text(
        json.dumps(merged, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    candidates = [{
        "chapter_number": item["chapter_number"],
        "chapter_title": item["chapter_title"],
        "lessons": item["candidate_lessons"],
    } for item in merged if item.get("candidate_lessons")]
    (args.output / "candidate-lessons.json").write_text(
        json.dumps(candidates, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    lines = [
        "# NCERT Class 9 Maths — checkpointed, free-tier review",
        "", summary(queue), "",
        "Only verified chapter results are eligible for publication. "
        "Unverified or blocked chapters never become draft notes.",
    ]
    for number in CHAPTERS:
        record = queue["items"][str(number)]
        lines.append(f"- Chapter {number}: {record['status']}"
                     + (f", next retry {record['retry_day']}" if record["retry_day"] else ""))
    # Retain the full, source-cited model/deterministic validation narrative
    # in the draft-review body; a queue-status table alone is insufficient
    # evidence for an NCERT content review.
    from pipeline import render_report
    source_review = render_report(merged, args.model, "propose") if merged else ""
    (args.output / "audit.md").write_text(
        "\n".join(lines) + "\n\n" + source_review + "\n", encoding="utf-8")
    current = status(queue)
    if args.github_output:
        with args.github_output.open("a", encoding="utf-8") as output:
            output.write("queue_complete=" + str(current == "complete").lower() + "\n")
            output.write("queue_status=" + current + "\n")
    print(summary(queue))
    return 2 if current == "needs_attention" else 0


if __name__ == "__main__":
    raise SystemExit(main())
