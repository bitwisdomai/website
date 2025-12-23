import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { API_BASE_URL } from '../../services/api';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, archived: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
    fetchStats();
  }, [filter]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const statusParam = filter !== 'all' ? `?status=${filter}` : '';

      const response = await fetch(`${API_BASE_URL}/blog${statusParam}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setBlogs(data.data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/blog/stats/overview`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchBlogs();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <Link
            to="/admin/blog/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Create New Blog
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-sm text-gray-600">Total Blogs</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-sm text-gray-600">Published</div>
            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-sm text-gray-600">Drafts</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-sm text-gray-600">Total Views</div>
            <div className="text-2xl font-bold text-blue-600">{stats.totalViews || 0}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {['all', 'published', 'draft', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Blog List */}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No blog posts found. Create your first blog post!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="min-w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-2/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="w-1/6 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 truncate">{blog.title}</div>
                      <div className="text-sm text-gray-500 truncate">{blog.excerpt?.substring(0, 60)}...</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="truncate" title={blog.author}>{blog.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(blog.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.views || 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="whitespace-normal break-words">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2 items-center">
                        <Link
                          to={`/admin/blog/edit/${blog._id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BlogListPage;
