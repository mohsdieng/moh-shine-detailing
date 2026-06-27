import type { ReactNode } from "react";
import { Button } from "./Button";
import { bookHref, bookLinkProps } from "@/lib/site";

type BookButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  children?: ReactNode;
};

/**
 * Booking CTA. Centralizes the "Book Now" link so it degrades gracefully:
 * when a real Square Appointments URL is configured (site.bookingUrl) it opens
 * externally; until then it routes to the on-site /contact page — never an
 * empty or broken href. Use this everywhere instead of hardcoding the URL.
 */
export function BookButton({
  variant = "primary",
  size,
  className,
  children = "Book Now",
}: BookButtonProps) {
  return (
    <Button href={bookHref} variant={variant} size={size} className={className} {...bookLinkProps}>
      {children}
    </Button>
  );
}
