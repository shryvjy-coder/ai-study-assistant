"""StudyAI production/private-beta environment preflight.

Run before deploying:
    python production_preflight.py

The script never prints secret values.
"""
from __future__ import annotations

import os
from pathlib import Path


def truth(name: str) -> str:
    return os.getenv(name, "").strip()


checks = []
warnings = []


def require(condition: bool, message: str) -> None:
    (checks if condition else warnings).append((condition, message))


secret = truth("SECRET_KEY")
require(len(secret) >= 32 and secret != "dev-change-this-secret-key",
        "SECRET_KEY is configured and at least 32 characters.")
require(truth("FLASK_DEBUG") == "0",
        "FLASK_DEBUG=0.")
require(truth("COOKIE_SECURE") == "1",
        "COOKIE_SECURE=1 for HTTPS.")
require(truth("TRUST_PROXY") == "1",
        "TRUST_PROXY=1 when running behind Render's trusted proxy.")

database = truth("DATABASE_PATH")
require(bool(database), "DATABASE_PATH is configured.")
if database:
    path = Path(database)
    require(path.is_absolute(),
            "DATABASE_PATH is absolute so persistence is unambiguous.")
    if str(path).startswith("/var/data/"):
        checks.append((True, "DATABASE_PATH targets the planned persistent Render disk."))

beta = truth("BETA_ACCESS_CODE")
require(len(beta) >= 8,
        "BETA_ACCESS_CODE is set to at least 8 characters for a controlled beta.")

if not truth("GEMINI_API_KEY"):
    warnings.append((False, "GEMINI_API_KEY is not set; core StudyAI works, but Personal AI will be unavailable."))

text_limit = truth("STUDYAI_AI_DAILY_TEXT_LIMIT")
audio_limit = truth("STUDYAI_AI_DAILY_AUDIO_LIMIT")
require(text_limit.isdigit() and 1 <= int(text_limit) <= 500,
        "A finite STUDYAI_AI_DAILY_TEXT_LIMIT is configured.")
require(audio_limit.isdigit() and 1 <= int(audio_limit) <= 100,
        "A finite STUDYAI_AI_DAILY_AUDIO_LIMIT is configured.")

print("StudyAI production preflight")
print("============================")
for _, message in checks:
    print("PASS:", message)
for _, message in warnings:
    print("CHECK:", message)

blocking = [
    message for ok, message in warnings
    if not ("GEMINI_API_KEY" in message)
]
if blocking:
    print("\nNOT READY:", len(blocking), "blocking check(s) need attention.")
    raise SystemExit(1)

print("\nREADY: critical private-beta environment checks passed.")
