import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  getAllUsers,
  deleteUser
} from '../controller/authController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),
  body('role').optional().isIn(['admin', 'editor']).withMessage('Invalid role')
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const updateProfileValidation = [
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty')
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
];

// Public routes
router.post('/login', loginValidation, validate, login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/me', protect, updateProfileValidation, validate, updateProfile);
router.put('/change-password', protect, changePasswordValidation, validate, changePassword);

// Admin only routes
router.post('/register', protect, restrictTo('admin'), registerValidation, validate, register);
router.get('/users', protect, restrictTo('admin'), getAllUsers);
router.delete('/users/:id', protect, restrictTo('admin'), deleteUser);

export default router;
