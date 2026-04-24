"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface GanttTask {
  id: string;
  label: string;
  start: number;
  end: number;
  color?: string;
  milestone?: boolean;
}

export interface GanttGroup {
  label: string;
  tasks: GanttTask[];
}

export interface GanttChartProps extends HTMLAttributes<HTMLDivElement> {
  groups: GanttGroup[];
  /** Total number of time units on the x-axis. */
  totalUnits: number;
  /** Labels for x-axis columns (e.g. week names, sprint names). */
  unitLabels?: string[];
  /** Unit label shown in header. @default "Sprint" */
  unitName?: string;
}

export const GanttChart = forwardRef<HTMLDivElement, GanttChartProps>(
  function GanttChart({ groups, totalUnits, unitLabels, unitName = "Sprint", className, ...rest }, ref) {
    const cols = Array.from({ length: totalUnits }, (_, i) => unitLabels?.[i] ?? `${i + 1}`);

    return (
      <div
        ref={ref}
        data-slot="gantt-chart"
        className={cn(
          "w-full overflow-auto rounded-[var(--s-radius-card,0px)] border border-[var(--s-border)] bg-[var(--s-surface)]",
          className,
        )}
        {...rest}
      >
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-[var(--s-border)]">
              <th className="sticky left-0 z-10 bg-[var(--s-surface)] px-3 py-2 text-left font-medium text-[var(--s-text-muted)] min-w-[140px]">
                Task
              </th>
              {cols.map((label, i) => (
                <th
                  key={i}
                  className="px-1 py-2 text-center font-medium text-[var(--s-text-muted)] min-w-[48px]"
                >
                  <span className="text-[10px] uppercase tracking-wider opacity-60">{unitName}</span>
                  <br />
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <>
                <tr key={`g-${group.label}`}>
                  <td
                    colSpan={totalUnits + 1}
                    className="bg-[var(--s-surface-elevated)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--s-text-muted)]"
                  >
                    {group.label}
                  </td>
                </tr>
                {group.tasks.map((task) => (
                  <tr key={task.id} className="border-b border-[var(--s-border)]/40">
                    <td className="sticky left-0 z-10 bg-[var(--s-surface)] px-3 py-2 text-[var(--s-text)] font-medium whitespace-nowrap">
                      {task.label}
                    </td>
                    {cols.map((_, ci) => {
                      const inRange = ci >= task.start && ci < task.end;
                      const isFirst = ci === task.start;
                      const isLast = ci === task.end - 1;
                      return (
                        <td key={ci} className="px-0.5 py-2">
                          {inRange ? (
                            task.milestone ? (
                              <div className="mx-auto h-4 w-4 rotate-45 bg-[var(--s-primary)]" />
                            ) : (
                              <div
                                className={cn(
                                  "h-5",
                                  isFirst && "rounded-l-[var(--s-radius-sm,2px)]",
                                  isLast && "rounded-r-[var(--s-radius-sm,2px)]",
                                )}
                                style={{ backgroundColor: task.color ?? "var(--s-primary)", opacity: 0.75 }}
                              />
                            )
                          ) : (
                            <div className="h-5" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);
