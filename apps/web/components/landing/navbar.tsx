"use client";

import { useState, useEffect } from "react";
import { NavbarLogo } from "@/components/landing/hero-logo-field";
import { BookOpen, LayoutGrid, Palette, Play, Star, PanelsTopLeft, Footprints } from "lucide-react";
import { SigilThemeToggle } from "./theme-toggle";
import { useIsEdgeless } from "./sigil-frame";

const NAV_LINKS = [
  { label: "Components", href: "/components", icon: <LayoutGrid size={14} /> },
  { label: "Presets", href: "/presets", icon: <Palette size={14} /> },
  { label: "Demos", href: "/demos", icon: <Play size={14} /> },
  { label: "Walkthrough", href: "/walkthrough", icon: <Footprints size={14} /> },
  { label: "Docs", href: "/docs", icon: <BookOpen size={14} /> },
] as const;

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor">
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


export { LandingNavbar as Navbar };

export function LandingNavbar({ fullBleed = false }: { fullBleed?: boolean }) {
  const stars = useGitHubStars();
  let edgeless = false;
  try { edgeless = useIsEdgeless(); } catch { /* outside provider */ }

  const navContent = (
    <>
      <a href="/" className="flex items-center gap-2 no-underline text-[var(--s-text)]">
        <NavbarLogo />
        <span className="font-[family-name:var(--s-font-display)] font-bold text-base tracking-[-0.03em]">
          sigil<span className="opacity-40 font-normal">/</span>
          <span className="font-medium text-[13px]">UI</span>
        </span>
      </a>

      <div className="flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hidden md:flex items-center gap-1.5 font-[family-name:var(--s-font-mono)] text-xs font-medium tracking-[0.04em] uppercase no-underline text-[var(--s-text-muted)] hover:text-[var(--s-text)] transition-colors duration-[var(--s-duration-fast,150ms)]"
          >
            {link.icon}
            {link.label}
          </a>
        ))}

        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("sigil:open-search"))}
          className="hidden md:inline-flex items-center gap-2 h-7 px-2.5 border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] rounded-[var(--s-radius-sm,4px)] bg-transparent text-[var(--s-text-muted)] hover:text-[var(--s-text)] hover:border-[var(--s-border-strong)] cursor-pointer transition-colors duration-[var(--s-duration-fast,150ms)]"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-[family-name:var(--s-font-mono)] text-[11px]">Search</span>
          <kbd className="ml-0.5 font-[family-name:var(--s-font-mono)] text-[10px] leading-none px-1 py-0.5 rounded-[2px] border border-[var(--s-border)] bg-[var(--s-surface)] opacity-60">
            {"\u2318K"}
          </kbd>
        </button>

        <a
          href="/sandbox"
          className="hidden md:inline-flex items-center gap-1.5 h-7 px-3 rounded-[var(--s-radius-sm,4px)] bg-[var(--s-primary)] text-[var(--s-primary-contrast,#fff)] no-underline font-[family-name:var(--s-font-mono)] text-[11px] font-semibold tracking-[0.04em] uppercase hover:opacity-90 transition-opacity duration-[var(--s-duration-fast,150ms)]"
        >
          <PanelsTopLeft size={13} />
          Sandbox
        </a>

        <a
          href="https://github.com/Kevin-Liu-01/sigil-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 h-7 px-2.5 border border-[var(--s-border)] border-[style:var(--s-border-style,solid)] rounded-[var(--s-radius-sm,4px)] no-underline text-[var(--s-text-muted)] hover:text-[var(--s-text)] hover:border-[var(--s-border-strong)] transition-colors duration-[var(--s-duration-fast,150ms)]"
        >
          <GitHubIcon />
          {stars !== null && (
            <>
              <Star size={11} className="fill-current" />
              <span className="font-[family-name:var(--s-font-mono)] text-[11px] font-semibold tabular-nums">
                {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
              </span>
            </>
          )}
          {stars === null && (
            <span className="font-[family-name:var(--s-font-mono)] text-[11px] font-medium">
              Star
            </span>
          )}
        </a>

        <SigilThemeToggle />
      </div>
    </>
  );

  const borderClass = edgeless ? "" : "border-b border-[var(--s-border)]";

  if (fullBleed) {
    return (
      <nav className={`w-full sticky top-0 z-50 bg-[var(--s-background)] ${borderClass} backdrop-blur-xl backdrop-saturate-[1.4]`}>
        <div
          className="mx-auto flex items-center justify-between h-[var(--s-navbar-height,56px)] w-full"
          style={{
            maxWidth: "var(--s-content-max, 1200px)",
            padding: "0 var(--s-page-margin, 24px)",
          }}
        >
          {navContent}
        </div>
      </nav>
    );
  }

  return (
    <nav className={`flex items-center justify-between h-[var(--s-navbar-height,56px)] px-6 ${borderClass} sticky top-0 z-50 bg-[var(--s-background)] backdrop-blur-xl backdrop-saturate-[1.4]`}>
      {navContent}
    </nav>
  );
}
