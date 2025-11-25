"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import Navbar from "@/app/(routes)/(user)/dashboard/_components/Navbar";
import Sidebar from "@/app/(routes)/(user)/dashboard/_components/Sidebar";
import Panel from "@/app/(routes)/(user)/dashboard/_components/Panel";

function page() {
  const router = useRouter();
  const { loading, user } = useAuthStore();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!user.isGetStartedDone) {
      router.replace("/get_started");
      return;
    }
  }, [loading, user, router]);

  if (loading) return null;
  if (!user) return null;
  if (!user.isGetStartedDone) return null;

  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <Sidebar />
      <main className="flex py-4 md:pl-32">
        <Panel />
        <div className="flex-1"></div>
      </main>
    </div>
  );
}

export default page;
