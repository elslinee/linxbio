"use client";
import React, { useEffect, useState } from "react";
import AdminNavbar from "./_components/AdminNavbar";
import AdminSidebar from "./_components/AdminSidebar";
import UsersTable from "./_components/UsersTable";
import LinkBiosTable from "./_components/LinkBiosTable";
import SerialKeysTable from "./_components/SerialKeysTable";
import AdminAnalyticsTable from "./_components/AdminAnalyticsTable";
import UserDetailsView from "./_components/UserDetailsView";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

function page() {
  const [activeTab, setActiveTab] = useState("users");
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [viewMode, setViewMode] = useState("analytics"); // "analytics" or "details"
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
            {selectedUsername ? (
              <div className="space-y-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <button
                      onClick={() => {
                        setSelectedUsername(null);
                        setViewMode("analytics");
                      }}
                      className="mb-2 flex gap-2 justify-center items-center rounded-full bg-gray-200 px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
                    >
                      <ArrowLeft size={18} />
                      Back
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {viewMode === "analytics" ? "Analytics" : "User Details"}{" "}
                      - @{selectedUsername}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {viewMode === "analytics"
                        ? "View analytics and statistics for this LinkBio"
                        : "View user information and profile details"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode("details")}
                      className={`rounded-lg px-4 py-2 text-sm font-medium ${
                        viewMode === "details"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      User Details
                    </button>
                    <button
                      onClick={() => setViewMode("analytics")}
                      className={`rounded-lg px-4 py-2 text-sm font-medium ${
                        viewMode === "analytics"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Analytics
                    </button>
                  </div>
                </div>
                {viewMode === "analytics" ? (
                  <AdminAnalyticsTable username={selectedUsername} />
                ) : (
                  <UserDetailsView
                    username={selectedUsername}
                    onBack={() => {
                      setSelectedUsername(null);
                      setViewMode("analytics");
                    }}
                  />
                )}
              </div>
            ) : (
              <>
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
                {activeTab === "linkbios" && (
                  <LinkBiosTable onViewAnalytics={setSelectedUsername} />
                )}
                {activeTab === "serial-keys" && <SerialKeysTable />}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default page;
