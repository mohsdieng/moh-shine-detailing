import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BookButton } from "@/components/ui/BookButton";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page couldn't be found. Explore our mobile detailing services and service areas across the Raleigh–Durham Triangle.",
  robots: { index: false, follow: true },
};

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/locations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-navy-950 pt-28 sm:pt-32">
      {/* Cinematic background */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-950 to-black" />
        <div className="absolute left-[55%] top-[20%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-shine/12 blur-[150px]" />
        <div className="absolute inset-0 bg-shine-grid bg-[size:72px_72px] opacity-25 [mask-image:radial-gradient(ellipse_at_55%_40%,black,transparent_75%)]" />
      </div>

      {/* Oversized 404 watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden pr-[4vw] text-[34vw] font-bold italic leading-none text-white/[0.03] sm:text-[24vw]"
        style={{ letterSpacing: "-0.05em" }}
      >
        404
      </span>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-[6px] w-[6px] rounded-full bg-shine" />
            404 — Page not found
          </p>
          <h1 className="text-balance text-4xl font-bold leading-[1.02] tracking-tightest text-white sm:text-6xl">
            This page took a <span className="text-shine italic">wrong turn.</span>
          </h1>
          <div className="mt-7 h-px w-16 bg-shine" aria-hidden="true" />
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-chrome sm:text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
            get you back to a clean detail — pick a destination below.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BookButton size="lg">Book a Detail</BookButton>
            <Button href="/services" variant="secondary" size="lg">
              View Services
            </Button>
          </div>

          {/* Quick links */}
          <nav aria-label="Helpful links" className="mt-12 border-t border-chrome-line pt-6">
            <ul className="flex flex-wrap gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-2 border border-chrome-line bg-white/[0.03] px-4 py-2 text-sm text-white/85 transition-colors hover:border-shine hover:text-shine"
                  >
                    {l.label}
                    <span aria-hidden="true" className="text-shine">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
