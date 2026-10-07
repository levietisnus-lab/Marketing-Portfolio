@echo off
title Portfolio Le Duc Viet - Local Server
cd /d "%~dp0"
echo ========================================================
echo   DANG KHOI DONG LOCALHOST CHO PORTFOLIO LE DUC VIET
echo   Dia chi: http://localhost:3456
echo ========================================================
echo.
echo Mo trinh duyet...
start "" "http://localhost:3456"
node serve.cjs
pause
