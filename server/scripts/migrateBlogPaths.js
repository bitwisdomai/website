import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Blog from '../models/Blog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bitwisdom');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Migration function
const migrateBlogPaths = async () => {
  try {
    await connectDB();

    // Find all blogs with old filesystem paths
    const blogs = await Blog.find({
      featuredImage: { $exists: true, $ne: '' }
    });

    console.log(`Found ${blogs.length} blog posts to check`);

    let updated = 0;
    for (const blog of blogs) {
      const oldPath = blog.featuredImage;
      let newPath = oldPath;

      // Convert filesystem paths to URL paths
      // Case 1: Absolute Windows path - C:\...\uploads\blog\images\blog-123.jpg
      if (oldPath.match(/^[A-Z]:\\/i) || oldPath.match(/\\/)) {
        // Extract just the filename from Windows path
        const filename = oldPath.split('\\').pop();
        newPath = `/api/uploads/blogs/images/${filename}`;
        console.log(`Converting Windows path: ${oldPath} -> ${newPath}`);
      }
      // Case 2: uploads/blog/images/blog-123.jpg -> /api/uploads/blogs/images/blog-123.jpg
      else if (oldPath.match(/^uploads\/blog\/images\//)) {
        newPath = oldPath.replace('uploads/blog/images/', '/api/uploads/blogs/images/');
      }
      // Case 3: server/uploads/blog/images/blog-123.jpg -> /api/uploads/blogs/images/blog-123.jpg
      else if (oldPath.match(/^server\/uploads\/blog\/images\//)) {
        newPath = oldPath.replace('server/uploads/blog/images/', '/api/uploads/blogs/images/');
      }
      // Case 4: server/uploads/blogs/images/blog-123.jpg -> /api/uploads/blogs/images/blog-123.jpg
      else if (oldPath.match(/^server\/uploads\/blogs\/images\//)) {
        newPath = oldPath.replace('server/uploads/blogs/images/', '/api/uploads/blogs/images/');
      }
      // Case 5: Already in correct format (/api/uploads/blogs/images/...)
      else if (oldPath.match(/^\/api\/uploads\/blogs\/images\//)) {
        console.log(`✓ Skipping blog "${blog.title}" - already in correct format`);
        continue;
      }
      // Case 6: Old format without /api prefix (/uploads/blogs/images/...)
      else if (oldPath.match(/^\/uploads\/blogs\/images\//)) {
        newPath = `/api${oldPath}`;
      }
      // Case 6: Unknown format
      else {
        console.log(`⚠ Warning: Unknown path format for blog "${blog.title}": ${oldPath}`);
        continue;
      }

      // Update only if path changed
      if (newPath !== oldPath) {
        blog.featuredImage = newPath;
        await blog.save();

        console.log(`✅ Updated blog: ${blog.title}`);
        console.log(`   Old path: ${oldPath}`);
        console.log(`   New path: ${newPath}`);
        updated++;
      }
    }

    console.log(`\n✅ Migration completed! Updated ${updated} blog records.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration
migrateBlogPaths();
