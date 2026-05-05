"use client";

import { forwardRef, useState, useCallback, type HTMLAttributes } from "react";
import { cn } from "../utils";
import { SectionHeading } from "./SectionHeading";

export interface InstallCommand {
  label: string;
  command: string;
}

export interface InstallSectionProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  title?: string;
  description?: string;
  note?: string;
  commands: InstallCommand[];
}

export const InstallSection = forwardRef<HTMLElement, InstallSectionProps>(
  function InstallSection({ label, title = "Get started", description, note, commands, className, ...props }, ref) {
    const safeCommands = commands ?? [];
    const [activeTab, setActiveTab] = useState(0);
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
      const cmd = safeCommands[activeTab]?.command;
      if (!cmd) return;
      try {
        await navigator.clipboard.writeText(cmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch { /* noop */ }
    }, [safeCommands, activeTab]);

    return (
      <section
        ref={ref}
        data-slot="install-section"
        className={cn("py-[var(--s-section-py,64px)]", className)}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-page-margin,24px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              {label && (
                <p className="font-[family-name:var(--s-font-mono)] text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[var(--s-primary)] mb-4">
                  {label}
                </p>
              )}
              <h2 className="font-[family-name:var(--s-font-display)] text-2xl font-semibold leading-tight tracking-tight text-[var(--s-text)]">
                {title}
              </h2>
              {description && (
                <p className="mt-3 text-sm leading-relaxed text-[var(--s-text-muted)]">{description}</p>
              )}
              {note && (
                <p className="mt-4 text-xs text-[var(--s-text-subtle)] font-[family-name:var(--s-font-mono)]">{note}</p>
              )}
            </div>

            <div className="flex flex-col gap-0">
              {safeCommands.map((cmd, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-[var(--s-radius-md,0px)] border border-[color:var(--s-border)] overflow-hidden",
                    i > 0 && "mt-3",
                  )}
                >
                  <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--s-surface)] border-b border-[color:var(--s-border-muted)]">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--s-text-muted)] font-[family-name:var(--s-font-mono)]">
                      {cmd.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => { setActiveTab(i); handleCopy(); }}
                      className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--s-text-muted)] hover:text-[var(--s-text)] transition-colors"
                    >
                      {copied && activeTab === i ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" /><path d="M8 4V3a1 1 0 00-1-1H3a1 1 0 00-1 1v4a1 1 0 001 1h1" stroke="currentColor" strokeWidth="1.2" /></svg>
                      )}
                      Copy
                    </button>
                  </div>
                  <div className="px-4 py-3 bg-[var(--s-background)]">
                    <code className="text-sm font-[family-name:var(--s-font-mono)] text-[var(--s-text)]">
                      <span className="text-[var(--s-text-muted)]">$ </span>{cmd.command}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  },
);
