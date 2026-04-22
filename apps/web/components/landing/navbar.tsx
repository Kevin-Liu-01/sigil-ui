"use client";

import { useEffect, useState } from "react";
import { Stack, Margin, Button, Cross } from "@sigil-ui/components";

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
        backgroundColor: scrolled ? "color-mix(in oklch, var(--s-bg) 80%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--s-border-muted)" : "1px solid transparent",
        transitionDuration: "var(--s-duration-normal)",
        transitionTimingFunction: "var(--s-ease-out)",
      }}
    >
      <Margin size="md">
        <Stack
          as="nav"
          direction="row"
          align="center"
          justify="between"
          style={{ maxWidth: "var(--s-content-max)", margin: "0 auto", padding: "var(--s-space-4) 0" }}
        >
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 no-underline"
            style={{ color: "var(--s-text)" }}
          >
            <Cross size={16} strokeWidth={1.5} style={{ color: "var(--s-text)" }} />
            <span
              className="r-mono font-semibold tracking-tight"
              style={{ fontSize: "15px" }}
            >
              sigil
            </span>
          </a>

          {/* Links */}
          <Stack direction="row" gap={24} align="center" className="hidden md:flex">
            {NAV_LINKS.map((link) => (
              <Button key={link.label} variant="ghost" size="sm" asChild>
                <a
                  href={link.href}
                  className="r-mono no-underline"
                  style={{ fontSize: "13px" }}
                  {...("external" in link && link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              </Button>
            ))}

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8"
              style={{ color: "var(--s-text-muted)" }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </Button>
          </Stack>
        </Stack>
      </Margin>
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
