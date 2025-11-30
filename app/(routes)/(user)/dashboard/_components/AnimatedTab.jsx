import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedTab({ children, className }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const y = useMotionValue(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (isMobile) {
      animate(y, 0, { duration: 0.3, ease: "easeInOut" });
    } else {
      animate(x, 0, { duration: 0.3, ease: "easeInOut" });
    }
  }, []);
  return (
    <motion.div
      style={{
        y: isMobile ? y : 0, 
        x: !isMobile ? x : 0, 
      }}
      initial={{
        opacity: 0,
        y: isMobile ? 20 : 0,
        x: !isMobile ? -20 : 0,
      }}
      animate={{ opacity: 1 }} 
      exit={{
        opacity: 0,
        y: isMobile ? 20 : 0,
        x: !isMobile ? -20 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`tab ${className}`}
    >
      {children}
    </motion.div>
  );
}
