import { BeadingDemo } from "./BeadingDemo";
import { HeadlightDemo } from "./HeadlightDemo";
import { SurfaceDemo, type SurfaceKind } from "./SurfaceDemo";

/**
 * Interactive, photography-free service demonstrations. Each maps a service
 * slug to a self-contained CSS/SVG demo a visitor can scrub or watch:
 *
 *   ceramic-coating       → water beading / hydrophobic sheen
 *   paint-correction      → swirl marks → mirror correction (slider)
 *   headlight-restoration → cloudy → clear lens (slider)
 *   exterior-detail       → dull → sealed gloss (slider)
 *   full-detail           → dull → sealed gloss (slider)
 *   wash-and-wax          → dull → sealed gloss (slider)
 *   interior-detail       → soiled → cleaned cabin surface (slider)
 *
 * Services without a meaningful visual transformation (odor-removal,
 * engine-bay-cleaning) intentionally have no demo — the resolver returns
 * null and callers fall back to their existing cinematic visual.
 */

const surfaceFor: Partial<Record<string, SurfaceKind>> = {
  "paint-correction": "swirl",
  "exterior-detail": "gloss",
  "full-detail": "gloss",
  "wash-and-wax": "gloss",
  "interior-detail": "grime",
};

const DEMO_SLUGS = new Set<string>([
  "ceramic-coating",
  "headlight-restoration",
  ...Object.keys(surfaceFor),
]);

export function hasServiceDemo(slug: string): boolean {
  return DEMO_SLUGS.has(slug);
}

export function ServiceDemo({ slug, className = "" }: { slug: string; className?: string }) {
  if (slug === "ceramic-coating") return <BeadingDemo className={className} />;
  if (slug === "headlight-restoration") return <HeadlightDemo className={className} />;
  const kind = surfaceFor[slug];
  if (kind) return <SurfaceDemo kind={kind} className={className} />;
  return null;
}

/** True when the slug's demo is a draggable before/after (i.e. not beading). */
function isSliderDemo(slug: string): boolean {
  return hasServiceDemo(slug) && slug !== "ceramic-coating";
}

/**
 * Framed presentation of a service demo: keeps the cinematic aspect ratio,
 * chrome hairline border, and a subtle interaction hint consistent wherever
 * a demo is rendered. Returns null when the slug has no demo so callers can
 * fall back to their existing visual.
 */
export function ServiceDemoFrame({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  if (!hasServiceDemo(slug)) return null;
  return (
    <div
      className={`group relative overflow-hidden rounded-sm ring-1 ring-chrome-line shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] ${className}`}
    >
      <ServiceDemo slug={slug} className="h-full w-full" />
      {/* Thin chrome corner accents for the luxury frame feel */}
      <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l border-t border-shine/50" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b border-r border-shine/50" />
      {isSliderDemo(slug) && (
        <span className="pointer-events-none absolute bottom-3 right-3 z-10 hidden items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-chrome/90 backdrop-blur sm:inline-flex">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
          </svg>
          Drag to compare
        </span>
      )}
    </div>
  );
}
