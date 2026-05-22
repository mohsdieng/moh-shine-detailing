import Image from "next/image";
import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";

/**
 * Before/after showcase. Each item points at placeholder SVGs in /public/gallery.
 * Swap `before`/`after` for real photos (e.g. /gallery/civic-before.jpg) and update
 * the alt text — see README. The `hue` class adds subtle colour variety per card.
 */
const items = [
  {
    label: "Daily driver — exterior hand wash",
    before: "/gallery/before.svg",
    after: "/gallery/after.svg",
    alt: "sedan exterior",
    hue: "",
  },
  {
    label: "Family SUV — full interior detail",
    before: "/gallery/before.svg",
    after: "/gallery/after.svg",
    alt: "SUV after a full interior detail",
    hue: "hue-rotate-[30deg]",
  },
  {
    label: "Work truck — full detail",
    before: "/gallery/before.svg",
    after: "/gallery/after.svg",
    alt: "pickup truck after a full detail",
    hue: "hue-rotate-[-25deg]",
  },
  {
    label: "Coupe — paint correction",
    before: "/gallery/before.svg",
    after: "/gallery/after.svg",
    alt: "coupe after paint correction",
    hue: "hue-rotate-[60deg]",
  },
];

export function Gallery() {
  return (
    <Section
      id="gallery"
      eyebrow="The results"
      heading="Before &amp; after"
      intro="Real transformations from the driveway. Slide your eyes across — the difference a proper hand detail makes speaks for itself."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.08}>
            <figure className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-card">
              <div className="grid grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.before}
                    alt={`Before: ${item.alt}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${item.hue}`}
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden border-l-2 border-shine">
                  <Image
                    src={item.after}
                    alt={`After: ${item.alt}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${item.hue}`}
                  />
                </div>
              </div>
              <figcaption className="flex items-center justify-between px-5 py-4">
                <span className="text-sm font-medium text-white">{item.label}</span>
                <span className="text-xs uppercase tracking-wider text-shine">
                  Before / After
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
