@echo off
REM MySQL Root Password Reset Script
REM This script resets the MySQL root password to empty (no password)

setlocal enabledelayedexpansion

echo.
echo ========================================
echo MySQL Root Password Reset
echo ========================================
echo.
echo This will reset your MySQL root password to EMPTY (no password)
echo.
pause

set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin
set MYSQLD_PATH=%MYSQL_PATH%\mysqld.exe
set MYSQL_CLI_PATH=%MYSQL_PATH%\mysql.exe

REM Step 1: Stop MySQL Service
echo [1] Stopping MySQL service...
net stop MySQL80
timeout /t 2

REM Step 2: Start MySQL in safe mode (skip grant tables)
echo [2] Starting MySQL in safe mode (skip-grant-tables)...
echo Starting mysqld in background...
start "" "%MYSQLD_PATH%" --skip-grant-tables
timeout /t 3

REM Step 3: Reset the password via SQL commands
echo [3] Connecting to MySQL and resetting root password...
(
    echo FLUSH PRIVILEGES;
    echo ALTER USER 'root'^@'localhost' IDENTIFIED BY '';
    echo EXIT;
) | "%MYSQL_CLI_PATH%" -u root

echo.
echo [4] Waiting for manual shutdown...
echo.
echo IMPORTANT: You need to manually stop the mysqld process that's running in safe mode
echo - Open Task Manager (Ctrl+Shift+Esc)
echo - Find "mysqld.exe" 
echo - Right-click and select "End task"
echo - Then press Enter here to continue
echo.
pause

REM Step 4: Restart MySQL normally
echo [5] Restarting MySQL service normally...
timeout /t 2
net start MySQL80
timeout /t 2

echo.
echo ========================================
echo Password reset complete!
echo Root user now has NO PASSWORD
echo ========================================
echo.
pause
