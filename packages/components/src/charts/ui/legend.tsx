import { getPayloadConfigFromPayload, getColorsCount, useChart } from "./chart";
import * as RechartsPrimitive from "recharts";
import { cn } from "../../utils";
import * as React from "react";

export type ChartLegendVariant =
  | "square"
  | "circle"
  | "circle-outline"
  | "rounded-square"
  | "rounded-square-outline"
  | "vertical-bar"
  | "horizontal-bar";

function ChartLegendContent({
  className,
  hideIcon = false,
  nameKey,
  payload,
  verticalAlign,
  align = "right",
  selected,
  onSelectChange,
  isClickable,
  variant = "rounded-square",
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean;
  nameKey?: string;
  selected?: string | null;
  isClickable?: boolean;
  onSelectChange?: (selected: string | null) => void;
  variant?: ChartLegendVariant;
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-4 select-none",
        align === "left" && "justify-start",
        align === "center" && "justify-center",
        align === "right" && "justify-end",
        verticalAlign === "top" ? "pb-4" : "pt-4",
        className,
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const payloadName =
            nameKey && item.payload
              ? (item.payload as Record<string, unknown>)[nameKey]
              : undefined;
          const key = `${payloadName ?? item.value ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const isSelected = selected === null || selected === key;
          const colorsCount = itemConfig ? getColorsCount(itemConfig) : 1;

          return (
            <div
              key={key}
              className={cn(
                "[&>svg]:text-muted-foreground flex items-center gap-1.5 transition-opacity [&>svg]:h-3 [&>svg]:w-3",
                !isSelected && "opacity-30",
                isClickable && "cursor-pointer",
              )}
              onClick={() => {
                if (!isClickable) return;
                onSelectChange?.(selected === key ? null : key);
              }}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <LegendIndicator variant={variant} dataKey={key} colorsCount={colorsCount} />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
}

function LegendIndicator({
  variant,
  dataKey,
  colorsCount,
}: {
  variant: ChartLegendVariant;
  dataKey: string;
  colorsCount: number;
}) {
  const fillStyle = getLegendFillStyle(dataKey, colorsCount);
  const outlineStyle = getLegendOutlineStyle(dataKey, colorsCount);

  switch (variant) {
    case "square":
      return <div className="h-2 w-2 shrink-0" style={fillStyle} />;
    case "circle":
      return <div className="h-2 w-2 shrink-0 rounded-[var(--s-radius-full)]" style={fillStyle} />;
    case "circle-outline":
      return <div className="h-2.5 w-2.5 shrink-0 rounded-[var(--s-radius-full)] p-[var(--s-border-medium)]" style={outlineStyle} />;
    case "vertical-bar":
      return <div className="h-3 w-1 shrink-0 rounded-[var(--s-radius-sm)]" style={fillStyle} />;
    case "horizontal-bar":
      return <div className="h-1 w-3 shrink-0 rounded-[var(--s-radius-sm)]" style={fillStyle} />;
    case "rounded-square-outline":
      return <div className="h-2.5 w-2.5 shrink-0 rounded-[var(--s-radius-sm)] p-[var(--s-border-medium)]" style={outlineStyle} />;
    case "rounded-square":
    default:
      return <div className="h-2 w-2 shrink-0 rounded-[var(--s-radius-sm)]" style={fillStyle} />;
  }
}

function getLegendFillStyle(dataKey: string, colorsCount: number): React.CSSProperties {
  if (colorsCount <= 1) return { backgroundColor: `var(--color-${dataKey}-0)` };
  const stops = Array.from({ length: colorsCount }, (_, i) => {
    const offset = (i / (colorsCount - 1)) * 100;
    return `var(--color-${dataKey}-${i}) ${offset}%`;
  }).join(", ");
  return { background: `linear-gradient(to right, ${stops})` };
}

function getLegendOutlineStyle(dataKey: string, colorsCount: number): React.CSSProperties {
  const maskStyle: React.CSSProperties = {
    WebkitMask: "linear-gradient(white 0 0) content-box, linear-gradient(white 0 0)",
    WebkitMaskComposite: "xor",
    mask: "linear-gradient(white 0 0) content-box, linear-gradient(white 0 0)",
    maskComposite: "exclude",
  };
  if (colorsCount <= 1) return { backgroundColor: `var(--color-${dataKey}-0)`, ...maskStyle };
  const stops = Array.from({ length: colorsCount }, (_, i) => {
    const offset = (i / (colorsCount - 1)) * 100;
    return `var(--color-${dataKey}-${i}) ${offset}%`;
  }).join(", ");
  return { background: `linear-gradient(to right, ${stops})`, ...maskStyle };
}

const ChartLegend = RechartsPrimitive.Legend;

export { ChartLegend, ChartLegendContent };
