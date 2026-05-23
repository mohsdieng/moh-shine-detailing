"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { StarIcon } from "../icons";
import { Magnetic } from "../anim/Magnetic";
import { testimonials } from "@/lib/content";

/**
 * Testimonials — horizontal carousel built on native scroll-snap so dragging
 * with a touch / trackpad always feels right. Prev / Next buttons scroll by
 * one card; a soft autoplay rotates every 6s and pauses on hover or focus.
 */
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Compute one-card width including the gap so prev / next can scroll exactly.
  const stepPx = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const first = el.querySelector<HTMLLIElement>("li");
    if (!first) return 0;
    const styles = window.getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || "0") || 0;
    return first.getBoundingClientRect().width + gap;
  }, []);

  const scrollToIndex = useCallback(
    (idx: number) => {
      const el = trackRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(testimonials.length - 1, idx));
      el.scrollTo({ left: stepPx() * clamped, behavior: "smooth" });
    },
    [stepPx],
  );

  // Mirror native scroll position back into the active index for the dots.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const idx = Math.round(el.scrollLeft / Math.max(1, stepPx()));
      setActive(idx);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [stepPx]);

  // Gentle autoplay.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const next = (active + 1) % testimonials.length;
      scrollToIndex(next);
    }, 6000);
    return () => clearInterval(id);
  }, [active, paused, scrollToIndex]);

  const ids = useMemo(() => testimonials.map((_, i) => `t-${i}`), []);

  return (
    <Section
      eyebrow="Kind words"
      heading={
        <>
          Drivers love the <span className="text-shine">shine.</span>
        </>
      }
      intro="Real reviews from people around the Triangle who've trusted us with their vehicles. Drag the cards or use the arrows below."
    >
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent" aria-hidden="true" />

        <ul
          ref={trackRef}
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scroll-padding-left:0px] sm:gap-6"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((review, i) => (
            <li
              key={ids[i]}
              className="w-[88%] flex-shrink-0 snap-start sm:w-[60%] lg:w-[38%]"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${testimonials.length}`}
            >
              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-slate-card to-black p-7 transition-colors duration-300 hover:border-shine/40 sm:p-9"
              >
                {/* Quote glyph */}
                <span
                  aria-hidden="true"
                  className="font-serif text-6xl leading-none text-shine/40"
                >
                  &ldquo;
                </span>

                <div
                  className="mt-1 flex gap-1 text-shine"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <motion.span
                      key={s}
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + s * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <StarIcon />
                    </motion.span>
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-white/90 sm:text-lg">
                  {review.quote}
                </blockquote>

                <figcaption className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-muted">
                    {review.detail}
                  </p>
                </figcaption>
              </motion.figure>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === i ? "w-8 bg-shine" : "w-3 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Magnetic strength={6}>
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => scrollToIndex(active - 1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-shine hover:text-shine"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </button>
            </Magnetic>
            <Magnetic strength={6}>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => scrollToIndex(active + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-shine hover:text-shine"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </Section>
  );
}
