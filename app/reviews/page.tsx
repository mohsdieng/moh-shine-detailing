import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { testimonials, reviewsPublished } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { BookButton } from "@/components/ui/BookButton";
import { Breadcrumbs } from "@/components/locations/Breadcrumbs";
import { StarIcon } from "@/components/icons";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Reviews — Moh's Shine Detailing & Ceramic Coating",
  description:
    "What drivers across Raleigh, Durham, Cary and the NC Triangle say about Moh's Shine Detailing & Ceramic Coating — premium mobile detailing brought to your driveway.",
  path: "/reviews",
});

const showReviews = reviewsPublished && testimonials.length > 0;

export default function ReviewsPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Reviews", path: "/reviews" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      {/* Cinematic header */}
      <header className="relative overflow-hidden border-b border-chrome-line bg-navy-950 pt-28 sm:pt-36">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-950 to-black" />
          <div className="absolute right-[20%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-shine/15 blur-[140px]" />
          <div className="absolute inset-0 bg-shine-grid bg-[size:64px_64px] opacity-25 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" />
        </div>
        <Container className="relative pb-16 sm:pb-20">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-shine" />
              Reviews
            </p>
            <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[0.98] tracking-tightest text-white sm:text-6xl md:text-[4.5rem]">
              Kind words from{" "}
              <span className="text-shine italic">the Triangle.</span>
            </h1>
            <div className="mt-7 h-px w-16 bg-shine" aria-hidden="true" />
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-chrome sm:text-lg">
              Honest feedback from drivers across Raleigh, Durham, Cary and the
              surrounding NC Triangle.
            </p>
          </Reveal>
        </Container>
      </header>

      <section className="relative bg-black py-16 sm:py-24">
        <Container>
          {showReviews ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((review, i) => (
                <Reveal key={`${review.name}-${i}`} delay={i * 0.05}>
                  <figure className="flex h-full flex-col border border-chrome-line bg-gradient-to-br from-slate-card to-black p-7">
                    <div className="flex gap-1 text-shine" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, s) => (
                        <StarIcon key={s} />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-base leading-relaxed text-white/90">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 border-t border-chrome-line pt-4">
                      <p className="font-semibold text-white">{review.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-widest text-chrome">
                        {review.detail}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          ) : (
            /* Honest pre-launch state — no fabricated reviews, count or rating. */
            <Reveal className="mx-auto max-w-2xl border border-chrome-line bg-gradient-to-br from-slate-card to-black p-10 text-center sm:p-14">
              <p className="eyebrow mb-4">Building our reputation</p>
              <h2 className="text-balance text-3xl font-bold tracking-tightest text-white sm:text-4xl">
                Reviews are on the way.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-chrome sm:text-lg">
                We&apos;re a growing mobile detailing studio, and we&apos;ll share
                customer reviews here as they come in. Detailed with us? We&apos;d
                love your feedback.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {site.social.google ? (
                  <Button href={site.social.google} target="_blank" rel="noopener noreferrer" size="lg">
                    Leave a Google review
                  </Button>
                ) : (
                  <BookButton size="lg">Book a Detail</BookButton>
                )}
                <Button href="/contact" variant="secondary" size="lg">
                  Get a Quote
                </Button>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="relative border-t border-chrome-line bg-black py-20 sm:py-28">
        <Container>
          <Reveal className="overflow-hidden border border-chrome-line bg-gradient-to-br from-shine/15 to-navy-950 p-10 text-center sm:p-16">
            <p className="eyebrow mb-5">Ready when you are</p>
            <h2 className="text-balance text-4xl font-bold tracking-tightest text-white sm:text-5xl">
              Experience it <span className="text-shine italic">yourself.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-chrome sm:text-lg">
              We bring the full studio to your driveway across the Raleigh–Durham
              Triangle. Tell us about your vehicle and we&apos;ll send a quote.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookButton size="lg">Book Now</BookButton>
              <Button href="/contact" variant="secondary" size="lg">
                Get a Quote
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
