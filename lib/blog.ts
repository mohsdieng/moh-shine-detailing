/**
 * Blog registry.
 *
 * Content is authored as typed structured blocks (not MDX) so every article
 * stays type-safe, fully static, and renders through the site's premium
 * components — consistent with lib/services.ts and lib/cities.ts. Paragraphs
 * and list items use `RichText` segments so we can thread contextual internal
 * links into the service and location ("money") pages.
 *
 * Adding an article = appending one entry to `posts`. Routes, sitemap, the
 * index grid, related posts and schema all derive from this file.
 */

export type RichSegment = string | { text: string; href: string };
export type RichText = RichSegment[];

export type Block =
  | { type: "lead"; text: RichText }
  | { type: "p"; text: RichText }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: RichText[] }
  | { type: "ol"; items: RichText[] }
  | { type: "callout"; title?: string; text: RichText }
  | { type: "quote"; text: string };

export type BlogCategory = { slug: string; name: string };

export const blogCategories = {
  pricing: { slug: "pricing", name: "Pricing" },
  protection: { slug: "paint-protection", name: "Paint Protection" },
  maintenance: { slug: "maintenance", name: "Maintenance" },
  paintCare: { slug: "paint-care", name: "Paint Care" },
  mobile: { slug: "mobile-detailing", name: "Mobile Detailing" },
} as const satisfies Record<string, BlogCategory>;

export type Faq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  /** H1 / display title. */
  title: string;
  /** <title> text (no brand suffix — the layout template adds it). Defaults to title. */
  seoTitle?: string;
  /** Meta description + card excerpt. */
  description: string;
  category: BlogCategory;
  tags: string[];
  /** ISO date (YYYY-MM-DD). */
  datePublished: string;
  dateModified?: string;
  featured?: boolean;
  body: Block[];
  faqs?: Faq[];
  /** Explicit related internal links surfaced near the end of the post. */
  related?: { label: string; href: string }[];
  cta?: { heading: string; body: string };
};

/** The brand is the author/publisher — kept honest, no invented persona. */
export const BLOG_AUTHOR = "Moh's Shine Detailing";

/* ================================================================== */
/* Articles                                                           */
/* ================================================================== */

export const posts: BlogPost[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "car-detailing-cost-raleigh-nc",
    title: "How Much Does Car Detailing Cost in Raleigh, NC?",
    seoTitle: "How Much Does Car Detailing Cost in Raleigh, NC?",
    description:
      "A clear, honest breakdown of car detailing prices in Raleigh — what drives the cost, typical ranges by service, and how mobile detailing pricing works.",
    category: blogCategories.pricing,
    tags: ["pricing", "raleigh", "car detailing", "mobile detailing"],
    datePublished: "2026-03-04",
    dateModified: "2026-06-10",
    featured: true,
    body: [
      {
        type: "lead",
        text: [
          "Detailing prices in Raleigh vary more than most people expect, and the gap usually isn't about one shop being “expensive” and another being “cheap.” It's about what's actually included. Here's an honest look at what you're paying for, the ranges you can expect, and how mobile detailing pricing works.",
        ],
      },
      { type: "h2", text: "What actually drives the price" },
      {
        type: "p",
        text: ["Four things move a detailing quote up or down more than anything else:"],
      },
      {
        type: "ul",
        items: [
          ["Vehicle size — a two-seat coupe takes far less product and time than a three-row SUV or a work truck."],
          ["Condition — a lightly-used daily driver is quicker than a car with ground-in pet hair, heavy swirls, or years of skipped maintenance."],
          ["Service level — a maintenance wash is a fraction of a full interior-and-exterior detail or multi-stage paint correction."],
          ["Add-ons — pet hair extraction, odor treatment, headlight restoration and engine-bay cleaning each add time and materials."],
        ],
      },
      { type: "h2", text: "Typical price ranges by service" },
      {
        type: "p",
        text: [
          "These are the starting points we work from at Moh's Shine Detailing. Final pricing depends on your vehicle's size and condition, which is why some services are quoted rather than fixed:",
        ],
      },
      {
        type: "ul",
        items: [
          [{ text: "Wash & wax", href: "/services/wash-and-wax" }, " — from $50 (sedan) / $65 (SUV & truck). A confirmed, flat starting price for a safe maintenance clean."],
          [{ text: "Interior detail", href: "/services/interior-detail" }, " — from $120, depending on how much life the cabin has seen."],
          [{ text: "Full detail", href: "/services/full-detail" }, " — from $200 for a complete inside-and-out reset."],
          [{ text: "Paint correction", href: "/services/paint-correction" }, " — from $350; multi-stage work is quoted after we inspect the paint."],
          [{ text: "Ceramic coating", href: "/services/ceramic-coating" }, " — quoted per vehicle, since prep and coating choice vary."],
        ],
      },
      {
        type: "callout",
        title: "Why we quote some services instead of posting one flat price",
        text: [
          "Paint correction and ceramic coating depend heavily on paint condition, color and the result you want. Posting a single number would mean either over-charging the easy cars or under-delivering on the hard ones. We'd rather look at the vehicle and give you a firm number up front — no surprises after we start.",
        ],
      },
      { type: "h2", text: "Why mobile detailing isn't more expensive" },
      {
        type: "p",
        text: [
          "A common assumption is that having a detailer come to you costs more. In practice it often costs less for comparable work: there's no storefront to keep the lights on, and you're not paying for a waiting room. We bring our own water, power and pro-grade products to your driveway, so the price reflects the work — not the overhead. If you're in ",
          { text: "Raleigh", href: "/locations/raleigh" },
          " or anywhere in the Triangle, the studio comes to you.",
        ],
      },
      { type: "h2", text: "How to get an accurate quote" },
      {
        type: "p",
        text: [
          "The fastest way to a firm price is to tell us your vehicle, the service you're after and a couple of photos if the condition is unusual. From there we confirm a number before any work begins. You can browse ",
          { text: "our packages", href: "/packages" },
          " for a sense of what's bundled, or ",
          { text: "request a quote", href: "/contact" },
          " and we'll usually reply within the hour.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the cheapest detailing service you offer?",
        a: "Our entry service is a wash & wax, starting at $50 for sedans and $65 for SUVs and trucks. It's a safe, swirl-free maintenance clean with a quick spray wax for a few weeks of protection.",
      },
      {
        q: "Why is ceramic coating priced by quote instead of a flat rate?",
        a: "Coating price depends on paint condition, the amount of correction needed beforehand, vehicle size and which coating you choose. We inspect the car and give you a firm quote rather than a one-size number that wouldn't be fair to most vehicles.",
      },
      {
        q: "Do you charge extra to come to my home or office?",
        a: "No. Mobile service is how we work — pricing reflects the detail itself. We bring our own water and power, so all we need is a flat spot to park near your vehicle.",
      },
    ],
    related: [
      { label: "See all services", href: "/services" },
      { label: "Compare packages", href: "/packages" },
      { label: "Detailing in Raleigh", href: "/locations/raleigh" },
    ],
    cta: {
      heading: "Want a firm number for your car?",
      body: "Tell us your vehicle and the service you're after — we'll send a tailored Raleigh quote, usually within the hour.",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "ceramic-coating-vs-wax",
    title: "Ceramic Coating vs Wax: Which Protection Is Better?",
    description:
      "Ceramic coating or wax? An honest comparison of durability, cost, gloss and upkeep so you can choose the right paint protection for your car.",
    category: blogCategories.protection,
    tags: ["ceramic coating", "wax", "paint protection"],
    datePublished: "2026-03-26",
    dateModified: "2026-06-12",
    body: [
      {
        type: "lead",
        text: [
          "Wax and ceramic coating both protect your paint, but they're built for different goals and budgets. Neither is universally “better” — the right pick depends on how long you want protection to last and how much upkeep you're willing to do.",
        ],
      },
      { type: "h2", text: "What wax actually does" },
      {
        type: "p",
        text: [
          "Wax (and most spray sealants) lays a sacrificial layer on top of your clear coat. It adds warmth and depth to the finish, helps water bead, and shields against light contaminants. It's affordable and easy to apply — but it wears off in weeks to a couple of months, faster in harsh sun or frequent washing.",
        ],
      },
      { type: "h2", text: "What a ceramic coating does differently" },
      {
        type: "p",
        text: [
          "A ",
          { text: "ceramic coating", href: "/services/ceramic-coating" },
          " chemically bonds to the clear coat instead of sitting on top of it. That bond is what delivers years — not weeks — of hydrophobic protection: water sheets off, dirt struggles to stick, and washes get noticeably easier. It also adds strong UV and chemical resistance, which matters in the North Carolina sun.",
        ],
      },
      { type: "h2", text: "Side by side" },
      {
        type: "ul",
        items: [
          ["Durability — wax: weeks to ~2 months. Ceramic: years, depending on the product and care."],
          ["Cost — wax: low and recurring. Ceramic: higher one-time investment, lower cost-per-month over its life."],
          ["Gloss — wax: warm, classic shine. Ceramic: deep, glassy, slick to the touch."],
          ["Upkeep — wax: re-apply often. Ceramic: occasional maintenance washes, no frequent re-application."],
          ["Prep — wax: minimal. Ceramic: the paint must be decontaminated and lightly corrected first, which is part of the value."],
        ],
      },
      {
        type: "callout",
        title: "The honest answer",
        text: [
          "If you keep a car a year or two and like the ritual of waxing, wax is perfectly good. If you keep your cars longer, hate washing, or want the lowest long-term maintenance, ceramic almost always wins on cost-per-month and convenience.",
        ],
      },
      { type: "h2", text: "A note on prep" },
      {
        type: "p",
        text: [
          "Coatings lock in whatever is underneath them, so any swirls or defects should be addressed first with ",
          { text: "paint correction", href: "/services/paint-correction" },
          ". That's why a quality coating is never just “apply and go” — the prep is most of the work, and most of the result.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I wax over a ceramic coating?",
        a: "You can, but you usually don't need to — and some products can reduce the coating's hydrophobic behavior. A dedicated coating maintenance spray is the better top-up.",
      },
      {
        q: "How long does ceramic coating really last?",
        a: "Quality professional coatings last multiple years with normal care. Longevity depends on the specific coating, how the car is washed, and whether it lives outside or in a garage.",
      },
      {
        q: "Is wax a waste of money if I'll coat later?",
        a: "Not at all. Wax is a fine interim layer of protection. Just know that the coating prep will strip it — that's expected and part of doing the coating right.",
      },
    ],
    related: [
      { label: "Ceramic coating service", href: "/services/ceramic-coating" },
      { label: "Wash & wax service", href: "/services/wash-and-wax" },
      { label: "Ceramic coating in Raleigh", href: "/locations/raleigh/ceramic-coating" },
    ],
    cta: {
      heading: "Not sure which protection fits your car?",
      body: "Tell us how long you keep your vehicles and how you wash them — we'll recommend wax or ceramic honestly, with a quote either way.",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "is-ceramic-coating-worth-it-north-carolina",
    title: "Is Ceramic Coating Worth It in North Carolina?",
    description:
      "North Carolina sun, pollen and humidity are hard on paint. Here's an honest look at when a ceramic coating is worth it in the Triangle — and when it isn't.",
    category: blogCategories.protection,
    tags: ["ceramic coating", "north carolina", "paint protection", "raleigh"],
    datePublished: "2026-04-15",
    dateModified: "2026-06-12",
    body: [
      {
        type: "lead",
        text: [
          "North Carolina is genuinely tough on car paint: intense summer UV, a heavy spring pollen season, humidity, and the kind of afternoon downpours that leave water spots baking on a hot hood. A ceramic coating is built for exactly these conditions — but it isn't the right call for every car or budget. Here's how to decide.",
        ],
      },
      { type: "h2", text: "What the Triangle climate does to paint" },
      {
        type: "ul",
        items: [
          ["UV exposure fades and oxidizes unprotected clear coat over time, especially on darker colors."],
          ["Spring pollen is mildly acidic and relentless; it bonds to a bare finish and makes every week feel like a fresh layer."],
          ["Summer humidity and quick storms leave mineral water spots that etch if they dry in the sun."],
          ["Tree sap and bird droppings — common under Raleigh's tree canopy — can stain or etch if left on bare paint."],
        ],
      },
      { type: "h2", text: "Where a coating earns its keep" },
      {
        type: "p",
        text: [
          "A ",
          { text: "ceramic coating", href: "/services/ceramic-coating" },
          " makes all of the above easier to live with. Pollen and dust bond far less aggressively, water (and the spots it leaves) sheets off instead of pooling, and the UV/chemical resistance slows the oxidation that dulls unprotected paint. The practical payoff most owners notice first is simple: washing gets quicker, and the car looks freshly detailed for far longer between washes.",
        ],
      },
      { type: "h2", text: "When it's worth it" },
      {
        type: "ul",
        items: [
          ["You keep your cars more than a year or two."],
          ["The vehicle lives outside or under trees rather than in a garage."],
          ["You'd rather pay once than re-wax every month."],
          ["The paint is in good shape, or you're willing to correct it first so the coating locks in a clean finish."],
        ],
      },
      { type: "h2", text: "When it might not be" },
      {
        type: "p",
        text: [
          "If you're planning to sell the car within a few months, or you genuinely enjoy frequent waxing, a coating may be more than you need — a quality ",
          { text: "wash & wax", href: "/services/wash-and-wax" },
          " rhythm can be enough. We'll tell you that honestly rather than upsell a coating you won't get full value from.",
        ],
      },
      {
        type: "callout",
        title: "The local bottom line",
        text: [
          "For a car that lives outdoors in the Triangle and gets kept a few years, ceramic coating is usually worth it — not because of the showroom gloss alone, but because of how much easier it makes ownership through pollen season and NC summers.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will ceramic coating stop pollen from sticking?",
        a: "It won't stop pollen from landing, but it dramatically reduces how aggressively it bonds — so it rinses away far more easily and is much less likely to mar the finish.",
      },
      {
        q: "Does a coating protect against water spots in NC humidity?",
        a: "It helps. Water sheets off a coated panel instead of pooling, which means fewer spots — though no coating makes a car fully spot-proof if mineral-heavy water dries in direct sun.",
      },
      {
        q: "Do I need paint correction before coating in North Carolina?",
        a: "Usually a light correction at minimum. A coating locks in whatever is underneath, so we remove swirls and contamination first to make sure it's protecting a clean finish.",
      },
    ],
    related: [
      { label: "Ceramic coating service", href: "/services/ceramic-coating" },
      { label: "Ceramic coating in Raleigh", href: "/locations/raleigh/ceramic-coating" },
      { label: "Ceramic coating in Cary", href: "/locations/cary/ceramic-coating" },
    ],
    cta: {
      heading: "Thinking about a coating before summer?",
      body: "Send us your vehicle and where it parks — we'll tell you honestly whether a coating is worth it for your situation, with a firm quote.",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "how-often-should-you-detail-your-car",
    title: "How Often Should You Detail Your Car?",
    description:
      "How often should you really detail your car? A practical cadence for washing, interior cleaning, and paint correction based on how you actually drive.",
    category: blogCategories.maintenance,
    tags: ["maintenance", "car care", "detailing schedule"],
    datePublished: "2026-05-06",
    dateModified: "2026-06-14",
    body: [
      {
        type: "lead",
        text: [
          "There's no single right answer — a garage-kept weekend car and a three-kid daily driver live very different lives. But there is a sensible rhythm for each, and getting it right keeps your car looking good while actually saving money over time.",
        ],
      },
      { type: "h2", text: "Maintenance washing: every 1–3 weeks" },
      {
        type: "p",
        text: [
          "A regular ",
          { text: "wash & wax", href: "/services/wash-and-wax" },
          " is the single most important habit for keeping paint healthy. Washing every one to three weeks removes the pollen, road film and bird droppings that etch and dull a finish if they sit. The two-bucket method matters here — it's what prevents the swirl marks that a quick drive-through leaves behind.",
        ],
      },
      { type: "h2", text: "Interior detail: every 3–6 months" },
      {
        type: "p",
        text: [
          "Most drivers benefit from a deeper ",
          { text: "interior detail", href: "/services/interior-detail" },
          " a few times a year. Pets, kids and daily commuting push it toward every three months; a tidy solo commuter can stretch to six. This is the reset that handles what a quick vacuum can't — steam, leather care, and the grime that builds in vents and seams.",
        ],
      },
      { type: "h2", text: "Full detail: 2–4 times a year" },
      {
        type: "p",
        text: [
          "A complete ",
          { text: "full detail", href: "/services/full-detail" },
          " — inside and out — a couple of times a year keeps everything ahead of wear. Many owners time these seasonally: a spring detail to clear pollen, and a fall detail to undo summer.",
        ],
      },
      { type: "h2", text: "Paint correction: once, then rarely" },
      {
        type: "p",
        text: [
          { text: "Paint correction", href: "/services/paint-correction" },
          " isn't a routine service — it physically removes defects, so you do it when swirls and oxidation have built up, then protect the result. With a coating and careful washing afterward, you may not need it again for years.",
        ],
      },
      {
        type: "callout",
        title: "A simple rule of thumb",
        text: [
          "Wash often, deep-clean the interior seasonally, full-detail a couple of times a year, and correct the paint once before protecting it. Frequent light maintenance is what prevents the expensive heavy restoration later.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it bad to not wash my car for months?",
        a: "It's hard on the finish. Pollen, sap and droppings are mildly acidic and can etch or stain bare paint if left for long stretches, especially in NC sun. Regular washing is cheap insurance against expensive correction.",
      },
      {
        q: "How often should I detail a car I barely drive?",
        a: "Even a low-mileage car collects dust, and tires and rubber age. A wash every few weeks and an interior refresh twice a year keeps a garage-kept car in great shape.",
      },
      {
        q: "Can I just do everything once a year?",
        a: "You can, but you'll spend more on heavier restoration each time and the car will look worse in between. A little maintenance through the year is easier on the paint and the wallet.",
      },
    ],
    related: [
      { label: "Wash & wax service", href: "/services/wash-and-wax" },
      { label: "Interior detail service", href: "/services/interior-detail" },
      { label: "Compare packages", href: "/packages" },
    ],
    cta: {
      heading: "Want a maintenance rhythm set up?",
      body: "Tell us how you drive and we'll suggest a simple schedule — then come to your driveway on the cadence that fits.",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "paint-correction-vs-polishing",
    title: "Paint Correction vs Polishing: What Is the Difference?",
    description:
      "Paint correction and polishing get used interchangeably, but they're not the same thing. Here's what each one means and which your car actually needs.",
    category: blogCategories.paintCare,
    tags: ["paint correction", "polishing", "swirl removal"],
    datePublished: "2026-05-28",
    dateModified: "2026-06-16",
    body: [
      {
        type: "lead",
        text: [
          "“Polishing” and “paint correction” get thrown around as if they're the same service, and the confusion costs people money — either paying for correction they don't need, or expecting a quick polish to fix defects it can't. Here's the real distinction.",
        ],
      },
      { type: "h2", text: "Polishing is a step" },
      {
        type: "p",
        text: [
          "Polishing is the act of using a machine and an abrasive polish to refine paint. A single light polish can boost gloss and clean up very minor marring, and it's often the final stage of a larger job. On its own, though, a quick polish mostly enhances shine — it isn't designed to remove deeper defects.",
        ],
      },
      { type: "h2", text: "Paint correction is the goal" },
      {
        type: "p",
        text: [
          { text: "Paint correction", href: "/services/paint-correction" },
          " is a process that uses polishing — often in multiple stages — to physically remove defects from the clear coat: swirl marks, holograms, light scratches and oxidation. The defining difference is intent and thoroughness. Correction removes the flaw; a basic polish can temporarily mask or lightly improve it.",
        ],
      },
      { type: "h2", text: "How to tell what your car needs" },
      {
        type: "ul",
        items: [
          ["Look at the paint under direct sun or a focused light. Spider-web swirls and haze that appear around the light source point to defects that need correction."],
          ["If the paint is already fairly clean and you just want a touch more depth before a coating, a single-stage polish may be enough."],
          ["If you're about to apply a ceramic coating, correcting first is what makes the result worth it — the coating locks in whatever is underneath."],
        ],
      },
      {
        type: "callout",
        title: "Why the difference matters for price",
        text: [
          "Multi-stage correction takes real time and skill, which is why it's quoted after inspection rather than sold as a flat “polish.” Paying correction prices for a polish — or expecting a polish to do correction's job — is the most common way people get disappointed.",
        ],
      },
      { type: "h2", text: "Protect the result" },
      {
        type: "p",
        text: [
          "Correction is an investment, so it's worth protecting. Finishing with a sealant or a ",
          { text: "ceramic coating", href: "/services/ceramic-coating" },
          " keeps the corrected finish looking right and makes it far easier to maintain without re-introducing swirls.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will polishing remove scratches?",
        a: "Light surface scratches and swirls in the clear coat can be removed by correction (which uses polishing in stages). Deeper scratches that have gone through the clear coat can't be polished out and may need touch-up or respray.",
      },
      {
        q: "Do I need correction before a ceramic coating?",
        a: "Usually at least a light correction. A coating is transparent and locks in the surface beneath it, so any swirls left in place will be sealed under the coating.",
      },
      {
        q: "How long does paint correction take?",
        a: "It depends on the paint's condition and how many stages it needs — anywhere from most of a day to a couple of days for heavier multi-stage work. We confirm scope after inspecting the paint.",
      },
    ],
    related: [
      { label: "Paint correction service", href: "/services/paint-correction" },
      { label: "Ceramic coating service", href: "/services/ceramic-coating" },
      { label: "Paint correction in Raleigh", href: "/locations/raleigh/paint-correction" },
    ],
    cta: {
      heading: "Not sure if it's swirls or scratches?",
      body: "Send a photo of your paint in good light — we'll tell you whether a polish or full correction is the right call, with a quote.",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "why-mobile-detailing-busy-raleigh-drivers",
    title: "Why Mobile Detailing Is Better for Busy Raleigh Drivers",
    description:
      "Between work, traffic and family, time is the real cost of detailing. Here's why mobile detailing fits busy Raleigh schedules without compromising the result.",
    category: blogCategories.mobile,
    tags: ["mobile detailing", "raleigh", "convenience"],
    datePublished: "2026-06-18",
    dateModified: "2026-06-18",
    body: [
      {
        type: "lead",
        text: [
          "For most Raleigh drivers, the real cost of detailing isn't the price — it's the half-day it takes to drop a car off, arrange a ride, and come back for it. Mobile detailing removes that entirely, and for busy schedules that convenience changes how often the car actually gets cared for.",
        ],
      },
      { type: "h2", text: "You get the time back" },
      {
        type: "p",
        text: [
          "When the studio comes to you, the detail happens while you work, parent or relax. There's no drive across town in Triangle traffic, no waiting room, no second trip. The car is handled in your own driveway or office lot, and you keep your day.",
        ],
      },
      { type: "h2", text: "The result is the same — or better" },
      {
        type: "p",
        text: [
          "A common worry is that mobile means “less thorough.” It doesn't. We bring the same pro-grade products, machine polishers and ",
          { text: "full range of services", href: "/services" },
          " to your driveway — everything from a maintenance wash to ceramic coating. Working at your home also means we can take the time to do it right rather than rushing a bay for the next customer.",
        ],
      },
      { type: "h2", text: "It fits real Raleigh life" },
      {
        type: "ul",
        items: [
          ["Work-from-home days: get the car detailed in the driveway between meetings."],
          ["Office parking: many details can happen in a lot while you're inside."],
          ["Families: no loading kids into a second car for a drop-off and pickup."],
          ["Busy weekends: keep your Saturday instead of spending it at a shop."],
        ],
      },
      {
        type: "callout",
        title: "We bring everything",
        text: [
          "Our setup is fully self-contained — our own water and power — so all we need is a flat spot to park near your vehicle. You don't have to provide anything or be home the entire time for most services.",
        ],
      },
      { type: "h2", text: "Local, and on your schedule" },
      {
        type: "p",
        text: [
          "We're based in Raleigh and route across the Triangle, so booking is simple and timing is flexible. You can see coverage and availability for ",
          { text: "detailing in Raleigh", href: "/locations/raleigh" },
          ", or ",
          { text: "get in touch", href: "/contact" },
          " to set up a time that fits your week.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to be home the whole time?",
        a: "Usually not. We need access to your vehicle and a flat place to park near it. For many services you can hand off the keys and go about your day; we'll confirm details when you book.",
      },
      {
        q: "What do you need from me on-site?",
        a: "Just a spot to park near the car. Our rig carries its own water and power, so you don't need to provide a hose, outlet or anything else.",
      },
      {
        q: "Is mobile detailing as thorough as a shop?",
        a: "Yes. We bring the same professional products and equipment, and working at your location lets us take the time to do the job properly rather than rushing.",
      },
    ],
    related: [
      { label: "Detailing in Raleigh", href: "/locations/raleigh" },
      { label: "See all services", href: "/services" },
      { label: "Book or get a quote", href: "/contact" },
    ],
    cta: {
      heading: "Reclaim your Saturday.",
      body: "Book a mobile detail and we'll bring the studio to your Raleigh driveway — same pro results, none of the drop-off.",
    },
  },
];

/* ================================================================== */
/* Helpers                                                            */
/* ================================================================== */

export function allPosts(): BlogPost[] {
  // Newest first.
  return [...posts].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function featuredPost(): BlogPost {
  return posts.find((p) => p.featured) ?? allPosts()[0];
}

/** Posts related by shared category first, then shared tags. */
export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const others = posts.filter((p) => p.slug !== post.slug);
  const scored = others
    .map((p) => {
      let score = p.category.slug === post.category.slug ? 2 : 0;
      score += p.tags.filter((t) => post.tags.includes(t)).length;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || (a.p.datePublished < b.p.datePublished ? 1 : -1));
  return scored.slice(0, limit).map((s) => s.p);
}

/** Rough reading time in minutes from the post body + faqs. */
export function readingTime(post: BlogPost): number {
  const richToText = (rt: RichText) =>
    rt.map((s) => (typeof s === "string" ? s : s.text)).join(" ");
  let words = `${post.title} ${post.description}`.split(/\s+/).length;
  for (const b of post.body) {
    if (b.type === "h2" || b.type === "h3" || b.type === "quote") {
      words += b.text.split(/\s+/).length;
    } else if (b.type === "ul" || b.type === "ol") {
      words += b.items.map(richToText).join(" ").split(/\s+/).length;
    } else if (b.type === "callout") {
      words += richToText(b.text).split(/\s+/).length + (b.title?.split(/\s+/).length ?? 0);
    } else {
      words += richToText(b.text).split(/\s+/).length;
    }
  }
  for (const f of post.faqs ?? []) {
    words += `${f.q} ${f.a}`.split(/\s+/).length;
  }
  return Math.max(1, Math.round(words / 200));
}

/** Format an ISO date as e.g. "March 4, 2026". */
export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/* ------------------------------------------------------------------ */
/* Contextual selection — money pages → relevant blog posts.          */
/* ------------------------------------------------------------------ */

/**
 * Maps a service slug to the blog tags that signal topical relevance.
 * Keep these to genuine topic overlaps — a weak match is worse than none.
 */
const serviceTopicTags: Record<string, string[]> = {
  "ceramic-coating": ["ceramic coating", "paint protection"],
  "paint-correction": ["paint correction", "polishing", "swirl removal"],
  "wash-and-wax": ["wax", "maintenance"],
  "interior-detail": ["maintenance", "car care"],
  "exterior-detail": ["paint protection", "wax", "maintenance"],
  "full-detail": ["maintenance", "car care", "car detailing"],
  // headlight-restoration, odor-removal, engine-bay-cleaning have no dedicated
  // article yet — they fall back to the broadly-useful evergreen set below.
};

/**
 * Broadly-useful articles for any money page. Used to top up when there
 * aren't enough strong topical matches — cost and convenience are relevant
 * to every detailing buyer, so these are useful rather than filler.
 */
const EVERGREEN_SLUGS = [
  "car-detailing-cost-raleigh-nc",
  "why-mobile-detailing-busy-raleigh-drivers",
  "how-often-should-you-detail-your-car",
];

const STRONG_SCORE = 3;

/**
 * Selects the most relevant blog posts for a service and/or city context.
 *
 * Strong topical matches come first; if there are fewer than `limit`, we top
 * up with curated evergreen posts so every money page gets 2–3 genuinely
 * useful links — never an irrelevant one. Pure slug-string logic (no imports
 * from services/cities), so it stays dependency-free and SSG-safe.
 */
export function postsForContext(opts: {
  serviceSlug?: string;
  citySlug?: string;
  limit?: number;
}): BlogPost[] {
  const limit = opts.limit ?? 3;
  const topicTags = opts.serviceSlug ? serviceTopicTags[opts.serviceSlug] ?? [] : [];
  const cityWord = opts.citySlug ? opts.citySlug.replace(/-/g, " ") : "";

  const scored = posts.map((p) => {
    let score = 0;
    for (const t of topicTags) if (p.tags.includes(t)) score += 3;
    if (cityWord && p.tags.some((t) => t.toLowerCase() === cityWord)) score += 2;
    return { p, score };
  });

  const strong = scored
    .filter((s) => s.score >= STRONG_SCORE)
    .sort((a, b) => b.score - a.score || (a.p.datePublished < b.p.datePublished ? 1 : -1))
    .map((s) => s.p);

  if (strong.length >= limit) return strong.slice(0, limit);

  // Top up with evergreen posts not already selected (order preserved).
  const chosen = new Set(strong.map((p) => p.slug));
  const fillers = EVERGREEN_SLUGS.map((slug) => posts.find((p) => p.slug === slug)).filter(
    (p): p is BlogPost => !!p && !chosen.has(p.slug),
  );

  return [...strong, ...fillers].slice(0, limit);
}
