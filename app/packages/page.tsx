import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BookButton } from "@/components/ui/BookButton";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/anim/Magnetic";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Detailing Packages & Pricing in Raleigh & Durham, NC",
  description:
    "Mobile car detailing packages from Moh's Shine in Raleigh-Durham. Express wash & wax from $50, Premium exterior detail, and Signature full detail — clear pricing, no hidden fees.",
  path: "/packages",
});

/**
 * Three-tier packages page. The "Premium" tier is highlighted as Most Popular.
 * Express tier carries the confirmed $50 / $65 wash-and-wax pricing from the
 * services catalogue. The other tiers use "Contact for quote" / "from" until
 * confirmed.
 */
type Tier = {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  cadence: string;
  ctaLabel: string;
  popular?: boolean;
  features: string[];
  bestFor: string;
};

const tiers: Tier[] = [
  {
    slug: "express",
    name: "Express",
    tagline: "The recurring refresh",
    price: "$50 / $65",
    cadence: "per visit — sedan / SUV & truck",
    ctaLabel: "Book Express",
    features: [
      "Two-bucket hand wash",
      "Wheels, tires & door jambs",
      "Streak-free towel dry",
      "Quick spray wax",
      "Tire dressing",
    ],
    bestFor: "Drivers who want a safe weekly or bi-weekly clean.",
  },
  {
    slug: "premium",
    name: "Premium",
    tagline: "Exterior reset, done right",
    price: "Contact for quote",
    cadence: "starting price by vehicle size",
    ctaLabel: "Quote Premium",
    popular: true,
    features: [
      "Everything in Express",
      "Iron-fallout decontamination",
      "Clay bar of every panel",
      "Long-lasting spray sealant",
      "Trim & rubber dressing",
      "Glass exterior polished",
    ],
    bestFor: "Cars that haven't been detailed in a few months.",
  },
  {
    slug: "signature",
    name: "Signature",
    tagline: "Inside, outside, sealed",
    price: "from $200",
    cadence: "tailored to vehicle size and condition",
    ctaLabel: "Book Signature",
    features: [
      "Everything in Premium",
      "Full interior detail",
      "Steam clean every surface",
      "Leather / fabric treatment",
      "Glass treated inside & out",
      "Detailed door jambs & fuel door",
      "Final walk-around inspection",
    ],
    bestFor: "Quarterly resets, special occasions, listing for sale.",
  },
];

/** Items used in the apples-to-apples comparison table. */
const compareRows: { label: string; tiers: [boolean, boolean, boolean] }[] = [
  { label: "Two-bucket hand wash", tiers: [true, true, true] },
  { label: "Wheels, tires & door jambs", tiers: [true, true, true] },
  { label: "Streak-free towel dry", tiers: [true, true, true] },
  { label: "Quick spray wax", tiers: [true, true, true] },
  { label: "Iron-fallout decontamination", tiers: [false, true, true] },
  { label: "Clay bar (full vehicle)", tiers: [false, true, true] },
  { label: "Long-lasting spray sealant", tiers: [false, true, true] },
  { label: "Trim & rubber dressing", tiers: [false, true, true] },
  { label: "Glass exterior polished", tiers: [false, true, true] },
  { label: "Full interior detail", tiers: [false, false, true] },
  { label: "Leather / fabric treatment", tiers: [false, false, true] },
  { label: "Glass treated inside & out", tiers: [false, false, true] },
  { label: "Final walk-around inspection", tiers: [false, false, true] },
];

export default function PackagesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
        ])}
      />

      <PageHeader
        eyebrow="Packages & pricing"
        title="Clear pricing. No hidden fees."
        intro="Three packages built around how often you want your car detailed. Add-ons available on every tier — ceramic coating, paint correction and headlight restoration sold separately."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
        ]}
      />

      <Section>
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.slug} delay={i * 0.08}>
              <article
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 sm:p-9 ${
                  tier.popular
                    ? "border-shine bg-gradient-to-br from-shine/20 to-slate-card shadow-[0_20px_60px_-20px_rgba(56,182,255,0.5)]"
                    : "border-white/10 bg-gradient-to-br from-slate-card to-black hover:border-shine/40"
                }`}
              >
                {tier.popular && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-shine px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                    Most popular
                  </span>
                )}

                <p className="text-xs uppercase tracking-wider text-shine">
                  {tier.tagline}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {tier.name}
                </h2>

                <div className="mt-6 border-y border-white/10 py-5">
                  <p className="text-2xl font-bold text-white sm:text-3xl">
                    {tier.price}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-muted">
                    {tier.cadence}
                  </p>
                </div>

                <ul className="mt-6 grid gap-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/90">
                      <Check />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-slate-muted">
                  <span className="block text-[10px] uppercase tracking-wider text-slate-muted/80">
                    Best for
                  </span>
                  <span className="mt-1 block text-white/85">{tier.bestFor}</span>
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  <Magnetic>
                    <BookButton
                      variant={tier.popular ? "primary" : "secondary"}
                      size="lg"
                      className="w-full"
                    >
                      {tier.ctaLabel}
                    </BookButton>
                  </Magnetic>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Comparison table */}
      <Section
        className="bg-slate-surface"
        eyebrow="Side-by-side"
        heading={
          <>
            What&apos;s included in <span className="text-shine">each tier.</span>
          </>
        }
        intro="The full breakdown — every step, every package."
      >
        <Reveal>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-muted">
                  <th className="px-5 py-4 font-semibold">Step</th>
                  {tiers.map((t) => (
                    <th
                      key={t.slug}
                      className={`px-5 py-4 text-center font-semibold ${
                        t.popular ? "text-shine" : "text-white"
                      }`}
                    >
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label} className="border-b border-white/5 last:border-b-0">
                    <td className="px-5 py-3.5 text-white/90">{row.label}</td>
                    {row.tiers.map((included, i) => (
                      <td key={i} className="px-5 py-3.5 text-center">
                        {included ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-shine/15 text-shine">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="m5 12 5 5L20 6" />
                            </svg>
                          </span>
                        ) : (
                          <span className="text-slate-muted/40">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      {/* Bottom CTA */}
      <Section>
        <Container>
          <Reveal className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-shine/15 to-slate-card p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Need a custom quote?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-muted sm:text-base">
              Combining ceramic coating, paint correction or specialty add-ons?
              Tell us about your car and we&apos;ll build the right package.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Button href="/contact" size="lg">
                  Request a Quote
                </Button>
              </Magnetic>
              <Magnetic strength={6}>
                <BookButton variant="secondary" size="lg">Or book directly</BookButton>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function Check() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 flex-shrink-0 text-shine"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 5 5L20 6" />
    </svg>
  );
}
