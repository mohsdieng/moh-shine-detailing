"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin blue progress bar fixed at the very top of the viewport.
 * Driven by document scroll progress and smoothed with a spring so the bar
 * glides rather than jitters during fast scrolls.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.25,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-shine via-shine-400 to-shine"
    />
  );
}
