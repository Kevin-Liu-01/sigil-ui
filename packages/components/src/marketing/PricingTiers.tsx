"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface PricingTier {
  icon?: ReactNode;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features?: { label: string; value: string }[];
  cta?: ReactNode;
  highlighted?: boolean;
  badge?: string;
}

export interface PricingTiersProps extends HTMLAttributes<HTMLDivElement> {
  tiers: PricingTier[];
}

export const PricingTiers = forwardRef<HTMLDivElement, PricingTiersProps>(
  function PricingTiers({ tiers, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("grid gap-0", className)}
        style={{
          gridTemplateColumns: `repeat(${tiers.length}, 1fr)`,
          border: "1px solid var(--s-border)",
          borderStyle: "var(--s-border-style, solid)" as any,
          borderRadius: "var(--s-radius-md, 6px)",
          overflow: "hidden",
        }}
        {...rest}
      >
        {tiers.map((tier, i) => (
          <div
            key={tier.name}
            className="flex flex-col"
            style={{
              padding: "var(--s-card-padding, 24px)",
              borderRight: i < tiers.length - 1 ? "1px solid var(--s-border)" : undefined,
              background: tier.highlighted
                ? "var(--s-surface-elevated)"
                : "var(--s-surface)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              {tier.icon && <span style={{ color: "var(--s-text-muted)" }}>{tier.icon}</span>}
              <span className="font-semibold" style={{ color: "var(--s-text)", fontFamily: "var(--s-font-display)" }}>
                {tier.name}
              </span>
              {tier.badge && (
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 font-[family:var(--s-font-mono)]"
                  style={{
                    color: "var(--s-primary)",
                    background: "color-mix(in oklch, var(--s-primary) 10%, transparent)",
                  }}
                >
                  {tier.badge}
                </span>
              )}
            </div>

            <div className="mb-2">
              <span
                className="font-[family:var(--s-font-mono)]"
                style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "var(--s-text)", letterSpacing: "-0.02em" }}
              >
                {tier.price}
              </span>
              {tier.period && (
                <span className="text-sm font-[family:var(--s-font-mono)]" style={{ color: "var(--s-text-muted)" }}>
                  {" "}{tier.period}
                </span>
              )}
            </div>

            {tier.description && (
              <p className="text-sm mb-4" style={{ color: "var(--s-text-secondary)", lineHeight: 1.5 }}>
                {tier.description}
              </p>
            )}

            {tier.features && tier.features.length > 0 && (
              <div
                className="flex flex-col gap-0 my-4 flex-1"
                style={{ borderTop: "1px solid var(--s-border-muted)" }}
              >
                {tier.features.map((f) => (
                  <div
                    key={f.label}
                    className="flex justify-between py-2 text-[13px] font-[family:var(--s-font-mono)]"
                    style={{ borderBottom: "1px solid var(--s-border-muted)" }}
                  >
                    <span style={{ color: "var(--s-text-muted)" }}>{f.label}</span>
                    <span style={{ color: "var(--s-text)", fontWeight: 600 }}>{f.value}</span>
                  </div>
                ))}
              </div>
            )}

            {tier.cta && <div className="mt-auto pt-4">{tier.cta}</div>}
          </div>
        ))}
      </div>
    );
  },
);
