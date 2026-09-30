"""One-time SQLite -> PostgreSQL migration for StudyAI.

Usage:
    set DATABASE_URL=<Neon PostgreSQL connection string>
    python migrate_sqlite_to_postgres.py --source studyai.db

The script:
- never prints DATABASE_URL;
- refuses to overwrite a non-empty PostgreSQL target;
- preserves primary keys and foreign-key relationships;
- verifies row counts after copying;
- resets PostgreSQL identity sequences.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import sqlite3
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

TABLES = {
    "users": ["id", "email", "name", "password_hash", "created_at", "last_login"],
    "oauth_identities": ["id", "user_id", "provider", "provider_sub", "created_at"],
    "user_state": ["user_id", "state_json", "updated_at"],
    "question_reports": [
        "id", "user_id", "source", "question_ref", "category", "details",
        "question_text", "passage", "context", "page", "created_at",
    ],
    "client_errors": [
        "id", "user_id", "message", "source", "line", "column_no", "page", "created_at",
    ],
}

IDENTITY_TABLES = ("users", "oauth_identities", "question_reports", "client_errors")


def parse_args():
    parser = argparse.ArgumentParser(description="Migrate StudyAI SQLite data to PostgreSQL.")
    parser.add_argument("--source", default="studyai.db", help="Path to the existing SQLite database.")
    parser.add_argument(
        "--verify-only",
        action="store_true",
        help="Only compare source/target counts and content digests. Do not write anything.",
    )
    return parser.parse_args()


def order_column(table: str) -> str:
    return "user_id" if table == "user_state" else "id"


def source_rows(conn: sqlite3.Connection, table: str, columns: list[str]):
    names = ",".join(columns)
    return conn.execute(
        f"SELECT {names} FROM {table} ORDER BY {order_column(table)}"
    ).fetchall()


def target_rows(conn, table: str, columns: list[str]):
    names = ",".join(columns)
    return conn.execute(
        f"SELECT {names} FROM {table} ORDER BY {order_column(table)}"
    ).fetchall()


def target_count(conn, table: str) -> int:
    return int(conn.execute(f"SELECT COUNT(*) AS count FROM {table}").fetchone()["count"])


def digest_rows(rows, columns: list[str]) -> str:
    digest = hashlib.sha256()
    for row in rows:
        payload = [row[column] for column in columns]
        digest.update(
            json.dumps(payload, ensure_ascii=False, separators=(",", ":"), default=str).encode("utf-8")
        )
        digest.update(b"\n")
    return digest.hexdigest()


def source_snapshot(conn: sqlite3.Connection) -> dict[str, tuple[int, str]]:
    result = {}
    for table, columns in TABLES.items():
        rows = source_rows(conn, table, columns)
        result[table] = (len(rows), digest_rows(rows, columns))
    return result


def target_snapshot(conn) -> dict[str, tuple[int, str]]:
    result = {}
    for table, columns in TABLES.items():
        rows = target_rows(conn, table, columns)
        result[table] = (len(rows), digest_rows(rows, columns))
    return result


def validate_neon_urls(pooled: str, direct: str) -> None:
    for name, value, expect_pooler in (
        ("DATABASE_URL", pooled, True),
        ("DATABASE_URL_UNPOOLED", direct, False),
    ):
        if not value:
            continue
        parsed = urlparse(value)
        if parsed.scheme not in {"postgres", "postgresql"} or not parsed.hostname or not parsed.path.strip("/"):
            raise SystemExit(f"{name} is not a valid PostgreSQL URL.")
        if parsed.hostname.endswith(".neon.tech"):
            sslmode = parse_qs(parsed.query).get("sslmode", [""])[0]
            if sslmode not in {"require", "verify-ca", "verify-full"}:
                raise SystemExit(f"{name} must use TLS for Neon.")
            if expect_pooler and "-pooler." not in parsed.hostname:
                raise SystemExit("DATABASE_URL must use the Neon pooled endpoint (-pooler hostname).")
            if not expect_pooler and "-pooler." in parsed.hostname:
                raise SystemExit("DATABASE_URL_UNPOOLED must use the Neon direct endpoint (no -pooler hostname).")


def snapshots_match(source: dict[str, tuple[int, str]], target: dict[str, tuple[int, str]]) -> bool:
    return all(source[table] == target[table] for table in TABLES)


def print_snapshot_comparison(source, target) -> None:
    for table in TABLES:
        source_count, source_digest = source[table]
        target_count_value, target_digest = target[table]
        status = "MATCH" if (source_count, source_digest) == (target_count_value, target_digest) else "DIFF"
        print(f"{table}: SQLite={source_count} PostgreSQL={target_count_value} {status}")


def main() -> int:
    args = parse_args()
    source_path = Path(args.source).expanduser().resolve()
    if not source_path.is_file():
        raise SystemExit(f"SQLite source not found: {source_path}")

    pooled = os.getenv("DATABASE_URL", "").strip()
    direct = os.getenv("DATABASE_URL_UNPOOLED", "").strip()
    if not (direct or pooled):
        raise SystemExit(
            "DATABASE_URL_UNPOOLED (preferred) or DATABASE_URL is required. "
            "Use the Neon direct PostgreSQL connection for migrations."
        )
    validate_neon_urls(pooled, direct)
    if direct:
        os.environ["DATABASE_URL"] = direct

    # Import only after selecting the migration connection so database.py
    # uses the direct Neon endpoint when DATABASE_URL_UNPOOLED is available.
    from database import db, init_db, is_postgres

    if not is_postgres():
        raise SystemExit("The configured migration URL did not select PostgreSQL.")

    source = sqlite3.connect(source_path)
    source.row_factory = sqlite3.Row
    source.execute("PRAGMA foreign_keys = ON")

    try:
        source_state = source_snapshot(source)

        init_db()

        with db() as target:
            target_state = target_snapshot(target)

            if args.verify_only:
                print_snapshot_comparison(source_state, target_state)
                if not snapshots_match(source_state, target_state):
                    print("VERIFY FAILED: one or more table contents differ.")
                    return 1
                print("VERIFY OK: every StudyAI table matches exactly.")
                return 0

            nonempty = {table: target_state[table][0] for table in TABLES if target_state[table][0]}
            if nonempty:
                if snapshots_match(source_state, target_state):
                    print("MIGRATION ALREADY COMPLETE: PostgreSQL matches the SQLite source exactly.")
                    return 0
                detail = ", ".join(f"{name}={count}" for name, count in nonempty.items())
                raise SystemExit(
                    "Refusing migration because PostgreSQL already contains different data: "
                    f"{detail}. Use a new/empty Neon database or investigate before retrying."
                )

            for table, columns in TABLES.items():
                rows = source_rows(source, table, columns)
                if not rows:
                    continue
                placeholders = ",".join("?" for _ in columns)
                names = ",".join(columns)
                sql = f"INSERT INTO {table} ({names}) VALUES ({placeholders})"
                for row in rows:
                    values = tuple(row[column] for column in columns)
                    target.execute(sql, values)
                print(f"Copied {len(rows)} row(s) into {table}.")

            # Explicit IDs are copied to preserve all relationships. Move each
            # PostgreSQL identity sequence forward so future inserts remain safe.
            for table in IDENTITY_TABLES:
                target.execute(
                    f"""SELECT setval(
                        pg_get_serial_sequence('{table}','id'),
                        COALESCE((SELECT MAX(id) FROM {table}), 1),
                        EXISTS(SELECT 1 FROM {table})
                    )"""
                )

        with db() as target:
            final_state = target_snapshot(target)

        print_snapshot_comparison(source_state, final_state)
        if not snapshots_match(source_state, final_state):
            print("MIGRATION FAILED VERIFICATION: one or more table contents differ.")
            return 1

        print("MIGRATION OK: every StudyAI row matches exactly in PostgreSQL.")
        print("Keep the SQLite file as a temporary backup until the Neon-backed app is fully verified.")
        return 0
    finally:
        source.close()


if __name__ == "__main__":
    raise SystemExit(main())
