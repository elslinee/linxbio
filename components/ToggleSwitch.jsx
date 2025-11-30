"use client";
import React from "react";

const ToggleSwitch = ({ checked, setChecked }) => {
  return (
    <label className="flex cursor-pointer items-center select-none">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="sr-only"
        />

        <div
          className={`h-5 w-10 rounded-full transition-colors ${
            checked ? "bg-primary" : "bg-gray-300"
          }`}
        />

        <div
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </div>
    </label>
  );
};

export default ToggleSwitch;
