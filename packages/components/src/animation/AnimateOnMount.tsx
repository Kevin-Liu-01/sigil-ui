"use client";

import { forwardRef, useEffect, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { useReducedMotion } from "./useReducedMotion";
import { PRESETS, type PresetName } from "./animate";

export interface AnimateOnMountProps extends HTMLAttributes<HTMLDivElement> {
  /** Animation preset. @default "fadeUp" */
  preset?: PresetName;
  /** Delay in ms. @default 0 */
  delay?: number;
  /** Duration in ms. @default 400 */
  duration?: number;
  children?: ReactNode;
}

/**
 * Wrapper that plays a CSS transition on mount (no scroll trigger).
 * Lighter alternative to the GSAP-based AnimateOnScroll for simple mount reveals.
 */
export const AnimateOnMount = forwardRef<HTMLDivElement, AnimateOnMountProps>(
  function AnimateOnMount(
    { preset = "fadeUp", delay = 0, duration = 400, className, style, children, ...rest },
    ref,
  ) {
    const reduced = useReducedMotion();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      const frame = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(frame);
    }, []);

    const visible = reduced || mounted;
    const p = PRESETS[preset];

    const fromStyle: React.CSSProperties = {};
    const toStyle: React.CSSProperties = {};

    if ("opacity" in p.from) fromStyle.opacity = p.from.opacity as number;
    if ("opacity" in p.to) toStyle.opacity = p.to.opacity as number;
    if ("y" in p.from) fromStyle.transform = `translateY(${p.from.y}px)`;
    if ("y" in p.to) toStyle.transform = p.to.y === 0 ? "translateY(0)" : `translateY(${p.to.y}px)`;
    if ("x" in p.from) fromStyle.transform = `translateX(${p.from.x}px)`;
    if ("x" in p.to) toStyle.transform = p.to.x === 0 ? "translateX(0)" : `translateX(${p.to.x}px)`;
    if ("scale" in p.from) fromStyle.transform = `scale(${p.from.scale})`;
    if ("scale" in p.to) toStyle.transform = p.to.scale === 1 ? "scale(1)" : `scale(${p.to.scale})`;
    if ("filter" in p.from) fromStyle.filter = p.from.filter as string;
    if ("filter" in p.to) toStyle.filter = p.to.filter as string;

    const current = visible ? toStyle : fromStyle;

    return (
      <div
        ref={ref}
        data-slot="animate-on-mount"
        className={cn("sigil-animate-on-mount", className)}
        style={{
          ...current,
          transition: reduced
            ? "none"
            : `all ${duration}ms var(--s-ease-default,cubic-bezier(0.16,1,0.3,1)) ${delay}ms`,
          willChange: visible ? "auto" : "opacity, transform, filter",
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
