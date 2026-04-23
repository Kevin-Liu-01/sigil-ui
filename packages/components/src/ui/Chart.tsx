"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  type TooltipProps,
} from "recharts";
import { cn } from "../utils";

export interface ChartContainerProps extends HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  children: ReactNode;
}

export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  function ChartContainer({ height = 350, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="chart"
        className={cn(
          "w-full text-[var(--s-text-muted)] text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-[var(--s-text-muted)]",
          "[&_.recharts-cartesian-grid_line]:stroke-[var(--s-border)]",
          "[&_.recharts-curve]:stroke-2",
          className,
        )}
        {...rest}
      >
        <ResponsiveContainer width="100%" height={height}>
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    );
  },
);

export interface ChartTooltipProps extends Partial<TooltipProps<number, string>> {
  className?: string;
}

export function ChartTooltip({ className, ...rest }: ChartTooltipProps) {
  return (
    <RechartsTooltip
      cursor={{ stroke: "var(--s-border)", strokeWidth: 1 }}
      contentStyle={{
        backgroundColor: "var(--s-surface)",
        border: "1px solid var(--s-border)",
        borderRadius: "var(--s-radius-md, 6px)",
        boxShadow: "var(--s-shadow-md)",
        padding: "8px 12px",
        fontSize: "13px",
        color: "var(--s-text)",
      }}
      labelStyle={{ color: "var(--s-text-muted)", marginBottom: 4, fontWeight: 500 }}
      itemStyle={{ color: "var(--s-text)", padding: "1px 0" }}
      {...rest}
    />
  );
}

export interface ChartLegendProps {
  className?: string;
  verticalAlign?: "top" | "middle" | "bottom";
  align?: "left" | "center" | "right";
}

export function ChartLegend({
  className,
  verticalAlign = "bottom",
  align = "center",
}: ChartLegendProps) {
  return (
    <RechartsLegend
      verticalAlign={verticalAlign}
      align={align}
      wrapperStyle={{ paddingTop: 12, fontSize: 13 }}
      formatter={(value: string) => (
        <span className={cn("text-[var(--s-text)] ml-1", className)}>{value}</span>
      )}
    />
  );
}
