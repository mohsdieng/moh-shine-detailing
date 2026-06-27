/**
 * Central business configuration — the single source of truth for everything
 * the site renders about Moh's Shine Detailing & Ceramic Coating.
 *
 * LAUNCH RULE: never display or emit fake data. Any value that isn't confirmed
 * is left as an empty string / null and is gracefully hidden by the UI and
 * omitted from JSON-LD. Search the file for `TODO(launch)` to find everything
 * that must be filled in before go-live.
 */

export const site = {
  /* ---- Confirmed identity ------------------------------------------ */
  /** Full business name (used in titles, schema, footer). */
  name: "Moh's Shine Detailing & Ceramic Coating",
  /** Compact label for tight UI (logo alt, etc.). */
  shortName: "Moh's Shine",
  /** Catchphrase from the logo ribbon. */
  motto: "Flawless Shine, Anywhere, Anytime",
  /** Plain-language service description. */
  serviceType: "Mobile auto detailing and ceramic coating",
  tagline: "Premium mobile auto detailing & ceramic coating in the Raleigh–Durham Triangle.",
  description:
    "Moh's Shine Detailing & Ceramic Coating is a mobile auto detailing and ceramic coating service for Raleigh, Cary, Durham and the surrounding NC Triangle. Interior, exterior, paint correction and ceramic coating — we come to you.",

  /** Production domain — used for canonical URLs, sitemap and Open Graph. */
  url: "https://mohshinedetailing.com",

  /* ---- Contact channels -------------------------------------------- */
  /* Empty values are hidden in the UI and omitted from structured data.   */
  /* TODO(launch): fill each of these with the real, confirmed value.       */

  // TODO(launch): real phone, e.g. "(919) 000-0000"
  phone: "",
  // TODO(launch): matching tel: link, e.g. "tel:+19190000000"
  phoneHref: "",
  // TODO(launch): public contact email. Candidate from the owner:
  //   mohsdieng@mohshinedetailing.com — confirm it's the public address first.
  email: "",
  // TODO(launch): matching mailto: link, e.g. "mailto:hello@mohshinedetailing.com"
  emailHref: "",
  // TODO(launch): confirmed Square Appointments URL. While empty, every
  // "Book Now" CTA routes to the on-site /contact page instead (see bookHref).
  bookingUrl: "",

  social: {
    // TODO(launch): real profile URLs. Empty links are hidden + dropped from sameAs.
    instagram: "",
    tiktok: "",
    // TODO(launch): Google Business Profile review URL (enables the reviews CTA).
    google: "",
  },

  /* ---- Service area (mirrors the published cities in lib/cities.ts) ---- */
  areaServed: [
    "Raleigh, NC",
    "Cary, NC",
    "Durham, NC",
    "Morrisville, NC",
    "Apex, NC",
    "Wake Forest, NC",
    "Garner, NC",
    "Chapel Hill, NC",
  ],

  /**
   * Mobile business — no public street address. We expose only the operating
   * locality/region/country (no street or postal code, which would be fake).
   */
  address: { locality: "Raleigh", region: "NC", country: "US" },

  /**
   * Map coordinates. A mobile service usually omits a precise geo pin.
   * TODO(launch): set only if you want a map point and the coordinates are real.
   * `null` is omitted from JSON-LD.
   */
  geo: null as { latitude: number; longitude: number } | null,

  priceRange: "$$",

  /** Display hours. TODO(launch): add real hours. Empty = hidden + omitted from schema. */
  hours: [] as { days: string; time: string }[],
  /** Machine-readable hours for OpeningHoursSpecification. TODO(launch). */
  openingHours: [] as { days: string[]; opens: string; closes: string }[],
};

export type Site = typeof site;

/**
 * Booking CTA target. Uses the real Square URL when configured, otherwise the
 * on-site contact page so "Book Now" is never a broken/empty link.
 */
export const bookHref: string = site.bookingUrl || "/contact";

/** Anchor props for booking links — opens externally only for a real Square URL. */
export const bookLinkProps: { target?: "_blank"; rel?: string } = site.bookingUrl
  ? { target: "_blank", rel: "noopener noreferrer" }
  : {};

/** Convenience flags for conditional rendering. */
export const hasPhone = !!site.phone;
export const hasEmail = !!site.email;
export const hasBooking = !!site.bookingUrl;
export const socialLinks = Object.entries(site.social)
  .filter(([, url]) => !!url)
  .map(([key, url]) => ({ key, url }));
