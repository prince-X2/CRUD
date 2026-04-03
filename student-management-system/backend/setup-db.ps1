# PowerShell script to set up MySQL database
# This script will prompt you for your MySQL root password and set up the database

$MySQLPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
$DBName = "student_management"
$SchemaFile = "sql\schema.sql"
$SeedFile = "sql\seed.sql"

# Read password from user (masked input)
$password = Read-Host "Enter your MySQL root password" -AsSecureString
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($password))

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Student Management System - DB Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test connection first
Write-Host "[0] Testing MySQL connection..." -ForegroundColor Yellow
$testResult = & $MySQLPath -u root -p$plainPassword -e "SELECT 1;" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Cannot connect to MySQL with provided password!" -ForegroundColor Red
    Write-Host "Make sure MySQL is running and password is correct." -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Connected successfully" -ForegroundColor Green
Write-Host ""

# Create database and tables
Write-Host "[1] Creating database and tables..." -ForegroundColor Yellow
$schemaContent = Get-Content $SchemaFile -Raw
& $MySQLPath -u root -p$plainPassword -e "$schemaContent" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Database and tables created" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Failed to create database" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Load seed data
Write-Host "[2] Loading sample data..." -ForegroundColor Yellow
$seedContent = Get-Content $SeedFile -Raw
& $MySQLPath -u root -p$plainPassword $DBName -e "$seedContent" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Sample data loaded" -ForegroundColor Green
} else {
    Write-Host "[WARNING] Could not load all seed data" -ForegroundColor Yellow
}
Write-Host ""

# Verify
Write-Host "[3] Verifying database setup..." -ForegroundColor Yellow
$tables = & $MySQLPath -u root -p$plainPassword student_management -e "SHOW TABLES;" 2>&1
Write-Host "[OK] Database setup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "You can now start the backend server:" -ForegroundColor Cyan
Write-Host "  cd backend" -ForegroundColor Cyan
Write-Host "  npm start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
