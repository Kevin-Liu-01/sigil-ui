"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";
import { useInView } from "../../animation/useInView";
import { useReducedMotion } from "../../animation/useReducedMotion";

export interface IsolationLayer {
  label: string;
  /** Width percentage of the container. Outer layers are wider. */
  width?: string;
  accent?: boolean;
}

export interface ComparisonColumn {
  key: string;
  label: string;
  accent?: boolean;
}

export interface ComparisonRow {
  label: string;
  values: Record<string, "full" | "partial" | "none">;
}

export interface IsolationStackProps extends HTMLAttributes<HTMLDivElement> {
  /** Stacked isolation layers (outer to inner). */
  layers: IsolationLayer[];
  /** Comparison matrix columns. */
  columns?: ComparisonColumn[];
  /** Comparison matrix rows. */
  rows?: ComparisonRow[];
}

function StatusIcon({ status }: { status: "full" | "partial" | "none" }) {
  if (status === "full") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 8l3 3 5-5" stroke="var(--s-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "partial") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 8h8" stroke="var(--s-warning)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M5 5l6 6M11 5l-6 6" stroke="var(--s-error)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export const IsolationStack = forwardRef<HTMLDivElement, IsolationStackProps>(
  function IsolationStack({ layers, columns, rows, className, ...rest }, outerRef) {
    const reduced = useReducedMotion();
    const { ref: viewRef, inView } = useInView<HTMLDivElement>();
    const visible = reduced || inView;

    const mergedRef = (el: HTMLDivElement | null) => {
      (viewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof outerRef === "function") outerRef(el);
      else if (outerRef) (outerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    };

    return (
      <div
        ref={mergedRef}
        data-slot="isolation-stack"
        className={cn("sigil-isolation-stack w-full max-w-md space-y-5", className)}
        {...rest}
      >
        {/* Layer stack */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--s-text-muted)]">
              Isolation model
            </span>
            <div className="h-px flex-1 bg-[var(--s-border)]" />
          </div>
          <div className="flex flex-col items-center gap-1.5 py-3">
            {layers.map((layer, i) => {
              const layerDelay = i * 80;
              return (
                <div
                  key={layer.label}
                  className={cn(
                    "flex items-center justify-center px-4 py-2",
                    layer.accent
                      ? "border border-[var(--s-primary)] bg-[var(--s-primary)]/[0.08]"
                      : "border border-[var(--s-border)] bg-[var(--s-surface)]",
                  )}
                  style={{
                    width: layer.width ?? "100%",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "scaleX(1)" : "scaleX(0.4)",
                    transformOrigin: "center center",
                    transition: reduced
                      ? "none"
                      : `opacity var(--s-duration-normal,250ms) var(--s-ease-out,ease-out) ${layerDelay}ms, transform var(--s-duration-slow,400ms) var(--s-ease-out,ease-out) ${layerDelay}ms`,
                  }}
                >
                  <span
                    className={cn(
                      "font-mono text-xs font-semibold tracking-wider",
                      layer.accent
                        ? "text-[var(--s-primary)]"
                        : "text-[var(--s-text,currentColor)]",
                    )}
                  >
                    {layer.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison matrix */}
        {columns && rows && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--s-text-muted)]">
                Comparison
              </span>
              <div className="h-px flex-1 bg-[var(--s-border)]" />
            </div>
            <div className="overflow-hidden border border-[var(--s-border)]">
              {/* Header */}
              <div
                className="grid gap-px bg-[var(--s-border)]"
                style={{ gridTemplateColumns: `1fr ${columns.map(() => "64px").join(" ")}` }}
              >
                <div className="bg-[var(--s-surface)] px-3 py-2" />
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className={cn(
                      "bg-[var(--s-surface)] px-1 py-2 text-center font-mono text-[10px] uppercase tracking-wider",
                      col.accent
                        ? "font-semibold text-[var(--s-primary)]"
                        : "text-[var(--s-text-muted)]",
                    )}
                  >
                    {col.label}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {rows.map((row, ri) => {
                const rowDelay = layers.length * 80 + 100 + ri * 50;
                return (
                  <div
                    key={row.label}
                    className="grid gap-px bg-[var(--s-border)]"
                    style={{
                      gridTemplateColumns: `1fr ${columns.map(() => "64px").join(" ")}`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(-6px)",
                      transition: reduced
                        ? "none"
                        : `opacity var(--s-duration-fast,150ms) var(--s-ease-out,ease-out) ${rowDelay}ms, transform var(--s-duration-fast,150ms) var(--s-ease-out,ease-out) ${rowDelay}ms`,
                    }}
                  >
                    <div className="bg-[var(--s-background)] px-3 py-2 font-mono text-[11px] text-[var(--s-text,currentColor)]">
                      {row.label}
                    </div>
                    {columns.map((col) => (
                      <div key={col.key} className="flex items-center justify-center bg-[var(--s-background)]">
                        <StatusIcon status={row.values[col.key] ?? "none"} />
                      </div>
                    ))}
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
