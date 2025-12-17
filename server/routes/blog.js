import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogStats,
  uploadBlogImage,
  upload
} from '../controller/blogController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/slug/:slug', getBlogBySlug);

// Admin routes
router.post('/', protect, adminOnly, upload.single('featuredImage'), createBlog);
router.get('/stats/overview', protect, adminOnly, getBlogStats);
router.get('/admin/:id', protect, adminOnly, getBlogById);
router.put('/:id', protect, adminOnly, upload.single('featuredImage'), updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);

// Upload route for blog content images
router.post('/upload-image', protect, adminOnly, upload.single('image'), uploadBlogImage);

export default router;
