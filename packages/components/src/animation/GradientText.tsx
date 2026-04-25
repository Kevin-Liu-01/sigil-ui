"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { useReducedMotion } from "./useReducedMotion";

export interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Gradient colors. @default ["var(--s-primary)","var(--s-accent,#ec4899)","var(--s-primary)"] */
  colors?: string[];
  /** Animation duration in seconds. @default 4 */
  duration?: number;
  /** Whether the gradient animates. @default true */
  animate?: boolean;
  children?: ReactNode;
}

const keyframe = `@keyframes sigil-gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`;

export const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(
  function GradientText(
    {
      colors = ["var(--s-primary)", "var(--s-accent,#ec4899)", "var(--s-primary)"],
      duration = 4,
      animate = true,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const shouldAnimate = animate && !reduced;

    return (
      <span
        ref={ref}
        data-slot="gradient-text"
        className={cn("sigil-gradient-text", className)}
        style={{
          backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
          backgroundSize: shouldAnimate ? "200% auto" : "100% auto",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: shouldAnimate
            ? `sigil-gradient-shift ${duration}s ease-in-out infinite`
            : "none",
          display: "inline-block",
          ...style,
        }}
        {...rest}
      >
        <style>{keyframe}</style>
        {children}
      </span>
    );
  },
);
