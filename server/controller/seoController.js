import Page from '../models/Page.js';
import { asyncHandler, successResponse } from '../utils/helpers.js';

// @desc    Generate sitemap.xml
// @route   GET /api/seo/sitemap.xml
// @access  Public
export const generateSitemap = asyncHandler(async (req, res) => {
  // Get all published pages
  const pages = await Page.find({ status: 'published' }).select('slug updatedAt seo.canonicalUrl');

  const baseUrl = process.env.FRONTEND_URL || 'https://yourdomain.com';

  // Build XML sitemap
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add homepage
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}/</loc>\n`;
  sitemap += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
  sitemap += '    <changefreq>daily</changefreq>\n';
  sitemap += '    <priority>1.0</priority>\n';
  sitemap += '  </url>\n';

  // Add all published pages
  pages.forEach(page => {
    const url = page.seo?.canonicalUrl || `${baseUrl}/${page.slug}`;
    const lastmod = page.updatedAt.toISOString();

    sitemap += '  <url>\n';
    sitemap += `    <loc>${url}</loc>\n`;
    sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.8</priority>\n';
    sitemap += '  </url>\n';
  });

  sitemap += '</urlset>';

  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});

// @desc    Generate robots.txt
// @route   GET /api/seo/robots.txt
// @access  Public
export const generateRobotsTxt = asyncHandler(async (req, res) => {
  const baseUrl = process.env.FRONTEND_URL || 'https://yourdomain.com';

  let robotsTxt = 'User-agent: *\n';
  robotsTxt += 'Allow: /\n';
  robotsTxt += '\n';

  // Get pages with noindex
  const noIndexPages = await Page.find({
    status: 'published',
    'seo.noindex': true
  }).select('slug');

  // Disallow noindex pages
  noIndexPages.forEach(page => {
    robotsTxt += `Disallow: /${page.slug}\n`;
  });

  robotsTxt += '\n';
  robotsTxt += `Sitemap: ${baseUrl}/api/seo/sitemap.xml\n`;

  res.header('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

// @desc    Get SEO analytics/stats
// @route   GET /api/seo/stats
// @access  Private
export const getSeoStats = asyncHandler(async (req, res) => {
  // Count pages by status
  const totalPages = await Page.countDocuments();
  const publishedPages = await Page.countDocuments({ status: 'published' });
  const draftPages = await Page.countDocuments({ status: 'draft' });
  const archivedPages = await Page.countDocuments({ status: 'archived' });

  // Count pages with SEO issues
  const pagesWithoutMetaTitle = await Page.countDocuments({
    status: 'published',
    $or: [
      { 'seo.metaTitle': { $exists: false } },
      { 'seo.metaTitle': '' }
    ]
  });

  const pagesWithoutMetaDescription = await Page.countDocuments({
    status: 'published',
    $or: [
      { 'seo.metaDescription': { $exists: false } },
      { 'seo.metaDescription': '' }
    ]
  });

  const pagesWithNoIndex = await Page.countDocuments({
    status: 'published',
    'seo.noindex': true
  });

  const pagesWithoutOgImage = await Page.countDocuments({
    status: 'published',
    $or: [
      { 'seo.ogImage': { $exists: false } },
      { 'seo.ogImage': '' }
    ]
  });

  // Calculate SEO score (0-100)
  let seoScore = 100;
  if (publishedPages > 0) {
    const metaTitlePenalty = (pagesWithoutMetaTitle / publishedPages) * 20;
    const metaDescPenalty = (pagesWithoutMetaDescription / publishedPages) * 20;
    const ogImagePenalty = (pagesWithoutOgImage / publishedPages) * 10;

    seoScore = Math.max(0, 100 - metaTitlePenalty - metaDescPenalty - ogImagePenalty);
  }

  return successResponse(res, 200, 'SEO stats retrieved successfully', {
    stats: {
      pages: {
        total: totalPages,
        published: publishedPages,
        draft: draftPages,
        archived: archivedPages
      },
      seoIssues: {
        missingMetaTitle: pagesWithoutMetaTitle,
        missingMetaDescription: pagesWithoutMetaDescription,
        noIndexPages: pagesWithNoIndex,
        missingOgImage: pagesWithoutOgImage
      },
      seoScore: Math.round(seoScore)
    }
  });
});

// @desc    Generate meta tag suggestions
// @route   POST /api/seo/generate-meta
// @access  Private
export const generateMetaSuggestions = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  // Simple algorithm to generate meta description from content
  let metaDescription = '';

  if (content && typeof content === 'object') {
    // Try to extract text from hero section
    if (content.hero && content.hero.subtitle) {
      metaDescription = content.hero.subtitle;
    } else if (content.hero && content.hero.title) {
      metaDescription = content.hero.title;
    }

    // If no hero, try to get from first section
    if (!metaDescription && content.sections && content.sections.length > 0) {
      const firstSection = content.sections[0];
      if (firstSection.description) {
        metaDescription = firstSection.description;
      } else if (firstSection.title) {
        metaDescription = firstSection.title;
      }
    }
  }

  // Truncate to 160 characters
  if (metaDescription.length > 160) {
    metaDescription = metaDescription.substring(0, 157) + '...';
  }

  // Generate keywords (simple extraction)
  const keywords = title ? title.toLowerCase().split(' ').filter(word => word.length > 3) : [];

  return successResponse(res, 200, 'Meta suggestions generated successfully', {
    suggestions: {
      metaTitle: title || 'Untitled Page',
      metaDescription: metaDescription || 'Learn more about our services and offerings.',
      metaKeywords: keywords,
      ogTitle: title || 'Untitled Page',
      ogDescription: metaDescription || 'Learn more about our services and offerings.'
    }
  });
});
