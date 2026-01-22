"use client";
import React, { useState } from "react";

export default function BookstoreManager() {
  // --- 1. STATE MANAGEMENT ---

  // Fixed Initial Data for 2 Cards
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Card 1 (Featured Book)",
      title: "The Power of Prayer",
      image: "https://via.placeholder.com/300x400?text=Book+Cover+1",
      imageDesc: "Front cover of the prayer book",
      para1:
        "Discover the secrets of effective prayer in this life-changing book.",
      para2: "Available now at the church office for a discounted price.",
    },
    {
      id: 2,
      name: "Card 2 (Monthly Devotional)",
      title: "Daily Manna 2025",
      image: "https://via.placeholder.com/300x400?text=Devotional+Cover",
      imageDesc: "Hardcover edition of Daily Manna",
      para1:
        "Start your day with a word from God. This devotional guides you through the year.",
      para2: "Includes daily bible reading plan and prayer points.",
    },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    image: "",
    imageDesc: "",
    para1: "",
    para2: "",
  });

  const [activeCardId, setActiveCardId] = useState(null); // Track which card is being edited

  // --- 2. HANDLERS ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create local preview URL
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleEditClick = (card) => {
    setActiveCardId(card.id);
    setFormData({
      id: card.id,
      title: card.title,
      image: card.image,
      imageDesc: card.imageDesc,
      para1: card.para1,
      para2: card.para2,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activeCardId) return;

    // Update the specific card in the array
    setCards(
      cards.map((card) =>
        card.id === activeCardId ? { ...card, ...formData } : card
      )
    );

    alert("Card Updated Successfully!");
    // Optional: Clear form or keep it open. I'll keep it open for easy re-edits.
  };

  return (
    <div className="row">
      {/* --- LEFT COLUMN: EDIT FORM --- */}
      <div className="col-lg-5 mb-4">
        <div
          className={`card shadow-sm border-top border-3 ${
            activeCardId ? "border-primary" : "border-secondary"
          }`}
        >
          <div className="card-header bg-white">
            <h5 className="mb-0">
              {activeCardId
                ? `✏️ Editing: ${
                    cards.find((c) => c.id === activeCardId)?.name
                  }`
                : "👈 Select a Card to Edit"}
            </h5>
          </div>
          <div className="card-body">
            {!activeCardId ? (
              <div className="text-center py-5 text-muted">
                <i className="bi bi-arrow-right-circle fs-1 mb-2"></i>
                <p>Please click "Edit" on one of the cards on the right.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Image Upload */}
                <div className="mb-3">
                  <label className="form-label small fw-bold">
                    Book Cover Image
                  </label>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{
                        width: "80px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* Image Description */}
                <div className="mb-3">
                  <label className="form-label small fw-bold">
                    Image Description (Alt Text)
                  </label>
                  <input
                    type="text"
                    name="imageDesc"
                    className="form-control"
                    value={formData.imageDesc}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Title */}
                <div className="mb-3">
                  <label className="form-label small fw-bold">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control fw-bold"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Paragraph 1 */}
                <div className="mb-3">
                  <label className="form-label small fw-bold">
                    Paragraph 1
                  </label>
                  <textarea
                    name="para1"
                    className="form-control"
                    rows="3"
                    value={formData.para1}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                {/* Paragraph 2 */}
                <div className="mb-4">
                  <label className="form-label small fw-bold">
                    Paragraph 2
                  </label>
                  <textarea
                    name="para2"
                    className="form-control"
                    rows="3"
                    value={formData.para2}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                {/* Save Button */}
                <button type="submit" className="btn btn-primary w-100">
                  <i className="bi bi-save me-2"></i> Save Changes
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: CARD PREVIEWS --- */}
      <div className="col-lg-7">
        <h5 className="mb-3 text-muted">Bookstore Preview</h5>

        <div className="row g-3">
          {cards.map((card) => (
            <div key={card.id} className="col-md-6">
              <div
                className={`card h-100 shadow-sm ${
                  activeCardId === card.id
                    ? "ring-2 ring-primary border-primary"
                    : ""
                }`}
              >
                {/* Header Badge */}
                <div className="card-header d-flex justify-content-between align-items-center bg-light">
                  <span className="badge bg-dark">{card.name}</span>
                  <button
                    className={`btn btn-sm ${
                      activeCardId === card.id
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => handleEditClick(card)}
                  >
                    {activeCardId === card.id ? "Editing..." : "Edit This"}
                  </button>
                </div>

                {/* Card Content Preview */}
                <div className="card-body">
                  <div className="text-center mb-3">
                    <img
                      src={card.image}
                      alt={card.imageDesc}
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: "150px" }}
                    />
                    <div
                      className="small text-muted mt-1 fst-italic"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {card.imageDesc}
                    </div>
                  </div>

                  <h5 className="card-title fw-bold text-center">
                    {card.title}
                  </h5>
                  <hr />
                  <p className="card-text small text-secondary">{card.para1}</p>
                  <p className="card-text small text-secondary">{card.para2}</p>
                </div>

                {/* Footer Status */}
                <div className="card-footer bg-white text-center">
                  <small className="text-muted">
                    {activeCardId === card.id
                      ? "Drafting changes..."
                      : "Live Preview"}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
