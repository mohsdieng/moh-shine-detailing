"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Reveal } from "../Reveal";
import { BeforeAfter } from "../anim/BeforeAfter";

// TEMP — replace entries in lib/media.ts GALLERY with real client photos
// when available. Each entry uses { local, temp } so your real photo wins
// the moment you drop it in public/gallery/. No other code change needed.
import { GALLERY } from "@/lib/media";
import type { GalleryItem } from "@/lib/media";

/**
 * CSS filter applied to the "before" side when a GalleryItem has no real
 * before photo. The same "after" image is shown on both sides; this filter
 * makes the left half look dark and un-detailed — a convincing placeholder
 * that degrades gracefully once real before photos are added.
 */
const SYNTHETIC_BEFORE_FILTER =
  "brightness(0.28) saturate(0.12) contrast(0.85)";

export function Gallery() {
  const [active, setActive] = useState<GalleryItem | null>(null);

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
    <section
      id="gallery"
      className="relative scroll-mt-24 border-t border-chrome-line bg-navy-950 py-20 sm:py-28 lg:py-32"
    >
      <Container>
        {/* Section header */}
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <p className="eyebrow mb-6">The results</p>
          <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tightest text-white sm:text-5xl md:text-6xl">
            Before &amp;{" "}
            <span className="text-shine italic">after.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-chrome sm:text-lg">
            Drag the handle to reveal the transformation. Real results from
            driveways across Raleigh, Durham and the Triangle.
          </p>
        </Reveal>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {GALLERY.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <figure className="group flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  aria-label={`Open ${item.label}`}
                  data-cursor="hover"
                  className="block w-full overflow-hidden text-left transition-transform duration-500 hover:-translate-y-1"
                >
                  <BeforeAfter
                    // When no real "before" exists, derive one visually
                    // from the same "after" using a dark CSS filter.
                    before={item.before ?? item.after}
                    after={item.after}
                    alt={item.label}
                    filter={!item.before ? SYNTHETIC_BEFORE_FILTER : undefined}
                    className="rounded-sm border border-chrome-line"
                  />
                </button>

                <figcaption className="flex items-center justify-between gap-3 px-1">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-wider text-chrome/70">
                      {item.service}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.real && (
                      <span className="rounded-full border border-shine/40 bg-shine/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-shine">
                        Real job
                      </span>
                    )}
                    <span className="rounded-full border border-chrome-line bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-wider text-chrome">
                      {item.location}
                    </span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.12} className="mt-14">
          <div className="border-t border-chrome-line pt-8 text-center">
            <p className="text-sm text-chrome">
              These are temporary showcase photos.{" "}
              <Link
                href="/contact"
                className="text-white underline-offset-2 hover:text-shine hover:underline"
              >
                Book your detail
              </Link>{" "}
              and your car will be featured here.
            </p>
          </div>
        </Reveal>
      </Container>

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
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl overflow-hidden border border-chrome-line bg-navy-950 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-chrome-line bg-black/60 text-white backdrop-blur transition-colors hover:border-shine hover:text-shine"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>

              <div className="aspect-[16/10] w-full">
                <BeforeAfter
                  before={active.before ?? active.after}
                  after={active.after}
                  alt={active.label}
                  filter={!active.before ? SYNTHETIC_BEFORE_FILTER : undefined}
                  className="!aspect-[16/10] !rounded-none"
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-chrome-line bg-black/60 px-6 py-4 sm:px-8">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {active.label}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-chrome">
                    {active.service} · {active.location}
                  </p>
                </div>
                <span className="hidden text-[11px] uppercase tracking-widest text-chrome sm:block">
                  Drag to compare
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
