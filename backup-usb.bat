@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

echo ===================================================
echo           DONG BO DU AN TSUKI
echo ===================================================
echo.

cd /d "%~dp0"

set msg=
set /p msg="Nhap ten commit (an Enter de dung mac dinh): "

if "!msg!"=="" (
    set msg=Auto backup TSUKI: %date% %time%
)

echo.
echo -> Dang luu commit: "!msg!"...
git add .
git commit -m "!msg!"

echo.
echo [1/2] Dang day code len GitHub (Web)...
git push origin main

echo.
echo [2/2] Dang sao luu code vao USB (o D:)...
git push usb main

echo.
echo ===================================================
echo    DA SAO LUU THANH CONG VAO CA GITHUB VA USB!
echo ===================================================
echo.
pause
