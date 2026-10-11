#!/usr/bin/env python3
"""Offline-safe checkpointing and request accounting for NCERT Gemini reviews.

A stage is persisted ONLY after its existing deterministic validation succeeds.
Checkpoints contain source notes/model responses (never API keys); the GitHub
Actions artifact is a private-to-the-run intermediate, not a publishable lesson.
"""
from __future__ import annotations
import hashlib
import json
import os
from pathlib import Path
import time

STAGES = ("coverage", "challenge", "draft", "math", "closure")
SCHEMA = 1
MAX_STAGE_FILE_BYTES = 250_000


class RequestBudgetExhausted(RuntimeError):
    """Safely stop before sending an API call that exceeds this run's budget."""


class RequestPacer:
    """Count every actual Gemini generate attempt, including failed retries."""

    def __init__(self, maximum: int, min_interval: float = 25, *, clock=None, sleep=None):
        if type(maximum) is not int or not 1 <= maximum <= 20:
            raise ValueError("Request budget must be between 1 and 20")
        if not 0 <= min_interval <= 300:
            raise ValueError("Request interval must be between 0 and 300 seconds")
        self.maximum = maximum
        self.min_interval = min_interval
        self.clock = clock or time.monotonic
        self.sleep = sleep or time.sleep
        self.attempts = 0
        self.last_attempt = None

    def __call__(self, send):
        if self.attempts >= self.maximum:
            raise RequestBudgetExhausted(
                f"Gemini request budget reached ({self.attempts}/{self.maximum}); "
                "completed stages saved. Download checkpoints and resume in a later "
                "manually dispatched run with resume_run_id."
            )
        now = self.clock()
        if self.last_attempt is not None:
            delay = max(0.0, self.min_interval - (now - self.last_attempt))
            if delay:
                print(f"  Pacing Gemini: waiting {delay:.1f}s before the next API attempt.", flush=True)
                self.sleep(delay)
        self.last_attempt = self.clock()
        self.attempts += 1
        print(f"  Gemini generate attempt {self.attempts}/{self.maximum}", flush=True)
        return send()


def _digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _json_bytes(data) -> bytes:
    return json.dumps(data, ensure_ascii=False, sort_keys=True,
                      separators=(",", ":")).encode("utf-8")


def build_fingerprint(pdf: Path, notes: dict, entry: dict, model: str,
                      source_files: list[Path]) -> str:
    """Invalidate saved stages for ANY change in sources, model, or audit code."""
    payload = {
        "schema": SCHEMA, "pdf_sha256": _digest(pdf.read_bytes()),
        "notes_sha256": _digest(_json_bytes(notes)),
        "entry": entry, "model": model,
        "source_sha256": {p.name: _digest(p.read_bytes()) for p in source_files},
    }
    return _digest(_json_bytes(payload))


def _write_atomic(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    encoded = _json_bytes(data)
    if len(encoded) > MAX_STAGE_FILE_BYTES:
        raise ValueError("Audit stage checkpoint exceeds maximum safe size")
    temp = path.with_suffix(path.suffix + ".tmp")
    try:
        with temp.open("wb") as stream:
            stream.write(encoded)
            stream.flush()
            os.fsync(stream.fileno())
        temp.replace(path)
    finally:
        temp.unlink(missing_ok=True)


class StageCheckpoints:
    """One tightly source-bound checkpoint directory per numbered chapter."""

    def __init__(self, root: Path, chapter: int, fingerprint: str):
        if type(chapter) is not int or not 1 <= chapter <= 14:
            raise ValueError("Invalid chapter for checkpoint")
        self.path = root / f"chapter-{chapter:02}"
        self.fingerprint = fingerprint
        self.meta_path = self.path / "manifest.json"
        self.pending = {}
        expected = {"schema": SCHEMA, "chapter": chapter, "fingerprint": fingerprint}
        if self.meta_path.exists():
            try:
                existing = json.loads(self.meta_path.read_text(encoding="utf-8"))
            except (ValueError, UnicodeError) as exc:
                raise ValueError("Unreadable existing checkpoint manifest; refusing to resume") from exc
            if existing != expected:
                raise ValueError(
                    "Checkpoint source/model/audit-code fingerprint mismatch. "
                    "Do not replay stages generated from a different textbook, "
                    "notes revision, model or pipeline version. Start with an empty "
                    "checkpoint directory, or explicitly restore the matching inputs."
                )
        else:
            if self.path.exists() and any(self.path.iterdir()):
                raise ValueError("Checkpoint stage files exist without a manifest")
            _write_atomic(self.meta_path, expected)

    def restart_from(self, stage: str) -> None:
        """Explicit manual re-review: discard chosen stage and all later stages."""
        if stage not in STAGES:
            raise ValueError("Invalid restart stage")
        for name in STAGES[STAGES.index(stage):]:
            (self.path / (name + ".json")).unlink(missing_ok=True)
            self.pending.pop(name, None)
        print(f"  Manually restarting deep review from: {stage}", flush=True)

    def fetch(self, stage: str, prompt: str, request):
        if stage not in STAGES:
            raise ValueError("Unknown deep audit stage")
        prompt_sha = _digest(prompt.encode("utf-8"))
        path = self.path / (stage + ".json")
        if path.exists():
            if path.stat().st_size > MAX_STAGE_FILE_BYTES:
                raise ValueError("Oversized checkpoint; refusing to resume")
            try:
                record = json.loads(path.read_text(encoding="utf-8"))
            except (ValueError, UnicodeError) as exc:
                raise ValueError(f"Invalid checkpoint for {stage}") from exc
            if (not isinstance(record, dict)
                    or record.get("schema") != SCHEMA
                    or record.get("stage") != stage
                    or record.get("prompt_sha256") != prompt_sha
                    or not isinstance(record.get("response"), dict)):
                raise ValueError(
                    f"Checkpoint validation mismatch at {stage}. "
                    "Input prompt or stage content changed; refusing unsafe replay."
                )
            print(f"  Reusing validated checkpoint: {stage} (no Gemini request).", flush=True)
            return record["response"]
        result = request(stage, prompt)
        self.pending[stage] = {
            "schema": SCHEMA, "stage": stage, "prompt_sha256": prompt_sha,
            "response": result,
        }
        return result

    def commit(self, stage: str) -> None:
        """Called after the existing source/maths/schema gate accepts the stage."""
        if stage in self.pending:
            _write_atomic(self.path / (stage + ".json"), self.pending.pop(stage))
            print(f"  Saved validated checkpoint: {stage}", flush=True)
