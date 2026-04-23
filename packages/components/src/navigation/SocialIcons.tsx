"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils";

export interface SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

export interface SocialIconsProps extends HTMLAttributes<HTMLDivElement> {
  links: SocialLink[];
  size?: "sm" | "md";
}

const sizes = { sm: 28, md: 32 };

export const SocialIcons = forwardRef<HTMLDivElement, SocialIconsProps>(
  function SocialIcons({ links, size = "md", className, ...rest }, ref) {
    const s = sizes[size];
    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)} {...rest}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="inline-flex items-center justify-center"
            style={{
              width: s,
              height: s,
              border: "1px solid var(--s-border)",
              borderStyle: "var(--s-border-style, solid)" as any,
              borderRadius: "var(--s-radius-sm, 4px)",
              color: "var(--s-text-muted)",
              background: "transparent",
              transition: `all var(--s-duration-fast, 150ms)`,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--s-text)";
              e.currentTarget.style.borderColor = "var(--s-border-strong)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--s-text-muted)";
              e.currentTarget.style.borderColor = "var(--s-border)";
            }}
          >
            {link.icon}
          </a>
        ))}
      </div>
    );
  },
);
