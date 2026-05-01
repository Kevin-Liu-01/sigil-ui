"use client";

import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface Box3DProps extends HTMLAttributes<HTMLDivElement> {
  /** Depth of the box in px. @default 20 */
  depth?: number;
  /** X-axis tilt in degrees. @default -10 */
  tiltX?: number;
  /** Y-axis tilt in degrees. @default 20 */
  tiltY?: number;
  /** Perspective distance in px. @default 800 */
  perspective?: number;
  /** Preset variant. @default "container" */
  variant?: "container" | "card" | "panel";
  /** Lift on hover. @default false */
  hoverLift?: boolean;
  children?: ReactNode;
}

const variantStyles: Record<string, string> = {
  container: "border-[color:var(--s-border)]",
  card: "border-[color:var(--s-border)] shadow-[var(--s-shadow-md)]",
  panel: "border-[color:var(--s-border-strong)]",
};

/** Token-driven projected box with attached front, top, and side faces. */
export const Box3D = forwardRef<HTMLDivElement, Box3DProps>(function Box3D(
  {
    depth = 20,
    tiltX = -10,
    tiltY = 20,
    perspective = 800,
    variant = "container",
    hoverLift = false,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const projectionX = Math.max(1, Math.abs(depth));
  const projectionY = Math.max(1, Math.round(Math.abs(depth) * 0.58));

  const containerStyle: CSSProperties = {
    "--box-3d-depth-x": `${projectionX}px`,
    "--box-3d-depth-y": `${projectionY}px`,
    perspective: `${perspective}px`,
    ...style,
  } as CSSProperties;

  const faceBase = "border border-[color:var(--s-border)] bg-[var(--s-surface)]";
  const sideFace = cn("pointer-events-none absolute", faceBase, "bg-[var(--s-surface-elevated,var(--s-surface))]");

  return (
    <div
      ref={ref}
      data-slot="box-3d"
      className={cn("relative inline-block", className)}
      style={containerStyle}
      {...rest}
    >
      <div
        className={cn(
          "relative inline-block pr-[var(--box-3d-depth-x)] pt-[var(--box-3d-depth-y)] align-middle",
          "transition-transform duration-[var(--s-duration-fast,160ms)] ease-[var(--s-easing-standard,ease-out)]",
          hoverLift && "hover:-translate-y-1",
        )}
        style={{ transform: `rotateX(${tiltX * 0.04}deg) rotateY(${tiltY * 0.04}deg)` }}
      >
        <div
          aria-hidden="true"
          className={sideFace}
          style={{
            clipPath:
              "polygon(0 100%, var(--box-3d-depth-x) 0, 100% 0, calc(100% - var(--box-3d-depth-x)) 100%)",
            height: "var(--box-3d-depth-y)",
            insetInline: 0,
            top: 0,
          }}
        />
        <div
          aria-hidden="true"
          className={sideFace}
          style={{
            bottom: 0,
            clipPath:
              "polygon(0 var(--box-3d-depth-y), 100% 0, 100% calc(100% - var(--box-3d-depth-y)), 0 100%)",
            right: 0,
            top: 0,
            width: "var(--box-3d-depth-x)",
          }}
        />
        <div
          className={cn(
            "relative z-10 flex min-h-[var(--s-box-3d-min-height,5rem)] min-w-[var(--s-box-3d-min-width,5rem)]",
            "items-center justify-center",
            faceBase,
            variantStyles[variant],
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
});
