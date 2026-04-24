"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { useReducedMotion } from "./useReducedMotion";

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  /** Scroll direction. @default "left" */
  direction?: "left" | "right" | "up" | "down";
  /** Animation duration in seconds. @default 30 */
  duration?: number;
  /** Pause on hover. @default true */
  pauseOnHover?: boolean;
  /** Number of content copies for seamless loop. @default 2 */
  repeat?: number;
  /** Gap between items. @default "1rem" */
  gap?: string;
  children?: ReactNode;
}

const keyframeMap = {
  left: "sigil-marquee-left",
  right: "sigil-marquee-right",
  up: "sigil-marquee-up",
  down: "sigil-marquee-down",
} as const;

const keyframes = `
@keyframes sigil-marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes sigil-marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
@keyframes sigil-marquee-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }
@keyframes sigil-marquee-down { from { transform: translateY(-50%); } to { transform: translateY(0); } }
`;

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  function Marquee(
    {
      direction = "left",
      duration = 30,
      pauseOnHover = true,
      repeat = 2,
      gap = "1rem",
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const isHorizontal = direction === "left" || direction === "right";

    const trackStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: isHorizontal ? "row" : "column",
      gap,
      width: isHorizontal ? "max-content" : undefined,
      animation: reduced
        ? "none"
        : `${keyframeMap[direction]} ${duration}s linear infinite`,
    };

    return (
      <div
        ref={ref}
        data-slot="marquee"
        className={cn(
          "sigil-marquee overflow-hidden",
          pauseOnHover && "[&:hover_>_div]:![animation-play-state:paused]",
          className,
        )}
        {...rest}
      >
        <style>{keyframes}</style>
        <div style={trackStyle}>
          {Array.from({ length: repeat }).map((_, i) => (
            <div
              key={i}
              aria-hidden={i > 0 || undefined}
              style={{
                display: "flex",
                flexDirection: isHorizontal ? "row" : "column",
                gap,
                flexShrink: 0,
              }}
            >
              {children}
            </div>
          ))}
        </div>
      </div>
    );
  },
);
