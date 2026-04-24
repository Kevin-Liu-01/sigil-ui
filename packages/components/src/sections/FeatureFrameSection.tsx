"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { useInView } from "../animation/useInView";
import { useReducedMotion } from "../animation/useReducedMotion";

/* -------------------------------------------------------------------------- */
/*  Feature row                                                               */
/* -------------------------------------------------------------------------- */

export interface FeatureFrameRowProps {
  /** Headline text. */
  headline: string;
  /** Bullet points. */
  points?: string[];
  /** Label badge shown above the headline. */
  label?: string;
  /** Diagram / visual element rendered opposite the copy. */
  diagram?: ReactNode;
  /** If true, diagram renders on the left, copy on the right. @default false */
  reversed?: boolean;
}

function FeatureFrameRow({ headline, points, label, diagram, reversed }: FeatureFrameRowProps) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const visible = reduced || inView;

  const copy = (
    <div className="flex flex-col justify-center border-b border-[var(--s-border,#e4e4e7)] p-6 sm:p-8 lg:p-10 md:border-b-0 md:border-r last:border-r-0">
      {label && (
        <span className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--s-primary,#6366f1)]">
          {label}
        </span>
      )}
      <h3
        className="font-display text-2xl tracking-tight text-[var(--s-text,currentColor)] sm:text-3xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: reduced ? "none" : "opacity var(--s-duration-normal,250ms) var(--s-ease-out,ease-out), transform var(--s-duration-normal,250ms) var(--s-ease-default,cubic-bezier(0.16,1,0.3,1))",
        }}
      >
        {headline}
      </h3>
      {points && points.length > 0 && (
        <ul className="mt-5 space-y-1.5">
          {points.map((p, i) => (
            <li
              key={p}
              className="flex items-baseline gap-2 text-base leading-snug text-[var(--s-text-muted,#71717a)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: reduced
                  ? "none"
                  : `opacity var(--s-duration-fast,150ms) var(--s-ease-out,ease-out) ${150 + i * 60}ms, transform var(--s-duration-fast,150ms) var(--s-ease-out,ease-out) ${150 + i * 60}ms`,
              }}
            >
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--s-primary,#6366f1)]" />
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const visual = (
    <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden p-4 sm:p-8">
      {diagram}
    </div>
  );

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 border-b border-[var(--s-border,#e4e4e7)] last:border-b-0 md:grid-cols-2"
    >
      {reversed ? (
        <>
          <div className="border-b border-[var(--s-border,#e4e4e7)] md:border-b-0 md:border-r">{visual}</div>
          {copy}
        </>
      ) : (
        <>
          {copy}
          {visual}
        </>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  FeatureFrameSection                                                       */
/* -------------------------------------------------------------------------- */

export interface FeatureFrameSectionProps extends HTMLAttributes<HTMLElement> {
  /** Section label above heading. */
  label?: string;
  /** Section heading. */
  heading?: string;
  /** Feature rows. */
  features: FeatureFrameRowProps[];
}

/**
 * Bordered feature frame section inspired by Dedalus' FeatureFrames.
 * Alternating copy|diagram rows inside a single bordered container,
 * with scroll-triggered reveal animations from the Sigil animation suite.
 */
export const FeatureFrameSection = forwardRef<HTMLElement, FeatureFrameSectionProps>(
  function FeatureFrameSection({ label, heading, features, className, ...rest }, ref) {
    const reduced = useReducedMotion();
    const { ref: viewRef, inView } = useInView<HTMLDivElement>();
    const visible = reduced || inView;

    return (
      <section
        ref={ref}
        data-slot="feature-frame-section"
        className={cn("sigil-feature-frame-section relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:py-20", className)}
        {...rest}
      >
        {(label || heading) && (
          <div className="relative mx-auto mb-12 max-w-2xl text-center">
            {label && (
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--s-primary,#6366f1)]">
                {label}
              </span>
            )}
            {heading && (
              <h2 className="mt-4 font-display text-3xl tracking-tight text-[var(--s-text,currentColor)] sm:text-5xl">
                {heading}
              </h2>
            )}
          </div>
        )}

        <div
          ref={viewRef}
          className="border border-[var(--s-border,#e4e4e7)]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(60px)",
            transition: reduced
              ? "none"
              : "opacity var(--s-duration-slow,400ms) var(--s-ease-out,ease-out), transform 800ms var(--s-ease-default,cubic-bezier(0.16,1,0.3,1))",
          }}
        >
          {features.map((feature, i) => (
            <FeatureFrameRow key={feature.headline ?? i} {...feature} />
          ))}
        </div>
      </section>
    );
  },
);
