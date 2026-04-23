"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface ComparisonFeature {
  name: string;
  values: Record<string, boolean | string>;
}

export interface ComparisonTableProps extends HTMLAttributes<HTMLDivElement> {
  /** Feature rows to compare. */
  features: ComparisonFeature[];
  /** Column names (keys matching the values in features). */
  columns: string[];
}

/** Feature comparison table. */
export const ComparisonTable = forwardRef<HTMLDivElement, ComparisonTableProps>(
  function ComparisonTable({ features, columns, className, ...rest }, ref) {
    return (
      <div ref={ref} data-slot="comparison-table" className={cn("w-full overflow-auto border border-[style:var(--s-border-style,solid)] border-[var(--s-border)] rounded-[var(--s-radius-md,6px)] shadow-[var(--s-shadow-sm)]", className)} {...rest}>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--s-border)]">
              <th className="text-left py-3 px-4 font-medium text-[var(--s-text-muted)]">Feature</th>
              {columns.map((col) => (
                <th key={col} className="text-center py-3 px-4 font-semibold text-[var(--s-text)]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr
                key={feature.name}
                className="border-b border-[var(--s-border)] hover:bg-[var(--s-surface-elevated)] transition-colors duration-[var(--s-duration-fast,150ms)]"
              >
                <td className="py-3 px-4 text-[var(--s-text)]">{feature.name}</td>
                {columns.map((col) => {
                  const val = feature.values[col];
                  return (
                    <td key={col} className="text-center py-3 px-4">
                      {typeof val === "boolean" ? (
                        val ? (
                          <span className="text-[var(--s-success)]" aria-label="Yes">&#10003;</span>
                        ) : (
                          <span className="text-[var(--s-text-muted)]" aria-label="No">&#8212;</span>
                        )
                      ) : (
                        <span className="text-[var(--s-text)]">{val}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);
