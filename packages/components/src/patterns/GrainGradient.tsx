"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export type GrainTint = "accent" | "warm" | "neutral" | "none";
export type GrainIntensity = "subtle" | "medium" | "strong";

export interface GrainGradientProps extends HTMLAttributes<HTMLDivElement> {
  /** Tint color of the grain overlay. @default "accent" */
  tint?: GrainTint;
  /** Noise intensity. @default "medium" */
  intensity?: GrainIntensity;
}

const TINT_STYLES: Record<GrainTint, React.CSSProperties | undefined> = {
  accent: {
    backgroundImage:
      "radial-gradient(ellipse at 30% 50%, oklch(from var(--s-primary) l c h / 0.12) 0%, transparent 70%)",
  },
  warm: {
    backgroundImage:
      "radial-gradient(ellipse at 50% 40%, oklch(0.7 0.1 60 / 0.10) 0%, transparent 70%)",
  },
  neutral: {
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, oklch(from var(--s-text) l c h / 0.05) 0%, transparent 70%)",
  },
  none: undefined,
};

const NOISE_OPACITY: Record<GrainIntensity, number> = {
  subtle: 0.03,
  medium: 0.06,
  strong: 0.12,
};

/**
 * Absolutely-positioned grain + tinted gradient overlay.
 *
 * Drop inside any `relative overflow-hidden` container and keep
 * content at `z-10` so it stays above the effect layer.
 *
 * @example
 * <div className="relative overflow-hidden">
 *   <GrainGradient tint="accent" intensity="medium" />
 *   <div className="relative z-10">...content...</div>
 * </div>
 */
export const GrainGradient = forwardRef<HTMLDivElement, GrainGradientProps>(
  function GrainGradient(
    { tint = "accent", intensity = "medium", className, style, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        aria-hidden
        data-slot="grain-gradient"
        className={cn("pointer-events-none absolute inset-0", className)}
        style={{
          ...TINT_STYLES[tint],
          ...style,
        }}
        {...rest}
      >
        <svg className="absolute inset-0 h-full w-full" aria-hidden>
          <filter id="sigil-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#sigil-grain)"
            style={{ opacity: NOISE_OPACITY[intensity] }}
          />
        </svg>
      </div>
    );
  },
);
