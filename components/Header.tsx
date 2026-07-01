"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { BookButton } from "./ui/BookButton";
import { Magnetic } from "./anim/Magnetic";
import { site, hasPhone } from "@/lib/site";
import { services } from "@/lib/services";
import { publishedCities } from "@/lib/cities";

type NavLink = {
  label: string;
  href: string;
  /** When set, renders a Services-style dropdown menu. */
  dropdown?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    dropdown: services.map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
  },
  {
    label: "Areas",
    href: "/locations",
    dropdown: publishedCities().map((c) => ({
      label: c.name,
      href: `/locations/${c.slug}`,
    })),
  },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset menus on navigation.
  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Close the dropdown or the fullscreen mobile menu on Escape.
  useEffect(() => {
    if (!openDropdown && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenDropdown(null);
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openDropdown, open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Small hover-intent: open on enter, close after a short delay on leave so
  // the cursor has time to slide into the dropdown without it disappearing.
  const openWithIntent = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setOpenDropdown(label);
  };
  const closeWithIntent = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    dropdownTimer.current = setTimeout(() => setOpenDropdown(null), 160);
  };

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
          className={`mx-auto flex max-w-container items-center justify-between gap-6 px-5 transition-all duration-300 sm:px-8 ${
            scrolled || open ? "h-16 sm:h-[68px]" : "h-20 sm:h-24"
          }`}
        >
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="flex h-11 items-center sm:h-14"
            onClick={() => setOpen(false)}
          >
            <Logo variant="dark" className="h-full" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.dropdown && openWithIntent(link.label)}
                onMouseLeave={() => link.dropdown && closeWithIntent()}
              >
                <Link
                  href={link.href}
                  data-active={isActive(link.href) ? "true" : undefined}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  aria-haspopup={link.dropdown ? "menu" : undefined}
                  aria-expanded={
                    link.dropdown ? openDropdown === link.label : undefined
                  }
                  className="nav-link flex items-center gap-1 px-3 py-2 text-sm"
                >
                  {link.label}
                  {link.dropdown && (
                    <svg
                      className={`h-3 w-3 transition-transform ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {link.dropdown && (
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        role="menu"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full z-40 mt-2 w-72 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/95 p-2 shadow-2xl backdrop-blur-md"
                      >
                        <Link
                          href={link.href}
                          className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-shine/10 hover:text-shine"
                        >
                          All services →
                        </Link>
                        <div className="my-1 h-px bg-white/10" />
                        <ul className="grid">
                          {link.dropdown.map((d) => (
                            <li key={d.href}>
                              <Link
                                href={d.href}
                                role="menuitem"
                                className="block rounded-xl px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-shine"
                              >
                                {d.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Magnetic strength={8}>
              <BookButton>Book Now</BookButton>
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
                  transition={{ delay: 0.04 + i * 0.035, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/5"
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-4 text-2xl font-bold tracking-tight text-white transition-colors hover:text-shine sm:text-3xl"
                    onClick={() => setOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span className="text-shine">→</span>
                  </Link>
                  {/* Inline list of services on mobile so users don't need a sub-menu interaction. */}
                  {link.dropdown && (
                    <ul className="mb-4 grid gap-1.5 pl-1 pr-2">
                      {link.dropdown.map((d) => (
                        <li key={d.href}>
                          <Link
                            href={d.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-2 py-1.5 text-sm text-slate-muted transition-colors hover:bg-white/5 hover:text-shine"
                          >
                            {d.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mt-6 flex flex-col gap-3"
              >
                <BookButton size="lg" className="w-full">
                  Book Now
                </BookButton>
                {hasPhone && (
                  <Button
                    href={site.phoneHref}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    Call {site.phone}
                  </Button>
                )}
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
