"use client";
import React, { useState, useEffect } from "react";
import {
  getAboutChurch,
  updateAboutChurch,
  getAboutPastor,
  updateAboutPastor,
} from "@/lib/api";
import { uploadToCloudinary } from "@/lib/cloudinary";
import ProtectedRoute from "@/app/components/ProtectedRoute";

function AboutPage() {
  const [data, setData] = useState({
    church: {
      maintitle: "",
      subtitle: "",
      content: "",
      image: "",
    },
    pastor: {
      maintitle: "",
      subtitle: "",
      content: "",
      image: "",
    },
  });

  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch data on mount
  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    setLoading(true);
    setError("");

    try {
      const churchResult = await getAboutChurch();
      const pastorResult = await getAboutPastor();

      // The API interceptor returns the data object directly on success
      // Check if we got a valid object (checking for _id or content fields)

      const churchData =
        churchResult && (churchResult._id || churchResult.maintitle)
          ? churchResult
          : churchResult.data || data.church;
      const pastorData =
        pastorResult && (pastorResult._id || pastorResult.maintitle)
          ? pastorResult
          : pastorResult.data || data.pastor;

      setData({
        church: churchData,
        pastor: pastorData,
      });
    } catch (err) {
      console.error("Failed to load about data", err);
      setError("Failed to load about data, using defaults or cache.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (section) => {
    setEditingSection(section);
    setFormData(data[section] || {});
  };

  const handleCancel = () => {
    setEditingSection(null);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const result = await uploadToCloudinary(file, "hog-church/about");
      if (result.success) {
        setFormData((prev) => ({ ...prev, image: result.url }));
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload error.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      let result;
      if (editingSection === "church") {
        result = await updateAboutChurch(formData);
      } else if (editingSection === "pastor") {
        result = await updateAboutPastor(formData);
      }

      // The API interceptor might return the data object directly on success
      // or the full response object. We need to handle both cases.
      const isSuccess =
        result.success || (result && !result.error && result._id);

      if (isSuccess) {
        // Use result directly if it doesn't have a .data property, otherwise use .data
        const updatedData = result.data || result;
        setData({
          ...data,
          [editingSection]: updatedData,
        });
        setEditingSection(null);
        // alert("Changes saved successfully!");
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (err) {
      setError("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* PAGE HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <i className="fas fa-info-circle text-yellow-500"></i>
          About Section Management
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage content for the About Church and Pastor sections.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-200">
          <i className="fas fa-exclamation-circle mr-2"></i> {error}
        </div>
      )}

      {/* CHURCH SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-linear-to-r from-yellow-50 to-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-yellow-600">
              <i className="fas fa-church"></i>
            </div>
            <div>
              <h5 className="font-bold text-gray-800">Church Information</h5>
              <p className="text-xs text-gray-500">
                History and mission statement
              </p>
            </div>
          </div>
          {editingSection !== "church" && (
            <button
              onClick={() => handleEditClick("church")}
              className="text-gray-500 hover:text-yellow-600 hover:bg-white p-2 rounded-lg transition-all"
            >
              <i className="fas fa-pencil-alt text-lg"></i>
            </button>
          )}
        </div>

        <div className="p-6">
          {editingSection === "church" ? (
            /* EDIT FORM */
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                    name="maintitle"
                    value={formData.maintitle || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                    name="subtitle"
                    value={formData.subtitle || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm min-h-[150px]"
                  name="content"
                  value={formData.content || ""}
                  onChange={handleInputChange}
                  rows="5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Cover Image
                </label>
                <div className="flex items-center gap-6">
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-32 h-20 object-cover rounded-lg shadow-sm border border-gray-200"
                    />
                  )}
                  <label
                    className={`flex items-center gap-2 cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <i className="fas fa-cloud-upload-alt"></i>{" "}
                    {isUploading ? "Uploading..." : "Upload New Image"}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2"
                  onClick={handleSave}
                  disabled={saving || isUploading}
                >
                  {(saving || isUploading) && (
                    <i className="fas fa-spinner animate-spin"></i>
                  )}
                  {isUploading
                    ? "Uploading..."
                    : saving
                      ? "Saving..."
                      : "Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            /* VIEW MODE */
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 shrink-0">
                {data.church.image ? (
                  <img
                    src={data.church.image}
                    alt="Church"
                    className="w-full h-auto rounded-xl shadow-md object-cover"
                  />
                ) : (
                  <div className="w-full aspect-video bg-gray-100 rounded-xl flex items-center justify-center text-gray-300">
                    <i className="fas fa-image text-4xl"></i>
                  </div>
                )}
              </div>
              <div className="md:w-2/3 space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {data.church.maintitle}
                  </h4>
                  <h6 className="text-yellow-600 font-medium">
                    {data.church.subtitle}
                  </h6>
                </div>
                <div className="prose prose-sm text-gray-600">
                  <p className="whitespace-pre-wrap">{data.church.content}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PASTOR SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-linear-to-r from-blue-50 to-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-blue-600">
              <i className="fas fa-user-tie"></i>
            </div>
            <div>
              <h5 className="font-bold text-gray-800">Pastor Information</h5>
              <p className="text-xs text-gray-500">
                Leadership profile and message
              </p>
            </div>
          </div>
          {editingSection !== "pastor" && (
            <button
              onClick={() => handleEditClick("pastor")}
              className="text-gray-500 hover:text-blue-600 hover:bg-white p-2 rounded-lg transition-all"
            >
              <i className="fas fa-pencil-alt text-lg"></i>
            </button>
          )}
        </div>
        <div className="p-6">
          {editingSection === "pastor" ? (
            /* EDIT FORM */
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Title / Role
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                    name="maintitle"
                    value={formData.maintitle || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                    name="subtitle"
                    value={formData.subtitle || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Bio / Message
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm min-h-[150px]"
                  name="content"
                  value={formData.content || ""}
                  onChange={handleInputChange}
                  rows="5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Profile Photo
                </label>
                <div className="flex items-center gap-6">
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-full shadow-sm border border-gray-200"
                    />
                  )}
                  <label className={`flex items-center gap-2 cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <i className="fas fa-cloud-upload-alt"></i> {isUploading ? "Uploading..." : "Upload New Photo"}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
                  onClick={handleSave}
                  disabled={saving || isUploading}
                >
                  {(saving || isUploading) && (
                    <i className="fas fa-spinner animate-spin"></i>
                  )}
                  {isUploading
                    ? "Uploading..."
                    : saving
                      ? "Saving..."
                      : "Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            /* VIEW MODE */
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="shrink-0">
                {data.pastor.image ? (
                  <img
                    src={data.pastor.image}
                    alt="Pastor"
                    className="w-48 h-48 rounded-full shadow-lg object-cover border-4 border-white"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center text-gray-300">
                    <i className="fas fa-user text-6xl"></i>
                  </div>
                )}
              </div>
              <div className="flex-1 text-center md:text-left space-y-3">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {data.pastor.subtitle}
                  </h4>
                  <h6 className="text-blue-600 font-medium uppercase tracking-wide text-xs">
                    {data.pastor.maintitle}
                  </h6>
                </div>
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-50 relative">
                  <i className="fas fa-quote-left absolute top-4 left-4 text-blue-200 text-2xl"></i>
                  <p className="text-gray-600 italic relative z-10">
                    {data.pastor.content}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <AboutPage />
    </ProtectedRoute>
  );
}
