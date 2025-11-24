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

  return successResponse(res, 200, 'Page retrieved successfully', { page });
});

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
