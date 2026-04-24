"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";
import { useInView } from "../../animation/useInView";
import { useReducedMotion } from "../../animation/useReducedMotion";

export interface PersistenceActiveItem {
  label: string;
  sublabel?: string;
  value: string;
  valueLabel?: string;
  variant?: "success" | "danger" | "muted";
}

export interface PersistedStateRow {
  label: string;
  icon?: ReactNode;
  status?: string;
}

export interface StatePersistenceProps extends HTMLAttributes<HTMLDivElement> {
  /** The primary "active" item (e.g. the product being promoted). */
  activeItem: PersistenceActiveItem;
  /** Competing items shown for comparison. */
  competitors?: PersistenceActiveItem[];
  /** Rows of persisted state. */
  persistedState?: PersistedStateRow[];
  /** Section labels. */
  activeLabel?: string;
  stateLabel?: string;
}

const variantColors = {
  success: { border: "var(--s-success,#22c55e)", bg: "var(--s-success,#22c55e)" },
  danger: { border: "var(--s-error,#ef4444)", bg: "var(--s-error,#ef4444)" },
  muted: { border: "var(--s-border,#e4e4e7)", bg: "var(--s-text-muted,#71717a)" },
} as const;

export const StatePersistence = forwardRef<HTMLDivElement, StatePersistenceProps>(
  function StatePersistence(
    {
      activeItem,
      competitors = [],
      persistedState = [],
      activeLabel = "Status",
      stateLabel = "Preserved state",
      className,
      ...rest
    },
    outerRef,
  ) {
    const reduced = useReducedMotion();
    const { ref: viewRef, inView } = useInView<HTMLDivElement>();
    const visible = reduced || inView;

    const mergedRef = (el: HTMLDivElement | null) => {
      (viewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof outerRef === "function") outerRef(el);
      else if (outerRef) (outerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    };

    const v = variantColors[activeItem.variant ?? "success"];

    return (
      <div
        ref={mergedRef}
        data-slot="state-persistence"
        className={cn("sigil-state-persistence w-full max-w-sm space-y-6", className)}
        {...rest}
      >
        {/* Active section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--s-text-muted,#71717a)]">
              {activeLabel}
            </span>
            <div className="h-px flex-1 bg-[var(--s-border,#e4e4e7)]" />
          </div>

          {/* Primary item */}
          <div
            className="flex items-center gap-3 p-3"
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: `color-mix(in oklch, ${v.border}, transparent 70%)`,
              backgroundColor: `color-mix(in oklch, ${v.bg}, transparent 94%)`,
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.95)",
              transition: reduced
                ? "none"
                : `opacity var(--s-duration-normal,250ms) var(--s-ease-spring,cubic-bezier(0.34,1.56,0.64,1)) 0ms, transform var(--s-duration-normal,250ms) var(--s-ease-spring,cubic-bezier(0.34,1.56,0.64,1)) 0ms`,
            }}
          >
            <div className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
              <div
                className="absolute inset-0 animate-ping rounded-full"
                style={{ backgroundColor: v.border, opacity: 0.35, animationDuration: "var(--s-duration-slow,400ms)" }}
              />
              <div className="relative h-2.5 w-2.5 rounded-full" style={{ backgroundColor: v.border }} />
            </div>
            <div className="flex-1 leading-tight">
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-xs font-semibold text-[var(--s-text,currentColor)]">
                  {activeItem.label}
                </span>
                {activeItem.sublabel && (
                  <span className="font-mono text-[10px] text-[var(--s-text-muted,#71717a)]">
                    · {activeItem.sublabel}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="block font-mono text-sm font-bold tabular-nums" style={{ color: v.border }}>
                {activeItem.value}
              </span>
              {activeItem.valueLabel && (
                <span className="font-mono text-[10px] text-[var(--s-text-muted,#71717a)]">
                  {activeItem.valueLabel}
                </span>
              )}
            </div>
          </div>

          {/* Competitors */}
          {competitors.length > 0 && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {competitors.map((c, i) => {
                const cv = variantColors[c.variant ?? "muted"];
                const cDelay = 150 + i * 60;
                return (
                  <div
                    key={c.label}
                    className="flex items-center gap-2 border border-dashed border-[var(--s-border,#e4e4e7)] bg-[var(--s-bg,#fff)] px-2.5 py-2"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(8px)",
                      transition: reduced
                        ? "none"
                        : `opacity var(--s-duration-normal,250ms) var(--s-ease-out,ease-out) ${cDelay}ms, transform var(--s-duration-normal,250ms) var(--s-ease-out,ease-out) ${cDelay}ms`,
                    }}
                  >
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: cv.bg, opacity: 0.5 }} />
                    <div className="flex-1 leading-tight">
                      <span className="block font-mono text-[10px] text-[var(--s-text-muted,#71717a)]">{c.label}</span>
                      {c.sublabel && (
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-[var(--s-text-muted,#71717a)]/70">{c.sublabel}</span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] font-semibold tabular-nums" style={{ color: cv.border }}>
                      {c.value}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Persisted state rows */}
        {persistedState.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--s-text-muted,#71717a)]">
                {stateLabel}
              </span>
              <div className="h-px flex-1 bg-[var(--s-border,#e4e4e7)]" />
            </div>
            <div className="space-y-px">
              {persistedState.map((row, i) => {
                const rowDelay = (competitors.length * 60 + 300) + i * 60;
                return (
                  <div
                    key={row.label}
                    className="flex items-center gap-3 border border-[var(--s-border,#e4e4e7)] bg-[var(--s-bg,#fff)] px-3.5 py-2.5"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(-6px)",
                      transition: reduced
                        ? "none"
                        : `opacity var(--s-duration-fast,150ms) var(--s-ease-out,ease-out) ${rowDelay}ms, transform var(--s-duration-fast,150ms) var(--s-ease-out,ease-out) ${rowDelay}ms`,
                    }}
                  >
                    {row.icon && <span className="text-[var(--s-primary,#6366f1)]">{row.icon}</span>}
                    <span className="flex-1 font-mono text-xs text-[var(--s-text,currentColor)]">{row.label}</span>
                    {row.status && (
                      <span className="font-mono text-xs font-medium text-[var(--s-primary,#6366f1)]">{row.status}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
);
