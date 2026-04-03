import express from 'express';
import { adminLogin, studentLogin, logoutUser, getCurrentUser } from '../controllers/authController.js';
import { verifyAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/admin-login', adminLogin);
router.post('/student-login', studentLogin);
router.post('/logout', logoutUser);

// Protected routes
router.get('/me', verifyAuth, getCurrentUser);

export default router;
