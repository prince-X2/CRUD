@echo off
REM Database setup script for student_management
REM This script will create the database and seed initial data

setlocal enabledelayedexpansion

set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe
set MYSQL_USER=root
set MYSQL_PASSWORD=17012004
set DB_NAME=student_management

echo.
echo ========================================
echo Student Management System - DB Setup
echo ========================================
echo.

REM Create database and tables from schema.sql
echo [1/2] Creating database and tables...
"!MYSQL_PATH!" -u !MYSQL_USER! -p!MYSQL_PASSWORD! < sql\schema.sql
if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to create database.
    echo.
    pause
    exit /b 1
)

echo [OK] Database and tables created successfully.
echo.

REM Load seed data from seed.sql
echo [2/2] Loading sample data...
"!MYSQL_PATH!" -u !MYSQL_USER! -p!MYSQL_PASSWORD! !DB_NAME! < sql\seed.sql
if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to load seed data.
    echo.
    pause
    exit /b 1
)

echo [OK] Sample data loaded successfully.
echo.
echo ========================================
echo Database setup completed!
echo ========================================
echo.
pause
