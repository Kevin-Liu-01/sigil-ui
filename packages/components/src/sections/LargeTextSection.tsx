"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface LargeTextSectionProps extends HTMLAttributes<HTMLElement> {
  text: ReactNode;
  align?: "left" | "center";
}

export const LargeTextSection = forwardRef<HTMLElement, LargeTextSectionProps>(
  function LargeTextSection({ text, align = "center", className, ...props }, ref) {
    return (
      <section
        ref={ref}
        data-slot="large-text-section"
        className={cn("py-[var(--s-section-py-lg,96px)]", className)}
        {...props}
      >
        <div className={cn(
          "mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-page-margin,24px)]",
          align === "center" && "text-center",
        )}>
          <p className={cn(
            "font-[family-name:var(--s-font-display)]",
            "text-[clamp(1.5rem,4vw,2.75rem)] font-[var(--s-heading-weight,700)]",
            "leading-[1.2] tracking-[var(--s-heading-tracking,-0.025em)]",
            "text-[var(--s-text)] text-balance",
            "[&_strong]:text-[var(--s-primary)] [&_em]:text-[var(--s-primary)] [&_em]:not-italic",
            align === "center" && "mx-auto max-w-4xl",
          )}>
            {text}
          </p>
        </div>
      </section>
    );
  },
);
