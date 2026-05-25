"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "../ui/Container";
import { Reveal } from "../Reveal";
import { testimonials } from "@/lib/content";

/**
 * Reviews — luxury single-quote rotator.
 *
 * One large editorial pull-quote at a time with thin pagination dots and an
 * auto-advance every 7s that pauses on hover/focus. Restrained, magazine-like.
 */
export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(id);
  }, [paused, reduce]);

  const current = testimonials[index];

  return (
    <section
      id="reviews"
      className="relative scroll-mt-24 border-t border-chrome-line bg-black py-20 sm:py-28 lg:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-6">Reviews</p>
            <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tightest sm:text-5xl">
              In their <span className="text-shine italic">own words.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base font-light leading-relaxed text-chrome">
              Honest reviews from drivers across Raleigh, Durham, Cary and the
              broader NC Triangle.
            </p>

            {/* Rating + link to full reviews page */}
            <div className="mt-10 border-t border-chrome-line pt-6">
              <div className="flex items-center gap-3 text-shine">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} />
                ))}
              </div>
              <p className="mt-3 text-xs uppercase tracking-widest text-chrome">
                4.9 average · 1,200+ details
              </p>
              <Link
                href="/reviews"
                className="group mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:text-shine"
              >
                Read all reviews
                <span className="text-shine transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              {/* Big quote glyph */}
              <span
                aria-hidden="true"
                className="absolute -top-10 -left-2 select-none font-serif text-[10rem] leading-none text-shine/15"
              >
                &ldquo;
              </span>

              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative text-balance text-2xl font-light leading-snug text-white sm:text-3xl lg:text-[2.25rem]"
                >
                  {current.quote}
                </motion.blockquote>
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-between gap-6 border-t border-chrome-line pt-6">
                <AnimatePresence mode="wait">
                  <motion.figcaption
                    key={`name-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="font-semibold text-white">{current.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-chrome">
                      {current.detail}
                    </p>
                  </motion.figcaption>
                </AnimatePresence>

                {/* Pagination dots */}
                <ul className="flex items-center gap-2" role="tablist" aria-label="Choose review">
                  {testimonials.map((_, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={i === index}
                        aria-label={`Show review ${i + 1}`}
                        onClick={() => setIndex(i)}
                        className={`h-px transition-all duration-500 ${
                          i === index ? "w-8 bg-shine" : "w-4 bg-chrome/30 hover:bg-chrome"
                        }`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z" />
    </svg>
  );
}
