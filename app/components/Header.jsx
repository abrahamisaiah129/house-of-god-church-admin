"use client";

import { useAuth } from "@/lib/AuthContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Helper to generate a page title based on path
  const getPageTitle = () => {
    const path = pathname.split("/").pop();
    if (!path || path === "admin") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 p-4 w-full">
      <div className="flex justify-between items-center w-full">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight capitalize">
            {getPageTitle()}
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold border border-yellow-200 shadow-sm">
              {user?.firstname?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-gray-900 leading-tight">
                {user?.firstname || user?.name || "Global Admin"}
              </p>
              <p className="text-xs text-gray-500 font-medium">Administrator</p>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-200"></div>

          <button
            onClick={logout}
            className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-lg"
          >
            <i className="fas fa-sign-out-alt group-hover:translate-x-1 transition-transform"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
