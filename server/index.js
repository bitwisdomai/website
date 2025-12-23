import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve ONLY blog uploads as public static files
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/api/uploads/blogs', express.static(path.join(__dirname, 'uploads/blogs')));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Import routes
import authRoutes from './routes/auth.js';
import pageRoutes from './routes/pages.js';
import templateRoutes from './routes/templates.js';
import seoRoutes from './routes/seo.js';
import qualifyingRoutes from './routes/qualifying.js';
import waitlistRoutes from './routes/waitlist.js';
import contactRoutes from './routes/contact.js';
import blogRoutes from './routes/blog.js';
import chatbotRoutes from './routes/chatbot.js';

// Import middleware for secure file access
import { protect, adminOnly } from './middleware/auth.js';
import fs from 'fs';

// Secure route for admin-only access to form submission files
app.get('/api/uploads/forms/submissions/:submissionId/:filename', protect, adminOnly, (req, res) => {
  try {
    const { submissionId, filename } = req.params;

    // Sanitize inputs to prevent directory traversal
    const sanitizedSubmissionId = submissionId.replace(/[^a-zA-Z0-9-]/g, '');
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '');

    // Construct file path
    const filePath = path.join(__dirname, 'uploads/forms/submissions', sanitizedSubmissionId, sanitizedFilename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Ensure the resolved path is within the allowed directory (prevent directory traversal)
    const uploadsDir = path.join(__dirname, 'uploads/forms/submissions');
    if (!filePath.startsWith(uploadsDir)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Send file
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error serving form file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve file',
      error: error.message
    });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to BitWisdom CMS API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      pages: '/api/pages',
      templates: '/api/templates',
      seo: '/api/seo',
      qualifying: '/api/qualifying',
      waitlist: '/api/waitlist',
      contact: '/api/contact',
      blog: '/api/blog',
      chatbot: '/api/chatbot'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/qualifying', qualifyingRoutes);
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
