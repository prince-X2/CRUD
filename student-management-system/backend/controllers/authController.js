import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

/**
 * Admin Login
 * POST /api/auth/admin-login
 * Body: { email, password }
 */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Get connection
    const connection = await pool.getConnection();

    try {
      // Query admin by email
      const [rows] = await connection.query(
        'SELECT id, name, email, password, role FROM admins WHERE email = ?',
        [email]
      );

      // Check if admin exists
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const admin = rows[0];

      // Compare password with bcrypt hash
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = generateToken({
        id: admin.id,
        email: admin.email,
        role: admin.role
      });

      // Return safe user data (without password)
      res.status(200).json({
        message: 'Admin login successful',
        token,
        user: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

/**
 * Student Login
 * POST /api/auth/student-login
 * Body: { email or studentId, password }
 */
export const studentLogin = async (req, res) => {
  try {
    const { email, studentId, password } = req.body;

    // Validate input - either email or studentId required
    if ((!email && !studentId) || !password) {
      return res.status(400).json({ message: 'Email/StudentId and password are required' });
    }

    // Get connection
    const connection = await pool.getConnection();

    try {
      let query = 'SELECT id, name, email, studentId, password, role FROM students WHERE ';
      let params = [];

      if (email) {
        query += 'email = ?';
        params = [email];
      } else {
        query += 'studentId = ?';
        params = [studentId];
      }

      // Query student
      const [rows] = await connection.query(query, params);

      // Check if student exists
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid email/studentId or password' });
      }

      const student = rows[0];

      // Compare password with bcrypt hash
      const isPasswordValid = await bcrypt.compare(password, student.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email/studentId or password' });
      }

      // Generate JWT token
      const token = generateToken({
        id: student.id,
        email: student.email,
        role: student.role
      });

      // Return safe user data (without password)
      res.status(200).json({
        message: 'Student login successful',
        token,
        user: {
          id: student.id,
          name: student.name,
          email: student.email,
          studentId: student.studentId,
          role: student.role
        }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

/**
 * Logout User
 * POST /api/auth/logout
 */
export const logoutUser = (req, res) => {
  try {
    // JWT is stateless, logout happens on frontend by removing token
    // This endpoint is mainly for any cleanup if needed
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
};

/**
 * Get Current Logged-In User
 * GET /api/me
 * Headers: Authorization: Bearer <token>
 */
export const getCurrentUser = async (req, res) => {
  try {
    // User is already verified by auth middleware
    const userId = req.user.id;
    const userRole = req.user.role;

    const connection = await pool.getConnection();

    try {
      let query, params;

      if (userRole === 'admin') {
        query = 'SELECT id, name, email, role FROM admins WHERE id = ?';
        params = [userId];
      } else if (userRole === 'student') {
        query = 'SELECT id, name, email, studentId, phone, course, department, year, address, role FROM students WHERE id = ?';
        params = [userId];
      } else {
        return res.status(400).json({ message: 'Invalid user role' });
      }

      const [rows] = await connection.query(query, params);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = rows[0];

      res.status(200).json({
        message: 'User retrieved successfully',
        user
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error retrieving user' });
  }
};
