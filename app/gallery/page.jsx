"use client";
import React, { useEffect, useState } from "react";
import AdminGuard from "../components/AdminGuard";

export default function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", url: "", type: "image" });

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    await fetch("/api/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", url: "", type: "image" });
    await load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete media item?")) return;
    await fetch(`/api/media/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminGuard>
      <div className="container mt-4">
        <h1>Media / Gallery</h1>
        <p className="text-muted">Manage uploaded media items.</p>

        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleCreate} className="mb-3">
              <input
                className="form-control mb-2"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                className="form-control mb-2"
                placeholder="URL"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                required
              />
              <select
                className="form-select mb-2"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>
              <button className="btn btn-primary">Add Media</button>
            </form>
          </div>

          <div className="col-md-6">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ul className="list-group">
                {items.map((it) => (
                  <li
                    key={it.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div className="fw-bold">{it.title}</div>
                      <div className="small text-muted">{it.url}</div>
                    </div>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(it.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
