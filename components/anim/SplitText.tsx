"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SplitProps = {
  text: string;
  /** Per-word delay step in seconds. */
  stagger?: number;
  /** Base reveal duration in seconds. */
  duration?: number;
  /** Optional class applied to each word span. */
  wordClassName?: string;
  className?: string;
  /** Defer animation until in viewport, then fire once. */
  whileInView?: boolean;
  /** Wraps each word in a child node so callers can color individual words. */
  children?: (parts: { word: string; index: number; total: number }[]) => ReactNode;
};

/**
 * Word-by-word entrance with an italic-skew origin — echoes the brand mark.
 * Each word lives in an inline-block clip so the translate stays clean.
 */
export function SplitText({
  text,
  stagger = 0.06,
  duration = 0.7,
  wordClassName = "",
  className = "",
  whileInView = false,
}: SplitProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: 0.05 },
    },
  };

  const word = {
    hidden: { y: "110%", opacity: 0, skewY: reduce ? 0 : 6 },
    show: {
      y: "0%",
      opacity: 1,
      skewY: 0,
      transition: { duration: reduce ? 0 : duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const viewProps = whileInView
    ? { whileInView: "show" as const, viewport: { once: true, margin: "-80px" } }
    : { animate: "show" as const };

  return (
    <span className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        {...viewProps}
        className="inline"
      >
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="relative inline-block overflow-hidden pb-[0.12em] align-bottom"
            style={{ marginRight: i === words.length - 1 ? 0 : "0.28em" }}
          >
            <motion.span
              variants={word}
              className={`inline-block ${wordClassName}`}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}
