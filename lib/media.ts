/**
 * Central media registry for the site.
 *
 * Two-tier resolution — REAL always wins over TEMP:
 *
 *   1. REAL ── local files dropped into /public/posters/ or /public/videos/.
 *      When the file exists at the local path, the component renders it.
 *
 *   2. TEMP ── external Unsplash / stock URLs that fill the site out with
 *      cinematic luxury automotive visuals while you build a real gallery.
 *
 * Replacement workflow (no code change required to start):
 *   • Drop your real photo at the local path written below.
 *   • The CinematicVideo / BeforeAfter components try the local path first
 *     and gracefully swap to the temp URL only if the local file 404s.
 *
 * Removing TEMP entirely (once you have real work everywhere):
 *   • Delete the temp constants used by a given slug, or replace them
 *     with `undefined`. The component will then either render your local
 *     file (preferred) or fall back to the SVG cinematic panel.
 *
 * NOTE: every temp URL points to a publicly accessible Unsplash photo
 * (Unsplash License — free for commercial use). All entries clearly
 * marked so you can swap them out at your own pace.
 */

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Build a properly-sized, cached Unsplash CDN URL from a photo ID. */
const unsplash = (id: string, opts: { w?: number; q?: number } = {}) => {
  const w = opts.w ?? 1920;
  const q = opts.q ?? 85;
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&fm=jpg&fit=crop&crop=entropy&auto=format`;
};

/** Compact representation of a resolvable media source. */
export type MediaSource = {
  /** Path under /public/ (preferred). */
  local?: string;
  /** External URL fallback shown until the local file exists. */
  temp?: string;
};

export type ServiceMedia = {
  poster?: MediaSource;
  video?: MediaSource;
};

/* ------------------------------------------------------------------ */
/* Hero + per-service media                                           */
/* ------------------------------------------------------------------ */

/**
 * Per-slug media catalogue. Slugs match the home Feature sections and
 * each entry in `lib/services.ts`. Add or remove temp entries freely.
 */
export const SERVICE_MEDIA: Record<string, ServiceMedia> = {
  hero: {
    // TEMP: Mercedes-Benz studio shot — cinematic / dark / luxurious.
    poster: { local: "/posters/hero.jpg", temp: unsplash("1710343491609-0cbc6c14b92d") },
    // No temp video — Unsplash doesn't serve mp4. Drop your own at this path
    // to enable the full-bleed hero video.
    video: { local: "/videos/hero.mp4" },
  },
  "wash-and-wax": {
    poster: { local: "/posters/wash-and-wax.jpg", temp: unsplash("1594051673969-172a6f721d3c") },
    video: { local: "/videos/wash-and-wax.mp4" },
  },
  "exterior-detail": {
    poster: { local: "/posters/exterior-detail.jpg", temp: unsplash("1714434087671-06325b90f26a") },
    video: { local: "/videos/exterior-detail.mp4" },
  },
  "interior-detail": {
    poster: { local: "/posters/interior-detail.jpg", temp: unsplash("1599912027667-755b68b4dd3b") },
    video: { local: "/videos/interior-detail.mp4" },
  },
  "full-detail": {
    poster: { local: "/posters/full-detail.jpg", temp: unsplash("1621592773340-dbf8760fde8b") },
    video: { local: "/videos/full-detail.mp4" },
  },
  "paint-correction": {
    poster: { local: "/posters/paint-correction.jpg", temp: unsplash("1708805282706-f44730b7e527") },
    video: { local: "/videos/paint-correction.mp4" },
  },
  "ceramic-coating": {
    poster: { local: "/posters/ceramic-coating.jpg", temp: unsplash("1589750602846-60028879da9b") },
    video: { local: "/videos/ceramic-coating.mp4" },
  },
  "headlight-restoration": {
    poster: { local: "/posters/headlight-restoration.jpg", temp: unsplash("1708226633190-d5b9fe523b24") },
    video: { local: "/videos/headlight-restoration.mp4" },
  },
  "odor-removal": {
    // No clearly-appropriate temp found — fall back to the cinematic CSS panel.
    poster: { local: "/posters/odor-removal.jpg", temp: unsplash("1649136378672-b965cb9935d5") },
    video: { local: "/videos/odor-removal.mp4" },
  },
  "engine-bay-cleaning": {
    // No clearly-appropriate temp found — fall back to the cinematic CSS panel
    // until you provide a real shot of a freshly-detailed engine bay.
    poster: { local: "/posters/engine-bay-cleaning.jpg" },
    video: { local: "/videos/engine-bay-cleaning.mp4" },
  },
};

/** Convenience accessor — returns the media entry for a slug. */
export function mediaFor(slug: string): ServiceMedia {
  return SERVICE_MEDIA[slug] ?? {};
}

/* ------------------------------------------------------------------ */
/* Gallery items                                                      */
/* ------------------------------------------------------------------ */

export type GalleryItem = {
  /** Stable slug used as the React key. */
  id: string;
  /** Short caption under the card. */
  label: string;
  /** Which service this work demonstrates. */
  service: string;
  /** City / neighborhood (chip on the card). */
  location: string;
  /** "After" image — the finished result. */
  after: MediaSource;
  /**
   * Optional "before" image. When omitted, the BeforeAfter slider renders
   * the SAME `after` image on both sides with a dark/desaturated CSS filter
   * applied to the left half so the slider still demonstrates the
   * transformation visually. Replace with your real before photo over time.
   */
  before?: MediaSource;
  /** Set to true when this row is your real client work (handy for filters). */
  real?: boolean;
};

/**
 * Temporary gallery seeded with luxury automotive shots so the section
 * feels finished from day one. As you complete real client jobs, add new
 * entries with `real: true` and let the temp ones age out — or just keep
 * appending and let the grid grow.
 */
export const GALLERY: GalleryItem[] = [
  {
    id: "bmw-m3-paint",
    label: "M3 Coupe — paint correction",
    service: "Paint Correction",
    location: "Raleigh",
    after: { local: "/gallery/bmw-m3-after.jpg", temp: unsplash("1621592773340-dbf8760fde8b") },
  },
  {
    id: "mercedes-full-detail",
    label: "C-Class — full detail",
    service: "Full Detail",
    location: "Durham",
    after: { local: "/gallery/mercedes-after.jpg", temp: unsplash("1710343491609-0cbc6c14b92d") },
  },
  {
    id: "ceramic-water-beading",
    label: "Daily driver — ceramic coating",
    service: "Ceramic Coating",
    location: "Cary",
    after: { local: "/gallery/ceramic-after.jpg", temp: unsplash("1589750602846-60028879da9b") },
  },
  {
    id: "exterior-front-end",
    label: "BMW M-series — exterior reset",
    service: "Exterior Detail",
    location: "Wake Forest",
    after: { local: "/gallery/bmw-front-after.jpg", temp: unsplash("1714434087671-06325b90f26a") },
  },
  {
    id: "interior-leather",
    label: "Leather interior — deep clean",
    service: "Interior Detail",
    location: "Chapel Hill",
    after: { local: "/gallery/interior-after.jpg", temp: unsplash("1599912027667-755b68b4dd3b") },
  },
  {
    id: "headlight-restoration",
    label: "Headlights — restored clarity",
    service: "Headlight Restoration",
    location: "Apex",
    after: { local: "/gallery/headlight-after.jpg", temp: unsplash("1708226633190-d5b9fe523b24") },
  },
];
