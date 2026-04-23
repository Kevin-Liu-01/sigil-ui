"use client";

import { useState, useEffect } from "react";
import { NavbarLogo } from "@/components/landing/hero-logo-field";
import { BookOpen, LayoutGrid, Palette, Flame, Play, Star, PanelsTopLeft } from "lucide-react";

const NAV_LINKS = [
  { label: "Components", href: "/components", icon: <LayoutGrid size={14} /> },
  { label: "Presets", href: "/presets", icon: <Palette size={14} /> },
  { label: "Demos", href: "/demos", icon: <Play size={14} /> },
  { label: "Sandbox", href: "/sandbox", icon: <PanelsTopLeft size={14} /> },
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

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" />
      <line x1="8" y1="1" x2="8" y2="3" stroke="currentColor" strokeWidth="1.2" />
      <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.2" />
      <line x1="1" y1="8" x2="3" y2="8" stroke="currentColor" strokeWidth="1.2" />
      <line x1="13" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.2" />
      <line x1="3.05" y1="3.05" x2="4.46" y2="4.46" stroke="currentColor" strokeWidth="1.2" />
      <line x1="11.54" y1="11.54" x2="12.95" y2="12.95" stroke="currentColor" strokeWidth="1.2" />
      <line x1="3.05" y1="12.95" x2="4.46" y2="11.54" stroke="currentColor" strokeWidth="1.2" />
      <line x1="11.54" y1="4.46" x2="12.95" y2="3.05" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.5 9.5a5.5 5.5 0 01-7-7 5.5 5.5 0 107 7z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { LandingNavbar as Navbar };

export function LandingNavbar() {
  const [isDark, setIsDark] = useState(true);
  const stars = useGitHubStars();

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
  }

  return (
    <nav className="flex items-center justify-between h-[var(--s-navbar-height,56px)] px-6 border-b border-[var(--s-border-muted)] sticky top-0 z-50 bg-[var(--s-background)] backdrop-blur-xl backdrop-saturate-[1.4]">
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

        {/* GitHub star button */}
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

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex items-center justify-center w-8 h-8 p-0 border-none bg-transparent text-[var(--s-text-muted)] hover:text-[var(--s-text)] cursor-pointer rounded-[var(--s-radius-sm,0px)] transition-colors duration-[var(--s-duration-fast,150ms)]"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
}
