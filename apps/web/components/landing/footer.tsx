"use client";

import { FooterLogo } from "@/components/landing/hero-logo-field";
import { SigilSection } from "@sigil-ui/components";

const FOOTER_COLS = [
  {
    group: "Product",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Components", href: "/docs/components/button" },
      { label: "Presets", href: "/docs/presets" },
      { label: "Sandbox", href: "/sandbox" },
    ],
  },
  {
    group: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/sigil-ui/sigil" },
      { label: "npm", href: "https://www.npmjs.com/package/@sigil-ui/components" },
      { label: "Discord", href: "#" },
    ],
  },
  {
    group: "Resources",
    links: [
      { label: "Token Guide", href: "/docs/theming" },
      { label: "Preset API", href: "/docs/cli" },
      { label: "Agent Integration", href: "/docs" },
    ],
  },
  {
    group: "Company",
    links: [
      { label: "Manifesto", href: "/manifesto" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "mailto:hello@sigil-ui.dev" },
    ],
  },
];

export function LandingFooter() {
  return (
    <SigilSection as="footer" borderTop showCrosses padding="48px 24px 48px">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {FOOTER_COLS.map((col) => (
          <div key={col.group}>
            <span className="s-mono block text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--s-text-subtle)] mb-4">
              {col.group}
            </span>
            <div className="flex flex-col gap-3">
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="s-mono text-xs text-[var(--s-text-muted)] no-underline hover:text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-6 border-t border-[var(--s-border-muted)]">
        <span className="s-mono text-xs text-[var(--s-text-muted)] flex items-center gap-2.5">
          <FooterLogo />
          &copy; 2026 Sigil UI. MIT License.
        </span>
        <span className="s-mono text-xs text-[var(--s-text-muted)]">
          Built by{" "}
          <a
            href="https://kevinliu.me"
            className="text-[var(--s-text-muted)] no-underline hover:text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast)]"
          >
            Kevin Liu
          </a>
        </span>
      </div>
    </SigilSection>
  );
}
