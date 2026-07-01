import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { publishedCities, neighborhoodList } from "@/lib/cities";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { BookButton } from "@/components/ui/BookButton";
import { Magnetic } from "@/components/anim/Magnetic";
import { Breadcrumbs } from "@/components/locations/Breadcrumbs";
import { LocationCta } from "@/components/locations/LocationCta";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Service Areas — Mobile Car Detailing Across the NC Triangle",
  description:
    "Moh's Shine Detailing serves Raleigh, Cary, Durham and the surrounding NC Triangle. Find premium mobile car detailing, ceramic coating and paint correction in your city.",
  path: "/locations",
});

export default function LocationsIndexPage() {
  const cities = publishedCities();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Service Areas", path: "/locations" },
        ])}
      />

      {/* Cinematic header (CSS only — fast LCP, no CLS) */}
      <header className="relative overflow-hidden border-b border-chrome-line bg-navy-950 pt-28 sm:pt-36">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-950 to-black" />
          <div className="absolute right-[20%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-shine/15 blur-[140px]" />
          <div className="absolute inset-0 bg-shine-grid bg-[size:64px_64px] opacity-25 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" />
        </div>
        <Container className="relative pb-16 sm:pb-20">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Service Areas", path: "/locations" },
            ]}
          />
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-shine" />
              Where we work
            </p>
            <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[0.98] tracking-tightest text-white sm:text-6xl md:text-[4.5rem]">
              Mobile detailing across the{" "}
              <span className="text-shine italic">NC Triangle.</span>
            </h1>
            <div className="mt-7 h-px w-16 bg-shine" aria-hidden="true" />
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-chrome sm:text-lg">
              We&apos;re fully mobile and based in Raleigh, bringing the studio to
              driveways and offices across the Triangle. Choose your city to see
              local coverage, services and pricing.
            </p>
          </Reveal>
        </Container>
      </header>

      {/* City grid */}
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city, i) => (
            <Reveal key={city.slug} delay={i * 0.05}>
              <Link
                href={`/locations/${city.slug}`}
                className="group flex h-full flex-col border border-chrome-line bg-gradient-to-br from-slate-card to-black p-7 transition-all duration-300 hover:-translate-y-1 hover:border-shine/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-shine/70">
                    {city.county}
                  </span>
                  {city.hq && (
                    <span className="border border-shine/40 bg-shine/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-shine">
                      HQ
                    </span>
                  )}
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tightest text-white sm:text-3xl">
                  {city.name}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-chrome">
                  Serving {neighborhoodList(city, 3)} and more.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors group-hover:text-shine">
                  View {city.name}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12 border-t border-chrome-line pt-8">
          <p className="text-sm leading-relaxed text-chrome">
            Don&apos;t see your town? We also reach Morrisville, Apex, Wake
            Forest, Garner and Chapel Hill by appointment.{" "}
            <Link href="/contact" className="text-white underline-offset-2 hover:text-shine hover:underline">
              Send us your zip
            </Link>{" "}
            and we&apos;ll confirm coverage in minutes.
          </p>
          <div className="mt-6">
            <Magnetic>
              <BookButton>Book a Detail</BookButton>
            </Magnetic>
          </div>
        </Reveal>
      </Section>

      <LocationCta
        heading={
          <>
            Premium detailing, <span className="text-shine italic">at your door.</span>
          </>
        }
        body="Pick your city, choose a service, and we'll bring the full studio to your driveway anywhere in the Triangle."
      />
    </>
  );
}
