import { useState, useEffect } from 'react';
import { pagesAPI } from '../../services/api';

const SeoVariantManager = ({ pageId, onUpdate }) => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [analytics, setAnalytics] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    weight: 1,
    isActive: true
  });

  const [variantSettings, setVariantSettings] = useState({
    enabled: false,
    strategy: 'random'
  });

  useEffect(() => {
    fetchPageData();
    fetchAnalytics();
  }, [pageId]);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const response = await pagesAPI.getById(pageId);
      const pageData = response.data.data.page;
      setPage(pageData);

      if (pageData.seoVariantSettings) {
        setVariantSettings({
          enabled: pageData.seoVariantSettings.enabled || false,
          strategy: pageData.seoVariantSettings.strategy || 'random'
        });
      }
    } catch (error) {
      console.error('Error fetching page:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await pagesAPI.getSeoVariantAnalytics(pageId);
      setAnalytics(response.data.data.analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleAddVariant = async (e) => {
    e.preventDefault();
    try {
      const keywordsArray = typeof formData.metaKeywords === 'string'
        ? formData.metaKeywords.split(',').map(k => k.trim())
        : formData.metaKeywords;

      await pagesAPI.addSeoVariant(pageId, {
        ...formData,
        metaKeywords: keywordsArray
      });

      setShowAddForm(false);
      resetForm();
      fetchPageData();
      fetchAnalytics();
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error adding variant:', error);
      alert('Failed to add SEO variant');
    }
  };

  const handleUpdateVariant = async (e) => {
    e.preventDefault();
    try {
      const keywordsArray = typeof formData.metaKeywords === 'string'
        ? formData.metaKeywords.split(',').map(k => k.trim())
        : formData.metaKeywords;

      await pagesAPI.updateSeoVariant(pageId, editingVariant._id, {
        ...formData,
        metaKeywords: keywordsArray
      });

      setEditingVariant(null);
      resetForm();
      fetchPageData();
      fetchAnalytics();
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error updating variant:', error);
      alert('Failed to update SEO variant');
    }
  };

  const handleDeleteVariant = async (variantId) => {
    if (!confirm('Are you sure you want to delete this SEO variant?')) return;

    try {
      await pagesAPI.deleteSeoVariant(pageId, variantId);
      fetchPageData();
      fetchAnalytics();
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error deleting variant:', error);
      alert('Failed to delete SEO variant');
    }
  };

  const handleToggleVariant = async (variant) => {
    try {
      await pagesAPI.updateSeoVariant(pageId, variant._id, {
        isActive: !variant.isActive
      });
      fetchPageData();
      fetchAnalytics();
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error toggling variant:', error);
      alert('Failed to toggle SEO variant');
    }
  };

  const handleUpdateSettings = async () => {
    try {
      await pagesAPI.updateSeoVariantSettings(pageId, variantSettings);
      fetchPageData();
      if (onUpdate) onUpdate();
      alert('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: [],
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      weight: 1,
      isActive: true
    });
  };

  const startEdit = (variant) => {
    setEditingVariant(variant);
    setFormData({
      name: variant.name,
      metaTitle: variant.metaTitle || '',
      metaDescription: variant.metaDescription || '',
      metaKeywords: variant.metaKeywords || [],
      ogTitle: variant.ogTitle || '',
      ogDescription: variant.ogDescription || '',
      ogImage: variant.ogImage || '',
      weight: variant.weight || 1,
      isActive: variant.isActive
    });
    setShowAddForm(true);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">SEO Variant Settings</h3>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={variantSettings.enabled}
                onChange={(e) => setVariantSettings({ ...variantSettings, enabled: e.target.checked })}
                className="rounded"
              />
              <span>Enable SEO Variants A/B Testing</span>
            </label>
          </div>

          {variantSettings.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selection Strategy
                </label>
                <select
                  value={variantSettings.strategy}
                  onChange={(e) => setVariantSettings({ ...variantSettings, strategy: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="random">Random</option>
                  <option value="weighted">Weighted (based on weight values)</option>
                  <option value="sequential">Sequential (round-robin)</option>
                  <option value="time-based">Time-based (hour of day)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {variantSettings.strategy === 'random' && 'Randomly select from active variants'}
                  {variantSettings.strategy === 'weighted' && 'Select based on weight values'}
                  {variantSettings.strategy === 'sequential' && 'Rotate through variants evenly'}
                  {variantSettings.strategy === 'time-based' && 'Select based on hour of the day'}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleUpdateSettings}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">SEO Variants</h3>
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingVariant(null);
              resetForm();
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Variant
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={editingVariant ? handleUpdateVariant : handleAddVariant} className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-semibold mb-4">{editingVariant ? 'Edit' : 'Add'} SEO Variant</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Variant Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Variant A, Holiday Special, etc."
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title (max 60 chars)
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  maxLength={60}
                  placeholder="SEO optimized title"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.metaTitle.length}/60</p>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description (max 160 chars)
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  maxLength={160}
                  placeholder="SEO optimized description"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.metaDescription.length}/160</p>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={Array.isArray(formData.metaKeywords) ? formData.metaKeywords.join(', ') : formData.metaKeywords}
                  onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OG Title
                </label>
                <input
                  type="text"
                  value={formData.ogTitle}
                  onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Social media title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OG Image URL
                </label>
                <input
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OG Description
                </label>
                <textarea
                  value={formData.ogDescription}
                  onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                  placeholder="Social media description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (for weighted strategy)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg"
                  min={1}
                  max={100}
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <span>Active</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingVariant ? 'Update' : 'Add'} Variant
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingVariant(null);
                  resetForm();
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {page?.seoVariants && page.seoVariants.length > 0 ? (
          <div className="space-y-4">
            {page.seoVariants.map((variant) => {
              const variantAnalytics = analytics.find(a => a.id === variant._id.toString());

              return (
                <div key={variant._id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{variant.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded ${variant.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {variant.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          Weight: {variant.weight}
                        </span>
                      </div>

                      <div className="mt-2 text-sm text-gray-600 space-y-1">
                        {variant.metaTitle && (
                          <div><strong>Title:</strong> {variant.metaTitle}</div>
                        )}
                        {variant.metaDescription && (
                          <div><strong>Description:</strong> {variant.metaDescription}</div>
                        )}
                      </div>

                      {variantAnalytics && (
                        <div className="mt-2 flex gap-4 text-sm">
                          <span className="text-gray-600">
                            Impressions: <strong>{variantAnalytics.impressions}</strong>
                          </span>
                          <span className="text-gray-600">
                            Clicks: <strong>{variantAnalytics.clicks}</strong>
                          </span>
                          <span className="text-gray-600">
                            CTR: <strong>{variantAnalytics.ctr}%</strong>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleVariant(variant)}
                        className={`px-3 py-1 text-sm rounded ${variant.isActive ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                      >
                        {variant.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => startEdit(variant)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteVariant(variant._id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No SEO variants yet. Add your first variant to start A/B testing!
          </div>
        )}
      </div>
    </div>
  );
};

export default SeoVariantManager;
