"use client";

import { Fragment, forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface PricingFeature {
  name: string;
  values: Record<string, boolean | string>;
}

export interface PricingColumn {
  name: string;
  price: string;
  period?: string;
  badge?: string;
  highlighted?: boolean;
}

export interface PricingTableProps extends HTMLAttributes<HTMLDivElement> {
  columns: PricingColumn[];
  features: PricingFeature[];
  /** Category headers group features visually. */
  categories?: { label: string; startIndex: number }[];
}

export const PricingTable = forwardRef<HTMLDivElement, PricingTableProps>(
  function PricingTable({ columns, features, categories, className, ...rest }, ref) {
    const catMap = new Map<number, string>();
    if (categories) {
      for (const cat of categories) catMap.set(cat.startIndex, cat.label);
    }

    return (
      <div
        ref={ref}
        data-slot="pricing-table"
        className={cn(
          "w-full overflow-auto rounded-[var(--s-radius-card,0px)] border border-[style:var(--s-border-style,solid)] border-[var(--s-border)] shadow-[var(--s-shadow-sm)]",
          className,
        )}
        {...rest}
      >
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--s-border)]">
              <th className="text-left py-4 px-4 font-medium text-[var(--s-text-muted)] min-w-[180px]" />
              {columns.map((col) => (
                <th
                  key={col.name}
                  className={cn(
                    "text-center py-4 px-4 min-w-[140px]",
                    col.highlighted && "bg-[var(--s-primary-muted)]",
                  )}
                >
                  <div className="flex flex-col items-center gap-1">
                    {col.badge && (
                      <span className="inline-block rounded-[var(--s-radius-full,9999px)] bg-[var(--s-primary)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--s-primary-contrast,#fff)]">
                        {col.badge}
                      </span>
                    )}
                    <span className="font-semibold text-[var(--s-text)]">{col.name}</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-xl font-bold text-[var(--s-text)] tabular-nums font-[family-name:var(--s-font-mono)]">
                        {col.price}
                      </span>
                      {col.period && (
                        <span className="text-xs text-[var(--s-text-muted)]">/{col.period}</span>
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, fi) => (
              <Fragment key={feature.name}>
                {catMap.has(fi) && (
                  <tr key={`cat-${fi}`}>
                    <td
                      colSpan={columns.length + 1}
                      className="bg-[var(--s-surface-elevated)] px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--s-text-muted)]"
                    >
                      {catMap.get(fi)}
                    </td>
                  </tr>
                )}
                <tr
                  key={feature.name}
                  className="border-b border-[var(--s-border)]/40 hover:bg-[var(--s-surface-elevated)] transition-colors duration-[var(--s-duration-fast,150ms)]"
                >
                  <td className="py-3 px-4 text-[var(--s-text)]">{feature.name}</td>
                  {columns.map((col) => {
                    const val = feature.values[col.name];
                    return (
                      <td
                        key={col.name}
                        className={cn(
                          "text-center py-3 px-4",
                          col.highlighted && "bg-[var(--s-primary-muted)]/30",
                        )}
                      >
                        {typeof val === "boolean" ? (
                          val ? (
                            <span className="text-[var(--s-success)]" aria-label="Included">&#10003;</span>
                          ) : (
                            <span className="text-[var(--s-text-muted)]" aria-label="Not included">&#8212;</span>
                          )
                        ) : (
                          <span className="text-[var(--s-text)] font-medium">{val}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);
