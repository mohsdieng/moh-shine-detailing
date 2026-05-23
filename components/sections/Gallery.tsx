"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";
import { BeforeAfter } from "../anim/BeforeAfter";

/**
 * Before/after showcase.
 * - Each card is an interactive BeforeAfter slider (drag the blue divider).
 * - Clicking a card opens a lightbox with a bigger version + caption.
 * - The placeholder SVGs are reused; the `filter` prop adds variety per item.
 *   Swap to real photo paths (e.g. /gallery/civic-before.jpg) and remove the
 *   filter when real imagery is in place — see README.
 */
const items = [
  {
    label: "Daily driver — exterior hand wash",
    service: "Exterior Hand Wash",
    location: "Raleigh",
    before: "/gallery/before.svg",
    after: "/gallery/after.svg",
    alt: "sedan exterior after a hand wash",
    filter: undefined as string | undefined,
  },
  {
    label: "Family SUV — full interior detail",
    service: "Interior Detail",
    location: "Cary",
    before: "/gallery/before.svg",
    after: "/gallery/after.svg",
    alt: "SUV after a full interior detail",
    filter: "hue-rotate(35deg) saturate(1.15)",
  },
  {
    label: "Work truck — full detail",
    service: "Full Detail",
    location: "Wake Forest",
    before: "/gallery/before.svg",
    after: "/gallery/after.svg",
    alt: "pickup truck after a full detail",
    filter: "hue-rotate(-25deg) saturate(1.1)",
  },
  {
    label: "Black coupe — paint correction",
    service: "Paint Correction",
    location: "Durham",
    before: "/gallery/before.svg",
    after: "/gallery/after.svg",
    alt: "coupe after paint correction",
    filter: "hue-rotate(80deg) saturate(1.2) brightness(0.95)",
  },
];

type Item = (typeof items)[number];

export function Gallery() {
  const [active, setActive] = useState<Item | null>(null);

  // Close lightbox on Escape; lock body scroll while open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <Section
      id="gallery"
      eyebrow="The results"
      heading={
        <>
          Before <span className="text-shine">&amp;</span> after
        </>
      }
      intro="Drag the blue handle on any card to see the transformation. Real driveway transformations — the kind of finish a proper hand detail delivers."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={`${item.label}-${i}`} delay={i * 0.07}>
            <figure className="group flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setActive(item)}
                aria-label={`Open ${item.label}`}
                data-cursor="hover"
                className="block w-full overflow-hidden rounded-2xl text-left transition-transform duration-500 hover:-translate-y-1"
              >
                <BeforeAfter
                  before={item.before}
                  after={item.after}
                  alt={item.alt}
                  filter={item.filter}
                />
              </button>
              <figcaption className="flex items-center justify-between gap-3 px-1">
                <span className="text-sm font-medium text-white">{item.label}</span>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-shine">
                  {item.location}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:border-shine hover:text-shine"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>

              <div className="aspect-[16/10] w-full">
                <BeforeAfter
                  before={active.before}
                  after={active.after}
                  alt={active.alt}
                  filter={active.filter}
                  className="!aspect-[16/10] !rounded-none"
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-black/50 px-6 py-4 sm:px-8">
                <div>
                  <p className="text-sm font-semibold text-white">{active.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-muted">
                    {active.service} · {active.location}
                  </p>
                </div>
                <span className="hidden text-xs text-slate-muted sm:block">
                  Drag the blue handle to compare
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

