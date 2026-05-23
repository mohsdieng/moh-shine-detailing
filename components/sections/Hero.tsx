"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Magnetic } from "../anim/Magnetic";
import { SplitText } from "../anim/SplitText";
import { Marquee } from "../anim/Marquee";
import { CountUp } from "../anim/CountUp";
import { site } from "@/lib/site";
import { trustChips, stats } from "@/lib/content";

/**
 * Hero — full-viewport landing block.
 * - Kinetic split-text headline with italic skew
 * - Parallax bg layers (grid, radial glow, oversized logo mark)
 * - Magnetic CTA buttons
 * - Live count-up stats
 * - Edge-to-edge trust marquee at the bottom
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax depths — kept subtle so they don't hurt LCP perception.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-black pt-24 sm:pt-28"
    >
      {/* Layer 1: blueprint grid + glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-shine-grid bg-[size:64px_64px] opacity-50" />
        <div className="absolute left-1/2 top-[-10%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-shine/25 blur-[160px] animate-float" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[55vh] w-[55vh] rounded-full bg-shine/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_70%,#000_100%)]" />
      </motion.div>

      {/* Layer 2: oversized italic "MS" watermark, parallaxes mid-speed */}
      <motion.div
        style={{ y: midY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="select-none pr-[-2vw] text-[55vw] font-black italic leading-none text-white/[0.025] sm:text-[40vw] lg:text-[28vw]"
          style={{ letterSpacing: "-0.05em" }}
        >
          MS
        </span>
      </motion.div>

      <Container className="relative z-10">
        <motion.div style={{ y: contentY, opacity: fade }} className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="eyebrow mb-6 flex items-center gap-3"
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-shine" />
            {site.motto}
          </motion.p>

          {/* Kinetic headline — three lines, each in its own split block. */}
          <h1 className="text-balance text-[12vw] font-bold leading-[0.92] tracking-tight sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem]">
            <span className="block skew-display">
              <SplitText text="Premium mobile" />
            </span>
            <span className="block skew-display">
              <SplitText text="car detailing in" />
            </span>
            <span className="block skew-display text-shine">
              <SplitText text="Raleigh-Durham." />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="mt-8 max-w-xl text-base leading-relaxed text-slate-muted sm:text-lg md:text-xl"
          >
            Premium hand detailing that comes to your driveway. We bring the full
            studio — water, power and pro-grade products — to Raleigh, Durham and
            the surrounding NC Triangle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62, ease }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <Button
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                Book Now
                <Arrow />
              </Button>
            </Magnetic>
            <Magnetic strength={10}>
              <Button href="/services" variant="secondary" size="lg">
                View Services
              </Button>
            </Magnetic>
            <Magnetic strength={6}>
              <Button href="/contact" variant="ghost" size="lg">
                Get a Quote →
              </Button>
            </Magnetic>
          </motion.div>

          {/* Response indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.85, ease }}
            className="mt-5 flex items-center gap-3 text-xs text-slate-muted"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.6)]" />
            Replies typically within an hour · Serving Raleigh, Durham &amp; the Triangle
          </motion.div>

          {/* Animated stats strip */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.78, ease }}
            className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  <CountUp
                    to={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    decimals={s.decimals}
                  />
                </dt>
                <dd className="mt-1 text-[11px] uppercase tracking-wider text-slate-muted sm:text-xs">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </Container>

      {/* Bottom: edge-to-edge trust marquee */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/60 py-4 backdrop-blur-md">
        <Marquee duration={36}>
          {trustChips.map((chip) => (
            <span
              key={chip}
              className="flex items-center gap-6 px-6 text-sm font-medium uppercase tracking-[0.18em] text-white/70"
            >
              {chip}
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-shine" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 sm:block"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.span
            className="block h-2 w-1 rounded-full bg-shine"
            animate={reduce ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
