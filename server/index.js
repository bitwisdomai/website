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

// Serve uploads folder as static files
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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
      blog: '/api/blog'
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
