import type { ReactNode } from "react";

/**
 * Compact trust strip surfaced on the home page and service detail headers.
 * Reinforces the core promises a visitor needs before booking: we come to
 * you, we're insured, we're local, and we apply genuine ceramic protection.
 * Static, lightweight (inline SVG), and styled to match the chrome/shine
 * luxury system.
 */

type Badge = { label: string; icon: ReactNode };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const badges: Badge[] = [
  {
    label: "Mobile Service",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" {...stroke} aria-hidden="true">
        <path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h8.2A2 2 0 0 1 17 8l2 5" />
        <path d="M2 13h20v4a1 1 0 0 1-1 1h-1M4 18H3a1 1 0 0 1-1-1v-4" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="17" cy="18" r="1.6" />
      </svg>
    ),
  },
  {
    label: "Insured",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" {...stroke} aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Raleigh–Durham",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" {...stroke} aria-hidden="true">
        <path d="M12 21s-7-5.2-7-11a7 7 0 1 1 14 0c0 5.8-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.4" />
      </svg>
    ),
  },
  {
    label: "Ceramic Protection",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" {...stroke} aria-hidden="true">
        <path d="M12 2.5 4.5 6v6c0 4.6 3.2 7.6 7.5 9.5 4.3-1.9 7.5-4.9 7.5-9.5V6z" />
        <path d="M12 7v4l2.5 1.5" />
      </svg>
    ),
  },
];

export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5 sm:gap-x-5 ${className}`}
    >
      {badges.map((b, i) => (
        <li key={b.label} className="flex items-center gap-2.5">
          {i > 0 && (
            <span aria-hidden="true" className="hidden h-3.5 w-px bg-chrome/20 sm:block" />
          )}
          <span className="group inline-flex items-center gap-2 text-chrome/80 transition-colors duration-300 hover:text-shine">
            <span className="text-shine/80 transition-colors duration-300 group-hover:text-shine">
              {b.icon}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              {b.label}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
