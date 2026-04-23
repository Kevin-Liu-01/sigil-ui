"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface FloatingUIProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of React elements to stack as floating layers. */
  layers: ReactNode[];
  /** Pixel offset between each layer. @default 20 */
  offset?: number;
  /** Shadow depth applied to each layer. @default "md" */
  shadowDepth?: "sm" | "md" | "lg";
}

const shadowMap: Record<string, string> = {
  sm: "shadow-[var(--s-shadow-sm)]",
  md: "shadow-[var(--s-shadow-md)]",
  lg: "shadow-[var(--s-shadow-lg)]",
};

/** Floating overlapping UI composition — stacks layers with offset. */
export const FloatingUI = forwardRef<HTMLDivElement, FloatingUIProps>(function FloatingUI(
  { layers, offset = 20, shadowDepth = "md", className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="floating-ui"
      className={cn("relative", className)}
      style={{
        width: "100%",
        height: `calc(100% + ${(layers.length - 1) * offset}px)`,
        ...style,
      }}
      {...rest}
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          className={cn(
            "absolute left-0 right-0 rounded-[var(--s-card-radius,8px)]",
            "border border-[var(--s-border)] bg-[var(--s-surface)]",
            shadowMap[shadowDepth],
          )}
          style={{
            top: `${i * offset}px`,
            zIndex: layers.length - i,
          }}
        >
          {layer}
        </div>
      ))}
    </div>
  );
});
