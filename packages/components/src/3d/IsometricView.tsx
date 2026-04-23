"use client";

import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface IsometricViewProps extends HTMLAttributes<HTMLDivElement> {
  /** Isometric tilt angle in degrees. @default 30 */
  angle?: number;
  children?: ReactNode;
}

/** Isometric projection container via CSS transform. */
export const IsometricView = forwardRef<HTMLDivElement, IsometricViewProps>(function IsometricView(
  { angle = 30, className, style, children, ...rest },
  ref,
) {
  const isoStyle: CSSProperties = {
    transformStyle: "preserve-3d",
    transform: `rotateX(${angle}deg) rotateZ(-45deg)`,
    perspective: "1000px",
    ...style,
  };

  return (
    <div ref={ref} data-slot="isometric-view" className={cn("inline-block", className)} style={isoStyle} {...rest}>
      {children}
    </div>
  );
});
