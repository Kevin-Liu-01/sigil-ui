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
    "bg-[var(--s-primary)] text-white hover:bg-[var(--s-primary-hover)] shadow-[var(--s-shadow-sm)]",
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
      className={cn(
        "relative flex flex-col items-center justify-center text-center",
        "py-20 md:py-32 px-6",
        className,
      )}
      {...rest}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--s-text)] max-w-4xl leading-tight tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-6 text-lg md:text-xl text-[var(--s-text-secondary)] max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      {actions && actions.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              onClick={action.onClick}
              className={cn(
                "inline-flex items-center justify-center h-11 px-6 rounded-[var(--s-radius-md,6px)]",
                "text-sm font-medium transition-all duration-[var(--s-duration-fast,150ms)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)] focus-visible:ring-offset-2",
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
