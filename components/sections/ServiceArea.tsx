"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";
import { serviceCities, neighborhoods } from "@/lib/content";

/**
 * Stylised Triangle-area map (not a real geo map — coordinates are
 * approximated from city latitude/longitude and scaled into a 600x440 SVG).
 *
 * We pin Raleigh as the HQ and animate connection lines outward to the other
 * cities, with pulsing rings around every pin. The right column lists the
 * cities with cadence notes plus a chip cloud of neighborhoods.
 */
const pins = [
  { name: "Raleigh", x: 420, y: 297, hq: true },
  { name: "Durham", x: 225, y: 55 },
  { name: "Cary", x: 315, y: 286 },
  { name: "Chapel Hill", x: 113, y: 154 },
  { name: "Apex", x: 263, y: 352 },
  { name: "Morrisville", x: 278, y: 253 },
  { name: "Wake Forest", x: 525, y: 55 },
];

const HQ = pins.find((p) => p.hq)!;

export function ServiceArea() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="service-area"
      className="bg-slate-surface"
      eyebrow="Where we work"
      heading={
        <>
          Mobile detailing <span className="text-shine">across the Triangle.</span>
        </>
      }
      intro="Fully mobile — based in Raleigh, working out of every driveway in the NC Triangle. Find your city below, or send your zip code if you're nearby."
    >
      <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* Map */}
        <Reveal>
          <div className="relative aspect-[600/440] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black to-slate-card p-4 sm:p-6">
            {/* Soft glow halo */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-shine/15 blur-3xl"
            />

            <svg
              viewBox="0 0 600 440"
              className="relative h-full w-full"
              role="img"
              aria-label="Service area map of the Raleigh-Durham Triangle"
            >
              {/* Dot grid */}
              <defs>
                <pattern
                  id="dotgrid"
                  x="0"
                  y="0"
                  width="22"
                  height="22"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)" />
                </pattern>
              </defs>
              <rect width="600" height="440" fill="url(#dotgrid)" />

              {/* Connection lines from HQ to every other city */}
              {pins
                .filter((p) => !p.hq)
                .map((p, i) => (
                  <motion.line
                    key={p.name}
                    x1={HQ.x}
                    y1={HQ.y}
                    x2={p.x}
                    y2={p.y}
                    stroke="#38B6FF"
                    strokeWidth="1.3"
                    strokeDasharray="4 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.55 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}

              {/* Pins */}
              {pins.map((p, i) => (
                <g key={p.name} transform={`translate(${p.x} ${p.y})`}>
                  {/* Pulse rings — pure SVG circles, animated via Tailwind. */}
                  {!reduce && (
                    <>
                      <circle
                        r="10"
                        fill="none"
                        stroke="#38B6FF"
                        strokeWidth="1.4"
                        className="origin-center animate-pulse-ring"
                        style={{ animationDelay: `${i * 0.4}s` }}
                      />
                      <circle
                        r="10"
                        fill="none"
                        stroke="#38B6FF"
                        strokeWidth="1.2"
                        opacity="0.6"
                        className="origin-center animate-pulse-ring"
                        style={{ animationDelay: `${0.6 + i * 0.4}s` }}
                      />
                    </>
                  )}

                  {/* Solid pin */}
                  <motion.circle
                    r={p.hq ? 10 : 6.5}
                    fill={p.hq ? "#38B6FF" : "#FFFFFF"}
                    stroke="#000"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.05,
                      type: "spring",
                      stiffness: 180,
                      damping: 14,
                    }}
                  />

                  {/* Label */}
                  <motion.text
                    x={p.hq ? 16 : 12}
                    y={p.hq ? 5 : 4}
                    fill="#FFFFFF"
                    fontSize={p.hq ? 14 : 12}
                    fontWeight={p.hq ? 700 : 500}
                    initial={{ opacity: 0, x: -4 }}
                    whileInView={{ opacity: 1, x: p.hq ? 16 : 12 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.55 + i * 0.05, duration: 0.4 }}
                    style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
                  >
                    {p.name}
                  </motion.text>
                  {p.hq && (
                    <motion.text
                      x={16}
                      y={22}
                      fill="#38B6FF"
                      fontSize={10}
                      fontWeight={600}
                      letterSpacing="2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.75, duration: 0.4 }}
                      style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
                    >
                      HQ
                    </motion.text>
                  )}
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-muted backdrop-blur sm:bottom-5 sm:left-5">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-shine" /> Hub
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white" /> Service area
              </span>
            </div>
          </div>
        </Reveal>

        {/* Cities + neighborhoods */}
        <div>
          <Reveal delay={0.05}>
            <ul className="grid gap-3">
              {serviceCities.map((c) => (
                <li
                  key={c.name}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-shine/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-shine/15 text-shine transition-colors group-hover:bg-shine group-hover:text-black">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" />
                        <circle cx="12" cy="10" r="2.4" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{c.name}, NC</p>
                      <p className="text-xs text-slate-muted">{c.note}</p>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-shine opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="mt-8">
            <p className="text-xs uppercase tracking-wider text-slate-muted">
              Neighborhoods we visit
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {neighborhoods.map((n, i) => (
                <motion.li
                  key={n}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.025 }}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/85 transition-colors hover:border-shine/50 hover:text-shine"
                >
                  {n}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
