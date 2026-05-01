"use client";

import { useState, useEffect, useCallback } from "react";
import { NavbarLogo } from "@/components/landing/hero-logo-field";
import { Star, PanelsTopLeft, Menu, X, Search, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { SigilThemeToggle } from "./theme-toggle";

const NAV_LINKS = [
  { label: "Components", href: "/components" },
  { label: "Presets", href: "/presets" },
  { label: "Demos", href: "/demos" },
  { label: "Walkthrough", href: "/walkthrough" },
] as const;

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function useGitHubStars(): number | null {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem("sigil-gh-stars");
    if (cached) {
      setStars(parseInt(cached, 10));
      return;
    }

    fetch("https://api.github.com/repos/Kevin-Liu-01/sigil-ui", { headers: { Accept: "application/vnd.github.v3+json" } })
      .then((r) => r.json())
      .then((data) => {
        if (typeof data?.stargazers_count === "number") {
          setStars(data.stargazers_count);
          sessionStorage.setItem("sigil-gh-stars", String(data.stargazers_count));
        }
      })
      .catch(() => {});
  }, []);

  return stars;
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

export { LandingNavbar as Navbar };

export function LandingNavbar() {
  const stars = useGitHubStars();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled();

  const openSearch = useCallback(() => {
    window.dispatchEvent(new Event("sigil:open-search"));
  }, []);

  const inner = (
    <div
      className="mx-auto flex items-center justify-between w-full border-b border-[var(--s-grid-line-color,var(--s-border-muted))] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        maxWidth: "var(--s-content-max, 1200px)",
        padding: "0 var(--s-page-margin, 24px)",
        height: 49,
      }}
    >
      {/* ── Logo ── */}
      <a href="/" className="flex items-center gap-2.5 no-underline text-[var(--s-text)] shrink-0 group">
        <NavbarLogo />
        <span className="font-[family-name:var(--s-font-display)] font-bold text-[15px] tracking-[-0.03em] transition-colors duration-200 group-hover:text-[var(--s-primary)]">
          sigil<span className="opacity-30 font-light">/</span>
          <span className="font-medium text-[13px]">UI</span>
        </span>
      </a>

      {/* ── Center: Nav Links ── */}
      <nav className="hidden lg:flex items-center gap-1">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="relative px-3 py-1.5 rounded-[var(--s-radius-sm,6px)] text-[13px] font-medium no-underline text-[var(--s-text-muted)] hover:text-[var(--s-text)] hover:bg-[color-mix(in_oklch,var(--s-text)_6%,transparent)] transition-all duration-200"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          type="button"
          onClick={openSearch}
          className="hidden md:inline-flex items-center gap-2 h-8 pl-2.5 pr-2 rounded-[var(--s-radius-sm,6px)] border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] bg-[var(--s-surface)] text-[var(--s-text-muted)] hover:text-[var(--s-text)] hover:border-[var(--s-border-strong)] cursor-pointer transition-all duration-200"
        >
          <Search size={13} className="shrink-0 opacity-60" />
          <span className="text-[12px] opacity-60 hidden lg:inline">Search</span>
          <kbd className="ml-1 font-[family-name:var(--s-font-mono)] text-[10px] leading-none px-1.5 py-0.5 rounded-[3px] border border-[var(--s-border)] bg-[var(--s-background)] opacity-50">
            {"\u2318K"}
          </kbd>
        </button>

        {/* Separator */}
        <div className="hidden md:block w-px h-4 bg-[var(--s-border)] mx-0.5" />

        {/* GitHub */}
        <a
          href="https://github.com/Kevin-Liu-01/sigil-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-[var(--s-radius-sm,6px)] border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] bg-[var(--s-surface)] no-underline text-[var(--s-text-muted)] hover:text-[var(--s-text)] hover:border-[var(--s-border-strong)] transition-all duration-200"
        >
          <GitHubIcon size={14} />
          {stars !== null && (
            <>
              <Star size={10} className="fill-current opacity-60" />
              <span className="font-[family-name:var(--s-font-mono)] text-[11px] font-semibold tabular-nums">
                {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
              </span>
            </>
          )}
        </a>

        {/* Theme toggle */}
        <SigilThemeToggle />

        {/* Docs */}
        <a
          href="/docs"
          className="hidden md:inline-flex items-center gap-1.5 h-8 px-3 rounded-[var(--s-radius-sm,6px)] border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] bg-[var(--s-surface)] no-underline text-[12px] font-semibold tracking-[-0.01em] text-[var(--s-text)] hover:border-[var(--s-border-strong)] active:scale-[0.97] transition-all duration-200"
        >
          <BookOpen size={13} />
          Docs
        </a>

        {/* Sandbox CTA */}
        <a
          href="/sandbox"
          className="hidden md:inline-flex items-center gap-1.5 h-8 px-3.5 rounded-[var(--s-radius-sm,6px)] bg-[var(--s-primary)] text-[var(--s-primary-contrast,#fff)] no-underline text-[12px] font-semibold tracking-[-0.01em] hover:brightness-110 active:scale-[0.97] transition-all duration-200 shadow-[0_0_0_1px_color-mix(in_oklch,var(--s-primary)_50%,transparent),0_1px_3px_color-mix(in_oklch,var(--s-primary)_20%,transparent)]"
        >
          <PanelsTopLeft size={13} />
          Sandbox
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex lg:hidden items-center justify-center h-8 w-8 rounded-[var(--s-radius-sm,6px)] border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] bg-[var(--s-surface)] text-[var(--s-text-muted)] hover:text-[var(--s-text)] hover:border-[var(--s-border-strong)] cursor-pointer transition-all duration-200"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <div className="relative w-4 h-4">
            <Menu
              size={16}
              className="absolute inset-0 transition-all duration-300"
              style={{
                opacity: mobileOpen ? 0 : 1,
                transform: mobileOpen ? "rotate(90deg) scale(0.5)" : "rotate(0) scale(1)",
              }}
            />
            <X
              size={16}
              className="absolute inset-0 transition-all duration-300"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "rotate(0) scale(1)" : "rotate(-90deg) scale(0.5)",
              }}
            />
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        background: "color-mix(in oklch, var(--s-background) 85%, transparent)",
        backdropFilter: "blur(16px) saturate(1.5)",
        WebkitBackdropFilter: "blur(16px) saturate(1.5)",
        boxShadow: scrolled
          ? "0 1px 3px color-mix(in oklch, var(--s-background) 30%, transparent), 0 4px 12px color-mix(in oklch, var(--s-background) 15%, transparent)"
          : "none",
      }}
    >
      {inner}
      <ReleaseBanner />
      {mobileOpen && <MobileMenu onNavigate={() => setMobileOpen(false)} stars={stars} />}
    </header>
  );
}

const BANNER_DISMISS_KEY = "sigil-v1-banner-dismissed";

function ReleaseBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(BANNER_DISMISS_KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="relative flex items-center justify-center gap-2 px-4 text-[12px] font-medium border-b border-[var(--s-border)] overflow-hidden h-[49px]"
      style={{
        background:
          "linear-gradient(90deg, color-mix(in oklch, var(--s-primary) 8%, var(--s-background)), color-mix(in oklch, var(--s-primary) 14%, var(--s-background)), color-mix(in oklch, var(--s-primary) 8%, var(--s-background)))",
        color: "var(--s-text)",
      }}
    >
      <Sparkles size={12} className="shrink-0 text-[var(--s-primary)]" />
      <span className="text-[var(--s-text-muted)]">
        <span className="font-semibold text-[var(--s-text)]">Sigil UI v1.0.0</span>
        {" "}is live &mdash; {" "}
        <a
          href="https://www.npmjs.com/org/sigil-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 font-semibold text-[var(--s-primary)] no-underline hover:underline"
        >
          View on npm
          <ArrowRight size={11} className="translate-y-px" />
        </a>
      </span>
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          localStorage.setItem(BANNER_DISMISS_KEY, "1");
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-[var(--s-radius-sm,4px)] text-[var(--s-text-muted)] hover:text-[var(--s-text)] hover:bg-[color-mix(in_oklch,var(--s-text)_8%,transparent)] cursor-pointer transition-colors duration-150"
        aria-label="Dismiss banner"
      >
        <X size={12} />
      </button>
    </div>
  );
}

function MobileMenu({ onNavigate, stars }: { onNavigate: () => void; stars: number | null }) {
  return (
    <div
      className="lg:hidden border-t border-[var(--s-border)] bg-[color-mix(in_oklch,var(--s-background)_95%,transparent)] backdrop-blur-xl"
      style={{
        animation: "navbar-mobile-in 250ms cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes navbar-mobile-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
      <div className="px-4 py-4 space-y-1" style={{ maxWidth: "var(--s-content-max, 1200px)", margin: "0 auto" }}>
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-[var(--s-radius-sm,6px)] px-3 py-2.5 text-[14px] font-medium text-[var(--s-text-muted)] no-underline hover:text-[var(--s-text)] hover:bg-[color-mix(in_oklch,var(--s-text)_6%,transparent)] transition-all duration-200"
            style={{
              animation: `navbar-mobile-in 250ms cubic-bezier(0.16, 1, 0.3, 1) ${50 + i * 30}ms both`,
            }}
          >
            {link.label}
          </a>
        ))}

        <div className="pt-2 mt-2 border-t border-[var(--s-border)] space-y-1">
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new Event("sigil:open-search"));
              onNavigate();
            }}
            className="flex items-center gap-3 w-full rounded-[var(--s-radius-sm,6px)] px-3 py-2.5 text-[14px] font-medium text-[var(--s-text-muted)] bg-transparent border-0 cursor-pointer hover:text-[var(--s-text)] hover:bg-[color-mix(in_oklch,var(--s-text)_6%,transparent)] transition-all duration-200"
          >
            <Search size={14} className="opacity-50" />
            Search
          </button>

          <a
            href="https://github.com/Kevin-Liu-01/sigil-ui"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-[var(--s-radius-sm,6px)] px-3 py-2.5 text-[14px] font-medium text-[var(--s-text-muted)] no-underline hover:text-[var(--s-text)] hover:bg-[color-mix(in_oklch,var(--s-text)_6%,transparent)] transition-all duration-200"
          >
            <GitHubIcon size={14} />
            <span>GitHub</span>
            {stars !== null && (
              <span className="ml-auto flex items-center gap-1 text-[var(--s-text-muted)]">
                <Star size={10} className="fill-current opacity-60" />
                <span className="font-[family-name:var(--s-font-mono)] text-[11px] tabular-nums">
                  {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
                </span>
              </span>
            )}
          </a>
        </div>

        <div className="pt-3 mt-2 border-t border-[var(--s-border)] flex gap-2">
          <a
            href="/docs"
            onClick={onNavigate}
            className="flex-1 flex items-center justify-center gap-2 rounded-[var(--s-radius-sm,6px)] border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] px-4 py-2.5 text-[13px] font-semibold text-[var(--s-text)] no-underline transition-all duration-200 active:scale-[0.98]"
          >
            <BookOpen size={14} />
            Docs
          </a>
          <a
            href="/sandbox"
            onClick={onNavigate}
            className="flex-1 flex items-center justify-center gap-2 rounded-[var(--s-radius-sm,6px)] bg-[var(--s-primary)] px-4 py-2.5 text-[13px] font-semibold text-[var(--s-primary-contrast,#fff)] no-underline shadow-[0_0_0_1px_color-mix(in_oklch,var(--s-primary)_50%,transparent),0_1px_3px_color-mix(in_oklch,var(--s-primary)_20%,transparent)] transition-all duration-200 active:scale-[0.98]"
          >
            <PanelsTopLeft size={14} />
            Sandbox
          </a>
        </div>
      </div>
    </div>
  );
}
