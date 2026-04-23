"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";
import { SectionHeading } from "./SectionHeading";

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  links?: { label: string; href: string; icon?: ReactNode }[];
}

export interface TeamSectionProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  title?: string;
  description?: string;
  members: TeamMember[];
  columns?: 3 | 4;
}

export const TeamSection = forwardRef<HTMLElement, TeamSectionProps>(
  function TeamSection({ label, title = "Our team", description, members, columns = 4, className, ...props }, ref) {
    return (
      <section
        ref={ref}
        data-slot="team-section"
        className={cn("border-t border-[var(--s-border)] py-[var(--s-section-py,64px)]", className)}
        {...props}
      >
        <div className="mx-auto max-w-[var(--s-content-max,1200px)] px-[var(--s-page-margin,24px)]">
          <SectionHeading label={label} title={title} description={description} align="center" />

          <div className={cn("grid grid-cols-2 gap-8", columns === 3 ? "md:grid-cols-3" : "md:grid-cols-4")}>
            {members.map((m, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                {m.avatar ? (
                  <img src={m.avatar} alt={m.name} className="w-20 h-20 rounded-[var(--s-radius-full,9999px)] object-cover" />
                ) : (
                  <div className="w-20 h-20 rounded-[var(--s-radius-full,9999px)] bg-[var(--s-surface)] flex items-center justify-center text-lg font-bold text-[var(--s-text-muted)]">
                    {m.name.split(" ").map(n => n[0]).join("")}
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-[var(--s-text)]">{m.name}</div>
                  <div className="text-xs text-[var(--s-text-muted)]">{m.role}</div>
                </div>
                {m.links && m.links.length > 0 && (
                  <div className="flex gap-2">
                    {m.links.map((link, j) => (
                      <a key={j} href={link.href} className="text-[var(--s-text-muted)] hover:text-[var(--s-text)] transition-colors [&_svg]:size-4" aria-label={link.label}>
                        {link.icon ?? <span className="text-xs">{link.label}</span>}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);
