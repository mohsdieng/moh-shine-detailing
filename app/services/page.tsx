import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { serviceIcons } from "@/components/icons";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/components/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Detailing Services & Pricing in Raleigh & Durham, NC",
  description:
    "Mobile car detailing services in Raleigh & Durham: exterior hand wash & towel dry from $50, interior detailing, full details and paint correction. We come to you.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      {services.map((s) => (
        <JsonLd key={s.slug} data={serviceSchema(s.title, s.blurb)} />
      ))}

      <PageHeader
        eyebrow="What we do"
        title="Mobile detailing services & pricing"
        intro="Every service is performed by hand at your location with pro-grade products. Prices below are starting points — final pricing depends on vehicle size and condition."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal key={service.slug} delay={i * 0.06}>
                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-card p-7 transition-colors hover:border-shine/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-shine/30 bg-shine/10 text-shine">
                      <Icon />
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wider text-slate-muted">Pricing</p>
                      <p className="font-semibold text-shine">{service.price}</p>
                    </div>
                  </div>
                  <h2 className="mt-5 text-xl font-bold">{service.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-muted">{service.blurb}</p>
                  <ul className="mt-5 grid gap-2 text-sm text-slate-muted sm:grid-cols-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-shine" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 6" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-12 rounded-2xl border border-white/10 bg-slate-surface p-8 text-center">
          <h2 className="text-2xl font-bold">Ready to book?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-muted">
            Reserve your spot online through Square, or call us for a custom package.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book Now
            </Button>
            <Button href="/contact" variant="secondary">
              Get a Quote
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
