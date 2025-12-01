import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { pagesAPI, templatesAPI } from '../../services/api';

const PageEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    templateType: '',
    content: {},
    seo: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      twitterCard: 'summary_large_image',
      canonical: '',
      noindex: false,
      nofollow: false
    },
    status: 'draft'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTemplates();
    if (isEditMode) {
      fetchPage();
    }
  }, [id]);

  const fetchTemplates = async () => {
    try {
      const response = await templatesAPI.getAll({ active: true });
      setTemplates(response.data.data.templates);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setError('Failed to load templates');
    }
  };

  const fetchPage = async () => {
    try {
      setLoading(true);
      const response = await pagesAPI.getById(id);
      const page = response.data.data.page;

      setFormData({
        title: page.title,
        slug: page.slug,
        templateType: page.templateType,
        content: page.content || {},
        seo: page.seo || formData.seo,
        status: page.status
      });

      const template = templates.find(t => t.identifier === page.templateType);
      setSelectedTemplate(template);
    } catch (error) {
      console.error('Error fetching page:', error);
      setError('Failed to load page');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateChange = (templateId) => {
    const template = templates.find(t => t._id === templateId);
    setSelectedTemplate(template);
    setFormData(prev => ({
      ...prev,
      templateType: template.identifier,
      content: {}
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          [seoField]: type === 'checkbox' ? checked : value
        }
      }));
    } else if (name === 'title') {
      setFormData(prev => ({
        ...prev,
        title: value,
        slug: isEditMode ? prev.slug : generateSlug(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleContentChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      if (isEditMode) {
        await pagesAPI.update(id, formData);
      } else {
        await pagesAPI.create(formData);
      }
      navigate('/admin/pages');
    } catch (error) {
      console.error('Error saving page:', error);
      setError(error.response?.data?.message || 'Failed to save page');
    } finally {
      setSaving(false);
    }
  };

  const renderFormField = (fieldName, fieldConfig) => {
    const value = formData.content[fieldName] || '';

    switch (fieldConfig.type) {
      case 'text':
        return (
          <div key={fieldName} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fieldConfig.label}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleContentChange(fieldName, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={fieldName} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fieldConfig.label}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleContentChange(fieldName, e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      case 'richtext':
        return (
          <div key={fieldName} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fieldConfig.label}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleContentChange(fieldName, e.target.value)}
              rows="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="Enter content (HTML supported)"
            />
            <p className="text-xs text-gray-500 mt-1">Supports HTML formatting</p>
          </div>
        );

      case 'date':
        return (
          <div key={fieldName} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fieldConfig.label}
            </label>
            <input
              type="date"
              value={value}
              onChange={(e) => handleContentChange(fieldName, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      case 'tags':
        return (
          <div key={fieldName} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fieldConfig.label}
            </label>
            <input
              type="text"
              value={Array.isArray(value) ? value.join(', ') : value}
              onChange={(e) => handleContentChange(fieldName, e.target.value.split(',').map(t => t.trim()))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Comma-separated tags"
            />
          </div>
        );

      case 'group':
      case 'repeater':
        return (
          <div key={fieldName} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{fieldConfig.label}</h3>
            <textarea
              value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  handleContentChange(fieldName, parsed);
                } catch {
                  handleContentChange(fieldName, e.target.value);
                }
              }}
              rows="8"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder='Enter JSON data, e.g., {"title": "Hello", "description": "World"}'
            />
            <p className="text-xs text-gray-500 mt-1">Enter data as JSON</p>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Page' : 'Create New Page'}
          </h1>
          <button
            onClick={() => navigate('/admin/pages')}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Pages
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Section */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter page title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug *
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">/</span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="page-url-slug"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template *
              </label>
              <select
                name="templateType"
                value={selectedTemplate?._id || ''}
                onChange={(e) => handleTemplateChange(e.target.value)}
                required
                disabled={isEditMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">Select a template</option>
                {templates.map(template => (
                  <option key={template._id} value={template._id}>
                    {template.name} - {template.description}
                  </option>
                ))}
              </select>
              {isEditMode && (
                <p className="text-xs text-gray-500 mt-1">Template cannot be changed when editing</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Content Section */}
          {selectedTemplate && (
            <div className="bg-white p-6 rounded-lg shadow space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Page Content</h2>
              {Object.entries(selectedTemplate.formConfig || {}).map(([fieldName, fieldConfig]) =>
                renderFormField(fieldName, fieldConfig)
              )}
            </div>
          )}

          {/* SEO Section */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO Settings</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                name="seo.metaTitle"
                value={formData.seo.metaTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Leave empty to use page title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                name="seo.metaDescription"
                value={formData.seo.metaDescription}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter meta description (150-160 characters recommended)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Keywords
              </label>
              <input
                type="text"
                name="seo.metaKeywords"
                value={formData.seo.metaKeywords}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OG Title
                </label>
                <input
                  type="text"
                  name="seo.ogTitle"
                  value={formData.seo.ogTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OG Image URL
                </label>
                <input
                  type="text"
                  name="seo.ogImage"
                  value={formData.seo.ogImage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG Description
              </label>
              <textarea
                name="seo.ogDescription"
                value={formData.seo.ogDescription}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="seo.noindex"
                  checked={formData.seo.noindex}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                />
                <span className="text-sm text-gray-700">No Index</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="seo.nofollow"
                  checked={formData.seo.nofollow}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                />
                <span className="text-sm text-gray-700">No Follow</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/pages')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : (isEditMode ? 'Update Page' : 'Create Page')}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default PageEditorPage;
