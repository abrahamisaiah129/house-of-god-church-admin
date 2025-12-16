"use client";
import React, { useEffect, useState } from "react";
import AdminGuard from "../components/AdminGuard";

export default function HeroAdmin() {
  const [hero, setHero] = useState({ slides: [] });
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    image: "",
    title: "",
    subtitle: "",
    serviceTime: "",
  });

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/hero");
      if (res.ok) setHero(await res.json());
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function addSlide(e) {
    e.preventDefault();
    const slides = hero.slides || [];
    const id = Date.now().toString();
    slides.push({ id, ...form });
    await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slides }),
    });
    setForm({ image: "", title: "", subtitle: "", serviceTime: "" });
    await load();
  }
  async function deleteSlide(id) {
    if (!confirm("Delete slide?")) return;
    const slides = (hero.slides || []).filter((s) => s.id !== id);
    await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slides }),
    });
    await load();
  }

  return (
    <AdminGuard>
      <div className="container mt-4">
        <h1>Hero Slides</h1>
        <p className="text-muted">Manage hero carousel slides.</p>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={addSlide}>
              <input
                className="form-control mb-2"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
              />
              <input
                className="form-control mb-2"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                className="form-control mb-2"
                placeholder="Subtitle"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              />
              <input
                className="form-control mb-2"
                placeholder="Service Time"
                value={form.serviceTime}
                onChange={(e) =>
                  setForm({ ...form, serviceTime: e.target.value })
                }
              />
              <button className="btn btn-primary">Add Slide</button>
            </form>
          </div>
          <div className="col-md-6">
            {(hero.slides || []).length === 0 ? (
              <div>No slides</div>
            ) : (
              <ul className="list-group">
                {hero.slides.map((s) => (
                  <li
                    key={s.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div className="fw-bold">{s.title}</div>
                      <div className="small text-muted">{s.subtitle}</div>
                      <div className="small text-muted">{s.serviceTime}</div>
                    </div>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteSlide(s.id)}
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
