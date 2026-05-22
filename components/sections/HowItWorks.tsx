import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";
import { CalendarIcon, TruckIcon, StepDetailIcon, ShineIcon } from "../icons";

const steps = [
  {
    icon: CalendarIcon,
    title: "Book",
    copy: "Pick your service and a time online through our Square booking — it takes about a minute.",
  },
  {
    icon: TruckIcon,
    title: "We come to you",
    copy: "Our fully equipped mobile setup arrives at your home or office. No driving, no waiting in line.",
  },
  {
    icon: StepDetailIcon,
    title: "We detail",
    copy: "We hand wash, decontaminate and detail your vehicle with pro-grade products and care.",
  },
  {
    icon: ShineIcon,
    title: "You shine",
    copy: "Walk out to a spotless, glossy ride that looks and feels brand new. That's the Moh's Shine difference.",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      className="bg-slate-surface"
      eyebrow="The process"
      heading="How it works"
      intro="From booking to that just-detailed shine in four simple steps."
    >
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal as="li" key={step.title} delay={i * 0.1}>
              <div className="relative h-full rounded-2xl border border-white/10 bg-black/40 p-6">
                <span className="absolute right-5 top-5 text-5xl font-bold italic text-white/5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-shine text-black">
                  <Icon />
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-muted">{step.copy}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
