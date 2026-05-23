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
import { Faq } from "@/components/sections/Faq";

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
        <div className="flex flex-col gap-6">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal key={service.slug} delay={i * 0.05}>
                <article
                  id={service.slug}
                  className="scroll-mt-28 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-card to-black"
                >
                  <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
                    {/* Left: icon + title + pricing */}
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-shine/30 bg-shine/10 text-shine">
                          <Icon width={30} height={30} />
                        </div>
                        <span className="font-mono text-xs uppercase tracking-widest text-shine/70">
                          0{i + 1} / 0{services.length}
                        </span>
                      </div>

                      <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
                        {service.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-slate-muted sm:text-base">
                        {service.description}
                      </p>

                      <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-white/10 py-4 text-xs sm:text-sm">
                        <div>
                          <dt className="uppercase tracking-wider text-slate-muted">
                            Duration
                          </dt>
                          <dd className="mt-1 font-semibold text-white">
                            {service.duration}
                          </dd>
                        </div>
                        <div>
                          <dt className="uppercase tracking-wider text-slate-muted">
                            Ideal for
                          </dt>
                          <dd className="mt-1 font-medium text-white/90">
                            {service.idealFor}
                          </dd>
                        </div>
                      </dl>

                      {/* Pricing */}
                      <div className="mt-6">
                        <p className="text-xs uppercase tracking-wider text-slate-muted">
                          Pricing {service.priceLocked && <span className="text-shine">(confirmed)</span>}
                        </p>
                        {service.tiers ? (
                          <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-xl border border-white/10">
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
                          <p className="mt-2 text-2xl font-bold text-shine">{service.price}</p>
                        )}
                      </div>

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                          Book this detail
                        </Button>
                        <Button href="/contact" variant="secondary">
                          Ask a question
                        </Button>
                      </div>
                    </div>

                    {/* Right: includes + add-ons */}
                    <div className="grid gap-6">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-muted">
                          What&apos;s included
                        </p>
                        <ul className="mt-3 grid gap-2 text-sm text-white/90 sm:grid-cols-2">
                          {service.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <Check />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {service.addOns && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-slate-muted">
                            Popular add-ons
                          </p>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {service.addOns.map((add) => (
                              <li
                                key={add}
                                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/85"
                              >
                                + {add}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          delay={0.1}
          className="mt-14 rounded-3xl border border-white/10 bg-slate-surface p-8 text-center sm:p-12"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to book?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-muted sm:text-base">
            Reserve your spot online through Square, or message us for a custom
            package built around your vehicle.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer" size="lg">
              Book Now
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Get a Quote
            </Button>
          </div>
        </Reveal>
      </Section>

      <Faq />
    </>
  );
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
