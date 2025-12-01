import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { templatesAPI } from '../../services/api';

const TemplateManagerPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    identifier: '',
    description: '',
    category: 'content',
    schema: '{}',
    formConfig: '{}',
    isActive: true
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const response = await templatesAPI.getAll();
      setTemplates(response.data.data.templates);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setError('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      identifier: template.identifier,
      description: template.description,
      category: template.category,
      schema: JSON.stringify(template.schema, null, 2),
      formConfig: JSON.stringify(template.formConfig, null, 2),
      isActive: template.isActive
    });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingTemplate(null);
    setFormData({
      name: '',
      identifier: '',
      description: '',
      category: 'content',
      schema: '{}',
      formConfig: '{}',
      isActive: true
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const schema = JSON.parse(formData.schema);
      const formConfig = JSON.parse(formData.formConfig);

      const templateData = {
        ...formData,
        schema,
        formConfig
      };

      if (editingTemplate) {
        await templatesAPI.update(editingTemplate._id, templateData);
      } else {
        await templatesAPI.create(templateData);
      }

      setShowModal(false);
      fetchTemplates();
    } catch (error) {
      console.error('Error saving template:', error);
      if (error instanceof SyntaxError) {
        setError('Invalid JSON in schema or form config');
      } else {
        setError(error.response?.data?.message || 'Failed to save template');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      await templatesAPI.delete(id);
      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      alert(error.response?.data?.message || 'Failed to delete template');
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await templatesAPI.toggleActive(id);
      fetchTemplates();
    } catch (error) {
      console.error('Error toggling template status:', error);
      alert('Failed to update template status');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Template Manager</h1>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create New Template
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">No templates found</p>
            <button
              onClick={handleCreate}
              className="text-blue-600 hover:underline"
            >
              Create your first template
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {template.name}
                    </h3>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        template.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {template.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{template.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Identifier:</span>
                    <span className="font-mono text-gray-900">{template.identifier}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="capitalize text-gray-900">{template.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Used by pages:</span>
                    <span className="text-gray-900">{template.usedByPages || 0}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(template)}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleActive(template._id)}
                    className="flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition text-sm"
                  >
                    {template.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(template._id)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingTemplate ? 'Edit Template' : 'Create New Template'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Landing Page"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Identifier *
                    </label>
                    <input
                      type="text"
                      name="identifier"
                      value={formData.identifier}
                      onChange={handleInputChange}
                      required
                      disabled={!!editingTemplate}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="e.g., landing"
                    />
                    {editingTemplate && (
                      <p className="text-xs text-gray-500 mt-1">Identifier cannot be changed</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief description of this template"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="landing">Landing</option>
                      <option value="content">Content</option>
                      <option value="legal">Legal</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schema (JSON) *
                    </label>
                    <textarea
                      name="schema"
                      value={formData.schema}
                      onChange={handleInputChange}
                      rows="8"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder='{"title": {"type": "string"}, "content": {"type": "richtext"}}'
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Define the data structure for this template
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Form Config (JSON) *
                    </label>
                    <textarea
                      name="formConfig"
                      value={formData.formConfig}
                      onChange={handleInputChange}
                      rows="8"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder='{"title": {"label": "Page Title", "type": "text"}}'
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Define form fields for admin interface
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">Active (available for use)</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      {editingTemplate ? 'Update Template' : 'Create Template'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TemplateManagerPage;
