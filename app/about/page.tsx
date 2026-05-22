import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "About — Premium Mobile Detailing in the Triangle",
  description:
    "Moh's Shine Detailing is a premium mobile car detailing service in Raleigh & Durham, NC. Learn about our hands-on approach and what makes our detailing different.",
  path: "/about",
});

const values = [
  {
    title: "Hand-detailed, always",
    copy: "No automated brushes or tunnels. Every vehicle is washed and finished by hand for a safer, deeper clean.",
  },
  {
    title: "We come to you",
    copy: "Fully mobile and self-contained. We bring water, power and pro-grade products to your driveway.",
  },
  {
    title: "Premium products",
    copy: "We use quality pH-balanced soaps, microfiber and sealants that protect your paint, not just shine it.",
  },
  {
    title: "Honest pricing",
    copy: "Clear starting prices and no surprises. We'll recommend exactly what your vehicle needs — nothing more.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHeader
        eyebrow="Our story"
        title="Premium detailing, brought to your driveway"
        intro="Moh's Shine Detailing was built on a simple idea: a truly great detail shouldn't mean dropping your car off and waiting around. So we bring the studio to you."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-bold sm:text-3xl">Detailing done the right way</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-muted">
              <p>
                We&apos;re a mobile detailing service serving Raleigh, Durham and the
                surrounding North Carolina Triangle. Every job is done by hand, with
                the same care we&apos;d give our own vehicles.
              </p>
              <p>
                Whether it&apos;s a quick exterior hand wash, a deep interior refresh,
                or multi-stage paint correction, we treat your car like it matters —
                because to you, it does.
              </p>
              <p>
                Booking is quick and online, we arrive fully equipped, and you&apos;re
                left with a finish that turns heads. That&apos;s the Moh&apos;s Shine
                standard.
              </p>
            </div>
            <div className="mt-8">
              <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book a Detail
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <div key={v.title} className="rounded-2xl border border-white/10 bg-slate-card p-6">
                  <h3 className="font-bold text-shine">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-muted">{v.copy}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <HowItWorks />
    </>
  );
}
