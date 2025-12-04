"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Eye, MousePointerClick } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const useCases = [
  {
    title: "Share your work in seconds",
    description:
      "Showcase your portfolio, projects, and creative work all in one place. Perfect for artists, designers, and creators.",
    gradient: "from-purple-400 to-pink-300",
    image: "/features/post.png",
    stats: { views: "12.5k", clicks: "6240" },
  },
  {
    title: "Track your traffic in real-time",
    description:
      "Get detailed analytics on every click and view. Understand your audience and optimize your content strategy.",
    gradient: "from-blue-400 to-cyan-300",
    image: "/features/track.png",
    stats: { views: "8.3k", clicks: "4120" },
  },
  {
    title: "Customize to match your brand",
    description:
      "Choose from beautiful themes or create your own design. Make your link page truly yours with custom colors and fonts.",
    gradient: "from-orange-400 to-yellow-300",
    image: "/features/custom.png",
    stats: { views: "15.2k", clicks: "7890" },
  },
  {
    title: "Boost your online presence",
    description:
      "Connect all your social media, websites, and content in one powerful link. Perfect for Instagram, TikTok, and more.",
    gradient: "from-green-400 to-emerald-300",
    image: "/features/boost.png",
    stats: { views: "20.1k", clicks: "9540" },
  },
  {
    title: "Grow your audience",
    description:
      "Share your link everywhere and watch your audience grow. Track what works and optimize for better results.",
    gradient: "from-pink-400 to-rose-300",
    image: "/features/grow3.png",
    stats: { views: "18.7k", clicks: "8320" },
  },
  {
    title: "Built for creators",
    description:
      "Everything you need to share your content, grow your brand, and connect with your audience. All completely free.",
    gradient: "from-indigo-400 to-purple-300",
    image: "/features/creator.png",
    stats: { views: "25.4k", clicks: "11200" },
  },
];

export default function UseCases() {
  return (
    <section className="bg-white py-24">
      <div className="cont space-y-12 md:space-y-32">
        {useCases.map((useCase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`grid items-center gap-12 lg:grid-cols-2`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`relative order-1 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
            >
              <div className="relative mx-auto w-full">
                <Image
                  src={useCase.image}
                  alt={useCase.title}
                  quality={100}
                  width={1000}
                  height={100}
                  className={`h-full w-full object-cover`}
                />
              </div>
            </motion.div>

            <div
              className={`order-2 space-y-6 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
            >
              <motion.h2
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl leading-tight font-black tracking-tight lg:text-5xl"
              >
                {useCase.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg leading-relaxed text-gray-600"
              >
                {useCase.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link href="/get_started">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl md:w-fit md:justify-start"
                  >
                    Get Started Free
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
