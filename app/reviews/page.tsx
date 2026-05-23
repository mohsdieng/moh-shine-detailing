import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/anim/Magnetic";
import { StarIcon } from "@/components/icons";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { testimonials, stats } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Reviews — What Drivers Say About Moh's Shine Detailing",
  description:
    "Real reviews from drivers across Raleigh, Durham and the NC Triangle. Premium mobile car detailing rated 4.9 stars — see what customers say about Moh's Shine.",
  path: "/reviews",
});

/**
 * Reviews page — Google-style cards in a responsive grid, plus an aggregate
 * rating header and a CTA to leave a Google review. Average rating + count
 * pull from the shared stats array so they stay in sync with the home page.
 */
const avgStat = stats.find((s) => s.label.includes("rating"));
const countStat = stats.find((s) => s.label.includes("Vehicles"));

export default function ReviewsPage() {
  const avg = avgStat ? avgStat.value.toFixed(1) : "4.9";
  const count = countStat ? `${countStat.value}+` : "1,200+";

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ])}
      />

      <PageHeader
        eyebrow="Kind words"
        title="Drivers across the Triangle love the shine"
        intro="Honest reviews from customers we've taken care of around Raleigh, Durham, Cary, Chapel Hill and beyond."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ]}
      />

      {/* Aggregate header */}
      <Section>
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-card to-black p-8 sm:p-12">
            <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-12">
              <div className="text-center sm:text-left">
                <p className="text-6xl font-bold tracking-tight text-white sm:text-7xl">
                  {avg}
                </p>
                <div
                  className="mt-2 flex justify-center gap-1 text-shine sm:justify-start"
                  aria-label={`${avg} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} />
                  ))}
                </div>
                <p className="mt-2 text-sm text-slate-muted">
                  Average across {count} details
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Real reviews, in their own words.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-muted sm:text-lg">
                  We treat every car like it&apos;s our own — and our customers
                  notice. Below are a few of the kind notes drivers have sent us
                  after their details.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Magnetic>
                    <Button
                      href={site.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                    >
                      Book your detail
                    </Button>
                  </Magnetic>
                  <Magnetic strength={6}>
                    <Button href="/contact" variant="secondary" size="lg">
                      Get a Quote
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Reviews grid */}
      <Section className="bg-slate-surface">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((review, i) => (
            <Reveal key={`${review.name}-${i}`} delay={i * 0.05}>
              <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/40 p-7 transition-colors hover:border-shine/40">
                {/* Google-style header: avatar + name + verified */}
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-shine to-shine-700 font-bold text-black">
                    {review.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-xs text-slate-muted">
                      Verified customer
                    </p>
                  </div>
                  <svg
                    className="ml-auto h-5 w-5 text-shine"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-label="Google review"
                  >
                    <path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 3-4.3 3-7.1z" />
                    <path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.4c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H3.2v2.5C4.9 19.7 8.2 22 12 22z" />
                    <path d="M6.4 14.1c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.8H3.2C2.4 9.3 2 11 2 12.2s.4 2.9 1.2 4.4l3.2-2.5z" />
                    <path d="M12 6.5c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 3.6 14.7 2.6 12 2.6 8.2 2.6 4.9 4.9 3.2 8.3l3.2 2.5c.8-2.4 3-4.1 5.6-4.1z" />
                  </svg>
                </div>

                <div
                  className="mt-4 flex gap-1 text-shine"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <StarIcon key={s} />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/90 sm:text-base">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-5 border-t border-white/10 pt-4 text-xs uppercase tracking-wider text-slate-muted">
                  {review.detail}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section>
        <Container>
          <Reveal className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-shine/15 to-slate-card p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Detailed by us? <span className="text-shine">Tell the world.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-muted sm:text-base">
              Loved your detail? A quick Google review helps other drivers find
              us — and it means a lot to a small mobile business.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Button href="https://g.page/r/mohsshinedetailing/review" target="_blank" rel="noopener noreferrer" size="lg">
                  Leave a Google review
                </Button>
              </Magnetic>
              <Magnetic strength={6}>
                <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
                  Book your next detail
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
