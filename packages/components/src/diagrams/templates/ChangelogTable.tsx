"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

export type ChangelogEntryType = "added" | "changed" | "fixed" | "removed" | "deprecated" | "security";

export interface ChangelogEntry {
  type: ChangelogEntryType;
  description: string;
}

export interface ChangelogRelease {
  version: string;
  date: string;
  entries: ChangelogEntry[];
}

export interface ChangelogTableProps extends HTMLAttributes<HTMLDivElement> {
  releases: ChangelogRelease[];
  /** Show colored type badges. @default true */
  showBadges?: boolean;
}

const typeBadgeStyles: Record<ChangelogEntryType, string> = {
  added: "bg-[var(--s-success,#22c55e)]/15 text-[var(--s-success,#22c55e)] border-[var(--s-success,#22c55e)]/30",
  changed: "bg-[var(--s-info,#3b82f6)]/15 text-[var(--s-info,#3b82f6)] border-[var(--s-info,#3b82f6)]/30",
  fixed: "bg-[var(--s-warning,#f59e0b)]/15 text-[var(--s-warning,#f59e0b)] border-[var(--s-warning,#f59e0b)]/30",
  removed: "bg-[var(--s-error,#ef4444)]/15 text-[var(--s-error,#ef4444)] border-[var(--s-error,#ef4444)]/30",
  deprecated: "bg-[var(--s-text-muted)]/10 text-[var(--s-text-muted)] border-[var(--s-text-muted)]/30",
  security: "bg-[var(--s-error,#ef4444)]/15 text-[var(--s-error,#ef4444)] border-[var(--s-error,#ef4444)]/30",
};

export const ChangelogTable = forwardRef<HTMLDivElement, ChangelogTableProps>(
  function ChangelogTable({ releases, showBadges = true, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="changelog-table"
        className={cn("w-full space-y-6", className)}
        {...rest}
      >
        {releases.map((release) => (
          <div
            key={release.version}
            className="rounded-[var(--s-radius-card,0px)] border border-[var(--s-border)] bg-[var(--s-surface)] overflow-hidden"
          >
            <div className="flex items-baseline gap-3 border-b border-[var(--s-border)] px-4 py-3 bg-[var(--s-surface-elevated)]">
              <span className="font-[family-name:var(--s-font-mono)] text-sm font-bold text-[var(--s-text)] tabular-nums">
                v{release.version}
              </span>
              <span className="font-[family-name:var(--s-font-mono)] text-xs text-[var(--s-text-muted)]">
                {release.date}
              </span>
            </div>
            <div className="divide-y divide-[var(--s-border)]/40">
              {release.entries.map((entry, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-2.5">
                  {showBadges && (
                    <span
                      className={cn(
                        "mt-0.5 inline-block rounded-[var(--s-radius-sm,2px)] border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0",
                        typeBadgeStyles[entry.type],
                      )}
                    >
                      {entry.type}
                    </span>
                  )}
                  <span className="text-sm text-[var(--s-text)]">{entry.description}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
);
