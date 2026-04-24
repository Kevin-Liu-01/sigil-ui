"use client";

import { forwardRef, type SVGAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface IsometricPrismProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  width?: number;
  height?: number;
  depth?: number;
  borderRadius?: number;
  topColor?: string;
  leftColor?: string;
  rightColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  children?: ReactNode;
}

function isoProject(x: number, y: number, z: number): [number, number] {
  const px = (x - z) * Math.cos(Math.PI / 6);
  const py = (x + z) * Math.sin(Math.PI / 6) - y;
  return [px, py];
}

export const IsometricPrism = forwardRef<SVGSVGElement, IsometricPrismProps>(
  function IsometricPrism({
    width: w = 80,
    height: h = 60,
    depth: d = 80,
    borderRadius: r = 0,
    topColor = "var(--s-primary)",
    leftColor = "var(--s-surface)",
    rightColor = "var(--s-surface-elevated, var(--s-surface))",
    strokeColor = "var(--s-border)",
    strokeWidth: sw = 1,
    className,
    children,
    ...props
  }, ref) {
    const top0 = isoProject(0, h, 0);
    const top1 = isoProject(w, h, 0);
    const top2 = isoProject(w, h, d);
    const top3 = isoProject(0, h, d);

    const bot0 = isoProject(0, 0, 0);
    const bot1 = isoProject(w, 0, 0);
    const bot2 = isoProject(w, 0, d);
    const bot3 = isoProject(0, 0, d);

    const allX = [top0, top1, top2, top3, bot0, bot1, bot2, bot3].map(p => p[0]);
    const allY = [top0, top1, top2, top3, bot0, bot1, bot2, bot3].map(p => p[1]);
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);
    const pad = sw + 2;
    const svgW = maxX - minX + pad * 2;
    const svgH = maxY - minY + pad * 2;
    const ox = -minX + pad;
    const oy = -minY + pad;

    const pt = (p: [number, number]) => `${p[0] + ox},${p[1] + oy}`;

    const topFace = [top0, top1, top2, top3].map(pt).join(" ");
    const frontFace = [top0, top1, bot1, bot0].map(pt).join(" ");
    const rightFace = [top1, top2, bot2, bot1].map(pt).join(" ");

    return (
      <svg
        ref={ref}
        data-slot="isometric-prism"
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        className={cn("shrink-0", className)}
        {...props}
      >
        <polygon points={frontFace} fill={leftColor} stroke={strokeColor} strokeWidth={sw} strokeLinejoin="round" />
        <polygon points={rightFace} fill={rightColor} stroke={strokeColor} strokeWidth={sw} strokeLinejoin="round" />
        <polygon points={topFace} fill={topColor} stroke={strokeColor} strokeWidth={sw} strokeLinejoin="round" />
        {children && (
          <foreignObject
            x={Math.min(top0[0], top1[0], top2[0], top3[0]) + ox}
            y={Math.min(top0[1], top1[1], top2[1], top3[1]) + oy}
            width={Math.abs(top1[0] - top3[0])}
            height={Math.abs(top0[1] - top2[1])}
          >
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {children}
            </div>
          </foreignObject>
        )}
      </svg>
    );
  },
);
