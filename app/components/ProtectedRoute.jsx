"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setRedirecting(true);
      const t = setTimeout(() => {
        router.push("/login");
      }, 3000); // Give user time to read the message
      return () => clearTimeout(t);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          <p className="text-gray-500 font-medium">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // If redirecting (not logged in), show message
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center animate-fadeIn">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-lock text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You must be logged in to view this page. Redirecting you to the
            login page...
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors w-full shadow-lg shadow-yellow-500/20"
          >
            Go to Login Now
          </Link>
        </div>
      </div>
    );
  }

  return children;
}
