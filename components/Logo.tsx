"use client";

import { useState, type CSSProperties } from "react";

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
 * 1. By default, renders the real high-resolution brand mark from
 *    `/public/logo.png` (the chrome "MOH'S Shine Detailing" badge with the
 *    detail-car illustration + ribbon).
 * 2. If that file is missing or fails to load, falls back to an inline SVG
 *    monogram so the layout never breaks during development or when assets
 *    are still being uploaded.
 *
 * Replace `/public/logo.png` to update the brand mark site-wide.
 */
export function Logo({
  variant = "dark",
  showWordmark = true,
  className,
  title = "Moh's Shine Detailing",
}: LogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!imgFailed) {
    // Native <img> rather than next/image so a missing file degrades
    // gracefully (we catch onError) instead of throwing at build time.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/logo.png"
        alt={title}
        onError={() => setImgFailed(true)}
        className={className}
        style={{ height: "100%", width: "auto", objectFit: "contain" }}
      />
    );
  }

  return <LogoSvg variant={variant} showWordmark={showWordmark} className={className} title={title} />;
}

/* ------------------------------------------------------------------ */
/* SVG fallback                                                       */
/* ------------------------------------------------------------------ */

function LogoSvg({
  variant,
  showWordmark,
  className,
  title,
}: Required<Omit<LogoProps, "variant" | "showWordmark" | "title" | "className">> & {
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
