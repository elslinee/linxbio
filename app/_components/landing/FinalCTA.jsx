"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black md:py-24 py-12 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[150px]" />
      </div>

      <div className="cont text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl space-y-8"
        >
          <h2 className="text-5xl leading-tight font-black tracking-tight lg:text-6xl">
            Ready to share your world?
          </h2>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-300">
            Join thousands of creators who are already using LinxBio to connect
            with their audience. Get started in seconds — completely free,
            forever.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
          >
            <Link href="/get_started">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-bold text-black shadow-2xl transition-all hover:shadow-white/20"
              >
                Claim Your Free Link
                <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-gray-400"
          >
            No credit card required • Free forever • Set up in 60 seconds
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
