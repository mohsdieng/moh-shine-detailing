"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

type TiltProps = {
  children: ReactNode;
  /** Max rotation in degrees. */
  max?: number;
  /** Adds a subtle gloss highlight that follows the cursor. */
  glare?: boolean;
  className?: string;
};

/**
 * 3D tilt-on-hover wrapper. The card rotates a few degrees toward the cursor;
 * an optional blue gloss follows the pointer. No effect under reduced motion.
 */
export function Tilt({ children, max = 8, glare = true, className = "" }: TiltProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const active = useMotionValue(0);

  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), {
    stiffness: 180,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), {
    stiffness: 180,
    damping: 18,
  });

  // Drive the gloss via a real motion template so it updates every frame.
  const gxPct = useTransform(mx, (v) => `${v * 100}%`);
  const gyPct = useTransform(my, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(280px circle at ${gxPct} ${gyPct}, rgba(56,182,255,0.22), transparent 60%)`;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
    active.set(1);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
    active.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerEnter={() => active.set(1)}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          style={{ backgroundImage: glareBg, opacity: active }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity"
        />
      )}
    </motion.div>
  );
}
