import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Page from '../models/Page.js';
import User from '../models/User.js';

dotenv.config();

const seoVariantDemoPages = [
  {
    slug: 'landing-seo-demo',
    title: 'SEO Variants Demo - Landing Page',
    templateType: 'landing',
    status: 'published',
    content: {
      hero: {
        title: 'Experience the Power of SEO A/B Testing',
        subtitle: 'See how multiple meta titles and descriptions can improve your search rankings',
        ctaText: 'Learn More',
        ctaLink: '#features',
        backgroundImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200'
      },
      features: [
        {
          icon: '🎯',
          title: 'Multiple SEO Variants',
          description: 'Test different meta titles and descriptions to find what works best'
        },
        {
          icon: '📊',
          title: 'Analytics Tracking',
          description: 'Track impressions and clicks for each variant'
        },
        {
          icon: '🔄',
          title: 'Smart Distribution',
          description: 'Choose from random, weighted, sequential, or time-based distribution'
        }
      ]
    },
    seo: {
      metaTitle: 'SEO A/B Testing Platform - Optimize Your Rankings',
      metaDescription: 'Default SEO variant. Test and optimize your meta tags with our powerful A/B testing platform.',
      metaKeywords: ['SEO', 'A/B testing', 'meta tags', 'optimization'],
      canonicalUrl: 'https://example.com/landing-seo-demo',
      noindex: false,
      nofollow: false
    },
    seoVariants: [
      {
        name: 'Variant A - Focus on Benefits',
        metaTitle: 'Boost Your Rankings with SEO A/B Testing | Try Free',
        metaDescription: 'Improve your search rankings by 40% with our SEO A/B testing platform. Test multiple meta tags and find what converts best.',
        metaKeywords: ['SEO optimization', 'ranking boost', 'meta tag testing'],
        ogTitle: 'Boost Your Rankings with SEO A/B Testing',
        ogDescription: 'The easiest way to optimize your search presence',
        weight: 30,
        isActive: true,
        impressions: 0,
        clicks: 0
      },
      {
        name: 'Variant B - Focus on Features',
        metaTitle: 'Smart SEO Testing Platform - Multiple Variants & Analytics',
        metaDescription: 'Advanced SEO A/B testing with real-time analytics, multiple variants, and smart distribution strategies. Start optimizing today.',
        metaKeywords: ['SEO platform', 'analytics', 'testing tool'],
        ogTitle: 'Smart SEO Testing Platform',
        ogDescription: 'Multiple variants, real-time analytics, smart distribution',
        weight: 40,
        isActive: true,
        impressions: 0,
        clicks: 0
      },
      {
        name: 'Variant C - Question Format',
        metaTitle: 'Want Better SEO Rankings? Try A/B Testing Your Meta Tags',
        metaDescription: 'Wondering how to improve your SEO? Our A/B testing platform helps you find the perfect meta tags that drive traffic and conversions.',
        metaKeywords: ['improve SEO', 'better rankings', 'meta tag optimization'],
        ogTitle: 'Want Better SEO Rankings?',
        ogDescription: 'Discover the power of meta tag A/B testing',
        weight: 30,
        isActive: true,
        impressions: 0,
        clicks: 0
      }
    ],
    seoVariantSettings: {
      enabled: true,
      strategy: 'weighted'
    }
  },
  {
    slug: 'blog-seo-demo',
    title: 'How to Implement SEO Variants - Complete Guide',
    templateType: 'blog',
    status: 'published',
    content: {
      author: 'SEO Team',
      publishDate: new Date().toISOString(),
      readTime: '5 min read',
      featuredImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=1200',
      category: 'SEO Guides',
      body: `
# How to Implement SEO Variants for Better Rankings

This demo page showcases how you can use multiple SEO variants to test and optimize your content's search performance.

## What are SEO Variants?

SEO variants allow you to create multiple versions of meta titles, descriptions, and social media tags for a single page. This enables A/B testing to find the most effective messaging.

## Key Benefits

1. **Test Different Messaging**: Try various value propositions
2. **Optimize for CTR**: Find what makes users click
3. **Data-Driven Decisions**: Use analytics to guide improvements

## Implementation

This page itself has multiple SEO variants enabled. Refresh the page or visit it from different sessions to see different meta tags in action!
      `.trim(),
      tags: ['SEO', 'A/B Testing', 'Meta Tags', 'Optimization']
    },
    seo: {
      metaTitle: 'SEO Variants Implementation Guide - Step by Step Tutorial',
      metaDescription: 'Learn how to implement and test multiple SEO variants for better search rankings. Complete guide with examples.',
      metaKeywords: ['SEO guide', 'meta tags tutorial', 'A/B testing guide'],
      canonicalUrl: 'https://example.com/blog-seo-demo'
    },
    seoVariants: [
      {
        name: 'How-To Format',
        metaTitle: 'How to Test Multiple SEO Meta Tags - Complete Guide 2025',
        metaDescription: 'Step-by-step guide to implementing SEO A/B testing. Learn how to test multiple meta titles and descriptions for better rankings.',
        weight: 50,
        isActive: true
      },
      {
        name: 'Listicle Format',
        metaTitle: '7 Steps to Implement SEO Variants That Boost Traffic',
        metaDescription: 'Discover 7 proven steps to implement SEO A/B testing on your website. Increase organic traffic with optimized meta tags.',
        weight: 50,
        isActive: true
      }
    ],
    seoVariantSettings: {
      enabled: true,
      strategy: 'sequential'
    }
  },
  {
    slug: 'legal-seo-demo',
    title: 'Terms of Service - SEO Variant Demo',
    templateType: 'legal',
    status: 'published',
    content: {
      effectiveDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      sections: [
        {
          title: 'Introduction',
          content: 'This is a demo legal page showing how SEO variants work even on standard pages like Terms of Service.'
        },
        {
          title: 'SEO Variant Testing',
          content: 'Even legal pages can benefit from optimized meta descriptions to help users find the right information.'
        },
        {
          title: 'Acceptance of Terms',
          content: 'By using this demo, you agree that SEO variants are pretty cool!'
        }
      ]
    },
    seo: {
      metaTitle: 'Terms of Service | Example Company',
      metaDescription: 'Read our terms of service and learn about SEO variant implementation.',
      canonicalUrl: 'https://example.com/legal-seo-demo'
    },
    seoVariants: [
      {
        name: 'Descriptive Variant',
        metaTitle: 'Terms of Service - User Agreement & Policies | Example',
        metaDescription: 'Comprehensive terms of service including user rights, obligations, and policies. Last updated 2025.',
        weight: 1,
        isActive: true
      },
      {
        name: 'SEO Optimized',
        metaTitle: 'Terms & Conditions - What You Need to Know | Example',
        metaDescription: 'Clear, easy-to-understand terms of service. Learn about your rights and our policies in plain language.',
        weight: 1,
        isActive: true
      }
    ],
    seoVariantSettings: {
      enabled: true,
      strategy: 'time-based'
    }
  },
  {
    slug: 'generic-seo-demo',
    title: 'About Our SEO Variant System',
    templateType: 'generic',
    status: 'published',
    content: {
      sections: [
        {
          heading: 'Welcome to SEO Variant Testing',
          text: 'This generic page demonstrates how any page type can benefit from SEO A/B testing.',
          layout: 'text'
        },
        {
          heading: 'Four Distribution Strategies',
          text: `
            - **Random**: Randomly select from active variants
            - **Weighted**: Select based on weight values (more weight = shown more often)
            - **Sequential**: Rotate through variants evenly (round-robin)
            - **Time-based**: Select based on the hour of the day
          `,
          layout: 'text'
        },
        {
          heading: 'Track Performance',
          text: 'Each variant tracks impressions and clicks so you can measure which performs best.',
          layout: 'text'
        }
      ]
    },
    seo: {
      metaTitle: 'About Our SEO Variant System - A/B Testing Platform',
      metaDescription: 'Learn about our innovative SEO variant system that helps you test and optimize meta tags.',
      metaKeywords: ['SEO variants', 'about', 'platform features']
    },
    seoVariants: [
      {
        name: 'Feature-Focused',
        metaTitle: 'SEO A/B Testing Platform - Features & Capabilities',
        metaDescription: 'Explore our SEO variant system: multiple strategies, real-time analytics, and easy integration. Start optimizing today.',
        weight: 1,
        isActive: true
      }
    ],
    seoVariantSettings: {
      enabled: true,
      strategy: 'random'
    }
  }
];

async function seedSeoVariantPages() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find a user to be the author (use the first admin user)
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.error('No admin user found. Please create an admin user first.');
      process.exit(1);
    }

    console.log(`Using admin user: ${adminUser.email}`);

    // Delete existing demo pages
    const demoslugs = seoVariantDemoPages.map(p => p.slug);
    await Page.deleteMany({ slug: { $in: demoslugs } });
    console.log('Deleted existing demo pages');

    // Create new demo pages
    for (const pageData of seoVariantDemoPages) {
      const page = await Page.create({
        ...pageData,
        author: adminUser._id
      });
      console.log(`Created demo page: ${page.slug} with ${page.seoVariants.length} SEO variants`);
    }

    console.log('\n✅ Successfully seeded SEO variant demo pages!');
    console.log('\nDemo pages created:');
    seoVariantDemoPages.forEach(page => {
      console.log(`  - /${page.slug} (${page.templateType} template, ${page.seoVariants.length} variants)`);
    });

    console.log('\nTo view these pages:');
    console.log('1. Start your frontend server');
    console.log('2. Visit the pages at: http://localhost:5173/{slug}');
    console.log('3. Refresh multiple times to see different SEO variants in action!');
    console.log('\nTo manage SEO variants:');
    console.log('1. Log into the admin panel');
    console.log('2. Edit any of these pages');
    console.log('3. Use the SEO Variant Manager to add/edit/analyze variants');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding pages:', error);
    process.exit(1);
  }
}

seedSeoVariantPages();
