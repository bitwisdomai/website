import express from 'express';
import { body } from 'express-validator';
import {
  createPage,
  getAllPages,
  getPageById,
  getPageBySlug,
  updatePage,
  deletePage,
  publishPage,
  unpublishPage,
  duplicatePage,
  addSeoVariant,
  updateSeoVariant,
  deleteSeoVariant,
  updateSeoVariantSettings,
  getSeoVariantAnalytics
} from '../controller/pageController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// Validation rules
const createPageValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('templateType').notEmpty().withMessage('Template type is required'),
  body('slug').optional().matches(/^[a-z0-9-]+$/).withMessage('Slug can only contain lowercase letters, numbers, and hyphens'),
  body('content').optional().isObject().withMessage('Content must be an object'),
  body('seo').optional().isObject().withMessage('SEO must be an object'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid status')
];

const updatePageValidation = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('templateType').optional().notEmpty().withMessage('Template type cannot be empty'),
  body('slug').optional().matches(/^[a-z0-9-]+$/).withMessage('Slug can only contain lowercase letters, numbers, and hyphens'),
  body('content').optional().isObject().withMessage('Content must be an object'),
  body('seo').optional().isObject().withMessage('SEO must be an object'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid status')
];

// Public route - MUST be before protected routes
router.get('/public/:slug', getPageBySlug);

// Protected routes
router.use(protect); // All routes below require authentication

router.post('/', createPageValidation, validate, createPage);
router.get('/', getAllPages);
router.get('/:id', getPageById);
router.put('/:id', updatePageValidation, validate, updatePage);
router.delete('/:id', deletePage);
router.patch('/:id/publish', publishPage);
router.patch('/:id/unpublish', unpublishPage);
router.post('/:id/duplicate', duplicatePage);

// SEO Variant routes
router.post('/:id/seo-variants', addSeoVariant);
router.put('/:id/seo-variants/:variantId', updateSeoVariant);
router.delete('/:id/seo-variants/:variantId', deleteSeoVariant);
router.put('/:id/seo-variant-settings', updateSeoVariantSettings);
router.get('/:id/seo-variant-analytics', getSeoVariantAnalytics);

export default router;
