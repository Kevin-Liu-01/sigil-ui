"use client";

import { forwardRef, useEffect, useState, type HTMLAttributes } from "react";
import { cn } from "../utils";
import { useReducedMotion } from "./useReducedMotion";

export interface ScrollProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Position on screen. @default "top" */
  position?: "top" | "bottom";
  /** Bar height in pixels. @default 3 */
  height?: number;
  /** Whether to use fixed positioning. @default true */
  fixed?: boolean;
}

export const ScrollProgress = forwardRef<HTMLDivElement, ScrollProgressProps>(
  function ScrollProgress(
    { position = "top", height = 3, fixed = true, className, style, ...rest },
    ref,
  ) {
    const reduced = useReducedMotion();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        data-slot="scroll-progress"
        className={cn("sigil-scroll-progress pointer-events-none z-50", className)}
        style={{
          position: fixed ? "fixed" : "sticky",
          [position]: 0,
          left: 0,
          right: 0,
          height,
          ...style,
        }}
        {...rest}
      >
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            background: "var(--s-primary, currentColor)",
            transition: reduced ? "none" : "width 50ms linear",
            transformOrigin: "left",
          }}
        />
      </div>
    );
  },
);
