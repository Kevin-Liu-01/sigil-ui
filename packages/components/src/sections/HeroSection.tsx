"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface HeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export interface HeroSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  badge?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: HeroAction[];
  installCommand?: string;
  media?: ReactNode;
  align?: "left" | "center";
}

export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  function HeroSection({ badge, title, description, actions, installCommand, media, align = "center", className, children, ...props }, ref) {
    return (
      <section
        ref={ref}
        data-slot="hero-section"
        className={cn(
          "relative py-[var(--s-section-py-lg,96px)] overflow-hidden",
          className,
        )}
        {...props}
      >
        <div className={cn(
          "mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-page-margin,24px)]",
          align === "center" && "text-center",
        )}>
          {badge && (
            <div className={cn("mb-6", align === "center" && "flex justify-center")}>
              {badge}
            </div>
          )}

          <h1 className={cn(
            "font-[family-name:var(--s-font-display)] font-[var(--s-heading-weight,700)]",
            "text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] tracking-[var(--s-heading-tracking,-0.025em)]",
            "text-[var(--s-text)] text-balance",
            align === "center" && "mx-auto max-w-4xl",
            align === "left" && "max-w-3xl",
          )}>
            {title}
          </h1>

          {description && (
            <p className={cn(
              "mt-6 text-lg leading-relaxed text-[var(--s-text-muted)]",
              align === "center" && "mx-auto max-w-2xl",
              align === "left" && "max-w-xl",
            )}>
              {description}
            </p>
          )}

          {actions && actions.length > 0 && (
            <div className={cn("mt-8 flex gap-3 flex-wrap", align === "center" && "justify-center")}>
              {actions.map((action, i) => (
                <a
                  key={i}
                  href={action.href ?? "#"}
                  onClick={action.onClick}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium",
                    "transition-all duration-[var(--s-duration-fast,150ms)]",
                    "rounded-[var(--s-radius-button,0px)]",
                    action.variant === "secondary" || i > 0
                      ? "bg-transparent text-[var(--s-text)] border border-[var(--s-border)] hover:bg-[var(--s-surface)]"
                      : "bg-[var(--s-primary)] text-[var(--s-primary-contrast,#fff)] hover:brightness-110",
                  )}
                >
                  {action.label}
                </a>
              ))}
            </div>
          )}

          {installCommand && (
            <div className={cn("mt-6", align === "center" && "flex justify-center")}>
              <code className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--s-radius-md,0px)] border border-[var(--s-border)] bg-[var(--s-surface)] font-[family-name:var(--s-font-mono)] text-sm text-[var(--s-text)]">
                <span className="text-[var(--s-text-muted)]">$</span>
                {installCommand}
              </code>
            </div>
          )}

          {media && (
            <div className="mt-12">
              {media}
            </div>
          )}

          {children}
        </div>
      </section>
    );
  },
);
