import Blog from '../models/Blog.js';
import { asyncHandler, successResponse, errorResponse } from '../utils/helpers.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for blog image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Store in server/uploads/blogs/images (publicly accessible)
    const uploadDir = path.join(__dirname, '../uploads/blogs/images');

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = 'blog-' + uniqueSuffix + path.extname(file.originalname);

    // Store the URL path in req for later use (without /api prefix - frontend adds it)
    req.fileUrlPath = `/uploads/blogs/images/${filename}`;

    cb(null, filename);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, JPG, PNG, GIF, WEBP) are allowed'));
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit for blog images
  fileFilter: fileFilter
});

// @desc    Create a new blog post
// @route   POST /api/blog
// @access  Private (Admin only)
export const createBlog = asyncHandler(async (req, res) => {
  const {
    title,
    author,
    excerpt,
    content,
    tags,
    category,
    status,
    seo
  } = req.body;

  // Parse tags if it's a string
  const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
  const parsedSeo = typeof seo === 'string' ? JSON.parse(seo) : seo;

  const blog = await Blog.create({
    title,
    author,
    featuredImage: req.file ? req.fileUrlPath : '',
    excerpt,
    content,
    tags: parsedTags || [],
    category: category || 'General',
    status: status || 'draft',
    seo: parsedSeo || {},
    createdBy: req.user.id
  });

  return successResponse(res, 201, 'Blog post created successfully', { blog });
});

// @desc    Get all blog posts (with filters)
// @route   GET /api/blog
// @access  Public
export const getAllBlogs = asyncHandler(async (req, res) => {
  const { status, category, tag, page = 1, limit = 10, search } = req.query;

  const query = {};

  // Filter by status (default to published for public)
  if (status) {
    query.status = status;
  } else if (!req.user) {
    // Only show published blogs for non-authenticated users
    query.status = 'published';
  }

  // Filter by category
  if (category) {
    query.category = category;
  }

  // Filter by tag
  if (tag) {
    query.tags = tag;
  }

  // Search in title and excerpt
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } }
    ];
  }

  const blogs = await Blog.find(query)
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate('createdBy', 'name email')
    .exec();

  const count = await Blog.countDocuments(query);

  return successResponse(res, 200, 'Blogs retrieved successfully', {
    blogs,
    totalPages: Math.ceil(count / limit),
    currentPage: parseInt(page),
    total: count
  });
});

// @desc    Get single blog by slug
// @route   GET /api/blog/:slug
// @access  Public
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug })
    .populate('createdBy', 'name email');

  if (!blog) {
    return errorResponse(res, 404, 'Blog post not found');
  }

  // Only increment views for published blogs
  if (blog.status === 'published') {
    blog.views += 1;
    await blog.save();
  }

  return successResponse(res, 200, 'Blog retrieved successfully', { blog });
});

// @desc    Get single blog by ID (admin)
// @route   GET /api/blog/admin/:id
// @access  Private (Admin only)
export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate('createdBy', 'name email');

  if (!blog) {
    return errorResponse(res, 404, 'Blog post not found');
  }

  return successResponse(res, 200, 'Blog retrieved successfully', { blog });
});

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private (Admin only)
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return errorResponse(res, 404, 'Blog post not found');
  }

  const {
    title,
    author,
    excerpt,
    content,
    tags,
    category,
    status,
    seo
  } = req.body;

  // Parse tags and seo if they're strings
  const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
  const parsedSeo = typeof seo === 'string' ? JSON.parse(seo) : seo;

  // Update fields
  if (title) blog.title = title;
  if (author) blog.author = author;
  if (excerpt) blog.excerpt = excerpt;
  if (content) blog.content = content;
  if (parsedTags) blog.tags = parsedTags;
  if (category) blog.category = category;
  if (status) blog.status = status;
  if (parsedSeo) blog.seo = parsedSeo;

  // Update featured image if new one is uploaded
  if (req.file) {
    // Delete old image if it exists (convert URL path to filesystem path)
    if (blog.featuredImage) {
      const oldFilePath = path.join(__dirname, '..', blog.featuredImage.replace(/^\//, ''));
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
    blog.featuredImage = req.fileUrlPath;
  }

  await blog.save();

  return successResponse(res, 200, 'Blog post updated successfully', { blog });
});

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private (Admin only)
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return errorResponse(res, 404, 'Blog post not found');
  }

  // Delete featured image if it exists (convert URL path to filesystem path)
  if (blog.featuredImage) {
    const filePath = path.join(__dirname, '..', blog.featuredImage.replace(/^\//, ''));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  await Blog.findByIdAndDelete(req.params.id);

  return successResponse(res, 200, 'Blog post deleted successfully');
});

// @desc    Get blog statistics
// @route   GET /api/blog/stats/overview
// @access  Private (Admin only)
export const getBlogStats = asyncHandler(async (req, res) => {
  const total = await Blog.countDocuments();
  const published = await Blog.countDocuments({ status: 'published' });
  const draft = await Blog.countDocuments({ status: 'draft' });
  const archived = await Blog.countDocuments({ status: 'archived' });

  // Get total views
  const viewsResult = await Blog.aggregate([
    { $group: { _id: null, totalViews: { $sum: '$views' } } }
  ]);
  const totalViews = viewsResult.length > 0 ? viewsResult[0].totalViews : 0;

  // Get popular tags
  const tagsResult = await Blog.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

  return successResponse(res, 200, 'Blog statistics retrieved successfully', {
    total,
    published,
    draft,
    archived,
    totalViews,
    popularTags: tagsResult
  });
});

// @desc    Upload blog image (for content)
// @route   POST /api/blog/upload-image
// @access  Private (Admin only)
export const uploadBlogImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return errorResponse(res, 400, 'No image file provided');
  }

  return successResponse(res, 200, 'Image uploaded successfully', {
    imageUrl: req.fileUrlPath,
    filename: req.file.filename
  });
});
