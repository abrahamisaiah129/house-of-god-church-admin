"use client";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import ProgrammeManager from "@/app/components/Programme";

export default function Page() {
  return (
    <ProtectedRoute>
      <ProgrammeManager />
    </ProtectedRoute>
  );
}