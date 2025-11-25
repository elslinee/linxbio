import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedTab({ children, className }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const y = useMotionValue(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (isMobile) {
      // animate Y only — does NOT touch translateX from Tailwind
      animate(y, 0, { duration: 0.3, ease: "easeInOut" });
    } else {
      // animate X only — desktop
      animate(x, 0, { duration: 0.3, ease: "easeInOut" });
    }
  }, []);
  return (
    <motion.div
      style={{
        y: isMobile ? y : 0, // safe
        x: !isMobile ? x : 0, // safe
      }}
      initial={{
        opacity: 0,
        y: isMobile ? 30 : 0,
        x: !isMobile ? -20 : 0,
      }}
      animate={{ opacity: 1 }} // only opacity here
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`tab ${className}`}
    >
      {children}
    </motion.div>
  );
}
