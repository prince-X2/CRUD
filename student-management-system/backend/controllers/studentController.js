import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

/**
 * Get All Students
 * GET /api/students
 * Query params: search (name or studentId)
 */
export const getAllStudents = async (req, res) => {
  try {
    const { search } = req.query;
    const connection = await pool.getConnection();

    try {
      let query = 'SELECT id, name, email, studentId, phone, course, department, year, address, role, created_at FROM students';
      let params = [];

      // Add search filter if provided
      if (search) {
        query += ' WHERE name LIKE ? OR studentId LIKE ?';
        params = [`%${search}%`, `%${search}%`];
      }

      query += ' ORDER BY created_at DESC';

      const [rows] = await connection.query(query, params);

      res.status(200).json({
        message: 'Students retrieved successfully',
        data: rows
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Get all students error:', error);
    res.status(500).json({ message: 'Server error retrieving students' });
  }
};

/**
 * Create New Student
 * POST /api/students
 * Body: { name, email, password, studentId, phone, course, department, year, address }
 */
export const createStudent = async (req, res) => {
  try {
    const { name, email, password, studentId, phone, course, department, year, address } = req.body;

    // Validate required fields
    if (!name || !email || !password || !studentId) {
      return res.status(400).json({ message: 'Name, email, password, and studentId are required' });
    }

    // Hash password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const connection = await pool.getConnection();

    try {
      // Create student
      const [result] = await connection.query(
        'INSERT INTO students (name, email, password, studentId, phone, course, department, year, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, email, hashedPassword, studentId, phone, course, department, year, address, 'student']
      );
      res.status(201).json({
        message: 'Student created successfully',
        data: {
          id: result.insertId,
          name,
          email,
          studentId,
          phone,
          course,
          department,
          year,
          address,
          role: 'student'
        }
      });
    } catch (error) {
      // Handle duplicate email or studentId
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.message.includes('email')) {
          return res.status(400).json({ message: 'Email already exists' });
        } else if (error.message.includes('studentId')) {
          return res.status(400).json({ message: 'Student ID already exists' });
        }
      }
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({ message: 'Server error creating student' });
  }
};

/**
 * Get Student by ID
 * GET /api/students/:id
 */
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const connection = await pool.getConnection();

    try {
      const [rows] = await connection.query(
        'SELECT id, name, email, studentId, phone, course, department, year, address, role, created_at FROM students WHERE id = ?',
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.status(200).json({
        message: 'Student retrieved successfully',
        data: rows[0]
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Get student by ID error:', error);
    res.status(500).json({ message: 'Server error retrieving student' });
  }
};

/**
 * Update Student
 * PUT /api/students/:id
 * Body: { name, email, password, studentId, phone, course, department, year, address }
 */
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, studentId, phone, course, department, year, address } = req.body;

    // Validate ID format
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const connection = await pool.getConnection();

    try {
      // Check if student exists
      const [existingStudent] = await connection.query('SELECT id FROM students WHERE id = ?', [id]);
      if (existingStudent.length === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }

      // Build update query dynamically
      let updateFields = [];
      let updateValues = [];

      if (name !== undefined) {
        updateFields.push('name = ?');
        updateValues.push(name);
      }
      if (email !== undefined) {
        updateFields.push('email = ?');
        updateValues.push(email);
      }
      if (password !== undefined) {
        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateFields.push('password = ?');
        updateValues.push(hashedPassword);
      }
      if (studentId !== undefined) {
        updateFields.push('studentId = ?');
        updateValues.push(studentId);
      }
      if (phone !== undefined) {
        updateFields.push('phone = ?');
        updateValues.push(phone);
      }
      if (course !== undefined) {
        updateFields.push('course = ?');
        updateValues.push(course);
      }
      if (department !== undefined) {
        updateFields.push('department = ?');
        updateValues.push(department);
      }
      if (year !== undefined) {
        updateFields.push('year = ?');
        updateValues.push(year);
      }
      if (address !== undefined) {
        updateFields.push('address = ?');
        updateValues.push(address);
      }

      if (updateFields.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
      }

      // Add ID to parameters
      updateValues.push(id);

      const query = `UPDATE students SET ${updateFields.join(', ')} WHERE id = ?`;
      await connection.query(query, updateValues);

      // Fetch updated student
      const [updatedStudent] = await connection.query(
        'SELECT id, name, email, studentId, phone, course, department, year, address, role FROM students WHERE id = ?',
        [id]
      );

      res.status(200).json({
        message: 'Student updated successfully',
        data: updatedStudent[0]
      });
    } catch (error) {
      // Handle duplicate email or studentId
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.message.includes('email')) {
          return res.status(400).json({ message: 'Email already exists' });
        } else if (error.message.includes('studentId')) {
          return res.status(400).json({ message: 'Student ID already exists' });
        }
      }
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ message: 'Server error updating student' });
  }
};

/**
 * Delete Student
 * DELETE /api/students/:id
 */
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const connection = await pool.getConnection();

    try {
      // Check if student exists
      const [existingStudent] = await connection.query('SELECT id, name FROM students WHERE id = ?', [id]);
      if (existingStudent.length === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }

      // Delete student
      await connection.query('DELETE FROM students WHERE id = ?', [id]);

      res.status(200).json({
        message: 'Student deleted successfully',
        data: { id, name: existingStudent[0].name }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ message: 'Server error deleting student' });
  }
};
