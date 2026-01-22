"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/lib/api";
import ProtectedRoute from "@/app/components/ProtectedRoute";

function DepartmentPage() {
  // --- 1. STATE & INITIAL DATA ---

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Toggle between View/Edit in modal
  const [isAddingNew, setIsAddingNew] = useState(false); // Track if we are creating a new one

  const initialFormState = {
    id: null,
    name: "",
    hod: "",
    email: "",
    date: "",
    image: "",
    body: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const fileInputRef = useRef(null);

  // Fetch departments from API on mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const result = await getDepartments();
      if (result.success) {
        const departmentsArray = Array.isArray(result.data) ? result.data : [];
        const departments = departmentsArray.map((d) => ({
          ...d,
          id: d._id || d._id,
        }));
        setDepartments(departments);
      } else {
        setDepartments([]);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      setDepartments([]);
    }
    setLoading(false);
  };

  // --- 2. HANDLERS ---

  // Open Modal to VIEW/EDIT existing department
  const handleOpenDepartment = (dept) => {
    setFormData(dept);
    setIsAddingNew(false);
    setIsEditing(false); // Start in View mode
    setShowModal(true);
  };

  // Open Modal to ADD NEW department
  const handleAddNew = () => {
    setFormData(initialFormState);
    setIsAddingNew(true);
    setIsEditing(true); // Start in Edit mode directly
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this file to a server/storage here
      // prioritizing the file URL. for now we use a local preview URL
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAddingNew) {
      // CREATE
      createDepartment(formData)
        .then((result) => {
          if (result.success) {
            const newDept = { ...formData, id: result.data._id };
            setDepartments([...departments, newDept]);
            setShowModal(false);
          }
        })
        .catch((error) => console.error("Error creating department:", error));
    } else {
      // UPDATE
      updateDepartment(formData._id, formData)
        .then((result) => {
          if (result.success) {
            setDepartments(
              departments.map((d) =>
                d._id === formData._id ? { ...d, ...formData } : d,
              ),
            );
            setShowModal(false);
          }
        })
        .catch((error) => console.error("Error updating department:", error));
    }
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete the ${formData.name}?`)) {
      deleteDepartment(formData._id)
        .then((result) => {
          if (result.success) {
            setDepartments(departments.filter((d) => d._id !== formData._id));
            setShowModal(false);
          }
        })
        .catch((error) => console.error("Error deleting department:", error));
    }
  };

  return (
    <div className="space-y-6">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <i className="fas fa-building text-yellow-500"></i>
            Departments
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage church departments and leadership.
          </p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold rounded-lg shadow-md transition-colors"
          onClick={handleAddNew}
        >
          <i className="fas fa-plus mr-2"></i> Add Department
        </button>
      </div>

      {/* --- DEPARTMENT GRID --- */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <div
              key={dept._id}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div
                className="relative h-48 bg-gray-100 overflow-hidden cursor-pointer"
                onClick={() => handleOpenDepartment(dept)}
              >
                {dept.image ? (
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <i className="fas fa-image text-4xl"></i>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>

              <div className="p-5">
                <h5 className="font-bold text-gray-900 text-lg mb-1 truncate">
                  {dept.name}
                </h5>
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                  <i className="fas fa-user-tie text-yellow-500"></i>
                  {dept.hod || "Positions Vacant"}
                </p>

                <button
                  onClick={() => handleOpenDepartment(dept)}
                  className="w-full py-2 rounded-lg border border-yellow-100 text-yellow-700 font-medium hover:bg-yellow-50 transition-colors text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
          {departments.length === 0 && (
            <div className="col-span-full py-16 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <i className="far fa-building text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No Departments Found
              </h3>
              <p className="text-gray-500 mt-1">
                Get started by creating a new department.
              </p>
            </div>
          )}
        </div>
      )}

      {/* --- MODAL POPUP --- */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
              <div>
                <h4 className="text-xl font-bold text-gray-800">
                  {isAddingNew
                    ? "New Department"
                    : isEditing
                      ? "Edit Department"
                      : formData.name}
                </h4>
                {!isAddingNew && !isEditing && (
                  <p className="text-xs text-yellow-800 font-medium bg-yellow-50 inline-block px-2 py-0.5 rounded mt-1">
                    {formData.hod}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!isEditing && !isAddingNew && (
                  <button
                    className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                    onClick={() => setIsEditing(true)}
                    title="Edit"
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                )}
                <button
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto">
              {isEditing ? (
                /* --- EDIT FORM MODE --- */
                <form
                  id="deptForm"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Image Upload */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                        Display Image
                      </label>
                      <div
                        className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-yellow-400 bg-gray-50 flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden group"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {formData.image ? (
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <i className="fas fa-cloud-upload-alt text-2xl text-gray-400 mb-2"></i>
                            <p className="text-xs text-gray-500">
                              Click to upload
                            </p>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <i className="fas fa-camera text-white opacity-0 group-hover:opacity-100 drop-shadow-md"></i>
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>

                    <div className="col-span-2 grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                          Department Name
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
                          Head of Department (HOD)
                        </label>
                        <input
                          type="text"
                          name="hod"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                          value={formData.hod}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                            Established
                          </label>
                          <input
                            type="date"
                            name="date"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                            value={formData.date}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                            Contact Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Description / About
                    </label>
                    <textarea
                      name="body"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm min-h-[150px]"
                      rows="5"
                      value={formData.body}
                      onChange={handleInputChange}
                      placeholder="Write about the department..."
                    ></textarea>
                  </div>
                </form>
              ) : (
                /* --- VIEW DETAILS MODE --- */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-1">
                    <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
                      {formData.image ? (
                        <img
                          src={formData.image}
                          alt={formData.name}
                          className="w-full h-auto object-cover"
                        />
                      ) : (
                        <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-300">
                          <i className="fas fa-image text-5xl"></i>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h6 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Head of Department
                        </h6>
                        <p className="font-semibold text-gray-900">
                          {formData.hod}
                        </p>
                      </div>

                      {(formData.email || formData.date) && (
                        <div className="p-4 border border-gray-100 rounded-lg space-y-3">
                          {formData.email && (
                            <div>
                              <h6 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                Contact
                              </h6>
                              <a
                                href={`mailto:${formData.email}`}
                                className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center gap-2"
                              >
                                <i className="far fa-envelope"></i>{" "}
                                {formData.email}
                              </a>
                            </div>
                          )}
                          {formData.date && (
                            <div>
                              <h6 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                Established
                              </h6>
                              <p className="text-gray-700 text-sm flex items-center gap-2">
                                <i className="far fa-calendar"></i>{" "}
                                {formData.date}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <h5 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                      About {formData.name}
                    </h5>
                    <div className="prose prose-sm text-gray-600">
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {formData.body || "No description provided."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100 shrink-0">
              {/* Delete Button (Only valid if editing existing) */}
              {isEditing && !isAddingNew ? (
                <button
                  type="button"
                  className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-sm font-medium transition-colors"
                  onClick={handleDelete}
                >
                  <i className="fas fa-trash-alt mr-2"></i> Delete Dept
                </button>
              ) : (
                <div></div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>

                {isEditing && (
                  <button
                    type="submit"
                    form="deptForm"
                    className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg shadow-sm text-sm font-bold transition-colors"
                  >
                    <i className="fas fa-save mr-2"></i> Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <DepartmentPage />
    </ProtectedRoute>
  );
}
