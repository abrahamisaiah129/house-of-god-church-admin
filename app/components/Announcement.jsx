"use client";
import React, { useState, useEffect } from "react";
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "@/lib/api";

export default function AnnouncementManager() {
  // --- 1. STATE MANAGEMENT ---

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    date: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch announcements from API on mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const result = await getAnnouncements();
      if (result.success) {
        const announcements = (result.data || []).map((a) => ({
          ...a,
          id: a._id || a.id,
        }));
        setAnnouncements(announcements);
      } else {
        setAnnouncements([]);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setAnnouncements([]);
    }
    setLoading(false);
  };

  // --- 2. HANDLERS ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine status (simple logic: if date is today or future, it's active)
    const announceDate = new Date(formData.date);
    const now = new Date();
    // Reset time to compare only dates
    now.setHours(0, 0, 0, 0);
    announceDate.setHours(0, 0, 0, 0);

    const status = announceDate >= now ? "active" : "past";

    if (isEditing) {
      // UPDATE EXISTING
      const updatedAnnouncement = { ...formData, status };
      updateAnnouncement(formData.id, updatedAnnouncement)
        .then((result) => {
          if (result.success) {
            setAnnouncements(
              announcements.map((ann) =>
                ann.id === formData.id
                  ? { ...ann, ...updatedAnnouncement }
                  : ann
              )
            );
            setIsEditing(false);
            resetForm();
          }
        })
        .catch((error) => console.error("Error updating announcement:", error));
    } else {
      // CREATE NEW
      const newAnnouncement = {
        title: formData.title,
        date: formData.date,
        description: formData.description,
        status,
      };
      createAnnouncement(newAnnouncement)
        .then((result) => {
          if (result.success) {
            setAnnouncements([
              { ...newAnnouncement, id: result.data._id },
              ...announcements,
            ]);
            resetForm();
          }
        })
        .catch((error) => console.error("Error creating announcement:", error));
    }
  };

  const handleEdit = (ann) => {
    setFormData({
      id: ann.id,
      title: ann.title,
      date: ann.date,
      description: ann.description,
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      deleteAnnouncement(id)
        .then((result) => {
          if (result.success) {
            setAnnouncements(announcements.filter((ann) => ann.id !== id));
            if (isEditing && formData.id === id) {
              resetForm();
            }
          }
        })
        .catch((error) => console.error("Error deleting announcement:", error));
    }
  };

  const resetForm = () => {
    setFormData({ id: null, title: "", date: "", description: "" });
    setIsEditing(false);
  };

  // Sort by Date (Newest first)
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="row">
      {/* --- LEFT COLUMN: INPUT FORM --- */}
      <div className="col-lg-4 mb-4">
        <div className="card shadow-sm border-top border-3 border-warning">
          <div className="card-header bg-white">
            <h5 className="mb-0 text-warning">
              {isEditing ? "✏️ Edit Announcement" : "📢 New Announcement"}
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-3">
                <label className="form-label small fw-bold">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Special Offering"
                  required
                />
              </div>

              {/* Date */}
              <div className="mb-3">
                <label className="form-label small fw-bold">Date</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Description (Extra Field) */}
              <div className="mb-3">
                <label className="form-label small fw-bold">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter detailed announcement here..."
                  required
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className={`btn ${
                    isEditing ? "btn-primary" : "btn-warning text-dark"
                  }`}
                >
                  {isEditing ? "Update Announcement" : "Post Announcement"}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: LIST VIEW (CRUD) --- */}
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-header bg-light d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-dark">Recent Announcements</h5>
            <span className="badge bg-secondary">
              {sortedAnnouncements.length} Posts
            </span>
          </div>

          <div className="card-body p-0">
            {sortedAnnouncements.length === 0 ? (
              <div className="text-center py-5 text-muted">
                No announcements yet.
              </div>
            ) : (
              <div className="list-group list-group-flush">
                {sortedAnnouncements.map((ann) => {
                  const isPast =
                    new Date(ann.date) < new Date().setHours(0, 0, 0, 0);

                  return (
                    <div key={ann.id} className="list-group-item p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        {/* Header Info */}
                        <div>
                          <h6
                            className={`mb-0 fw-bold ${
                              isPast ? "text-muted" : "text-dark"
                            }`}
                          >
                            {ann.title}
                          </h6>
                          <small className="text-muted">
                            <i className="bi bi-calendar-event me-1"></i>
                            {new Date(ann.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </small>
                          {isPast ? (
                            <span className="badge bg-light text-muted border ms-2">
                              Expired
                            </span>
                          ) : (
                            <span className="badge bg-warning text-dark ms-2">
                              Active
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(ann)}
                            title="Edit"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(ann.id)}
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>

                      {/* Description Content */}
                      <div
                        className="p-2 bg-light border rounded small text-secondary"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {ann.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
