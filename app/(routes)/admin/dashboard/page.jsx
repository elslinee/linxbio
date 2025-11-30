"use client";
import React, { useEffect, useState } from "react";
import AdminNavbar from "./_components/AdminNavbar";
import AdminSidebar from "./_components/AdminSidebar";
import UsersTable from "./_components/UsersTable";
import LinkBiosTable from "./_components/LinkBiosTable";
import SerialKeysTable from "./_components/SerialKeysTable";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

function page() {
  const [activeTab, setActiveTab] = useState("users");
  const router = useRouter();
  const { loading, user } = useAuthStore();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/");
      return;
    }
  }, [loading, user, router]);

  if (loading) return null;
  if (!user) return null;
  if (user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 md:ml-64">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === "users"
                  ? "User Management"
                  : activeTab === "linkbios"
                    ? "LinkBio Management"
                    : "Serial Keys"}
              </h1>
              <p className="text-sm text-gray-500">
                {activeTab === "users"
                  ? "Manage system users, roles, and permissions."
                  : activeTab === "linkbios"
                    ? "Manage all created LinkBios and their settings."
                    : "Manage one-time use serial keys."}
              </p>
            </div>

            {activeTab === "users" && <UsersTable />}
            {activeTab === "linkbios" && <LinkBiosTable />}
            {activeTab === "serial-keys" && <SerialKeysTable />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default page;
