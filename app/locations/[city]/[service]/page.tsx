import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import {
  getCity,
  publishedCityServicePairs,
  neighborhoodList,
  localServiceIntro,
  localServiceFaqs,
} from "@/lib/cities";
import { getServiceBySlug } from "@/lib/services";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/anim/Magnetic";
import { serviceIcons } from "@/components/icons";
import { Breadcrumbs } from "@/components/locations/Breadcrumbs";
import { LocalFaq } from "@/components/locations/LocalFaq";
import { LocationCta } from "@/components/locations/LocationCta";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/components/JsonLd";

/* ---------- Static generation -------------------------------------- */

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCityServicePairs();
}

export function generateMetadata({
  params,
}: {
  params: { city: string; service: string };
}): Metadata {
  const city = getCity(params.city);
  const service = getServiceBySlug(params.service);
  if (!city || !service) return {};
  return buildMetadata({
    // Brand suffix is added by the root layout's title template.
    title: `${service.title} in ${city.full}`,
    description: `Professional ${service.title.toLowerCase()} in ${city.name}, NC — brought to your driveway. ${service.blurb} Serving ${neighborhoodList(city, 3)} and more.`,
    path: `/locations/${city.slug}/${service.slug}`,
  });
}

/* ---------- Page --------------------------------------------------- */

export default function CityServicePage({
  params,
}: {
  params: { city: string; service: string };
}) {
  const city = getCity(params.city);
  const service = getServiceBySlug(params.service);

  // Only published city + a service the city actually publishes.
  if (!city || !city.published || !service || !city.services.includes(service.slug)) {
    notFound();
  }

  const Icon = serviceIcons[service.icon];
  const intro = localServiceIntro(city, service);
  const faqs = localServiceFaqs(city, service);

  const sameServiceNearby = city.nearby
    .map((slug) => getCity(slug))
    .filter((c): c is NonNullable<typeof c> => !!c && c.published && c.services.includes(service.slug));

  const otherCityServices = city.services
    .filter((s) => s !== service.slug)
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => !!s);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/locations" },
    { name: city.name, path: `/locations/${city.slug}` },
    { name: service.shortTitle, path: `/locations/${city.slug}/${service.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={serviceSchema(`${service.title} in ${city.name}`, intro, {
          areaServed: city.name,
          url: `${site.url}/locations/${city.slug}/${service.slug}`,
        })}
      />

      {/* Cinematic header */}
      <header className="relative overflow-hidden border-b border-chrome-line bg-navy-950 pt-28 sm:pt-36">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-950 to-black" />
          <div className="absolute right-[18%] top-[12%] h-[60vh] w-[60vh] rounded-full bg-shine/15 blur-[140px]" />
          <div className="absolute inset-0 bg-shine-grid bg-[size:64px_64px] opacity-25 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[-4%] flex items-center">
          <Icon width={560} height={560} className="text-shine/10" strokeWidth={0.6} />
        </div>
        <Container className="relative pb-16 sm:pb-20">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-shine" />
              {service.shortTitle} · {city.full}
            </p>
            <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.0] tracking-tightest text-white sm:text-6xl md:text-[4.25rem]">
              {service.title} in{" "}
              <span className="text-shine italic">{city.full}</span>
            </h1>
            <div className="mt-7 h-px w-16 bg-shine" aria-hidden="true" />
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-chrome sm:text-lg">
              {service.blurb}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Magnetic strength={10}>
                <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer" size="lg">
                  Book Now
                </Button>
              </Magnetic>
              <Magnetic strength={8}>
                <Button href="/contact" variant="secondary" size="lg">
                  Get a Quote
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </header>

      {/* Local intro + sticky pricing */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="eyebrow mb-5">Why {city.name} drivers book this</p>
            <h2 className="text-balance text-3xl font-bold tracking-tightest text-white sm:text-4xl">
              {service.title} in {city.name},{" "}
              <span className="text-shine italic">done right.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-chrome sm:text-lg">
              {intro}
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
            <aside className="lg:sticky lg:top-28 border border-chrome-line bg-gradient-to-br from-slate-card to-black p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center border border-chrome-line bg-shine/10 text-shine">
                  <Icon width={24} height={24} />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-widest text-shine/70">
                  {service.shortTitle} · {city.name}
                </p>
              </div>

              <div className="mt-6 border-y border-chrome-line py-6">
                <p className="text-xs uppercase tracking-widest text-chrome/70">Starting price</p>
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
              </div>

              <dl className="space-y-5 py-5 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-chrome/70">Duration</dt>
                  <dd className="mt-1 text-white">{service.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-chrome/70">Ideal for</dt>
                  <dd className="mt-1 text-white/90">{service.idealFor}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-chrome/70">Coverage</dt>
                  <dd className="mt-1 text-white/90">{neighborhoodList(city, 4)} &amp; more</dd>
                </div>
              </dl>

              <div className="mt-2 flex flex-col gap-3">
                <Magnetic>
                  <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer" size="lg" className="w-full">
                    Book Now
                  </Button>
                </Magnetic>
                <Magnetic strength={6}>
                  <Button href={`/services/${service.slug}`} variant="secondary" size="lg" className="w-full">
                    Full service details
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
                Every step of {service.shortTitle.toLowerCase()} in {city.name}.
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
                How we work in your {city.name} driveway.
              </h2>
              <ol className="mt-8 space-y-6">
                {service.process.map((step, i) => (
                  <li key={step.title} className="border-l border-chrome-line pl-6">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-shine">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
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

      {/* Internal links: nearby same-service + other services in city */}
      <Section
        eyebrow="Keep exploring"
        heading={<>More detailing <span className="text-shine italic">near you.</span></>}
      >
        <div className="grid gap-10 lg:grid-cols-2">
          {sameServiceNearby.length > 0 && (
            <Reveal>
              <p className="text-xs uppercase tracking-widest text-chrome/70">
                {service.title} in nearby cities
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {sameServiceNearby.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/locations/${n.slug}/${service.slug}`}
                      className="group inline-flex items-center gap-3 border border-chrome-line bg-black/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-shine hover:text-shine"
                    >
                      {service.title} in {n.name}
                      <span aria-hidden="true" className="text-shine transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <p className="text-xs uppercase tracking-widest text-chrome/70">
              Other services in {city.name}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {otherCityServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/locations/${city.slug}/${s.slug}`}
                    className="inline-block border border-chrome-line bg-white/[0.03] px-3 py-1.5 text-xs text-white/85 transition-colors hover:border-shine hover:text-shine"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/locations/${city.slug}`}
                  className="inline-block border border-shine/40 bg-shine/10 px-3 py-1.5 text-xs font-semibold text-shine transition-colors hover:bg-shine hover:text-black"
                >
                  All {city.name} detailing →
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </Section>

      <LocalFaq
        items={faqs}
        heading={
          <>
            {service.shortTitle} in {city.name} —{" "}
            <span className="text-shine italic">FAQs.</span>
          </>
        }
        intro={`What ${city.name} drivers ask before booking ${service.title.toLowerCase()}.`}
      />

      <LocationCta
        heading={
          <>
            {service.title} in {city.name},{" "}
            <span className="text-shine italic">at your door.</span>
          </>
        }
        body={`Reserve ${service.title.toLowerCase()} in under a minute, or send your vehicle details for a tailored ${city.name} quote.`}
      />
    </>
  );
}
