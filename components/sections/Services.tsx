import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";
import { Button } from "../ui/Button";
import { services } from "@/lib/services";
import { serviceIcons } from "../icons";
import { site } from "@/lib/site";

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="What we do"
      heading="Detailing services, done by hand"
      intro="Every package is performed by hand with pro-grade products — no automated brushes, no shortcuts. Choose a service or ask us to build a custom package."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = serviceIcons[service.icon];
          return (
            <Reveal key={service.slug} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-slate-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-shine/50 hover:shadow-[0_20px_50px_-20px_rgba(56,182,255,0.45)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-shine/30 bg-shine/10 text-shine transition-colors group-hover:bg-shine group-hover:text-black">
                  <Icon />
                </div>
                <h3 className="text-lg font-bold leading-snug">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-muted">
                  {service.blurb}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-muted">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
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
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-xs uppercase tracking-wider text-slate-muted">Pricing</p>
                  <p className="mt-1 font-semibold text-shine">{service.price}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-slate-muted">
          Not sure which package fits? Tell us about your vehicle and we&apos;ll
          recommend the right detail.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
            Book a Detail
          </Button>
          <Button href="#contact" variant="secondary">
            Get a Quote
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
