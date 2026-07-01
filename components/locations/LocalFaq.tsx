import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";
import { Accordion } from "../anim/Accordion";
import { JsonLd, faqPageSchema } from "../JsonLd";
import type { Faq } from "@/lib/content";

type LocalFaqProps = {
  items: Faq[];
  eyebrow?: string;
  heading?: React.ReactNode;
  intro?: string;
  /** Emit FAQPage JSON-LD (keep true for exactly one FAQ block per page). */
  emitSchema?: boolean;
  className?: string;
};

/**
 * Reusable FAQ block for the local landing pages: animated accordion plus
 * FAQPage structured data. Server component — the interactive Accordion is the
 * only client island, keeping these SEO pages light.
 */
export function LocalFaq({
  items,
  eyebrow = "Good to know",
  heading = (
    <>
      Questions, <span className="text-shine italic">answered.</span>
    </>
  ),
  intro,
  emitSchema = true,
  className = "",
}: LocalFaqProps) {
  const accordionItems = items.map((f, i) => ({
    id: `faq-${i}`,
    question: f.q,
    answer: f.a,
  }));

  return (
    <Section id="faq" eyebrow={eyebrow} heading={heading} intro={intro} className={className}>
      {emitSchema && <JsonLd data={faqPageSchema(items)} />}
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Accordion items={accordionItems} />
        </Reveal>
      </div>
    </Section>
  );
}
