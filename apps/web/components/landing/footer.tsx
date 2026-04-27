"use client";

import { FooterLogo, NavbarLogo } from "@/components/landing/hero-logo-field";
import { SIGIL_PRODUCT_STATS } from "@/lib/product-stats";
import { SigilSection } from "@sigil-ui/components";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
      <path d="M13.545 2.907a13.227 13.227 0 00-3.257-1.011.05.05 0 00-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 00-3.658 0 8.258 8.258 0 00-.412-.833.051.051 0 00-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 00-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 003.995 2.02.05.05 0 00.056-.019c.308-.42.582-.863.818-1.329a.05.05 0 00-.028-.07 8.735 8.735 0 01-1.248-.595.05.05 0 01-.005-.083c.084-.063.168-.129.248-.195a.05.05 0 01.051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 01.053.007c.08.066.164.132.248.195a.05.05 0 01-.004.083c-.399.233-.813.44-1.249.595a.05.05 0 00-.027.07c.24.466.514.909.817 1.329a.05.05 0 00.056.019 13.235 13.235 0 004.001-2.02.049.049 0 00.021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 00-.02-.019z" />
    </svg>
  );
}

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
      { label: "GitHub", href: "https://github.com/Kevin-Liu-01/sigil-ui" },
      { label: "npm", href: "https://www.npmjs.com/package/@sigil-ui/components" },
      { label: "Discord", href: "#" },
    ],
  },
  {
    group: "Resources",
    links: [
      { label: "Walkthrough", href: "/walkthrough" },
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

const SOCIAL_LINKS = [
  { icon: <GitHubIcon />, href: "https://github.com/Kevin-Liu-01/sigil-ui", label: "GitHub" },
  { icon: <XIcon />, href: "https://x.com/kevinliu_01", label: "X" },
  { icon: <LinkedInIcon />, href: "https://linkedin.com/in/kevinliu01", label: "LinkedIn" },
  { icon: <DiscordIcon />, href: "#", label: "Discord" },
];

export function LandingFooter({ fullBleed = false }: { fullBleed?: boolean }) {
  const footerContent = (
    <>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <NavbarLogo />
            <span className="font-[family-name:var(--s-font-display)] font-bold text-sm text-[var(--s-text)]">
              Sigil UI
            </span>
          </div>
          <p className="text-[13px] leading-relaxed text-[var(--s-text-muted)] mb-5 max-w-[260px]">
            The token-driven design system. {SIGIL_PRODUCT_STATS.componentCountLabel} token-driven components, {SIGIL_PRODUCT_STATS.presetCount} presets, one token layer controls everything.
          </p>
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="inline-flex items-center justify-center w-8 h-8 border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] rounded-[var(--s-radius-sm,4px)] text-[var(--s-text-muted)] hover:text-[var(--s-text)] hover:border-[var(--s-border-strong)] transition-colors duration-[var(--s-duration-fast,150ms)] no-underline"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

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

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-6 border-t border-[var(--s-border)]">
        <span className="s-mono text-[11px] text-[var(--s-text-subtle)]">
          &copy; 2026 Sigil UI. MIT License.
        </span>
        <span className="s-mono text-[11px] text-[var(--s-text-subtle)]">
          Built by{" "}
          <a
            href="https://kevinliu.me"
            className="text-[var(--s-text-muted)] no-underline hover:text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast)]"
          >
            Kevin Liu
          </a>
        </span>
      </div>
    </>
  );

  if (fullBleed) {
    return (
      <footer className="w-full border-t border-[var(--s-border)] bg-[var(--s-surface)]">
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: "var(--s-content-max, 1200px)",
            padding: "var(--s-footer-py, 48px) var(--s-page-margin, 24px)",
          }}
        >
          {footerContent}
        </div>
      </footer>
    );
  }

  return (
    <SigilSection as="footer" borderTop showCrosses padding="48px 24px 48px">
      {footerContent}
    </SigilSection>
  );
}
