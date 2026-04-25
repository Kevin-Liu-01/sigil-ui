"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils";

export interface TimelineEntry {
  date: string;
  title: string;
  description?: string;
}

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  /** Timeline entries. */
  entries: TimelineEntry[];
  /** Layout variant. @default "vertical" */
  variant?: "vertical" | "horizontal";
}

/** Timeline with dated entries — vertical or horizontal layout. */
export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(function Timeline(
  { entries, variant = "vertical", className, ...rest },
  ref,
) {
  if (variant === "horizontal") {
    return (
      <div ref={ref} data-slot="timeline" className={cn("w-full overflow-x-auto", className)} {...rest}>
        <div className="flex items-start gap-8 min-w-max px-4 py-6">
          {entries.map((entry, i) => (
            <div key={i} className="flex flex-col items-center text-center min-w-[140px]">
              <div className="w-3 h-3 rounded-[var(--s-radius-full)] bg-[var(--s-primary)] shrink-0" />
              <div className="w-px h-6 bg-[var(--s-border)]" />
              <div className="mt-2">
                <span className="text-xs font-[family-name:var(--s-font-mono)] text-[var(--s-text-muted)] block">{entry.date}</span>
                <h4 className="text-sm font-medium text-[var(--s-text)] mt-1">{entry.title}</h4>
                {entry.description && (
                  <p className="text-xs text-[var(--s-text-muted)] mt-1 max-w-[180px]">
                    {entry.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} data-slot="timeline" className={cn("relative", className)} {...rest}>
      <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[var(--s-border)]" />
      <div className="flex flex-col gap-6">
        {entries.map((entry, i) => (
          <div key={i} className="flex gap-4 relative">
            <div className="w-[15px] shrink-0 flex justify-center pt-1.5">
              <div className="w-3 h-3 rounded-[var(--s-radius-full)] bg-[var(--s-primary)] relative z-[1]" />
            </div>
            <div className="flex-1 pb-2">
              <span className="text-xs font-[family-name:var(--s-font-mono)] text-[var(--s-text-muted)] block">{entry.date}</span>
              <h4 className="text-sm font-medium text-[var(--s-text)] mt-0.5">{entry.title}</h4>
              {entry.description && (
                <p className="text-sm text-[var(--s-text-muted)] mt-1">{entry.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
