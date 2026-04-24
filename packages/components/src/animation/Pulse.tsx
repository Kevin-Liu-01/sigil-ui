"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { useReducedMotion } from "./useReducedMotion";

export interface PulseProps extends HTMLAttributes<HTMLDivElement> {
  /** Pulse animation duration in seconds. @default 2 */
  duration?: number;
  /** Scale range of the pulse. @default 1.04 */
  scale?: number;
  children?: ReactNode;
}

export const Pulse = forwardRef<HTMLDivElement, PulseProps>(
  function Pulse({ duration = 2, scale = 1.04, className, style, children, ...rest }, ref) {
    const reduced = useReducedMotion();
    const name = `sigil-pulse-${Math.round(scale * 100)}`;

    return (
      <div
        ref={ref}
        data-slot="pulse"
        className={cn("sigil-pulse", className)}
        style={{
          animation: reduced ? "none" : `${name} ${duration}s ease-in-out infinite`,
          ...style,
        }}
        {...rest}
      >
        <style>{`@keyframes ${name} { 0%, 100% { transform: scale(1); } 50% { transform: scale(${scale}); } }`}</style>
        {children}
      </div>
    );
  },
);
