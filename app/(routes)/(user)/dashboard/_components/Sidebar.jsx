import { useAlertDialog } from "@/components/AlertDialogProvider";
import Button from "@/components/Button";
import { useSideBarTabsStore } from "@/stores/useSideBarTabsStore";
import {
  Brush,
  Layers,
  LayoutPanelTop,
  Settings,
  ThumbsUp,
} from "lucide-react";
import React, { useState } from "react";

function Sidebar() {
  const tabs = [
    {
      id: 1,
      name: "Header",
      icon: LayoutPanelTop,
    },

    {
      id: 2,
      name: "Social Links",
      icon: ThumbsUp,
    },
    {
      id: 3,
      name: "Page",
      icon: Layers,
    },
    {
      id: 4,
      name: "Design",
      icon: Brush,
    },
    {
      id: 5,
      name: "Settings",
      icon: Settings,
    },
  ];

  const { tab, setTab } = useSideBarTabsStore();

  return (
    <div className="">
      <div className="fixed top-20 left-4 z-9999 hidden w-fit rounded-[8px] bg-white py-2 transition-all duration-300 ease-in-out md:flex">
        <div className="flex flex-col px-1">
          {tabs.map((section) => (
            <button
              key={section.id}
              className={`flex flex-col items-center justify-center rounded-[8px] px-3 py-4 transition-all duration-300 ease-in-out hover:bg-gray-100 ${tab === section.name ? "bg-gray-200" : ""}`}
              onClick={() => {
                setTab(section.name);
              }}
            >
              <span className="">{<section.icon size={20} />}</span>
              <span className="text-sm text-nowrap">{section.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="fixed bottom-4 left-1/2 z-9999 flex w-fit -translate-x-1/2 rounded-[8px] bg-white py-2 transition-all duration-300 ease-in-out md:hidden">
        <div className="flex flex-row px-2">
          {tabs.map((section) => (
            <button
              key={section.id}
              className={`flex flex-col items-center justify-center rounded-[8px] px-4 py-3 transition-all duration-300 ease-in-out hover:bg-gray-100 ${tab === section.name ? "bg-gray-200" : ""}`}
              onClick={() => {
                setTab(section.name);
              }}
            >
              <span className="">{<section.icon size={20} />}</span>
            </button>
          ))}
        </div>
      </div>
      {tab && (
        <div
          className="fixed inset-0 z-50 bg-black/10 transition-all duration-300 ease-in-out md:hidden"
          onClick={() => setTab(null)}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
