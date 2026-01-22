"use client";
import React, { useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";

function WelcomeVideoManager() {
  // --- 1. STATE MANAGEMENT ---

  // Initial Data
  const [data, setData] = useState({
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", // Dummy video
    text1: "Welcome to House of God Church!",
    text2: "Join us this Sunday at 9:00 AM.",
    text3: "Jesus is Lord over all.",
  });

  // Form State
  const [formData, setFormData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  // --- 2. HANDLERS ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setFormData({ ...formData, videoSrc: videoUrl });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setData(formData);
    setIsEditing(false);
    // alert("Welcome Section Updated Successfully!");
  };

  const handleCancel = () => {
    setFormData(data);
    setIsEditing(false);
  };

  // Determine which data to show in the preview (Live vs Edit)
  const previewData = isEditing ? formData : data;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <i className="fas fa-video text-yellow-500"></i>
          Welcome Video Manager
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Update the welcome video and scrolling marquee text shown on the
          homepage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- LEFT COLUMN: EDIT FORM --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
          <div className="bg-linear-to-r from-yellow-50 to-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h5 className="font-semibold text-gray-800 flex items-center gap-2">
              {isEditing ? (
                <i className="fas fa-edit text-orange-500"></i>
              ) : (
                <i className="fas fa-cog text-gray-400"></i>
              )}
              {isEditing ? "Editing Content" : "Settings"}
            </h5>
            {!isEditing && (
              <button
                className="text-sm font-medium text-yellow-600 hover:bg-yellow-50 px-3 py-1.5 rounded-lg transition-colors"
                onClick={() => setIsEditing(true)}
              >
                Edit Content
              </button>
            )}
          </div>

          <div className="p-6">
            <fieldset
              disabled={!isEditing}
              className={!isEditing ? "opacity-60" : ""}
            >
              <form onSubmit={handleSave} className="space-y-6">
                {/* Video Upload */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Video Source
                  </label>
                  <div
                    className={`relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${isEditing ? "hover:border-yellow-400 cursor-pointer bg-gray-50" : "bg-gray-100"}`}
                  >
                    <i className="fas fa-file-video text-2xl text-gray-400 mb-2"></i>
                    <p className="text-xs text-gray-500">
                      Supported formats: MP4, WebM
                    </p>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h6 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Marquee Texts
                  </h6>

                  <div className="space-y-4">
                    {/* Text 1 */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Text 1 (Main Greeting)
                      </label>
                      <input
                        type="text"
                        name="text1"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm disabled:bg-gray-100"
                        value={formData.text1}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Text 2 */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Text 2 (Announcement)
                      </label>
                      <input
                        type="text"
                        name="text2"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm disabled:bg-gray-100"
                        value={formData.text2}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Text 3 */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Text 3 (Scripture/Quote)
                      </label>
                      <input
                        type="text"
                        name="text3"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm disabled:bg-gray-100"
                        value={formData.text3}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      className="flex-1 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-bold shadow-sm transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </fieldset>
          </div>
        </div>

        {/* --- RIGHT COLUMN: LIVE PREVIEW --- */}
        <div>
          <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <i className="fas fa-eye"></i> Website Preview
          </h5>

          {/* Preview Container simulating the frontend */}
          <div className="rounded-xl overflow-hidden shadow-2xl bg-black relative group">
            <div className="absolute top-0 left-0 right-0 bg-black/50 p-2 z-10 text-white text-[10px] font-mono flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span>SIMULATION</span>
              <span className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500"></div> LIVE
              </span>
            </div>

            {/* 1. THE VIDEO AREA */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                key={previewData.videoSrc}
                src={previewData.videoSrc}
                controls
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              ></video>
            </div>

            {/* 2. THE MARQUEE BAR */}
            <div className="bg-gray-900 py-3 overflow-hidden border-t border-gray-800">
              <div className="animate-marquee whitespace-nowrap flex items-center text-sm">
                <span className="mx-6 text-yellow-400 font-bold uppercase flex items-center gap-2">
                  <i className="fas fa-bullhorn"></i> {previewData.text1}
                </span>
                <span className="mx-6 text-white font-medium">
                  {previewData.text2}
                </span>
                <span className="mx-6 text-gray-400 italic">
                  "{previewData.text3}"
                </span>
                {/* Duplicates for loop */}
                <span className="mx-6 text-yellow-400 font-bold uppercase flex items-center gap-2">
                  <i className="fas fa-bullhorn"></i> {previewData.text1}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
              This preview simulates how the welcome section appears on the
              homepage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <WelcomeVideoManager />
    </ProtectedRoute>
  );
}
