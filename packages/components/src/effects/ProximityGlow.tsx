"use client";

import {
  forwardRef,
  useRef,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils";

export interface ProximityGlowProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum proximity (px) before the glow appears. */
  proximity?: number;
  /** Spread angle of the conic-gradient mask (deg). */
  spread?: number;
  /** Blur radius for the glow layer (px). */
  blur?: number;
  children?: ReactNode;
}

/**
 * Container that renders a pointer-proximity glow border around each
 * `[data-glow]` child. Uses CSS `mask-composite: intersect` with a
 * conic-gradient that tracks the pointer angle via `Math.atan2`.
 *
 * Pure CSS masking + minimal JS for pointer tracking.
 */
export const ProximityGlow = forwardRef<HTMLDivElement, ProximityGlowProps>(
  function ProximityGlow(
    { proximity = 100, spread = 60, blur = 4, className, children, ...rest },
    ref,
  ) {
    const innerRef = useRef<HTMLDivElement | null>(null);

    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    useEffect(() => {
      const container = innerRef.current;
      if (!container) return;

      const cards = () =>
        container.querySelectorAll<HTMLElement>("[data-glow]");

      function handlePointerMove(e: PointerEvent) {
        for (const card of cards()) {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;

          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let angle =
            (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
          if (angle < 0) angle += 360;

          card.style.setProperty("--glow-angle", String(angle + 90));
          card.style.setProperty(
            "--glow-active",
            dist < proximity ? "1" : "0",
          );
        }
      }

      window.addEventListener("pointermove", handlePointerMove);
      return () =>
        window.removeEventListener("pointermove", handlePointerMove);
    }, [proximity]);

    return (
      <div
        ref={setRef}
        data-slot="proximity-glow"
        className={cn("sigil-proximity-glow", className)}
        style={
          {
            "--glow-spread": spread,
            "--glow-blur": blur,
          } as React.CSSProperties
        }
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export interface ProximityGlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Card that participates in the ProximityGlow effect.
 * Wrap your content in this — the glow border is rendered as a
 * `::before` pseudo-element via CSS.
 */
export const ProximityGlowCard = forwardRef<HTMLDivElement, ProximityGlowCardProps>(
  function ProximityGlowCard({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-glow
        data-slot="proximity-glow-card"
        className={cn(
          "sigil-proximity-glow-card",
          "relative overflow-hidden",
          "rounded-[var(--s-card-radius,12px)]",
          "bg-[var(--s-surface,oklch(0.2_0_0))]",
          "border border-[color:var(--s-border)] border-[style:var(--s-border-style,solid)]",
          "p-[var(--s-card-padding,24px)]",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
