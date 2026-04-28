"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface HeroAction {
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
}

export type HeroProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  /** Headline text. */
  title: ReactNode;
  /** Supporting description text. */
  description?: ReactNode;
  /** CTA action buttons. */
  actions?: HeroAction[];
};

const actionVariantStyles: Record<string, string> = {
  primary:
    "bg-[var(--s-primary)] text-[var(--s-primary-contrast)] hover:bg-[var(--s-primary-hover)] shadow-[var(--s-shadow-sm)]",
  secondary:
    "bg-[var(--s-surface)] text-[var(--s-text)] border border-[var(--s-border)] hover:bg-[var(--s-surface-elevated)]",
  ghost: "bg-transparent text-[var(--s-text)] hover:bg-[var(--s-surface)]",
};

/** Hero section with headline, description, and CTA buttons. */
export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  { title, description, actions, className, children, ...rest },
  ref,
) {
  return (
    <section
      ref={ref}
      data-slot="hero"
      className={cn(
        "relative flex flex-col items-center justify-center text-center",
        "py-[var(--s-hero-padding-y,96px)] px-[var(--s-hero-padding-x,var(--s-page-margin,24px))]",
        className,
      )}
      style={{ minHeight: "var(--s-hero-min-height, auto)" }}
      {...rest}
    >
      <h1 className="text-[var(--s-hero-title-size,clamp(2.25rem,6vw,4rem))] font-bold text-[var(--s-text)] max-w-[var(--s-hero-title-max-width,56rem)] leading-tight tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-[var(--s-hero-description-gap,24px)] text-[var(--s-hero-description-size,1.125rem)] text-[var(--s-text-secondary)] max-w-[var(--s-hero-description-max-width,32rem)] leading-relaxed">
          {description}
        </p>
      )}
      {actions && actions.length > 0 && (
        <div className="mt-[var(--s-hero-actions-margin-top,32px)] flex flex-wrap items-center justify-center gap-[var(--s-hero-actions-gap,12px)]">
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              onClick={action.onClick}
              className={cn(
                "inline-flex items-center justify-center h-11 px-[var(--s-hero-action-padding-x,24px)] py-[var(--s-hero-action-padding-y,12px)] rounded-[var(--s-radius-md,6px)]",
                "text-sm font-medium transition-all duration-[var(--s-duration-fast,150ms)]",
                "focus-visible:outline-none focus-visible:ring-[length:var(--s-focus-ring-width)] focus-visible:ring-[var(--s-focus-ring-color)] focus-visible:ring-offset-[var(--s-focus-ring-offset)]",
                actionVariantStyles[action.variant ?? "primary"],
              )}
            >
              {action.label}
            </a>
          ))}
        </div>
      )}
      {children}
    </section>
  );
});
