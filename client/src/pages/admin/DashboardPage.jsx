import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminLayout from '../../components/admin/AdminLayout';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/admin/pages"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pages</h3>
            <p className="text-gray-600">Manage all pages</p>
          </Link>

          <Link
            to="/admin/templates"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Templates</h3>
            <p className="text-gray-600">Manage templates</p>
          </Link>

          <Link
            to="/admin/seo"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">SEO</h3>
            <p className="text-gray-600">SEO analytics</p>
          </Link>

          {user?.role === 'admin' && (
            <Link
              to="/admin/users"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Users</h3>
              <p className="text-gray-600">Manage users</p>
            </Link>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Quick Start</h2>
          <ul className="space-y-2 text-blue-800">
            <li>• Create your first page from the Pages section</li>
            <li>• Customize templates to match your brand</li>
            <li>• Use SEO tools to optimize your pages</li>
            <li>• Publish pages when ready to go live</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
