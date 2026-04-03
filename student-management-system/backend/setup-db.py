#!/usr/bin/env python3
"""
Database setup script for Student Management System
This script creates the database and loads the schema
"""

import mysql.connector
from mysql.connector import errorcode
import sys

# Configuration
MYSQL_USER = 'root'
MYSQL_PASSWORD = '17012004'
MYSQL_HOST = 'localhost'
DB_NAME = 'student_management'

# SQL Schema
SCHEMA_SQL = """
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS admins;

-- Create admins table
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create students table
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  studentId VARCHAR(50) UNIQUE NOT NULL,
  phone VARCHAR(15),
  course VARCHAR(100),
  department VARCHAR(100),
  year VARCHAR(20),
  address TEXT,
  role VARCHAR(50) DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_student_email ON students(email);
CREATE INDEX idx_student_studentId ON students(studentId);
CREATE INDEX idx_admin_email ON admins(email);
"""

def setup_database():
    try:
        # Connect to MySQL server
        print("[*] Connecting to MySQL...")
        cnx = mysql.connector.connect(
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            host=MYSQL_HOST
        )
        cursor = cnx.cursor()
        
        # Create database
        print(f"[*] Creating database '{DB_NAME}'...")
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME};")
        cursor.execute(f"USE {DB_NAME};")
        
        # Execute schema SQL
        print("[*] Creating tables...")
        for statement in SCHEMA_SQL.split(';'):
            statement = statement.strip()
            if statement:
                cursor.execute(statement)
        
        cnx.commit()
        print("[✓] Database setup completed successfully!")
        
        # Verify
        cursor.execute("SHOW TABLES;")
        tables = cursor.fetchall()
        print(f"[✓] Tables created: {[t[0] for t in tables]}")
        
        cursor.close()
        cnx.close()
        
        return True
        
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("[✗] Error: Access denied. Check username and password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("[✗] Error: Database does not exist")
        else:
            print(f"[✗] Error: {err}")
        return False
    except Exception as e:
        print(f"[✗] Error: {e}")
        return False

if __name__ == "__main__":
    print("=========================================")
    print("Student Management System - DB Setup")
    print("=========================================")
    print()
    
    success = setup_database()
    
    print()
    if success:
        print("You can now start the backend server:")
        print("  cd backend")
        print("  npm start")
    else:
        print("Database setup failed. Please check:")
        print("1. MySQL is running")
        print("2. MySQL root password is correct")
        print("3. All dependencies are installed (pip install mysql-connector-python)")
    
    sys.exit(0 if success else 1)
