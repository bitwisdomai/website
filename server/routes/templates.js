import express from 'express';
import { body } from 'express-validator';
import {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  getTemplateByIdentifier,
  updateTemplate,
  deleteTemplate,
  toggleTemplateActive
} from '../controller/templateController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// Validation rules
const createTemplateValidation = [
  body('name').notEmpty().withMessage('Template name is required'),
  body('identifier').notEmpty().matches(/^[a-z0-9-]+$/).withMessage('Identifier can only contain lowercase letters, numbers, and hyphens'),
  body('schema').optional().isObject().withMessage('Schema must be an object'),
  body('formConfig').optional().isObject().withMessage('Form config must be an object'),
  body('category').optional().isIn(['landing', 'content', 'legal', 'custom']).withMessage('Invalid category')
];

const updateTemplateValidation = [
  body('name').optional().notEmpty().withMessage('Template name cannot be empty'),
  body('identifier').optional().matches(/^[a-z0-9-]+$/).withMessage('Identifier can only contain lowercase letters, numbers, and hyphens'),
  body('schema').optional().isObject().withMessage('Schema must be an object'),
  body('formConfig').optional().isObject().withMessage('Form config must be an object'),
  body('category').optional().isIn(['landing', 'content', 'legal', 'custom']).withMessage('Invalid category'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
];

// All routes require authentication
router.use(protect);

// General routes
router.get('/', getAllTemplates);
router.get('/identifier/:identifier', getTemplateByIdentifier);
router.get('/:id', getTemplateById);

// Admin only routes
router.post('/', restrictTo('admin'), createTemplateValidation, validate, createTemplate);
router.put('/:id', restrictTo('admin'), updateTemplateValidation, validate, updateTemplate);
router.delete('/:id', restrictTo('admin'), deleteTemplate);
router.patch('/:id/toggle-active', restrictTo('admin'), toggleTemplateActive);

export default router;
