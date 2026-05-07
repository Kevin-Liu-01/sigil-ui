"use client";

import {
  axisValueToPercentFormatter,
  type ChartConfig,
  ChartContainer,
  getColorsCount,
  getLoadingData,
  LoadingIndicator,
} from "./ui/chart";
import { EvilBrush, useEvilBrush, type EvilBrushRange } from "./ui/evil-brush";
import { ChartLegend, ChartLegendContent, type ChartLegendVariant } from "./ui/legend";
import { useCallback, useId, useMemo, useRef, useState, type ComponentProps } from "react";
import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";
import { ChartBackground, type BackgroundVariant } from "./ui/background";
import { ChartTooltip, ChartTooltipContent, type TooltipRoundness, type TooltipVariant } from "./ui/tooltip";
import { ChartDot, type DotVariant } from "./ui/dot";
import { motion } from "motion/react";

const STROKE_WIDTH = 0.8;
const LOADING_AREA_DATA_KEY = "loading";
const LOADING_ANIMATION_DURATION = 2000;

type ChartProps = ComponentProps<typeof AreaChart>;
type XAxisProps = ComponentProps<typeof XAxis>;
type YAxisProps = ComponentProps<typeof YAxis>;
type AreaType = ComponentProps<typeof Area>["type"];
type AreaVariant = "gradient" | "gradient-reverse" | "solid" | "dotted" | "lines" | "hatched";
type StrokeVariant = "solid" | "dashed" | "animated-dashed";
type StackType = "default" | "expanded" | "stacked";

type ValidateConfigKeys<TData, TConfig> = {
  [K in keyof TConfig]: K extends keyof TData ? ChartConfig[string] : never;
};

type BaseEvilAreaChartProps<
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
  curveType?: AreaType;
  areaVariant?: AreaVariant;
  strokeVariant?: StrokeVariant;
  stackType?: StackType;
  dotVariant?: DotVariant;
  activeDotVariant?: DotVariant;
  legendVariant?: ChartLegendVariant;
  connectNulls?: boolean;
  tickGap?: number;
  hideTooltip?: boolean;
  hideCartesianGrid?: boolean;
  hideLegend?: boolean;
  hideCursorLine?: boolean;
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

type EvilAreaChartClickable = {
  isClickable: true;
  onSelectionChange?: (selectedDataKey: string | null) => void;
};

type EvilAreaChartNotClickable = {
  isClickable?: false;
  onSelectionChange?: never;
};

type EvilAreaChartProps<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>,
> = BaseEvilAreaChartProps<TData, TConfig> & (EvilAreaChartClickable | EvilAreaChartNotClickable);

export function EvilAreaChart<
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
  curveType = "linear",
  areaVariant = "gradient",
  strokeVariant = "dashed",
  stackType = "default",
  dotVariant,
  activeDotVariant,
  legendVariant,
  connectNulls = false,
  tickGap = 8,
  hideTooltip = false,
  hideCartesianGrid = false,
  hideLegend = false,
  hideCursorLine = false,
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
}: EvilAreaChartProps<TData, TConfig>) {
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

  const isExpanded = stackType === "expanded";
  const isStacked = stackType === "stacked" || stackType === "expanded";

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
            variant="area"
            curveType={curveType as string}
            strokeVariant={strokeVariant}
            connectNulls={connectNulls}
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
      <AreaChart
        accessibilityLayer
        data={(isLoading ? loadingData : displayData) as Record<string, unknown>[]}
        stackOffset={isExpanded ? "expand" : undefined}
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
          <XAxis dataKey={xDataKey} tickLine={false} axisLine={false} tickMargin={8} minTickGap={tickGap} {...xAxisProps} />
        )}
        {!isLoading && (
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={tickGap}
            tickFormatter={isExpanded ? axisValueToPercentFormatter : undefined}
            {...yAxisProps}
          />
        )}
        {!hideTooltip && !isLoading && (
          <ChartTooltip
            defaultIndex={tooltipDefaultIndex}
            cursor={hideCursorLine ? false : { strokeDasharray: strokeVariant === "dashed" || strokeVariant === "animated-dashed" ? "3 3" : undefined, strokeWidth: STROKE_WIDTH }}
            content={<ChartTooltipContent selected={selectedDataKey} roundness={tooltipRoundness} variant={tooltipVariant} />}
          />
        )}
        {!isLoading &&
          Object.keys(chartConfig).map((dataKey) => {
            const _opacity = getOpacity(isClickable, selectedDataKey, dataKey);
            const hasSelection = selectedDataKey !== null;

            const dot = dotVariant ? (
              <ChartDot fillOpacity={_opacity.dot} type={dotVariant} dataKey={dataKey} chartId={chartId} />
            ) : false;
            const activeDot = activeDotVariant ? (
              <ChartDot fillOpacity={_opacity.dot} type={activeDotVariant} dataKey={dataKey} chartId={chartId} />
            ) : false;

            const fillPattern = getFillPattern(chartId, dataKey, areaVariant, isClickable, selectedDataKey);

            return (
              <Area
                key={dataKey}
                type={curveType}
                dataKey={dataKey}
                stackId={isStacked ? "stack" : undefined}
                connectNulls={connectNulls}
                stroke={`url(#${chartId}-colors-${dataKey})`}
                strokeOpacity={_opacity.stroke}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={getStrokeDasharray(strokeVariant)}
                fill={fillPattern}
                fillOpacity={_opacity.fill}
                dot={dot}
                activeDot={activeDot}
                style={isClickable ? { cursor: "pointer" } : undefined}
                onClick={() => {
                  if (!isClickable) return;
                  handleSelectionChange(selectedDataKey === dataKey ? null : dataKey);
                }}
              >
                {strokeVariant === "animated-dashed" && !hasSelection && <AnimatedDashedStyle />}
              </Area>
            );
          })}
        {isLoading && (
          <Area
            type={curveType}
            dataKey={LOADING_AREA_DATA_KEY}
            stroke="currentColor"
            strokeOpacity={0.3}
            fill="currentColor"
            fillOpacity={0.05}
            isAnimationActive={false}
            legendType="none"
            tooltipType="none"
            activeDot={false}
            dot={false}
            strokeWidth={STROKE_WIDTH}
            style={{ mask: `url(#${chartId}-loading-mask)` }}
          />
        )}
        <defs>
          {isLoading && <LoadingAreaPatternStyle chartId={chartId} onShimmerExit={onShimmerExit} />}
          <HorizontalColorGradientStyle chartConfig={chartConfig} chartId={chartId} isExpanded={isExpanded} />
          <LinearGradientStyle chartConfig={chartConfig} chartId={chartId} />
        </defs>
      </AreaChart>
    </ChartContainer>
  );
}

const getOpacity = (isClickable: boolean, selectedDataKey: string | null, dataKey: string) => {
  if (!isClickable || selectedDataKey === null) return { stroke: 1, dot: 1, fill: 1 };
  return selectedDataKey === dataKey
    ? { stroke: 1, dot: 1, fill: 1 }
    : { stroke: 0.3, dot: 0.3, fill: 0.1 };
};

const getStrokeDasharray = (strokeVariant: StrokeVariant) => {
  if (strokeVariant === "dashed" || strokeVariant === "animated-dashed") return "5 5";
  return undefined;
};

const getFillPattern = (chartId: string, dataKey: string, areaVariant: AreaVariant, isClickable: boolean, selectedDataKey: string | null) => {
  if (isClickable && selectedDataKey !== null && selectedDataKey !== dataKey) {
    return `url(#${chartId}-gradient-${dataKey})`;
  }
  switch (areaVariant) {
    case "gradient": return `url(#${chartId}-gradient-${dataKey})`;
    case "gradient-reverse": return `url(#${chartId}-gradient-${dataKey})`;
    case "solid": return `url(#${chartId}-colors-${dataKey})`;
    case "dotted": return `url(#${chartId}-colors-${dataKey})`;
    case "lines": return `url(#${chartId}-colors-${dataKey})`;
    case "hatched": return `url(#${chartId}-colors-${dataKey})`;
    default: return `url(#${chartId}-gradient-${dataKey})`;
  }
};

const AnimatedDashedStyle = () => (
  <>
    <animate attributeName="stroke-dasharray" values="5 5; 0 5; 5 5" dur="1s" repeatCount="indefinite" keyTimes="0;0.5;1" />
    <animate attributeName="stroke-dashoffset" values="0; -10" dur="1s" repeatCount="indefinite" keyTimes="0;1" />
  </>
);

const HorizontalColorGradientStyle = ({ chartConfig, chartId, isExpanded }: { chartConfig: ChartConfig; chartId: string; isExpanded: boolean }) => (
  <>
    {Object.entries(chartConfig).map(([dataKey, config]) => {
      const colorsCount = getColorsCount(config);
      return (
        <linearGradient
          key={`${chartId}-colors-${dataKey}`}
          id={`${chartId}-colors-${dataKey}`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits={isExpanded ? "userSpaceOnUse" : "objectBoundingBox"}
        >
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

const LinearGradientStyle = ({ chartConfig, chartId }: { chartConfig: ChartConfig; chartId: string }) => (
  <>
    <linearGradient id={`${chartId}-vertical-fade`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="white" stopOpacity={0.1} />
      <stop offset="100%" stopColor="white" stopOpacity={0} />
    </linearGradient>
    {Object.keys(chartConfig).map((dataKey) => (
      <g key={`${chartId}-gradient-group-${dataKey}`}>
        <mask id={`${chartId}-gradient-mask-${dataKey}`}>
          <rect width="100%" height="100%" fill={`url(#${chartId}-vertical-fade)`} />
        </mask>
        <pattern id={`${chartId}-gradient-${dataKey}`} patternUnits="userSpaceOnUse" width="100%" height="100%">
          <rect width="100%" height="100%" fill={`url(#${chartId}-colors-${dataKey})`} mask={`url(#${chartId}-gradient-mask-${dataKey})`} />
        </pattern>
      </g>
    ))}
  </>
);

const generateEasedGradientStops = (steps: number = 17, minOpacity: number = 0.05, maxOpacity: number = 0.9) =>
  Array.from({ length: steps }, (_, i) => {
    const t = i / (steps - 1);
    const eased = Math.sin(t * Math.PI) ** 2;
    const opacity = minOpacity + eased * (maxOpacity - minOpacity);
    return { offset: `${(t * 100).toFixed(0)}%`, opacity: Number(opacity.toFixed(3)) };
  });

function useLoadingData(isLoading: boolean, loadingPoints: number = 14) {
  const [loadingDataKey, setLoadingDataKey] = useState(false);
  const onShimmerExit = useCallback(() => {
    if (isLoading) setLoadingDataKey((prev) => !prev);
  }, [isLoading]);
  const loadingData = useMemo(
    () => getLoadingData(loadingPoints),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadingPoints, loadingDataKey],
  );
  return { loadingData, onShimmerExit };
}

const LoadingAreaPatternStyle = ({ chartId, onShimmerExit }: { chartId: string; onShimmerExit: () => void }) => {
  const gradientStops = generateEasedGradientStops();
  const patternWidth = 3;
  const startX = -1;
  const endX = 2;
  const lastXRef = useRef(startX);

  return (
    <>
      <linearGradient id={`${chartId}-loading-mask-gradient`} x1="0" y1="0" x2="1" y2="0">
        {gradientStops.map(({ offset, opacity }) => (
          <stop key={offset} offset={offset} stopColor="white" stopOpacity={opacity} />
        ))}
      </linearGradient>
      <pattern id={`${chartId}-loading-mask-pattern`} patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" patternTransform="rotate(25)" width={patternWidth} height="1" x="0" y="0">
        <motion.rect
          y="0"
          width="1"
          height="1"
          fill={`url(#${chartId}-loading-mask-gradient)`}
          initial={{ x: startX }}
          animate={{ x: endX }}
          transition={{ duration: LOADING_ANIMATION_DURATION / 1000, ease: "linear", repeat: Infinity, repeatType: "loop" }}
          onUpdate={(latest) => {
            const xValue = typeof latest.x === "number" ? latest.x : startX;
            const lastX = lastXRef.current;
            if (xValue >= 1 && lastX < 1) onShimmerExit();
            lastXRef.current = xValue;
          }}
        />
      </pattern>
      <mask id={`${chartId}-loading-mask`} maskUnits="userSpaceOnUse">
        <rect width="100%" height="100%" fill={`url(#${chartId}-loading-mask-pattern)`} />
      </mask>
    </>
  );
};
