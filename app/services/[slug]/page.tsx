import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { services, getServiceBySlug } from "@/lib/services";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/anim/Magnetic";
import { serviceIcons } from "@/components/icons";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/components/JsonLd";

/* ---------- Static generation -------------------------------------- */

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

/* ---------- Page --------------------------------------------------- */

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <JsonLd data={serviceSchema(service.title, service.seoDescription)} />

      <PageHeader
        eyebrow={service.shortTitle}
        title={service.title}
        intro={service.blurb}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      />

      {/* Top hero block: icon + long description + meta + CTA */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="flex items-start gap-5">
              <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-shine/30 bg-shine/10 text-shine sm:h-20 sm:w-20">
                <Icon width={36} height={36} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-muted">
                  Mobile service · Raleigh – Durham, NC
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  Why drivers book {service.title.toLowerCase()}
                </h2>
              </div>
            </div>

            <p className="mt-6 text-base leading-relaxed text-slate-muted sm:text-lg">
              {service.description}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-card p-4"
                >
                  <Check />
                  <span className="text-sm text-white/90">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Sticky-feel meta card */}
          <Reveal delay={0.1}>
            <aside className="sticky top-28 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-card to-black p-7">
              <p className="text-xs uppercase tracking-wider text-slate-muted">
                Starting price
              </p>
              {service.tiers ? (
                <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-xl border border-white/10">
                  {(["sedan", "suv", "truck"] as const).map((t) => (
                    <div
                      key={t}
                      className="border-r border-white/10 px-2 py-3 text-center last:border-r-0"
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
                <p className="mt-1 text-3xl font-bold tracking-tight text-shine">
                  {service.price}
                </p>
              )}
              {service.priceLocked && (
                <p className="mt-2 text-[10px] uppercase tracking-wider text-shine">
                  Confirmed price
                </p>
              )}

              <dl className="mt-6 space-y-4 border-t border-white/10 pt-5 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-muted">
                    Duration
                  </dt>
                  <dd className="mt-1 font-semibold text-white">{service.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-muted">
                    Ideal for
                  </dt>
                  <dd className="mt-1 text-white/90">{service.idealFor}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-3">
                <Magnetic>
                  <Button
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    className="w-full"
                  >
                    Book Now
                  </Button>
                </Magnetic>
                <Magnetic strength={6}>
                  <Button
                    href="/contact"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    Get a Quote
                  </Button>
                </Magnetic>
              </div>

              <p className="mt-4 text-center text-xs text-slate-muted">
                Replies within the hour · Serving Raleigh, Durham &amp; the Triangle
              </p>
            </aside>
          </Reveal>
        </div>
      </Section>

      {/* What's included + process */}
      <Section className="bg-slate-surface">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">What&apos;s included</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Every step of the {service.shortTitle.toLowerCase()} service.
            </h2>
            <ul className="mt-7 grid gap-3">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/40 p-4"
                >
                  <Check />
                  <span className="text-sm text-white/90 sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow mb-3">The process</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How we work in your driveway.
            </h2>
            <ol className="mt-7 space-y-4">
              {service.process.map((step, i) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-black/40 p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-shine font-mono text-sm font-bold text-black">
                      {i + 1}
                    </span>
                    <h3 className="text-base font-bold sm:text-lg">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-muted sm:text-base">
                    {step.copy}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* Add-ons */}
      {service.addOns && service.addOns.length > 0 && (
        <Section
          eyebrow="Build your detail"
          heading={
            <>
              Popular <span className="text-shine">add-ons.</span>
            </>
          }
          intro="Mix-and-match upgrades you can request when you book — we'll quote the total before we touch the car."
        >
          <ul className="flex flex-wrap gap-3">
            {service.addOns.map((add) => (
              <li
                key={add}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/85 transition-colors hover:border-shine/50 hover:text-shine"
              >
                + {add}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Related services */}
      <Section
        className="bg-slate-surface"
        eyebrow="Other services"
        heading={
          <>
            You may also <span className="text-shine">need.</span>
          </>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r, i) => {
            const RIcon = serviceIcons[r.icon];
            return (
              <Reveal key={r.slug} delay={i * 0.06}>
                <Link
                  href={`/services/${r.slug}`}
                  className="group block h-full rounded-2xl border border-white/10 bg-black/40 p-6 transition-all hover:-translate-y-1 hover:border-shine/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-shine/30 bg-shine/10 text-shine transition-colors group-hover:bg-shine group-hover:text-black">
                      <RIcon width={22} height={22} />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-shine/70">
                      {r.shortTitle}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-muted">
                    {r.blurb}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-shine transition-transform group-hover:translate-x-1">
                    Learn more →
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section>
        <Container>
          <Reveal className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-shine/15 to-slate-card p-8 text-center sm:p-12">
            <p className="eyebrow mb-3">Ready to book?</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Bring the studio to your <span className="text-shine">driveway.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-muted sm:text-lg">
              Reserve {service.title.toLowerCase()} in under a minute through
              Square, or send us the details for a custom quote.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Button
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                >
                  Book Now
                </Button>
              </Magnetic>
              <Magnetic strength={6}>
                <Button href="/contact" variant="secondary" size="lg">
                  Get a Quote
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </Section>
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
