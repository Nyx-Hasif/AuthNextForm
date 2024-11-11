"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session Status:", status);
    console.log("Session Data:", session);

    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status, session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return null; // Atau redirect manual
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Selamat datang, {session?.user?.name}</p>
    </div>
  );
}
