"use client";

import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface ExplodedBox3DProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the front/back square in px. @default 80 */
  size?: number;
  /** Depth of the side faces in px. @default 22 */
  depth?: number;
  /** Gap between the separated faces in px. @default 10 */
  gap?: number;
  /** Preset variant. @default "container" */
  variant?: "container" | "card" | "panel";
  /** Show small face labels for diagram use. @default false */
  showLabels?: boolean;
  children?: ReactNode;
}

const variantStyles: Record<NonNullable<ExplodedBox3DProps["variant"]>, string> = {
  container: "border-[var(--s-border)]",
  card: "border-[var(--s-border)] shadow-[var(--s-shadow-sm)]",
  panel: "border-[var(--s-border-strong)]",
};

const faces = [
  { name: "top", label: "T" },
  { name: "right", label: "R" },
  { name: "bottom", label: "B" },
  { name: "left", label: "L" },
  { name: "back", label: "K" },
] as const;

/** Exploded-face variant for diagrams where the separated panels are the point. */
export const ExplodedBox3D = forwardRef<HTMLDivElement, ExplodedBox3DProps>(
  function ExplodedBox3D(
    {
      size = 80,
      depth = 22,
      gap = 10,
      variant = "container",
      showLabels = false,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    const labelClass = "text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--s-text-muted)]";
    const faceClass = cn(
      "absolute flex items-center justify-center border bg-[var(--s-surface)]",
      "text-[var(--s-text-muted)]",
      variantStyles[variant],
    );
    const total = size + depth * 2 + gap * 2;
    const center = depth + gap;

    const rootStyle = {
      "--exploded-box-size": `${size}px`,
      "--exploded-box-depth": `${depth}px`,
      "--exploded-box-gap": `${gap}px`,
      height: `${total}px`,
      width: `${total}px`,
      ...style,
    } as CSSProperties;

    return (
      <div
        ref={ref}
        data-slot="exploded-box-3d"
        className={cn("relative inline-block", className)}
        style={rootStyle}
        {...rest}
      >
        <div
          className={cn(faceClass, "z-20 text-[var(--s-text)]")}
          style={{
            height: "var(--exploded-box-size)",
            left: `${center}px`,
            top: `${center}px`,
            width: "var(--exploded-box-size)",
          }}
        >
          {children ?? (showLabels ? <span className={labelClass}>F</span> : null)}
        </div>
        {faces.map((face) => (
          <div
            key={face.name}
            aria-hidden="true"
            className={cn(faceClass, face.name === "back" && "opacity-60")}
            style={getFaceStyle(face.name, center, size, depth, gap)}
          >
            {showLabels ? <span className={labelClass}>{face.label}</span> : null}
          </div>
        ))}
      </div>
    );
  },
);

function getFaceStyle(
  face: (typeof faces)[number]["name"],
  center: number,
  size: number,
  depth: number,
  gap: number,
): CSSProperties {
  switch (face) {
    case "top":
      return {
        height: `${depth}px`,
        left: `${center}px`,
        top: `${center - gap - depth}px`,
        width: `${size}px`,
      };
    case "right":
      return {
        height: `${size}px`,
        left: `${center + size + gap}px`,
        top: `${center}px`,
        width: `${depth}px`,
      };
    case "bottom":
      return {
        height: `${depth}px`,
        left: `${center}px`,
        top: `${center + size + gap}px`,
        width: `${size}px`,
      };
    case "left":
      return {
        height: `${size}px`,
        left: `${center - gap - depth}px`,
        top: `${center}px`,
        width: `${depth}px`,
      };
    case "back":
      return {
        height: `${size}px`,
        left: `${center + gap}px`,
        top: `${center - gap}px`,
        width: `${size}px`,
      };
  }
}
