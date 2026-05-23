"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop. Smaller = faster. */
  duration?: number;
  /** "left" scrolls items toward the left edge. */
  direction?: "left" | "right";
  className?: string;
  /** Hide overflow with a soft fade at both edges. */
  fade?: boolean;
};

/**
 * Infinite, GPU-accelerated marquee. Renders the children twice and translates
 * by -50% so the loop is seamless. Pauses (CSS) on hover for legibility.
 */
export function Marquee({
  children,
  duration = 28,
  direction = "left",
  className = "",
  fade = true,
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const distance = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }
          : undefined
      }
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max group-hover:[animation-play-state:paused]"
        animate={reduce ? undefined : { x: distance }}
        transition={
          reduce
            ? undefined
            : { duration, ease: "linear", repeat: Infinity }
        }
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
