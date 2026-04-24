"use client";

import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../../utils";

export interface BillingPeriod {
  label: string;
  segments: { label: string; value: number; color?: string }[];
}

export interface BillingChartProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height"> {
  periods: BillingPeriod[];
  width?: number;
  height?: number;
  /** Currency symbol. @default "$" */
  currency?: string;
  /** Show legend. @default true */
  showLegend?: boolean;
}

const defaultColors = [
  "var(--s-primary)",
  "var(--s-success, #22c55e)",
  "var(--s-warning, #f59e0b)",
  "var(--s-error, #ef4444)",
  "var(--s-info, #3b82f6)",
];

function fmtCurrency(v: number, sym: string): string {
  if (v >= 1000) return `${sym}${(v / 1000).toFixed(1)}k`;
  return `${sym}${v}`;
}

export const BillingChart = forwardRef<SVGSVGElement, BillingChartProps>(
  function BillingChart({ periods, width: w = 500, height: h = 260, currency = "$", showLegend = true, className, ...props }, ref) {
    const padL = 50;
    const padR = 10;
    const padT = 10;
    const padB = showLegend ? 52 : 28;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const totals = periods.map((p) => p.segments.reduce((s, seg) => s + seg.value, 0));
    const maxTotal = Math.max(...totals, 1);
    const barW = Math.min(36, (plotW / periods.length) * 0.6);
    const barGap = (plotW - barW * periods.length) / (periods.length + 1);

    const allSegLabels = [...new Set(periods.flatMap((p) => p.segments.map((s) => s.label)))];
    const segColorMap = new Map<string, string>();
    let ci = 0;
    for (const p of periods) {
      for (const seg of p.segments) {
        if (!segColorMap.has(seg.label)) {
          segColorMap.set(seg.label, seg.color ?? defaultColors[ci % defaultColors.length]);
          ci++;
        }
      }
    }

    const gridLines = 5;

    return (
      <svg
        ref={ref}
        data-slot="billing-chart"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className={cn("shrink-0", className)}
        {...props}
      >
        {Array.from({ length: gridLines }, (_, i) => {
          const val = (maxTotal * i) / (gridLines - 1);
          const y = padT + plotH - (val / maxTotal) * plotH;
          return (
            <g key={i}>
              <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="var(--s-border)" strokeWidth={0.5} opacity={0.4} />
              <text x={padL - 6} y={y + 3} textAnchor="end" fontSize={9} fill="var(--s-text-muted)" fontFamily="var(--s-font-mono, monospace)">
                {fmtCurrency(Math.round(val), currency)}
              </text>
            </g>
          );
        })}

        {periods.map((period, pi) => {
          const x = padL + barGap + pi * (barW + barGap);
          let barY = padT + plotH;

          return (
            <g key={pi}>
              {period.segments.map((seg, si) => {
                const segH = (seg.value / maxTotal) * plotH;
                barY -= segH;
                const segColor = segColorMap.get(seg.label) ?? defaultColors[si % defaultColors.length];
                return (
                  <rect
                    key={si}
                    x={x}
                    y={barY}
                    width={barW}
                    height={segH}
                    fill={segColor}
                    opacity={0.85}
                    rx={si === period.segments.length - 1 ? 2 : 0}
                  />
                );
              })}
              <text
                x={x + barW / 2}
                y={padT + plotH + 14}
                textAnchor="middle"
                fontSize={9}
                fill="var(--s-text-muted)"
                fontFamily="var(--s-font-mono, monospace)"
              >
                {period.label}
              </text>
              <text
                x={x + barW / 2}
                y={barY - 5}
                textAnchor="middle"
                fontSize={9}
                fontWeight={600}
                fill="var(--s-text)"
                fontFamily="var(--s-font-mono, monospace)"
              >
                {fmtCurrency(totals[pi], currency)}
              </text>
            </g>
          );
        })}

        {showLegend && (
          <g>
            {allSegLabels.map((label, i) => {
              const lx = padL + i * 100;
              const ly = h - 12;
              return (
                <g key={i}>
                  <rect x={lx} y={ly - 4} width={8} height={8} rx={1} fill={segColorMap.get(label)} opacity={0.85} />
                  <text x={lx + 12} y={ly + 3} fontSize={9} fill="var(--s-text-muted)">
                    {label}
                  </text>
                </g>
              );
            })}
          </g>
        )}
      </svg>
    );
  },
);
