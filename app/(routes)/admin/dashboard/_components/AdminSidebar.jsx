"use client";
import React from "react";
import { Users, Link as LinkIcon, LayoutDashboard, Key } from "lucide-react";

function AdminSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: "users",
      label: "Users",
      icon: Users,
    },
    {
      id: "linkbios",
      label: "LinkBios",
      icon: LinkIcon,
    },
    {
      id: "serial-keys",
      label: "Serial Keys",
      icon: Key,
    },
  ];

  return (
    <aside className="fixed top-16 left-0 hidden h-[calc(100vh-64px)] w-64 border-r border-gray-200 bg-white md:block">
      <div className="flex flex-col gap-1 p-4">
        <div className="mb-4 px-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Management
        </div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-50 hover:text-black"
            }`}
          >
            <tab.icon
              size={20}
              className={activeTab === tab.id ? "text-white" : "text-gray-500"}
            />
            {tab.label}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default AdminSidebar;
