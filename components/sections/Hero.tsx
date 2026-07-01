"use client";

import { useEffect, useRef, useState } from "react";
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
import { site } from "@/lib/site";
import { mediaFor } from "@/lib/media";

// Resolve hero media from the central registry.
// Local files win when they exist; Unsplash temp fills in until then.
const heroMedia = mediaFor("hero");
const HERO_VIDEO_MP4 = heroMedia.video?.local ?? "/videos/hero.mp4";
const HERO_POSTER_LOCAL = heroMedia.poster?.local ?? "/posters/hero.jpg";
const HERO_POSTER_TEMP = heroMedia.poster?.temp;

/**
 * Hero — luxury automotive launch-page style.
 *
 * - Full-bleed dark cinematic background (deep navy gradient + chrome grid +
 *   subtle parallax radial highlight + an oversized faded MS wordmark).
 * - Restrained typography: single multi-line H1, tight tracking, no skew.
 * - Two CTAs only — primary Get a Quote, secondary Book Now.
 * - Thin chrome rails and corner accents instead of bouncy chips.
 * - Vertical scroll indicator on the right edge.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterImgRef = useRef<HTMLImageElement>(null);
  const reduce = useReducedMotion();

  // Hero video state — auto-tries the .mp4, swaps to the CSS cinematic bg
  // if it errors (file missing, codec unsupported, slow connection).
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  // Poster — tries the local path first; falls back to the Unsplash temp URL.
  const [posterSrc, setPosterSrc] = useState(HERO_POSTER_LOCAL);
  const [posterTriedTemp, setPosterTriedTemp] = useState(false);
  const onPosterError = () => {
    if (!posterTriedTemp && HERO_POSTER_TEMP) {
      setPosterSrc(HERO_POSTER_TEMP);
      setPosterTriedTemp(true);
    }
  };

  // The hero poster loads eagerly, so its 404 can fire BEFORE React hydrates
  // and attaches onError. Re-check on mount: if the eager image already
  // failed (complete with zero intrinsic size), swap to the temp source.
  useEffect(() => {
    const img = posterImgRef.current;
    if (img && img.complete && img.naturalWidth === 0 && HERO_POSTER_TEMP) {
      setPosterSrc(HERO_POSTER_TEMP);
      setPosterTriedTemp(true);
    }
  }, []);

  useEffect(() => {
    if (reduce) return;
    const video = videoRef.current;
    if (!video) return;
    // Defer briefly so we don't fight first-paint priority; respects whichever
    // idle-callback API the browser exposes, falling back to a short timeout.
    const start = () => {
      if (video.readyState === 0) video.load();
      void video.play().catch(() => {});
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(start);
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(start, 400);
    return () => window.clearTimeout(id);
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "6%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);

  const ease = [0.22, 1, 0.36, 1] as const;
  const videoActive = !reduce && !videoFailed;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy-950 pb-20 pt-28 sm:items-center sm:pb-0 sm:pt-0"
    >
      {/* Layer 1 — cinematic CSS background (also the video fallback) */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        {/* Base gradient — deep navy → black bottom for vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-950 to-black" />
        {/* Studio key light off-center */}
        <div className="absolute left-[55%] top-[20%] h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/4 rounded-full bg-shine/15 blur-[160px]" />
        {/* Cool rim light from the left edge */}
        <div className="absolute -left-[20%] top-1/3 h-[60vh] w-[60vh] rounded-full bg-shine/8 blur-[140px]" />
        {/* Chrome grid for premium depth */}
        <div className="absolute inset-0 bg-shine-grid bg-[size:72px_72px] opacity-30 [mask-image:radial-gradient(ellipse_at_55%_40%,black,transparent_75%)]" />
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </motion.div>

      {/* Layer 1a — poster photo. Resolves local first, then Unsplash temp.
          Always visible below the video so there's a real photo even before
          the video loads or when no video file exists. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={posterImgRef}
        src={posterSrc}
        alt=""
        aria-hidden="true"
        loading="eager"
        onError={onPosterError}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        draggable={false}
      />
      {/* Layer 1a overlay — keeps text readable over the photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-navy-950/60 to-black/85"
      />

      {/* Layer 1b — full-bleed cinematic video, fades in over Layer 1 when
          it starts playing. If the file is missing or the codec is rejected,
          the CSS bg above remains visible — zero broken state. */}
      {videoActive && (
        <video
          ref={videoRef}
          poster={posterSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          onError={() => setVideoFailed(true)}
          onPlaying={() => setVideoStarted(true)}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
            videoStarted ? "opacity-70" : "opacity-0"
          }`}
        >
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
          {/* No temp video — Unsplash doesn't serve mp4. Drop /videos/hero.mp4 to enable. */}
        </video>
      )}

      {/* Layer 1c — dark gradient + vignette ON TOP of the video so the
          headline stays readable regardless of footage exposure. */}
      {videoActive && videoStarted && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/85"
        />
      )}

      {/* Layer 2 — oversized faded MS wordmark, light parallax */}
      <motion.div
        aria-hidden="true"
        style={{ y: wordmarkY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden"
      >
        <span
          className="select-none pr-[2vw] text-[40vw] font-bold italic leading-none text-white/[0.025] sm:pr-[6vw] sm:text-[28vw] lg:text-[22vw]"
          style={{ letterSpacing: "-0.06em" }}
        >
          MS
        </span>
      </motion.div>

      {/* Side rail — vertical hairline + numeral, desktop only */}
      <div className="pointer-events-none absolute inset-y-0 left-8 hidden flex-col items-center pb-12 pt-32 lg:flex">
        <div className="h-full w-px bg-chrome-line" />
        <span className="mt-4 -rotate-90 font-mono text-[10px] uppercase tracking-widest text-chrome/60 origin-center whitespace-nowrap">
          01 / Premium Mobile Detailing
        </span>
      </div>

      {/* Right rail — scroll cue */}
      <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
        <span className="font-mono text-[10px] uppercase tracking-widest text-chrome/60 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative h-16 w-px bg-chrome-line">
          <motion.span
            className="absolute inset-x-0 top-0 mx-auto block h-4 w-px bg-shine"
            animate={reduce ? {} : { y: [0, 48, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <motion.div style={{ y: contentY, opacity: fade }} className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="eyebrow mb-7 flex items-center gap-3"
          >
            <span className="inline-block h-[6px] w-[6px] rounded-full bg-shine" />
            Mobile Detailing · Raleigh – Durham, NC
          </motion.p>

          {/* Restrained headline — single concept, three short lines */}
          <h1 className="text-balance text-[12vw] font-bold leading-[0.95] tracking-tightest sm:text-6xl md:text-[5rem] lg:text-[5.75rem]">
            <span className="block text-white">
              <SplitText text="Premium Mobile" stagger={0.05} />
            </span>
            <span className="block text-white">
              <SplitText text="Detailing," stagger={0.05} />
            </span>
            <span className="block text-shine italic">
              <SplitText text="Anywhere." stagger={0.05} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease }}
            className="mt-7 max-w-xl text-base font-light leading-relaxed text-chrome sm:text-lg"
          >
            Luxury car care delivered to your home or office across the Raleigh –
            Durham Triangle. Hand-finished by craftsmen, on your driveway, on
            your schedule.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Magnetic strength={10}>
              <Button href="/contact" size="lg">
                Get a Quote
                <Arrow />
              </Button>
            </Magnetic>
            <Magnetic strength={8}>
              <Button
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
              >
                Book Now
              </Button>
            </Magnetic>
          </motion.div>

          {/* Bottom meta strip with hairline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85, ease }}
            className="mt-14 max-w-xl"
          >
            <div className="hairline" />
            <dl className="mt-5 grid grid-cols-3 gap-6 text-xs font-medium uppercase tracking-widest text-chrome/80">
              <div>
                <dt className="text-chrome/50">Service</dt>
                <dd className="mt-1 text-white">By hand</dd>
              </div>
              <div>
                <dt className="text-chrome/50">Coverage</dt>
                <dd className="mt-1 text-white">NC Triangle</dd>
              </div>
              <div>
                <dt className="text-chrome/50">Response</dt>
                <dd className="mt-1 text-white">Within the hour</dd>
              </div>
            </dl>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
