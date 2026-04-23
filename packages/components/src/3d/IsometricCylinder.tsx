"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../utils";

export interface IsometricCylinderProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  radius?: number;
  height?: number;
  topColor?: string;
  bodyColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export const IsometricCylinder = forwardRef<SVGSVGElement, IsometricCylinderProps>(
  function IsometricCylinder({
    radius: r = 40,
    height: h = 60,
    topColor = "var(--s-primary)",
    bodyColor = "var(--s-surface)",
    strokeColor = "var(--s-border)",
    strokeWidth: sw = 1,
    className,
    ...props
  }, ref) {
    const ellipseRy = r * 0.4;
    const svgW = r * 2 + sw * 2 + 4;
    const svgH = h + ellipseRy * 2 + sw * 2 + 4;
    const cx = svgW / 2;
    const topCy = ellipseRy + sw + 2;
    const botCy = topCy + h;

    return (
      <svg
        ref={ref}
        data-slot="isometric-cylinder"
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        className={cn("shrink-0", className)}
        {...props}
      >
        <path
          d={`M ${cx - r} ${topCy} L ${cx - r} ${botCy} A ${r} ${ellipseRy} 0 0 0 ${cx + r} ${botCy} L ${cx + r} ${topCy}`}
          fill={bodyColor}
          stroke={strokeColor}
          strokeWidth={sw}
        />
        <ellipse cx={cx} cy={botCy} rx={r} ry={ellipseRy} fill={bodyColor} stroke={strokeColor} strokeWidth={sw} />
        <ellipse cx={cx} cy={topCy} rx={r} ry={ellipseRy} fill={topColor} stroke={strokeColor} strokeWidth={sw} />
      </svg>
    );
  },
);
