"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { SectionHeading } from "./SectionHeading";

export interface StatItem {
  value: string;
  label: string;
  description?: string;
  trend?: ReactNode;
}

export interface StatsSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  label?: string;
  title?: ReactNode;
  description?: string;
  stats: StatItem[];
  variant?: "inline" | "cards" | "bordered";
}

export const StatsSection = forwardRef<HTMLElement, StatsSectionProps>(
  function StatsSection({ label, title, description, stats, variant = "bordered", className, ...props }, ref) {
    const safeStats = stats ?? [];
    return (
      <section
        ref={ref}
        data-slot="stats-section"
        className={cn("py-[var(--s-section-py,64px)]", className)}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-page-margin,24px)]">
          {title && <SectionHeading label={label} title={title} description={description} align="center" />}

          <div className={cn(
            "grid gap-6",
            safeStats.length <= 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4",
          )}>
            {safeStats.map((stat, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col items-center text-center gap-1 py-6",
                  variant === "cards" && "rounded-[var(--s-radius-card,0px)] border border-[color:var(--s-border-muted)] bg-[var(--s-surface)] px-6",
                  variant === "bordered" && i > 0 && "md:border-l md:border-[color:var(--s-border)]",
                )}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="font-[family-name:var(--s-font-display)] text-3xl font-bold tracking-tight text-[var(--s-text)]">
                    {stat.value}
                  </span>
                  {stat.trend && (
                    <span className="text-xs font-medium text-[var(--s-success)]">{stat.trend}</span>
                  )}
                </div>
                <span className="text-sm font-medium text-[var(--s-text-muted)]">{stat.label}</span>
                {stat.description && (
                  <span className="text-xs text-[var(--s-text-subtle)]">{stat.description}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);
