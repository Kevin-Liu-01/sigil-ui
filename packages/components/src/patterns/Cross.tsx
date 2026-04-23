"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../utils";

export type CrossProps = SVGAttributes<SVGSVGElement> & {
  /** Cross size in px. @default 12 */
  size?: number;
  /** Stroke width. @default 1 */
  strokeWidth?: number;
};

/** Cross mark SVG — decorative sigil marker. */
export const Cross = forwardRef<SVGSVGElement, CrossProps>(function Cross(
  { size = 12, strokeWidth = 1, className, ...rest },
  ref,
) {
  const half = size / 2;

  return (
    <svg
      ref={ref}
      data-slot="cross"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden
      {...rest}
    >
      <line
        x1={half}
        y1="0"
        x2={half}
        y2={size}
        stroke="var(--s-border)"
        strokeWidth={strokeWidth}
      />
      <line
        x1="0"
        y1={half}
        x2={size}
        y2={half}
        stroke="var(--s-border)"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
});
