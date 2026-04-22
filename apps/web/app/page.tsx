"use client";

import { useState, useEffect } from "react";

import { HeroShowcase } from "@/components/landing/hero-showcase";
import { PresetShowcase } from "@/components/landing/preset-showcase";
import { PresetTable } from "@/components/landing/preset-table";
import { Terminal } from "@/components/landing/terminal";
import {
  TokenFlowDiagram,
  ComponentShowcaseGrid,
  PresetTransitionDemo,
  CodeExample,
  ParallaxSection,
} from "@/components/landing/interactive-diagrams";
import { useSigilTokens } from "@/components/sandbox/token-provider";
import { useSigilSound } from "@/components/sound-provider";

import { SigilPageGrid, SigilSection, SigilNavbar } from "@sigil-ui/components";
import { BookOpen, LayoutGrid, Palette, ExternalLink, Flame } from "lucide-react";

/* ================================================================ */
/* Navbar                                                            */
/* ================================================================ */

const NAV_LINKS = [
  { label: "Manifesto", href: "/manifesto", icon: <Flame size={14} /> },
  { label: "Docs", href: "/docs", icon: <BookOpen size={14} /> },
  { label: "Components", href: "#components", icon: <LayoutGrid size={14} /> },
  { label: "Presets", href: "#presets", icon: <Palette size={14} /> },
  { label: "GitHub", href: "https://github.com/Kevin-Liu-01/sigil-ui", external: true, icon: <ExternalLink size={14} /> },
] as const;

function LandingNavbar() {
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
    <SigilNavbar
      variant="full"
      style={{
        backdropFilter: scrolled ? "blur(12px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px) saturate(1.4)" : "none",
        backgroundColor: scrolled
          ? "color-mix(in oklch, var(--s-background) 80%, transparent)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--s-border-muted)"
          : "1px solid transparent",
        transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Logo */}
      <a
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
          color: "var(--s-text)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
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

      {/* Links + theme toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
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
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--s-text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--s-text-muted)"; }}
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
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--s-text)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--s-text-muted)"; }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </SigilNavbar>
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

/* ================================================================ */
/* 1 — Hero                                                          */
/* ================================================================ */

const PRESET_DOTS: { name: string; color: string }[] = [
  { name: "sigil", color: "#9b99e8" },
  { name: "noir", color: "#d97706" },
  { name: "forge", color: "#ea580c" },
  { name: "vex", color: "#ec4899" },
  { name: "arc", color: "#7c3aed" },
  { name: "cipher", color: "#22c55e" },
];

function Hero() {
  let setPreset: ((name: string) => Promise<void>) | null = null;
  let sound: { play: (name: string) => void } = { play: () => {} };
  try {
    const ctx = useSigilTokens();
    setPreset = ctx.setPreset;
  } catch {
    /* no provider */
  }
  try {
    sound = useSigilSound();
  } catch {
    /* no sound provider */
  }

  const handlePresetDot = (name: string) => {
    setPreset?.(name);
    sound.play("preset");
  };

  return (
    <SigilSection borderTop showCrosses padding="100px 0 64px">
      <div style={{ marginBottom: 48 }}>
        <span className="s-label" style={{ display: "block", marginBottom: 16 }}>/ sigil ui</span>

        <h1
          style={{
            fontFamily: "var(--s-font-display)",
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 56px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "var(--s-text)",
            margin: "0 0 16px 0",
          }}
        >
          The Foundation for your Design System.
        </h1>

        <p
          className="s-mono"
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--s-text-secondary)",
            margin: "0 0 24px 0",
            maxWidth: 520,
          }}
        >
          100+ components. 300+ tokens. 30 presets. One markdown file controls every color, radius, border, and sound.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <a
            href="/docs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 20px",
              background: "var(--s-primary)",
              color: "var(--s-primary-contrast, #fff)",
              fontFamily: "var(--s-font-mono)",
              fontSize: 13,
              fontWeight: 600,
              border: "1px solid var(--s-primary)",
              textDecoration: "none",
              transition: "all 200ms",
            }}
          >
            Get Started
          </a>
          <a
            href="/docs/components/button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 20px",
              background: "transparent",
              color: "var(--s-text)",
              fontFamily: "var(--s-font-mono)",
              fontSize: 13,
              fontWeight: 500,
              border: "1px solid var(--s-border)",
              textDecoration: "none",
              transition: "all 200ms",
            }}
          >
            View Components
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
          {PRESET_DOTS.map((p) => (
            <button
              key={p.name}
              type="button"
              title={p.name}
              onClick={() => handlePresetDot(p.name)}
              style={{
                width: 10,
                height: 10,
                borderRadius: 0,
                background: p.color,
                border: "1px solid var(--s-border)",
                cursor: "pointer",
                padding: 0,
                transition: "transform 150ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            />
          ))}
        </div>
      </div>

      <div>
        <span className="s-fig" style={{ display: "block", marginBottom: 8 }}>Fig. 01</span>
        <div className="s-transition-all">
          <HeroShowcase />
        </div>
      </div>
    </SigilSection>
  );
}

/* ================================================================ */
/* 2 — Token System                                                  */
/* ================================================================ */

function TokenSystem() {
  return (
    <SigilSection borderTop showCrosses>
      <span className="s-label" style={{ display: "block", marginBottom: 12 }}>
        / Token System
      </span>

      <h2 style={{
        fontFamily: "var(--s-font-display)",
        fontSize: "clamp(24px, 3vw, 36px)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        color: "var(--s-text)",
        margin: "0 0 12px 0",
      }}>
        One file compiles to everything.
      </h2>
      <p className="s-mono" style={{ fontSize: 14, color: "var(--s-text-muted)", marginBottom: 40, maxWidth: 560 }}>
        Edit sigil.tokens.md. 300+ CSS variables compile. 103 components update instantly.
      </p>

      <ParallaxSection speed={0.03}>
        <TokenFlowDiagram />
      </ParallaxSection>

      <div style={{ marginTop: 48 }}>
        <span className="s-fig" style={{ display: "block", marginBottom: 16 }}>Fig. 02 — Preset comparison</span>
        <PresetTransitionDemo />
      </div>

      <div style={{ marginTop: 48 }}>
        <CodeExample
          filename="app/layout.tsx"
          language="tsx"
          code={`import { SigilShell } from "@sigil-ui/components";

export default function Layout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <SigilShell>{children}</SigilShell>
      </body>
    </html>
  );
}`}
          highlightLines={[1, 6]}
        />
      </div>
    </SigilSection>
  );
}

/* ================================================================ */
/* 3 — Components                                                    */
/* ================================================================ */

const COMPONENT_TABS = [
  "Layout",
  "UI",
  "Navigation",
  "Overlays",
  "Shapes",
  "3D",
  "Diagrams",
  "Marketing",
];

const COMPONENT_CELLS = [
  { name: "Button", vars: 5 },
  { name: "Card", vars: 7 },
  { name: "Input", vars: 6 },
  { name: "Tabs", vars: 4 },
  { name: "Dialog", vars: 5 },
  { name: "Calendar", vars: 8 },
  { name: "DataTable", vars: 9 },
  { name: "Alert", vars: 3 },
];

function MiniComponentRender({ name }: { name: string }) {
  const mono: React.CSSProperties = {
    fontFamily: "var(--s-font-mono)",
    fontSize: 10,
    color: "var(--s-text-muted)",
  };

  switch (name) {
    case "Button":
      return (
        <button
          type="button"
          style={{
            background: "var(--s-primary)",
            color: "#fff",
            border: "none",
            borderRadius: 0,
            padding: "6px 16px",
            fontSize: 12,
            fontWeight: 500,
            cursor: "default",
          }}
        >
          Click me
        </button>
      );
    case "Card":
      return (
        <div
          style={{
            padding: 12,
            border: "1px solid var(--s-border)",
            borderRadius: 0,
            background: "var(--s-surface)",
            width: "100%",
          }}
        >
          <span style={mono}>Card content</span>
        </div>
      );
    case "Input":
      return (
        <div
          style={{
            padding: "6px 10px",
            border: "1px solid var(--s-border)",
            borderRadius: 0,
            background: "var(--s-background)",
            width: "100%",
            ...mono,
          }}
        >
          Search...
        </div>
      );
    case "Tabs":
      return (
        <div style={{ display: "flex", gap: 0, width: "100%" }}>
          {["Tab 1", "Tab 2"].map((t, i) => (
            <span
              key={t}
              style={{
                ...mono,
                padding: "4px 12px",
                borderBottom:
                  i === 0
                    ? "2px solid var(--s-primary)"
                    : "1px solid var(--s-border)",
                color:
                  i === 0 ? "var(--s-text)" : "var(--s-text-muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      );
    case "Dialog":
      return (
        <div
          style={{
            padding: 10,
            border: "1px solid var(--s-border)",
            borderRadius: 0,
            background: "var(--s-surface-elevated)",
            width: "100%",
          }}
        >
          <span style={{ ...mono, display: "block", textAlign: "center" }}>
            [ Dialog ]
          </span>
        </div>
      );
    case "Calendar":
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 2,
            width: "100%",
          }}
        >
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              style={{
                ...mono,
                fontSize: 8,
                textAlign: "center",
                padding: 2,
                color: i === 5 ? "var(--s-primary)" : "var(--s-text-muted)",
                background: i === 5 ? "var(--s-primary-muted)" : "transparent",
              }}
            >
              {i + 1}
            </span>
          ))}
        </div>
      );
    case "DataTable":
      return (
        <div style={{ width: "100%", overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid var(--s-border)",
              paddingBottom: 2,
              marginBottom: 4,
            }}
          >
            <span style={{ ...mono, fontSize: 8, flex: 1 }}>name</span>
            <span style={{ ...mono, fontSize: 8, flex: 1 }}>status</span>
          </div>
          {["alpha", "beta"].map((r) => (
            <div
              key={r}
              style={{
                display: "flex",
                borderBottom: "1px solid var(--s-border-muted)",
                paddingBottom: 2,
                marginBottom: 2,
              }}
            >
              <span style={{ ...mono, fontSize: 8, flex: 1, color: "var(--s-text-secondary)" }}>
                {r}
              </span>
              <span style={{ ...mono, fontSize: 8, flex: 1, color: "var(--s-success)" }}>
                ok
              </span>
            </div>
          ))}
        </div>
      );
    case "Alert":
      return (
        <div
          style={{
            padding: "6px 10px",
            border: "1px solid var(--s-border)",
            borderLeft: "3px solid var(--s-warning)",
            borderRadius: 0,
            background: "var(--s-surface)",
            width: "100%",
          }}
        >
          <span style={{ ...mono, fontSize: 9, color: "var(--s-text-secondary)" }}>
            ⚠ Warning alert
          </span>
        </div>
      );
    default:
      return null;
  }
}

function Components() {
  const [activeTab, setActiveTab] = useState("UI");

  return (
    <SigilSection id="components" borderTop showCrosses>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 32,
        }}
      >
        <span className="s-label">/ Components</span>
        <span className="s-fig">Fig. 02</span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid var(--s-border)",
          marginBottom: 32,
        }}
      >
        {COMPONENT_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className="s-mono"
            style={{
              background: "none",
              border: "none",
              borderBottom:
                activeTab === tab
                  ? "2px solid var(--s-primary)"
                  : "2px solid transparent",
              padding: "8px 16px",
              fontSize: 12,
              fontFamily: "var(--s-font-mono)",
              color: activeTab === tab ? "var(--s-text)" : "var(--s-text-muted)",
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "color 150ms, border-color 150ms",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
        }}
      >
        {COMPONENT_CELLS.map((cell) => (
          <div
            key={cell.name}
            style={{
              border: "1px solid var(--s-border)",
              borderRadius: 0,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 120,
              gap: 12,
              marginRight: -1,
              marginBottom: -1,
            }}
          >
            <MiniComponentRender name={cell.name} />
            <span
              className="s-mono"
              style={{ fontSize: 11, color: "var(--s-text-muted)" }}
            >
              {cell.name} — {cell.vars} vars
            </span>
          </div>
        ))}
      </div>

      <a
        href="/docs/components/button"
        className="s-mono"
        style={{
          display: "inline-block",
          marginTop: 24,
          fontSize: 13,
          color: "var(--s-text-muted)",
          textDecoration: "none",
          transition: "color 150ms",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--s-primary)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--s-text-muted)"; }}
      >
        79 more in /docs →
      </a>
    </SigilSection>
  );
}

/* ================================================================ */
/* 4 — Presets                                                       */
/* ================================================================ */

function Presets() {
  return (
    <SigilSection id="presets" borderTop showCrosses>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 32,
        }}
      >
        <span className="s-label">/ Presets</span>
        <span className="s-fig">Fig. 03</span>
      </div>

      <PresetTable />

      <div style={{ marginTop: 48 }}>
        <PresetShowcase />
      </div>
    </SigilSection>
  );
}

/* ================================================================ */
/* 5 — Demo Sites                                                    */
/* ================================================================ */

const DEMOS = [
  { num: "01", name: "AI SaaS Landing", url: "ai-saas.sigil-ui.dev", href: "/demos/ai-saas" },
  { num: "02", name: "Dashboard", url: "dashboard.sigil-ui.dev", href: "/demos/dashboard" },
  { num: "03", name: "E-commerce", url: "shop.sigil-ui.dev", href: "/demos/ecommerce" },
  { num: "04", name: "Developer Docs", url: "docs.sigil-ui.dev", href: "/demos/dev-docs" },
  { num: "05", name: "Startup", url: "startup.sigil-ui.dev", href: "/demos/startup" },
  { num: "06", name: "Portfolio", url: "portfolio.sigil-ui.dev", href: "/demos/portfolio" },
  { num: "07", name: "Blog", url: "blog.sigil-ui.dev", href: "/demos/blog" },
  { num: "08", name: "Agency", url: "agency.sigil-ui.dev", href: "/demos/agency" },
  { num: "09", name: "CLI Tool", url: "cli.sigil-ui.dev", href: "/demos/cli-tool" },
  { num: "10", name: "Playground", url: "play.sigil-ui.dev", href: "/demos/playground" },
];

function DemoSites() {
  return (
    <SigilSection borderTop showCrosses>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 32,
        }}
      >
        <span className="s-label">/ Demos</span>
        <span className="s-fig">Fig. 04</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {DEMOS.map((demo) => (
          <a
            key={demo.num}
            href={demo.href}
            style={{
              display: "grid",
              gridTemplateColumns: "48px 1fr 1fr 32px",
              alignItems: "center",
              gap: 16,
              padding: "14px 0",
              borderBottom: "1px solid var(--s-border-muted)",
              textDecoration: "none",
              color: "inherit",
              transition: "background 150ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--s-surface)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <span
              className="s-mono"
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: "var(--s-text-muted)",
                letterSpacing: "-0.02em",
              }}
            >
              {demo.num}
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--s-text)",
                fontFamily: "var(--s-font-body)",
              }}
            >
              {demo.name}
            </span>
            <span
              className="s-mono"
              style={{ fontSize: 12, color: "var(--s-text-subtle)" }}
            >
              {demo.url}
            </span>
            <span
              style={{
                fontSize: 16,
                color: "var(--s-text-muted)",
                textAlign: "right",
              }}
            >
              →
            </span>
          </a>
        ))}
      </div>
    </SigilSection>
  );
}

/* ================================================================ */
/* 6 — CLI                                                           */
/* ================================================================ */

const CLI_LINES = [
  { text: "npx sigil init", prefix: "$", color: "var(--s-text)", delay: 800 },
  { text: "", delay: 300 },
  { text: "Preset: sigil", prefix: "✓", color: "var(--s-success)", delay: 500 },
  { text: "Created sigil.config.ts", prefix: "✓", color: "var(--s-success)", delay: 400 },
  { text: "Created sigil.tokens.md", prefix: "✓", color: "var(--s-success)", delay: 400 },
  { text: "Installed token CSS variables", prefix: "✓", color: "var(--s-success)", delay: 400 },
  { text: "Ready to import components", prefix: "✓", color: "var(--s-success)", delay: 400 },
  { text: "", delay: 200 },
  { text: "Done in 1.2s", prefix: " ", color: "var(--s-text-muted)", delay: 300 },
];

function CLISection() {
  return (
    <SigilSection borderTop showCrosses>
      <div style={{ maxWidth: 720 }}>
        <span
          className="s-label"
          style={{ display: "block", marginBottom: 24 }}
        >
          / CLI
        </span>

        <h3
          className="s-mono"
          style={{
            fontWeight: 700,
            fontSize: "clamp(24px, 3vw, 36px)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--s-text)",
            margin: "0 0 24px 0",
          }}
        >
          One command.
        </h3>

        <Terminal lines={CLI_LINES} title="~/ — zsh" />
      </div>
    </SigilSection>
  );
}

/* ================================================================ */
/* 7 — Footer                                                        */
/* ================================================================ */

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

function Footer() {
  return (
    <SigilSection as="footer" borderTop showCrosses padding="64px 0 32px">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 32,
        }}
      >
        {FOOTER_COLS.map((col) => (
          <div key={col.group}>
            <span
              className="s-mono"
              style={{
                fontSize: 10,
                color: "var(--s-text-subtle)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
                display: "block",
                marginBottom: 16,
              }}
            >
              {col.group}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="s-mono"
                  style={{
                    fontSize: 12,
                    color: "var(--s-text-muted)",
                    textDecoration: "none",
                    transition: "color var(--s-duration-fast)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--s-text)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--s-text-muted)"; }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 48,
          paddingTop: 24,
          borderTop: "1px solid var(--s-border-muted)",
        }}
      >
        <span
          className="s-mono"
          style={{ fontSize: 12, color: "var(--s-text-muted)" }}
        >
          © 2026 Sigil UI. MIT License.
        </span>
        <span
          className="s-mono"
          style={{ fontSize: 12, color: "var(--s-text-muted)" }}
        >
          Built by{" "}
          <a
            href="https://kevinliu.me"
            style={{
              color: "var(--s-text-muted)",
              textDecoration: "none",
              transition: "color var(--s-duration-fast)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--s-text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--s-text-muted)"; }}
          >
            Kevin Liu
          </a>
        </span>
      </div>
    </SigilSection>
  );
}

/* ================================================================ */
/* Page                                                              */
/* ================================================================ */

export default function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <main>
        <SigilPageGrid showGutterGrid showMarginLines>
          <Hero />
          <TokenSystem />
          <Components />
          <Presets />
          <DemoSites />
          <CLISection />
        </SigilPageGrid>
      </main>
      <Footer />
    </>
  );
}
