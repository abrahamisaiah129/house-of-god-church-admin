"use client";
import { useState, useEffect } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { getMedia, createMedia, deleteMedia } from "@/lib/api";

function MediaManager() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mediaUrl: "",
    type: "image",
    category: "General",
  });

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await getMedia();
      if (res.success) setMediaList(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createMedia(formData);
      if (res.success) {
        setFormData({
          title: "",
          description: "",
          mediaUrl: "",
          type: "image",
          category: "General",
        });
        fetchMedia();
      }
    } catch (error) {
      alert("Failed to add media");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteMedia(id);
        fetchMedia();
      } catch (error) {
        alert("Failed to delete");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Media Manager</h2>
          <p className="text-gray-500 text-sm mt-1">
            Upload and manage images, videos, and audio
          </p>
        </div>
      </div>

      {/* Create Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-yellow-50/50 border-b border-yellow-100 px-6 py-4">
          <h5 className="font-semibold text-yellow-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
              <i className="fas fa-cloud-upload-alt text-sm"></i>
            </div>
            Add New Media
          </h5>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                  placeholder="e.g. Sunday Service Highlights"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Type
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm bg-white"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Category
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm bg-white"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="General">General</option>
                    <option value="Events">Events</option>
                    <option value="Services">Services</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Media URL
              </label>
              <div className="relative">
                <i className="fas fa-link absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                  placeholder="https://..."
                  value={formData.mediaUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, mediaUrl: e.target.value })
                  }
                  required
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-1">
                Direct link to the media file (Cloudinary, S3, etc)
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
                placeholder="Optional description..."
                rows="2"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg shadow-lg shadow-yellow-500/30 transition-all transform hover:-translate-y-0.5"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Media
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Grid List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h5 className="font-semibold text-gray-800 mb-6">Media Library</h5>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {mediaList.map((item) => (
              <div
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                key={item._id}
              >
                <div className="bg-gray-100 relative h-48 flex items-center justify-center overflow-hidden">
                  {item.type === "image" ? (
                    <img
                      src={item.mediaUrl}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={item.title}
                    />
                  ) : item.type === "video" ? (
                    <video
                      src={item.mediaUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full px-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-music text-2xl"></i>
                      </div>
                      <audio controls src={item.mediaUrl} className="w-full" />
                    </div>
                  )}

                  {/* Overlay Action */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm capitalize">
                      {item.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h6
                    className="font-semibold text-gray-900 truncate mb-1"
                    title={item.title}
                  >
                    {item.title}
                  </h6>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded-full font-medium">
                      {item.category}
                    </p>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {mediaList.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-400">
                <i className="far fa-images text-4xl mb-3 opacity-50"></i>
                <p>No media found locally for this demo.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <MediaManager />
    </ProtectedRoute>
  );
}