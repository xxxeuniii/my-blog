@echo off
setlocal

cd /d "%~dp0"
title Eunie Tech Blog - Dev Server

echo ==============================================
echo        Eunie Tech Blog - Dev Server
echo ==============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js was not found.
    echo Download it from: https://nodejs.org/
    goto :error
)

where npm >nul 2>nul
if errorlevel 1 (
    echo [ERROR] npm was not found.
    goto :error
)

echo [CHECK] Node.js version:
node --version
echo.

if not exist "node_modules\" (
    echo [INSTALL] Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Dependency installation failed.
        goto :error
    )
) else (
    echo [SKIP] Dependencies are already installed.
)

echo.
echo [START] Opening http://localhost:5173/my-blog/
echo [TIP] Press Ctrl+C to stop the server.
echo.

start "" /b powershell -NoProfile -WindowStyle Hidden -Command "$url='http://localhost:5173/my-blog/'; for ($i=0; $i -lt 60; $i++) { try { $response=Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 1; if ($response.StatusCode -ge 200) { Start-Process $url; break } } catch {}; Start-Sleep -Milliseconds 500 }"

call npm run docs:dev
set "exit_code=%errorlevel%"

echo.
if not "%exit_code%"=="0" (
    echo [ERROR] Dev server exited with code %exit_code%.
    pause
)
exit /b %exit_code%

:error
echo.
pause
exit /b 1
