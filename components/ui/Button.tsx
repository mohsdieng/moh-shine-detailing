import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-shine text-black hover:bg-shine-400 shadow-[0_0_0_0_rgba(56,182,255,0.5)] hover:shadow-[0_8px_30px_-6px_rgba(56,182,255,0.6)]",
  secondary:
    "border border-white/25 text-white hover:border-shine hover:text-shine bg-transparent",
  ghost: "text-white/80 hover:text-white bg-transparent",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 ease-out will-change-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none";

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

/** Pill button rendering as <a> when `href` is provided, else <button>. */
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
