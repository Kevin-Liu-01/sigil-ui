"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";
import { useReducedMotion } from "./useReducedMotion";

export interface RippleProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of concentric rings. @default 3 */
  rings?: number;
  /** Duration of each ring's expansion in seconds. @default 2.5 */
  duration?: number;
  /** Ring color. @default "var(--s-primary, currentColor)" */
  color?: string;
  /** Maximum ring size. @default 200 */
  size?: number;
}

const keyframe = `@keyframes sigil-ripple { 0% { transform: scale(0); opacity: 0.5; } 100% { transform: scale(1); opacity: 0; } }`;

export const Ripple = forwardRef<HTMLDivElement, RippleProps>(
  function Ripple(
    {
      rings = 3,
      duration = 2.5,
      color = "var(--s-primary, currentColor)",
      size = 200,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();

    return (
      <div
        ref={ref}
        data-slot="ripple"
        className={cn("sigil-ripple pointer-events-none relative", className)}
        style={{ width: size, height: size, ...style }}
        aria-hidden
        {...rest}
      >
        <style>{keyframe}</style>
        {Array.from({ length: rings }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `1px solid ${color}`,
              animation: reduced
                ? "none"
                : `sigil-ripple ${duration}s ease-out ${(i * duration) / rings}s infinite`,
              opacity: reduced ? 0.15 : undefined,
            }}
          />
        ))}
      </div>
    );
  },
);
