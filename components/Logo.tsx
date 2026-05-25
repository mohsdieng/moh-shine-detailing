"use client";

import { useEffect, useState, type CSSProperties } from "react";

type LogoProps = {
  /**
   * "dark"  → for placement on dark/black surfaces (M is white).
   * "light" → for placement on white/light surfaces (M switches to near-black
   *           so the mark stays visible). The blue S and DETAILING are unchanged.
   * Note: when the bitmap /logo.png exists, the variant only affects the SVG
   * fallback — the bitmap is rendered as-is.
   */
  variant?: "dark" | "light";
  /** Show the "DETAILING" wordmark beneath the MS monogram (SVG fallback only). */
  showWordmark?: boolean;
  className?: string;
  /** Accessible label exposed to assistive tech. */
  title?: string;
};

/**
 * Logo component.
 *
 * Strategy:
 *  1. On mount, probe `/logo.png` with `new Image()` in the background.
 *  2. While probing (or if the file is missing), render the inline SVG
 *     monogram so the header is never visually broken.
 *  3. Once the bitmap loads, swap it in seamlessly.
 *
 * This avoids the "broken image / alt-text flash" you get if you just render
 * an <img> tag pointing at a file that doesn't exist yet.
 *
 * Drop the new brand bitmap at /public/logo.png to enable it site-wide.
 */
export function Logo({
  variant = "dark",
  showWordmark = true,
  className,
  title = "Moh's Shine Detailing",
}: LogoProps) {
  const [bitmapReady, setBitmapReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const probe = new window.Image();
    probe.onload = () => setBitmapReady(true);
    // onerror intentionally a no-op — we just stay on the SVG fallback.
    probe.src = "/logo.png";
  }, []);

  if (bitmapReady) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/logo.png"
        alt={title}
        className={className}
        style={{ height: "100%", width: "auto", objectFit: "contain" }}
      />
    );
  }

  return (
    <LogoSvg
      variant={variant}
      showWordmark={showWordmark}
      className={className}
      title={title}
    />
  );
}

/* ------------------------------------------------------------------ */
/* SVG fallback                                                       */
/* ------------------------------------------------------------------ */

function LogoSvg({
  variant,
  showWordmark,
  className,
  title,
}: {
  variant: "dark" | "light";
  showWordmark: boolean;
  className?: string;
  title: string;
}) {
  const mColor = variant === "dark" ? "#FFFFFF" : "#0E1318";
  const accent = "#38B6FF";

  const monogramStyle: CSSProperties = {
    fontFamily: "var(--font-poppins), system-ui, sans-serif",
    fontWeight: 800,
    fontStyle: "italic",
    fontSize: "60px",
    letterSpacing: "-2px",
  };

  const wordmarkStyle: CSSProperties = {
    fontFamily: "var(--font-poppins), system-ui, sans-serif",
    fontWeight: 600,
    fontStyle: "italic",
    fontSize: "15px",
    letterSpacing: "7px",
  };

  const cx = 130;

  return (
    <svg
      viewBox="0 0 260 100"
      className={className}
      role="img"
      aria-label={title}
      style={{ height: "100%", width: "auto" }}
    >
      <title>{title}</title>
      <text x={cx} y="56" textAnchor="middle" style={monogramStyle}>
        <tspan fill={mColor}>M</tspan>
        <tspan fill={accent}>S</tspan>
      </text>
      {showWordmark && (
        <text x={cx} y="84" textAnchor="middle" fill={accent} style={wordmarkStyle}>
          DETAILING
        </text>
      )}
    </svg>
  );
}
