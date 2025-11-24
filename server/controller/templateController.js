import Template from '../models/Template.js';
import { asyncHandler, successResponse, errorResponse } from '../utils/helpers.js';

// @desc    Create a new template
// @route   POST /api/templates
// @access  Private (Admin only)
export const createTemplate = asyncHandler(async (req, res) => {
  const { name, identifier, description, schema, formConfig, thumbnail, category } = req.body;

  // Check if identifier already exists
  const existingTemplate = await Template.findOne({ identifier });
  if (existingTemplate) {
    return errorResponse(res, 400, `Template with identifier "${identifier}" already exists`);
  }

  // Create template
  const template = await Template.create({
    name,
    identifier,
    description,
    schema: schema || {},
    formConfig: formConfig || {},
    thumbnail,
    category: category || 'custom'
  });

  return successResponse(res, 201, 'Template created successfully', { template });
});

// @desc    Get all templates
// @route   GET /api/templates
// @access  Private
export const getAllTemplates = asyncHandler(async (req, res) => {
  const { category, isActive } = req.query;

  // Build query
  const query = {};

  if (category) {
    query.category = category;
  }

  if (isActive !== undefined) {
    query.isActive = isActive === 'true';
  }

  const templates = await Template.find(query).sort({ createdAt: -1 });

  return successResponse(res, 200, 'Templates retrieved successfully', {
    templates,
    count: templates.length
  });
});

// @desc    Get single template by ID
// @route   GET /api/templates/:id
// @access  Private
export const getTemplateById = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);

  if (!template) {
    return errorResponse(res, 404, 'Template not found');
  }

  return successResponse(res, 200, 'Template retrieved successfully', { template });
});

// @desc    Get single template by identifier
// @route   GET /api/templates/identifier/:identifier
// @access  Private
export const getTemplateByIdentifier = asyncHandler(async (req, res) => {
  const template = await Template.findOne({
    identifier: req.params.identifier,
    isActive: true
  });

  if (!template) {
    return errorResponse(res, 404, 'Template not found');
  }

  return successResponse(res, 200, 'Template retrieved successfully', { template });
});

// @desc    Update template
// @route   PUT /api/templates/:id
// @access  Private (Admin only)
export const updateTemplate = asyncHandler(async (req, res) => {
  const { name, identifier, description, schema, formConfig, thumbnail, category, isActive } = req.body;

  let template = await Template.findById(req.params.id);

  if (!template) {
    return errorResponse(res, 404, 'Template not found');
  }

  // Check if identifier is being changed and if it already exists
  if (identifier && identifier !== template.identifier) {
    const existingTemplate = await Template.findOne({ identifier });
    if (existingTemplate) {
      return errorResponse(res, 400, `Template with identifier "${identifier}" already exists`);
    }
  }

  // Update fields
  if (name) template.name = name;
  if (identifier) template.identifier = identifier;
  if (description !== undefined) template.description = description;
  if (schema) template.schema = schema;
  if (formConfig) template.formConfig = formConfig;
  if (thumbnail !== undefined) template.thumbnail = thumbnail;
  if (category) template.category = category;
  if (isActive !== undefined) template.isActive = isActive;

  await template.save();

  return successResponse(res, 200, 'Template updated successfully', { template });
});

// @desc    Delete template
// @route   DELETE /api/templates/:id
// @access  Private (Admin only)
export const deleteTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);

  if (!template) {
    return errorResponse(res, 404, 'Template not found');
  }

  await template.deleteOne();

  return successResponse(res, 200, 'Template deleted successfully');
});

// @desc    Toggle template active status
// @route   PATCH /api/templates/:id/toggle-active
// @access  Private (Admin only)
export const toggleTemplateActive = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);

  if (!template) {
    return errorResponse(res, 404, 'Template not found');
  }

  template.isActive = !template.isActive;
  await template.save();

  return successResponse(res, 200, `Template ${template.isActive ? 'activated' : 'deactivated'} successfully`, { template });
});
