"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface CircularProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Progress value between 0 and 100. Omit for indeterminate. */
  value?: number;
  /** Diameter in pixels. @default 40 */
  size?: number;
  /** Stroke width in pixels. @default 4 */
  strokeWidth?: number;
}

/** Circular progress indicator — determinate (with value) or indeterminate (without). */
export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  function CircularProgress(
    { value, size = 40, strokeWidth = 4, className, ...rest },
    ref,
  ) {
    const isIndeterminate = value === undefined;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = isIndeterminate
      ? circumference * 0.25
      : circumference - (circumference * Math.min(Math.max(value, 0), 100)) / 100;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={100}
        data-slot="circular-progress"
        className={cn(
          "inline-flex items-center justify-center",
          isIndeterminate && "animate-spin",
          className,
        )}
        style={{ width: size, height: size, ...rest.style }}
        {...rest}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--s-border, currentColor)"
            strokeWidth={strokeWidth}
            opacity={0.2}
          />
          {/* Value arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--s-primary, currentColor)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              transition: isIndeterminate
                ? "none"
                : `stroke-dashoffset var(--s-duration-normal, 300ms) ease`,
            }}
          />
        </svg>
      </div>
    );
  },
);
