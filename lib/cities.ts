/**
 * City registry for the local-SEO landing-page system.
 *
 * This is the single scalability lever: publishing a new city page (or a new
 * service × city page) is a data change here — no new routes or templates.
 *
 *   • A city with `published: true` gets a hub page at /locations/[slug]
 *     (targets the broad "mobile car detailing [city]" / "car detailing [city]").
 *   • Every slug in a city's `services` array gets a /locations/[slug]/[service]
 *     page (targets "[service] [city]", e.g. "ceramic coating Raleigh").
 *
 * Content integrity rules baked in here:
 *   • Only real NC Triangle cities, real counties, real neighborhoods and real
 *     public landmarks. No invented locations, addresses or review counts.
 *   • Each page composes UNIQUE copy from city-specific + service-specific data,
 *     plus hand-authored intros for the priority combos — so no page is thin.
 */

import { faqs as globalFaqs, type Faq } from "./content";
import { getServiceBySlug, type Service } from "./services";

export type City = {
  /** URL slug, e.g. "raleigh". */
  slug: string;
  /** Display name, e.g. "Raleigh". */
  name: string;
  /** Full display name, e.g. "Raleigh, NC". */
  full: string;
  /** Real county, e.g. "Wake County". */
  county: string;
  /** Approximate geo center (public coordinates) for LocalBusiness JSON-LD. */
  geo: { lat: number; lng: number };
  /** Whether this city currently gets generated pages. */
  published: boolean;
  /** True for our home base (Raleigh). Drives "based in" copy + travel notes. */
  hq?: boolean;
  /** One-line positioning used in the hub hero sub-headline. */
  tagline: string;
  /** Unique multi-sentence local-context paragraph for the city hub. */
  intro: string;
  /** Real neighborhoods / areas we route to within the city. */
  neighborhoods: string[];
  /** Real, recognizable local landmarks (woven into copy for local relevance). */
  landmarks: string[];
  /** Honest availability note. */
  availability: string;
  /** Logistics note (mobile service is dispatched from the Raleigh base). */
  travelNote: string;
  /** Service slugs that publish a service × city page for this city. */
  services: string[];
  /** Nearby city slugs for internal linking (must also exist in this file). */
  nearby: string[];
};

/* ------------------------------------------------------------------ */
/* City data — real Triangle cities.                                  */
/* ------------------------------------------------------------------ */

export const cities: City[] = [
  {
    slug: "raleigh",
    name: "Raleigh",
    full: "Raleigh, NC",
    county: "Wake County",
    geo: { lat: 35.7796, lng: -78.6382 },
    published: true,
    hq: true,
    tagline:
      "Our home turf. Premium mobile detailing delivered to driveways across the City of Oaks.",
    intro:
      "Raleigh is where Moh's Shine Detailing is based, so it's the area we cover most completely — from Inside-the-Beltline streets in Five Points and Oakwood to the newer builds around Brier Creek and North Hills. Because we're fully mobile, there's no detail shop to drive to: we bring water, power and pro-grade products to your home or office and work in the space you already park in.",
    neighborhoods: [
      "North Hills",
      "Five Points",
      "Inside the Beltline (ITB)",
      "Brier Creek",
      "Midtown",
      "Oakwood",
      "Glenwood South",
      "Downtown Raleigh",
    ],
    landmarks: ["NC State University", "North Hills", "PNC Arena", "Downtown Raleigh"],
    availability: "Same-day availability most weeks.",
    travelNote: "As our home base, Raleigh gets the widest scheduling windows.",
    services: ["ceramic-coating", "paint-correction", "interior-detail"],
    nearby: ["cary", "durham"],
  },
  {
    slug: "cary",
    name: "Cary",
    full: "Cary, NC",
    county: "Wake County",
    geo: { lat: 35.7915, lng: -78.7811 },
    published: true,
    tagline:
      "A short hop from our Raleigh base — concierge detailing for Cary's driveways and office lots.",
    intro:
      "Cary sits minutes from our Raleigh base, so it's one of our most-served towns. We route regularly to neighborhoods like Preston, Amberly, MacGregor Downs and Cary Park, bringing a fully self-contained mobile setup to your driveway. Whether you're near Bond Park, Koka Booth or the growing west-Cary builds, the studio comes to you.",
    neighborhoods: [
      "Preston",
      "Amberly",
      "MacGregor Downs",
      "Cary Park",
      "Highcroft",
      "Stonewater",
      "Downtown Cary",
    ],
    landmarks: ["Koka Booth Amphitheatre", "Bond Park", "WakeMed Soccer Park", "Downtown Cary"],
    availability: "Daily routes through Cary.",
    travelNote: "Roughly 15 minutes from our Raleigh base.",
    services: ["ceramic-coating"],
    nearby: ["raleigh", "durham"],
  },
  {
    slug: "durham",
    name: "Durham",
    full: "Durham, NC",
    county: "Durham County",
    geo: { lat: 35.994, lng: -78.8986 },
    published: true,
    tagline:
      "Bull City detailing without the drop-off — we bring the studio to your driveway.",
    intro:
      "Durham rounds out the Triangle for us, and we keep daily routes through the Bull City. From Trinity Park and Forest Hills near downtown to Hope Valley, Woodcroft and the Southpoint corridor, we bring a fully equipped mobile detailing setup to your home or workplace — handy for the many Duke and Research Triangle Park commuters who'd rather not give up a Saturday at a detail shop.",
    neighborhoods: [
      "Trinity Park",
      "Forest Hills",
      "Hope Valley",
      "Woodcroft",
      "Southpoint",
      "Brightleaf",
      "Downtown Durham",
    ],
    landmarks: ["Duke University", "American Tobacco Campus", "Streets at Southpoint", "Research Triangle Park"],
    availability: "Daily routes through Durham.",
    travelNote: "Roughly 25 minutes from our Raleigh base.",
    services: ["ceramic-coating"],
    nearby: ["raleigh", "cary"],
  },

  /* --- Ready to publish later (data complete, pages off for now) ---- */
  {
    slug: "morrisville",
    name: "Morrisville",
    full: "Morrisville, NC",
    county: "Wake County",
    geo: { lat: 35.8235, lng: -78.8256 },
    published: false,
    tagline: "Mobile detailing between RTP and RDU — we come to you.",
    intro:
      "Morrisville sits right between Research Triangle Park and RDU, and we route through it on the way to Cary and Durham. Our mobile setup brings everything to your driveway or office lot.",
    neighborhoods: ["Breckenridge", "Savannah", "Carpenter Village", "Kitts Creek"],
    landmarks: ["Research Triangle Park", "RDU Airport", "Park West Village"],
    availability: "Weekly routes.",
    travelNote: "Roughly 20 minutes from our Raleigh base.",
    services: ["ceramic-coating"],
    nearby: ["cary", "durham", "raleigh"],
  },
  {
    slug: "apex",
    name: "Apex",
    full: "Apex, NC",
    county: "Wake County",
    geo: { lat: 35.7327, lng: -78.8503 },
    published: false,
    tagline: "The Peak of Good Living, with detailing to match.",
    intro:
      "Apex keeps growing south and west of Cary, and our mobile detailing setup follows. We bring water, power and pro-grade products to driveways across town.",
    neighborhoods: ["Haddon Hall", "Bella Casa", "Scotts Mill", "Deer Creek", "Downtown Apex"],
    landmarks: ["Downtown Apex", "Jordan Lake", "Pleasant Park"],
    availability: "Weekly routes.",
    travelNote: "Roughly 25 minutes from our Raleigh base.",
    services: ["ceramic-coating"],
    nearby: ["cary", "raleigh"],
  },
  {
    slug: "wake-forest",
    name: "Wake Forest",
    full: "Wake Forest, NC",
    county: "Wake County",
    geo: { lat: 35.9799, lng: -78.5097 },
    published: false,
    tagline: "North-of-Raleigh detailing brought to your driveway.",
    intro:
      "Wake Forest sits just north of Raleigh, and we schedule routes up for appointments around Heritage, Wakefield and the historic downtown.",
    neighborhoods: ["Heritage", "Wakefield", "Traditions", "Downtown Wake Forest"],
    landmarks: ["Downtown Wake Forest", "Falls Lake", "Joyner Park"],
    availability: "By appointment.",
    travelNote: "Roughly 25 minutes from our Raleigh base.",
    services: ["ceramic-coating"],
    nearby: ["raleigh"],
  },
  {
    slug: "garner",
    name: "Garner",
    full: "Garner, NC",
    county: "Wake County",
    geo: { lat: 35.7113, lng: -78.6142 },
    published: false,
    tagline: "Southeast-Triangle detailing without the drive.",
    intro:
      "Garner sits just southeast of Raleigh, an easy route for our mobile setup. We bring the full detailing studio to your driveway.",
    neighborhoods: ["Heather Hills", "Cleveland", "Adams Point", "Downtown Garner"],
    landmarks: ["White Deer Park", "Lake Benson Park", "Downtown Garner"],
    availability: "Weekly routes.",
    travelNote: "Roughly 15 minutes from our Raleigh base.",
    services: ["ceramic-coating"],
    nearby: ["raleigh"],
  },
  {
    slug: "chapel-hill",
    name: "Chapel Hill",
    full: "Chapel Hill, NC",
    county: "Orange County",
    geo: { lat: 35.9132, lng: -79.0558 },
    published: false,
    tagline: "Detailing for the Southern Part of Heaven.",
    intro:
      "Chapel Hill anchors the west side of the Triangle, and we make trips out for appointments around UNC, Southern Village and Meadowmont.",
    neighborhoods: ["Southern Village", "Meadowmont", "Briar Chapel", "Downtown Chapel Hill"],
    landmarks: ["UNC-Chapel Hill", "Franklin Street", "Southern Village"],
    availability: "Tue / Thu / Sat routes.",
    travelNote: "Roughly 35 minutes from our Raleigh base.",
    services: ["ceramic-coating"],
    nearby: ["durham", "cary"],
  },
];

/* ------------------------------------------------------------------ */
/* Hand-authored intros for priority service × city combos.           */
/* Keyed `${citySlug}:${serviceSlug}`. The composer covers the rest.  */
/* ------------------------------------------------------------------ */

const cityServiceIntros: Record<string, string> = {
  "raleigh:ceramic-coating":
    "Raleigh summers are hard on paint — UV, pollen and the occasional tar-spattered I-440 commute all take a toll. A professional ceramic coating bonds a long-lasting hydrophobic layer to your clear coat so water sheets off, contaminants struggle to stick, and washes get noticeably easier. We prep and apply on-site at your Raleigh home or office, then walk you through the first-week aftercare before we hand back the keys.",
  "raleigh:paint-correction":
    "If your Raleigh daily driver has swirl marks under the North Hills parking-deck lights or holograms from a previous quick-detail, paint correction is what actually removes them — not hides them. We decontaminate, inspect under correction lighting and machine-polish the clear coat right in your driveway, restoring depth and gloss before optionally locking it in with a sealant or ceramic coating.",
  "raleigh:interior-detail":
    "Between school runs, NC State tailgates and Triangle traffic, Raleigh interiors collect a lot of life. Our interior detail resets the cabin at your home or office: full vacuum and compressed-air blowout, steam on every plastic surface, leather conditioned or fabric shampooed, glass polished and a light fragrance to finish — so the car you get back in feels brand new.",
  "cary:ceramic-coating":
    "Cary drivers tend to keep their cars a while, which makes ceramic coating an easy call — years of protection instead of weeks. We bring the full coating process to your Preston, Amberly or Cary Park driveway: decontamination, a leveling polish, panel-wipe and a professional-grade coating, cured and inspected on-site so water beads off and your paint stays glossier for far longer.",
  "durham:ceramic-coating":
    "For Duke and RTP commuters who'd rather not lose a Saturday to a detail shop, ceramic coating in Durham is the protect-it-once-and-forget-it option. We handle the full process — decon, light correction, coating and cure — right at your Trinity Park, Hope Valley or Southpoint-area driveway, leaving you with a hydrophobic finish that sheds Bull City rain and makes every future wash quicker.",
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function publishedCities(): City[] {
  return cities.filter((c) => c.published);
}

/** All { city, service } slug pairs that should generate a page. */
export function publishedCityServicePairs(): { city: string; service: string }[] {
  return publishedCities().flatMap((c) =>
    c.services
      .filter((s) => !!getServiceBySlug(s))
      .map((service) => ({ city: c.slug, service })),
  );
}

/** Published cities that offer a given service (for service-page internal links). */
export function citiesForService(serviceSlug: string): City[] {
  return publishedCities().filter((c) => c.services.includes(serviceSlug));
}

/** Format a short, natural neighborhood list, e.g. "North Hills, Five Points and Brier Creek". */
export function neighborhoodList(city: City, count = 3): string {
  const picks = city.neighborhoods.slice(0, count);
  if (picks.length <= 1) return picks[0] ?? city.name;
  return `${picks.slice(0, -1).join(", ")} and ${picks[picks.length - 1]}`;
}

/**
 * Intro paragraph for a service × city page. Returns the hand-authored copy
 * when present, otherwise composes a unique paragraph from city + service data
 * so newly-published combos are never thin.
 */
export function localServiceIntro(city: City, service: Service): string {
  const key = `${city.slug}:${service.slug}`;
  if (cityServiceIntros[key]) return cityServiceIntros[key];

  return (
    `Looking for ${service.title.toLowerCase()} in ${city.name}? Moh's Shine Detailing brings a fully ` +
    `self-contained mobile studio to driveways across ${city.name} — from ${neighborhoodList(city)} — ` +
    `so you get a professional result without leaving home. ${service.description} ${city.travelNote}`
  );
}

/**
 * Locally-framed FAQ set for a service × city page. Mixes service-relevant and
 * city-relevant questions; every answer is true and useful (no keyword stuffing).
 */
export function localServiceFaqs(city: City, service: Service): Faq[] {
  const priceLine = service.priceLocked
    ? `Pricing starts at ${service.price.toLowerCase()} and is the same across the Triangle.`
    : service.price.toLowerCase().includes("contact")
      ? "Pricing depends on your vehicle's size and condition, so we give you a firm quote before any work begins — the same rates we offer across the Triangle."
      : `Pricing starts ${service.price.toLowerCase()} and depends on your vehicle's size and condition. We confirm a firm quote before we start.`;

  // Pull one genuinely relevant question from the global FAQ set.
  const relevant =
    globalFaqs.find((f) =>
      service.slug === "ceramic-coating"
        ? /ceramic|protection/i.test(f.q)
        : service.slug === "interior-detail"
          ? /pet hair|stain/i.test(f.q)
          : /how long|water or power/i.test(f.q),
    ) ?? globalFaqs[0];

  return [
    {
      q: `Do you offer ${service.title.toLowerCase()} in ${city.name}?`,
      a: `Yes. We're a fully mobile service and ${city.availability.toLowerCase()} We cover neighborhoods including ${neighborhoodList(city, 4)}, bringing everything we need straight to your driveway or office lot.`,
    },
    {
      q: `How much does ${service.title.toLowerCase()} cost in ${city.name}?`,
      a: priceLine,
    },
    {
      q: `Do I need to provide water or power in ${city.name}?`,
      a: "No — our rig is fully self-contained. We carry our own water and a portable power source, so we only need a flat spot to park near your vehicle.",
    },
    {
      q: relevant.q,
      a: relevant.a,
    },
    {
      q: `How do I book ${service.title.toLowerCase()} in ${city.name}?`,
      a: "Book online through Square in about a minute, or send us a quick message for a tailored quote. We confirm your time and come to you — usually replying within the hour.",
    },
  ];
}

/** Locally-framed FAQ set for a city hub page (broad "detailing in [city]"). */
export function cityHubFaqs(city: City): Faq[] {
  return [
    {
      q: `Do you offer mobile car detailing in ${city.name}, NC?`,
      a: `Yes. ${city.intro}`,
    },
    {
      q: `Which ${city.name} neighborhoods do you cover?`,
      a: `We route to areas across ${city.name} including ${neighborhoodList(city, 5)}. If you're not sure you're in range, send us your zip and we'll confirm in minutes.`,
    },
    {
      q: `Do I need to provide water or power?`,
      a: "No — our mobile rig is fully self-contained. We bring our own water and power and only need room to park near your car.",
    },
    {
      q: `What does detailing cost in ${city.name}?`,
      a: "Pricing is the same across the Triangle and depends on the service and your vehicle's size and condition. Our entry wash & wax starts at $50 (sedan) / $65 (SUV & truck); we confirm a firm quote on anything larger before we begin.",
    },
    {
      q: `How soon can you come out?`,
      a: `${city.availability} ${city.travelNote} Book online through Square or message us and we'll lock in the soonest window that works.`,
    },
  ];
}
