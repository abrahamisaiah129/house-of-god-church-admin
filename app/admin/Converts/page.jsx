"use client";
import React, { useState, useMemo, useEffect } from "react";
import { getConverts, deleteConvert, updateConvertStatus } from "@/lib/api";
import ProtectedRoute from "@/app/components/ProtectedRoute";

function ConvertsPage() {
  // --- 1. STATE ---
  const [converts, setConverts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch converts from API on mount and when refreshKey changes
  useEffect(() => {
    fetchConverts();
  }, [refreshKey]);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  const fetchConverts = async () => {
    setLoading(true);
    try {
      const result = await getConverts();
      if (Array.isArray(result)) {
        setConverts(result);
      } else if (result && result.data && Array.isArray(result.data)) {
        setConverts(result.data);
      } else {
        console.warn("Unexpected API response format:", result);
        setConverts([]);
      }
    } catch (error) {
      console.error("Error fetching converts:", error);
      setConverts([]);
    }
    setLoading(false);
  };

  // Sorting Function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter & Sort Data
  const processedData = useMemo(() => {
    // 1. Filter by Search
    let data = converts.filter(
      (item) =>
        (item.name &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.fullName &&
          item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.phonenumber && item.phonenumber.includes(searchTerm)),
    );

    // 2. Sort
    data.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [converts, searchTerm, sortConfig]);

  // --- 4. HANDLERS ---

  // Checkbox Selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = processedData.map((c) => c._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Delete Handlers
  const handleDeleteOne = (id) => {
    if (confirm("Permanently delete this record?")) {
      deleteConvert(id)
        .then((result) => {
          if (result.success) {
            triggerRefresh(); // Refresh data from server
            setSelectedIds(selectedIds.filter((sid) => sid !== id));
          }
        })
        .catch((error) => {
          // If item already gone, refresh to update list
          const isNotFound =
            error.message && error.message.toLowerCase().includes("not found");

          if (isNotFound) {
            console.warn("Item already deleted, refreshing list...");
            triggerRefresh();
          } else {
            console.error("Error deleting convert:", error);
          }
        });
    }
  };

  const handleDeleteSelected = () => {
    if (
      confirm(
        `Are you sure you want to delete ${selectedIds.length} selected records?`,
      )
    ) {
      Promise.allSettled(selectedIds.map((id) => deleteConvert(id))).then(
        (results) => {
          // Whether fulfilled or rejected, we should refresh to get latest state
          triggerRefresh();
          setSelectedIds([]);
        },
      );
    }
  };

  const handleDeleteAll = () => {
    if (
      confirm(
        "WARNING: This will delete ALL records in the database. Are you sure?",
      )
    ) {
      Promise.allSettled(converts.map((c) => deleteConvert(c._id))).then(() => {
        triggerRefresh();
        setSelectedIds([]);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <i className="fas fa-user-plus text-yellow-500"></i>
            New Converts
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage submissions from the website form.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm bg-white"
            placeholder="Search name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TOOLBAR ACTIONS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50/50 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Bulk Actions:
            </span>

            <button
              className={`inline-flex items-center px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors ${
                selectedIds.length === 0
                  ? "border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed"
                  : "border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
              }`}
              disabled={selectedIds.length === 0}
              onClick={handleDeleteSelected}
            >
              <i className="fas fa-trash-alt mr-1.5"></i> Delete Selected (
              {selectedIds.length})
            </button>

            <button
              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                converts.length === 0
                  ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white shadow-sm"
              }`}
              onClick={handleDeleteAll}
              disabled={converts.length === 0}
            >
              <i className="fas fa-times-circle mr-1.5"></i> Delete ALL
            </button>
          </div>

          <div className="text-gray-500 text-xs font-medium">
            Showing{" "}
            <span className="text-gray-900 font-bold">
              {processedData.length}
            </span>{" "}
            records
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
              <tr>
                {/* Master Checkbox */}
                <th className="px-6 py-4 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 cursor-pointer"
                    onChange={handleSelectAll}
                    checked={
                      processedData.length > 0 &&
                      selectedIds.length === processedData.length
                    }
                  />
                </th>

                {/* Sortable Headers */}
                <th
                  className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    Name
                    {sortConfig.key === "name" && (
                      <i
                        className={`fas fa-caret-${sortConfig.direction === "asc" ? "up" : "down"} text-gray-400`}
                      ></i>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center gap-1">
                    Date Joined
                    {sortConfig.key === "date" && (
                      <i
                        className={`fas fa-caret-${sortConfig.direction === "asc" ? "up" : "down"} text-gray-400`}
                      ></i>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Address</th>
                <th
                  className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {sortConfig.key === "status" && (
                      <i
                        className={`fas fa-caret-${sortConfig.direction === "asc" ? "up" : "down"} text-gray-400`}
                      ></i>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                  </td>
                </tr>
              ) : processedData.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-400 bg-white"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <i className="far fa-folder-open text-4xl mb-3 opacity-50"></i>
                      <p>No records found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                processedData.map((item) => (
                  <tr
                    key={item._id}
                    className={`hover:bg-gray-50/50 transition-colors ${
                      selectedIds.includes(item._id) ? "bg-yellow-50/30" : ""
                    }`}
                  >
                    {/* Row Checkbox */}
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 cursor-pointer"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => handleSelectOne(item._id)}
                      />
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {item.name}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {item.date
                          ? new Date(item.date).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                        {item.phonenumber && (
                          <span className="flex items-center gap-1.5 text-gray-700">
                            <i className="fas fa-phone text-emerald-500"></i>{" "}
                            {item.phonenumber}
                          </span>
                        )}
                        {item.email && (
                          <span className="flex items-center gap-1.5 text-gray-700">
                            <i className="fas fa-envelope text-blue-500"></i>{" "}
                            {item.email}
                          </span>
                        )}
                      </div>
                    </td>

                    <td
                      className="px-6 py-4 max-w-xs truncate text-xs"
                      title={item.address}
                    >
                      {item.address || (
                        <span className="text-gray-400 italic">
                          Not provided
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.status === "Contacted"}
                          onChange={(e) => {
                            const newStatus = e.target.checked
                              ? "Contacted"
                              : "Not Contacted";
                            // Optimistic update
                            setConverts((prev) =>
                              prev.map((c) =>
                                c._id === item._id
                                  ? { ...c, status: newStatus }
                                  : c,
                              ),
                            );
                            // API call
                            updateConvertStatus(item._id, newStatus).catch(
                              (err) => {
                                // If not found, refresh list to remove it
                                const isNotFound =
                                  err.message &&
                                  err.message
                                    .toLowerCase()
                                    .includes("not found");

                                if (isNotFound) {
                                  console.warn(
                                    "Item not found during status update, refreshing...",
                                  );
                                  triggerRefresh();
                                } else {
                                  console.error("Failed to update status", err);
                                  // Revert on other errors
                                  setConverts((prev) =>
                                    prev.map((c) =>
                                      c._id === item._id
                                        ? { ...c, status: item.status }
                                        : c,
                                    ),
                                  );
                                }
                              },
                            );
                          }}
                          className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {item.status === "Contacted"
                            ? "Contacted"
                            : "Not Contacted"}
                        </span>
                      </label>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        className="text-gray-400 hover:text-red-600 transition-colors w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center ml-auto"
                        onClick={() => handleDeleteOne(item._id)}
                        title="Delete Record"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <ConvertsPage />
    </ProtectedRoute>
  );
}
