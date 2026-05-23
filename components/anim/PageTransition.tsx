"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Page entrance animation.
 *
 * We deliberately do NOT wrap children in <AnimatePresence mode="wait"> because
 * doing so around the App Router's RSC children causes runtime errors (the
 * server payload is unmounted/remounted in a way React's tree reconciliation
 * doesn't expect). Instead we re-mount the wrapper on `pathname` change via a
 * React key — that's enough to re-trigger the entrance on every navigation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      // `relative` so framer-motion's useScroll() can correctly measure
      // section offsets against this wrapper (children's offsetParent).
      style={{ position: "relative" }}
    >
      {children}
    </motion.div>
  );
}
