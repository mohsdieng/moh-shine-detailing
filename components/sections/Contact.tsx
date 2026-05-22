import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";
import { Button } from "../ui/Button";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <Section id="contact">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-card to-black">
        <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-3">Book / Get a quote</p>
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Ready for that <span className="text-shine">shine?</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-muted sm:text-lg">
              Book online in under a minute through Square, or reach out directly
              for a custom quote. We&apos;ll confirm your time and come to you
              anywhere in the Raleigh–Durham area.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                Book on Square
              </Button>
              <Button href={site.phoneHref} variant="secondary" size="lg">
                Call for a Quote
              </Button>
            </div>

            <p className="mt-6 text-sm text-slate-muted">
              Serving Raleigh, Durham, Cary, Apex, Morrisville, Chapel Hill &amp;
              Wake Forest, NC.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-col gap-4">
              <a
                href={site.phoneHref}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 transition-colors hover:border-shine/50"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-shine/15 text-shine transition-colors group-hover:bg-shine group-hover:text-black">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-slate-muted">Call or text</span>
                  <span className="block font-semibold text-white">{site.phone}</span>
                </span>
              </a>

              <a
                href={site.emailHref}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 transition-colors hover:border-shine/50"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-shine/15 text-shine transition-colors group-hover:bg-shine group-hover:text-black">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-slate-muted">Email</span>
                  <span className="block font-semibold text-white">{site.email}</span>
                </span>
              </a>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <span className="block text-xs uppercase tracking-wider text-slate-muted">Hours</span>
                <ul className="mt-2 space-y-1.5 text-sm text-white/90">
                  {site.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4">
                      <span>{h.days}</span>
                      <span className="text-slate-muted">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
