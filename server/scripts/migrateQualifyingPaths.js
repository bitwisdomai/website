import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
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
const migrateQualifyingPaths = async () => {
  try {
    await connectDB();

    // Find all qualifying applications
    const applications = await QualifyingApplication.find({});

    console.log(`Found ${applications.length} qualifying applications to check`);

    let updated = 0;
    const fileFields = ['photoId', 'articlesOfIncorporation', 'certificateOfIncorporation', 'proofOfAddress'];

    for (const app of applications) {
      let needsUpdate = false;
      const updates = {};

      for (const field of fileFields) {
        const oldPath = app[field];
        if (!oldPath || oldPath === '') continue;

        let newPath = oldPath;

        // Convert filesystem paths to URL paths
        // Case 1: Absolute Windows path - C:\...\uploads\qualifying-applications\photoId-123.png
        if (oldPath.match(/^[A-Z]:\\/i) || oldPath.match(/\\/)) {
          // Extract filename from Windows path
          const filename = oldPath.split('\\').pop() || oldPath.split('/').pop();

          // Use existing submissionId if available, otherwise create from filename
          const submissionId = app.submissionId || 'migrated-' + Date.now();

          newPath = `/api/uploads/forms/submissions/${submissionId}/${filename}`;
          console.log(`Converting Windows path for ${field}: ${oldPath} -> ${newPath}`);

          // Move the file to the new location if it exists
          const oldFilePath = oldPath;
          const newFilePath = path.join(__dirname, '..', newPath.replace(/^\//, '').replace(/\//g, path.sep));
          const newDir = path.dirname(newFilePath);

          // Create new directory structure
          if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, { recursive: true });
          }

          // Move file if old file exists and new location doesn't
          if (fs.existsSync(oldFilePath) && !fs.existsSync(newFilePath)) {
            try {
              fs.copyFileSync(oldFilePath, newFilePath);
              console.log(`  ✓ Moved file to: ${newFilePath}`);
            } catch (err) {
              console.log(`  ⚠ Warning: Could not move file: ${err.message}`);
            }
          }

          needsUpdate = true;
          updates[field] = newPath;
          if (!app.submissionId) {
            updates.submissionId = submissionId;
          }
        }
        // Case 2: uploads/qualifying-applications/... -> /api/uploads/forms/submissions/.../...
        else if (oldPath.match(/^uploads\/qualifying-applications\//)) {
          const filename = oldPath.split('/').pop();
          const submissionId = app.submissionId || 'migrated-' + Date.now();
          newPath = `/api/uploads/forms/submissions/${submissionId}/${filename}`;
          needsUpdate = true;
          updates[field] = newPath;
          if (!app.submissionId) {
            updates.submissionId = submissionId;
          }
        }
        // Case 3: server/uploads/... paths
        else if (oldPath.match(/^server\/uploads\//)) {
          const filename = oldPath.split('/').pop();
          const submissionId = app.submissionId || 'migrated-' + Date.now();
          newPath = `/api/uploads/forms/submissions/${submissionId}/${filename}`;
          needsUpdate = true;
          updates[field] = newPath;
          if (!app.submissionId) {
            updates.submissionId = submissionId;
          }
        }
        // Case 4: Already in correct format (/api/uploads/forms/submissions/...)
        else if (oldPath.match(/^\/api\/uploads\/forms\/submissions\//)) {
          // Already correct
          continue;
        }
        // Case 5: Old format without /api prefix (/uploads/forms/submissions/...)
        else if (oldPath.match(/^\/uploads\/forms\/submissions\//)) {
          newPath = `/api${oldPath}`;
          needsUpdate = true;
          updates[field] = newPath;
        }
        // Case 5: Unknown format
        else {
          console.log(`⚠ Warning: Unknown path format for ${field} in application ${app._id}: ${oldPath}`);
        }
      }

      // Update if any field changed
      if (needsUpdate) {
        for (const [field, value] of Object.entries(updates)) {
          app[field] = value;
        }
        await app.save();

        console.log(`✅ Updated application: ${app.businessName} (ID: ${app._id})`);
        for (const [field, value] of Object.entries(updates)) {
          if (field !== 'submissionId') {
            console.log(`   ${field}: ${value}`);
          }
        }
        updated++;
      } else {
        console.log(`✓ Skipping application "${app.businessName}" - already in correct format`);
      }
    }

    console.log(`\n✅ Migration completed! Updated ${updated} qualifying application records.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration
migrateQualifyingPaths();
