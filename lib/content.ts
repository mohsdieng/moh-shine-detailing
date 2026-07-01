/**
 * Marketing content shared across the home + inner pages.
 * Replace placeholder copy with real customer quotes / numbers once available.
 */

export type Stat = {
  label: string;
  /** Numeric value passed to the count-up animation. */
  value: number;
  prefix?: string;
  suffix?: string;
  /** Optional decimals when value isn't an integer. */
  decimals?: number;
};

/**
 * Headline stats. Empty until real, owner-confirmed numbers exist — we never
 * display fabricated counts or ratings. Set `statsPublished = true` once the
 * array below holds verified figures.
 * TODO(launch): add real stats, e.g. { label: "Vehicles detailed", value: <real>, suffix: "+" }.
 */
export const statsPublished = false;
export const stats: Stat[] = [];

export type ValueProp = {
  title: string;
  body: string;
  /** Single character / glyph used inside the chip. */
  glyph: string;
};

export const valueProps: ValueProp[] = [
  {
    title: "We bring everything",
    body: "Self-contained water + power, professional polishers, microfiber by the bin. You don't need to lift a finger.",
    glyph: "01",
  },
  {
    title: "100% by hand",
    body: "Two-bucket method, dedicated mitts, no brushes. The same care you'd give your own car — because we love this work.",
    glyph: "02",
  },
  {
    title: "Pro-grade products",
    body: "Carnauba, ceramic, decon clay, leather cream. The good stuff most shops upcharge for — included in your detail.",
    glyph: "03",
  },
  {
    title: "Transparent pricing",
    body: "Flat per-vehicle pricing with no surprise add-ons. If we spot something extra we ask before we touch it.",
    glyph: "04",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  rating: number;
};

/**
 * Customer testimonials. Empty until real, owner-approved reviews exist — we
 * never publish fabricated reviews. Set `reviewsPublished = true` once the
 * array below holds genuine quotes (ideally mirrored from your Google profile).
 * TODO(launch): add real reviews, e.g. { quote, name, detail, rating }.
 */
export const reviewsPublished = false;
export const testimonials: Testimonial[] = [];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do I need to provide water or power?",
    a: "No — our mobile rig is fully self-contained. We carry our own water and a portable power source so we only need a flat spot to park near your vehicle.",
  },
  {
    q: "Where do you operate?",
    a: "We cover Raleigh, Durham, Cary, Apex, Morrisville, Chapel Hill, Wake Forest and most of the surrounding Triangle. If you're unsure, send us your zip — we'll confirm in minutes.",
  },
  {
    q: "How long does a detail take?",
    a: "An exterior hand wash runs about an hour. An interior detail takes 2–3 hours. A full detail is typically 3.5–5 hours, and paint correction can run a full day or two depending on the level of work.",
  },
  {
    q: "How do I book and pay?",
    a: "Booking is online through Square Appointments — pick a service, pick a time, done. You pay after the work, contactless via card or tap.",
  },
  {
    q: "Do you offer paint protection or ceramic coatings?",
    a: "Yes. After paint correction we can apply a 6-month spray sealant or a 1-year ceramic coating depending on how long you want the gloss to last.",
  },
  {
    q: "What if the weather is bad on my appointment?",
    a: "We monitor the forecast and reach out if we need to reschedule. There's no fee — we'd rather move your slot than rush a detail in the rain.",
  },
  {
    q: "Can you remove pet hair or stains?",
    a: "Pet hair extraction and spot stain treatment are available as add-ons to the interior detail. Send us a photo when you book and we'll quote it ahead of time.",
  },
  {
    q: "Do you wash motorcycles, boats or RVs?",
    a: "We specialize in cars, SUVs and light trucks. Reach out about specialty vehicles — we'll let you know if it's a fit.",
  },
];

/**
 * Service-area cities + a wider list of neighborhoods we visit regularly.
 * Powers the animated map chips and area page.
 */
export const serviceCities = [
  { name: "Raleigh", note: "HQ — same-day availability" },
  { name: "Durham", note: "Daily routes" },
  { name: "Cary", note: "Daily routes" },
  { name: "Chapel Hill", note: "Tue / Thu / Sat" },
  { name: "Apex", note: "Weekly" },
  { name: "Morrisville", note: "Weekly" },
  { name: "Wake Forest", note: "By appointment" },
] as const;

export const neighborhoods = [
  "North Hills",
  "Five Points",
  "Cameron Village",
  "ITB Raleigh",
  "Brier Creek",
  "Falls Lake",
  "Wakefield",
  "Holly Springs",
  "Fuquay-Varina",
  "Hillsborough",
  "Pittsboro",
  "Knightdale",
  "Garner",
  "Clayton",
  "RTP",
  "Southern Village",
];

/**
 * Trust strip rotated through the hero marquee — short, punchy promises.
 */
export const trustChips = [
  "100% Hand-Washed",
  "We Come To You",
  "Pro-Grade Products",
  "Two-Bucket Method",
  "Insured & Local",
  "Same-Day Booking",
  "No Brush Tunnels",
  "Driveway-to-Driveway Service",
];
