import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "../Reveal";

type SectionProps = {
  id?: string;
  className?: string;
  /** Optional uppercase blue eyebrow label above the heading. */
  eyebrow?: string;
  /** Section heading (rendered as <h2>). Omit for custom layouts. */
  heading?: ReactNode;
  /** Supporting copy beneath the heading. */
  intro?: ReactNode;
  /** Center the heading block. */
  centered?: boolean;
  children: ReactNode;
};

/**
 * Standard vertical section with optional eyebrow / heading / intro header.
 * The header block is scroll-revealed; content is passed through as children.
 */
export function Section({
  id,
  className = "",
  eyebrow,
  heading,
  intro,
  centered = false,
  children,
}: SectionProps) {
  const hasHeader = eyebrow || heading || intro;
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-28 ${className}`}>
      <Container>
        {hasHeader && (
          <Reveal
            className={`mb-12 max-w-2xl sm:mb-16 ${centered ? "mx-auto text-center" : ""}`}
          >
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {heading && (
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
                {heading}
              </h2>
            )}
            {intro && (
              <p className="mt-5 text-base leading-relaxed text-slate-muted sm:text-lg">
                {intro}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
