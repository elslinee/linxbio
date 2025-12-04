"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function DashboardPreview() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={ref}
      className="perspective-1000 overflow-hidden bg-gray-50 py-32"
    >
      <div className="cont text-center">
        <div className="mx-auto mb-16 max-w-3xl">
          <h2 className="mb-6 text-4xl font-black tracking-tight lg:text-5xl">
            Build Your Presence <span className="text-primary">Globally</span>
          </h2>
          <p className="text-xl text-gray-500">
            Showcase your content, grow your influence, and connect with users
            across the world.
          </p>
        </div>

        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
            transformPerspective: 1000,
          }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="flex">
            <Image
              src="/hero/global.svg"
              width={1000}
              height={1000}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Decorative Glow */}
        </motion.div>
      </div>
    </section>
  );
}
