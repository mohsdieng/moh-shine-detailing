import { Container } from "../ui/Container";
import { Reveal } from "../Reveal";
import { Button } from "../ui/Button";
import { BookButton } from "../ui/BookButton";
import { Magnetic } from "../anim/Magnetic";

type LocationCtaProps = {
  heading: React.ReactNode;
  body: string;
};

/**
 * Closing conversion block shared by every location page: bold heading,
 * one line of copy, Book Now (Square) + Get a Quote. Restrained, on-brand.
 */
export function LocationCta({ heading, body }: LocationCtaProps) {
  return (
    <section className="relative border-t border-chrome-line bg-black py-20 sm:py-28">
      <Container>
        <Reveal className="overflow-hidden border border-chrome-line bg-gradient-to-br from-shine/15 to-navy-950 p-10 text-center sm:p-16">
          <p className="eyebrow mb-5">Ready to book?</p>
          <h2 className="text-balance text-4xl font-bold tracking-tightest text-white sm:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-chrome sm:text-lg">
            {body}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <BookButton size="lg">Book Now</BookButton>
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
  );
}
