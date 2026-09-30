@echo off
setlocal
cd /d "%~dp0"
title StudyAI Neon Migration

echo ========================================
echo       StudyAI Neon Migration
echo ========================================
echo.
echo This tool will:
echo   1. verify your Neon connection settings
echo   2. back up studyai.db
echo   3. migrate SQLite data to PostgreSQL
echo   4. verify every migrated table
echo   5. test both pooled and direct Neon connections
echo.

if not exist "studyai.db" (
    echo ERROR: studyai.db was not found in this folder.
    echo Nothing has been changed.
    pause
    exit /b 1
)

if not exist ".env" (
    echo ERROR: .env was not found.
    echo Copy .env.example to .env and add DATABASE_URL and DATABASE_URL_UNPOOLED.
    echo Nothing has been changed.
    pause
    exit /b 1
)

where python >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python was not found.
    pause
    exit /b 1
)

if not exist ".venv\Scripts\python.exe" (
    echo Creating StudyAI Python environment...
    python -m venv .venv
    if errorlevel 1 goto :error
)

".venv\Scripts\python.exe" -c "import psycopg, dotenv" >nul 2>&1
if errorlevel 1 (
    echo Installing StudyAI requirements...
    ".venv\Scripts\python.exe" -m pip install -r requirements.txt
    if errorlevel 1 goto :error
)

".venv\Scripts\python.exe" -c "from dotenv import dotenv_values; import sys; c=dotenv_values('.env'); sys.exit(0 if c.get('DATABASE_URL') and c.get('DATABASE_URL_UNPOOLED') else 1)" >nul 2>&1
if errorlevel 1 (
    echo ERROR: DATABASE_URL and DATABASE_URL_UNPOOLED must both be set in .env.
    echo Nothing has been changed.
    pause
    exit /b 1
)

if not exist "backups" mkdir "backups"
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%i"
set "BACKUP=backups\studyai-before-neon-%STAMP%.db"
copy /Y "studyai.db" "%BACKUP%" >nul
if errorlevel 1 goto :error
echo Backup created: %BACKUP%
echo.

echo Migrating StudyAI data to Neon...
".venv\Scripts\python.exe" migrate_sqlite_to_postgres.py --source studyai.db
if errorlevel 1 goto :error

echo.
echo Verifying migration counts...
".venv\Scripts\python.exe" migrate_sqlite_to_postgres.py --source studyai.db --verify-only
if errorlevel 1 goto :error

echo.
echo Verifying pooled and direct Neon connections...
".venv\Scripts\python.exe" verify_neon_setup.py
if errorlevel 1 goto :error

echo.
echo ========================================
echo     NEON MIGRATION VERIFIED SUCCESS
echo ========================================
echo.
echo Keep studyai.db and the backup above until the hosted app has passed its final smoke test.
pause
exit /b 0

:error
echo.
echo ========================================
echo        MIGRATION DID NOT FINISH
echo ========================================
echo No SQLite data was deleted.
echo Your original studyai.db and any backup created above are still available.
echo Review the error above before retrying.
pause
exit /b 1
