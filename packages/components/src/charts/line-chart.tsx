"use client";

import {
  type ChartConfig,
  ChartContainer,
  getColorsCount,
  getLoadingData,
  LoadingIndicator,
} from "./ui/chart";
import {
  CartesianGrid,
  Curve,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
  type CurveProps,
} from "recharts";
import {
  ChartTooltip,
  ChartTooltipContent,
  type TooltipRoundness,
  type TooltipVariant,
} from "./ui/tooltip";
import { EvilBrush, useEvilBrush, type EvilBrushRange } from "./ui/evil-brush";
import { ChartLegend, ChartLegendContent, type ChartLegendVariant } from "./ui/legend";
import { useCallback, useId, useMemo, useRef, useState, type ComponentProps } from "react";
import { ChartBackground, type BackgroundVariant } from "./ui/background";
import { ChartDot, type DotVariant } from "./ui/dot";
import { motion } from "motion/react";

const STROKE_WIDTH = 1;
const LOADING_LINE_DATA_KEY = "loading";
const LOADING_ANIMATION_DURATION = 2000;

type ChartProps = ComponentProps<typeof LineChart>;
type XAxisProps = ComponentProps<typeof XAxis>;
type YAxisProps = ComponentProps<typeof YAxis>;
type LineType = ComponentProps<typeof Line>["type"];
type StrokeVariant = "solid" | "dashed" | "animated-dashed";

type ValidateConfigKeys<TData, TConfig> = {
  [K in keyof TConfig]: K extends keyof TData ? ChartConfig[string] : never;
};

type NumericDataKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

type EvilLineChartProps<
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
  curveType?: LineType;
  strokeVariant?: StrokeVariant;
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
  glowingLines?: NumericDataKeys<TData>[];
  showBrush?: boolean;
  brushHeight?: number;
  brushFormatLabel?: (value: unknown, index: number) => string;
  onBrushChange?: (range: EvilBrushRange) => void;
  backgroundVariant?: BackgroundVariant;
  enableBufferLine?: boolean;
};

type EvilLineChartClickable = {
  isClickable: true;
  onSelectionChange?: (selectedDataKey: string | null) => void;
};

type EvilLineChartNotClickable = {
  isClickable?: false;
  onSelectionChange?: never;
};

type EvilLineChartPropsWithCallback<
  TData extends Record<string, unknown>,
  TConfig extends Record<string, ChartConfig[string]>,
> = EvilLineChartProps<TData, TConfig> & (EvilLineChartClickable | EvilLineChartNotClickable);

export function EvilLineChart<
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
  strokeVariant = "solid",
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
  glowingLines = [],
  showBrush = false,
  brushHeight,
  brushFormatLabel,
  onBrushChange,
  onSelectionChange,
  backgroundVariant,
  enableBufferLine = false,
}: EvilLineChartPropsWithCallback<TData, TConfig>) {
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
            variant="line"
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
      <LineChart
        id="evil-charts-line-chart"
        accessibilityLayer
        data={(isLoading ? loadingData : displayData) as Record<string, unknown>[]}
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
        {yDataKey && !isLoading && (
          <YAxis dataKey={yDataKey} tickLine={false} axisLine={false} tickMargin={8} minTickGap={tickGap} {...yAxisProps} />
        )}
        {!hideTooltip && !isLoading && (
          <ChartTooltip
            defaultIndex={tooltipDefaultIndex}
            cursor={
              hideCursorLine
                ? false
                : {
                    strokeDasharray:
                      strokeVariant === "dashed" || strokeVariant === "animated-dashed"
                        ? "3 3"
                        : undefined,
                    strokeWidth: STROKE_WIDTH,
                  }
            }
            content={
              <ChartTooltipContent selected={selectedDataKey} roundness={tooltipRoundness} variant={tooltipVariant} />
            }
          />
        )}
        {!isLoading &&
          Object.keys(chartConfig).map((dataKey) => {
            const _opacity = getOpacity(isClickable, selectedDataKey, dataKey);
            const hasSelection = selectedDataKey !== null;
            const isGlowing = glowingLines.includes(dataKey as NumericDataKeys<TData>);
            const filter = isGlowing ? `url(#${chartId}-line-glow-${dataKey})` : undefined;

            const dot = dotVariant ? (
              <ChartDot fillOpacity={_opacity.dot} type={dotVariant} dataKey={dataKey} chartId={chartId} />
            ) : false;
            const activeDot = activeDotVariant ? (
              <ChartDot fillOpacity={_opacity.dot} type={activeDotVariant} dataKey={dataKey} chartId={chartId} />
            ) : false;

            return (
              <g key={dataKey}>
                {isClickable && (
                  <Line
                    type={curveType}
                    dataKey={dataKey}
                    connectNulls={connectNulls}
                    stroke="transparent"
                    strokeWidth={15}
                    dot={false}
                    activeDot={false}
                    legendType="none"
                    tooltipType="none"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelectionChange(selectedDataKey === dataKey ? null : dataKey)}
                  />
                )}
                <Line
                  type={curveType}
                  dataKey={dataKey}
                  connectNulls={connectNulls}
                  strokeOpacity={_opacity.stroke}
                  stroke={`url(#${chartId}-colors-${dataKey})`}
                  filter={filter}
                  dot={dot}
                  activeDot={activeDot}
                  strokeWidth={STROKE_WIDTH}
                  strokeDasharray={getStrokeDasharray(enableBufferLine, strokeVariant)}
                  shape={enableBufferLine ? bufferLineShape : undefined}
                  style={isClickable ? { cursor: "pointer" } : undefined}
                  onClick={() => {
                    if (!isClickable) return;
                    setSelectedDataKey(selectedDataKey === dataKey ? null : dataKey);
                  }}
                >
                  {strokeVariant === "animated-dashed" && !hasSelection && <AnimatedDashedStyle />}
                </Line>
              </g>
            );
          })}
        {isLoading && (
          <Line
            type={curveType}
            dataKey={LOADING_LINE_DATA_KEY}
            min={0}
            max={100}
            stroke="currentColor"
            strokeOpacity={0.5}
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
          {isLoading && <LoadingLinePatternStyle chartId={chartId} onShimmerExit={onShimmerExit} />}
          <HorizontalColorGradientStyle chartConfig={chartConfig} chartId={chartId} />
          {glowingLines.length > 0 && (
            <GlowFilterStyle chartId={chartId} glowingLines={glowingLines as string[]} />
          )}
        </defs>
      </LineChart>
    </ChartContainer>
  );
}

type CurvePoint = NonNullable<NonNullable<CurveProps["points"]>[number]>;
type DrawableCurvePoint = CurvePoint & { x: number; y: number };

const isDrawableCurvePoint = (point: CurvePoint): point is DrawableCurvePoint =>
  typeof point.x === "number" && typeof point.y === "number";

const BUFFER_DASH_SIZE = 4;
const BUFFER_GAP_SIZE = 3;

const findLengthAtX = (path: SVGPathElement, totalLength: number, targetX: number): number => {
  let lo = 0;
  let hi = totalLength;
  while (hi - lo > 0.5) {
    const mid = (lo + hi) / 2;
    const pt = path.getPointAtLength(mid);
    if (pt.x < targetX) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
};

const bufferLineShape = (props: CurveProps) => {
  const { points, ...rest } = props;
  if (!points || points.length < 2) return <Curve {...props} />;
  const drawablePoints = points.filter(isDrawableCurvePoint);
  if (drawablePoints.length < 2) return <Curve {...props} />;
  const splitX = drawablePoints[drawablePoints.length - 2].x;

  const gRef = (g: SVGGElement | null) => {
    if (!g) return;
    const path = g.querySelector("path");
    if (!path) return;
    const totalLength = path.getTotalLength();
    const solidLength = findLengthAtX(path, totalLength, splitX);
    const lastSegmentLength = totalLength - solidLength;
    const reps = Math.ceil(lastSegmentLength / (BUFFER_DASH_SIZE + BUFFER_GAP_SIZE)) + 1;
    const dashedPart = Array.from({ length: reps }, () => `${BUFFER_DASH_SIZE} ${BUFFER_GAP_SIZE}`).join(" ");
    path.setAttribute("stroke-dasharray", `${solidLength} 0 ${dashedPart}`);
  };

  return (
    <g ref={gRef}>
      <Curve {...rest} points={drawablePoints} />
    </g>
  );
};

const getOpacity = (isClickable: boolean, selectedDataKey: string | null, dataKey: string) => {
  if (!isClickable || selectedDataKey === null) return { stroke: 1, dot: 1 };
  return selectedDataKey === dataKey ? { stroke: 1, dot: 1 } : { stroke: 0.3, dot: 0.3 };
};

const getStrokeDasharray = (enableBufferLine: boolean, strokeVariant: StrokeVariant) => {
  if (enableBufferLine) return undefined;
  if (strokeVariant === "dashed" || strokeVariant === "animated-dashed") return "5 5";
  return undefined;
};

const AnimatedDashedStyle = () => (
  <>
    <animate attributeName="stroke-dasharray" values="5 5; 0 5; 5 5" dur="1s" repeatCount="indefinite" keyTimes="0;0.5;1" />
    <animate attributeName="stroke-dashoffset" values="0; -10" dur="1s" repeatCount="indefinite" keyTimes="0;1" />
  </>
);

const HorizontalColorGradientStyle = ({ chartConfig, chartId }: { chartConfig: ChartConfig; chartId: string }) => (
  <>
    {Object.entries(chartConfig).map(([dataKey, config]) => {
      const colorsCount = getColorsCount(config);
      return (
        <linearGradient key={`${chartId}-colors-${dataKey}`} id={`${chartId}-colors-${dataKey}`} x1="0" y1="0" x2="1" y2="0">
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

const GlowFilterStyle = ({ chartId, glowingLines }: { chartId: string; glowingLines: string[] }) => (
  <>
    {glowingLines.map((dataKey) => (
      <filter key={`${chartId}-line-glow-${dataKey}`} id={`${chartId}-line-glow-${dataKey}`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 0" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
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

export function useLoadingData(isLoading: boolean, loadingPoints: number = 14) {
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

const LoadingLinePatternStyle = ({ chartId, onShimmerExit }: { chartId: string; onShimmerExit: () => void }) => {
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
      <pattern
        id={`${chartId}-loading-mask-pattern`}
        patternUnits="objectBoundingBox"
        patternContentUnits="objectBoundingBox"
        patternTransform="rotate(25)"
        width={patternWidth}
        height="1"
        x="0"
        y="0"
      >
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
