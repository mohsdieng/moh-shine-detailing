/**
 * Service catalogue. Prices marked "LOCKED" are confirmed and must not change.
 * Others are "from $X" placeholders to be confirmed by the owner.
 */

export type Service = {
  slug: string;
  title: string;
  /** Short, marketing-friendly summary used in cards & hero. */
  blurb: string;
  /** Longer paragraph used on the sticky-scroll showcase and /services page. */
  description: string;
  /** Bullet list of everything included in the package. */
  includes: string[];
  /** Typical on-site duration. Displayed verbatim. */
  duration: string;
  /** Who/what the service is best suited for. */
  idealFor: string;
  /** Display price string (top-line). */
  price: string;
  /** True once the price is confirmed (do not edit locked prices). */
  priceLocked: boolean;
  /** Optional per-vehicle pricing (sedan / SUV / truck). */
  tiers?: {
    sedan: string;
    suv: string;
    truck: string;
  };
  /** Lucide-style icon key consumed by components/icons.tsx. */
  icon: "wash" | "interior" | "sparkle" | "shield";
  /** Optional add-ons the customer can request on top. */
  addOns?: string[];
};

export const services: Service[] = [
  {
    slug: "exterior-hand-wash",
    title: "Exterior Hand Wash & Towel Dry",
    blurb:
      "A meticulous two-bucket hand wash and microfiber towel dry that lifts grime without swirling your paint.",
    description:
      "The foundation of every great-looking car. We pre-soak with a pH-balanced foam, lift dirt with a dedicated wash mitt using the two-bucket method, then dress wheels and tires before a streak-free towel dry. No tunnels, no brushes — just clean, careful contact wash work done in your driveway.",
    includes: [
      "pH-balanced foam pre-soak",
      "Two-bucket contact hand wash",
      "Wheels, tires & door jambs",
      "Glass exterior cleaned",
      "Streak-free microfiber towel dry",
      "Tire dressing applied",
    ],
    duration: "1 – 1.5 hr",
    idealFor: "Daily drivers that need a weekly or bi-weekly refresh.",
    price: "from $50 sedan / $65 SUV & truck",
    priceLocked: true,
    tiers: {
      sedan: "$50",
      suv: "$65",
      truck: "$65",
    },
    icon: "wash",
    addOns: ["Bug & tar removal", "Engine bay clean", "Quick spray sealant"],
  },
  {
    slug: "interior-detail",
    title: "Interior Detail",
    blurb:
      "Deep-clean every surface — vacuum, steam, condition and protect — so your cabin looks and smells showroom fresh.",
    description:
      "We dismantle the interior down to the crevices: full vacuum, compressed-air blowout, steam on plastics and headliner, leather or fabric treated, glass polished from the inside, and a light fragrance to finish. The kind of clean that makes you sit down differently when you get in.",
    includes: [
      "Full vacuum incl. trunk & mats",
      "Compressed-air crevice blowout",
      "Steam cleaning of plastics",
      "Leather conditioning / fabric shampoo",
      "Headliner & A-pillars wipe-down",
      "Interior glass polish",
      "Light interior fragrance",
    ],
    duration: "2 – 3 hr",
    idealFor: "Family cars, pet owners and resale prep.",
    price: "from $120",
    priceLocked: false,
    icon: "interior",
    addOns: [
      "Pet hair extraction",
      "Stain spot treatment",
      "Ozone odor removal",
    ],
  },
  {
    slug: "full-detail",
    title: "Full Detail",
    blurb:
      "The complete package — inside and out — for a top-to-bottom transformation that turns heads in the driveway.",
    description:
      "Everything from our hand wash and interior detail, combined and elevated. We finish with a quick spray sealant on the paint, dressed tires and a full walk-around inspection. By the time we hand you back the keys the car looks, feels and smells like new.",
    includes: [
      "Everything in Exterior Hand Wash",
      "Everything in Interior Detail",
      "Spray sealant on paint",
      "Glass treated inside & out",
      "Detailed door jambs & fuel door",
      "Final walk-around inspection",
    ],
    duration: "3.5 – 5 hr",
    idealFor: "Quarterly resets, special occasions, listing for sale.",
    price: "from $200",
    priceLocked: false,
    icon: "sparkle",
    addOns: [
      "Headlight restoration",
      "Engine bay detail",
      "Clay bar decontamination",
    ],
  },
  {
    slug: "paint-correction",
    title: "Paint Correction",
    blurb:
      "Machine-polished paint that removes swirls, oxidation and light scratches to restore deep, mirror-like gloss.",
    description:
      "True paint correction work. We wash, decontaminate and clay the panels, then machine-polish in one or two stages to physically remove defects in the clear coat. Finished with a sealant or ceramic coating of your choice so the gloss lasts.",
    includes: [
      "Decontamination & clay bar",
      "Panel inspection under lighting",
      "Single or multi-stage machine polish",
      "Swirl, hologram & scratch removal",
      "Sealant or ceramic coating option",
      "Before / after walkthrough",
    ],
    duration: "1 – 2 days",
    idealFor: "Enthusiasts, dark paint, neglected finishes, pre-coating prep.",
    price: "from $350",
    priceLocked: false,
    icon: "shield",
    addOns: [
      "6-month sealant top-up",
      "1-year ceramic coating",
      "Trim restoration",
    ],
  },
];

export type VehicleTier = {
  slug: "sedan" | "suv" | "truck";
  label: string;
  examples: string;
};

export const vehicleTiers: VehicleTier[] = [
  { slug: "sedan", label: "Sedan / Coupe", examples: "Civic, Camry, 3-Series" },
  { slug: "suv", label: "SUV / Crossover", examples: "RAV4, Pilot, X5" },
  { slug: "truck", label: "Truck / Van", examples: "F-150, Tacoma, Sprinter" },
];
