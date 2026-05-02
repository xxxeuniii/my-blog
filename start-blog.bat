@echo off
title My Blog Dev Server
echo Starting VitePress Dev Server...
echo.

cd /d "%~dp0"

start "VitePress Server" cmd /k "npm run docs:dev"

echo Waiting for server to start...
echo.

setlocal enabledelayedexpansion
set port=
set max_wait=30
set waited=0

:check_port
timeout /t 1 /nobreak >nul
set /a waited+=1

for /f "tokens=5" %%a in ('netstat -ano ^| findstr "LISTENING" ^| findstr "13" ') do (
    echo %%a | findstr "7" >nul 2>&1
    if !errorlevel!==0 (
        set port=%%a
        goto :found
    )
)

if %waited% lss %max_wait% goto :check_port

:found
if defined port (
    echo Server is running on port %port%
    echo Opening browser...
    start http://localhost:%port%/my-blog/
) else (
    echo Server may be running on default port 5173
    echo Opening browser...
    start http://localhost:5173/my-blog/
)

echo.
echo Server is running! Press any key to exit.
pause >nul
