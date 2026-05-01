"use client";

import { Fragment, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export interface SpecRow {
  label: string;
  value: string | ReactNode;
  unit?: string;
  highlight?: boolean;
}

export interface SpecGroup {
  title: string;
  rows: SpecRow[];
}

export interface SpecTableProps extends HTMLAttributes<HTMLDivElement> {
  /** Ungrouped rows (use when no grouping needed). */
  rows?: SpecRow[];
  /** Grouped rows with section headings. */
  groups?: SpecGroup[];
  /** Title shown at top. */
  title?: string;
}

export const SpecTable = forwardRef<HTMLDivElement, SpecTableProps>(
  function SpecTable({ rows, groups, title, className, ...rest }, ref) {
    const renderRow = (row: SpecRow, i: number) => (
      <tr
        key={i}
        className={cn(
          "border-b border-[color:var(--s-border)]/40",
          row.highlight && "bg-[var(--s-primary-muted)]/30",
        )}
      >
        <td className="py-2.5 px-4 text-xs font-medium text-[var(--s-text-muted)] uppercase tracking-wider whitespace-nowrap">
          {row.label}
        </td>
        <td className="py-2.5 px-4 text-sm text-[var(--s-text)] font-medium">
          {typeof row.value === "string" ? (
            <span className="font-[family-name:var(--s-font-mono)] tabular-nums">
              {row.value}
              {row.unit && <span className="ml-1 text-xs text-[var(--s-text-muted)] font-normal">{row.unit}</span>}
            </span>
          ) : (
            row.value
          )}
        </td>
      </tr>
    );

    return (
      <div
        ref={ref}
        data-slot="spec-table"
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
        <table className="w-full border-collapse">
          <tbody>
            {rows && rows.map(renderRow)}
            {groups &&
              groups.map((group) => (
                <Fragment key={group.title}>
                  <tr key={`g-${group.title}`}>
                    <td
                      colSpan={2}
                      className="bg-[var(--s-surface-elevated)] px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--s-text-muted)]"
                    >
                      {group.title}
                    </td>
                  </tr>
                  {group.rows.map(renderRow)}
                </Fragment>
              ))}
          </tbody>
        </table>
      </div>
    );
  },
);
