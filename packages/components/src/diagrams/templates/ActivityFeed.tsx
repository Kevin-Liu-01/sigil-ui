"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export type ActivityEntryVariant = "default" | "success" | "warning" | "error" | "info";

export interface ActivityEntry {
  id: string;
  icon?: ReactNode;
  title: string;
  description?: string;
  timestamp: string;
  variant?: ActivityEntryVariant;
}

export interface ActivityFeedProps extends HTMLAttributes<HTMLDivElement> {
  entries: ActivityEntry[];
  /** Maximum entries to show before truncating. */
  maxEntries?: number;
}

const variantDot: Record<ActivityEntryVariant, string> = {
  default: "bg-[var(--s-chart-neutral)]",
  success: "bg-[var(--s-success)]",
  warning: "bg-[var(--s-warning)]",
  error: "bg-[var(--s-error)]",
  info: "bg-[var(--s-info)]",
};

export const ActivityFeed = forwardRef<HTMLDivElement, ActivityFeedProps>(
  function ActivityFeed({ entries, maxEntries, className, ...rest }, ref) {
    const visible = maxEntries ? entries.slice(0, maxEntries) : entries;
    const remaining = maxEntries && entries.length > maxEntries ? entries.length - maxEntries : 0;

    return (
      <div
        ref={ref}
        data-slot="activity-feed"
        className={cn("relative", className)}
        {...rest}
      >
        <div className="absolute left-[11px] top-3 bottom-3 w-px bg-[var(--s-border)]" />
        <div className="flex flex-col">
          {visible.map((entry) => {
            const variant = entry.variant ?? "default";
            return (
              <div key={entry.id} className="flex gap-3 py-2.5 relative">
                <div className="w-[23px] shrink-0 flex justify-center pt-1 relative z-[1]">
                  {entry.icon ? (
                    <span className="[&_svg]:size-4 text-[var(--s-text-muted)]">{entry.icon}</span>
                  ) : (
                    <div className={cn("w-2.5 h-2.5 rounded-[var(--s-radius-full)] mt-0.5", variantDot[variant])} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-medium text-[var(--s-text)] truncate">{entry.title}</span>
                    <span className="text-[10px] text-[var(--s-text-muted)] font-[family-name:var(--s-font-mono)] whitespace-nowrap shrink-0">
                      {entry.timestamp}
                    </span>
                  </div>
                  {entry.description && (
                    <p className="text-xs text-[var(--s-text-muted)] mt-0.5 line-clamp-2">{entry.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {remaining > 0 && (
          <div className="text-center pt-2">
            <span className="text-xs text-[var(--s-text-muted)]">
              +{remaining} more
            </span>
          </div>
        )}
      </div>
    );
  },
);
