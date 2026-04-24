"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../utils";

export type AccentCTASize = "sm" | "md" | "lg";

export interface AccentCTAProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button size. @default "md" */
  size?: AccentCTASize;
  /** Enable glow effect on hover. @default true */
  glow?: boolean;
  /** Render as child element (Radix Slot pattern for links). */
  asChild?: boolean;
  children?: ReactNode;
}

const sizeStyles: Record<AccentCTASize, string> = {
  sm: "h-8 px-4 text-[12px]",
  md: "h-10 px-6 text-[13px]",
  lg: "h-12 px-8 text-[14px]",
};

/**
 * The purple accent singleton — the one color that breaks the monochrome.
 *
 * Solid primary fill, dark text, glow on hover. Used for CTAs,
 * "Add to Cart" buttons, and any call-to-action that demands
 * the single accent punch.
 *
 * ```tsx
 * <AccentCTA>Get Started</AccentCTA>
 * <AccentCTA size="lg" glow>Add to Cart</AccentCTA>
 * <AccentCTA asChild><a href="/pricing">View Pricing</a></AccentCTA>
 * ```
 */
export const AccentCTA = forwardRef<HTMLButtonElement, AccentCTAProps>(
  function AccentCTA(
    { size = "md", glow = true, asChild = false, className, children, ...rest },
    ref,
  ) {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        data-slot="accent-cta"
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "font-[family-name:var(--s-font-mono)] font-semibold uppercase tracking-[0.08em]",
          "cursor-pointer select-none whitespace-nowrap",
          "bg-[var(--s-primary)] text-[var(--s-primary-contrast,#0F0F0F)]",
          "transition-all duration-[var(--s-duration-fast,150ms)] ease-out",
          "active:scale-[var(--s-button-active-scale,0.97)]",
          glow && "hover:shadow-[0_0_24px_var(--s-glow,var(--s-primary))]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--s-background)]",
          "disabled:opacity-50 disabled:pointer-events-none",
          sizeStyles[size],
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

export interface AccentActiveProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;
  /** Whether this item is currently active/selected. */
  active?: boolean;
}

import type { HTMLAttributes } from "react";

/**
 * Active-state wrapper using the accent singleton pattern.
 *
 * When `active`, applies the accent border/bg/text treatment
 * used for filter buttons, selected sizes, and cart count pills.
 *
 * ```tsx
 * <AccentActive active={selectedSize === "M"}>M</AccentActive>
 * ```
 */
export const AccentActive = forwardRef<HTMLDivElement, AccentActiveProps>(
  function AccentActive({ active = false, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="accent-active"
        data-active={active || undefined}
        className={cn(
          "transition-colors duration-[var(--s-duration-fast,150ms)]",
          active
            ? "border-[color:color-mix(in_oklch,var(--s-primary)_40%,transparent)] bg-[color-mix(in_oklch,var(--s-primary)_10%,transparent)] text-[var(--s-primary)]"
            : "border-[var(--s-border)] bg-transparent text-[var(--s-text-muted)]",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
