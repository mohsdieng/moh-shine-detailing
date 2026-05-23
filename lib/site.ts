/**
 * Central site configuration.
 * Swap these placeholder values for the real business details — everything
 * across the site (links, JSON-LD, metadata, footer) reads from here.
 */

export const site = {
  name: "Moh's Shine Detailing",
  shortName: "Moh's Shine",
  /** Catchphrase from the logo ribbon. */
  motto: "Flawless Shine, Anywhere, Anytime",
  tagline: "Premium mobile car detailing in Raleigh & Durham, NC.",
  description:
    "Premium mobile car detailing serving Raleigh, Durham & the surrounding NC Triangle. Interior, exterior, ceramic coating, paint correction, headlight restoration and more — we come to you.",

  // Production URL — used for canonical links, sitemap and Open Graph.
  url: "https://www.mohsshinedetailing.com",

  // === SWAP THESE PLACEHOLDERS ===
  phone: "+1 (919) 555-0142",
  phoneHref: "tel:+19195550142",
  email: "hello@mohsshinedetailing.com",
  emailHref: "mailto:hello@mohsshinedetailing.com",

  // Square Appointments booking link. Replace with your real Square booking URL.
  bookingUrl: "https://squareup.com/appointments/book/mohs-shine-detailing",

  social: {
    instagram: "https://www.instagram.com/mohsshinedetailing",
    tiktok: "https://www.tiktok.com/@mohsshinedetailing",
  },

  // Primary service areas (drives local-SEO copy + JSON-LD areaServed).
  areaServed: [
    "Raleigh, NC",
    "Durham, NC",
    "Cary, NC",
    "Apex, NC",
    "Morrisville, NC",
    "Chapel Hill, NC",
    "Wake Forest, NC",
  ],

  // Approximate geo center of the service area (downtown Raleigh) for LocalBusiness JSON-LD.
  geo: {
    latitude: 35.7796,
    longitude: -78.6382,
  },

  priceRange: "$$",

  // Display only — actual scheduling is handled by Square.
  hours: [
    { days: "Mon – Fri", time: "8:00 AM – 6:00 PM" },
    { days: "Saturday", time: "9:00 AM – 5:00 PM" },
    { days: "Sunday", time: "By appointment" },
  ],

  // Machine-readable hours for OpeningHoursSpecification JSON-LD.
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    { days: ["Saturday"], opens: "09:00", closes: "17:00" },
  ],
} as const;

export type Site = typeof site;
