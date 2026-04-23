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
  container: "border-[var(--s-border)]",
  card: "border-[var(--s-border)] shadow-[var(--s-shadow-md)]",
  panel: "border-[var(--s-border-strong)]",
};

/** CSS 3D-transform box with 6 visible faces. */
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
  const half = depth / 2;

  const containerStyle: CSSProperties = {
    perspective: `${perspective}px`,
    ...style,
  };

  const cubeStyle: CSSProperties = {
    transformStyle: "preserve-3d",
    transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
    transition: hoverLift ? "transform 0.3s ease" : undefined,
  };

  const faceBase = "absolute inset-0 border bg-[var(--s-surface)]";

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
          "relative w-full h-full",
          hoverLift && "hover:translate-y-[-4px]",
        )}
        style={cubeStyle}
      >
        {/* Front face */}
        <div
          className={cn(faceBase, variantStyles[variant])}
          style={{ transform: `translateZ(${half}px)` }}
        >
          {children}
        </div>
        {/* Back face */}
        <div
          className={cn(faceBase, "opacity-60", variantStyles[variant])}
          style={{ transform: `translateZ(-${half}px) rotateY(180deg)` }}
        />
        {/* Left face */}
        <div
          className={cn(faceBase, "opacity-70", variantStyles[variant])}
          style={{
            width: `${depth}px`,
            transform: `translateX(-${half}px) rotateY(-90deg)`,
            transformOrigin: "left center",
          }}
        />
        {/* Right face */}
        <div
          className={cn(faceBase, "opacity-70", variantStyles[variant])}
          style={{
            width: `${depth}px`,
            right: 0,
            left: "auto",
            transform: `translateX(${half}px) rotateY(90deg)`,
            transformOrigin: "right center",
          }}
        />
        {/* Top face */}
        <div
          className={cn(faceBase, "opacity-80", variantStyles[variant])}
          style={{
            height: `${depth}px`,
            transform: `translateY(-${half}px) rotateX(90deg)`,
            transformOrigin: "center top",
          }}
        />
        {/* Bottom face */}
        <div
          className={cn(faceBase, "opacity-50", variantStyles[variant])}
          style={{
            height: `${depth}px`,
            bottom: 0,
            top: "auto",
            transform: `translateY(${half}px) rotateX(-90deg)`,
            transformOrigin: "center bottom",
          }}
        />
      </div>
    </div>
  );
});
