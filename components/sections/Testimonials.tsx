import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";
import { StarIcon } from "../icons";

// Placeholder reviews — replace with real testimonials. Generic initials only.
const reviews = [
  {
    quote:
      "Showed up on time, worked in my driveway, and my car looked better than the day I bought it. The interior smelled brand new. Booking again next month.",
    name: "James R.",
    detail: "Full Detail · Raleigh",
    rating: 5,
  },
  {
    quote:
      "I'm picky about my paint and was nervous about a wash. They hand-washed everything and there wasn't a single swirl. Genuinely impressed with the care.",
    name: "Priya S.",
    detail: "Paint Correction · Durham",
    rating: 5,
  },
  {
    quote:
      "So convenient not having to drive anywhere. Friendly, professional, and the truck came out spotless inside and out. Highly recommend to anyone in the area.",
    name: "Marcus T.",
    detail: "Interior Detail · Cary",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <Section
      eyebrow="Kind words"
      heading="Drivers love the shine"
      intro="A few words from people around the Triangle who've trusted us with their vehicles."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {reviews.map((review, i) => (
          <Reveal key={review.name} delay={i * 0.1}>
            <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-card p-6">
              <div className="flex gap-1 text-shine" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, s) => (
                  <StarIcon key={s} />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/90">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-white/10 pt-4">
                <p className="font-semibold text-white">{review.name}</p>
                <p className="text-xs uppercase tracking-wider text-slate-muted">
                  {review.detail}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
