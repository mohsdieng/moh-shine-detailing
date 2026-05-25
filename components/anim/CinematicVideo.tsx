"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type CinematicVideoProps = {
  /**
   * Path to the primary video file under /public/videos/. Optional —
   * the component degrades gracefully to the poster image, then to the
   * `fallback` child if neither is available.
   */
  videoSrc?: string;
  /** Optional secondary source (e.g. .webm next to .mp4) for broader codec support. */
  videoSrcWebm?: string;
  /**
   * Path to a poster JPG/PNG under /public/posters/. Shown until the video
   * is ready to play, and as a graceful fallback if the video errors.
   */
  posterSrc?: string;
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

/**
 * Cinematic video / poster panel.
 *
 * Behaviour:
 *  - Lazy-loads the video only once the container enters the viewport.
 *  - Plays muted, looped, inline — required for mobile autoplay.
 *  - Renders the poster behind the video so first paint is instant.
 *  - If the video errors (file missing, codec unsupported), keeps the
 *    poster. If the poster also errors, renders the `fallback` child.
 *  - Respects prefers-reduced-motion (shows poster only, never plays).
 *  - Always renders a dark gradient overlay so any text over the panel
 *    stays readable on light footage.
 */
export function CinematicVideo({
  videoSrc,
  videoSrcWebm,
  posterSrc,
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

  const [videoFailed, setVideoFailed] = useState(!videoSrc);
  const [posterFailed, setPosterFailed] = useState(!posterSrc);
  const [videoStarted, setVideoStarted] = useState(false);

  const allowVideo = !!videoSrc && !videoFailed && !reduce;
  const hasPoster = !!posterSrc && !posterFailed;
  const renderFallback = !allowVideo && !hasPoster;

  // Lazy load: attach src + try to play only after the panel scrolls into view.
  useEffect(() => {
    if (!allowVideo || !inView) return;
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState === 0) video.load();
    // Calling play() may throw on stricter browsers — swallow it; the poster
    // continues to be visible if autoplay is rejected.
    void video.play().catch(() => {});
  }, [allowVideo, inView]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-sm border border-chrome-line bg-navy-900 ${className}`}
    >
      {/* Poster — always renders behind so first paint is instant. */}
      {hasPoster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterSrc}
          alt={alt}
          loading="lazy"
          onError={() => setPosterFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      )}

      {/* Video — fades in once it's playing. */}
      {allowVideo && (
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
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoStarted ? "opacity-100" : "opacity-0"
          }`}
          aria-label={alt}
        >
          {videoSrcWebm && <source src={videoSrcWebm} type="video/webm" />}
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
      )}

      {/* Fallback (CSS cinematic panel, etc) when no media present at all. */}
      {renderFallback && fallback}

      {/* Dark gradient overlay — readability for any text over the panel. */}
      {!noOverlay && (allowVideo || hasPoster) && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/80"
        />
      )}

      {/* Hairline frame + corner accents — pure luxury chrome detail. */}
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

      {/* Caller content (e.g. play indicator, captions) above everything */}
      {children && <div className="relative z-20">{children}</div>}

      {/* Subtle "playing" indicator (only when video is rolling) */}
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
