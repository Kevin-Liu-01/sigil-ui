"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}

export const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  function SectionHeading({ label, title, description, align = "left", className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="section-heading"
        className={cn(
          "mb-12",
          align === "center" && "text-center mx-auto max-w-2xl",
          align === "left" && "max-w-2xl",
          className,
        )}
        {...props}
      >
        {label && (
          <p className="font-[family-name:var(--s-font-mono)] text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[var(--s-primary)] mb-4">
            {label}
          </p>
        )}
        <h2 className="font-[family-name:var(--s-font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-[var(--s-heading-weight,700)] leading-[1.1] tracking-[var(--s-heading-tracking,-0.025em)] text-[var(--s-text)] text-balance">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-[var(--s-typography-size-base,0.9375rem)] leading-relaxed text-[var(--s-text-muted)]">
            {description}
          </p>
        )}
      </div>
    );
  },
);
