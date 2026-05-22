import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const footerNav = [
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-container gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label={`${site.name} — home`} className="inline-flex h-12">
            <Logo variant="dark" className="h-full" />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-muted">
            {site.tagline} We bring the full detailing studio to your driveway.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Explore
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {footerNav.map((link) => (
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
        </nav>

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
            <li className="pt-1 text-slate-muted">Serving Raleigh, Durham &amp; the NC Triangle</li>
          </ul>

          <div className="mt-5 flex gap-4">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-shine hover:text-shine"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={site.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-shine hover:text-shine"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16.5 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.4-2.5 5.6-5.6 5.6A5.4 5.4 0 0 1 5.5 14c0-3.1 2.7-5.4 6-5v2.8c-.4-.1-.8-.2-1.2-.2-1.4 0-2.4 1-2.4 2.4 0 1.4 1 2.4 2.4 2.4 1.5 0 2.5-1 2.5-2.7V3h3.7Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-slate-muted sm:flex-row sm:px-8">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>Mobile auto detailing &middot; Raleigh &middot; Durham &middot; Cary &middot; Chapel Hill</p>
        </div>
      </div>
    </footer>
  );
}
