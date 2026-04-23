"use client";

import { forwardRef, useMemo, type SVGAttributes } from "react";
import { cn } from "../../utils";

export interface GlobeCity {
  lat: number;
  lon: number;
  label?: string;
}

export interface GlobeDiagramProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  size?: number;
  cities?: GlobeCity[];
  dotColor?: string;
  arcColor?: string;
  rotation?: number;
}

function round4(n: number): number {
  return Math.round(n * 1e4) / 1e4;
}

function project(lat: number, lon: number, r: number, rot: number): [number, number, boolean] {
  const phi = (lat * Math.PI) / 180;
  const lambda = ((lon + rot) * Math.PI) / 180;
  const x = r * Math.cos(phi) * Math.sin(lambda);
  const y = -r * Math.sin(phi);
  const z = r * Math.cos(phi) * Math.cos(lambda);
  return [round4(x), round4(y), z > 0];
}

export const GlobeDiagram = forwardRef<SVGSVGElement, GlobeDiagramProps>(
  function GlobeDiagram({ size = 200, cities = [], dotColor, arcColor, rotation = 0, className, ...props }, ref) {
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 10;
    const dc = dotColor ?? "var(--s-text-muted)";
    const ac = arcColor ?? "var(--s-primary)";

    const dots = useMemo(() => {
      const pts: { x: number; y: number }[] = [];
      for (let lat = -80; lat <= 80; lat += 12) {
        const latR = (lat * Math.PI) / 180;
        const count = Math.round(30 * Math.cos(latR));
        for (let i = 0; i < count; i++) {
          const lon = (i / count) * 360 - 180;
          const [x, y, visible] = project(lat, lon, r, rotation);
          if (visible) pts.push({ x: cx + x, y: cy + y });
        }
      }
      return pts;
    }, [r, cx, cy, rotation]);

    const cityPts = cities.map(c => {
      const [x, y, visible] = project(c.lat, c.lon, r, rotation);
      return { ...c, x: cx + x, y: cy + y, visible };
    }).filter(c => c.visible);

    return (
      <svg
        ref={ref}
        data-slot="globe-diagram"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn("shrink-0", className)}
        {...props}
      >
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--s-border-muted)" strokeWidth={1} />

        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={Math.max(1, size / 160)} fill={dc} opacity={0.4} />
        ))}

        {cityPts.length >= 2 && (
          <path
            d={`M ${cityPts[0].x} ${cityPts[0].y} Q ${cx} ${cy - r * 0.3} ${cityPts[1].x} ${cityPts[1].y}`}
            fill="none"
            stroke={ac}
            strokeWidth={1.5}
            strokeDasharray="4 3"
            opacity={0.6}
          />
        )}

        {cityPts.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r={4} fill={ac} opacity={0.8} />
            <circle cx={c.x} cy={c.y} r={8} fill={ac} opacity={0.15} />
            {c.label && (
              <text x={c.x + 10} y={c.y + 4} fill="var(--s-text-muted)" fontSize={9} fontFamily="var(--s-font-mono, monospace)">
                {c.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    );
  },
);
