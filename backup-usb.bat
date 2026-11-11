@echo off
echo ===================================================
echo   DANG DONG BO DU AN TSUKI...
echo ===================================================

cd /d "%~dp0"

git add .
git commit -m "Auto backup TSUKI: %date% %time%"

echo.
echo [1/2] Dang day code len GitHub (Web)...
git push origin main

echo.
echo [2/2] Dang sao luu code vao USB (o D:)...
git push usb main

echo.
echo ===================================================
echo   DA SAO LUU THANH CONG VAO CA GITHUB VA USB!
echo ===================================================
pause
