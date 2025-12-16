"use client";
import React, { useEffect, useState } from "react";
import AdminGuard from "../components/AdminGuard";

export default function SermonsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    pastor: "",
    date: "",
    thumbnail: "",
    mediaId: "",
  });

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/sermons");
      setItems(await res.json());
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    await fetch("/api/sermons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", pastor: "", date: "", thumbnail: "", mediaId: "" });
    await load();
  }
  async function handleDelete(id) {
    if (!confirm("Delete sermon?")) return;
    await fetch(`/api/sermons/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminGuard>
      <div className="container mt-4">
        <h1>Sermons</h1>
        <p className="text-muted">Manage sermon posts and thumbnails.</p>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleCreate}>
              <input
                className="form-control mb-2"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                className="form-control mb-2"
                placeholder="Pastor"
                value={form.pastor}
                onChange={(e) => setForm({ ...form, pastor: e.target.value })}
              />
              <input
                className="form-control mb-2"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <input
                className="form-control mb-2"
                placeholder="Thumbnail URL"
                value={form.thumbnail}
                onChange={(e) =>
                  setForm({ ...form, thumbnail: e.target.value })
                }
              />
              <input
                className="form-control mb-2"
                placeholder="Media ID"
                value={form.mediaId}
                onChange={(e) => setForm({ ...form, mediaId: e.target.value })}
              />
              <button className="btn btn-primary">Create Sermon</button>
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
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div>
                      <div className="fw-bold">{it.title}</div>
                      <div className="small text-muted">
                        {it.pastor} — {it.date}
                      </div>
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
