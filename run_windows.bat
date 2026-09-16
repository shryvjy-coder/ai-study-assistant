@echo off
setlocal
cd /d "%~dp0"
echo Starting StudyAI...
start "" http://localhost:5000
py app.py
if errorlevel 1 (
  echo.
  echo StudyAI could not start. Run setup_windows.bat first.
  pause
)
