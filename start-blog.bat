@echo off
title My Blog Dev Server
echo Starting VitePress Dev Server...
echo.

cd /d "%~dp0"

start "VitePress Server" cmd /k "npm run docs:dev"

echo Waiting for server to start (10 seconds)...
timeout /t 10 /nobreak >nul

echo Trying to open browser...
start http://localhost:5173/my-blog/
start http://localhost:5174/my-blog/
start http://localhost:5175/my-blog/
start http://localhost:5176/my-blog/
start http://localhost:5177/my-blog/

echo.
echo Server should be running now!
echo Please use the correct URL from the terminal.
pause
