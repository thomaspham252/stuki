@echo off
echo ===================================================
echo   DANG SAO LUU DU AN TSUKI VAO USB D:...
echo ===================================================

cd /d "%~dp0"

git add .
git commit -m "Auto backup TSUKI: %date% %time%"
git push origin main

echo.
echo ===================================================
echo   DA SAO LUU THANH CONG VAO USB D:\TSUKI.git !
echo ===================================================
pause
