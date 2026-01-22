"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: "fa-tachometer-alt" },
    {
      href: "/admin/Events",
      label: "Events / Programs",
      icon: "fa-calendar-alt",
    },
    { href: "/admin/Media", label: "Media Manager", icon: "fa-photo-video" },
    { href: "/admin/Department", label: "Departments", icon: "fa-building" },
    { href: "/admin/Converts", label: "New Converts", icon: "fa-user-plus" },
    { href: "/admin/About", label: "About / Pastor", icon: "fa-info-circle" },
    { href: "/admin/Welcomevideo", label: "Welcome Video", icon: "fa-video" },
    { href: "/admin/Users", label: "User Management", icon: "fa-users-cog" },
  ];

  return (
    <div className="flex flex-col h-full bg-black border-r border-gray-900">
      <div className="h-16 flex items-center justify-center border-b border-gray-900 bg-black">
        <h1 className="text-xl font-bold text-white tracking-wide">
          <span className="text-yellow-500">HOG</span> Admin
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Main Menu
        </div>
        {links.map((link) => {
          // Normalize paths for comparison (handle case sensitivity if needed)
          const isActive =
            pathname === link.href ||
            (link.href !== "/admin" && pathname?.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 font-bold"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
              }`}
            >
              <i
                className={`fas ${link.icon} w-5 text-center ${isActive ? "text-black" : "text-gray-500 group-hover:text-yellow-500 transition-colors"}`}
              ></i>
              <span className="text-sm">{link.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-900">
        <div className="bg-gray-900 rounded-xl p-3 flex items-center justify-center text-gray-500 text-xs">
          &copy; 2026 Household of God
        </div>
      </div>
    </div>
  );
}
