"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface LogoCloudItem {
  name: string;
  logo: ReactNode;
}

export interface LogoCloudSectionProps extends HTMLAttributes<HTMLElement> {
  heading?: string;
  logos: LogoCloudItem[];
}

export const LogoCloudSection = forwardRef<HTMLElement, LogoCloudSectionProps>(
  function LogoCloudSection({ heading = "Trusted by teams at", logos, className, ...props }, ref) {
    return (
      <section
        ref={ref}
        data-slot="logo-cloud-section"
        className={cn("py-12", className)}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-page-margin,24px)]">
          {heading && (
            <p className="text-center text-xs font-medium uppercase tracking-[0.1em] text-[var(--s-text-subtle)] mb-8">
              {heading}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="flex items-center opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-[var(--s-duration-normal,200ms)] [&_svg]:h-6 [&_svg]:w-auto [&_img]:h-6 [&_img]:w-auto"
                title={logo.name}
              >
                {logo.logo}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);
