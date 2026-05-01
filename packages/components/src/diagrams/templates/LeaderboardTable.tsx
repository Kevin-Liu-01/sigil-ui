"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface LeaderboardRow {
  rank?: number;
  label: string;
  value: string | number;
  delta?: string;
  icon?: ReactNode;
  highlight?: boolean;
}

export interface LeaderboardTableProps extends HTMLAttributes<HTMLDivElement> {
  rows: LeaderboardRow[];
  valueLabel?: string;
  title?: string;
  /** Show medal icons for top 3. @default true */
  showMedals?: boolean;
}

const medals = ["🥇", "🥈", "🥉"];

export const LeaderboardTable = forwardRef<HTMLDivElement, LeaderboardTableProps>(
  function LeaderboardTable({ rows, valueLabel = "Score", title, showMedals = true, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="leaderboard-table"
        className={cn(
          "w-full rounded-[var(--s-radius-card,0px)] border border-[style:var(--s-border-style,solid)] border-[color:var(--s-border)] bg-[var(--s-surface)] overflow-hidden shadow-[var(--s-shadow-sm)]",
          className,
        )}
        {...rest}
      >
        {title && (
          <div className="border-b border-[color:var(--s-border)] px-4 py-3">
            <h3 className="text-sm font-semibold text-[var(--s-text)]">{title}</h3>
          </div>
        )}
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[color:var(--s-border)]">
              <th className="w-12 py-2.5 px-3 text-center font-medium text-[var(--s-text-muted)]">#</th>
              <th className="text-left py-2.5 px-4 font-medium text-[var(--s-text-muted)]">Name</th>
              <th className="text-right py-2.5 px-4 font-medium text-[var(--s-text-muted)]">{valueLabel}</th>
              <th className="w-16 py-2.5 px-3 text-right font-medium text-[var(--s-text-muted)]">Δ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const rank = row.rank ?? i + 1;
              const isTop3 = rank <= 3;
              return (
                <tr
                  key={row.label}
                  className={cn(
                    "border-b border-[color:var(--s-border)]/40 transition-colors duration-[var(--s-duration-fast,150ms)]",
                    row.highlight
                      ? "bg-[var(--s-primary-muted)]/30"
                      : "hover:bg-[var(--s-surface-elevated)]",
                  )}
                >
                  <td className="py-3 px-3 text-center">
                    {showMedals && isTop3 ? (
                      <span className="text-sm">{medals[rank - 1]}</span>
                    ) : (
                      <span className="font-[family-name:var(--s-font-mono)] text-xs tabular-nums text-[var(--s-text-muted)]">
                        {rank}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {row.icon && <span className="[&_svg]:size-4 shrink-0">{row.icon}</span>}
                      <span className={cn("font-medium", isTop3 ? "text-[var(--s-text)]" : "text-[var(--s-text)]")}>
                        {row.label}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-[family-name:var(--s-font-mono)] font-semibold tabular-nums text-[var(--s-text)]">
                    {row.value}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {row.delta && (
                      <span
                        className={cn(
                          "font-[family-name:var(--s-font-mono)] text-xs tabular-nums",
                          row.delta.startsWith("+") || row.delta.startsWith("↑")
                            ? "text-[var(--s-success)]"
                            : row.delta.startsWith("-") || row.delta.startsWith("↓")
                              ? "text-[var(--s-error)]"
                              : "text-[var(--s-text-muted)]",
                        )}
                      >
                        {row.delta}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
);
