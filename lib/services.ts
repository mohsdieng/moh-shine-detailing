/**
 * Service catalogue (9 offerings).
 *
 * The `priceLocked: true` entry is the entry-level Wash & Wax at $50 / $65 —
 * this price is confirmed by the owner and must not be edited until further
 * notice. All other prices are placeholders to be replaced once confirmed.
 */

export type ServiceIconKey =
  | "wash"
  | "interior"
  | "sparkle"
  | "shield"
  | "diamond"
  | "headlight"
  | "leaf"
  | "engine"
  | "shine";

export type Service = {
  slug: string;
  /** Display title used in headings. */
  title: string;
  /** Compact label used in nav dropdowns / chips. */
  shortTitle: string;
  /** One-sentence summary used in cards and hero. */
  blurb: string;
  /** Long paragraph used at the top of the detail page. */
  description: string;
  /** Three or four customer-facing benefits (outcome-oriented). */
  benefits: string[];
  /** What's actually performed (process-oriented). */
  includes: string[];
  /** Ordered process steps shown on the detail page. */
  process: { title: string; copy: string }[];
  duration: string;
  idealFor: string;
  /** Top-line display price. */
  price: string;
  priceLocked: boolean;
  /** Optional per-vehicle pricing (sedan / SUV / truck). */
  tiers?: { sedan: string; suv: string; truck: string };
  icon: ServiceIconKey;
  addOns?: string[];
  // Media paths are managed in lib/media.ts (mediaFor(slug)).
  // That file is the single source of truth for local paths + Unsplash temps.
  /** Page-level SEO. */
  seoTitle: string;
  seoDescription: string;
  /** Keywords used for in-page Service JSON-LD + internal targeting. */
  keywords: string[];
};

export const services: Service[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "wash-and-wax",
    title: "Wash & Wax",
    shortTitle: "Wash & Wax",
    blurb:
      "A meticulous two-bucket hand wash, towel dry and quick spray wax to lift dirt safely and leave a fresh shine.",
    description:
      "Our entry-level mobile service — perfect for the driver who keeps a tidy car and wants a safe, careful refresh in their driveway. We hand-wash every panel with the two-bucket method, dress wheels and tires, towel dry without swirls and finish with a quick spray wax for protection that lasts a few weeks.",
    benefits: [
      "Safe, swirl-free finish using the two-bucket method",
      "Spray wax adds gloss and a few weeks of paint protection",
      "We come to your driveway — no driving, no waiting",
      "Locked starting price by vehicle size, no surprises",
    ],
    includes: [
      "pH-balanced foam pre-soak",
      "Two-bucket hand wash with dedicated mitt",
      "Wheels, tires & door jambs cleaned",
      "Streak-free microfiber towel dry",
      "Quick spray wax applied to paint",
      "Tire dressing applied",
    ],
    process: [
      { title: "Pre-rinse & foam soak", copy: "We loosen surface dirt with a pH-balanced foam to lift contaminants safely before any contact wash." },
      { title: "Two-bucket hand wash", copy: "One bucket of clean suds, one for rinsing the mitt. Each panel washed top-down to avoid swirls." },
      { title: "Wheels & door jambs", copy: "Dedicated brushes and mitts for wheels, tires and jambs — no cross-contamination with the paint mitt." },
      { title: "Dry, wax & dress", copy: "Plush microfiber dry, quick spray wax for protection, then tires dressed for a finished look." },
    ],
    duration: "1 – 1.5 hr",
    idealFor: "Daily drivers wanting a safe, recurring refresh.",
    price: "from $50 sedan / $65 SUV & truck",
    priceLocked: true,
    tiers: { sedan: "$50", suv: "$65", truck: "$65" },
    icon: "wash",
    addOns: ["Bug & tar removal", "Wheel face deep clean", "Glass water-spot removal"],
    seoTitle: "Mobile Wash & Wax in Raleigh & Durham, NC — from $50",
    seoDescription:
      "Premium mobile hand wash and spray wax in Raleigh-Durham. Two-bucket method, swirl-free dry and weeks of paint protection — we come to your driveway. From $50 sedan / $65 SUV.",
    keywords: ["mobile car wash Raleigh", "hand wash Durham NC", "wash and wax Raleigh"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "exterior-detail",
    title: "Exterior Detail",
    shortTitle: "Exterior Detail",
    blurb:
      "Decontamination, clay bar, hand wash and sealant — paint that feels glass-smooth and looks deeper than a wash alone can deliver.",
    description:
      "A full exterior reset. We hand wash, decontaminate iron fallout, clay the paint, then seal with a long-lasting spray sealant. Wheels, tires, glass and trim all get individual attention. The result: paint that feels like glass to the touch and a gloss that holds up for months.",
    benefits: [
      "Glass-smooth paint after clay decontamination",
      "Months of protection from a quality sealant",
      "Brighter wheels, deeper paint, cleaner trim",
      "Restores neglected exteriors to like-new",
    ],
    includes: [
      "Foam pre-soak + two-bucket hand wash",
      "Iron-fallout decontamination wash",
      "Clay bar of every painted panel",
      "Wheels, tires, fender wells",
      "Trim & rubber dressing",
      "Spray sealant for lasting gloss",
      "Glass exterior polished",
    ],
    process: [
      { title: "Wash & decontaminate", copy: "Hand wash followed by an iron-fallout dissolver to chemically lift bonded contaminants." },
      { title: "Clay decontamination", copy: "Gentle clay across every panel to physically remove anything the chemicals missed." },
      { title: "Seal & dress", copy: "Spray sealant for paint protection, then tires and trim dressed for a finished factory look." },
      { title: "Final inspection", copy: "We walk the car with you under good light before we leave the driveway." },
    ],
    duration: "2 – 3 hr",
    idealFor: "Cars that have not been detailed in months or longer.",
    price: "Contact for quote",
    priceLocked: false,
    icon: "sparkle",
    addOns: ["Headlight restoration", "Engine bay clean", "Plastic trim restoration"],
    seoTitle: "Exterior Car Detailing in Raleigh & Durham, NC | Moh's Shine",
    seoDescription:
      "Mobile exterior car detailing in Raleigh-Durham. Hand wash, iron decon, clay bar and spray sealant for glass-smooth paint that lasts. Free quote — we come to you.",
    keywords: ["exterior car detailing Raleigh", "exterior detail Durham NC", "clay bar Raleigh"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "interior-detail",
    title: "Interior Detail",
    shortTitle: "Interior Detail",
    blurb:
      "Vacuum, steam, condition and protect every surface so your cabin looks, feels and smells showroom fresh.",
    description:
      "A meticulous interior reset. Full vacuum and crevice blowout, steam cleaning of plastics, dedicated leather or fabric treatment, headliner wipe-down, glass polished from the inside and a light fragrance to finish. The kind of clean that resets the cabin and your morning commute.",
    benefits: [
      "Removes embedded dust, crumbs and pet hair",
      "Steam kills odors at the source — not just masks them",
      "Leather, plastic and glass treated and protected",
      "Showroom-fresh cabin you actually want to sit in",
    ],
    includes: [
      "Full vacuum including trunk and mats",
      "Compressed-air crevice blowout",
      "Steam cleaning on plastics & vents",
      "Leather conditioning or fabric shampoo",
      "Headliner & A-pillars wipe-down",
      "Interior glass polish",
      "Light interior fragrance",
    ],
    process: [
      { title: "Strip & blow out", copy: "Mats and trash out, every crevice blasted with compressed air so the vacuum can actually reach the dirt." },
      { title: "Vacuum & extract", copy: "Top-to-bottom vacuum followed by spot-extraction on any stains in carpet or upholstery." },
      { title: "Steam every surface", copy: "Steam lifts grime from plastics, vents and switchgear and neutralises odors at the source." },
      { title: "Treat & protect", copy: "Leather conditioner or fabric protectant, glass polished, light fragrance — done." },
    ],
    duration: "2 – 3 hr",
    idealFor: "Family cars, pet owners, resale prep, and ride-share drivers.",
    price: "from $120",
    priceLocked: false,
    icon: "interior",
    addOns: ["Pet hair extraction", "Stain spot treatment", "Ozone odor removal"],
    seoTitle: "Interior Car Detailing in Raleigh & Durham, NC | Moh's Shine",
    seoDescription:
      "Mobile interior car detailing in Raleigh-Durham. Vacuum, steam, leather conditioning and odor neutralization — your cabin reset to showroom fresh, at your driveway.",
    keywords: ["interior car detailing Raleigh", "interior detail Durham NC", "car interior cleaning Raleigh"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "full-detail",
    title: "Full Detail",
    shortTitle: "Full Detail",
    blurb:
      "Everything inside and out — combined and elevated. The transformation package that turns heads in the driveway.",
    description:
      "Our most popular service: every step of the Exterior Detail and Interior Detail combined into a single appointment, finished with a spray sealant, dressed tires and a full walk-around inspection. By the time we hand you back the keys, the car looks, feels and smells like new.",
    benefits: [
      "Inside-and-out reset in a single appointment",
      "Sealed paint + protected interior — done right",
      "Ideal for seasonal resets and listing for sale",
      "Best value for first-time detail customers",
    ],
    includes: [
      "Everything in Exterior Detail",
      "Everything in Interior Detail",
      "Spray sealant on paint",
      "Glass treated inside & out",
      "Detailed door jambs & fuel door",
      "Final walk-around inspection",
    ],
    process: [
      { title: "Exterior reset", copy: "Hand wash, iron decon, clay bar, sealant and dressed wheels — exterior brought back to factory feel." },
      { title: "Interior reset", copy: "Vacuum, blow-out, steam, condition and protect every interior surface." },
      { title: "Glass & jambs", copy: "Glass polished both sides, door jambs and fuel door detailed — the details that elevate the result." },
      { title: "Inspection walk", copy: "Final walk-around together so you see every panel before you drive away." },
    ],
    duration: "3.5 – 5 hr",
    idealFor: "Quarterly resets, special occasions, listing for sale.",
    price: "from $200",
    priceLocked: false,
    icon: "shine",
    addOns: ["Paint correction add-on", "Headlight restoration", "Engine bay detail"],
    seoTitle: "Full Car Detail in Raleigh & Durham, NC | Moh's Shine",
    seoDescription:
      "Full mobile car detail in Raleigh-Durham — interior, exterior, sealant and inspection in one appointment. Showroom finish, in your driveway. From $200.",
    keywords: ["full car detail Raleigh", "complete car detailing Durham NC", "mobile car detail Raleigh"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "paint-correction",
    title: "Paint Correction",
    shortTitle: "Paint Correction",
    blurb:
      "Machine-polished paint that removes swirls, oxidation and light scratches to restore deep, mirror-like gloss.",
    description:
      "Real paint correction. We decontaminate the paint, inspect under correction lighting and machine-polish in one or two stages to physically remove defects in the clear coat. Finished with a sealant or ceramic coating so the new gloss actually lasts.",
    benefits: [
      "Permanently removes swirls and light scratches",
      "Restores depth and gloss the wash alone cannot",
      "Prepares paint perfectly for ceramic coating",
      "Photographable, head-turning finish",
    ],
    includes: [
      "Decontamination and clay bar",
      "Panel inspection under correction lighting",
      "Single or multi-stage machine polish",
      "Swirl, hologram and light-scratch removal",
      "Sealant or ceramic coating option",
      "Before / after walkthrough under lighting",
    ],
    process: [
      { title: "Decon prep", copy: "The paint must be perfectly clean before correction — wash, decon, clay, no exceptions." },
      { title: "Inspect under lighting", copy: "Defect lights show exactly what needs correcting so we choose the right polish and pad combo." },
      { title: "Machine polish", copy: "Single- or multi-stage polish to physically remove defects in the clear coat — not hide them." },
      { title: "Seal or coat", copy: "Sealant or ceramic coating to protect the corrected finish and lock in the new gloss." },
    ],
    duration: "1 – 2 days",
    idealFor: "Enthusiasts, dark paint, neglected finishes, pre-coating prep.",
    price: "from $350",
    priceLocked: false,
    icon: "shield",
    addOns: ["1-year ceramic coating", "2-year ceramic coating", "Trim restoration"],
    seoTitle: "Paint Correction in Raleigh & Durham, NC | Moh's Shine",
    seoDescription:
      "Professional paint correction in Raleigh-Durham. Multi-stage machine polishing to remove swirls, oxidation and scratches — restores mirror-like gloss to your paint.",
    keywords: ["paint correction Raleigh", "swirl removal Durham NC", "paint polishing Raleigh"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ceramic-coating",
    title: "Ceramic Coating",
    shortTitle: "Ceramic Coating",
    blurb:
      "A long-lasting liquid glass layer that bonds to your paint for years of gloss, hydrophobic shedding and easier washes.",
    description:
      "Ceramic coatings chemically bond to your clear coat to deliver years — not weeks — of protection. After correction prep, we apply a professional-grade coating, level and inspect under correction lighting, then cure. The result: water beads off, dirt has a harder time sticking, and your paint stays glossier for longer.",
    benefits: [
      "Years of protection in a single appointment",
      "Hydrophobic — water and dirt slide off",
      "Easier washes and longer-lasting gloss",
      "Protects against bird droppings, sap and UV",
    ],
    includes: [
      "Paint decontamination and prep",
      "Single-stage polish (light correction)",
      "Panel-wipe and ceramic application",
      "Multi-coat option for paint, wheels, trim or glass",
      "Cure & inspection under lighting",
      "Aftercare guide for the first 7 days",
    ],
    process: [
      { title: "Correction prep", copy: "A coating is only as good as the surface under it — full decon and a light polish to start clean." },
      { title: "Panel-wipe", copy: "Specialised solvents remove any polish residue so the coating bonds directly to the clear coat." },
      { title: "Apply & level", copy: "Coating applied panel-by-panel, leveled with microfiber and inspected under correction lighting." },
      { title: "Cure & deliver", copy: "Coating cures, we walk you through aftercare and the first wash window before you take the keys." },
    ],
    duration: "1 – 2 days",
    idealFor: "Daily drivers and enthusiasts who want long-term protection.",
    price: "Contact for quote",
    priceLocked: false,
    icon: "diamond",
    addOns: ["Wheel face coating", "Glass coating (rain repellent)", "Trim coating"],
    seoTitle: "Ceramic Coating in Raleigh & Durham, NC | Moh's Shine",
    seoDescription:
      "Professional ceramic coating in Raleigh-Durham. Years of paint protection, hydrophobic shedding and easier washes — applied at your home or office.",
    keywords: ["ceramic coating Raleigh", "ceramic coating Durham NC", "paint protection Raleigh"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "headlight-restoration",
    title: "Headlight Restoration",
    shortTitle: "Headlights",
    blurb:
      "Clears cloudy, yellowed headlight lenses to restore output, safety and the front-end look of your car.",
    description:
      "UV and road grime turn headlight lenses cloudy and yellow over time — robbing output and tanking your car's appearance. We sand, polish and seal the lenses to restore clarity and protect the result so it lasts, not just buffs for a week.",
    benefits: [
      "Brighter beams and safer night driving",
      "Front-end looks years newer instantly",
      "Sealed result lasts months, not weeks",
      "Far cheaper than replacement housings",
    ],
    includes: [
      "Lens prep and masking of paint",
      "Wet-sanding through grit progression",
      "Machine polish to optical clarity",
      "UV-resistant sealant on each lens",
      "Both headlights treated",
    ],
    process: [
      { title: "Prep & mask", copy: "Surrounding paint and trim masked so the work stays on the lens and nothing else." },
      { title: "Wet-sand progression", copy: "Wet-sand through finer grits to remove oxidation and yellowing." },
      { title: "Polish & seal", copy: "Machine polish to optical clarity, then a UV-resistant sealant locks the result in." },
    ],
    duration: "1 – 1.5 hr",
    idealFor: "Any car with cloudy, yellowed or hazy headlight lenses.",
    price: "Contact for quote",
    priceLocked: false,
    icon: "headlight",
    addOns: ["Tail-light restoration", "Fog-light restoration"],
    seoTitle: "Headlight Restoration in Raleigh & Durham, NC | Moh's Shine",
    seoDescription:
      "Mobile headlight restoration in Raleigh-Durham. Wet-sand and seal cloudy, yellowed headlight lenses for brighter, safer beams — done in your driveway.",
    keywords: ["headlight restoration Raleigh", "cloudy headlights Durham NC", "headlight cleaning Raleigh"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "odor-removal",
    title: "Odor Removal",
    shortTitle: "Odor Removal",
    blurb:
      "Treats odors at the source — smoke, pet, food or mildew — instead of just masking them with fragrance.",
    description:
      "Odors come from particles trapped in fabrics, carpets and HVAC vents. We extract and steam-clean affected surfaces, treat the HVAC system, then finish with an ozone or enzyme treatment to neutralise odors at the molecular level. The cabin actually smells clean — not perfumed.",
    benefits: [
      "Eliminates odors at the source, not just masks",
      "Smoke, pet, food and mildew all treated",
      "HVAC system addressed — odors don't return",
      "Cabin smells clean, not perfumed",
    ],
    includes: [
      "Deep interior vacuum and steam",
      "Carpet & upholstery extraction",
      "HVAC system treatment",
      "Ozone or enzyme neutralization",
      "Final cabin fragrance (optional)",
    ],
    process: [
      { title: "Source removal", copy: "We extract whatever is trapped in fabric and carpet — that's where the odor actually lives." },
      { title: "Steam & treat", copy: "Steam every soft surface; treat the HVAC vents so the smell doesn't reappear the moment AC turns on." },
      { title: "Neutralise", copy: "Ozone or enzyme treatment neutralises remaining odor molecules. Cabin smells truly clean." },
    ],
    duration: "2 – 4 hr (depending on severity)",
    idealFor: "Smoke, pet, food spills, mildew or musty cars.",
    price: "Contact for quote",
    priceLocked: false,
    icon: "leaf",
    addOns: ["Full interior detail combo", "Pet hair extraction", "Mildew treatment"],
    seoTitle: "Car Odor Removal in Raleigh & Durham, NC | Moh's Shine",
    seoDescription:
      "Mobile car odor removal in Raleigh-Durham — smoke, pet, mildew and food smells treated at the source with steam, extraction and ozone. We come to you.",
    keywords: ["car odor removal Raleigh", "smoke smell removal Durham NC", "pet smell car Raleigh"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "engine-bay-cleaning",
    title: "Engine Bay Cleaning",
    shortTitle: "Engine Bay",
    blurb:
      "A careful, low-pressure clean and dress of the engine bay — easier servicing and a finished look under the hood.",
    description:
      "We carefully mask sensitive electronics, degrease and rinse the engine bay using low-pressure water and detail brushes, then dress the plastic and rubber components for a finished, factory-fresh look. Done right — never with high-pressure water or aggressive solvents on electronics.",
    benefits: [
      "Easier and cleaner for any mechanic to work on",
      "Helps you spot leaks early — no more hidden grime",
      "Plastics and rubber look new and protected",
      "Adds to resale presentation",
    ],
    includes: [
      "Electronics and intake masking",
      "Degrease of plastic and metal surfaces",
      "Detail brushes for crevices",
      "Low-pressure rinse",
      "Plastic & rubber dressing",
      "Quick walk-through before close",
    ],
    process: [
      { title: "Mask & protect", copy: "Sensitive electronics, fuse box, intake and battery terminals are carefully masked before any product hits the bay." },
      { title: "Degrease & agitate", copy: "Engine-safe degreaser worked in with detail brushes — grime lifts without aggressive pressure." },
      { title: "Rinse & dress", copy: "Low-pressure rinse, then plastics and rubber dressed for a finished, factory-fresh look under the hood." },
    ],
    duration: "1 – 1.5 hr",
    idealFor: "Pre-sale prep, post-warranty cars, or anyone who pops the hood.",
    price: "Contact for quote",
    priceLocked: false,
    icon: "engine",
    addOns: ["Underbody rinse (where accessible)", "Battery terminal clean & protect"],
    seoTitle: "Engine Bay Cleaning in Raleigh & Durham, NC | Moh's Shine",
    seoDescription:
      "Mobile engine bay cleaning in Raleigh-Durham — low-pressure degrease, brush, rinse and dress for a factory-fresh look under the hood. Safe, careful, in your driveway.",
    keywords: ["engine bay cleaning Raleigh", "engine bay detail Durham NC", "engine cleaning Raleigh"],
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

/** Helper for the dynamic /services/[slug] route. */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
