"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface CTAAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export interface CTASectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  actions?: CTAAction[];
  variant?: "centered" | "split";
  media?: ReactNode;
}

export const CTASection = forwardRef<HTMLElement, CTASectionProps>(
  function CTASection({ title, description, actions, variant = "centered", media, className, children, ...props }, ref) {
    return (
      <section
        ref={ref}
        data-slot="cta-section"
        className={cn(
          "border-t border-[var(--s-border)] py-[var(--s-section-py-lg,96px)]",
          className,
        )}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-page-margin,24px)]">
          {variant === "centered" ? (
            <div className="text-center">
              <h2 className="font-[family-name:var(--s-font-display)] text-[clamp(2rem,5vw,3rem)] font-[var(--s-heading-weight,700)] leading-[1.1] tracking-[var(--s-heading-tracking,-0.025em)] text-[var(--s-text)]">
                {title}
              </h2>
              {description && (
                <p className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-[var(--s-text-muted)]">
                  {description}
                </p>
              )}
              {actions && actions.length > 0 && (
                <div className="mt-8 flex gap-3 justify-center flex-wrap">
                  {actions.map((action, i) => (
                    <a
                      key={i}
                      href={action.href ?? "#"}
                      onClick={action.onClick}
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-[var(--s-radius-button,0px)]",
                        "transition-all duration-[var(--s-duration-fast,150ms)]",
                        action.variant === "secondary" || i > 0
                          ? "bg-transparent text-[var(--s-text)] border border-[var(--s-border)] hover:bg-[var(--s-surface)]"
                          : "bg-[var(--s-primary)] text-[var(--s-primary-contrast)] hover:brightness-110",
                      )}
                    >
                      {action.label}
                    </a>
                  ))}
                </div>
              )}
              {children}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-[family-name:var(--s-font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-[var(--s-heading-weight,700)] leading-[1.1] tracking-[var(--s-heading-tracking,-0.025em)] text-[var(--s-text)]">
                  {title}
                </h2>
                {description && (
                  <p className="mt-4 text-base leading-relaxed text-[var(--s-text-muted)]">
                    {description}
                  </p>
                )}
                {actions && actions.length > 0 && (
                  <div className="mt-8 flex gap-3 flex-wrap">
                    {actions.map((action, i) => (
                      <a
                        key={i}
                        href={action.href ?? "#"}
                        onClick={action.onClick}
                        className={cn(
                          "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-[var(--s-radius-button,0px)]",
                          "transition-all duration-[var(--s-duration-fast,150ms)]",
                          action.variant === "secondary" || i > 0
                            ? "bg-transparent text-[var(--s-text)] border border-[var(--s-border)] hover:bg-[var(--s-surface)]"
                            : "bg-[var(--s-primary)] text-[var(--s-primary-contrast)] hover:brightness-110",
                        )}
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div>
                {media ?? children}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  },
);
