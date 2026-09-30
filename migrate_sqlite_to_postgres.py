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
import os
import sqlite3
from pathlib import Path

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
        help="Only compare source/target table counts. Do not write anything.",
    )
    return parser.parse_args()


def source_rows(conn: sqlite3.Connection, table: str, columns: list[str]):
    names = ",".join(columns)
    return conn.execute(f"SELECT {names} FROM {table} ORDER BY rowid").fetchall()


def target_count(conn, table: str) -> int:
    return int(conn.execute(f"SELECT COUNT(*) AS count FROM {table}").fetchone()["count"])


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
        source_counts = {
            table: int(source.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0])
            for table in TABLES
        }

        init_db()

        with db() as target:
            target_counts = {table: target_count(target, table) for table in TABLES}

            if args.verify_only:
                mismatches = [
                    table for table in TABLES
                    if source_counts[table] != target_counts[table]
                ]
                for table in TABLES:
                    print(f"{table}: SQLite={source_counts[table]} PostgreSQL={target_counts[table]}")
                if mismatches:
                    print("VERIFY FAILED:", ", ".join(mismatches))
                    return 1
                print("VERIFY OK: all StudyAI table counts match.")
                return 0

            nonempty = {table: count for table, count in target_counts.items() if count}
            if nonempty:
                detail = ", ".join(f"{name}={count}" for name, count in nonempty.items())
                raise SystemExit(
                    "Refusing migration because PostgreSQL is not empty: "
                    f"{detail}. Use a new/empty Neon database."
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
            final_counts = {table: target_count(target, table) for table in TABLES}

        mismatches = [
            table for table in TABLES
            if source_counts[table] != final_counts[table]
        ]
        for table in TABLES:
            print(f"{table}: SQLite={source_counts[table]} PostgreSQL={final_counts[table]}")
        if mismatches:
            print("MIGRATION FAILED VERIFICATION:", ", ".join(mismatches))
            return 1

        print("MIGRATION OK: StudyAI SQLite data is now copied to PostgreSQL.")
        print("Keep the SQLite file as a temporary backup until the Neon-backed app is fully verified.")
        return 0
    finally:
        source.close()


if __name__ == "__main__":
    raise SystemExit(main())
