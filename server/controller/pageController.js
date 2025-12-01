import Page from '../models/Page.js';
import { asyncHandler, successResponse, errorResponse, generateSlug } from '../utils/helpers.js';

// @desc    Create a new page
// @route   POST /api/pages
// @access  Private
export const createPage = asyncHandler(async (req, res) => {
  const { title, slug, templateType, content, seo, status } = req.body;

  // Generate slug if not provided
  const pageSlug = slug || generateSlug(title);

  // Check if slug already exists
  const existingPage = await Page.findOne({ slug: pageSlug });
  if (existingPage) {
    return errorResponse(res, 400, `Page with slug "${pageSlug}" already exists`);
  }

  // Create page
  const page = await Page.create({
    title,
    slug: pageSlug,
    templateType,
    content: content || {},
    seo: seo || {},
    status: status || 'draft',
    author: req.user.id
  });

  return successResponse(res, 201, 'Page created successfully', { page });
});

// @desc    Get all pages (with filters)
// @route   GET /api/pages
// @access  Private
export const getAllPages = asyncHandler(async (req, res) => {
  const { status, templateType, search, page = 1, limit = 10 } = req.query;

  // Build query
  const query = {};

  if (status) {
    query.status = status;
  }

  if (templateType) {
    query.templateType = templateType;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { slug: { $regex: search, $options: 'i' } }
    ];
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Execute query
  const pages = await Page.find(query)
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Page.countDocuments(query);

  return successResponse(res, 200, 'Pages retrieved successfully', {
    pages,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  });
});

// @desc    Get single page by ID
// @route   GET /api/pages/:id
// @access  Private
export const getPageById = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);

  if (!page) {
    return errorResponse(res, 404, 'Page not found');
  }

  return successResponse(res, 200, 'Page retrieved successfully', { page });
});

// @desc    Get single page by slug (PUBLIC)
// @route   GET /api/pages/public/:slug
// @access  Public
export const getPageBySlug = asyncHandler(async (req, res) => {
  const page = await Page.findOne({
    slug: req.params.slug,
    status: 'published'
  }).populate('author', 'name email');

  if (!page) {
    return errorResponse(res, 404, 'Page not found');
  }

  // Handle SEO variants if enabled
  let selectedVariant = null;
  if (page.seoVariantSettings?.enabled && page.seoVariants?.length > 0) {
    const activeVariants = page.seoVariants.filter(v => v.isActive);

    if (activeVariants.length > 0) {
      const strategy = page.seoVariantSettings.strategy || 'random';

      switch (strategy) {
        case 'weighted':
          selectedVariant = selectWeightedVariant(activeVariants);
          break;
        case 'sequential':
          selectedVariant = selectSequentialVariant(activeVariants);
          break;
        case 'time-based':
          selectedVariant = selectTimeBasedVariant(activeVariants);
          break;
        case 'random':
        default:
          selectedVariant = activeVariants[Math.floor(Math.random() * activeVariants.length)];
          break;
      }

      // Increment impression count
      if (selectedVariant) {
        const variantIndex = page.seoVariants.findIndex(v => v._id.equals(selectedVariant._id));
        if (variantIndex !== -1) {
          page.seoVariants[variantIndex].impressions += 1;
          await page.save();
        }
      }
    }
  }

  return successResponse(res, 200, 'Page retrieved successfully', {
    page,
    selectedSeoVariant: selectedVariant
  });
});

// Helper function to select variant based on weight
function selectWeightedVariant(variants) {
  const totalWeight = variants.reduce((sum, v) => sum + (v.weight || 1), 0);
  let random = Math.random() * totalWeight;

  for (const variant of variants) {
    random -= (variant.weight || 1);
    if (random <= 0) {
      return variant;
    }
  }

  return variants[0];
}

// Helper function to select variant sequentially (round-robin based on impressions)
function selectSequentialVariant(variants) {
  return variants.reduce((prev, current) =>
    (current.impressions < prev.impressions) ? current : prev
  );
}

// Helper function to select variant based on time (hour of day)
function selectTimeBasedVariant(variants) {
  const hour = new Date().getHours();
  const index = hour % variants.length;
  return variants[index];
}

// @desc    Update page
// @route   PUT /api/pages/:id
// @access  Private
export const updatePage = asyncHandler(async (req, res) => {
  const { title, slug, templateType, content, seo, status } = req.body;

  let page = await Page.findById(req.params.id);

  if (!page) {
    return errorResponse(res, 404, 'Page not found');
  }

  // Check if slug is being changed and if it already exists
  if (slug && slug !== page.slug) {
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return errorResponse(res, 400, `Page with slug "${slug}" already exists`);
    }
  }

  // Update fields
  if (title) page.title = title;
  if (slug) page.slug = slug;
  if (templateType) page.templateType = templateType;
  if (content) page.content = content;
  if (seo) page.seo = { ...page.seo, ...seo };
  if (status) page.status = status;

  // Increment version
  page.version += 1;

  await page.save();

  return successResponse(res, 200, 'Page updated successfully', { page });
});

// @desc    Delete page
// @route   DELETE /api/pages/:id
// @access  Private
export const deletePage = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);

  if (!page) {
    return errorResponse(res, 404, 'Page not found');
  }

  await page.deleteOne();

  return successResponse(res, 200, 'Page deleted successfully');
});

// @desc    Publish page
// @route   PATCH /api/pages/:id/publish
// @access  Private
export const publishPage = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);

  if (!page) {
    return errorResponse(res, 404, 'Page not found');
  }

  page.status = 'published';
  if (!page.publishedAt) {
    page.publishedAt = new Date();
  }

  await page.save();

  return successResponse(res, 200, 'Page published successfully', { page });
});

// @desc    Unpublish page (set to draft)
// @route   PATCH /api/pages/:id/unpublish
// @access  Private
export const unpublishPage = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);

  if (!page) {
    return errorResponse(res, 404, 'Page not found');
  }

  page.status = 'draft';

  await page.save();

  return successResponse(res, 200, 'Page unpublished successfully', { page });
});

// @desc    Duplicate page
// @route   POST /api/pages/:id/duplicate
// @access  Private
export const duplicatePage = asyncHandler(async (req, res) => {
  const originalPage = await Page.findById(req.params.id);

  if (!originalPage) {
    return errorResponse(res, 404, 'Page not found');
  }

  // Generate new slug
  let newSlug = `${originalPage.slug}-copy`;
  let counter = 1;

  while (await Page.findOne({ slug: newSlug })) {
    newSlug = `${originalPage.slug}-copy-${counter}`;
    counter++;
  }

  // Create duplicate
  const duplicatedPage = await Page.create({
    title: `${originalPage.title} (Copy)`,
    slug: newSlug,
    templateType: originalPage.templateType,
    content: originalPage.content,
    seo: originalPage.seo,
    status: 'draft',
    author: req.user.id
  });

  return successResponse(res, 201, 'Page duplicated successfully', { page: duplicatedPage });
});

// @desc    Add SEO variant to a page
// @route   POST /api/pages/:id/seo-variants
// @access  Private
export const addSeoVariant = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);

  if (!page) {
    return errorResponse(res, 404, 'Page not found');
  }

  const { name, metaTitle, metaDescription, metaKeywords, ogTitle, ogDescription, ogImage, weight } = req.body;

  const newVariant = {
    name,
    metaTitle,
    metaDescription,
    metaKeywords,
    ogTitle,
    ogDescription,
    ogImage,
    weight: weight || 1,
    isActive: true,
    impressions: 0,
    clicks: 0
  };

  page.seoVariants.push(newVariant);
  await page.save();

  return successResponse(res, 201, 'SEO variant added successfully', { page });
});

// @desc    Update SEO variant
// @route   PUT /api/pages/:id/seo-variants/:variantId
// @access  Private
export const updateSeoVariant = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);

  if (!page) {
    return errorResponse(res, 404, 'Page not found');
  }

  const variantIndex = page.seoVariants.findIndex(v => v._id.toString() === req.params.variantId);

  if (variantIndex === -1) {
    return errorResponse(res, 404, 'SEO variant not found');
  }

  const { name, metaTitle, metaDescription, metaKeywords, ogTitle, ogDescription, ogImage, weight, isActive } = req.body;

  if (name !== undefined) page.seoVariants[variantIndex].name = name;
  if (metaTitle !== undefined) page.seoVariants[variantIndex].metaTitle = metaTitle;
  if (metaDescription !== undefined) page.seoVariants[variantIndex].metaDescription = metaDescription;
  if (metaKeywords !== undefined) page.seoVariants[variantIndex].metaKeywords = metaKeywords;
  if (ogTitle !== undefined) page.seoVariants[variantIndex].ogTitle = ogTitle;
  if (ogDescription !== undefined) page.seoVariants[variantIndex].ogDescription = ogDescription;
  if (ogImage !== undefined) page.seoVariants[variantIndex].ogImage = ogImage;
  if (weight !== undefined) page.seoVariants[variantIndex].weight = weight;
  if (isActive !== undefined) page.seoVariants[variantIndex].isActive = isActive;

  await page.save();

  return successResponse(res, 200, 'SEO variant updated successfully', { page });
});

// @desc    Delete SEO variant
// @route   DELETE /api/pages/:id/seo-variants/:variantId
// @access  Private
export const deleteSeoVariant = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);

  if (!page) {
    return errorResponse(res, 404, 'Page not found');
  }

  const variantIndex = page.seoVariants.findIndex(v => v._id.toString() === req.params.variantId);

  if (variantIndex === -1) {
    return errorResponse(res, 404, 'SEO variant not found');
  }

  page.seoVariants.splice(variantIndex, 1);
  await page.save();

  return successResponse(res, 200, 'SEO variant deleted successfully', { page });
});

// @desc    Update SEO variant settings
// @route   PUT /api/pages/:id/seo-variant-settings
// @access  Private
export const updateSeoVariantSettings = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);

  if (!page) {
    return errorResponse(res, 404, 'Page not found');
  }

  const { enabled, strategy, defaultVariantId } = req.body;

  if (!page.seoVariantSettings) {
    page.seoVariantSettings = {};
  }

  if (enabled !== undefined) page.seoVariantSettings.enabled = enabled;
  if (strategy !== undefined) page.seoVariantSettings.strategy = strategy;
  if (defaultVariantId !== undefined) page.seoVariantSettings.defaultVariantId = defaultVariantId;

  await page.save();

  return successResponse(res, 200, 'SEO variant settings updated successfully', { page });
});

// @desc    Get SEO variant analytics
// @route   GET /api/pages/:id/seo-variant-analytics
// @access  Private
export const getSeoVariantAnalytics = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);

  if (!page) {
    return errorResponse(res, 404, 'Page not found');
  }

  const analytics = page.seoVariants.map(variant => ({
    id: variant._id,
    name: variant.name,
    impressions: variant.impressions,
    clicks: variant.clicks,
    ctr: variant.impressions > 0 ? (variant.clicks / variant.impressions * 100).toFixed(2) : 0,
    isActive: variant.isActive,
    weight: variant.weight
  }));

  return successResponse(res, 200, 'SEO variant analytics retrieved successfully', { analytics });
});
