import express from 'express';
import { body } from 'express-validator';
import {
  generateSitemap,
  generateRobotsTxt,
  getSeoStats,
  generateMetaSuggestions
} from '../controller/seoController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// Validation rules
const generateMetaValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').optional().isObject().withMessage('Content must be an object')
];

// Public routes
router.get('/sitemap.xml', generateSitemap);
router.get('/robots.txt', generateRobotsTxt);

// Protected routes
router.get('/stats', protect, getSeoStats);
router.post('/generate-meta', protect, generateMetaValidation, validate, generateMetaSuggestions);

export default router;
