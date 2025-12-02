"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faChartLine,
  faBolt,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faPalette,
    title: "Custom Design",
    description:
      "Choose from stunning themes or design your own to match your brand perfectly.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: faChartLine,
    title: "Deep Analytics",
    description:
      "Track clicks, views, and engagement to understand your audience better.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: faBolt,
    title: "Instant Setup",
    description: "Get your link-in-bio live in seconds. No coding required.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: faMobileAlt,
    title: "Mobile First",
    description:
      "Optimized for every device, ensuring your content looks great everywhere.",
    color: "bg-blue-100 text-blue-600",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24">
      <div className="cont">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-black tracking-tight">
            Everything you need to grow
          </h2>
          <p className="text-lg text-gray-500">
            Powerful features to help you connect, share, and track your
            content.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-gray-100 bg-gray-50 p-8 transition-all hover:bg-white hover:shadow-xl"
            >
              <div
                className={`h-14 w-14 rounded-2xl ${feature.color} mb-6 flex items-center justify-center text-xl`}
              >
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
              <p className="leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
