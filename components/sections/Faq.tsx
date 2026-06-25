import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";
import { Accordion } from "../anim/Accordion";
import { JsonLd, faqPageSchema } from "../JsonLd";
import { faqs } from "@/lib/content";

/**
 * FAQ section — animated accordion + FAQPage JSON-LD so Google can surface
 * questions as rich results.
 */
export function Faq() {
  const items = faqs.map((f, i) => ({
    id: `faq-${i}`,
    question: f.q,
    answer: f.a,
  }));

  const schema = faqPageSchema(faqs);

  return (
    <Section
      id="faq"
      eyebrow="Good to know"
      heading={
        <>
          Questions, <span className="text-shine">answered.</span>
        </>
      }
      intro="A few of the things drivers ask us most before booking. Don't see your question? Reach out — we reply in plain English, usually within an hour."
    >
      <JsonLd data={schema} />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Accordion items={items} />
        </Reveal>
      </div>
    </Section>
  );
}
