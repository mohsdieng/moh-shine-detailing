"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { MediaSource } from "@/lib/media";

/**
 * Normalise a MediaSource | string into a MediaSource object.
 * Plain strings are treated as local paths (no temp fallback).
 */
const normalise = (m: MediaSource | string): MediaSource =>
  typeof m === "string" ? { local: m } : m;

type BeforeAfterProps = {
  /** "Before" image — MediaSource or plain local path string. */
  before: MediaSource | string;
  /** "After" image — MediaSource or plain local path string. */
  after: MediaSource | string;
  alt: string;
  className?: string;
  /** Initial divider position (0..100). */
  initial?: number;
  /**
   * Optional CSS `filter` applied only to the image layers — useful for
   * giving placeholder pairs visual variety (e.g. `"hue-rotate(35deg)"`).
   * When a GalleryItem has no real "before" photo, Gallery.tsx passes the
   * same "after" source for both sides and sets this to a dark/desaturated
   * filter so the left half reads as a convincing un-detailed state.
   */
  filter?: string;
};

/**
 * Drag/hover-to-reveal before/after comparison slider.
 *
 * Both `before` and `after` accept a `MediaSource` object `{ local, temp }`
 * or a plain string (treated as a local path). Uses plain `<img>` tags with
 * `onError` handlers so the local → temp fallback chain works client-side.
 *
 * Pointer events handle mouse and touch; arrow keys move the slider for
 * keyboard users.
 */
export function BeforeAfter({
  before,
  after,
  alt,
  className = "",
  initial = 50,
  filter,
}: BeforeAfterProps) {
  const bSrc = normalise(before);
  const aSrc = normalise(after);

  /* ---- image src state with local → temp fallback ---- */
  const [beforeSrc, setBeforeSrc] = useState(bSrc.local ?? bSrc.temp ?? "");
  const [beforeTriedTemp, setBeforeTriedTemp] = useState(!bSrc.local);

  const [afterSrc, setAfterSrc] = useState(aSrc.local ?? aSrc.temp ?? "");
  const [afterTriedTemp, setAfterTriedTemp] = useState(!aSrc.local);

  const onBeforeError = () => {
    if (!beforeTriedTemp && bSrc.temp) {
      setBeforeSrc(bSrc.temp);
      setBeforeTriedTemp(true);
    }
  };

  const onAfterError = () => {
    if (!afterTriedTemp && aSrc.temp) {
      setAfterSrc(aSrc.temp);
      setAfterTriedTemp(true);
    }
  };

  // A 404 can fire before React hydrates and attaches onError (especially for
  // images the browser begins fetching close to the viewport). Re-check on
  // mount: if an image already failed, swap it to the temp source now.
  const beforeImgRef = useRef<HTMLImageElement>(null);
  const afterImgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const b = beforeImgRef.current;
    if (b && b.complete && b.naturalWidth === 0) onBeforeError();
    const a = afterImgRef.current;
    if (a && a.complete && a.naturalWidth === 0) onAfterError();
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- slider logic (unchanged) ---- */
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setFromClientX(e.clientX);
  };

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
  };

  return (
    <div
      ref={wrapRef}
      className={`relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-white/10 bg-slate-card ${className}`}
      onPointerDown={(e) => {
        setDragging(true);
        setFromClientX(e.clientX);
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => {
        setDragging(false);
        (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
      }}
      onPointerCancel={() => setDragging(false)}
    >
      {/* Image layers — optional CSS filter scoped to this wrapper. */}
      <div className="absolute inset-0" style={filter ? { filter } : undefined}>
        {/* Base layer: AFTER (full image). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={afterImgRef}
          src={afterSrc}
          alt={`After: ${alt}`}
          loading="lazy"
          onError={onAfterError}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        {/* Top layer: BEFORE, clipped right based on slider position. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={beforeImgRef}
            src={beforeSrc}
            alt=""
            loading="lazy"
            onError={onBeforeError}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </div>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-shine/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-black backdrop-blur">
        After
      </span>

      {/* Divider + handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Before/after comparison: ${alt}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKey}
        className="absolute inset-y-0 z-10 -ml-px w-[2px] cursor-ew-resize bg-shine shadow-[0_0_30px_2px_rgba(56,182,255,0.5)] focus:outline-none"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-shine bg-black text-shine shadow-lg">
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
            <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
