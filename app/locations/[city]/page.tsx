import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import {
  getCity,
  publishedCities,
  neighborhoodList,
  cityHubFaqs,
} from "@/lib/cities";
import { services, getServiceBySlug } from "@/lib/services";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { BookButton } from "@/components/ui/BookButton";
import { Magnetic } from "@/components/anim/Magnetic";
import { serviceIcons } from "@/components/icons";
import { Breadcrumbs } from "@/components/locations/Breadcrumbs";
import { LocalFaq } from "@/components/locations/LocalFaq";
import { LocationCta } from "@/components/locations/LocationCta";
import { FromTheBlog } from "@/components/blog/FromTheBlog";
import { postsForContext } from "@/lib/blog";
import {
  JsonLd,
  breadcrumbSchema,
  serviceSchema,
} from "@/components/JsonLd";

/* ---------- Static generation -------------------------------------- */

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCities().map((c) => ({ city: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { city: string };
}): Metadata {
  const city = getCity(params.city);
  if (!city) return {};
  return buildMetadata({
    // Brand suffix is added by the root layout's title template.
    title: `Mobile Car Detailing in ${city.full}`,
    description: `Premium mobile car detailing in ${city.name}, NC. Interior, exterior, ceramic coating and paint correction brought to your driveway across ${neighborhoodList(city, 3)} and more. ${city.availability}`,
    path: `/locations/${city.slug}`,
  });
}

/* ---------- Page --------------------------------------------------- */

export default function CityHubPage({ params }: { params: { city: string } }) {
  const city = getCity(params.city);
  if (!city || !city.published) notFound();

  const localServices = city.services
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => !!s);

  const otherServices = services.filter((s) => !city.services.includes(s.slug));
  const nearby = city.nearby
    .map((slug) => getCity(slug))
    .filter((c): c is NonNullable<typeof c> => !!c && c.published);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/locations" },
    { name: city.name, path: `/locations/${city.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={serviceSchema(
          `Mobile Car Detailing in ${city.name}`,
          `Premium mobile car detailing brought to driveways across ${city.name}, ${city.county}.`,
          { areaServed: city.name, url: `${site.url}/locations/${city.slug}` },
        )}
      />

      {/* Cinematic header */}
      <header className="relative overflow-hidden border-b border-chrome-line bg-navy-950 pt-28 sm:pt-36">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-950 to-black" />
          <div className="absolute right-[18%] top-[12%] h-[60vh] w-[60vh] rounded-full bg-shine/15 blur-[140px]" />
          <div className="absolute inset-0 bg-shine-grid bg-[size:64px_64px] opacity-25 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" />
        </div>
        <Container className="relative pb-16 sm:pb-20">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-shine" />
              {city.county} · {city.availability}
            </p>
            <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.0] tracking-tightest text-white sm:text-6xl md:text-[4.25rem]">
              Mobile Car Detailing in{" "}
              <span className="text-shine italic">{city.full}</span>
            </h1>
            <div className="mt-7 h-px w-16 bg-shine" aria-hidden="true" />
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-chrome sm:text-lg">
              {city.tagline}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Magnetic strength={10}>
                <BookButton size="lg">Book Now</BookButton>
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

      {/* Local context */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <p className="eyebrow mb-5">Local coverage</p>
            <h2 className="text-balance text-3xl font-bold tracking-tightest text-white sm:text-4xl">
              Detailing that comes to{" "}
              <span className="text-shine italic">{city.name}.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-chrome sm:text-lg">
              {city.intro}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-chrome-line bg-black/40 p-7">
              <p className="text-xs uppercase tracking-widest text-chrome/70">
                Neighborhoods we cover in {city.name}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {city.neighborhoods.map((n) => (
                  <li
                    key={n}
                    className="border border-chrome-line bg-white/[0.03] px-3 py-1.5 text-xs text-white/85"
                  >
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-chrome-line pt-5 text-sm text-chrome">
                {city.travelNote}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Services in this city */}
      <section className="relative border-t border-chrome-line bg-navy-950 py-20 sm:py-28">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Services</p>
            <h2 className="text-balance text-3xl font-bold tracking-tightest text-white sm:text-4xl">
              Detailing services in {city.name}.
            </h2>
          </Reveal>

          {localServices.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {localServices.map((s, i) => {
                const Icon = serviceIcons[s.icon];
                return (
                  <Reveal key={s.slug} delay={i * 0.05}>
                    <Link
                      href={`/locations/${city.slug}/${s.slug}`}
                      className="group flex h-full flex-col border border-chrome-line bg-gradient-to-br from-slate-card to-black p-7 transition-all hover:-translate-y-1 hover:border-shine/50"
                    >
                      <span className="flex h-12 w-12 items-center justify-center border border-chrome-line bg-shine/10 text-shine transition-colors group-hover:bg-shine group-hover:text-black">
                        <Icon width={24} height={24} />
                      </span>
                      <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
                        {s.title} in {city.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-chrome">
                        {s.blurb}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors group-hover:text-shine">
                        Learn more
                        <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}

          {/* Internal links to the full service menu */}
          <Reveal delay={0.1} className="mt-10">
            <p className="text-xs uppercase tracking-widest text-chrome/70">
              More services we bring to {city.name}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-block border border-chrome-line bg-white/[0.03] px-3 py-1.5 text-xs text-white/85 transition-colors hover:border-shine hover:text-shine"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Nearby cities */}
      {nearby.length > 0 && (
        <Section eyebrow="Nearby" heading={<>We also serve <span className="text-shine italic">nearby.</span></>}>
          <div className="flex flex-wrap gap-3">
            {nearby.map((n) => (
              <Link
                key={n.slug}
                href={`/locations/${n.slug}`}
                className="group inline-flex items-center gap-3 border border-chrome-line bg-black/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-shine hover:text-shine"
              >
                Mobile detailing in {n.name}
                <span aria-hidden="true" className="text-shine transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <LocalFaq
        items={cityHubFaqs(city)}
        heading={
          <>
            {city.name} detailing <span className="text-shine italic">FAQs.</span>
          </>
        }
        intro={`Common questions from ${city.name} drivers before they book.`}
      />

      <FromTheBlog posts={postsForContext({ citySlug: city.slug, limit: 3 })} />

      <LocationCta
        heading={
          <>
            Detailing in {city.name}, <span className="text-shine italic">on your schedule.</span>
          </>
        }
        body={`Book online in under a minute or send us your details for a tailored quote. We bring the full studio to your ${city.name} driveway.`}
      />
    </>
  );
}
