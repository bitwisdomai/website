import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Template from '../models/Template.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const seedAdmin = async () => {
  try {
    console.log('🌱 Starting seed process...\n');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@bitwisdom.com' });

    if (existingAdmin) {
      console.log('❌ Admin user already exists!');
      console.log('Email: admin@bitwisdom.com');
      console.log('\nIf you want to reset, delete the user manually from MongoDB first.\n');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@bitwisdom.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@bitwisdom.com');
    console.log('Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change this password after first login!\n');

    // Create default templates
    console.log('📄 Creating default templates...\n');

    const templates = [
      {
        name: 'Landing Page',
        identifier: 'landing',
        description: 'Full-featured landing page with hero, features, and CTA sections',
        category: 'landing',
        schema: {
          hero: {
            type: 'object',
            fields: ['title', 'subtitle', 'image', 'ctaText', 'ctaLink']
          },
          features: {
            type: 'array',
            items: ['title', 'description', 'icon']
          },
          cta: {
            type: 'object',
            fields: ['title', 'description', 'buttonText', 'buttonLink']
          }
        },
        formConfig: {
          hero: { label: 'Hero Section', type: 'group' },
          features: { label: 'Features', type: 'repeater' },
          cta: { label: 'Call to Action', type: 'group' }
        }
      },
      {
        name: 'Generic Page',
        identifier: 'generic',
        description: 'Simple page with title and content sections',
        category: 'content',
        schema: {
          header: {
            type: 'object',
            fields: ['title', 'subtitle']
          },
          sections: {
            type: 'array',
            items: ['title', 'content', 'image']
          }
        },
        formConfig: {
          header: { label: 'Page Header', type: 'group' },
          sections: { label: 'Content Sections', type: 'repeater' }
        }
      },
      {
        name: 'Legal Page',
        identifier: 'legal',
        description: 'For terms, privacy policy, and other legal documents',
        category: 'legal',
        schema: {
          title: { type: 'string' },
          lastUpdated: { type: 'date' },
          sections: {
            type: 'array',
            items: ['heading', 'content']
          }
        },
        formConfig: {
          title: { label: 'Document Title', type: 'text' },
          lastUpdated: { label: 'Last Updated', type: 'date' },
          sections: { label: 'Sections', type: 'repeater' }
        }
      },
      {
        name: 'Blog Post',
        identifier: 'blog',
        description: 'Blog post template with featured image and content',
        category: 'content',
        schema: {
          title: { type: 'string' },
          author: { type: 'string' },
          featuredImage: { type: 'string' },
          excerpt: { type: 'string' },
          content: { type: 'richtext' },
          tags: { type: 'array' }
        },
        formConfig: {
          title: { label: 'Post Title', type: 'text' },
          author: { label: 'Author', type: 'text' },
          featuredImage: { label: 'Featured Image URL', type: 'text' },
          excerpt: { label: 'Excerpt', type: 'textarea' },
          content: { label: 'Content', type: 'richtext' },
          tags: { label: 'Tags', type: 'tags' }
        }
      }
    ];

    for (const template of templates) {
      await Template.create(template);
      console.log(`  ✓ Created template: ${template.name}`);
    }

    console.log('\n✅ Seed completed successfully!\n');
    console.log('You can now:');
    console.log('1. Start the server: npm run dev');
    console.log('2. Login with the admin credentials');
    console.log('3. Start creating pages!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedAdmin();
