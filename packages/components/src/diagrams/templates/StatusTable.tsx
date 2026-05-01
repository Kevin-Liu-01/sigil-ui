"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export type ServiceStatus = "operational" | "degraded" | "outage" | "maintenance";

export interface ServiceEntry {
  name: string;
  status: ServiceStatus;
  uptime?: string;
  lastIncident?: string;
}

export interface StatusTableProps extends HTMLAttributes<HTMLDivElement> {
  services: ServiceEntry[];
  title?: string;
}

const statusConfig: Record<ServiceStatus, { label: string; dot: string; text: string }> = {
  operational: {
    label: "Operational",
    dot: "bg-[var(--s-success)]",
    text: "text-[var(--s-success)]",
  },
  degraded: {
    label: "Degraded",
    dot: "bg-[var(--s-warning)]",
    text: "text-[var(--s-warning)]",
  },
  outage: {
    label: "Outage",
    dot: "bg-[var(--s-error)]",
    text: "text-[var(--s-error)]",
  },
  maintenance: {
    label: "Maintenance",
    dot: "bg-[var(--s-info)]",
    text: "text-[var(--s-info)]",
  },
};

export const StatusTable = forwardRef<HTMLDivElement, StatusTableProps>(
  function StatusTable({ services, title, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="status-table"
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
              <th className="text-left py-2.5 px-4 font-medium text-[var(--s-text-muted)]">Service</th>
              <th className="text-left py-2.5 px-4 font-medium text-[var(--s-text-muted)]">Status</th>
              <th className="text-right py-2.5 px-4 font-medium text-[var(--s-text-muted)]">Uptime</th>
              <th className="text-right py-2.5 px-4 font-medium text-[var(--s-text-muted)]">Last Incident</th>
            </tr>
          </thead>
          <tbody>
            {services.map((svc) => {
              const cfg = statusConfig[svc.status];
              return (
                <tr
                  key={svc.name}
                  className="border-b border-[color:var(--s-border)]/40 hover:bg-[var(--s-surface-elevated)] transition-colors duration-[var(--s-duration-fast,150ms)]"
                >
                  <td className="py-3 px-4 font-medium text-[var(--s-text)]">{svc.name}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-2">
                      <span className={cn("inline-block h-2 w-2 rounded-[var(--s-radius-full)]", cfg.dot)} />
                      <span className={cn("text-xs font-medium", cfg.text)}>{cfg.label}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-[family-name:var(--s-font-mono)] text-xs tabular-nums text-[var(--s-text-muted)]">
                    {svc.uptime ?? "—"}
                  </td>
                  <td className="py-3 px-4 text-right font-[family-name:var(--s-font-mono)] text-xs text-[var(--s-text-muted)]">
                    {svc.lastIncident ?? "—"}
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
