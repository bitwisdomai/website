import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Blog from '../models/Blog.js';
import QualifyingApplication from '../models/QualifyingApplication.js';

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
const removeApiPrefix = async () => {
  try {
    await connectDB();

    console.log('Starting /api prefix removal...\n');

    // 1. Update Blog paths
    const blogs = await Blog.find({
      featuredImage: { $regex: '^/api/' }
    });

    console.log(`Found ${blogs.length} blog posts to update`);
    let blogUpdated = 0;

    for (const blog of blogs) {
      const oldPath = blog.featuredImage;
      const newPath = oldPath.replace(/^\/api/, '');

      blog.featuredImage = newPath;
      await blog.save();

      console.log(`✅ Updated blog: ${blog.title}`);
      console.log(`   ${oldPath} -> ${newPath}`);
      blogUpdated++;
    }

    console.log(`\nBlogs: Updated ${blogUpdated} records\n`);

    // 2. Update Qualifying Application paths
    const applications = await QualifyingApplication.find({});
    console.log(`Found ${applications.length} qualifying applications to check`);

    let appUpdated = 0;
    const fileFields = ['photoId', 'articlesOfIncorporation', 'certificateOfIncorporation', 'proofOfAddress'];

    for (const app of applications) {
      let needsUpdate = false;

      for (const field of fileFields) {
        const oldPath = app[field];
        if (!oldPath || oldPath === '' || !oldPath.startsWith('/api/')) continue;

        const newPath = oldPath.replace(/^\/api/, '');
        app[field] = newPath;
        needsUpdate = true;
      }

      if (needsUpdate) {
        await app.save();
        console.log(`✅ Updated application: ${app.businessName} (ID: ${app._id})`);
        appUpdated++;
      }
    }

    console.log(`\nQualifying Applications: Updated ${appUpdated} records`);
    console.log(`\n✅ Migration completed successfully!`);
    console.log(`   - Blogs: ${blogUpdated} updated`);
    console.log(`   - Qualifying Applications: ${appUpdated} updated`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration
removeApiPrefix();
