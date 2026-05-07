"use client";

import {
  ChartTooltip,
  ChartTooltipContent,
  type TooltipRoundness,
  type TooltipVariant,
} from "./ui/tooltip";
import {
  type ChartConfig,
  ChartContainer,
  getColorsCount,
  LoadingIndicator,
} from "./ui/chart";
import { ChartLegend, ChartLegendContent, type ChartLegendVariant } from "./ui/legend";
import { LabelList, Pie, PieChart, Sector } from "recharts";
import { ChartBackground, type BackgroundVariant } from "./ui/background";
import { useCallback, useId, useState, type ComponentProps } from "react";

const DEFAULT_INNER_RADIUS = 0;
const DEFAULT_OUTER_RADIUS = "80%";
const DEFAULT_CORNER_RADIUS = 0;
const DEFAULT_PADDING_ANGLE = 0;

type ChartProps = ComponentProps<typeof PieChart>;
type PieProps = ComponentProps<typeof Pie>;
type LabelListProps = ComponentProps<typeof LabelList>;

type EvilPieChartProps<TData extends Record<string, unknown>> = {
  data: TData[];
  dataKey: keyof TData & string;
  nameKey: keyof TData & string;
  chartConfig: ChartConfig;
  className?: string;
  chartProps?: ChartProps;
  pieProps?: Omit<PieProps, "data" | "dataKey" | "nameKey">;
  innerRadius?: number | string;
  outerRadius?: number | string;
  cornerRadius?: number;
  paddingAngle?: number;
  startAngle?: number;
  endAngle?: number;
  showLabels?: boolean;
  labelKey?: keyof TData & string;
  labelListProps?: Omit<LabelListProps, "dataKey">;
  hideTooltip?: boolean;
  hideLegend?: boolean;
  legendVariant?: ChartLegendVariant;
  tooltipRoundness?: TooltipRoundness;
  tooltipVariant?: TooltipVariant;
  isLoading?: boolean;
  backgroundVariant?: BackgroundVariant;
};

type EvilPieChartClickable = {
  isClickable: true;
  onSelectionChange?: (selectedName: string | null) => void;
};

type EvilPieChartNotClickable = {
  isClickable?: false;
  onSelectionChange?: never;
};

type EvilPieChartPropsWithCallback<TData extends Record<string, unknown>> =
  EvilPieChartProps<TData> & (EvilPieChartClickable | EvilPieChartNotClickable);

export function EvilPieChart<TData extends Record<string, unknown>>({
  data,
  dataKey,
  nameKey,
  chartConfig,
  className,
  chartProps,
  pieProps,
  innerRadius = DEFAULT_INNER_RADIUS,
  outerRadius = DEFAULT_OUTER_RADIUS,
  cornerRadius = DEFAULT_CORNER_RADIUS,
  paddingAngle = DEFAULT_PADDING_ANGLE,
  startAngle = 90,
  endAngle = -270,
  showLabels = false,
  labelKey,
  labelListProps,
  hideTooltip = false,
  hideLegend = false,
  legendVariant,
  tooltipRoundness,
  tooltipVariant,
  isClickable = false,
  isLoading = false,
  onSelectionChange,
  backgroundVariant,
}: EvilPieChartPropsWithCallback<TData>) {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const chartId = useId().replace(/:/g, "");

  const handleSelectionChange = useCallback(
    (name: string | null) => {
      setSelectedName(name);
      if (isClickable && onSelectionChange) {
        onSelectionChange(name);
      }
    },
    [onSelectionChange, isClickable],
  );

  const chartData = data.map((item) => {
    const name = item[nameKey] as string;
    return {
      ...item,
      fill: `var(--color-${name}-0)`,
    };
  });

  return (
    <ChartContainer className={className} config={chartConfig}>
      <LoadingIndicator isLoading={isLoading} />
      <PieChart {...chartProps}>
        {backgroundVariant && <ChartBackground variant={backgroundVariant} />}
        {!hideLegend && (
          <ChartLegend
            verticalAlign="bottom"
            align="center"
            content={
              <ChartLegendContent
                nameKey={nameKey}
                selected={selectedName}
                onSelectChange={handleSelectionChange}
                isClickable={isClickable}
                variant={legendVariant}
              />
            }
          />
        )}
        {!hideTooltip && !isLoading && (
          <ChartTooltip
            content={
              <ChartTooltipContent
                nameKey={nameKey}
                roundness={tooltipRoundness}
                variant={tooltipVariant}
              />
            }
          />
        )}
        <Pie
          data={chartData}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          cornerRadius={cornerRadius}
          paddingAngle={paddingAngle}
          startAngle={startAngle}
          endAngle={endAngle}
          strokeWidth={2}
          stroke="var(--color-background, hsl(var(--background)))"
          onClick={(_, index) => {
            if (!isClickable) return;
            const name = chartData[index]?.[nameKey] as string;
            handleSelectionChange(selectedName === name ? null : name);
          }}
          style={isClickable ? { cursor: "pointer" } : undefined}
          {...pieProps}
        >
          {showLabels && (
            <LabelList
              dataKey={labelKey ?? nameKey}
              className="fill-foreground"
              stroke="none"
              fontSize={12}
              {...labelListProps}
            />
          )}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
