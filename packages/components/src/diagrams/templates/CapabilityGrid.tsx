"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";
import { useInView } from "../../animation/useInView";
import { useReducedMotion } from "../../animation/useReducedMotion";

export interface CapabilityItem {
  name: string;
  color?: string;
}

export interface CapabilityCategory {
  label: string;
  items: CapabilityItem[];
}

export interface CapabilityCallout {
  label: string;
  items: string[];
  variant?: "danger" | "warning" | "info";
}

export interface CapabilityGridProps extends HTMLAttributes<HTMLDivElement> {
  categories: CapabilityCategory[];
  callout?: CapabilityCallout;
}

const calloutColors = {
  danger: {
    border: "var(--s-error,#ef4444)",
    bg: "var(--s-error,#ef4444)",
    text: "var(--s-error,#ef4444)",
  },
  warning: {
    border: "var(--s-warning,#f59e0b)",
    bg: "var(--s-warning,#f59e0b)",
    text: "var(--s-warning,#f59e0b)",
  },
  info: {
    border: "var(--s-info,#3b82f6)",
    bg: "var(--s-info,#3b82f6)",
    text: "var(--s-info,#3b82f6)",
  },
} as const;

export const CapabilityGrid = forwardRef<HTMLDivElement, CapabilityGridProps>(
  function CapabilityGrid({ categories, callout, className, ...rest }, outerRef) {
    const reduced = useReducedMotion();
    const { ref: viewRef, inView } = useInView<HTMLDivElement>();
    const visible = reduced || inView;

    const mergedRef = (el: HTMLDivElement | null) => {
      (viewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof outerRef === "function") outerRef(el);
      else if (outerRef) (outerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    };

    const colors = callout ? calloutColors[callout.variant ?? "danger"] : calloutColors.danger;

    return (
      <div
        ref={mergedRef}
        data-slot="capability-grid"
        className={cn("sigil-capability-grid w-full max-w-md space-y-4", className)}
        {...rest}
      >
        {categories.map((cat, ci) => {
          const catDelay = ci * 100;
          return (
            <div
              key={cat.label}
              className="space-y-2"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: reduced
                  ? "none"
                  : `opacity var(--s-duration-normal,250ms) var(--s-ease-out,ease-out) ${catDelay}ms, transform var(--s-duration-normal,250ms) var(--s-ease-out,ease-out) ${catDelay}ms`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--s-text-muted,#71717a)]">
                  {cat.label}
                </span>
                <div className="h-px flex-1 bg-[var(--s-border,#e4e4e7)]" />
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, ii) => {
                  const chipDelay = catDelay + 50 + ii * 40;
                  return (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 border border-[var(--s-border,#e4e4e7)] bg-[var(--s-surface,#fafafa)] px-2.5 py-1.5 transition-colors duration-[var(--s-duration-fast,150ms)] hover:bg-[var(--s-surface-elevated,#f4f4f5)]"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(6px)",
                        transition: reduced
                          ? "none"
                          : `opacity var(--s-duration-fast,150ms) var(--s-ease-out,ease-out) ${chipDelay}ms, transform var(--s-duration-fast,150ms) var(--s-ease-out,ease-out) ${chipDelay}ms, background-color var(--s-duration-fast,150ms) ease`,
                      }}
                    >
                      <span
                        className="inline-block h-2 w-2 rounded-[1px]"
                        style={{ backgroundColor: item.color ?? "var(--s-primary,#6366f1)", opacity: 0.8 }}
                      />
                      <span className="font-mono text-xs font-medium text-[var(--s-text,currentColor)]">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {callout && (
          <div
            className="space-y-2 p-3"
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: `color-mix(in oklch, ${colors.border}, transparent 85%)`,
              backgroundColor: `color-mix(in oklch, ${colors.bg}, transparent 94%)`,
              opacity: visible ? 1 : 0,
              transition: reduced
                ? "none"
                : `opacity var(--s-duration-normal,250ms) var(--s-ease-out,ease-out) ${categories.length * 100 + 100}ms`,
            }}
          >
            <span
              className="font-mono text-[11px] uppercase tracking-widest"
              style={{ color: colors.text }}
            >
              {callout.label}
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {callout.items.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--s-text-muted,#71717a)]"
                >
                  <span style={{ color: colors.text, opacity: 0.5 }}>x</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);
