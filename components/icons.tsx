import type { SVGProps } from "react";

/** Lightweight inline icon set (stroke-based) used on service cards & steps. */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function WashIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 17h14l-1.2-5.4A3 3 0 0 0 14.87 9H9.13a3 3 0 0 0-2.93 2.6L5 17Z" />
      <path d="M3 17h18" />
      <circle cx="7.5" cy="20" r="1.4" />
      <circle cx="16.5" cy="20" r="1.4" />
      <path d="M8 6.5c0 1-1 1.5-1 2.5M12 5c0 1-1 1.5-1 2.5M16 6.5c0 1-1 1.5-1 2.5" />
    </svg>
  );
}

export function InteriorIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16v-2a4 4 0 0 1 4-4h2l3-4h3a2 2 0 0 1 2 2v8" />
      <path d="M3 16h18" />
      <path d="M6 16v2M18 16v2" />
      <path d="M10 10v6" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z" />
      <path d="M18 15l.8 2L21 17.8 19 18.6 18.2 21 17.4 18.6 15 17.8 17.4 17 18 15Z" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z" />
    </svg>
  );
}

export function StepDetailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 4l6 6-9 9-6 1 1-6 8-10Z" />
      <path d="M12 6l6 6" />
    </svg>
  );
}

export function ShineIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export const serviceIcons = {
  wash: WashIcon,
  interior: InteriorIcon,
  sparkle: SparkleIcon,
  shield: ShieldIcon,
} as const;
