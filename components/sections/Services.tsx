"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "../ui/Container";
import { Reveal } from "../Reveal";
import { Button } from "../ui/Button";
import { Magnetic } from "../anim/Magnetic";
import { Tilt } from "../anim/Tilt";
import { services } from "@/lib/services";
import { serviceIcons } from "../icons";
import { site } from "@/lib/site";

/**
 * Services section.
 *
 * Desktop / large screens: a horizontal "scroll-jack" — the section is taller
 * than the viewport, a sticky inner frame holds a horizontal track, and the
 * track translates left as the user scrolls vertically. This is the classic
 * awwwards-style showcase where each service slides past in turn.
 *
 * Mobile / reduced motion: collapses to a normal vertical stack of tilt cards
 * so the experience stays smooth and touch-friendly.
 */
export function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 bg-black">
      {/* Section header */}
      <Container className="pt-20 sm:pt-28">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-3">What we do</p>
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Detailing services, <span className="text-shine">done by hand.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-muted sm:text-lg">
            Every package is performed by hand with pro-grade products — no
            automated brushes, no shortcuts. Choose a service or ask us to build
            a custom package for your vehicle.
          </p>
        </Reveal>
      </Container>

      {/* Desktop horizontal scroll-jack */}
      <HorizontalShowcase />

      {/* Mobile stacked cards */}
      <Container className="mt-12 grid gap-5 lg:hidden">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.06}>
            <ServiceCard slug={service.slug} compact />
          </Reveal>
        ))}
      </Container>

      {/* Footer CTA */}
      <Container className="py-20 sm:py-28">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <p className="max-w-lg text-sm text-slate-muted sm:text-base">
            Not sure which package fits? Tell us about your vehicle and we&apos;ll
            recommend the right detail — usually within the hour.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer" size="lg">
                Book a Detail
              </Button>
            </Magnetic>
            <Magnetic strength={10}>
              <Button href="#contact" variant="secondary" size="lg">
                Get a Quote
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal scroll-jacking track (lg+ only).                         */
/* ------------------------------------------------------------------ */

function HorizontalShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Track scroll progress through the tall outer wrapper.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // Layout math kept simple: each card is 70vw wide with a 4vw gap; we
  // translate horizontally far enough that the last card lands centred at the
  // end of the scroll. With 4 cards: 4*70 + 3*4 = 292vw of content. To bring
  // the right edge to viewport's right we translate by -(292 - 100) = -192vw.
  const count = services.length;
  const cardVw = 70;
  const gapVw = 4;
  const totalVw = count * cardVw + (count - 1) * gapVw;
  const distance = totalVw - 100; // vw to translate
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", reduce ? "0vw" : `-${distance}vw`],
  );

  return (
    <div
      ref={wrapRef}
      // Hide on small screens — mobile users get the stacked grid instead.
      className="relative mt-12 hidden lg:block"
      // Total height: one viewport per card so each gets meaningful dwell.
      style={{ height: `${count * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex items-stretch gap-[4vw] pl-[5vw] pr-[5vw] will-change-transform"
        >
          {services.map((s, i) => (
            <div
              key={s.slug}
              style={{ width: `${cardVw}vw`, maxWidth: 880 }}
              className="flex-shrink-0"
            >
              <ServiceCard slug={s.slug} index={i + 1} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Detailed service card.                                              */
/* ------------------------------------------------------------------ */

function ServiceCard({
  slug,
  index,
  compact = false,
}: {
  slug: string;
  index?: number;
  compact?: boolean;
}) {
  const service = services.find((x) => x.slug === slug);
  if (!service) return null;
  const Icon = serviceIcons[service.icon];

  const Inner = (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-card to-black p-7 transition-colors duration-300 hover:border-shine/40 sm:p-9">
      {/* Decorative blue glow on hover */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-shine/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top row: number + icon */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-shine/30 bg-shine/10 text-shine transition-colors group-hover:bg-shine group-hover:text-black">
          <Icon width={30} height={30} />
        </div>
        {index !== undefined && (
          <span className="font-mono text-sm font-semibold uppercase tracking-widest text-shine/70">
            0{index} / 0{services.length}
          </span>
        )}
      </div>

      {/* Title + blurb */}
      <h3 className="relative z-10 mt-6 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
        {service.title}
      </h3>
      <p className="relative z-10 mt-3 max-w-md text-sm leading-relaxed text-slate-muted sm:text-base">
        {service.description}
      </p>

      {/* Meta row: duration + ideal for */}
      <dl className="relative z-10 mt-6 grid grid-cols-2 gap-4 border-y border-white/10 py-4 text-xs sm:text-sm">
        <div>
          <dt className="uppercase tracking-wider text-slate-muted">Duration</dt>
          <dd className="mt-1 font-semibold text-white">{service.duration}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-wider text-slate-muted">Ideal for</dt>
          <dd className="mt-1 font-medium text-white/90">{service.idealFor}</dd>
        </div>
      </dl>

      {/* Includes */}
      <div className="relative z-10 mt-5">
        <p className="text-xs uppercase tracking-wider text-slate-muted">What&apos;s included</p>
        <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-white/90 sm:grid-cols-2">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tier pricing or single price */}
      <div className="relative z-10 mt-6">
        {service.tiers ? (
          <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-white/10">
            {(["sedan", "suv", "truck"] as const).map((t) => (
              <div
                key={t}
                className="border-r border-white/10 px-3 py-3 text-center last:border-r-0"
              >
                <p className="text-[10px] uppercase tracking-wider text-slate-muted">
                  {t === "suv" ? "SUV" : t}
                </p>
                <p className="mt-0.5 text-base font-bold text-shine">
                  {service.tiers![t]}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-base font-semibold text-shine">{service.price}</p>
        )}
      </div>

      {/* Add-ons + CTA */}
      <div className="relative z-10 mt-auto flex flex-col gap-4 pt-6 sm:flex-row sm:items-end sm:justify-between">
        {service.addOns && (
          <div className="text-xs text-slate-muted">
            <span className="block uppercase tracking-wider text-slate-muted/80">
              Popular add-ons
            </span>
            <span className="mt-1 block text-white/80">
              {service.addOns.join(" · ")}
            </span>
          </div>
        )}
        <Magnetic strength={8}>
          <Button
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant={compact ? "secondary" : "primary"}
            className="self-start"
          >
            Book this detail
          </Button>
        </Magnetic>
      </div>
    </article>
  );

  // Tilt only for desktop cards (compact = mobile stack).
  if (compact) return Inner;
  return <Tilt max={4}>{Inner}</Tilt>;
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
