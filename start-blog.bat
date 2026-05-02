@echo off
title My Blog Dev Server
echo Starting VitePress Dev Server...
echo.
cd /d "%~dp0"
start "VitePress Server" cmd /k "npm run docs:dev"
echo Waiting for server to start...
timeout /t 5 /nobreak >nul
echo Opening browser...
start http://localhost:5177/my-blog/
echo.
echo Server is running! Press Ctrl+C in the server window to stop.
pause
