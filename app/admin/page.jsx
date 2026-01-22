"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getSiteStats } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = React.useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getSiteStats();
      console.log("Dashboard Stats from Backend:", result);
      if (result.success) {
        setStats(result.data);
      } else {
        setError("Failed to load statistics");
      }
    } catch (err) {
      console.error("Connection Error:", err);
      setError("Failed to connect to backend");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome to House of God Church Admin Panel
          </p>
        </div>
        <div>
          <button
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-bold rounded-lg text-black bg-yellow-500 hover:bg-yellow-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={fetchStats}
            disabled={loading}
          >
            <i
              className={`fas fa-sync-alt mr-2 ${loading ? "animate-spin" : ""}`}
            ></i>
            {loading ? "Loading..." : "Refresh Data"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start justify-between">
          <div className="flex">
            <div className="shrink-0">
              <i className="fas fa-exclamation-circle text-red-500"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
          <button
            type="button"
            className="ml-auto bg-red-50 text-red-500 hover:text-red-700 focus:outline-none p-1 rounded-md"
            onClick={() => setError("")}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {/* Statistics Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Events */}
          <StatCard
            title="Total Events"
            value={stats.totalEvents || 0}
            icon="fa-calendar"
            color="primary"
            link="/admin/Events"
          />

          {/* Media Items */}
          <StatCard
            title="Media Items"
            value={stats.totalMedia || 0}
            icon="fa-images"
            color="emerald"
            link="/admin/Media"
          />

          {/* Sermons */}
          <StatCard
            title="Sermons"
            value={stats.totalSermons || 0}
            icon="fa-film"
            color="amber"
            link="/admin/Events"
          />

          {/* Active Announcements */}
          <StatCard
            title="Active Announcements"
            value={stats.activeAnnouncements || 0}
            icon="fa-bullhorn"
            color="rose"
            link="#" // Pending link
          />

          {/* Departments */}
          <StatCard
            title="Departments"
            value={stats.totalDepartments || 0}
            icon="fa-sitemap"
            color="cyan"
            link="/admin/Department"
          />

          {/* Upcoming Events */}
          <StatCard
            title="Upcoming Events"
            value={stats.upcomingEvents || 0}
            icon="fa-clock"
            color="slate"
            link="/admin/Events"
          />

          {/* Members (User Stats) */}
          <StatCard
            title="Members"
            value={stats.totalMembers || 0}
            icon="fa-users"
            color="violet"
            link="/admin/Users"
          />
        </div>
      ) : null}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h5 className="text-lg font-semibold text-gray-900 flex items-center">
            <i className="fas fa-bolt mr-2 text-yellow-500"></i>
            Quick Actions
          </h5>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickActionButton
              href="/admin/Media?action=create"
              icon="fa-plus"
              label="Upload Media"
              colorClass="text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200"
            />
            <QuickActionButton
              href="/admin/Events?action=create"
              icon="fa-plus"
              label="Create Event"
              colorClass="text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
            />
            <QuickActionButton
              href="/admin/About"
              icon="fa-edit"
              label="Edit About"
              colorClass="text-cyan-600 bg-cyan-50 hover:bg-cyan-100 border-cyan-200"
            />
            <QuickActionButton
              href="/admin/Converts"
              icon="fa-handshake"
              label="View Conversions"
              colorClass="text-yellow-700 bg-yellow-50 hover:bg-yellow-100 border-yellow-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, link }) {
  // Map simplified color names to Tailwind types
  const colorMap = {
    primary: "text-yellow-700 bg-yellow-50",
    indigo: "text-indigo-600 bg-indigo-50",
    emerald: "text-emerald-600 bg-emerald-50",
    amber: "text-amber-600 bg-amber-50",
    rose: "text-rose-600 bg-rose-50",
    cyan: "text-cyan-600 bg-cyan-50",
    slate: "text-slate-600 bg-slate-50",
    violet: "text-violet-600 bg-violet-50",
  };

  const colorClasses = colorMap[color] || colorMap.primary;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md hover:-translate-y-1 duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg shadow-sm ${colorClasses}`}>
          <i className={`fas ${icon} text-xl`}></i>
        </div>
      </div>
      {link && link !== "#" ? (
        <Link
          href={link}
          className="text-sm font-semibold text-gray-500 hover:text-yellow-600 flex items-center gap-1 group transition-colors"
        >
          View details
          <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
        </Link>
      ) : (
        <span className="text-sm text-gray-300 cursor-not-allowed">
          Coming soon
        </span>
      )}
    </div>
  );
}

function QuickActionButton({ href, icon, label, colorClass }) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border font-medium transition-colors shadow-sm hover:shadow ${colorClass}`}
    >
      <i className={`fas ${icon}`}></i>
      {label}
    </Link>
  );
}
