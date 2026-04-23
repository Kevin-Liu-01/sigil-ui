"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface PricingUnit {
  icon?: ReactNode;
  category: string;
  price: string;
  unit: string;
  footnote?: string;
  badge?: string;
}

export interface UnitPricingProps extends HTMLAttributes<HTMLDivElement> {
  units: PricingUnit[];
  toggle?: ReactNode;
}

export const UnitPricing = forwardRef<HTMLDivElement, UnitPricingProps>(
  function UnitPricing({ units, toggle, className, ...rest }, ref) {
    return (
      <div ref={ref} className={cn("flex flex-col gap-4", className)} {...rest}>
        {toggle && <div className="flex justify-center">{toggle}</div>}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0"
          style={{
            border: "1px solid var(--s-border)",
            borderStyle: "var(--s-border-style, solid)" as any,
            borderRadius: "var(--s-radius-md, 6px)",
            overflow: "hidden",
          }}
        >
          {units.map((u, i) => (
            <div
              key={u.category}
              className="flex flex-col"
              style={{
                padding: "var(--s-card-padding, 24px)",
                borderRight: i < units.length - 1 ? "1px solid var(--s-border)" : undefined,
                background: "var(--s-surface)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                {u.icon && <span style={{ color: "var(--s-text-muted)", opacity: 0.8 }}>{u.icon}</span>}
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider font-[family:var(--s-font-mono)]"
                  style={{ color: "var(--s-text-muted)" }}
                >
                  {u.category}
                </span>
                {u.badge && (
                  <span
                    className="ml-auto text-[10px] font-[family:var(--s-font-mono)] uppercase tracking-wider"
                    style={{ color: "var(--s-text-subtle)" }}
                  >
                    {u.badge}
                  </span>
                )}
              </div>

              <div
                className="font-[family:var(--s-font-mono)] mb-1"
                style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, color: "var(--s-text)", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}
              >
                {u.price}
              </div>
              <div className="text-[13px] font-[family:var(--s-font-mono)]" style={{ color: "var(--s-text-muted)" }}>
                {u.unit}
              </div>

              {u.footnote && (
                <p className="text-[12px] mt-3 pt-3" style={{ color: "var(--s-text-subtle)", borderTop: "1px solid var(--s-border-muted)" }}>
                  {u.footnote}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
);
