"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "../Logo";

const SESSION_KEY = "ms-intro-played";

/**
 * Premium intro overlay shown once per session on first paint.
 *
 * Behaviour:
 *  - Renders a dark full-bleed overlay with the brand mark and a thin
 *    chrome line that fills left-to-right.
 *  - Auto-dismisses after ~1.6s; persists a sessionStorage flag so
 *    subsequent route navigations skip it.
 *  - Respects prefers-reduced-motion (skipped entirely).
 *
 * NOTE: in React Strict Mode (dev) effects fire twice. We DELIBERATELY do
 * not return a cleanup that cancels the dismiss timer — otherwise the first
 * effect's cleanup clears it and the second effect early-returns (sessionFlag
 * is now "1"), leaving the loader visible forever. Letting the timer fire is
 * safe because `setShow(false)` is idempotent.
 */
export function IntroLoader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  // Decide whether to show + schedule the auto-dismiss.
  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;

    setShow(true);
    window.sessionStorage.setItem(SESSION_KEY, "1");

    // Intentionally NOT returning a cleanup — see file header comment.
    window.setTimeout(() => setShow(false), 1600);
  }, [reduce]);

  // Lock body scroll only while the overlay is visible.
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950"
          aria-hidden="true"
        >
          {/* Subtle ambient highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,182,255,0.12),transparent_60%)]" />

          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="h-20 sm:h-24"
            >
              <Logo variant="dark" />
            </motion.div>

            {/* Chrome line that fills, mirroring a luxury loading bar */}
            <div className="relative h-px w-44 overflow-hidden bg-chrome/15">
              <motion.span
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="absolute inset-y-0 left-0 block w-full bg-shine"
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome/70"
            >
              Flawless Shine · Anywhere · Anytime
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
