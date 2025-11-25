"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/components/Button";
import { Menu, Smartphone, Monitor, Undo2, Share } from "lucide-react";

function Navbar() {
  const { user } = useAuthStore();
  const [activeScreenView, setActiveScreenView] = useState(1);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80">
      <div className="flex h-16 items-center md:justify-center justify-between px-4">
        <div className="nav-part-1 flex">
          <button className="">
            <Menu size={20} className="text-neutral-600" />
          </button>
          <div className="screenViewBtns md:flex hidden mx-4  items-center justify-center gap-2 border-x border-neutral-300 px-2">
            <button
              className={`flex size-9 items-center justify-center rounded-lg transition-all duration-300 ease-in-out ${activeScreenView === 1 ? "bg-gray-200" : ""}`}
              onClick={() => setActiveScreenView(1)}
            >
              <Smartphone size={20} className="text-neutral-600" />
            </button>
            <button
              className={`flex size-9 items-center justify-center rounded-lg transition-all duration-300 ease-in-out ${activeScreenView === 2 ? "bg-gray-200" : ""}`}
              onClick={() => setActiveScreenView(2)}
            >
              <Monitor size={20} className="text-neutral-600" />
            </button>
          </div>
        </div>
        <div className="nav-part-2 md:flex hidden  h-9 flex-1 items-center justify-start rounded-full bg-gray-200 px-4">
          <p>Dashboard content goes here</p>
        </div>
        <div className="nav-part-3 ml-4 flex gap-2">
          <button
            className={`flex size-9 min-w-9 items-center justify-center rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-200`}
          >
            <Undo2 size={20} className="text-neutral-600" />
          </button>
          <div className="border-r border-neutral-300"></div>
          <button
            className={`flex size-9 min-w-9 items-center justify-center rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-200`}
          >
            <Share size={20} className="text-neutral-600" />
          </button>
          <Button
            variant="primary"
            className="bg-primary hover:bg-primary/90 hover:shadow-primary flex h-9 items-center justify-center rounded-full px-4 text-black shadow-md transition-all duration-300 ease-out hover:shadow-[0_0_20px_var(--tw-shadow-color)] active:scale-95"
          >
            Publish
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
