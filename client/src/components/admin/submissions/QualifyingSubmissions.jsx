import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { API_BASE_URL } from "../../../services/api";

const QualifyingSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  useEffect(() => {
    fetchSubmissions();
  }, [filter, currentPage]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const statusParam = filter !== 'all' ? `&status=${filter}` : '';
      const response = await fetch(
        `${API_BASE_URL}/qualifying?page=${currentPage}&limit=10${statusParam}`
      );
      const data = await response.json();

      if (data.success) {
        setSubmissions(data.data);
        setTotalPages(data.totalPages);
        calculateStats(data.data);
      }
    } catch (err) {
      setError('Failed to fetch submissions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const pending = data.filter((s) => s.status === 'pending').length;
    const approved = data.filter((s) => s.status === 'approved').length;
    const rejected = data.filter((s) => s.status === 'rejected').length;
    setStats({ total, pending, approved, rejected });
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/qualifying/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchSubmissions();
        setSelectedSubmission(null);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const deleteSubmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/qualifying/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSubmissions();
        setSelectedSubmission(null);
      }
    } catch (err) {
      console.error('Failed to delete submission:', err);
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
      pending: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="text-center py-8">Loading submissions...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
          <h3 className="text-xs sm:text-sm font-medium text-blue-600">Total Applications</h3>
          <p className="text-xl sm:text-2xl font-bold text-blue-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
          <h3 className="text-xs sm:text-sm font-medium text-yellow-600">Pending</h3>
          <p className="text-xl sm:text-2xl font-bold text-yellow-900 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
          <h3 className="text-xs sm:text-sm font-medium text-green-600">Approved</h3>
          <p className="text-xl sm:text-2xl font-bold text-green-900 mt-1">{stats.approved}</p>
        </div>
        <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200">
          <h3 className="text-xs sm:text-sm font-medium text-red-600">Rejected</h3>
          <p className="text-xl sm:text-2xl font-bold text-red-900 mt-1">{stats.rejected}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex justify-between items-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full sm:w-auto"
        >
          <option value="all">All Applications</option>
          <option value="pending">Pending</option>
          <option value="under_review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="-mx-4 sm:-mx-6 lg:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-1/4 px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business Name
              </th>
              <th className="hidden md:table-cell w-1/5 px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="hidden lg:table-cell w-1/6 px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="w-1/6 px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="hidden sm:table-cell w-1/6 px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="w-1/6 px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.map((submission) => (
              <tr key={submission._id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm font-medium text-gray-900">
                  <div className="truncate max-w-[200px]">{submission.businessName}</div>
                </td>
                <td className="hidden md:table-cell px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-500">
                  <div className="truncate max-w-[180px]" title={submission.emailAddress}>
                    {submission.emailAddress}
                  </div>
                </td>
                <td className="hidden lg:table-cell px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-500">
                  {submission.phoneNumber}
                </td>
                <td className="px-3 sm:px-6 py-4">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap ${getStatusColor(submission.status)}`}>
                    {submission.status}
                  </span>
                </td>
                <td className="hidden sm:table-cell px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-500">
                  <div className="whitespace-normal break-words">
                    {formatDate(submission.createdAt)}
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm font-medium whitespace-nowrap">
                  <div className="flex gap-2 sm:gap-3 items-center">
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteSubmission(submission._id)}
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
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-full sm:w-auto px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="w-full sm:w-auto px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Next
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full my-4 sm:my-8">
            <div className="max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-start sticky top-0 bg-white pb-4 border-b">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Application Details</h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-gray-600 -mr-2"
                >
                  <span className="text-3xl">&times;</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <h3 className="font-semibold text-gray-700">Business Information</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <p><span className="font-medium">Business Name:</span> {selectedSubmission.businessName}</p>
                    <p><span className="font-medium">Business Type:</span> {selectedSubmission.businessType}</p>
                    <p><span className="font-medium">Address:</span> {selectedSubmission.businessAddress}</p>
                    <p><span className="font-medium">Email:</span> {selectedSubmission.emailAddress}</p>
                    <p><span className="font-medium">Phone:</span> {selectedSubmission.phoneNumber}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Registration Details</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <p><span className="font-medium">Registration Number:</span> {selectedSubmission.registrationNumber}</p>
                    <p><span className="font-medium">Jurisdiction:</span> {selectedSubmission.registrationJurisdiction}</p>
                    <p><span className="font-medium">Tax ID:</span> {selectedSubmission.taxId}</p>
                    <p><span className="font-medium">Nationality:</span> {selectedSubmission.nationality}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Ownership & Structure</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <p><span className="font-medium">Beneficial Owners:</span> {selectedSubmission.beneficialOwners}</p>
                    <p><span className="font-medium">Corporate Structure:</span> {selectedSubmission.corporateStructure}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Financial Information</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <p><span className="font-medium">Source of Funds:</span> {selectedSubmission.sourceOfFunds}</p>
                    <p><span className="font-medium">Intended Use:</span> {selectedSubmission.intendedUse}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Status & Actions</h3>
                <div className="mt-2 grid grid-cols-2 sm:flex gap-2">
                  <button
                    onClick={() => updateStatus(selectedSubmission._id, 'pending')}
                    className="px-3 sm:px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs sm:text-sm"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => updateStatus(selectedSubmission._id, 'under_review')}
                    className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => updateStatus(selectedSubmission._id, 'approved')}
                    className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-xs sm:text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(selectedSubmission._id, 'rejected')}
                    className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>

              {/* Documents Section */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-700 text-sm sm:text-base mb-3">Uploaded Documents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Photo ID', path: selectedSubmission.photoId },
                    { label: 'Articles of Incorporation', path: selectedSubmission.articlesOfIncorporation },
                    { label: 'Certificate of Incorporation', path: selectedSubmission.certificateOfIncorporation },
                    { label: 'Proof of Address', path: selectedSubmission.proofOfAddress }
                  ].map((doc, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-600 mb-2">{doc.label}</p>
                      {doc.path ? (
                        <a
                          href={`${API_BASE_URL}${doc.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            // Fetch with auth token
                            const token = localStorage.getItem('token');
                            fetch(`${API_BASE_URL}${doc.path}`, {
                              headers: {
                                'Authorization': `Bearer ${token}`
                              }
                            })
                              .then(response => response.blob())
                              .then(blob => {
                                const url = window.URL.createObjectURL(blob);
                                window.open(url, '_blank');
                              })
                              .catch(err => {
                                console.error('Error fetching file:', err);
                                alert('Failed to load file');
                              });
                          }}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Document
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">Not uploaded</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-gray-500 border-t pt-3">
                <p>Submitted: {formatDate(selectedSubmission.createdAt)}</p>
                <p>Last Updated: {formatDate(selectedSubmission.updatedAt)}</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualifyingSubmissions;
