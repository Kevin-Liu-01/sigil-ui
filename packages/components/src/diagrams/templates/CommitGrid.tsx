"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface CommitDay {
  date: string;
  count: number;
}

export interface CommitGridProps extends HTMLAttributes<HTMLDivElement> {
  data: CommitDay[];
  /** Number of weeks to show. @default 52 */
  weeks?: number;
  /** Size of each cell in px. @default 12 */
  cellSize?: number;
  /** Gap between cells in px. @default 2 */
  gap?: number;
  /** Color for filled cells. @default "var(--s-success, #22c55e)" */
  color?: string;
  /** Day labels on left side. @default true */
  showDayLabels?: boolean;
  /** Month labels on top. @default true */
  showMonthLabels?: boolean;
}

const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function intensityLevel(count: number, max: number): number {
  if (count === 0) return 0;
  if (max === 0) return 0;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

export const CommitGrid = forwardRef<HTMLDivElement, CommitGridProps>(
  function CommitGrid(
    { data, weeks = 52, cellSize = 12, gap = 2, color, showDayLabels = true, showMonthLabels = true, className, ...rest },
    ref,
  ) {
    const totalDays = weeks * 7;
    const dayMap = new Map(data.map((d) => [d.date, d.count]));
    const maxCount = Math.max(...data.map((d) => d.count), 1);

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - totalDays + 1);
    const startDayOfWeek = startDate.getDay();

    const grid: { date: string; count: number; dayOfWeek: number; month: number }[][] = [];
    let currentWeek: { date: string; count: number; dayOfWeek: number; month: number }[] = [];

    for (let i = 0; i < totalDays + startDayOfWeek; i++) {
      if (i < startDayOfWeek) {
        currentWeek.push({ date: "", count: -1, dayOfWeek: i % 7, month: -1 });
      } else {
        const d = new Date(startDate);
        d.setDate(d.getDate() + (i - startDayOfWeek));
        const dateStr = d.toISOString().split("T")[0];
        currentWeek.push({
          date: dateStr,
          count: dayMap.get(dateStr) ?? 0,
          dayOfWeek: d.getDay(),
          month: d.getMonth(),
        });
      }

      if (currentWeek.length === 7) {
        grid.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) grid.push(currentWeek);

    const opacityLevels = [0.06, 0.3, 0.5, 0.7, 0.95];

    return (
      <div
        ref={ref}
        data-slot="commit-grid"
        className={cn("inline-flex flex-col gap-1", className)}
        {...rest}
      >
        {showMonthLabels && (
          <div className="flex" style={{ paddingLeft: showDayLabels ? 28 : 0 }}>
            {grid.map((week, wi) => {
              const firstValid = week.find((d) => d.month >= 0);
              const prevWeek = grid[wi - 1];
              const prevMonth = prevWeek?.find((d) => d.month >= 0)?.month;
              const showLabel = firstValid && (wi === 0 || firstValid.month !== prevMonth);
              return (
                <div key={wi} className="text-[9px] text-[var(--s-text-muted)] font-[family-name:var(--s-font-mono)]" style={{ width: cellSize + gap, minWidth: cellSize + gap }}>
                  {showLabel ? monthNames[firstValid!.month] : ""}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex gap-0">
          {showDayLabels && (
            <div className="flex flex-col shrink-0 pr-1" style={{ gap }}>
              {dayLabels.map((label, i) => (
                <div
                  key={i}
                  className="text-[9px] text-[var(--s-text-muted)] font-[family-name:var(--s-font-mono)] flex items-center justify-end"
                  style={{ height: cellSize, width: 24 }}
                >
                  {label}
                </div>
              ))}
            </div>
          )}

          <div className="flex" style={{ gap }}>
            {grid.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap }}>
                {week.map((day, di) => {
                  if (day.count < 0) {
                    return <div key={di} style={{ width: cellSize, height: cellSize }} />;
                  }
                  const level = intensityLevel(day.count, maxCount);
                  return (
                    <div
                      key={di}
                      className="rounded-[1px]"
                      style={{
                        width: cellSize,
                        height: cellSize,
                        backgroundColor: color ?? "var(--s-success, #22c55e)",
                        opacity: opacityLevels[level],
                      }}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
