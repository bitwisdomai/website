import axios from 'axios';
import * as cheerio from 'cheerio';
import WebsiteContent from '../models/WebsiteContent.js';

class ScrapingService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.visitedUrls = new Set();
  }

  // Extract text content from HTML
  extractContent($, selector) {
    return $(selector)
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(text => text.length > 0)
      .join(' ');
  }

  // Extract headings with their levels
  extractHeadings($) {
    const headings = [];
    $('h1, h2, h3, h4, h5, h6').each((_, el) => {
      const level = parseInt(el.name.substring(1));
      const text = $(el).text().trim();
      if (text) {
        headings.push({ level, text });
      }
    });
    return headings;
  }

  // Scrape a single page
  async scrapePage(url) {
    try {
      console.log(`Scraping: ${url}`);

      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'BitWisdom-Bot/1.0',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);

      // Remove script, style, and other non-content elements
      $('script, style, nav, footer, header, iframe, noscript').remove();

      // Extract data
      const title = $('title').text().trim() || $('h1').first().text().trim();
      const metaDescription = $('meta[name="description"]').attr('content') || '';
      const headings = this.extractHeadings($);

      // Extract main content from common content containers
      let content = this.extractContent($, 'main, article, .content, #content, body');

      // Clean up content
      content = content.replace(/\s+/g, ' ').trim();

      // Save to database
      await WebsiteContent.findOneAndUpdate(
        { url },
        {
          url,
          title,
          content,
          metaDescription,
          headings,
          lastScraped: new Date(),
          isActive: true,
        },
        { upsert: true, new: true }
      );

      console.log(`✓ Scraped: ${title}`);
      return { success: true, title };
    } catch (error) {
      console.error(`Error scraping ${url}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  // Get all internal links from a page
  getInternalLinks($, currentUrl) {
    const links = new Set();
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (!href) return;

      // Convert relative URLs to absolute
      let absoluteUrl;
      try {
        absoluteUrl = new URL(href, currentUrl).href;
      } catch (e) {
        return;
      }

      // Only include links from the same domain
      const currentDomain = new URL(currentUrl).hostname;
      const linkDomain = new URL(absoluteUrl).hostname;

      if (linkDomain === currentDomain) {
        // Remove hash and query params for cleaner URLs
        const cleanUrl = absoluteUrl.split('#')[0].split('?')[0];
        links.add(cleanUrl);
      }
    });
    return Array.from(links);
  }

  // Crawl entire website
  async crawlWebsite(maxPages = 50) {
    const queue = [this.baseUrl];
    const results = [];

    while (queue.length > 0 && this.visitedUrls.size < maxPages) {
      const url = queue.shift();

      if (this.visitedUrls.has(url)) continue;
      this.visitedUrls.add(url);

      const result = await this.scrapePage(url);
      results.push({ url, ...result });

      // Don't crawl further if we hit an error
      if (!result.success) continue;

      // Small delay to be respectful
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return {
      totalScraped: this.visitedUrls.size,
      results,
    };
  }

  // Scrape specific pages
  async scrapePages(urls) {
    const results = [];
    for (const url of urls) {
      const result = await this.scrapePage(url);
      results.push({ url, ...result });
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    return results;
  }

  // Get all scraped content for chatbot context
  static async getAllContent() {
    try {
      const contents = await WebsiteContent.find({ isActive: true })
        .select('url title content metaDescription headings')
        .lean();
      return contents;
    } catch (error) {
      console.error('Error fetching website content:', error);
      return [];
    }
  }

  // Search scraped content
  static async searchContent(query) {
    try {
      const results = await WebsiteContent.find(
        {
          $text: { $search: query },
          isActive: true,
        },
        {
          score: { $meta: 'textScore' },
        }
      )
        .sort({ score: { $meta: 'textScore' } })
        .limit(5)
        .lean();

      return results;
    } catch (error) {
      console.error('Error searching content:', error);
      return [];
    }
  }
}

export default ScrapingService;
