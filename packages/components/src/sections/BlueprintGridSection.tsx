"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { useInView } from "../animation/useInView";
import { useReducedMotion } from "../animation/useReducedMotion";

/* -------------------------------------------------------------------------- */
/*  Spec row                                                                  */
/* -------------------------------------------------------------------------- */

export interface BlueprintSpecRow {
  label: string;
  value: string;
}

/* -------------------------------------------------------------------------- */
/*  Blueprint card                                                            */
/* -------------------------------------------------------------------------- */

export interface BlueprintCardData {
  /** Section label (e.g. "SECTION 01"). Defaults to index-based. */
  sectionLabel?: string;
  title: string;
  subtitle?: string;
  /** Diagram / SVG / illustration rendered at the top of the card. */
  diagram?: ReactNode;
  /** Specification rows (label/value table). */
  specRows?: BlueprintSpecRow[];
  /** Callout badge strings. */
  callouts?: string[];
}

interface BlueprintCardProps {
  data: BlueprintCardData;
  index: number;
}

function BlueprintCard({ data, index }: BlueprintCardProps) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const visible = reduced || inView;
  const delay = index * 100;

  const label = data.sectionLabel ?? `SECTION ${String(index + 1).padStart(2, "0")}`;

  return (
    <div
      ref={ref}
      className={cn(
        "group relative border border-[var(--s-border)] bg-[var(--s-surface)] p-5",
        "transition-colors duration-[var(--s-duration-fast,150ms)] hover:border-[var(--s-primary)]/30",
      )}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: reduced
          ? "none"
          : `opacity 700ms var(--s-ease-out,ease-out) ${delay}ms, transform 700ms var(--s-ease-default,cubic-bezier(0.16,1,0.3,1)) ${delay}ms, border-color var(--s-duration-fast,150ms) ease`,
      }}
    >
      {/* Floating section label */}
      <div className="absolute -top-3 left-4 bg-[var(--s-background)] px-2 font-mono text-[9px] tracking-wider text-[var(--s-text-muted)]">
        {label}
      </div>

      {/* Diagram viewport */}
      {data.diagram && (
        <div className="mb-4 border border-[var(--s-border)]/50 bg-[var(--s-background)] p-3">
          {data.diagram}
        </div>
      )}

      <h3 className="font-display text-base font-bold text-[var(--s-text,currentColor)]">
        {data.title}
      </h3>
      {data.subtitle && (
        <p className="mt-1 text-[11px] text-[var(--s-text-muted)]">
          {data.subtitle}
        </p>
      )}

      {/* Spec table */}
      {data.specRows && data.specRows.length > 0 && (
        <div className="mt-4 border-t border-[var(--s-border)]/50">
          {data.specRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between border-b border-[var(--s-border)]/30 px-2 py-1.5"
            >
              <span className="font-mono text-[10px] tracking-wider text-[var(--s-text-muted)]">
                {row.label}
              </span>
              <span className="font-mono text-[10px] tabular-nums text-[var(--s-primary)]">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Callout chips */}
      {data.callouts && data.callouts.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {data.callouts.map((text) => (
            <span
              key={text}
              className="inline-flex items-center gap-1 border border-[var(--s-primary)]/15 bg-[var(--s-primary)]/[0.06] px-2 py-0.5 font-mono text-[9px] text-[var(--s-primary)]"
            >
              <span aria-hidden className="text-[8px]">&#x25C6;</span>
              {text}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  BlueprintGridSection                                                      */
/* -------------------------------------------------------------------------- */

export interface BlueprintGridSectionProps extends HTMLAttributes<HTMLElement> {
  /** Section label. */
  label?: string;
  /** Section heading. */
  heading?: string;
  /** Cards to render in a 2-column staggered grid. */
  cards: BlueprintCardData[];
}

/**
 * Blueprint-style 2-column feature grid inspired by Dedalus' BlueprintFeatures.
 * Each card scroll-reveals with staggered delay; contains a diagram viewport,
 * spec table, and callout chips.
 */
export const BlueprintGridSection = forwardRef<HTMLElement, BlueprintGridSectionProps>(
  function BlueprintGridSection({ label, heading, cards, className, ...rest }, ref) {
    const reduced = useReducedMotion();
    const { ref: viewRef, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });
    const visible = reduced || inView;

    return (
      <section
        ref={ref}
        data-slot="blueprint-grid-section"
        className={cn("sigil-blueprint-grid-section px-6 py-24 sm:py-32", className)}
        {...rest}
      >
        <div className="mx-auto max-w-5xl">
          {(label || heading) && (
            <div
              ref={viewRef}
              className="mb-16 text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: reduced
                  ? "none"
                  : "opacity 700ms var(--s-ease-out,ease-out), transform 700ms var(--s-ease-default,cubic-bezier(0.16,1,0.3,1))",
              }}
            >
              {label && (
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--s-primary)]">
                  {label}
                </span>
              )}
              {heading && (
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--s-text,currentColor)] sm:text-4xl">
                  {heading}
                </h2>
              )}
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-2">
            {cards.map((card, i) => (
              <BlueprintCard key={card.title ?? i} data={card} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  },
);
