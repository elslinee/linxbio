"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/components/Button";
import {
  Menu,
  Smartphone,
  Monitor,
  Undo2,
  Share,
  User2,
  User,
  LogOut,
  Copy,
  X,
  MessageCircle,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";
import { logout } from "@/utils/client/user/auth";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
function Navbar({ setDesktop, onClick, publishLoading, profile }) {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [activeScreenView, setActiveScreenView] = useState(1);
  const logoutRequest = async () => {
    try {
      await logout();

      useAuthStore.getState().clearUser();

      router.push("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
  return (
    <nav className="sticky top-0 z-9999 w-full border-b border-gray-200 bg-white/80">
      <div className="flex h-16 items-center justify-between px-4 md:justify-center">
        <div className="nav-part-1 flex">
          <div className="screenViewBtns flex items-center justify-center gap-2 border-neutral-300 px-2">
            <button
              className={`flex size-9 items-center justify-center rounded-lg transition-all duration-300 ease-in-out ${activeScreenView === 1 ? "bg-gray-200" : ""}`}
              onClick={() => {
                setActiveScreenView(1);
                setDesktop(false);
              }}
            >
              <Smartphone size={20} className="text-neutral-600" />
            </button>
            <button
              className={`flex size-9 items-center justify-center rounded-lg transition-all duration-300 ease-in-out ${activeScreenView === 2 ? "bg-gray-200" : ""}`}
              onClick={() => {
                setActiveScreenView(2);
                setDesktop(true);
              }}
            >
              <Monitor size={20} className="text-neutral-600" />
            </button>
          </div>
        </div>
        <div className="nav-part-2 hidden h-9 flex-1 items-center justify-start rounded-full bg-gray-200 px-4 md:flex">
          <p className="text-sm font-medium">
            linxbio.vercel.app/{profile?.username}
          </p>
        </div>
        <div className="nav-part-3 ml-4 flex gap-2">
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className={`relative flex size-9 min-w-9 items-center justify-center rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-200`}
          >
            <User size={22} className="text-neutral-600" />
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-15 left-1/2 flex min-w-[130px] -translate-x-1/2 items-center justify-center rounded-lg bg-white p-2 shadow-md`}
                >
                  <div
                    onClick={logoutRequest}
                    className="flex items-center justify-center gap-2 text-base font-medium"
                  >
                    Log out
                    <span className="flex">
                      <LogOut size={18} />
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <div className="border-r border-neutral-300"></div>
          <div
            onClick={() => setShareOpen(!shareOpen)}
            className={`relative flex size-9 min-w-9 items-center justify-center rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-200`}
          >
            <Share size={20} className="text-neutral-600" />
            <AnimatePresence>
              {shareOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-12 right-0 z-50 flex w-64 flex-col gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-xl"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      Share Link
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShareOpen(false);
                      }}
                      className="rounded-full p-1 hover:bg-gray-100"
                    >
                      <X size={16} className="text-gray-400" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-2">
                    <div className="flex-1 truncate text-xs text-gray-500">
                      linxbio.vercel.app/{profile?.username}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(
                          `https://linxbio.vercel.app/${profile?.username}`,
                        );
                        setShareOpen(false);
                      }}
                      className="rounded-md bg-white p-1.5 shadow-sm hover:bg-gray-50"
                      title="Copy link"
                    >
                      <Copy size={14} className="text-gray-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-2">
                    <a
                      href={`https://wa.me/?text=Check out my LinxBio profile: https://linxbio.vercel.app/${profile?.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-gray-50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400 text-white">
                        <FontAwesomeIcon icon={faWhatsapp} />
                      </div>
                      <span className="text-[10px] text-gray-600">
                        WhatsApp
                      </span>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=https://linxbio.vercel.app/${profile?.username}&text=Check out my LinxBio profile!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-gray-50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                        <FontAwesomeIcon icon={faXTwitter} />
                      </div>
                      <span className="text-[10px] text-gray-600">X</span>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=https://linxbio.vercel.app/${profile?.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-gray-50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                        <FontAwesomeIcon icon={faLinkedin} />
                      </div>
                      <span className="text-[10px] text-gray-600">
                        LinkedIn
                      </span>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=https://linxbio.vercel.app/${profile?.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-gray-50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                        <FontAwesomeIcon icon={faFacebook} />
                      </div>
                      <span className="text-[10px] text-gray-600">
                        Facebook
                      </span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Button
            loading={publishLoading}
            onClick={onClick}
            variant="primary"
            className="bg-primary hover:bg-primary/90 hover:shadow-primary flex h-9 min-w-[100px] items-center justify-center rounded-full px-4 text-black shadow-md transition-all duration-300 ease-out hover:shadow-[0_0_20px_var(--tw-shadow-color)] active:scale-95"
          >
            Publish
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
