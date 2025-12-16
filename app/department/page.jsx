"use client";
import React, { useEffect, useState } from "react";
import AdminGuard from "../components/AdminGuard";

export default function DepartmentAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "", contact: "" });

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/department");
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
    await fetch("/api/department", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", description: "", contact: "" });
    await load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete department?")) return;
    await fetch(`/api/department/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminGuard>
      <div className="container mt-4">
        <h1>Departments</h1>
        <p className="text-muted">Manage church departments and content.</p>

        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleCreate}>
              <input
                className="form-control mb-2"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className="form-control mb-2"
                placeholder="Contact"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
              />
              <textarea
                className="form-control mb-2"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <button className="btn btn-primary">Create Department</button>
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
                      <div className="fw-bold">{it.name}</div>
                      <div className="small text-muted">{it.description}</div>
                      <div className="small text-muted">{it.contact}</div>
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
