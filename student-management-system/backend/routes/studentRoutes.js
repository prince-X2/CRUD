import express from 'express';
import { getAllStudents, createStudent, getStudentById, updateStudent, deleteStudent } from '../controllers/studentController.js';

const router = express.Router();

// All student routes are public (no authentication required for demo)
router.get('/', getAllStudents);           // Get all students (with optional search)
router.post('/', createStudent);           // Create new student
router.get('/:id', getStudentById);       // Get single student
router.put('/:id', updateStudent);         // Update student
router.delete('/:id', deleteStudent);      // Delete student

export default router;
