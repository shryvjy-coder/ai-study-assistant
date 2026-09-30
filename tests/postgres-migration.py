"""Exercise the one-time SQLite -> PostgreSQL migration against CI PostgreSQL."""
from __future__ import annotations

import json
import os
import sqlite3
import subprocess
import sys
import tempfile
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

if not os.environ.get("DATABASE_URL", "").strip():
    raise SystemExit("DATABASE_URL is required for the PostgreSQL migration test.")

from database import SQLITE_SCHEMA, db  # noqa: E402


def check(condition: bool, message: str) -> None:
    assert condition, message
    print("PASS", message)


with tempfile.TemporaryDirectory(prefix="studyai-migration-test-") as temp_dir:
    source_path = Path(temp_dir) / "source.sqlite"
    source = sqlite3.connect(source_path)
    try:
        source.executescript(SQLITE_SCHEMA)
        source.execute(
            "INSERT INTO users(id,email,name,password_hash,created_at,last_login) VALUES(?,?,?,?,?,?)",
            (41, "migration@example.test", "Migration User", "hash-fixture", 100, 200),
        )
        source.execute(
            "INSERT INTO oauth_identities(id,user_id,provider,provider_sub,created_at) VALUES(?,?,?,?,?)",
            (12, 41, "google", "fixture-sub", 110),
        )
        source.execute(
            "INSERT INTO user_state(user_id,state_json,updated_at) VALUES(?,?,?)",
            (41, json.dumps({"theme": "dark", "productPrefs": {"pathway": "SAT"}}), 210),
        )
        source.execute(
            """INSERT INTO question_reports(
                id,user_id,source,question_ref,category,details,question_text,passage,context,page,created_at
            ) VALUES(?,?,?,?,?,?,?,?,?,?,?)""",
            (8, 41, "fixture", "q1", "format", "detail", "Question", "", "", "#practice", 220),
        )
        source.execute(
            """INSERT INTO client_errors(
                id,user_id,message,source,line,column_no,page,created_at
            ) VALUES(?,?,?,?,?,?,?,?)""",
            (9, 41, "fixture error", "script.js", 10, 20, "#today", 230),
        )
        source.commit()
    finally:
        source.close()

    migration = subprocess.run(
        [sys.executable, str(REPO_ROOT / "migrate_sqlite_to_postgres.py"), "--source", str(source_path)],
        cwd=REPO_ROOT,
        env=os.environ.copy(),
        capture_output=True,
        text=True,
        check=False,
    )
    check(migration.returncode == 0, "SQLite data migrates into PostgreSQL")

    with db() as conn:
        user = conn.execute("SELECT id,email,name FROM users WHERE id=?", (41,)).fetchone()
        state = conn.execute("SELECT state_json FROM user_state WHERE user_id=?", (41,)).fetchone()
        identity = conn.execute("SELECT provider,provider_sub FROM oauth_identities WHERE id=?", (12,)).fetchone()
        report = conn.execute("SELECT category,question_text FROM question_reports WHERE id=?", (8,)).fetchone()
        error = conn.execute("SELECT message,line,column_no FROM client_errors WHERE id=?", (9,)).fetchone()
        fk_rows = conn.execute(
            """SELECT conrelid::regclass::text AS table_name, COUNT(*) AS foreign_keys
               FROM pg_constraint
               WHERE contype='f'
                 AND connamespace='public'::regnamespace
                 AND conrelid::regclass::text IN (
                     'oauth_identities','user_state','question_reports','client_errors'
                 )
               GROUP BY conrelid
               ORDER BY table_name"""
        ).fetchall()
        identity_rows = conn.execute(
            """SELECT table_name, column_name, is_identity
               FROM information_schema.columns
               WHERE table_schema='public'
                 AND table_name IN ('users','oauth_identities','question_reports','client_errors')
                 AND column_name='id'
               ORDER BY table_name"""
        ).fetchall()

    check(user and user["email"] == "migration@example.test", "migrated account preserves ID and profile")
    check(state and json.loads(state["state_json"])["theme"] == "dark", "migrated StudyAI state is intact")
    check(identity and identity["provider_sub"] == "fixture-sub", "migrated OAuth identity is intact")
    check(report and report["category"] == "format", "migrated question report is intact")
    check(error and error["line"] == 10 and error["column_no"] == 20, "migrated client diagnostic is intact")
    check(
        {row["table_name"]: int(row["foreign_keys"]) for row in fk_rows}
        == {
            "client_errors": 1,
            "oauth_identities": 1,
            "question_reports": 1,
            "user_state": 1,
        },
        "PostgreSQL schema has exactly one intended foreign key per relationship table",
    )
    check(
        len(identity_rows) == 4 and all(row["is_identity"] == "YES" for row in identity_rows),
        "PostgreSQL generated ID columns remain identity columns",
    )

    verify = subprocess.run(
        [
            sys.executable,
            str(REPO_ROOT / "migrate_sqlite_to_postgres.py"),
            "--source",
            str(source_path),
            "--verify-only",
        ],
        cwd=REPO_ROOT,
        env=os.environ.copy(),
        capture_output=True,
        text=True,
        check=False,
    )
    check(verify.returncode == 0, "migration verify-only mode confirms exact table contents")

print("PostgreSQL migration test passed.")
