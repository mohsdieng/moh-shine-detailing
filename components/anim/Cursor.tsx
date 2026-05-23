"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Subtle custom cursor (desktop / fine-pointer only).
 * Two layers — a small filled dot and a larger ring that lags behind via spring.
 * Grows when hovering any interactive element ([data-cursor="hover"] or links/buttons).
 * Hidden for touch devices and users who prefer reduced motion.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Ring lags behind with a soft spring — gives that designer-portfolio feel.
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    // Only show on devices with a real pointer (mouse/trackpad).
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const checkHover = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const hot = target.closest(
        'a, button, [role="button"], [data-cursor="hover"]',
      );
      setHovering(!!hot);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", checkHover, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", checkHover);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Inner dot — locked to the real pointer position. */}
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[70] -ml-1 -mt-1 h-2 w-2 rounded-full bg-shine mix-blend-difference"
      />
      {/* Outer ring — springs behind, grows on hover. */}
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          marginLeft: hovering ? -28 : -16,
          marginTop: hovering ? -28 : -16,
          opacity: hovering ? 1 : 0.6,
          borderColor: hovering ? "rgba(56,182,255,0.9)" : "rgba(255,255,255,0.35)",
        }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border mix-blend-difference"
      />
    </>
  );
}
