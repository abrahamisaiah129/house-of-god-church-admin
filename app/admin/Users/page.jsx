"use client";
import React, { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "@/lib/api";
import ProtectedRoute from "@/app/components/ProtectedRoute";

function UserManagementPage() {
  // --- 1. CONFIGURATION: ALL AVAILABLE PAGES ---
  const AVAILABLE_PAGES = [
    { id: "dashboard", label: "Dashboard / Home" },
    { id: "converts", label: "New Converts" },
    { id: "department", label: "Departments" },
    { id: "events", label: "Events" },
    { id: "gallery", label: "Media & Gallery" },
    { id: "about", label: "About Section" },
    { id: "users", label: "User Management (Super Admin Only)" },
  ];

  // --- 2. STATE ---

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const initialFormState = {
    id: null,
    name: "",
    email: "",
    password: "", // In real app, handle securely
    role: "Admin",
    access: [], // Array of page IDs
  };
  const [formData, setFormData] = useState(initialFormState);

  // Fetch users from API on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await getUsers();
      if (result.success || Array.isArray(result)) {
        // handle both { success: true, data: [...] } and direct array return
        const usersArray = Array.isArray(result) ? result : result.data || [];
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
    setLoading(false);
  };

  // --- 3. HANDLERS ---

  const openAddModal = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setFormData({ ...user, password: "" }); // Don't show real password
    setIsEditing(true);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Checkbox for Page Access
  const handleAccessToggle = (pageId) => {
    const currentAccess = formData.access || [];
    if (currentAccess.includes(pageId)) {
      setFormData({
        ...formData,
        access: currentAccess.filter((id) => id !== pageId),
      });
    } else {
      setFormData({ ...formData, access: [...currentAccess, pageId] });
    }
  };

  // Handle Role Change (Super Admin gets all access automatically)
  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    if (newRole === "Super Admin") {
      setFormData({
        ...formData,
        role: newRole,
        access: AVAILABLE_PAGES.map((p) => p.id),
      });
    } else {
      setFormData({ ...formData, role: newRole, access: [] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update User
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        access: formData.access,
      };
      if (formData.password) {
        userData.password = formData.password;
      }

      updateUser(formData._id, userData)
        .then((result) => {
          // Optimistic update or fetch again
          const updated = result.data || { ...formData, ...userData };
          setUsers(
            users.map((u) =>
              u._id === formData._id ? { ...u, ...updated } : u,
            ),
          );
          setShowModal(false);
        })
        .catch((error) => console.error("Error updating user:", error));
    } else {
      // Create User
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        access: formData.access,
      };

      createUser(userData)
        .then((result) => {
          const newUser = result.data || { ...userData, _id: Date.now() }; // Fallback ID
          setUsers([...users, newUser]);
          setShowModal(false);
        })
        .catch((error) => console.error("Error creating user:", error));
    }
  };

  const handleDelete = (userId) => {
    const userToDelete = users.find((u) => u._id === userId);

    // Protection: Cannot delete the main Super Admin (Simulated logic)
    if (
      userToDelete?.role === "Super Admin" &&
      users.filter((u) => u.role === "Super Admin").length <= 1
    ) {
      alert("Cannot delete the last Super Admin!");
      return;
    }

    if (confirm(`Are you sure you want to remove ${userToDelete?.name}?`)) {
      deleteUser(userId)
        .then((result) => {
          setUsers(users.filter((u) => u._id !== userId));
        })
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <i className="fas fa-users-cog text-yellow-600"></i>
            User & Role Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage system admins and their access permissions.
          </p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold rounded-lg shadow-md transition-colors"
          onClick={openAddModal}
        >
          <i className="fas fa-user-plus mr-2"></i> Add New User
        </button>
      </div>

      {/* USERS LIST CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">User Profile</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Access Permissions</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Profile */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold text-lg border border-yellow-200 shadow-sm">
                        {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role Badge */}
                  <td className="px-6 py-4">
                    {user.role === "Super Admin" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                        <i className="fas fa-star mr-1 text-[10px]"></i> Super
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        <i className="fas fa-user-shield mr-1 text-[10px]"></i>{" "}
                        Admin
                      </span>
                    )}
                  </td>

                  {/* Access List */}
                  <td className="px-6 py-4 max-w-xs">
                    {user.role === "Super Admin" ? (
                      <span className="text-green-600 text-xs font-semibold flex items-center gap-1">
                        <i className="fas fa-check-circle"></i> Full System
                        Access
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {!user.access || user.access.length === 0 ? (
                          <span className="text-gray-400 italic text-xs">
                            No access assigned
                          </span>
                        ) : (
                          user.access.map((pageId) => {
                            const pageLabel = AVAILABLE_PAGES.find(
                              (p) => p.id === pageId,
                            )?.label.split("/")[0];
                            return (
                              <span
                                key={pageId}
                                className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-200 rounded text-[10px] font-medium"
                              >
                                {pageLabel}
                              </span>
                            );
                          })
                        )}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right space-x-2">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-yellow-700 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 transition-colors"
                        onClick={() => openEditModal(user)}
                        title="Edit Roles"
                      >
                        <i className="fas fa-pencil-alt text-xs"></i>
                      </button>

                      <button
                        className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors ${
                          user._id === 1 // Mock logic
                            ? "text-gray-300 bg-gray-50 border-gray-200 cursor-not-allowed"
                            : "text-red-600 bg-red-50 hover:bg-red-100 border-red-200"
                        }`}
                        onClick={() => handleDelete(user._id)}
                        disabled={user._id === 1}
                        title={
                          user._id === 1
                            ? "Cannot delete yourself"
                            : "Delete User"
                        }
                      >
                        <i className="fas fa-trash-alt text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL: ADD / EDIT USER --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all animate-fadeIn">
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h5 className="font-bold text-gray-800 text-lg">
                {isEditing
                  ? `Edit User: ${formData.name}`
                  : "Add New Administrator"}
              </h5>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      {isEditing ? "Reset Password (Optional)" : "Password"}
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={!isEditing}
                      placeholder={
                        isEditing ? "Leave blank to keep current" : ""
                      }
                    />
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      User Role
                    </label>
                    <select
                      name="role"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm bg-white"
                      value={formData.role}
                      onChange={handleRoleChange}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  {/* ACCESS PERMISSIONS (Only for Regular Admins) */}
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Access Permissions
                  </label>

                  {formData.role === "Super Admin" ? (
                    <div className="bg-yellow-50 text-yellow-800 px-4 py-3 rounded-lg text-sm flex items-start gap-2 border border-yellow-100">
                      <i className="fas fa-info-circle mt-0.5"></i>
                      <span>
                        Super Admins have full access to all pages by default.
                      </span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {AVAILABLE_PAGES.map((page) => (
                        <div
                          key={page.id}
                          onClick={() => handleAccessToggle(page.id)}
                          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                            (formData.access || []).includes(page.id)
                              ? "bg-yellow-50 border-yellow-200"
                              : "bg-white border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${
                              (formData.access || []).includes(page.id)
                                ? "bg-yellow-500 border-yellow-500"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {(formData.access || []).includes(page.id) && (
                              <i className="fas fa-check text-black text-xs"></i>
                            )}
                          </div>

                          <span
                            className={`text-sm font-medium ${
                              (formData.access || []).includes(page.id)
                                ? "text-yellow-900"
                                : "text-gray-700"
                            }`}
                          >
                            {page.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg shadow-sm transition-colors"
                >
                  {isEditing ? "Update User" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <UserManagementPage />
    </ProtectedRoute>
  );
}
