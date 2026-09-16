@echo off
setlocal
cd /d "%~dp0"
echo.
echo ========================================
echo   StudyAI first-time setup
echo ========================================
echo.
py -m pip install -r requirements.txt
if errorlevel 1 (
  echo.
  echo Setup failed. Make sure Python is installed and connected to the internet.
  pause
  exit /b 1
)
if not exist .env (
  copy .env.example .env >nul
  echo Created .env from .env.example
)
echo.
echo Setup complete.
echo You can now double-click run_windows.bat
pause
