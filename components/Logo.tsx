import type { CSSProperties } from "react";

type LogoProps = {
  /**
   * "dark"  → for placement on dark/black surfaces (M is white).
   * "light" → for placement on white/light surfaces (M switches to near-black
   *           so the mark stays visible). The blue S and DETAILING are unchanged.
   */
  variant?: "dark" | "light";
  /** Show the "DETAILING" wordmark beneath the MS monogram. */
  showWordmark?: boolean;
  className?: string;
  /** Accessible label; the SVG is exposed as an image to screen readers. */
  title?: string;
};

/**
 * Inline SVG recreation of the MS Detailing mark: a sharp, italic "MS" monogram
 * (white M + shine-blue S) above the blue "DETAILING" wordmark. Recreated in SVG
 * so it stays crisp at any size and adapts to light/dark backgrounds via `variant`.
 *
 * To use the real raster logo instead, drop it at /public/logo.png and render it
 * with next/image — but this vector version is preferred for the header.
 */
export function Logo({
  variant = "dark",
  showWordmark = true,
  className,
  title = "Moh's Shine Detailing",
}: LogoProps) {
  const mColor = variant === "dark" ? "#FFFFFF" : "#0E1318";
  const accent = "#38B6FF";

  // Italic skew + bold Poppins to echo the athletic, slanted brand mark.
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

  // Both lines are centered on the same x so the wordmark sits under the
  // monogram; the viewBox is wide enough that the letter-spaced "DETAILING"
  // never clips at the edges.
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
        <text
          x={cx}
          y="84"
          textAnchor="middle"
          fill={accent}
          style={wordmarkStyle}
        >
          DETAILING
        </text>
      )}
    </svg>
  );
}
