"use client";

import { useState } from "react";
import { NavbarLogo } from "@/components/landing/hero-logo-field";
import { BookOpen, LayoutGrid, Palette, ExternalLink, Flame, Play } from "lucide-react";

const NAV_LINKS = [
  { label: "Components", href: "/components", icon: <LayoutGrid size={14} /> },
  { label: "Presets", href: "/presets", icon: <Palette size={14} /> },
  { label: "Demos", href: "/demos", icon: <Play size={14} /> },
  { label: "Docs", href: "/docs", icon: <BookOpen size={14} /> },
  { label: "GitHub", href: "https://github.com/Kevin-Liu-01/sigil-ui", external: true, icon: <ExternalLink size={14} /> },
] as const;

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
            {...("external" in link && link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {link.icon}
            {link.label}
          </a>
        ))}

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
