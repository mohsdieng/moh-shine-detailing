"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type CountUpProps = {
  /** Final value to count toward. */
  to: number;
  /** Animation duration in ms. */
  duration?: number;
  /** Optional prefix ("+", "$", etc). */
  prefix?: string;
  /** Optional suffix ("%", "K", "+", "★"). */
  suffix?: string;
  /** Number of decimal places to display. */
  decimals?: number;
  className?: string;
};

/**
 * Counts from 0 → `to` once the element scrolls into view. Uses an easeOut
 * curve so the numbers slow gracefully near the end (feels intentional, not
 * mechanical). Respects prefers-reduced-motion by snapping straight to `to`.
 */
export function CountUp({
  to,
  duration = 1600,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: CountUpProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(to * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  const formatted = decimals
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString("en-US");

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  );
}
