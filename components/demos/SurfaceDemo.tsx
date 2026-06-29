import type { CSSProperties } from "react";
import { RevealSlider } from "./RevealSlider";

/**
 * Pure-CSS "surface" service demo — no photography. Renders a draggable
 * before/after of two generated surfaces so visitors can scrub the
 * transformation themselves:
 *
 *   - "swirl" : swirl-marked paint  → corrected mirror gloss (Paint Correction)
 *   - "gloss" : dull / matte finish → sealed glossy finish    (Exterior / Full / Wash)
 *   - "grime" : soiled cabin surface → clean conditioned surface (Interior)
 *
 * Inert and accessible (RevealSlider handles keyboard + pointer); safe under
 * reduced motion since there's no auto-animation.
 */
export type SurfaceKind = "swirl" | "gloss" | "grime";

/** Base panel + a soft studio key light, shared by every surface. */
const baseDark =
  "radial-gradient(120% 90% at 72% 18%, #14202c 0%, #0a121b 45%, #04070c 100%)";

/** A bright diagonal sheen band — the hallmark of a glossy, corrected finish. */
const glossSheen =
  "linear-gradient(118deg, transparent 38%, rgba(120,190,255,0.16) 47%, rgba(255,255,255,0.30) 50%, rgba(120,190,255,0.16) 53%, transparent 62%)";

const surfaces: Record<SurfaceKind, { before: CSSProperties; after: CSSProperties }> = {
  swirl: {
    before: {
      backgroundColor: "#05080c",
      backgroundImage: [
        // faint circular micro-marring catching the light
        "repeating-radial-gradient(circle at 32% 30%, rgba(255,255,255,0.07) 0 1px, transparent 1px 8px)",
        "repeating-radial-gradient(circle at 68% 64%, rgba(255,255,255,0.05) 0 1px, transparent 1px 9px)",
        baseDark,
      ].join(","),
    },
    after: {
      backgroundColor: "#05080c",
      backgroundImage: [glossSheen, baseDark].join(","),
    },
  },
  gloss: {
    before: {
      backgroundColor: "#0a0f15",
      backgroundImage:
        "radial-gradient(120% 90% at 72% 18%, #161d24 0%, #0c1117 55%, #05080c 100%)",
      filter: "saturate(0.7) brightness(0.82)",
    },
    after: {
      backgroundColor: "#05080c",
      backgroundImage: [glossSheen, baseDark].join(","),
    },
  },
  grime: {
    before: {
      backgroundColor: "#0c0a08",
      backgroundImage: [
        // dust / speckle
        "radial-gradient(rgba(180,150,110,0.10) 1px, transparent 1.4px)",
        "radial-gradient(120% 90% at 70% 20%, #241d15 0%, #140f0a 55%, #0a0705 100%)",
      ].join(","),
      backgroundSize: "9px 9px, 100% 100%",
    },
    after: {
      // clean conditioned leather: warm dark with a soft sheen
      backgroundColor: "#0b0a09",
      backgroundImage: [
        "linear-gradient(118deg, transparent 40%, rgba(255,236,200,0.10) 49%, rgba(255,255,255,0.16) 51%, transparent 60%)",
        "radial-gradient(120% 90% at 72% 18%, #2a2118 0%, #161009 60%, #0a0705 100%)",
      ].join(","),
    },
  },
};

const captions: Record<SurfaceKind, { before: string; after: string; alt: string }> = {
  swirl: { before: "Swirled", after: "Corrected", alt: "Paint correction: swirl marks corrected to a mirror finish" },
  gloss: { before: "Dull", after: "Sealed", alt: "Exterior detail: dull finish sealed to a deep gloss" },
  grime: { before: "Soiled", after: "Cleaned", alt: "Interior detail: soiled cabin surface cleaned and conditioned" },
};

export function SurfaceDemo({ kind, className = "" }: { kind: SurfaceKind; className?: string }) {
  const s = surfaces[kind];
  const c = captions[kind];
  return (
    <RevealSlider
      className={className}
      label={c.alt}
      beforeLabel={c.before}
      afterLabel={c.after}
      before={<div className="h-full w-full" style={s.before} aria-hidden="true" />}
      after={<div className="h-full w-full" style={s.after} aria-hidden="true" />}
    />
  );
}
