"use client";

import Link from "next/link";
import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";
import { Button } from "../ui/Button";
import { Magnetic } from "../anim/Magnetic";
import { Tilt } from "../anim/Tilt";
import { services } from "@/lib/services";
import { serviceIcons } from "../icons";
import { site } from "@/lib/site";

/**
 * Services section — clean grid of all nine offerings.
 *
 * Each card links through to its dedicated `/services/[slug]` detail page.
 * On hover the card tilts subtly (Tilt) and the icon flips colour.
 */
export function Services() {
  return (
    <Section
      id="services"
      eyebrow="What we do"
      heading={
        <>
          Detailing services, <span className="text-shine">done by hand.</span>
        </>
      }
      intro="Every service is performed by hand with pro-grade products at your home or office. Tap a card to see what's included, the process and pricing."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = serviceIcons[service.icon];
          return (
            <Reveal key={service.slug} delay={i * 0.05}>
              <Tilt max={4}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-card to-black p-7 transition-all duration-300 hover:border-shine/50 hover:shadow-[0_20px_50px_-20px_rgba(56,182,255,0.45)]"
                >
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-shine/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-shine/30 bg-shine/10 text-shine transition-colors group-hover:bg-shine group-hover:text-black">
                      <Icon width={26} height={26} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-shine/70">
                      0{i + 1} / 0{services.length}
                    </span>
                  </div>

                  <h3 className="relative z-10 mt-5 text-xl font-bold leading-snug tracking-tight">
                    {service.title}
                  </h3>
                  <p className="relative z-10 mt-2 line-clamp-3 text-sm leading-relaxed text-slate-muted">
                    {service.blurb}
                  </p>

                  <div className="relative z-10 mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-muted">
                    <span className="rounded-full border border-white/10 px-2.5 py-1">
                      {service.duration}
                    </span>
                    {service.priceLocked && (
                      <span className="rounded-full border border-shine/40 bg-shine/10 px-2.5 py-1 font-semibold text-shine">
                        Confirmed price
                      </span>
                    )}
                  </div>

                  <div className="relative z-10 mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-muted">
                        From
                      </p>
                      <p className="mt-0.5 font-semibold text-shine">{service.price}</p>
                    </div>
                    <span className="text-sm font-semibold text-white transition-all group-hover:translate-x-1 group-hover:text-shine">
                      Learn more →
                    </span>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          );
        })}
      </div>

      <Reveal
        delay={0.15}
        className="mt-14 flex flex-col items-center gap-5 text-center"
      >
        <p className="max-w-xl text-sm text-slate-muted sm:text-base">
          Not sure which package fits your car? Tell us about your vehicle and
          we&apos;ll recommend the right detail — usually within the hour.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Magnetic>
            <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer" size="lg">
              Book a Detail
            </Button>
          </Magnetic>
          <Magnetic strength={6}>
            <Button href="/packages" variant="secondary" size="lg">
              See packages
            </Button>
          </Magnetic>
        </div>
      </Reveal>
    </Section>
  );
}
