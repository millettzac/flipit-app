@echo off
REM FlipIt API - Local Launcher
REM This script starts the FlipIt API on your local machine

echo Starting FlipIt API...
cd /d "%~dp0api"

REM Start the API server
"C:\Program Files\nodejs\node.exe" server.js

REM Keep window open if there's an error
if errorlevel 1 (
    echo.
    echo ERROR: API failed to start
    pause
)
