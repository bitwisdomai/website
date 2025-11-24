import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/pages', label: 'Pages' },
    { path: '/admin/templates', label: 'Templates' },
    { path: '/admin/seo', label: 'SEO' },
  ];

  if (user?.role === 'admin') {
    navLinks.push({ path: '/admin/users', label: 'Users' });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/admin/dashboard" className="text-2xl font-bold text-blue-600">
                BitWisdom CMS
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                target="_blank"
                className="text-gray-600 hover:text-gray-900"
              >
                View Site
              </Link>
              <span className="text-gray-600">
                {user?.name} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow p-4">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`block px-4 py-2 rounded transition ${
                        isActive(link.path)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-lg shadow p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
