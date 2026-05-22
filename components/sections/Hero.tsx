"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { site } from "@/lib/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Subtle parallax on the background layer (disabled for reduced motion).
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-black"
    >
      {/* Background: radial glow + blueprint grid + blue accent wash. */}
      <motion.div style={{ y: bgY }} className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-shine-grid bg-[size:64px_64px] opacity-60" />
        <div className="absolute left-1/2 top-0 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-shine/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[40vh] w-[40vh] rounded-full bg-shine/10 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      </motion.div>

      <Container className="relative z-10">
        <motion.div style={{ y: contentY, opacity: fade }} className="max-w-4xl pt-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="eyebrow mb-5"
          >
            Mobile Detailing &middot; Raleigh &middot; Durham, NC
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="text-balance text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-[5.5rem]"
          >
            <span className="block skew-display">Your car,</span>
            <span className="block skew-display">
              detailed to a <span className="text-shine">shine.</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-slate-muted sm:text-xl"
          >
            Premium hand detailing that comes to your driveway. We bring the full
            studio — water, power and pro-grade products — to Raleigh, Durham and
            the surrounding Triangle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Book Now
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              Get a Quote
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44, ease }}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {[
              { value: "100%", label: "Hand washed" },
              { value: "We come", label: "to you" },
              { value: "5★", label: "Detailing care" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-slate-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </Container>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block" aria-hidden="true">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.span
            className="block h-2 w-1 rounded-full bg-shine"
            animate={reduce ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
