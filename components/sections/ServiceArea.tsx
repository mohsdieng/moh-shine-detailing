import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";
import { site } from "@/lib/site";

export function ServiceArea() {
  return (
    <Section id="service-area" className="bg-slate-surface">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow mb-3">Where we work</p>
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Mobile detailing across the Triangle
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-muted sm:text-lg">
            Moh&apos;s Shine Detailing is a fully mobile service based in the
            Raleigh–Durham area. We bring everything we need straight to your home
            or workplace — so you get a professional, hand-finished detail without
            ever leaving your driveway.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-muted sm:text-lg">
            We proudly serve Raleigh, Durham and the surrounding North Carolina
            communities. Not sure if you&apos;re in range? Reach out and we&apos;ll
            let you know.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="grid grid-cols-2 gap-3">
            {site.areaServed.map((area) => (
              <li
                key={area}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm font-medium transition-colors hover:border-shine/50"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-shine/15 text-shine">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>
                </span>
                {area}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
