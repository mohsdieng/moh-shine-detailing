"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../ui/Container";
import { Reveal } from "../Reveal";
import { Button } from "../ui/Button";
import { BookButton } from "../ui/BookButton";
import { Magnetic } from "../anim/Magnetic";

const tiers = [
  {
    name: "Express",
    tagline: "Recurring refresh",
    price: "$50 / $65",
    cadence: "Sedan / SUV",
    features: ["Hand wash", "Towel dry", "Spray wax", "Tire dressing"],
  },
  {
    name: "Premium",
    tagline: "Exterior reset",
    price: "On request",
    cadence: "Starting price by vehicle",
    features: ["Express included", "Iron decon", "Clay bar", "Long-lasting sealant"],
    popular: true,
  },
  {
    name: "Signature",
    tagline: "Inside · outside · sealed",
    price: "from $200",
    cadence: "Tailored to vehicle",
    features: ["Premium included", "Interior detail", "Glass treated", "Walk-around inspection"],
  },
];

/**
 * Packages teaser — luxury 3-tier preview shown on the home page.
 * Links through to /packages for the full breakdown.
 */
export function PackagesTeaser() {
  const reduce = useReducedMotion();

  return (
    <section
      id="packages"
      className="relative scroll-mt-24 border-t border-chrome-line bg-navy-950 py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-6">Packages</p>
            <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tightest sm:text-5xl md:text-6xl">
              Three tiers,
              <br />
              <span className="text-shine italic">clear pricing.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-md text-base font-light leading-relaxed text-chrome sm:text-lg">
              From a weekly refresh to a full inside-and-out reset — three
              packages designed around how often you want your car detailed.
              Custom builds available on request.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.article
              key={tier.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
              }
              className={`relative flex flex-col p-8 sm:p-10 ${
                tier.popular
                  ? "border border-shine bg-gradient-to-b from-shine/10 to-transparent"
                  : "border border-chrome-line bg-black/40"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-8 inline-flex items-center bg-shine px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-black">
                  Most popular
                </span>
              )}

              <p className="font-mono text-[11px] uppercase tracking-widest text-chrome/70">
                {tier.tagline}
              </p>
              <h3 className="mt-4 text-3xl font-bold tracking-tightest text-white sm:text-4xl">
                {tier.name}
              </h3>

              <div className="mt-6 border-t border-chrome-line pt-5">
                <p className="text-2xl font-semibold text-white sm:text-3xl">
                  {tier.price}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-chrome/70">
                  {tier.cadence}
                </p>
              </div>

              <ul className="mt-7 space-y-3 text-sm text-white/90">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-2 h-px w-3 flex-shrink-0 bg-shine" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/packages"
                className="group mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:text-shine"
              >
                Full breakdown
                <span className="text-shine transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-14 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-chrome">
            Combining ceramic coating, paint correction or specialty add-ons?
            We&apos;ll build a custom package around your car.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <BookButton>Book a Detail</BookButton>
            </Magnetic>
            <Magnetic strength={6}>
              <Button href="/packages" variant="secondary">
                Compare Packages
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
