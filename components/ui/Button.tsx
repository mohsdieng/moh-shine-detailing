import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

/**
 * Luxury-leaning button.
 *
 * - Square-corner rounded-sm rather than pill — feels editorial / automotive.
 * - Restrained hover: subtle background/border change + arrow nudge, no bounce.
 * - Primary: solid shine blue → darker on hover.
 * - Secondary: thin chrome border → fills with shine on hover.
 * - Ghost: text + arrow only.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-shine text-black hover:bg-shine-400",
  secondary:
    "border border-chrome/30 text-white hover:border-shine hover:text-shine bg-transparent",
  ghost:
    "text-white/80 hover:text-white bg-transparent",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[13px]",
  lg: "px-7 py-3.5 text-sm",
};

const baseClasses =
  "group inline-flex items-center justify-center gap-2.5 rounded-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-out will-change-transform focus-visible:outline-none";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Renders as <a> when `href` is provided, else <button>. */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
