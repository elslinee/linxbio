"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function EditModal({ isOpen, onClose, title, children, onSave, loading }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          <div className="px-6 py-4">{children}</div>
          <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={loading}
              className="flex items-center justify-center rounded-lg bg-[#d4f758] px-4 py-2 text-sm font-medium text-black shadow-sm transition-all hover:bg-[#c6e84d] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default EditModal;
