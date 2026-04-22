"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Docs", href: "#" },
  { label: "Components", href: "#components" },
  { label: "Presets", href: "#presets" },
  { label: "GitHub", href: "https://github.com/sigil-ui/sigil", external: true },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all"
      style={{
        backdropFilter: scrolled ? "blur(12px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px) saturate(1.4)" : "none",
        backgroundColor: scrolled ? "color-mix(in oklch, var(--r-bg) 80%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--r-border-muted)" : "1px solid transparent",
        transitionDuration: "var(--r-duration-normal)",
        transitionTimingFunction: "var(--r-ease-out)",
      }}
    >
      <nav
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: "var(--r-content-max)",
          padding: "var(--r-space-4) var(--r-space-6)",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 no-underline"
          style={{ color: "var(--r-text)" }}
        >
          <CrossIcon />
          <span
            className="r-mono font-semibold tracking-tight"
            style={{ fontSize: "15px" }}
          >
            sigil
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center" style={{ gap: "var(--r-space-8)" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="r-mono no-underline transition-colors"
              style={{
                fontSize: "13px",
                color: "var(--r-text-secondary)",
                transitionDuration: "var(--r-duration-fast)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--r-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--r-text-secondary)")}
              {...("external" in link && link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="r-press flex items-center justify-center rounded-md border-0 cursor-pointer transition-colors"
            style={{
              width: 32,
              height: 32,
              background: "var(--r-surface)",
              color: "var(--r-text-muted)",
              transitionDuration: "var(--r-duration-fast)",
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>
    </header>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
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
