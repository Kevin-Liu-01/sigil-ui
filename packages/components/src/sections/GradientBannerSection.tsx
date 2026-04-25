"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface GradientBannerSectionProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  text?: string;
  gradient?: string;
  height?: string;
}

export const GradientBannerSection = forwardRef<HTMLElement, GradientBannerSectionProps>(
  function GradientBannerSection({ logo, text, gradient, height = "200px", className, children, ...props }, ref) {
    return (
      <section
        ref={ref}
        data-slot="gradient-banner-section"
        className={cn("relative overflow-hidden flex items-center justify-center", className)}
        style={{
          minHeight: height,
          background: gradient ?? "linear-gradient(135deg, var(--s-primary) 0%, color-mix(in oklch, var(--s-primary) 60%, var(--s-background)) 50%, var(--s-primary) 100%)",
        }}
        {...props}
      >
        <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
          {logo && (
            <div className="[&_svg]:h-10 [&_svg]:w-auto [&_img]:h-10 [&_img]:w-auto">
              {logo}
            </div>
          )}
          {text && (
            <p className="text-sm font-medium text-[var(--s-primary-contrast)] opacity-80">
              {text}
            </p>
          )}
          {children}
        </div>
      </section>
    );
  },
);
