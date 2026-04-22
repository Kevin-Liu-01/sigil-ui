"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /** Make the navbar sticky at the top. */
  sticky?: boolean;
  /** Transparent background (useful for hero overlays). */
  transparent?: boolean;
  children?: ReactNode;
}

/** Navigation bar with configurable sticky/transparent behavior. */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(function Navbar(
  { sticky = false, transparent = false, className, children, ...rest },
  ref,
) {
  return (
    <nav
      ref={ref}
      className={cn(
        "w-full z-50 flex items-center justify-between px-6 h-16",
        sticky && "sticky top-0",
        transparent
          ? "bg-transparent"
          : "bg-[var(--s-background)]/95 backdrop-blur-sm border-b border-[var(--s-border)]",
        className,
      )}
      {...rest}
    >
      {children}
    </nav>
  );
});

export interface NavbarLogoProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Navbar logo slot. */
export const NavbarLogo = forwardRef<HTMLDivElement, NavbarLogoProps>(
  function NavbarLogo({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cn("flex items-center gap-2 font-semibold text-[var(--s-text)]", className)} {...rest}>
        {children}
      </div>
    );
  },
);

export interface NavbarLinksProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Navbar links container. */
export const NavbarLinks = forwardRef<HTMLDivElement, NavbarLinksProps>(
  function NavbarLinks({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cn("hidden md:flex items-center gap-6", className)} {...rest}>
        {children}
      </div>
    );
  },
);

export interface NavbarActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Navbar actions slot (buttons, auth, etc). */
export const NavbarActions = forwardRef<HTMLDivElement, NavbarActionsProps>(
  function NavbarActions({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cn("flex items-center gap-3", className)} {...rest}>
        {children}
      </div>
    );
  },
);
