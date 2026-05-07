"use client";

import {
  type ChartConfig,
  ChartContainer,
  getColorsCount,
  getLoadingData,
  LoadingIndicator,
} from "./ui/chart";
import { EvilBrush, useEvilBrush, type EvilBrushRange } from "./ui/evil-brush";
import {
  ChartTooltip,
  ChartTooltipContent,
  type TooltipRoundness,
  type TooltipVariant,
} from "./ui/tooltip";
import { ChartLegend, ChartLegendContent, type ChartLegendVariant } from "./ui/legend";
import { Bar, BarChart, CartesianGrid, Rectangle, ReferenceLine, XAxis, YAxis } from "recharts";
import { useCallback, useId, useMemo, useRef, useState, type ComponentProps } from "react";
import { ChartBackground, type BackgroundVariant } from "./ui/background";
import { motion } from "motion/react";

const DEFAULT_BAR_RADIUS = 2;
const LOADING_BAR_DATA_KEY = "loading";
const LOADING_ANIMATION_DURATION = 2000;

type ChartProps = ComponentProps<typeof BarChart>;
type XAxisProps = ComponentProps<typeof XAxis>;
type YAxisProps = ComponentProps<typeof YAxis>;
type BarVariant = "default" | "hatched" | "duotone" | "duotone-reverse" | "gradient" | "stripped";
type StackType = "default" | "stacked" | "percent";
type BarLayout = "vertical" | "horizontal";

type ValidateConfigKeys<TData, TConfig> = {
  [K in keyof TConfig]: K extends keyof TData ? ChartConfig[string] : never;
};

type EvilBarChartProps<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>,
> = {
  chartConfig: TConfig & ValidateConfigKeys<TData, TConfig>;
  data: TData[];
  xDataKey?: keyof TData & string;
  yDataKey?: keyof TData & string;
  className?: string;
  chartProps?: ChartProps;
  xAxisProps?: XAxisProps;
  yAxisProps?: YAxisProps;
  defaultSelectedDataKey?: string | null;
  barVariant?: BarVariant;
  stackType?: StackType;
  layout?: BarLayout;
  barRadius?: number;
  barGap?: number;
  barCategoryGap?: number;
  tickGap?: number;
  legendVariant?: ChartLegendVariant;
  hideTooltip?: boolean;
  hideCartesianGrid?: boolean;
  hideLegend?: boolean;
  tooltipRoundness?: TooltipRoundness;
  tooltipVariant?: TooltipVariant;
  tooltipDefaultIndex?: number;
  isLoading?: boolean;
  loadingPoints?: number;
  showBrush?: boolean;
  brushHeight?: number;
  brushFormatLabel?: (value: unknown, index: number) => string;
  onBrushChange?: (range: EvilBrushRange) => void;
  backgroundVariant?: BackgroundVariant;
};

type EvilBarChartClickable = {
  isClickable: true;
  onSelectionChange?: (selectedDataKey: string | null) => void;
};

type EvilBarChartNotClickable = {
  isClickable?: false;
  onSelectionChange?: never;
};

type EvilBarChartPropsWithCallback<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>,
> = EvilBarChartProps<TData, TConfig> & (EvilBarChartClickable | EvilBarChartNotClickable);

export function EvilBarChart<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>,
>({
  chartConfig,
  data,
  xDataKey,
  yDataKey,
  className,
  chartProps,
  xAxisProps,
  yAxisProps,
  defaultSelectedDataKey = null,
  barVariant = "default",
  stackType = "default",
  layout = "horizontal",
  barRadius = DEFAULT_BAR_RADIUS,
  barGap,
  barCategoryGap,
  tickGap = 8,
  legendVariant,
  hideTooltip = false,
  hideCartesianGrid = false,
  hideLegend = false,
  tooltipRoundness,
  tooltipVariant,
  tooltipDefaultIndex,
  isClickable = false,
  isLoading = false,
  loadingPoints,
  showBrush = false,
  brushHeight,
  brushFormatLabel,
  onBrushChange,
  onSelectionChange,
  backgroundVariant,
}: EvilBarChartPropsWithCallback<TData, TConfig>) {
  const [selectedDataKey, setSelectedDataKey] = useState<string | null>(defaultSelectedDataKey);
  const { loadingData, onShimmerExit } = useLoadingData(isLoading, loadingPoints);
  const chartId = useId().replace(/:/g, "");

  const { visibleData, brushProps } = useEvilBrush({ data });
  const displayData = showBrush && !isLoading ? visibleData : data;

  const handleSelectionChange = useCallback(
    (newSelectedDataKey: string | null) => {
      setSelectedDataKey(newSelectedDataKey);
      if (isClickable && onSelectionChange) {
        onSelectionChange(newSelectedDataKey);
      }
    },
    [onSelectionChange, isClickable],
  );

  const isStacked = stackType === "stacked" || stackType === "percent";
  const radiusArr: [number, number, number, number] = isStacked
    ? [0, 0, 0, 0]
    : layout === "horizontal"
      ? [barRadius, barRadius, 0, 0]
      : [0, barRadius, barRadius, 0];

  return (
    <ChartContainer
      className={className}
      config={chartConfig}
      footer={
        showBrush &&
        !isLoading && (
          <EvilBrush
            data={data as Record<string, unknown>[]}
            chartConfig={chartConfig}
            xDataKey={xDataKey}
            variant="bar"
            height={brushHeight}
            formatLabel={brushFormatLabel}
            skipStyle
            className="mt-1"
            {...brushProps}
            onChange={(range) => {
              brushProps.onChange(range);
              onBrushChange?.(range);
            }}
          />
        )
      }
    >
      <LoadingIndicator isLoading={isLoading} />
      <BarChart
        accessibilityLayer
        layout={layout}
        data={(isLoading ? loadingData : displayData) as Record<string, unknown>[]}
        barGap={barGap}
        barCategoryGap={barCategoryGap}
        stackOffset={stackType === "percent" ? "expand" : undefined}
        {...chartProps}
      >
        {backgroundVariant && <ChartBackground variant={backgroundVariant} />}
        <ReferenceLine color="white" />
        {!hideCartesianGrid && !backgroundVariant && (
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
        )}
        {!hideLegend && (
          <ChartLegend
            verticalAlign="top"
            align="right"
            content={
              <ChartLegendContent
                selected={selectedDataKey}
                onSelectChange={handleSelectionChange}
                isClickable={isClickable}
                variant={legendVariant}
              />
            }
          />
        )}
        {xDataKey && !isLoading && (
          <XAxis
            dataKey={layout === "horizontal" ? xDataKey : undefined}
            type={layout === "horizontal" ? "category" : "number"}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={tickGap}
            {...xAxisProps}
          />
        )}
        {!isLoading && (
          <YAxis
            dataKey={layout === "vertical" ? xDataKey : undefined}
            type={layout === "vertical" ? "category" : "number"}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={tickGap}
            {...yAxisProps}
          />
        )}
        {!hideTooltip && !isLoading && (
          <ChartTooltip
            defaultIndex={tooltipDefaultIndex}
            content={
              <ChartTooltipContent
                selected={selectedDataKey}
                roundness={tooltipRoundness}
                variant={tooltipVariant}
              />
            }
          />
        )}
        {!isLoading &&
          Object.keys(chartConfig).map((dataKey) => {
            const _opacity = getOpacity(isClickable, selectedDataKey, dataKey);

            return (
              <Bar
                key={dataKey}
                dataKey={dataKey}
                stackId={isStacked ? "stack" : undefined}
                fill={`url(#${chartId}-colors-${dataKey})`}
                fillOpacity={_opacity}
                radius={radiusArr}
                style={isClickable ? { cursor: "pointer" } : undefined}
                onClick={() => {
                  if (!isClickable) return;
                  handleSelectionChange(selectedDataKey === dataKey ? null : dataKey);
                }}
              />
            );
          })}
        {isLoading && (
          <Bar
            dataKey={LOADING_BAR_DATA_KEY}
            fill="currentColor"
            fillOpacity={0.15}
            radius={radiusArr}
            isAnimationActive={false}
          />
        )}
        <defs>
          <HorizontalColorGradientStyle chartConfig={chartConfig} chartId={chartId} />
        </defs>
      </BarChart>
    </ChartContainer>
  );
}

const getOpacity = (isClickable: boolean, selectedDataKey: string | null, dataKey: string) => {
  if (!isClickable || selectedDataKey === null) return 1;
  return selectedDataKey === dataKey ? 1 : 0.3;
};

const HorizontalColorGradientStyle = ({ chartConfig, chartId }: { chartConfig: ChartConfig; chartId: string }) => (
  <>
    {Object.entries(chartConfig).map(([dataKey, config]) => {
      const colorsCount = getColorsCount(config);
      return (
        <linearGradient key={`${chartId}-colors-${dataKey}`} id={`${chartId}-colors-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
          {colorsCount === 1 ? (
            <>
              <stop offset="0%" stopColor={`var(--color-${dataKey}-0)`} />
              <stop offset="100%" stopColor={`var(--color-${dataKey}-0)`} />
            </>
          ) : (
            Array.from({ length: colorsCount }, (_, index) => (
              <stop key={index} offset={`${(index / (colorsCount - 1)) * 100}%`} stopColor={`var(--color-${dataKey}-${index}, var(--color-${dataKey}-0))`} />
            ))
          )}
        </linearGradient>
      );
    })}
  </>
);

function useLoadingData(isLoading: boolean, loadingPoints: number = 8) {
  const [loadingDataKey, setLoadingDataKey] = useState(false);
  const onShimmerExit = useCallback(() => {
    if (isLoading) setLoadingDataKey((prev) => !prev);
  }, [isLoading]);
  const loadingData = useMemo(
    () => getLoadingData(loadingPoints, 20, 80),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadingPoints, loadingDataKey],
  );
  return { loadingData, onShimmerExit };
}
