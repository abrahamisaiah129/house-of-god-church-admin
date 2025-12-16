"use client";
import React, { useEffect, useState } from "react";
import AdminGuard from "../../components/AdminGuard";

export default function AboutPastorAdmin() {
  const [data, setData] = useState({ name: "", bio: "" });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/about");
      if (res.ok) {
        const d = await res.json();
        setData(d.pastor || { name: "", bio: "" });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function save(e) {
    e.preventDefault();
    const full = await (await fetch("/api/about")).json();
    full.pastor = data;
    await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(full),
    });
    alert("Saved");
  }

  return (
    <AdminGuard>
      <div className="container mt-4">
        <h1>About - Pastor</h1>
        <p className="text-muted">Edit the pastor page content.</p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={save}>
            <input
              className="form-control mb-2"
              placeholder="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Bio"
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
            />
            <button className="btn btn-primary">Save</button>
          </form>
        )}
      </div>
    </AdminGuard>
  );
}
