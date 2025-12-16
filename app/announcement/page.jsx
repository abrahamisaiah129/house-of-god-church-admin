"use client";
import React, { useEffect, useState } from "react";
import AdminGuard from "../components/AdminGuard";

export default function AnnouncementAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", date: "" });

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/announcements");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      if (!res.ok) throw new Error("Create failed");
      setForm({ title: "", content: "", date: "" });
      await load();
    } catch (err) {
      setError(String(err));
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this announcement?")) return;
    await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminGuard>
      <div className="container mt-4">
        <h1>Announcements</h1>
        <p className="text-muted">Add, edit, and remove announcements here.</p>

        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleCreate} className="mb-3">
              <div className="mb-2">
                <input
                  className="form-control"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  placeholder="Content"
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  type="datetime-local"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>

          <div className="col-md-6">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-danger">{error}</div>
            ) : (
              <ul className="list-group">
                {items.map((it) => (
                  <li
                    key={it.id}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div>
                      <div className="fw-bold">{it.title}</div>
                      <div className="small text-muted">{it.content}</div>
                      <div className="small text-muted">{it.date}</div>
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
