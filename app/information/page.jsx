"use client";
import React, { useEffect, useState } from "react";
import AdminGuard from "../components/AdminGuard";

export default function InformationAdmin() {
  const [info, setInfo] = useState({
    about: "",
    contact: { email: "", phone: "" },
  });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/information");
      if (res.ok) setInfo(await res.json());
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
    await fetch("/api/information", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });
    alert("Saved");
  }

  return (
    <AdminGuard>
      <div className="container mt-4">
        <h1>Information</h1>
        <p className="text-muted">Edit site information and contact details.</p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={save}>
            <div className="mb-2">
              <label className="form-label">About</label>
              <textarea
                className="form-control"
                value={info.about}
                onChange={(e) => setInfo({ ...info, about: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Contact Email</label>
              <input
                className="form-control"
                value={info.contact.email}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    contact: { ...info.contact, email: e.target.value },
                  })
                }
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Contact Phone</label>
              <input
                className="form-control"
                value={info.contact.phone}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    contact: { ...info.contact, phone: e.target.value },
                  })
                }
              />
            </div>
            <button className="btn btn-primary">Save Information</button>
          </form>
        )}
      </div>
    </AdminGuard>
  );
}
