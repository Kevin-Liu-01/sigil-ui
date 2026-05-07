"use client";

import * as React from "react";
import { cn } from "../../utils";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { type ChartConfig, getColorsCount } from "./chart";

export type EvilBrushRange = { startIndex: number; endIndex: number };

type BrushVariant = "line" | "area" | "bar";

interface EvilBrushProps {
  data: Record<string, unknown>[];
  chartConfig: ChartConfig;
  xDataKey?: string;
  variant?: BrushVariant;
  curveType?: string;
  strokeVariant?: string;
  connectNulls?: boolean;
  height?: number;
  formatLabel?: (value: unknown, index: number) => string;
  skipStyle?: boolean;
  className?: string;
  startIndex: number;
  endIndex: number;
  onChange: (range: EvilBrushRange) => void;
}

function EvilBrush({
  data,
  chartConfig,
  xDataKey,
  variant = "line",
  height = 40,
  className,
  startIndex,
  endIndex,
  onChange,
}: EvilBrushProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef<"start" | "end" | "range" | null>(null);
  const dragStartX = React.useRef(0);
  const dragStartRange = React.useRef({ startIndex, endIndex });

  const totalPoints = data.length;
  const startPercent = (startIndex / Math.max(totalPoints - 1, 1)) * 100;
  const endPercent = (endIndex / Math.max(totalPoints - 1, 1)) * 100;

  const getIndexFromX = React.useCallback(
    (clientX: number) => {
      if (!containerRef.current) return 0;
      const rect = containerRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(percent * (totalPoints - 1));
    },
    [totalPoints],
  );

  React.useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const currentIndex = getIndexFromX(e.clientX);

      if (isDragging.current === "start") {
        onChange({ startIndex: Math.min(currentIndex, endIndex - 1), endIndex });
      } else if (isDragging.current === "end") {
        onChange({ startIndex, endIndex: Math.max(currentIndex, startIndex + 1) });
      } else if (isDragging.current === "range") {
        const dx = e.clientX - dragStartX.current;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const indexDelta = Math.round((dx / rect.width) * (totalPoints - 1));
        const newStart = Math.max(0, Math.min(totalPoints - (dragStartRange.current.endIndex - dragStartRange.current.startIndex) - 1, dragStartRange.current.startIndex + indexDelta));
        const rangeSize = dragStartRange.current.endIndex - dragStartRange.current.startIndex;
        onChange({ startIndex: newStart, endIndex: newStart + rangeSize });
      }
    };

    const handleUp = () => {
      isDragging.current = null;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [getIndexFromX, onChange, startIndex, endIndex, totalPoints]);

  const dataKeys = Object.keys(chartConfig);

  return (
    <div ref={containerRef} className={cn("relative w-full select-none", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {variant === "area" ? (
          <AreaChart data={data}>
            {dataKeys.map((key) => (
              <Area key={key} type="monotone" dataKey={key} stroke={`var(--color-${key}-0, currentColor)`} fill={`var(--color-${key}-0, currentColor)`} fillOpacity={0.1} strokeWidth={1} dot={false} />
            ))}
            {xDataKey && <XAxis dataKey={xDataKey} hide />}
          </AreaChart>
        ) : variant === "bar" ? (
          <BarChart data={data}>
            {dataKeys.map((key) => (
              <Bar key={key} dataKey={key} fill={`var(--color-${key}-0, currentColor)`} fillOpacity={0.3} />
            ))}
            {xDataKey && <XAxis dataKey={xDataKey} hide />}
          </BarChart>
        ) : (
          <LineChart data={data}>
            {dataKeys.map((key) => (
              <Line key={key} type="monotone" dataKey={key} stroke={`var(--color-${key}-0, currentColor)`} strokeWidth={1} dot={false} />
            ))}
            {xDataKey && <XAxis dataKey={xDataKey} hide />}
          </LineChart>
        )}
      </ResponsiveContainer>
      {/* Overlay mask for unselected regions */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-background/60 absolute inset-y-0 left-0" style={{ width: `${startPercent}%` }} />
        <div className="bg-background/60 absolute inset-y-0 right-0" style={{ width: `${100 - endPercent}%` }} />
      </div>
      {/* Drag handles */}
      <div
        className="absolute inset-y-0 w-1.5 cursor-col-resize rounded-sm bg-current opacity-40 hover:opacity-70"
        style={{ left: `${startPercent}%`, transform: "translateX(-50%)" }}
        onMouseDown={(e) => { isDragging.current = "start"; e.preventDefault(); }}
      />
      <div
        className="absolute inset-y-0 w-1.5 cursor-col-resize rounded-sm bg-current opacity-40 hover:opacity-70"
        style={{ left: `${endPercent}%`, transform: "translateX(-50%)" }}
        onMouseDown={(e) => { isDragging.current = "end"; e.preventDefault(); }}
      />
      {/* Draggable range center */}
      <div
        className="absolute inset-y-0 cursor-grab active:cursor-grabbing"
        style={{ left: `${startPercent}%`, width: `${endPercent - startPercent}%` }}
        onMouseDown={(e) => {
          isDragging.current = "range";
          dragStartX.current = e.clientX;
          dragStartRange.current = { startIndex, endIndex };
          e.preventDefault();
        }}
      />
    </div>
  );
}

function useEvilBrush<T>({ data }: { data: T[] }) {
  const [range, setRange] = React.useState<EvilBrushRange>({
    startIndex: 0,
    endIndex: Math.max(data.length - 1, 0),
  });

  React.useEffect(() => {
    setRange({ startIndex: 0, endIndex: Math.max(data.length - 1, 0) });
  }, [data.length]);

  const visibleData = React.useMemo(
    () => data.slice(range.startIndex, range.endIndex + 1),
    [data, range.startIndex, range.endIndex],
  );

  const brushProps = {
    startIndex: range.startIndex,
    endIndex: range.endIndex,
    onChange: setRange,
  };

  return { visibleData, brushProps };
}

export { EvilBrush, useEvilBrush };
