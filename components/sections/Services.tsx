"use client";

import Link from "next/link";
import { Container } from "../ui/Container";
import { Reveal } from "../Reveal";
import { Button } from "../ui/Button";
import { Magnetic } from "../anim/Magnetic";
import { Feature } from "./Feature";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * Services section on the home page — five "feature" rows in alternating
 * left/right orientation, leading into a compact list of every other service.
 *
 * The selection here mirrors the user's launch-page narrative:
 *   Exterior · Interior · Paint Correction · Ceramic Coating · Odor Removal
 */
const featuredSlugs = [
  "exterior-detail",
  "interior-detail",
  "paint-correction",
  "ceramic-coating",
  "odor-removal",
] as const;

export function Services() {
  const featured = featuredSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => !!s);

  const remaining = services.filter((s) => !featuredSlugs.includes(s.slug as (typeof featuredSlugs)[number]));

  return (
    <section id="services" className="relative scroll-mt-24 bg-black">
      {/* Section intro — restrained, premium */}
      <Container className="py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-6">The services</p>
          <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tightest sm:text-5xl md:text-6xl">
            Hand-finished detailing,
            <br />
            <span className="text-shine italic">on your driveway.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-chrome sm:text-lg">
            Every service is performed by hand using pro-grade products. Five
            cornerstone offerings — and a deeper menu beyond.
          </p>
        </Reveal>
      </Container>

      {/* Five featured services — alternating layout */}
      {featured.map((service, i) => (
        <Feature
          key={service.slug}
          service={service}
          index={i + 1}
          total={featured.length}
          align={i % 2 === 0 ? "left" : "right"}
        />
      ))}

      {/* Compact list of every other service */}
      <div className="border-t border-chrome-line bg-navy-950 py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="eyebrow mb-5">Also available</p>
            <h3 className="text-balance text-3xl font-bold tracking-tightest sm:text-4xl">
              The full menu.
            </h3>
          </Reveal>

          <ul className="mt-10 divide-y divide-chrome-line border-y border-chrome-line">
            {remaining.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 0.04}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-6 py-6 transition-colors hover:text-shine"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-chrome/60">
                      {String(featured.length + i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-shine sm:text-2xl">
                      {s.title}
                    </span>
                  </div>
                  <span className="hidden text-xs uppercase tracking-widest text-chrome group-hover:text-shine sm:inline">
                    {s.duration}
                  </span>
                  <span className="text-shine transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1} className="mt-14 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-chrome">
              Need something we haven&apos;t listed? Tell us about the car and
              we&apos;ll build a quote — usually within the hour.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book a Detail
                </Button>
              </Magnetic>
              <Magnetic strength={6}>
                <Button href="/services" variant="secondary">
                  View All Services
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
