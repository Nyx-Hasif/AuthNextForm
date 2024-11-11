"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Debug purposes
    console.log("Session Status:", status);
    console.log("Session Data:", session);

    // Redirect logic
    if (status === "unauthenticated") {
      redirect("/");
    }
  }, [status, session]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading dashboard...
      </div>
    );
  }

  // Extra protection
  if (!session) {
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Selamat datang, {session?.user?.name}</p>
      {/* Tambah dashboard content */}
    </div>
  );
}
