"use client";
import React, { useEffect, useState } from "react";
import AdminGuard from "../components/AdminGuard";

export default function SiteEditor() {
  const [site, setSite] = useState({
    converts: 0,
    mediaCount: 0,
    welcomeText: "",
    todaysAnnouncement: "",
    infoOverview: { address: "", phone: "", members: 0 },
  });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/site/overview");
      if (res.ok) setSite(await res.json());
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
    await fetch("/api/site/overview", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(site),
    });
    alert("Saved");
  }

  return (
    <AdminGuard>
      <div className="container mt-4">
        <h1>Site Overview Editor</h1>
        <p className="text-muted">Edit dashboard numbers and info overview.</p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={save}>
            <div className="mb-2">
              <label className="form-label">Converts</label>
              <input
                type="number"
                className="form-control"
                value={site.converts}
                onChange={(e) =>
                  setSite({ ...site, converts: Number(e.target.value) })
                }
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Media Count</label>
              <input
                type="number"
                className="form-control"
                value={site.mediaCount}
                onChange={(e) =>
                  setSite({ ...site, mediaCount: Number(e.target.value) })
                }
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Welcome Text</label>
              <textarea
                className="form-control"
                value={site.welcomeText}
                onChange={(e) =>
                  setSite({ ...site, welcomeText: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Today`&apos;s Announcement</label>
              <input
                className="form-control"
                value={site.todaysAnnouncement}
                onChange={(e) =>
                  setSite({ ...site, todaysAnnouncement: e.target.value })
                }
              />
            </div>
            <h5 className="mt-3">Info Overview</h5>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Address"
                value={site.infoOverview.address}
                onChange={(e) =>
                  setSite({
                    ...site,
                    infoOverview: {
                      ...site.infoOverview,
                      address: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Phone"
                value={site.infoOverview.phone}
                onChange={(e) =>
                  setSite({
                    ...site,
                    infoOverview: {
                      ...site.infoOverview,
                      phone: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Members"
                value={site.infoOverview.members}
                onChange={(e) =>
                  setSite({
                    ...site,
                    infoOverview: {
                      ...site.infoOverview,
                      members: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
            <button className="btn btn-primary">Save Overview</button>
          </form>
        )}
      </div>
    </AdminGuard>
  );
}
