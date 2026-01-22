"use client";

export default function AdminLayout({ children }) {
  // Sidebar and Header are now in root layout.jsx
  // This layout just renders the children as-is
  return <>{children}</>;
}
