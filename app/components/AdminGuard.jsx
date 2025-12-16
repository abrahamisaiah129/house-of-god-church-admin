"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem("hog_admin_token");
      if (!token) {
        router.replace("/login");
      }
    } catch (err) {
      router.replace("/login");
    }
  }, [router]);

  return children;
}
