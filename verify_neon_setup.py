"""Verify a StudyAI Neon setup without printing secrets."""
from __future__ import annotations

import os
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

EXPECTED_TABLES = {
    "users",
    "oauth_identities",
    "user_state",
    "question_reports",
    "client_errors",
}


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit("CHECK FAILED: " + message)
    print("PASS:", message)


def validate_url(name: str, value: str, pooled: bool) -> None:
    require(bool(value), f"{name} is configured.")
    parsed = urlparse(value)
    require(
        parsed.scheme in {"postgres", "postgresql"} and bool(parsed.hostname) and bool(parsed.path.strip("/")),
        f"{name} is a valid PostgreSQL URL.",
    )
    if parsed.hostname and parsed.hostname.endswith(".neon.tech"):
        sslmode = parse_qs(parsed.query).get("sslmode", [""])[0]
        require(sslmode in {"require", "verify-ca", "verify-full"}, f"{name} uses TLS.")
        if pooled:
            require("-pooler." in parsed.hostname, f"{name} uses the Neon pooled endpoint.")
        else:
            require("-pooler." not in parsed.hostname, f"{name} uses the Neon direct endpoint.")


def check_connection(label: str, url: str) -> dict[str, int]:
    with psycopg.connect(
        url,
        row_factory=dict_row,
        connect_timeout=10,
        application_name="studyai-verify",
    ) as conn:
        identity = conn.execute(
            "SELECT current_database() AS database_name, current_user AS role_name"
        ).fetchone()
        require(bool(identity["database_name"]) and bool(identity["role_name"]),
                f"{label} connection authenticates successfully.")

        rows = conn.execute(
            """SELECT table_name
               FROM information_schema.tables
               WHERE table_schema='public' AND table_type='BASE TABLE'"""
        ).fetchall()
        tables = {row["table_name"] for row in rows}
        missing = EXPECTED_TABLES - tables
        require(not missing, f"{label} sees every StudyAI table.")

        counts = {}
        for table in sorted(EXPECTED_TABLES):
            counts[table] = int(conn.execute(f"SELECT COUNT(*) AS count FROM {table}").fetchone()["count"])
        return counts


def main() -> int:
    pooled = os.getenv("DATABASE_URL", "").strip()
    direct = os.getenv("DATABASE_URL_UNPOOLED", "").strip()

    validate_url("DATABASE_URL", pooled, pooled=True)
    validate_url("DATABASE_URL_UNPOOLED", direct, pooled=False)

    pooled_counts = check_connection("Pooled", pooled)
    direct_counts = check_connection("Direct", direct)

    require(pooled_counts == direct_counts, "Pooled and direct endpoints see identical StudyAI row counts.")

    print("StudyAI Neon verification")
    print("========================")
    for table in sorted(EXPECTED_TABLES):
        print(f"{table}: {pooled_counts[table]} row(s)")
    print("READY: Neon pooled and direct connections are healthy and schema-compatible.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
