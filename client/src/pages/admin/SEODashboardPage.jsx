import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { seoAPI } from '../../services/api';

const SEODashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await seoAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching SEO stats:', error);
      setError('Failed to load SEO statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSitemap = async () => {
    try {
      const response = await seoAPI.getSitemap();
      const blob = new Blob([response.data], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading sitemap:', error);
      alert('Failed to download sitemap');
    }
  };

  const handleDownloadRobotsTxt = async () => {
    try {
      const response = await seoAPI.getRobotsTxt();
      const blob = new Blob([response.data], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'robots.txt';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading robots.txt:', error);
      alert('Failed to download robots.txt');
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
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

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={fetchStats}
            className="text-blue-600 hover:underline"
          >
            Try Again
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor and optimize your site's SEO performance</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('pages')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pages Analysis
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tools'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              SEO Tools
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Total Pages</h3>
                <p className="text-3xl font-bold text-gray-900">{stats?.totalPages || 0}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Published Pages</h3>
                <p className="text-3xl font-bold text-green-600">{stats?.publishedPages || 0}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Avg SEO Score</h3>
                <p className={`text-3xl font-bold ${getScoreColor(stats?.averageSeoScore || 0)}`}>
                  {stats?.averageSeoScore || 0}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Pages with Issues</h3>
                <p className="text-3xl font-bold text-red-600">{stats?.pagesWithIssues || 0}</p>
              </div>
            </div>

            {/* Common Issues */}
            {stats?.commonIssues && stats.commonIssues.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Common SEO Issues</h2>
                <div className="space-y-3">
                  {stats.commonIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-medium text-gray-900">{issue.issue}</p>
                          <p className="text-sm text-gray-600">{issue.description}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{issue.count} pages</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pages Analysis Tab */}
        {activeTab === 'pages' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SEO Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meta Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meta Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats?.pages && stats.pages.length > 0 ? (
                  stats.pages.map((page) => (
                    <tr key={page._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{page.title}</div>
                        <div className="text-sm text-gray-500">/{page.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getScoreBgColor(page.seoScore)} ${getScoreColor(page.seoScore)}`}>
                          {page.seoScore}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {page.seo?.metaTitle ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-red-600">✗</span>
                          )}
                          <span className="ml-2">{page.seo?.metaTitle ? 'Set' : 'Missing'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {page.seo?.metaDescription ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-red-600">✗</span>
                          )}
                          <span className="ml-2">{page.seo?.metaDescription ? 'Set' : 'Missing'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          page.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {page.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No pages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* SEO Tools Tab */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sitemap Tool */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">XML Sitemap</h3>
                <p className="text-gray-600 mb-4">
                  Download your automatically generated sitemap for search engines.
                </p>
                <button
                  onClick={handleDownloadSitemap}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Download Sitemap
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  URL: {window.location.origin}/api/seo/sitemap.xml
                </p>
              </div>

              {/* Robots.txt Tool */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Robots.txt</h3>
                <p className="text-gray-600 mb-4">
                  Download your robots.txt file for search engine crawlers.
                </p>
                <button
                  onClick={handleDownloadRobotsTxt}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Download Robots.txt
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  URL: {window.location.origin}/api/seo/robots.txt
                </p>
              </div>
            </div>

            {/* SEO Best Practices */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO Best Practices</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Use Descriptive Titles</h4>
                    <p className="text-sm text-gray-600">Keep page titles under 60 characters and include target keywords.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Write Compelling Meta Descriptions</h4>
                    <p className="text-sm text-gray-600">Aim for 150-160 characters that summarize your page content.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Optimize Open Graph Tags</h4>
                    <p className="text-sm text-gray-600">Ensure proper social media preview with OG title, description, and image.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Use Clean URL Slugs</h4>
                    <p className="text-sm text-gray-600">Create readable, keyword-rich URLs without special characters.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Regular Content Updates</h4>
                    <p className="text-sm text-gray-600">Keep pages fresh with regular updates to improve search rankings.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SEODashboardPage;
