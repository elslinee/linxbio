"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 py-3 shadow-sm backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cont flex items-center justify-between">
        <Link href="/" className="relative z-10">
          <Image src={"/logo-nowall.png"} width={100} height={22} alt="logo" />
        </Link>

        <nav className="flex items-center gap-6">
          {!loading && (
            <>
              {user ? (
                <>
                  {user?.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      className="hover:text-primary text-sm font-bold transition-colors"
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    className="hover:text-primary text-sm font-bold transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="hover:text-primary text-sm font-bold transition-colors"
                >
                  Log in
                </Link>
              )}
            </>
          )}

          <Link
            href="/get_started"
            className="hover:bg-primary hidden transform rounded-full bg-black px-6 py-2.5 text-sm font-bold text-white transition-all hover:scale-105 hover:text-white sm:block"
          >
            Start for free
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
