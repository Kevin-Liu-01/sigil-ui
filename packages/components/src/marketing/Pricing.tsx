"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface PricingProps extends HTMLAttributes<HTMLDivElement> {
  /** Plan name. */
  name: string;
  /** Price display (e.g. "$19"). */
  price: string;
  /** Billing period (e.g. "/mo"). */
  period?: string;
  /** Feature list. */
  features?: string[];
  /** CTA button content. */
  cta?: ReactNode;
  /** Highlight this card as recommended. */
  highlighted?: boolean;
}

/** Pricing card with plan details and features. */
export const Pricing = forwardRef<HTMLDivElement, PricingProps>(function Pricing(
  { name, price, period, features, cta, highlighted = false, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col rounded-[var(--s-card-radius,8px)] border p-6",
        "bg-[var(--s-surface)]",
        highlighted
          ? "border-[var(--s-primary)] shadow-[var(--s-shadow-lg)] ring-1 ring-[var(--s-primary)]"
          : "border-[var(--s-border)]",
        className,
      )}
      {...rest}
    >
      <h3 className="text-sm font-semibold text-[var(--s-text-muted)] uppercase tracking-wider">
        {name}
      </h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-[var(--s-text)] tracking-tight">{price}</span>
        {period && <span className="text-sm text-[var(--s-text-muted)]">{period}</span>}
      </div>
      {features && features.length > 0 && (
        <ul className="mt-6 flex flex-col gap-3 flex-1">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-[var(--s-text)]">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0 text-[var(--s-success)]"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8l3.5 3.5L13 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  );
});
