"use client";
import React, { useEffect, useState } from "react";
import AdminGuard from "../components/AdminGuard";

export default function BannerAdmin() {
  const [banner, setBanner] = useState({
    imageUrl: "",
    title: "",
    subtitle: "",
  });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/banner");
      if (res.ok) setBanner(await res.json());
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    await fetch("/api/banner", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(banner),
    });
    alert("Saved");
  }

  return (
    <AdminGuard>
      <div className="container mt-4">
        <h1>Banner Editor</h1>
        <p className="text-muted">Update homepage banner image and text.</p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleSave}>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Image URL"
                value={banner.imageUrl}
                onChange={(e) =>
                  setBanner({ ...banner, imageUrl: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Title"
                value={banner.title}
                onChange={(e) =>
                  setBanner({ ...banner, title: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Subtitle"
                value={banner.subtitle}
                onChange={(e) =>
                  setBanner({ ...banner, subtitle: e.target.value })
                }
              />
            </div>
            <button className="btn btn-primary">Save Banner</button>
          </form>
        )}
      </div>
    </AdminGuard>
  );
}
