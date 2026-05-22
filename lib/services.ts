/**
 * Service catalogue. Prices marked "LOCKED" are confirmed and must not change.
 * Others are "from $X" placeholders to be confirmed by the owner.
 */

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  /** Short bullet list of what's included. */
  includes: string[];
  /** Display price string. */
  price: string;
  /** True once the price is confirmed (do not edit locked prices). */
  priceLocked: boolean;
  /** Lucide-style icon key consumed by components/icons.tsx. */
  icon: "wash" | "interior" | "sparkle" | "shield";
};

export const services: Service[] = [
  {
    slug: "exterior-hand-wash",
    title: "Exterior Hand Wash & Towel Dry",
    blurb:
      "A meticulous two-bucket hand wash and soft microfiber towel dry that lifts grime without swirling your paint.",
    includes: [
      "pH-balanced foam pre-soak",
      "Two-bucket contact wash",
      "Wheels, tires & door jambs",
      "Streak-free towel dry",
    ],
    price: "from $50 sedan / $65 SUV & truck",
    priceLocked: true,
    icon: "wash",
  },
  {
    slug: "interior-detail",
    title: "Interior Detail",
    blurb:
      "Deep-clean every surface — vacuum, steam, condition and protect — so your cabin looks and smells showroom fresh.",
    includes: [
      "Full vacuum & crevice cleaning",
      "Surface steam & wipe-down",
      "Leather / upholstery treatment",
      "Glass & interior dressing",
    ],
    price: "from $120",
    priceLocked: false,
    icon: "interior",
  },
  {
    slug: "full-detail",
    title: "Full Detail",
    blurb:
      "The complete package — inside and out — for a top-to-bottom transformation that turns heads in the driveway.",
    includes: [
      "Everything in hand wash",
      "Everything in interior detail",
      "Spray sealant & tire shine",
      "Final inspection walk-around",
    ],
    price: "from $200",
    priceLocked: false,
    icon: "sparkle",
  },
  {
    slug: "paint-correction",
    title: "Paint Correction",
    blurb:
      "Machine-polished paint that removes swirls, oxidation and light scratches to restore deep, mirror-like gloss.",
    includes: [
      "Paint decontamination & clay",
      "Single or multi-stage polish",
      "Swirl & scratch removal",
      "Optional sealant or ceramic",
    ],
    price: "from $350",
    priceLocked: false,
    icon: "shield",
  },
];
