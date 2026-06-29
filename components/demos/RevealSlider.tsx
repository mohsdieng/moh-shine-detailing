"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";

type RevealSliderProps = {
  /** Layer shown on the LEFT of the divider (e.g. the "before" state). */
  before: ReactNode;
  /** Base layer shown on the RIGHT / underneath (e.g. the "after" state). */
  after: ReactNode;
  /** Accessible description of what's being compared. */
  label: string;
  /** Small caption chips rendered top-left / top-right. */
  beforeLabel?: string;
  afterLabel?: string;
  /** Initial divider position 0..100. */
  initial?: number;
  className?: string;
};

/**
 * Generic, accessible before/after reveal slider that clips an arbitrary
 * `before` node over an `after` node — used by the CSS/SVG service demos
 * (no photographs required). Pointer + touch drag, plus full keyboard
 * support (focus the handle, arrow keys). No auto-animation, so it's inert
 * and safe under prefers-reduced-motion.
 */
export function RevealSlider({
  before,
  after,
  label,
  beforeLabel = "Before",
  afterLabel = "After",
  initial = 50,
  className = "",
}: RevealSliderProps) {
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

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
    if (e.key === "Home") setPos(0);
    if (e.key === "End") setPos(100);
  };

  return (
    <div
      ref={wrapRef}
      className={`relative h-full w-full select-none overflow-hidden ${className}`}
      onPointerDown={(e) => {
        setDragging(true);
        setFromClientX(e.clientX);
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => dragging && setFromClientX(e.clientX)}
      onPointerUp={(e) => {
        setDragging(false);
        (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
      }}
      onPointerCancel={() => setDragging(false)}
    >
      {/* AFTER — base layer */}
      <div className="absolute inset-0">{after}</div>

      {/* BEFORE — clipped from the right based on position */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden="true">
        {before}
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-shine/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-black backdrop-blur">
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKey}
        className="absolute inset-y-0 z-10 -ml-px w-[2px] cursor-ew-resize bg-shine shadow-[0_0_30px_2px_rgba(56,182,255,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
