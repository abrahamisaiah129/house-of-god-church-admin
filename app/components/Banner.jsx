"use client";
import React, { useState, useEffect } from "react";
import {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from "@/lib/api";

export default function BannerManager() {
  // --- STATE ---
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    subtitle: "",
    description: "",
    serviceTime: "",
    image: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch slides from API on mount
  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const result = await getHeroSlides();
      if (result.success) {
        const slides = (result.data || []).map((s) => ({
          ...s,
          id: s._id || s.id,
        }));
        setSlides(slides);
      } else {
        setSlides([]);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
      setSlides([]);
    }
    setLoading(false);
  };

  // --- HANDLERS ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // UPDATE EXISTING
      updateHeroSlide(formData.id, formData)
        .then((result) => {
          if (result.success) {
            setSlides(
              slides.map((slide) =>
                slide.id === formData.id ? { ...slide, ...formData } : slide
              )
            );
            setIsEditing(false);
            resetForm();
          }
        })
        .catch((error) => console.error("Error updating slide:", error));
    } else {
      // CREATE NEW
      if (slides.length >= 3) {
        alert("Maximum of 3 slides allowed. Please delete one to add another.");
        return;
      }
      createHeroSlide(formData)
        .then((result) => {
          if (result.success) {
            setSlides([...slides, { ...formData, id: result.data._id }]);
            resetForm();
          }
        })
        .catch((error) => console.error("Error creating slide:", error));
    }
  };

  const handleEdit = (slide) => {
    setFormData(slide);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this slide?")) {
      deleteHeroSlide(id)
        .then((result) => {
          if (result.success) {
            setSlides(slides.filter((slide) => slide.id !== id));
            // If we deleted the one we were editing, reset form
            if (isEditing && formData.id === id) {
              resetForm();
            }
          }
        })
        .catch((error) => console.error("Error deleting slide:", error));
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      title: "",
      subtitle: "",
      description: "",
      serviceTime: "",
      image: null,
    });
    setIsEditing(false);
  };

  return (
    <div className="row">
      {/* --- LEFT COLUMN: FORM --- */}
      <div className="col-lg-5 mb-4">
        <div className="card shadow-sm border-top border-3 border-primary">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-primary">
              {isEditing ? "✏️ Edit Slide" : "➕ Add New Slide"}
            </h5>
            <span className="badge bg-secondary">{slides.length} / 3 Used</span>
          </div>
          <div className="card-body">
            {/* Warning if limit reached */}
            {!isEditing && slides.length >= 3 && (
              <div className="alert alert-warning py-2 small">
                <i className="bi bi-exclamation-triangle me-1"></i>
                Max slides reached. Delete one to add new.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label small fw-bold">Banner Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required={!formData.image} // Required only if no image set
                  disabled={!isEditing && slides.length >= 3}
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ height: "60px" }}
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="mb-2">
                <label className="form-label small fw-bold">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Welcome Home"
                  required
                  disabled={!isEditing && slides.length >= 3}
                />
              </div>

              {/* Subtitle */}
              <div className="mb-2">
                <label className="form-label small fw-bold">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  className="form-control"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Experience God"
                  required
                  disabled={!isEditing && slides.length >= 3}
                />
              </div>

              {/* Service Time */}
              <div className="mb-2">
                <label className="form-label small fw-bold">Service Time</label>
                <input
                  type="text"
                  name="serviceTime"
                  className="form-control"
                  value={formData.serviceTime}
                  onChange={handleInputChange}
                  placeholder="e.g. Sundays 9am"
                  required
                  disabled={!isEditing && slides.length >= 3}
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label small fw-bold">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="2"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={!isEditing && slides.length >= 3}
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className={`btn w-100 ${
                    isEditing ? "btn-warning" : "btn-primary"
                  }`}
                  disabled={!isEditing && slides.length >= 3}
                >
                  {isEditing ? "Update Slide" : "Add Slide"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: PREVIEW LIST (CRUD VIEW) --- */}
      <div className="col-lg-7">
        <h5 className="mb-3 text-muted">Current Slides Preview</h5>

        {slides.length === 0 ? (
          <div className="text-center py-5 bg-light rounded border border-dashed">
            <p className="text-muted mb-0">No slides added yet.</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {slides.map((slide, index) => (
              <div key={slide.id} className="card shadow-sm border-0">
                <div className="row g-0">
                  {/* Image Preview Side */}
                  <div className="col-md-4 position-relative">
                    <img
                      src={slide.image}
                      className="img-fluid rounded-start h-100 object-fit-cover"
                      alt="Slide"
                      style={{ minHeight: "140px" }}
                    />
                    <div className="position-absolute top-0 start-0 bg-dark text-white px-2 py-1 small opacity-75 rounded-bottom-end">
                      Slide {index + 1}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="col-md-8">
                    <div className="card-body py-2">
                      <div className="d-flex justify-content-between align-items-start">
                        <h6 className="card-title fw-bold text-primary mb-1">
                          {slide.title}
                        </h6>
                        <small className="badge bg-info text-dark">
                          {slide.serviceTime}
                        </small>
                      </div>

                      <p className="card-text text-muted small mb-1 fst-italic">
                        {slide.subtitle}
                      </p>
                      <p className="card-text small text-secondary mb-2 text-truncate">
                        {slide.description}
                      </p>

                      <div className="d-flex justify-content-end gap-2 mt-auto">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(slide)}
                        >
                          <i className="bi bi-pencil-square"></i> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(slide.id)}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
