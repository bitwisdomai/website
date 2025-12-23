import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { API_BASE_URL } from "../../../services/api";

const MobileNodeWaitlist = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({ total: 0, active: 0, notified: 0, converted: 0 });

  useEffect(() => {
    fetchEntries();
  }, [filter, currentPage]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const statusParam = filter !== 'all' ? `&status=${filter}` : '';
      const response = await fetch(
        `${API_BASE_URL}/waitlist?page=${currentPage}&limit=10${statusParam}`
      );
      const data = await response.json();

      if (data.success) {
        // Filter only nodeFÔN entries
        const mobileEntries = data.data.filter(
          (entry) => entry.waitlistType === 'nodeFÔN'
        );
        setEntries(mobileEntries);
        setTotalPages(data.totalPages);
        calculateStats(mobileEntries);
      }
    } catch (err) {
      setError('Failed to fetch waitlist entries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const active = data.filter((e) => e.status === 'active').length;
    const notified = data.filter((e) => e.status === 'notified').length;
    const converted = data.filter((e) => e.status === 'converted').length;
    setStats({ total, active, notified, converted });
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/waitlist/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchEntries();
        setSelectedEntry(null);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const deleteEntry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/waitlist/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchEntries();
        setSelectedEntry(null);
      }
    } catch (err) {
      console.error('Failed to delete entry:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-blue-100 text-blue-800',
      notified: 'bg-yellow-100 text-yellow-800',
      converted: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="text-center py-8">Loading waitlist entries...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-600">Total Entries</h3>
          <p className="text-2xl font-bold text-blue-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <h3 className="text-sm font-medium text-indigo-600">Active</h3>
          <p className="text-2xl font-bold text-indigo-900 mt-1">{stats.active}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-sm font-medium text-yellow-600">Notified</h3>
          <p className="text-2xl font-bold text-yellow-900 mt-1">{stats.notified}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-sm font-medium text-green-600">Converted</h3>
          <p className="text-2xl font-bold text-green-900 mt-1">{stats.converted}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex justify-between items-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Entries</option>
          <option value="active">Active</option>
          <option value="notified">Notified</option>
          <option value="converted">Converted</option>
        </select>
      </div>

      {/* Table */}
      <div>
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="w-1/3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.map((entry) => (
              <tr key={entry._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <div className="truncate max-w-[200px]">{entry.name}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="truncate max-w-[250px]" title={entry.email}>
                    {entry.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap ${getStatusColor(entry.status)}`}>
                    {entry.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="whitespace-normal break-words">
                    {formatDate(entry.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => setSelectedEntry(entry)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteEntry(entry._id)}
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

      {entries.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No mobile node (nodeFÔN) waitlist entries found.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900">Waitlist Entry Details</h2>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Contact Information</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedEntry.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedEntry.email}</p>
                    <p><span className="font-medium">Waitlist Type:</span> {selectedEntry.waitlistType}</p>
                  </div>
                </div>

                {selectedEntry.notes && (
                  <div>
                    <h3 className="font-semibold text-gray-700">Notes</h3>
                    <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {selectedEntry.notes}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-gray-700">Status & Actions</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => updateStatus(selectedEntry._id, 'active')}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Mark Active
                    </button>
                    <button
                      onClick={() => updateStatus(selectedEntry._id, 'notified')}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Mark Notified
                    </button>
                    <button
                      onClick={() => updateStatus(selectedEntry._id, 'converted')}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Mark Converted
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-500 border-t pt-3">
                  <p>Joined: {formatDate(selectedEntry.createdAt)}</p>
                  {selectedEntry.notifiedAt && (
                    <p>Notified: {formatDate(selectedEntry.notifiedAt)}</p>
                  )}
                  <p>Last Updated: {formatDate(selectedEntry.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNodeWaitlist;
