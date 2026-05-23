"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

type BeforeAfterProps = {
  before: string;
  after: string;
  alt: string;
  className?: string;
  /** Initial divider position (0..100). */
  initial?: number;
  /**
   * Optional CSS `filter` value applied only to the image layers — useful for
   * giving placeholder pairs visual variety (e.g. `"hue-rotate(35deg)"`).
   */
  filter?: string;
};

/**
 * Drag/hover-to-reveal before/after comparison slider.
 * Pointer events handle both mouse and touch; arrow keys move the slider
 * for keyboard users (focus the divider handle).
 */
export function BeforeAfter({
  before,
  after,
  alt,
  className = "",
  initial = 50,
  filter,
}: BeforeAfterProps) {
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
      {/* Image layers wrapped together so the optional filter applies only here. */}
      <div className="absolute inset-0" style={filter ? { filter } : undefined}>
        {/* Base layer: AFTER (full image). */}
        <Image
          src={after}
          alt={`After: ${alt}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={false}
        />
        {/* Top layer: BEFORE, clipped from the right based on pos. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden="true"
        >
          <Image
            src={before}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-shine/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-black backdrop-blur">
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
