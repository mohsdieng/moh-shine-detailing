import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/anim/Magnetic";
import { serviceIcons } from "@/components/icons";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/components/JsonLd";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = buildMetadata({
  title: "Mobile Car Detailing Services in Raleigh & Durham, NC",
  description:
    "Every mobile detailing service we offer in Raleigh-Durham — wash & wax from $50, interior & exterior detailing, ceramic coating, paint correction, headlight restoration and more.",
  path: "/services",
});

/**
 * Services hub — lists all nine offerings as detailed cards linking through to
 * the dynamic /services/[slug] detail pages. Each service still gets its own
 * Service JSON-LD here for hub-level discoverability.
 */
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
        <JsonLd key={s.slug} data={serviceSchema(s.title, s.seoDescription)} />
      ))}

      <PageHeader
        eyebrow="What we do"
        title="Mobile detailing services for every kind of driver"
        intro="From a weekly wash & wax to multi-stage paint correction and ceramic coating — performed by hand at your home or office across Raleigh, Durham and the Triangle."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal key={service.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-card to-black p-7 transition-all duration-300 hover:-translate-y-1 hover:border-shine/50 hover:shadow-[0_20px_50px_-20px_rgba(56,182,255,0.45)]"
                >
                  {/* Decorative hover glow */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-shine/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-shine/30 bg-shine/10 text-shine transition-colors group-hover:bg-shine group-hover:text-black">
                      <Icon width={26} height={26} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-shine/70">
                      0{i + 1} / 0{services.length}
                    </span>
                  </div>

                  <h2 className="relative z-10 mt-5 text-xl font-bold leading-snug tracking-tight">
                    {service.title}
                  </h2>
                  <p className="relative z-10 mt-2 line-clamp-3 text-sm leading-relaxed text-slate-muted">
                    {service.blurb}
                  </p>

                  <div className="relative z-10 mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-muted">
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
              </Reveal>
            );
          })}
        </div>

        <Reveal
          delay={0.1}
          className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-shine/15 to-slate-card p-8 text-center sm:p-12"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Not sure which fits your car?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-muted sm:text-base">
            Tell us about your vehicle and we&apos;ll recommend the right detail —
            usually within the hour.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Magnetic>
              <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer" size="lg">
                Book a Detail
              </Button>
            </Magnetic>
            <Magnetic strength={6}>
              <Button href="/contact" variant="secondary" size="lg">
                Get a Quote
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </Section>

      <Faq />
    </>
  );
}
