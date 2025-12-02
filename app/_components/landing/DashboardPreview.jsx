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
            Built for <span className="text-primary">Creators</span>
          </h2>
          <p className="text-xl text-gray-500">
            A powerful dashboard to manage your links, customize your page, and
            track your success.
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
          <div className="relative  overflow-hidden rounded-xl border-4 border-gray-900 bg-gray-900 shadow-xl md:border-8">
            {/* Mockup of Dashboard Interface - Using a placeholder div structure to simulate the dashboard if no image is available, 
                 but ideally this should be a screenshot. I'll create a high-fidelity CSS representation. */}
            <Image
              src="/hero/preview.dash.png"
              alt="Dashboard"
              width={1920}
              height={1080}
              className="w-full "
            />
          </div>

          {/* Decorative Glow */}
          <div className="bg-primary/20 absolute -inset-4 -z-10 rounded-[3rem] blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
