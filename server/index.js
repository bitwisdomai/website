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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import authRoutes from './routes/auth.js';
import pageRoutes from './routes/pages.js';
import templateRoutes from './routes/templates.js';
import seoRoutes from './routes/seo.js';

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
      seo: '/api/seo'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/seo', seoRoutes);

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
