"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { HeroShowcase } from "@/components/landing/hero-showcase";
import { PresetShowcase } from "@/components/landing/preset-showcase";
import { PresetTable } from "@/components/landing/preset-table";
import { Navbar } from "@/components/landing/navbar";
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

import { Stack, Button } from "@sigil-ui/components";

/* ================================================================ */
/* Shared layout                                                     */
/* ================================================================ */

function ContentWrap({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        maxWidth: "var(--s-align-rail-width, 1200px)",
        margin: "0 auto",
        padding: "0 var(--s-align-rail-margin, 24px)",
        ...style,
      }}
    >
      {children}
    </div>
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
    <section
      style={{
        minHeight: "100vh",
        padding: "120px 0 80px",
        borderBottom: "1px solid var(--s-border-muted)",
      }}
    >
      <ContentWrap>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "55% 45%",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Left — Copy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              paddingTop: 24,
            }}
          >
            <span className="s-label">/ sigil ui</span>

            <h1
              style={{
                fontFamily: "var(--s-font-display)",
                fontWeight: 700,
                fontSize: 64,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "var(--s-text)",
                margin: 0,
              }}
            >
              The Foundation
              <br />
              for your
              <br />
              Design System
            </h1>

            <p
              className="s-mono"
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--s-text-muted)",
                margin: 0,
                maxWidth: 420,
              }}
            >
              100+ components. 300+ tokens. 30 presets.
              <br />
              One markdown file controls every visual property.
            </p>

            <Stack direction="row" gap={12}>
              <Button asChild style={{ borderRadius: 0 }}>
                <a href="/docs">New Project</a>
              </Button>
              <Button variant="secondary" asChild style={{ borderRadius: 0 }}>
                <a href="/docs/components/button">View Components</a>
              </Button>
            </Stack>

            {/* Preset dots */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right — Showcase */}
          <div>
            <span
              className="s-fig"
              style={{ display: "block", marginBottom: 12 }}
            >
              Fig. 01
            </span>
            <div className="s-transition-all">
              <HeroShowcase />
            </div>
          </div>
        </div>
      </ContentWrap>
    </section>
  );
}

/* ================================================================ */
/* 2 — Token System                                                  */
/* ================================================================ */

const TOKEN_MD = `# sigil.tokens.md

## Colors
| Token       | Value                  |
|-------------|------------------------|
| primary     | oklch(0.65 0.15 280)   |
| background  | #0a0a0f                |
| surface     | #141419                |
| text        | #fafafa                |

## Typography
| Token       | Value                  |
|-------------|------------------------|
| display     | ABC Monument Grotesk   |
| body        | system-ui, sans-serif  |
| mono        | Roboto Mono, monospace |`;


function TokenSystem() {
  return (
    <section style={{ padding: "80px 0", borderBottom: "1px solid var(--s-border-muted)" }}>
      <ContentWrap>
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
      </ContentWrap>
    </section>
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
                color:
                  i === 5 ? "var(--s-primary)" : "var(--s-text-muted)",
                background:
                  i === 5 ? "var(--s-primary-muted)" : "transparent",
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
              <span
                style={{
                  ...mono,
                  fontSize: 8,
                  flex: 1,
                  color: "var(--s-text-secondary)",
                }}
              >
                {r}
              </span>
              <span
                style={{
                  ...mono,
                  fontSize: 8,
                  flex: 1,
                  color: "var(--s-success)",
                }}
              >
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
    <section
      id="components"
      style={{
        padding: "80px 0",
        borderBottom: "1px solid var(--s-border-muted)",
      }}
    >
      <ContentWrap>
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

        {/* Tab bar */}
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
                color:
                  activeTab === tab
                    ? "var(--s-text)"
                    : "var(--s-text-muted)",
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "color 150ms, border-color 150ms",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 4×2 component grid */}
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
                style={{
                  fontSize: 11,
                  color: "var(--s-text-muted)",
                }}
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
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--s-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--s-text-muted)";
          }}
        >
          79 more in /docs →
        </a>
      </ContentWrap>
    </section>
  );
}

/* ================================================================ */
/* 4 — Presets                                                       */
/* ================================================================ */

function Presets() {
  return (
    <section
      id="presets"
      style={{
        padding: "80px 0",
        borderBottom: "1px solid var(--s-border-muted)",
      }}
    >
      <ContentWrap>
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
      </ContentWrap>
    </section>
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
    <section
      style={{
        padding: "80px 0",
        borderBottom: "1px solid var(--s-border-muted)",
      }}
    >
      <ContentWrap>
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
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "var(--s-surface)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
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
                style={{
                  fontSize: 12,
                  color: "var(--s-text-subtle)",
                }}
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
      </ContentWrap>
    </section>
  );
}

/* ================================================================ */
/* 6 — CLI                                                           */
/* ================================================================ */

const CLI_LINES = [
  { text: "npx sigil init", prefix: "$", color: "var(--s-text)", delay: 800 },
  { text: "", delay: 300 },
  {
    text: "Preset: sigil",
    prefix: "✓",
    color: "var(--s-success)",
    delay: 500,
  },
  {
    text: "Created sigil.config.ts",
    prefix: "✓",
    color: "var(--s-success)",
    delay: 400,
  },
  {
    text: "Created sigil.tokens.md",
    prefix: "✓",
    color: "var(--s-success)",
    delay: 400,
  },
  {
    text: "Installed token CSS variables",
    prefix: "✓",
    color: "var(--s-success)",
    delay: 400,
  },
  {
    text: "Ready to import components",
    prefix: "✓",
    color: "var(--s-success)",
    delay: 400,
  },
  { text: "", delay: 200 },
  {
    text: "Done in 1.2s",
    prefix: " ",
    color: "var(--s-text-muted)",
    delay: 300,
  },
];

function CLISection() {
  return (
    <section
      style={{
        padding: "80px 0",
        borderBottom: "1px solid var(--s-border-muted)",
      }}
    >
      <ContentWrap style={{ maxWidth: 720 }}>
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
      </ContentWrap>
    </section>
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
      {
        label: "npm",
        href: "https://www.npmjs.com/package/@sigil-ui/components",
      },
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
    <footer
      style={{
        padding: "64px 0 32px",
        borderTop: "1px solid var(--s-border-muted)",
      }}
    >
      <ContentWrap>
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--s-text)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--s-text-muted)";
                    }}
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
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--s-text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--s-text-muted)";
              }}
            >
              Kevin Liu
            </a>
          </span>
        </div>
      </ContentWrap>
    </footer>
  );
}

/* ================================================================ */
/* Page                                                              */
/* ================================================================ */

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TokenSystem />
        <Components />
        <Presets />
        <DemoSites />
        <CLISection />
      </main>
      <Footer />
    </>
  );
}
