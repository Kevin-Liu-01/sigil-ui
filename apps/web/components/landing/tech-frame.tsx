"use client";

import { forwardRef, type ReactNode, type CSSProperties } from "react";

export type FrameVariant = "overshoot" | "brackets" | "crosshair" | "ticks" | "dimension";

export interface TechFrameProps {
  children: ReactNode;
  /** Frame style. @default "overshoot" */
  variant?: FrameVariant;
  /** How far lines extend past corners (px). @default 12 */
  extend?: number;
  /** Stroke width. @default 1 */
  strokeWidth?: number;
  /** Stroke color (CSS). @default "var(--s-border)" */
  stroke?: string;
  /** Opacity of frame lines. @default 0.5 */
  opacity?: number;
  /** Padding inside the frame. @default 0 */
  padding?: number | string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Technical drawing frame that wraps any element with decorative
 * structural lines. Multiple variants available — all evoke
 * engineering diagrams and registration marks.
 */
export const TechFrame = forwardRef<HTMLDivElement, TechFrameProps>(
  function TechFrame(
    {
      children,
      variant = "overshoot",
      extend = 12,
      strokeWidth = 1,
      stroke = "var(--s-border)",
      opacity = 0.5,
      padding = 0,
      className,
      style,
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={className}
        style={{ position: "relative", padding, ...style }}
      >
        <FrameOverlay
          variant={variant}
          extend={extend}
          strokeWidth={strokeWidth}
          stroke={stroke}
          opacity={opacity}
        />
        {children}
      </div>
    );
  },
);

function FrameOverlay({
  variant,
  extend,
  strokeWidth: sw,
  stroke,
  opacity,
}: {
  variant: FrameVariant;
  extend: number;
  strokeWidth: number;
  stroke: string;
  opacity: number;
}) {
  const common: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    overflow: "visible",
    zIndex: 1,
  };

  return (
    <svg
      style={common}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <FrameLines
        variant={variant}
        extend={extend}
        sw={sw}
        stroke={stroke}
        opacity={opacity}
      />
    </svg>
  );
}

function FrameLines({
  variant,
  extend: e,
  sw,
  stroke,
  opacity,
}: {
  variant: FrameVariant;
  extend: number;
  sw: number;
  stroke: string;
  opacity: number;
}) {
  const lineProps = { stroke, strokeWidth: sw, opacity, vectorEffect: "non-scaling-stroke" as const };

  switch (variant) {
    case "overshoot":
      return (
        <g>
          {/* Top edge — overshoots left and right */}
          <line x1={`${-e}`} y1="0" x2={`calc(100% + ${e}px)`} y2="0" {...lineProps} />
          {/* Bottom edge */}
          <line x1={`${-e}`} y1="100%" x2={`calc(100% + ${e}px)`} y2="100%" {...lineProps} />
          {/* Left edge — overshoots top and bottom */}
          <line x1="0" y1={`${-e}`} x2="0" y2={`calc(100% + ${e}px)`} {...lineProps} />
          {/* Right edge */}
          <line x1="100%" y1={`${-e}`} x2="100%" y2={`calc(100% + ${e}px)`} {...lineProps} />
        </g>
      );

    case "brackets": {
      const arm = Math.max(e * 2, 20);
      return (
        <g>
          {/* Top-left bracket */}
          <line x1={`${-e}`} y1="0" x2={`${arm}`} y2="0" {...lineProps} />
          <line x1="0" y1={`${-e}`} x2="0" y2={`${arm}`} {...lineProps} />
          {/* Top-right bracket */}
          <line x1={`calc(100% - ${arm}px)`} y1="0" x2={`calc(100% + ${e}px)`} y2="0" {...lineProps} />
          <line x1="100%" y1={`${-e}`} x2="100%" y2={`${arm}`} {...lineProps} />
          {/* Bottom-left bracket */}
          <line x1={`${-e}`} y1="100%" x2={`${arm}`} y2="100%" {...lineProps} />
          <line x1="0" y1={`calc(100% - ${arm}px)`} x2="0" y2={`calc(100% + ${e}px)`} {...lineProps} />
          {/* Bottom-right bracket */}
          <line x1={`calc(100% - ${arm}px)`} y1="100%" x2={`calc(100% + ${e}px)`} y2="100%" {...lineProps} />
          <line x1="100%" y1={`calc(100% - ${arm}px)`} x2="100%" y2={`calc(100% + ${e}px)`} {...lineProps} />
        </g>
      );
    }

    case "crosshair": {
      const arm = e;
      return (
        <g>
          {/* Top-left + */}
          <line x1={`${-arm}`} y1="0" x2={`${arm}`} y2="0" {...lineProps} />
          <line x1="0" y1={`${-arm}`} x2="0" y2={`${arm}`} {...lineProps} />
          {/* Top-right + */}
          <line x1={`calc(100% - ${arm}px)`} y1="0" x2={`calc(100% + ${arm}px)`} y2="0" {...lineProps} />
          <line x1="100%" y1={`${-arm}`} x2="100%" y2={`${arm}`} {...lineProps} />
          {/* Bottom-left + */}
          <line x1={`${-arm}`} y1="100%" x2={`${arm}`} y2="100%" {...lineProps} />
          <line x1="0" y1={`calc(100% - ${arm}px)`} x2="0" y2={`calc(100% + ${arm}px)`} {...lineProps} />
          {/* Bottom-right + */}
          <line x1={`calc(100% - ${arm}px)`} y1="100%" x2={`calc(100% + ${arm}px)`} y2="100%" {...lineProps} />
          <line x1="100%" y1={`calc(100% - ${arm}px)`} x2="100%" y2={`calc(100% + ${arm}px)`} {...lineProps} />
        </g>
      );
    }

    case "ticks": {
      const tick = Math.max(e * 0.6, 5);
      return (
        <g>
          {/* Full border */}
          <line x1="0" y1="0" x2="100%" y2="0" {...lineProps} />
          <line x1="0" y1="100%" x2="100%" y2="100%" {...lineProps} />
          <line x1="0" y1="0" x2="0" y2="100%" {...lineProps} />
          <line x1="100%" y1="0" x2="100%" y2="100%" {...lineProps} />
          {/* Corner ticks — perpendicular stubs extending outward */}
          {/* TL */}
          <line x1={`${-tick}`} y1="0" x2="0" y2="0" {...lineProps} />
          <line x1="0" y1={`${-tick}`} x2="0" y2="0" {...lineProps} />
          {/* TR */}
          <line x1="100%" y1="0" x2={`calc(100% + ${tick}px)`} y2="0" {...lineProps} />
          <line x1="100%" y1={`${-tick}`} x2="100%" y2="0" {...lineProps} />
          {/* BL */}
          <line x1={`${-tick}`} y1="100%" x2="0" y2="100%" {...lineProps} />
          <line x1="0" y1="100%" x2="0" y2={`calc(100% + ${tick}px)`} {...lineProps} />
          {/* BR */}
          <line x1="100%" y1="100%" x2={`calc(100% + ${tick}px)`} y2="100%" {...lineProps} />
          <line x1="100%" y1="100%" x2="100%" y2={`calc(100% + ${tick}px)`} {...lineProps} />
          {/* Midpoint ticks on each edge */}
          <line x1="50%" y1={`${-tick}`} x2="50%" y2="0" {...lineProps} opacity={opacity * 0.6} />
          <line x1="50%" y1="100%" x2="50%" y2={`calc(100% + ${tick}px)`} {...lineProps} opacity={opacity * 0.6} />
          <line x1={`${-tick}`} y1="50%" x2="0" y2="50%" {...lineProps} opacity={opacity * 0.6} />
          <line x1="100%" y1="50%" x2={`calc(100% + ${tick}px)`} y2="50%" {...lineProps} opacity={opacity * 0.6} />
        </g>
      );
    }

    case "dimension": {
      const tick = Math.max(e * 0.5, 4);
      return (
        <g>
          {/* Top edge with end ticks */}
          <line x1="0" y1="0" x2="100%" y2="0" {...lineProps} />
          <line x1="0" y1={`${-tick}`} x2="0" y2={`${tick}`} {...lineProps} />
          <line x1="100%" y1={`${-tick}`} x2="100%" y2={`${tick}`} {...lineProps} />
          {/* Bottom edge with end ticks */}
          <line x1="0" y1="100%" x2="100%" y2="100%" {...lineProps} />
          <line x1="0" y1={`calc(100% - ${tick}px)`} x2="0" y2={`calc(100% + ${tick}px)`} {...lineProps} />
          <line x1="100%" y1={`calc(100% - ${tick}px)`} x2="100%" y2={`calc(100% + ${tick}px)`} {...lineProps} />
          {/* Left edge with end ticks */}
          <line x1="0" y1="0" x2="0" y2="100%" {...lineProps} />
          <line x1={`${-tick}`} y1="0" x2={`${tick}`} y2="0" {...lineProps} />
          <line x1={`${-tick}`} y1="100%" x2={`${tick}`} y2="100%" {...lineProps} />
          {/* Right edge with end ticks */}
          <line x1="100%" y1="0" x2="100%" y2="100%" {...lineProps} />
          <line x1={`calc(100% - ${tick}px)`} y1="0" x2={`calc(100% + ${tick}px)`} y2="0" {...lineProps} />
          <line x1={`calc(100% - ${tick}px)`} y1="100%" x2={`calc(100% + ${tick}px)`} y2="100%" {...lineProps} />
        </g>
      );
    }

    default:
      return null;
  }
}
