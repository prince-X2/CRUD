import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

// Configuration from .env
const config = {
  host: 'localhost',
  user: 'root',
  password: '17012004',
  database: 'student_management'
};

const schemaSQL = `
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
`;

async function setupDatabase() {
  let connection;
  try {
    console.log('\n========================================');
    console.log('Student Management System - DB Setup');
    console.log('========================================\n');
    
    // Connect to MySQL
    console.log('[*] Connecting to MySQL...');
    connection = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password
    });
    
    // Create database
    console.log(`[*] Creating database '${config.database}'...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${config.database};`);
    
    // Select database
    await connection.query(`USE ${config.database};`);
    
    // Execute schema
    console.log('[*] Creating tables...');
    const statements = schemaSQL.split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    for (const statement of statements) {
      await connection.query(statement);
    }
    
    // Verify tables
    const [tables] = await connection.query('SHOW TABLES;');
    console.log(`[✓] Tables created: ${tables.map(t => Object.values(t)[0]).join(', ')}`);
    
    console.log('[✓] Database setup completed successfully!\n');
    console.log('========================================');
    console.log('You can now start the backend server:');
    console.log('  cd backend');
    console.log('  npm start');
    console.log('========================================\n');
    
    return true;
    
  } catch (error) {
    console.error('[✗] Error:', error.message);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('[✗] Access denied. Check username and password');
    }
    return false;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run setup
setupDatabase().then(success => {
  process.exit(success ? 0 : 1);
});
