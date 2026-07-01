"use client";

import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";
import { Tilt } from "../anim/Tilt";
import { CountUp } from "../anim/CountUp";
import { valueProps, stats, statsPublished } from "@/lib/content";

/**
 * Why Us / Stats — a two-part block:
 *  1. A 2x2 grid of value-prop tilt cards with big numerals.
 *  2. A horizontal animated-counter strip that anchors the social proof.
 */
export function WhyUs() {
  return (
    <Section
      id="why-us"
      eyebrow="Why Moh's Shine"
      heading={
        <>
          We obsess over the details, <span className="text-shine">so you don&apos;t have to.</span>
        </>
      }
      intro="Four reasons drivers across the Triangle keep rebooking — and recommending us to their neighbors."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {valueProps.map((vp, i) => (
          <Reveal key={vp.title} delay={i * 0.08}>
            <Tilt max={5}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-card to-black p-7 sm:p-9">
                {/* Big background numeral */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-6 select-none text-[8rem] font-bold italic leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-shine/10 sm:text-[10rem]"
                >
                  {vp.glyph}
                </span>

                <div className="relative">
                  <span className="inline-flex items-center rounded-full border border-shine/40 bg-shine/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-shine">
                    {vp.glyph}
                  </span>
                  <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                    {vp.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-muted sm:text-base">
                    {vp.body}
                  </p>
                </div>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>

      {/* Live stat strip — only when real, confirmed numbers exist */}
      {statsPublished && stats.length > 0 && (
      <Reveal delay={0.15} className="mt-12">
        <dl className="grid grid-cols-2 gap-y-8 rounded-3xl border border-white/10 bg-black/40 p-8 sm:grid-cols-4 sm:p-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                <CountUp
                  to={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </dt>
              <dd className="mt-2 text-[11px] uppercase tracking-wider text-slate-muted sm:text-xs">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
      )}
    </Section>
  );
}
