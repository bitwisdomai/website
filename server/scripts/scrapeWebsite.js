import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import ScrapingService from '../services/scrapingService.js';

dotenv.config();

// Define the pages you want to scrape
const pagesToScrape = [
  'http://localhost:5173/',
  'http://localhost:5173/about',
  'http://localhost:5173/products',
  'http://localhost:5173/contact',
  'http://localhost:5173/blog',
  'http://localhost:5173/faq',
  'http://localhost:5173/privacy-policy',
  'http://localhost:5173/terms-of-service',
  'http://localhost:5173/aml-kyc-policy',
  // Add more pages as needed
];

async function scrapeWebsite() {
  try {
    console.log('🌐 Starting website scraping...');
    console.log(`📄 Pages to scrape: ${pagesToScrape.length}`);

    await connectDB();

    // Use the production URL if available, otherwise use localhost
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    console.log(`🔗 Base URL: ${baseUrl}`);

    const scraper = new ScrapingService(baseUrl);

    // Scrape specific pages
    const results = await scraper.scrapePages(pagesToScrape);

    console.log('\n📊 Scraping Results:');
    let successCount = 0;
    let failCount = 0;

    results.forEach((result) => {
      if (result.success) {
        console.log(`✓ ${result.title}`);
        successCount++;
      } else {
        console.log(`✗ ${result.url} - ${result.error}`);
        failCount++;
      }
    });

    console.log(`\n✅ Scraping completed!`);
    console.log(`   Success: ${successCount}`);
    console.log(`   Failed: ${failCount}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error scraping website:', error);
    process.exit(1);
  }
}

scrapeWebsite();
