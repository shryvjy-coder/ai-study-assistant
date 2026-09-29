"""Pre-beta server smoke tests for StudyAI account, privacy, and deployment APIs."""
from __future__ import annotations

import os
import subprocess
import sys
import tempfile
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

with tempfile.TemporaryDirectory(prefix="studyai-prebeta-") as temp_dir:
    os.environ["SECRET_KEY"] = "ci-private-beta-secret-key-0123456789abcdef"
    os.environ["FLASK_DEBUG"] = "0"
    os.environ["COOKIE_SECURE"] = "0"
    os.environ["TRUST_PROXY"] = "0"
    os.environ["BETA_ACCESS_CODE"] = "beta-test-code"
    os.environ["DATABASE_PATH"] = str(Path(temp_dir) / "studyai.sqlite")

    from app import app  # noqa: E402

    client = app.test_client()
    checks = 0

    def check(condition: bool, message: str) -> None:
        global checks
        assert condition, message
        checks += 1
        print("PASS", message)

    me = client.get("/api/auth/me")
    me_json = me.get_json()
    check(me.status_code == 200 and me_json["registration_mode"] == "invite",
          "invite-only registration mode is advertised")
    check("noindex" in me.headers.get("X-Robots-Tag", ""),
          "invite-only beta sends noindex response header")

    missing = client.post("/api/auth/register", json={
        "email": "beta@example.test",
        "password": "local-test-only-42",
        "name": "Beta Tester",
    })
    check(missing.status_code == 403, "registration rejects a missing beta access code")

    wrong = client.post("/api/auth/register", json={
        "email": "beta@example.test",
        "password": "local-test-only-42",
        "name": "Beta Tester",
        "access_code": "wrong-code",
    })
    check(wrong.status_code == 403, "registration rejects an incorrect beta access code")

    created = client.post("/api/auth/register", json={
        "email": "beta@example.test",
        "password": "local-test-only-42",
        "name": "Beta Tester",
        "access_code": "beta-test-code",
    })
    check(created.status_code == 200 and created.get_json()["user"]["email"] == "beta@example.test",
          "registration accepts the correct beta access code")

    empty_state = client.get("/api/state").get_json()
    check(empty_state["has_state"] is False, "new beta account starts without cloud state")

    saved = client.put("/api/state", json={"state": {
        "theme": "dark",
        "productPrefs": {"pathway": "SAT", "dailyMinutes": 40},
        "activeStudySession": None,
    }})
    check(saved.status_code == 200, "signed-in account can save cloud study state")

    restored = client.get("/api/state").get_json()
    check(restored["has_state"] is True and restored["state"]["theme"] == "dark",
          "saved cloud state round-trips")

    report = client.post("/api/question-reports", json={
        "source": "pre-beta-test",
        "category": "format",
        "question_text": "Fixture question",
        "details": "Automated pre-beta report",
        "page": "#practice",
    })
    check(report.status_code == 200 and report.get_json().get("report_id"),
          "question reporting persists a bounded report")

    bad_report = client.post("/api/question-reports", json={
        "source": "pre-beta-test",
        "category": "not-a-category",
        "question_text": "Fixture question",
    })
    check(bad_report.status_code == 400, "question reporting rejects invalid categories")

    blocked = client.post(
        "/api/question-reports",
        headers={"Origin": "https://attacker.example"},
        json={"source": "test", "category": "format", "question_text": "Blocked"},
    )
    check(blocked.status_code == 403, "state-changing API blocks cross-origin requests")

    exported = client.get("/api/account/export")
    exported_json = exported.get_json()
    check(exported.status_code == 200 and exported_json["state"]["theme"] == "dark",
          "account export contains synced study state")
    check(len(exported_json["question_reports"]) == 1,
          "account export contains the user's question reports")

    logout = client.post("/api/auth/logout")
    check(logout.status_code == 200, "account can sign out")
    check(client.get("/api/state").status_code == 401, "signed-out account cannot read cloud state")

    login = client.post("/api/auth/login", json={
        "email": "beta@example.test",
        "password": "local-test-only-42",
    })
    check(login.status_code == 200, "existing beta account can sign back in")

    wrong_delete = client.delete("/api/account", json={"confirm": "NO"})
    check(wrong_delete.status_code == 400, "account deletion requires explicit DELETE confirmation")

    deleted = client.delete("/api/account", json={"confirm": "DELETE"})
    check(deleted.status_code == 200, "account deletion succeeds with explicit confirmation")

    after_delete = client.post("/api/auth/login", json={
        "email": "beta@example.test",
        "password": "local-test-only-42",
    })
    check(after_delete.status_code == 401, "deleted account can no longer sign in")

    health = client.get("/api/health")
    check(health.status_code == 200 and health.get_json()["database"] == "ready",
          "health endpoint confirms database readiness")

    repo_root = REPO_ROOT
    blueprint = (repo_root / "render-private-beta.yaml").read_text(encoding="utf-8")
    procfile = (repo_root / "Procfile").read_text(encoding="utf-8")
    check("numInstances: 1" in blueprint and "--workers 1" in blueprint,
          "Render beta keeps one service instance and one Gunicorn worker")
    check("DATABASE_PATH" in blueprint and "/var/data/studyai.db" in blueprint and "disk:" in blueprint,
          "Render beta stores SQLite on the persistent /var/data disk")
    check("--workers 1" in procfile, "Procfile keeps a single SQLite-writing Gunicorn worker")

    preflight_env = os.environ.copy()
    preflight_env.update({
        "SECRET_KEY": "0123456789012345678901234567890123456789",
        "FLASK_DEBUG": "0",
        "COOKIE_SECURE": "1",
        "TRUST_PROXY": "1",
        "DATABASE_PATH": "/var/data/studyai.db",
        "BETA_ACCESS_CODE": "beta-test-code",
        "GEMINI_API_KEY": "ci-placeholder",
        "STUDYAI_AI_DAILY_TEXT_LIMIT": "60",
        "STUDYAI_AI_DAILY_AUDIO_LIMIT": "10",
    })
    preflight = subprocess.run(
        [sys.executable, str(repo_root / "production_preflight.py")],
        cwd=repo_root,
        env=preflight_env,
        capture_output=True,
        text=True,
        check=False,
    )
    check(preflight.returncode == 0 and "READY:" in preflight.stdout,
          "production preflight accepts the intended private-beta environment")

    print("TOTAL", checks, "pre-beta server checks passed")
