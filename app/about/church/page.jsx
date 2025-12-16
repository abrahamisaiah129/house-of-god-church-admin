"use client";
import React, { useEffect, useState } from "react";
import AdminGuard from "../../components/AdminGuard";

export default function AboutChurchAdmin() {
  const [data, setData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/about");
      if (res.ok) {
        const d = await res.json();
        setData(d.church || { title: "", content: "" });
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
    full.church = data;
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
        <h1>About - Church</h1>
        <p className="text-muted">Edit the church about page content.</p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={save}>
            <input
              className="form-control mb-2"
              placeholder="Title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Content"
              value={data.content}
              onChange={(e) => setData({ ...data, content: e.target.value })}
            />
            <button className="btn btn-primary">Save</button>
          </form>
        )}
      </div>
    </AdminGuard>
  );
}
