import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { services, getServiceBySlug } from "@/lib/services";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/anim/Magnetic";
import { CinematicPanel } from "@/components/anim/CinematicPanel";
import { serviceIcons } from "@/components/icons";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/components/JsonLd";
import { Faq } from "@/components/sections/Faq";

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

      {/* Cinematic header */}
      <header className="relative overflow-hidden border-b border-chrome-line bg-navy-950 pt-28 sm:pt-36">
        {/* Cinematic background */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-950 to-black" />
          <div className="absolute right-[20%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-shine/15 blur-[140px]" />
          <div className="absolute inset-0 bg-shine-grid bg-[size:64px_64px] opacity-25 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" />
        </div>

        {/* Faded oversized icon as backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-[-4%] flex items-center"
        >
          <Icon
            width={620}
            height={620}
            className="text-shine/10"
            strokeWidth={0.6}
          />
        </div>

        <Container className="relative pb-20 sm:pb-28">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest text-chrome/70">
              <li>
                <Link href="/" className="transition-colors hover:text-shine">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="transition-colors hover:text-shine">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>

          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-shine" />
              {service.shortTitle} · Raleigh – Durham, NC
            </p>

            <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[0.98] tracking-tightest text-white sm:text-6xl md:text-[5.25rem]">
              {service.title}.
            </h1>

            <div className="mt-7 h-px w-16 bg-shine" aria-hidden="true" />

            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-chrome sm:text-lg">
              {service.blurb}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Magnetic strength={10}>
                <Button href="/contact" size="lg">
                  Get a Quote
                </Button>
              </Magnetic>
              <Magnetic strength={8}>
                <Button
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                >
                  Book Now
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </header>

      {/* Why this service + sticky pricing aside */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="eyebrow mb-5">Why drivers book this</p>
            <h2 className="text-balance text-3xl font-bold tracking-tightest text-white sm:text-4xl lg:text-5xl">
              Premium {service.shortTitle.toLowerCase()},
              <br />
              <span className="text-shine italic">on your driveway.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-chrome sm:text-lg">
              {service.description}
            </p>

            <ul className="mt-10 divide-y divide-chrome-line border-y border-chrome-line">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-4 py-3 text-sm text-white/90 sm:text-base">
                  <span className="mt-2 h-px w-4 flex-shrink-0 bg-shine" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Sticky pricing card */}
          <Reveal delay={0.1}>
            <aside className="lg:sticky lg:top-28">
              <CinematicPanel icon={service.icon} tag={service.shortTitle.toUpperCase()} className="!aspect-[4/3]" />

              <div className="mt-6 border-y border-chrome-line py-6">
                <p className="text-xs uppercase tracking-widest text-chrome/70">
                  Starting price
                </p>
                {service.tiers ? (
                  <div className="mt-3 grid grid-cols-3 divide-x divide-chrome-line border border-chrome-line">
                    {(["sedan", "suv", "truck"] as const).map((t) => (
                      <div key={t} className="px-3 py-3 text-center">
                        <p className="text-[10px] uppercase tracking-widest text-chrome/70">
                          {t === "suv" ? "SUV" : t}
                        </p>
                        <p className="mt-0.5 text-base font-semibold text-shine">
                          {service.tiers![t]}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-2xl font-bold tracking-tight text-shine sm:text-3xl">
                    {service.price}
                  </p>
                )}
                {service.priceLocked && (
                  <p className="mt-2 text-[10px] uppercase tracking-widest text-shine">
                    Confirmed price
                  </p>
                )}
              </div>

              <dl className="space-y-5 py-5 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-chrome/70">
                    Duration
                  </dt>
                  <dd className="mt-1 text-white">{service.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-chrome/70">
                    Ideal for
                  </dt>
                  <dd className="mt-1 text-white/90">{service.idealFor}</dd>
                </div>
              </dl>

              <div className="mt-2 flex flex-col gap-3">
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
                  <Button href="/contact" variant="secondary" size="lg" className="w-full">
                    Get a Quote
                  </Button>
                </Magnetic>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>

      {/* What's included + process */}
      <section className="relative border-t border-chrome-line bg-navy-950 py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow mb-5">What&apos;s included</p>
              <h2 className="text-balance text-3xl font-bold tracking-tightest sm:text-4xl">
                Every step of the {service.shortTitle.toLowerCase()} service.
              </h2>
              <ul className="mt-8 divide-y divide-chrome-line border-y border-chrome-line">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-4 py-3 text-sm text-white/90 sm:text-base">
                    <span className="mt-2 h-px w-4 flex-shrink-0 bg-shine" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow mb-5">The process</p>
              <h2 className="text-balance text-3xl font-bold tracking-tightest sm:text-4xl">
                How we work in your driveway.
              </h2>
              <ol className="mt-8 space-y-6">
                {service.process.map((step, i) => (
                  <li key={step.title} className="border-l border-chrome-line pl-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-shine">
                        Step {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-chrome sm:text-base">
                      {step.copy}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Add-ons */}
      {service.addOns && service.addOns.length > 0 && (
        <Section
          eyebrow="Build your detail"
          heading={
            <>
              Popular <span className="text-shine italic">add-ons.</span>
            </>
          }
          intro="Mix-and-match upgrades you can request when you book — we'll quote the total before we touch the car."
        >
          <ul className="flex flex-wrap gap-3">
            {service.addOns.map((add) => (
              <li
                key={add}
                className="border border-chrome-line bg-black/40 px-4 py-2 text-sm text-white/85 transition-colors hover:border-shine hover:text-shine"
              >
                + {add}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Related services */}
      <section className="relative border-t border-chrome-line bg-navy-950 py-20 sm:py-28">
        <Container>
          <div className="mb-12">
            <Reveal>
              <p className="eyebrow mb-5">Other services</p>
              <h2 className="text-balance text-3xl font-bold tracking-tightest sm:text-4xl">
                You may also <span className="text-shine italic">need.</span>
              </h2>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => {
              const RIcon = serviceIcons[r.icon];
              return (
                <Reveal key={r.slug} delay={i * 0.06}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group flex h-full flex-col border border-chrome-line bg-black/40 p-7 transition-all hover:-translate-y-1 hover:border-shine"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center border border-chrome-line bg-shine/10 text-shine transition-colors group-hover:bg-shine group-hover:text-black">
                        <RIcon width={20} height={20} />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-shine/70">
                        {r.shortTitle}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">{r.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-chrome">{r.blurb}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors group-hover:text-shine">
                      Learn more
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Per-service FAQ — shared list, applicable to all services */}
      <Faq />

      {/* Bottom CTA */}
      <section className="relative border-t border-chrome-line bg-black py-20 sm:py-28">
        <Container>
          <Reveal className="overflow-hidden border border-chrome-line bg-gradient-to-br from-shine/15 to-navy-950 p-10 text-center sm:p-16">
            <p className="eyebrow mb-5">Ready to book?</p>
            <h2 className="text-balance text-4xl font-bold tracking-tightest text-white sm:text-5xl">
              Bring the studio to your{" "}
              <span className="text-shine italic">driveway.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-chrome sm:text-lg">
              Reserve {service.title.toLowerCase()} in under a minute through
              Square, or send us the details for a custom quote.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer" size="lg">
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
      </section>
    </>
  );
}
