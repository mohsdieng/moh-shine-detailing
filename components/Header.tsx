"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { Magnetic } from "./anim/Magnetic";
import { site } from "@/lib/site";

const navLinks = [
  { label: "Services", href: "/#services", section: "services" },
  { label: "Process", href: "/#how-it-works", section: "how-it-works" },
  { label: "Why us", href: "/#why-us", section: "why-us" },
  { label: "Gallery", href: "/#gallery", section: "gallery" },
  { label: "Area", href: "/#service-area", section: "service-area" },
  { label: "FAQ", href: "/#faq", section: "faq" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the menu whenever the route changes (e.g. after navigation).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll-spy: highlight the nav item whose section is in view (home only).
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const sections = navLinks
      .map((l) => document.getElementById(l.section))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5, 0.75] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-black/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-container items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          scrolled || open ? "h-16 sm:h-[68px]" : "h-20 sm:h-24"
        }`}
      >
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="flex h-10 items-center sm:h-12"
          onClick={() => setOpen(false)}
        >
          <Logo variant="dark" className="h-full" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={activeSection === link.section ? "true" : undefined}
              className="nav-link text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Magnetic strength={8}>
            <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book Now
            </Button>
          </Magnetic>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>
    </header>

      {/* Fullscreen mobile menu — rendered as a sibling of <header> so its
          `position: fixed` is relative to the viewport rather than the header's
          backdrop-filter containing block. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-black/95 backdrop-blur-md sm:top-[68px] lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="mx-auto flex max-w-container flex-col gap-1 px-5 py-8 sm:px-8"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/5"
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-5 text-3xl font-bold tracking-tight text-white transition-colors hover:text-shine"
                    onClick={() => setOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span className="text-shine">→</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6 flex flex-col gap-3"
              >
                <Button
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="w-full"
                >
                  Book Now
                </Button>
                <Button
                  href={site.phoneHref}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  Call {site.phone}
                </Button>
              </motion.div>

              <p className="mt-8 text-xs uppercase tracking-wider text-slate-muted">
                Serving Raleigh · Durham · Cary · Chapel Hill · Apex · Wake Forest
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
