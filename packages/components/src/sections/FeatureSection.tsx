"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { SectionHeading } from "./SectionHeading";

export interface FeatureItem {
  icon?: ReactNode;
  title: string;
  description: string;
}

export interface FeatureSectionProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  align?: "left" | "center";
}

const colMap = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" };

export const FeatureSection = forwardRef<HTMLElement, FeatureSectionProps>(
  function FeatureSection({ label, title, description, features, columns = 3, align = "left", className, ...props }, ref) {
    return (
      <section
        ref={ref}
        data-slot="feature-section"
        className={cn(
          "border-t border-[var(--s-border)] py-[var(--s-section-py,64px)]",
          className,
        )}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-page-margin,24px)]">
          <SectionHeading label={label} title={title} description={description} align={align} />

          <div className={cn("grid grid-cols-1 gap-6", colMap[columns])}>
            {features.map((feature, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col gap-3 p-6",
                  "rounded-[var(--s-radius-card,0px)]",
                  "border border-[var(--s-border-muted)] bg-[var(--s-surface)]",
                  "transition-colors duration-[var(--s-duration-fast,150ms)]",
                  "hover:border-[var(--s-border)]",
                )}
              >
                {feature.icon && (
                  <div className="flex items-center justify-center w-10 h-10 rounded-[var(--s-radius-md,0px)] bg-[var(--s-primary-muted)] text-[var(--s-primary)] [&_svg]:size-5">
                    {feature.icon}
                  </div>
                )}
                <h3 className="text-base font-semibold text-[var(--s-text)]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--s-text-muted)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);
