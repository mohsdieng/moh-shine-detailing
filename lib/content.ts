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

export const stats: Stat[] = [
  { label: "Vehicles detailed", value: 1200, suffix: "+" },
  { label: "Avg. customer rating", value: 4.9, suffix: " ★", decimals: 1 },
  { label: "Years of detailing", value: 6, suffix: "+" },
  { label: "Same-day rebookings", value: 92, suffix: "%" },
];

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

export const testimonials: Testimonial[] = [
  {
    quote:
      "Showed up on time, worked in my driveway, and my car looked better than the day I bought it. The interior smelled brand new. Booking again next month.",
    name: "James R.",
    detail: "Full Detail · Raleigh",
    rating: 5,
  },
  {
    quote:
      "I'm picky about my paint and was nervous about a wash. They hand-washed everything and there wasn't a single swirl. Genuinely impressed with the care.",
    name: "Priya S.",
    detail: "Paint Correction · Durham",
    rating: 5,
  },
  {
    quote:
      "So convenient not having to drive anywhere. Friendly, professional, and the truck came out spotless inside and out. Highly recommend to anyone in the area.",
    name: "Marcus T.",
    detail: "Interior Detail · Cary",
    rating: 5,
  },
  {
    quote:
      "Quoted me fair, started on time and the result speaks for itself. The paint looks deeper than it did when I picked the car up from the dealer.",
    name: "Hannah L.",
    detail: "Paint Correction · Chapel Hill",
    rating: 5,
  },
  {
    quote:
      "Cleaned out two years of kid carpool damage. My wife thought I traded the car in. Worth every dollar.",
    name: "Devon W.",
    detail: "Interior Detail · Apex",
    rating: 5,
  },
  {
    quote:
      "Professional from booking to finish. They were communicative, finished on time and left the driveway cleaner than they found it.",
    name: "Sara K.",
    detail: "Full Detail · Morrisville",
    rating: 5,
  },
];

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
