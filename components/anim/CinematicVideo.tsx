"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { MediaSource } from "@/lib/media";

type CinematicVideoProps = {
  /**
   * Video source. Accepts:
   *   - a `MediaSource` object: `{ local: '/videos/x.mp4', temp: '...' }`
   *   - a plain string (treated as local)
   *   - undefined (skips video entirely)
   * The component tries local first; if it fails to load it swaps to temp.
   */
  video?: MediaSource | string;
  /** Poster image — same dual-source contract as `video`. */
  poster?: MediaSource | string;
  /** Optional tag rendered in the top-left corner of the frame. */
  tag?: string;
  /** Optional accessible description for the visual. */
  alt?: string;
  /** Rendered when there is no usable video and no usable poster. */
  fallback?: ReactNode;
  /** Drop the corner ticks + frame inset when used as a full-bleed bg. */
  bare?: boolean;
  /** Skip the dark gradient overlay (e.g. parent provides one). */
  noOverlay?: boolean;
  className?: string;
  /** Children rendered above the dark overlay (e.g. caption, slider). */
  children?: ReactNode;
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const normalise = (m: MediaSource | string | undefined): MediaSource =>
  typeof m === "string" ? { local: m } : (m ?? {});

/**
 * Cinematic video / poster panel.
 *
 * Resolution order — local first, then temp, then nothing:
 *   1. Try the local path (`poster.local`, `video.local`).
 *   2. On 404 / error, swap to the temp URL.
 *   3. If both fail, render the caller-supplied `fallback` (typically the
 *      CinematicPanel with the brand icon).
 *
 * Lazy-loads via IntersectionObserver, plays muted/looped/inline so mobile
 * browsers honour autoplay, and always layers a dark gradient overlay so
 * text reads cleanly over the footage.
 */
export function CinematicVideo({
  video,
  poster,
  tag,
  alt = "",
  fallback,
  bare = false,
  noOverlay = false,
  className = "",
  children,
}: CinematicVideoProps) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(containerRef, { margin: "150px" });

  const v = normalise(video);
  const p = normalise(poster);

  /* --------------------- Poster src state ------------------------ */
  // Start on whichever source we have, preferring local. If onError fires
  // and we have a temp left to try, swap to it. After that, give up.
  const initialPoster = p.local ?? p.temp;
  const [posterSrc, setPosterSrc] = useState<string | undefined>(initialPoster);
  const [posterTriedTemp, setPosterTriedTemp] = useState<boolean>(!p.local);
  const [posterFailed, setPosterFailed] = useState<boolean>(!initialPoster);

  const onPosterError = () => {
    if (!posterTriedTemp && p.temp) {
      setPosterSrc(p.temp);
      setPosterTriedTemp(true);
    } else {
      setPosterFailed(true);
    }
  };

  // The poster 404 can fire before React hydrates and attaches onError.
  // Re-check on mount: if it already failed, run the fallback now.
  const posterImgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = posterImgRef.current;
    if (img && img.complete && img.naturalWidth === 0) onPosterError();
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* --------------------- Video src state ------------------------- */
  const initialVideo = v.local ?? v.temp;
  const [videoSrc, setVideoSrc] = useState<string | undefined>(initialVideo);
  const [videoTriedTemp, setVideoTriedTemp] = useState<boolean>(!v.local);
  const [videoFailed, setVideoFailed] = useState<boolean>(!initialVideo);
  const [videoStarted, setVideoStarted] = useState(false);

  const onVideoError = () => {
    if (!videoTriedTemp && v.temp) {
      setVideoSrc(v.temp);
      setVideoTriedTemp(true);
      // Force reload after src swap
      requestAnimationFrame(() => videoRef.current?.load());
    } else {
      setVideoFailed(true);
    }
  };

  const allowVideo = !!videoSrc && !videoFailed && !reduce;
  const hasPoster = !!posterSrc && !posterFailed;
  const renderFallback = !allowVideo && !hasPoster;

  /* --------------------- Lazy play ------------------------------- */
  useEffect(() => {
    if (!allowVideo || !inView) return;
    const el = videoRef.current;
    if (!el) return;
    if (el.readyState === 0) el.load();
    void el.play().catch(() => {});
  }, [allowVideo, inView, videoSrc]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-sm border border-chrome-line bg-navy-900 ${className}`}
    >
      {/* Poster — instant first paint underneath the video. */}
      {hasPoster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={posterImgRef}
          src={posterSrc}
          alt={alt}
          loading="lazy"
          onError={onPosterError}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      )}

      {/* Video — fades in once playing. */}
      {allowVideo && (
        <video
          ref={videoRef}
          poster={posterSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          onError={onVideoError}
          onPlaying={() => setVideoStarted(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoStarted ? "opacity-100" : "opacity-0"
          }`}
          aria-label={alt}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* CSS fallback when no media of any kind resolves. */}
      {renderFallback && fallback}

      {/* Dark gradient overlay — text readability over any footage. */}
      {!noOverlay && (allowVideo || hasPoster) && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/80"
        />
      )}

      {/* Luxury frame + corner accents. */}
      {!bare && (
        <>
          <div
            className="pointer-events-none absolute inset-3 rounded-sm border border-chrome-line"
            aria-hidden="true"
          />
          <CornerTick className="left-4 top-4" />
          <CornerTick className="right-4 top-4" rotate={90} />
          <CornerTick className="left-4 bottom-4" rotate={-90} />
          <CornerTick className="right-4 bottom-4" rotate={180} />
        </>
      )}

      {tag && !bare && (
        <span className="absolute left-6 top-6 z-10 font-mono text-[10px] uppercase tracking-widest text-chrome">
          {tag}
        </span>
      )}

      {!bare && (
        <span className="absolute bottom-6 right-6 z-10 font-mono text-[10px] uppercase tracking-widest text-chrome/60">
          MS / Detailing
        </span>
      )}

      {children && <div className="relative z-20">{children}</div>}

      {videoStarted && !bare && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute right-6 top-6 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-chrome"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-shine" />
          Live
        </motion.span>
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
