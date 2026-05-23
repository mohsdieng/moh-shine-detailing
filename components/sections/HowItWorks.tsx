"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";
import { CalendarIcon, TruckIcon, StepDetailIcon, ShineIcon } from "../icons";

const steps = [
  {
    icon: CalendarIcon,
    title: "Book online",
    copy: "Pick your service and a time through our Square booking — under a minute and you receive instant confirmation by text.",
    badge: "≈ 60 sec",
  },
  {
    icon: TruckIcon,
    title: "We come to you",
    copy: "Our fully-equipped mobile setup arrives at your home or office at the scheduled time. We bring water, power and every product.",
    badge: "On-site setup",
  },
  {
    icon: StepDetailIcon,
    title: "We detail by hand",
    copy: "Two-bucket hand wash, decontamination, hand-detailed interior and final inspection. No automated brushes, no shortcuts.",
    badge: "Pro-grade products",
  },
  {
    icon: ShineIcon,
    title: "You walk out to a shine",
    copy: "We hand you back the keys to a spotless, glossy ride. Pay contactless and rebook in one tap if you loved it.",
    badge: "Contactless pay",
  },
];

export function HowItWorks() {
  const railRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  // Track scroll progress through the timeline; drive the filled progress line.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 65%", "end 60%"],
  });
  const lineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduce ? "100%" : "100%"],
  );

  return (
    <Section
      id="how-it-works"
      className="bg-slate-surface"
      eyebrow="The process"
      heading="From booked to brilliant in four steps"
      intro="No waiting in line, no upsell at the counter. Here's exactly how a Moh's Shine detail unfolds."
    >
      <ol ref={railRef} className="relative mx-auto max-w-3xl">
        {/* Vertical rail: gray base + blue progress overlay. */}
        <div
          aria-hidden="true"
          className="absolute left-[27px] top-0 h-full w-px bg-white/10 sm:left-[35px]"
        />
        <motion.div
          aria-hidden="true"
          style={{ height: lineHeight }}
          className="absolute left-[27px] top-0 w-px bg-gradient-to-b from-shine via-shine to-transparent shadow-[0_0_12px_2px_rgba(56,182,255,0.4)] sm:left-[35px]"
        />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative pl-16 pb-12 sm:pl-24">
              {/* Dot on the rail */}
              <span
                className="absolute left-[20px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-shine ring-4 ring-slate-surface sm:left-[28px]"
                aria-hidden="true"
              >
                <span className="block h-1.5 w-1.5 rounded-full bg-black" />
              </span>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-6 transition-colors hover:border-shine/40 sm:p-7">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-shine text-black">
                      <Icon width={22} height={22} />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-slate-muted">
                      Step 0{i + 1}
                    </span>
                  </div>
                  <span className="rounded-full border border-shine/40 bg-shine/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-shine">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-muted sm:text-base">
                  {step.copy}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
