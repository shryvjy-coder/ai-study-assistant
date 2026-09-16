@echo off
setlocal
cd /d "%~dp0"
title StudyAI

echo ========================================
echo              Starting StudyAI
echo ========================================
echo.

where python >nul 2>&1
if errorlevel 1 (
    echo Python was not found on this computer.
    echo Please install Python, then run StudyAI again.
    pause
    exit /b 1
)

if not exist ".venv\Scripts\python.exe" (
    echo First launch detected. Setting up StudyAI...
    python -m venv .venv
    if errorlevel 1 goto :error
    ".venv\Scripts\python.exe" -m pip install --upgrade pip
    ".venv\Scripts\python.exe" -m pip install -r requirements.txt
    if errorlevel 1 goto :error
)

start "" "http://127.0.0.1:5000"
echo StudyAI is starting in your browser...
echo Keep this window open while using StudyAI.
echo Press Ctrl+C here when you want to stop the server.
echo.
".venv\Scripts\python.exe" launcher.py
exit /b

:error
echo.
echo StudyAI setup could not finish.
echo Check the message above, then try again.
pause
exit /b 1
