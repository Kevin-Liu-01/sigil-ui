"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  blur?: boolean;
  bordered?: boolean;
  height?: number | string;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { sticky = true, blur = true, bordered = true, height, className, style, children, ...props },
  ref,
) {
  return (
    <header
      ref={ref}
      data-slot="header"
      className={cn(
        "w-full z-40",
        sticky && "sticky top-0",
        blur && "backdrop-blur-[var(--s-navbar-backdrop-blur,12px)]",
        bordered && "border-b",
        className,
      )}
      style={{
        height: height ?? "var(--s-navbar-height, 56px)",
        borderColor: bordered ? "var(--s-border)" : undefined,
        backgroundColor: `color-mix(in srgb, var(--s-background) var(--s-navbar-bg-opacity, 80)%, transparent)`,
        ...style,
      }}
      {...props}
    >
      {children}
    </header>
  );
});
