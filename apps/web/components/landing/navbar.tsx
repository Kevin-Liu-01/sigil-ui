"use client";

import { useEffect, useState, useCallback } from "react";
import { BookOpen, LayoutGrid, Palette, ExternalLink, Flame } from "lucide-react";
import Image from "next/image";

const LOGO_VARIANTS = [
  "/logo.svg",
  "/logo-v2-mixed-shapes.svg",
  "/logo-v3-gradient-dots.svg",
  "/logo-v4-outline.svg",
  "/logo-v5-asymmetric.svg",
  "/logo-v6-monochrome.svg",
] as const;

const NAV_LINKS = [
  { label: "Manifesto", href: "/manifesto", icon: <Flame size={14} /> },
  { label: "Docs", href: "/docs", icon: <BookOpen size={14} /> },
  { label: "Components", href: "#components", icon: <LayoutGrid size={14} /> },
  { label: "Presets", href: "#presets", icon: <Palette size={14} /> },
  { label: "GitHub", href: "https://github.com/Kevin-Liu-01/sigil-ui", external: true, icon: <ExternalLink size={14} /> },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [logoIdx, setLogoIdx] = useState(0);

  const cycleLogo = useCallback(() => {
    setLogoIdx((i) => (i + 1) % LOGO_VARIANTS.length);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sigil-theme");
      if (saved) setIsDark(saved === "dark");
    } catch {}
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    try { localStorage.setItem("sigil-theme", next ? "dark" : "light"); } catch {}
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: scrolled ? "blur(12px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px) saturate(1.4)" : "none",
        backgroundColor: scrolled ? "color-mix(in oklch, var(--s-bg) 80%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--s-border-muted)" : "1px solid transparent",
        transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <nav
        style={{
          maxWidth: "var(--s-align-rail-width, 1200px)",
          margin: "0 auto",
          padding: "0 var(--s-align-rail-margin, 24px)",
          height: "var(--s-nav-navbar-height, 56px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "max-width 400ms cubic-bezier(0.16, 1, 0.3, 1), padding 400ms cubic-bezier(0.16, 1, 0.3, 1), height 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Logo — cycles through 6 variants on hover */}
        <a
          href="/"
          onMouseEnter={cycleLogo}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: "var(--s-text)",
          }}
        >
          <Image
            src={LOGO_VARIANTS[logoIdx]}
            alt="Sigil"
            width={24}
            height={24}
            priority
            style={{ transition: "transform 200ms ease" }}
          />
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: "-0.01em",
            }}
          >
            sigil
          </span>
        </a>

        {/* Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--s-font-mono)",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
                color: "var(--s-text-muted)",
                transition: "color 150ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--s-text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--s-text-muted)";
              }}
              {...("external" in link && link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.icon}
              {link.label}
            </a>
          ))}

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              padding: 0,
              border: "none",
              background: "none",
              color: "var(--s-text-muted)",
              cursor: "pointer",
              borderRadius: "var(--s-radius-sm, 0px)",
              transition: "color 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--s-text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--s-text-muted)";
            }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>
    </header>
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
