"use client";
import React, { useState } from "react";
import AdminNavbar from "./_components/AdminNavbar";
import AdminSidebar from "./_components/AdminSidebar";
import UsersTable from "./_components/UsersTable";
import LinkBiosTable from "./_components/LinkBiosTable";
import SerialKeysTable from "./_components/SerialKeysTable";

function page() {
  const [activeTab, setActiveTab] = useState("users");

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
