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
          "relative py-[var(--s-hero-padding-y,96px)] overflow-hidden",
          className,
        )}
        style={{ minHeight: "var(--s-hero-min-height, auto)" }}
        {...props}
      >
        <div className={cn(
          "mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-hero-padding-x,var(--s-page-margin,24px))]",
          align === "center" && "text-center",
        )}>
          {badge && (
            <div className={cn("mb-[var(--s-hero-badge-gap,24px)]", align === "center" && "flex justify-center")}>
              {badge}
            </div>
          )}

          <h1 className={cn(
            "font-[family-name:var(--s-font-display)] font-[var(--s-heading-weight,700)]",
            "text-[var(--s-hero-title-size,clamp(2.25rem,6vw,4rem))] leading-[1.05] tracking-[var(--s-heading-tracking,-0.025em)]",
            "text-[var(--s-text)] text-balance",
            align === "center" && "mx-auto max-w-[var(--s-hero-title-max-width,56rem)]",
            align === "left" && "max-w-[var(--s-hero-title-max-width,48rem)]",
          )}>
            {title}
          </h1>

          {description && (
            <p className={cn(
              "mt-[var(--s-hero-description-gap,24px)] text-[length:var(--s-hero-description-size,1.125rem)] leading-relaxed text-[var(--s-text-muted)]",
              align === "center" && "mx-auto max-w-[var(--s-hero-description-max-width,32rem)]",
              align === "left" && "max-w-[var(--s-hero-description-max-width,32rem)]",
            )}>
              {description}
            </p>
          )}

          {actions && actions.length > 0 && (
            <div className={cn("mt-[var(--s-hero-actions-margin-top,32px)] flex gap-[var(--s-hero-actions-gap,12px)] flex-wrap", align === "center" && "justify-center")}>
              {actions.map((action, i) => (
                <a
                  key={i}
                  href={action.href ?? "#"}
                  onClick={action.onClick}
                  className={cn(
                    "inline-flex items-center gap-2 px-[var(--s-hero-action-padding-x,24px)] py-[var(--s-hero-action-padding-y,12px)] text-sm font-medium",
                    "transition-all duration-[var(--s-duration-fast,150ms)]",
                    "rounded-[var(--s-radius-button,0px)]",
                    action.variant === "secondary" || i > 0
                      ? "bg-transparent text-[var(--s-text)] border border-[color:var(--s-border)] hover:bg-[var(--s-surface)]"
                      : "bg-[var(--s-primary)] text-[var(--s-primary-contrast)] hover:brightness-110",
                  )}
                >
                  {action.label}
                </a>
              ))}
            </div>
          )}

          {installCommand && (
            <div className={cn("mt-[var(--s-hero-description-gap,24px)]", align === "center" && "flex justify-center")}>
              <code className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--s-radius-md,0px)] border border-[color:var(--s-border)] bg-[var(--s-surface)] font-[family-name:var(--s-font-mono)] text-sm text-[var(--s-text)]">
                <span className="text-[var(--s-text-muted)]">$</span>
                {installCommand}
              </code>
            </div>
          )}

          {media && (
            <div className="mt-[var(--s-hero-actions-margin-top,32px)]">
              {media}
            </div>
          )}

          {children}
        </div>
      </section>
    );
  },
);
