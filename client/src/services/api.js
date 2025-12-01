import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/me', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  getAllUsers: () => api.get('/auth/users'),
  deleteUser: (id) => api.delete(`/auth/users/${id}`)
};

// Pages API
export const pagesAPI = {
  getAll: (params) => api.get('/pages', { params }),
  getById: (id) => api.get(`/pages/${id}`),
  getBySlug: (slug) => api.get(`/pages/public/${slug}`),
  create: (data) => api.post('/pages', data),
  update: (id, data) => api.put(`/pages/${id}`, data),
  delete: (id) => api.delete(`/pages/${id}`),
  publish: (id) => api.patch(`/pages/${id}/publish`),
  unpublish: (id) => api.patch(`/pages/${id}/unpublish`),
  duplicate: (id) => api.post(`/pages/${id}/duplicate`),

  // SEO Variants
  addSeoVariant: (id, data) => api.post(`/pages/${id}/seo-variants`, data),
  updateSeoVariant: (id, variantId, data) => api.put(`/pages/${id}/seo-variants/${variantId}`, data),
  deleteSeoVariant: (id, variantId) => api.delete(`/pages/${id}/seo-variants/${variantId}`),
  updateSeoVariantSettings: (id, data) => api.put(`/pages/${id}/seo-variant-settings`, data),
  getSeoVariantAnalytics: (id) => api.get(`/pages/${id}/seo-variant-analytics`)
};

// Templates API
export const templatesAPI = {
  getAll: (params) => api.get('/templates', { params }),
  getById: (id) => api.get(`/templates/${id}`),
  getByIdentifier: (identifier) => api.get(`/templates/identifier/${identifier}`),
  create: (data) => api.post('/templates', data),
  update: (id, data) => api.put(`/templates/${id}`, data),
  delete: (id) => api.delete(`/templates/${id}`),
  toggleActive: (id) => api.patch(`/templates/${id}/toggle-active`)
};

// SEO API
export const seoAPI = {
  getStats: () => api.get('/seo/stats'),
  generateMeta: (data) => api.post('/seo/generate-meta', data),
  getSitemap: () => api.get('/seo/sitemap.xml'),
  getRobotsTxt: () => api.get('/seo/robots.txt')
};

export default api;
