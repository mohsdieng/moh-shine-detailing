import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Centered max-width content wrapper with consistent horizontal padding. */
export function Container({ as: Tag = "div", className = "", children }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-container px-5 sm:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
