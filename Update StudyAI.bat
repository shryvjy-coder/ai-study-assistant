@echo off
setlocal
cd /d "%~dp0"
title Update StudyAI

echo ========================================
echo            Updating StudyAI
echo ========================================
echo.

where git >nul 2>&1
if errorlevel 1 (
    echo Git was not found on this computer.
    echo You can still launch StudyAI using StudyAI.bat.
    pause
    exit /b 1
)

git pull --ff-only
if errorlevel 1 (
    echo.
    echo StudyAI could not update automatically.
    echo No files have been intentionally overwritten.
    echo Check the message above or ask ChatGPT for help.
    pause
    exit /b 1
)

echo.
echo Update complete. Launching StudyAI...
call "StudyAI.bat"
