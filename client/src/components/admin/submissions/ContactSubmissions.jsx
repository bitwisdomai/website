import { useState, useEffect } from "react";
import { FaTrash } from 'react-icons/fa';
import { API_BASE_URL } from "../../../services/api";

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    resolved: 0,
  });

  useEffect(() => {
    fetchSubmissions();
  }, [filter, currentPage]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const statusParam = filter !== "all" ? `&status=${filter}` : "";
      const response = await fetch(
        `${API_BASE_URL}/contact?page=${currentPage}&limit=10${statusParam}`
      );
      const data = await response.json();

      if (data.success) {
        setSubmissions(data.data);
        setTotalPages(data.totalPages);
        calculateStats(data.data);
      }
    } catch (err) {
      setError("Failed to fetch submissions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const newSubmissions = data.filter((s) => s.status === "new").length;
    const contacted = data.filter((s) => s.status === "contacted").length;
    const resolved = data.filter((s) => s.status === "resolved").length;
    setStats({ total, new: newSubmissions, contacted, resolved });
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/contact/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        fetchSubmissions();
        setSelectedSubmission(null);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const deleteSubmission = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?"))
      return;

    try {
      const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchSubmissions();
        setSelectedSubmission(null);
      }
    } catch (err) {
      console.error("Failed to delete submission:", err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-purple-100 text-purple-800",
      resolved: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getInterestLabel = (interest) => {
    const labels = {
      licensing: "Licensing",
      partnership: "Partnership",
      demo: "Product Demo",
      support: "Support",
    };
    return labels[interest] || interest || "N/A";
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
          <h3 className="text-xs sm:text-sm font-medium text-blue-600">
            Total Contacts
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-blue-900 mt-1">
            {stats.total}
          </p>
        </div>
        <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg border border-indigo-200">
          <h3 className="text-xs sm:text-sm font-medium text-indigo-600">
            New
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-indigo-900 mt-1">
            {stats.new}
          </p>
        </div>
        <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
          <h3 className="text-xs sm:text-sm font-medium text-yellow-600">
            Contacted
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-yellow-900 mt-1">
            {stats.contacted}
          </p>
        </div>
        <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
          <h3 className="text-xs sm:text-sm font-medium text-green-600">
            Resolved
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-green-900 mt-1">
            {stats.resolved}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex justify-between items-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full sm:w-auto"
        >
          <option value="all">All Submissions</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Table */}
      <div className="-mx-4 sm:-mx-6 lg:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-1/5 px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="hidden md:table-cell w-1/5 px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="hidden lg:table-cell w-1/6 px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interest
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
                      <div className="truncate max-w-[180px]">{submission.name}</div>
                    </td>
                    <td className="hidden md:table-cell px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-500">
                      <div className="truncate max-w-[180px]" title={submission.email}>
                        {submission.email}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-500">
                      {getInterestLabel(submission.interest)}
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap ${getStatusColor(
                          submission.status
                        )}`}
                      >
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="w-full sm:w-auto px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full my-4 sm:my-8">
            <div className="max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex justify-between items-start sticky top-0 bg-white pb-4 border-b">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Contact Details
                  </h2>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Contact Information
                    </h3>
                    <div className="mt-2 space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {selectedSubmission.name}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {selectedSubmission.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {selectedSubmission.phone || "Not provided"}
                      </p>
                      <p>
                        <span className="font-medium">Interest:</span>{" "}
                        {getInterestLabel(selectedSubmission.interest)}
                      </p>
                    </div>
                  </div>

                  {selectedSubmission.message && (
                    <div>
                      <h3 className="font-semibold text-gray-700">Message</h3>
                      <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {selectedSubmission.message}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Status & Actions
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          updateStatus(selectedSubmission._id, "new")
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Mark New
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(selectedSubmission._id, "contacted")
                        }
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(selectedSubmission._id, "in_progress")
                        }
                        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(selectedSubmission._id, "resolved")
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Resolve
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(selectedSubmission._id, "closed")
                        }
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 border-t pt-3">
                    <p>Submitted: {formatDate(selectedSubmission.createdAt)}</p>
                    <p>
                      Last Updated: {formatDate(selectedSubmission.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>{" "}
              {/* FIXED missing closing div */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSubmissions;
