"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export type CTAAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type CTAProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  /** CTA headline. */
  title: string;
  /** CTA supporting text. */
  description?: string;
  /** Action buttons. */
  actions?: CTAAction[];
  /** Layout variant. @default "centered" */
  variant?: "centered" | "split";
  children?: ReactNode;
};

/** Call-to-action section with centered or split layout. */
export const CTA = forwardRef<HTMLElement, CTAProps>(function CTA(
  { title, description, actions, variant = "centered", className, children, ...rest },
  ref,
) {
  const isSplit = variant === "split";

  return (
    <section
      ref={ref}
      data-slot="cta"
      className={cn(
        "w-full px-6 py-16 md:py-20",
        "rounded-[var(--s-card-radius,8px)] border border-[style:var(--s-border-style,solid)] border-[var(--s-border)]",
        "bg-[var(--s-surface)]",
        isSplit ? "flex flex-col md:flex-row items-center justify-between gap-8" : "text-center",
        className,
      )}
      {...rest}
    >
      <div className={cn(isSplit ? "flex-1" : "max-w-2xl mx-auto")}>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--s-text)] tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-[var(--s-text-secondary)] text-base md:text-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {(actions || children) && (
        <div className={cn("flex flex-wrap gap-3", !isSplit && "mt-8 justify-center")}>
          {actions?.map((action) => (
            <a
              key={action.label}
              href={action.href}
              onClick={action.onClick}
              className={cn(
                "inline-flex items-center justify-center h-11 px-6 rounded-[var(--s-radius-md,6px)]",
                "text-sm font-medium transition-all duration-[var(--s-duration-fast,150ms)]",
                "bg-[var(--s-primary)] text-[var(--s-primary-contrast)] hover:bg-[var(--s-primary-hover)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--s-primary)] focus-visible:ring-offset-2",
              )}
            >
              {action.label}
            </a>
          ))}
          {children}
        </div>
      )}
    </section>
  );
});
