"use client";
import React from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/client/user/auth";
import { useAuthStore } from "@/stores/useAuthStore";

function AdminNavbar() {
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d4f758]">
            <span className="text-lg font-bold text-black">L</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            LinxBio <span className="text-gray-400">Admin</span>
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-red-600"
        >
          <span>Logout</span>
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
