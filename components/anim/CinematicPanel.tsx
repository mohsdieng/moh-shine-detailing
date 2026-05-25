"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { serviceIcons } from "../icons";
import type { ServiceIconKey } from "@/lib/services";

type CinematicPanelProps = {
  /**
   * Which service icon to render at huge scale as a decorative element.
   * Falls back to a generic shine glyph if omitted.
   */
  icon?: ServiceIconKey;
  /** Optional tag rendered in the top corner — e.g. service number. */
  tag?: string;
  /** Optional child overlay (e.g. before/after slider) replaces the icon. */
  children?: ReactNode;
  /**
   * When true, strips the hairline frame, corner ticks, tag and watermark
   * so the panel can be nested inside another framed component (e.g. used
   * as the `fallback` of a CinematicVideo). The aspect / border / bg layers
   * remain.
   */
  bare?: boolean;
  className?: string;
};

/**
 * Cinematic visual panel — replaces "I don't have a photo" with an
 * editorial, premium-feeling composition: deep navy gradient base, a moving
 * radial highlight, hairline frame, oversized brand icon set very low-key.
 *
 * Used as the visual half of every Feature section on the homepage.
 */
export function CinematicPanel({
  icon,
  tag,
  children,
  bare = false,
  className = "",
}: CinematicPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Gentle vertical parallax on the icon to simulate camera movement.
  const iconY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["8%", "-8%"],
  );
  // Subtle horizontal highlight drift.
  const highlightX = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-10%", "10%"],
  );

  const Icon = icon ? serviceIcons[icon] : null;

  // When bare-mode, the panel is being embedded inside another framed
  // component — drop its own aspect / border so it stretches to fill that
  // wrapper instead.
  const wrapperClasses = bare
    ? `relative h-full w-full overflow-hidden ${className}`
    : `relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-chrome-line bg-navy-900 sm:aspect-[5/6] md:aspect-[4/5] ${className}`;

  return (
    <div ref={ref} className={wrapperClasses}>
      {/* Layered background — base gradient + studio key light + vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-900 to-black" />
      <motion.div
        aria-hidden="true"
        style={{ x: highlightX }}
        className="absolute inset-0"
      >
        <div className="absolute -top-1/4 left-1/2 h-[120%] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(56,182,255,0.12),transparent_55%)]" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.85)_100%)]" />

      {/* Faint blueprint grid for premium depth */}
      <div className="absolute inset-0 opacity-20 bg-shine-grid bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]" />

      {/* Oversized icon as the focal subject */}
      {Icon && !children && (
        <motion.div
          aria-hidden="true"
          style={{ y: iconY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Icon
            width={420}
            height={420}
            className="text-shine/15"
            strokeWidth={0.8}
          />
        </motion.div>
      )}

      {children}

      {!bare && (
        <>
          {/* Hairline frame inset */}
          <div className="pointer-events-none absolute inset-3 rounded-sm border border-chrome-line" aria-hidden="true" />

          {/* Corner accents */}
          <CornerTick className="left-4 top-4" />
          <CornerTick className="right-4 top-4" rotate={90} />
          <CornerTick className="left-4 bottom-4" rotate={-90} />
          <CornerTick className="right-4 bottom-4" rotate={180} />

          {/* Tag */}
          {tag && (
            <span className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-widest text-chrome">
              {tag}
            </span>
          )}

          {/* Small brand watermark, bottom-right corner */}
          <span className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-widest text-chrome/60">
            MS / Detailing
          </span>
        </>
      )}
    </div>
  );
}

function CornerTick({
  className = "",
  rotate = 0,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 h-3 w-3 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="absolute left-0 top-0 h-px w-3 bg-shine" />
      <span className="absolute left-0 top-0 h-3 w-px bg-shine" />
    </span>
  );
}
