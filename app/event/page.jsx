"use client";
import React, { useEffect, useState } from "react";
import AdminGuard from "../components/AdminGuard";

export default function EventAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    location: "",
  });

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/event");
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
    await fetch("/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", description: "", start: "", end: "", location: "" });
    await load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete event?")) return;
    await fetch(`/api/event/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminGuard>
      <div className="container mt-4">
        <h1>Events</h1>
        <p className="text-muted">Create and manage events.</p>
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
              <textarea
                className="form-control mb-2"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <input
                className="form-control mb-2"
                type="datetime-local"
                value={form.start}
                onChange={(e) => setForm({ ...form, start: e.target.value })}
              />
              <input
                className="form-control mb-2"
                type="datetime-local"
                value={form.end}
                onChange={(e) => setForm({ ...form, end: e.target.value })}
              />
              <input
                className="form-control mb-2"
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <button className="btn btn-primary">Create Event</button>
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
                      <div className="small text-muted">{it.description}</div>
                      <div className="small text-muted">
                        {it.start} → {it.end}
                      </div>
                      <div className="small text-muted">{it.location}</div>
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
