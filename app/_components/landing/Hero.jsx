"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTiktok,
  faXTwitter,
  faYoutube,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { Eye, MousePointerClick } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 pb-10 lg:pt-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-primary/20 absolute top-[-20%] right-[-10%] h-[600px] w-[600px] animate-pulse rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[100px]" />
      </div>

      <div className="cont grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="mb-4 inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-bold tracking-wide text-gray-600 uppercase">
            The Ultimate Link-in-Bio Tool
          </div>

          <h1 className="text-5xl leading-[1.1] font-black tracking-tight lg:text-7xl">
            One Link. <br />
            <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
              Infinite Possibilities.
            </span>
          </h1>

          <p className="mx-auto max-w-lg text-lg leading-relaxed text-gray-600 lg:mx-0">
            Connect your audience to all of your content with just one link.
            Beautiful, customizable, and tracked.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Link href="/get_started">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hover:bg-primary flex items-center gap-3 rounded-full bg-black px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:text-white hover:shadow-2xl"
              >
                Claim your Link
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Image / Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="relative mx-auto lg:mr-0"
        >
          <div className="relative z-10 transform transition-transform duration-500 hover:scale-[1.02]">
            {/* Abstract Phone Container */}
            <div className="relative h-[600px] w-[300px] overflow-hidden rounded-[3rem] border-8 border-gray-900 bg-gray-900 shadow-2xl">
              {/* Screen Content */}
              <div className="scrollbar-hide h-full w-full overflow-y-auto bg-white">
                {/* Header */}
                <div className="relative h-32 bg-linear-to-b from-purple-400 to-pink-300">
                  <div className="absolute -bottom-10 left-1/2 h-20 w-20 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-gray-200">
                    <Image
                      src="/hero/hero-avatar.png"
                      width={80}
                      height={80}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="mt-12 px-4 text-center">
                  <h3 className="text-xl font-bold">Adam Creative</h3>
                  <p className="text-sm text-gray-500">
                    Digital Artist & Designer
                  </p>

                  {/* Social Media Icons */}
                  <div className="mt-4 flex justify-center gap-3">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="h-5 w-5 text-gray-700 transition-colors"
                    />
                    <FontAwesomeIcon
                      icon={faTiktok}
                      className="h-5 w-5 text-gray-700 transition-colors"
                    />
                    <FontAwesomeIcon
                      icon={faXTwitter}
                      className="h-5 w-5 text-gray-700 transition-colors"
                    />
                    <FontAwesomeIcon
                      icon={faYoutube}
                      className="h-5 w-5 text-gray-700 transition-colors"
                    />
                    <FontAwesomeIcon
                      icon={faGithub}
                      className="h-5 w-5 text-gray-700 transition-colors"
                    />
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-3 p-4">
                  {["Portfolio", "YouTube Channel", "Commission Info"].map(
                    (item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="w-full rounded-full border-2 py-3 text-center text-[14px] font-bold transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
                        style={{
                          boxShadow: `4px 4px 0px 0px #000`,
                        }}
                      >
                        {item}
                      </motion.div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements behind phone */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-20 -right-10 z-20 hidden rounded-2xl bg-white p-4 shadow-xl sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">
                <MousePointerClick size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">Clicks</p>
                <p className="text-lg font-bold">+6240</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-30 -left-10 z-20 hidden rounded-2xl bg-white p-4 shadow-xl sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                <Eye size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">Views</p>
                <p className="text-lg font-bold">12.5k</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
