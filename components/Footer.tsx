"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { Magnetic } from "./anim/Magnetic";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { publishedCities } from "@/lib/cities";

const explore = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

const sectionLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Why Moh's Shine", href: "/#why-us" },
  { label: "Service area", href: "/#service-area" },
  { label: "FAQ", href: "/#faq" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      {/* Top: oversized italic wordmark watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative mx-auto max-w-container px-5 pt-16 sm:px-8 sm:pt-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="select-none whitespace-nowrap text-[18vw] font-bold italic leading-none tracking-tighter text-white/[0.04] sm:text-[14vw] lg:text-[12rem]"
        >
          MS<span className="text-shine/20">.</span>DETAILING
        </motion.p>
      </div>

      <div className="relative mx-auto grid max-w-container gap-12 px-5 pb-12 pt-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand column */}
        <div>
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="inline-flex h-14"
          >
            <Logo variant="dark" className="h-full" />
          </Link>
          <p className="mt-2 text-xs font-medium uppercase tracking-eyebrow text-shine">
            {site.motto}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-muted">
            {site.tagline} We bring the full detailing studio to your driveway —
            water, power and pro-grade products.
          </p>
          <div className="mt-6 flex gap-3">
            <SocialIcon
              href={site.social.instagram}
              label="Instagram"
              path={<InstagramPath />}
            />
            <SocialIcon
              href={site.social.tiktok}
              label="TikTok"
              path={<TikTokPath />}
            />
          </div>
        </div>

        {/* Services */}
        <nav aria-label="Services">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Services
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-slate-muted transition-colors hover:text-shine"
                >
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-white">
            Service Areas
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/locations" className="text-slate-muted transition-colors hover:text-shine">
                All service areas
              </Link>
            </li>
            {publishedCities().map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/locations/${c.slug}`}
                  className="text-slate-muted transition-colors hover:text-shine"
                >
                  Detailing in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Explore + sections */}
        <nav aria-label="Explore">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Explore
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {explore.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-muted transition-colors hover:text-shine"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-4 space-y-3 text-sm">
            {sectionLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-muted/70 transition-colors hover:text-shine"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Get in touch + newsletter */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Get in touch
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-muted">
            <li>
              <a href={site.phoneHref} className="transition-colors hover:text-shine">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="transition-colors hover:text-shine">
                {site.email}
              </a>
            </li>
            <li className="pt-1 text-slate-muted">
              Serving Raleigh, Durham &amp; the NC Triangle
            </li>
          </ul>

          <Newsletter />
        </div>
      </div>

      {/* Divider + bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-container flex-col items-start justify-between gap-3 px-5 py-6 text-xs text-slate-muted sm:flex-row sm:items-center sm:px-8">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Mobile auto detailing</span>
            {["Raleigh", "Durham", "Cary", "Chapel Hill", "Apex", "Wake Forest"].map((c) => (
              <span key={c} className="inline-flex items-center gap-3 before:content-['·']">
                <span>{c}</span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

function Newsletter() {
  const [done, setDone] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = (fd.get("email") as string) || "";
    if (!email) return;
    // No backend — open a pre-filled email to the business so the visitor's
    // sign-up actually reaches someone until a real list is wired up.
    window.location.href = `${site.emailHref}?subject=${encodeURIComponent(
      "Newsletter sign-up",
    )}&body=${encodeURIComponent(`Please add me to your list: ${email}`)}`;
    setDone(true);
  };

  return (
    <form onSubmit={onSubmit} className="mt-6">
      <label
        htmlFor="newsletter-email"
        className="block text-xs uppercase tracking-wider text-slate-muted"
      >
        Get detailing tips + offers
      </label>
      <div className="mt-2 flex overflow-hidden rounded-full border border-white/15 bg-white/[0.03] focus-within:border-shine">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-slate-muted/70 focus:outline-none"
        />
        <Magnetic strength={6}>
          <button
            type="submit"
            className="flex items-center gap-1 bg-shine px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-shine-400"
          >
            {done ? "Sent" : "Join"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </Magnetic>
      </div>
    </form>
  );
}

function SocialIcon({
  href,
  label,
  path,
}: {
  href: string;
  label: string;
  path: React.ReactNode;
}) {
  return (
    <Magnetic strength={8}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-shine hover:text-shine"
      >
        {path}
      </a>
    </Magnetic>
  );
}

function InstagramPath() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokPath() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.4-2.5 5.6-5.6 5.6A5.4 5.4 0 0 1 5.5 14c0-3.1 2.7-5.4 6-5v2.8c-.4-.1-.8-.2-1.2-.2-1.4 0-2.4 1-2.4 2.4 0 1.4 1 2.4 2.4 2.4 1.5 0 2.5-1 2.5-2.7V3h3.7Z" />
    </svg>
  );
}
