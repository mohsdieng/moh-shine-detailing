"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../ui/Container";
import { CinematicPanel } from "../anim/CinematicPanel";
import { CinematicVideo } from "../anim/CinematicVideo";
import { ServiceDemoFrame, hasServiceDemo } from "../demos/ServiceDemo";
import { mediaFor } from "@/lib/media";
import type { Service } from "@/lib/services";

type FeatureProps = {
  service: Service;
  /** Sequence number rendered as the eyebrow tag (01, 02, …). */
  index: number;
  /** Total count for the "01 / 05" treatment. */
  total: number;
  /** Visual on the left or right. Alternates per row on the home page. */
  align?: "left" | "right";
  /** Optional custom CTA href — defaults to /services/[slug]. */
  href?: string;
};

/**
 * Premium feature row used to present a single service on the home page.
 *
 * Two-column composition with the cinematic visual on one side and
 * elegant editorial copy on the other. Alternates per row via `align`.
 * Plenty of negative space; never feels like a sales card.
 */
export function Feature({ service, index, total, align = "left", href }: FeatureProps) {
  const reduce = useReducedMotion();
  const detailHref = href ?? `/services/${service.slug}`;
  const m = mediaFor(service.slug);
  const tag = `${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  // Visual column order — swaps based on alignment.
  const visualClasses = align === "right" ? "lg:order-2" : "lg:order-1";
  const textClasses = align === "right" ? "lg:order-1" : "lg:order-2";

  const fadeIn = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" } as const,
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section className="relative border-t border-chrome-line bg-black py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Visual — an interactive service demonstration when the service has
              one (paint correction, ceramic, headlight, interior, exterior),
              otherwise the cinematic video panel. CinematicVideo falls back to
              the icon-focal CinematicPanel when its files are absent so the
              layout never feels empty. */}
          <motion.div {...fadeIn} className={visualClasses}>
            {hasServiceDemo(service.slug) ? (
              <ServiceDemoFrame
                slug={service.slug}
                className="aspect-[4/5] sm:aspect-[5/6] md:aspect-[4/5]"
              />
            ) : (
              <CinematicVideo
                video={m.video}
                poster={m.poster}
                tag={service.shortTitle.toUpperCase()}
                alt={`${service.title} — premium mobile detailing in Raleigh-Durham`}
                className="aspect-[4/5] sm:aspect-[5/6] md:aspect-[4/5]"
                fallback={<CinematicPanel icon={service.icon} bare />}
              />
            )}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
            }
            className={`max-w-xl ${textClasses}`}
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-chrome/70">
              {tag} · {service.shortTitle}
            </p>

            <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tightest text-white sm:text-5xl lg:text-[3.5rem]">
              {service.title}.
            </h2>

            <div className="mt-6 h-px w-16 bg-shine" aria-hidden="true" />

            <p className="mt-6 text-base font-light leading-relaxed text-chrome sm:text-lg">
              {service.description}
            </p>

            {/* Top 4 benefits — minimal hairline list */}
            <ul className="mt-8 divide-y divide-chrome-line border-y border-chrome-line">
              {service.benefits.slice(0, 4).map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-4 py-3 text-sm text-white/90"
                >
                  <span className="mt-2 h-px w-4 flex-shrink-0 bg-shine" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Meta + CTA */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <dl className="flex items-center gap-6 text-xs uppercase tracking-widest text-chrome">
                <div>
                  <dt className="text-chrome/50">Duration</dt>
                  <dd className="mt-1 text-white">{service.duration}</dd>
                </div>
                <div>
                  <dt className="text-chrome/50">From</dt>
                  <dd className="mt-1 text-shine">{service.price}</dd>
                </div>
              </dl>

              <Link
                href={detailHref}
                className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:text-shine"
              >
                Learn more
                <span className="relative inline-block h-px w-8 overflow-hidden bg-chrome/40">
                  <span className="absolute inset-y-0 left-0 w-full bg-shine transition-transform duration-500 ease-out -translate-x-full group-hover:translate-x-0" />
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
