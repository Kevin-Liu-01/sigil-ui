"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { ComponentGrid } from "@/components/landing/component-grid";
import { PresetShowcase } from "@/components/landing/preset-showcase";
import { DemoBrowser } from "@/components/landing/demo-browser";
import { HeroShowcase } from "@/components/landing/hero-showcase";
import { Navbar } from "@/components/landing/navbar";
import { Terminal } from "@/components/landing/terminal";
import { ShaderBackground } from "@/components/shader-bg";
import { useSigilTokens } from "@/components/sandbox/token-provider";
import { useSigilSound } from "@/components/sound-provider";

import {
  Stack,
  Button,
  Badge,
  Divider,
  Tessellation,
  Pattern,
  LoadingSpinner,
  Skeleton,
} from "@sigil-ui/components";

/* ================================================================== */
/* Shared layout                                                       */
/* ================================================================== */

const CONTENT_MAX = 1200;

function ContentWrap({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{ maxWidth: CONTENT_MAX, margin: "0 auto", ...style }}
    >
      {children}
    </div>
  );
}

/* ================================================================== */
/* 1 — Hero                                                            */
/* ================================================================== */

const PRESET_DOTS: { name: string; color: string }[] = [
  { name: "sigil", color: "#9b99e8" },
  { name: "noir", color: "#d97706" },
  { name: "forge", color: "#ea580c" },
  { name: "vex", color: "#ec4899" },
  { name: "arc", color: "#7c3aed" },
  { name: "cipher", color: "#22c55e" },
];

function HeroShader() {
  try {
    const { activePreset } = useSigilTokens();
    return <ShaderBackground preset={activePreset.replace("*", "")} />;
  } catch {
    return <ShaderBackground preset="sigil" />;
  }
}

function Hero() {
  let setPreset: ((name: string) => Promise<void>) | null = null;
  let sound: { play: (name: string) => void } = { play: () => {} };
  try {
    const ctx = useSigilTokens();
    setPreset = ctx.setPreset;
  } catch { /* no provider */ }
  try {
    sound = useSigilSound();
  } catch { /* no sound provider */ }

  const handlePresetDot = (name: string) => {
    setPreset?.(name);
    sound.play("preset");
  };

  return (
    <section
      style={{
        background: "var(--s-background)",
        padding: "80px 0 0 0",
      }}
    >
      {/* Headline + CTAs */}
      <ContentWrap style={{ padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "var(--s-font-display)",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--s-text)",
              margin: 0,
            }}
          >
            The Foundation for your
            <br />
            Design System
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--s-text-secondary)",
              margin: "16px auto 0",
              maxWidth: 560,
            }}
          >
            100+ token-driven components that animate between 30 presets.
            One markdown file controls every color, radius, border, and sound.
          </p>
          <Stack direction="row" gap={12} justify="center" className="mt-6">
            <Button asChild>
              <a href="/docs">New Project</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="/docs/components/button">View Components</a>
            </Button>
          </Stack>

          {/* Preset dots */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {PRESET_DOTS.map((p) => (
              <button
                key={p.name}
                type="button"
                title={p.name}
                onClick={() => handlePresetDot(p.name)}
                className="transition-all hover:scale-125"
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: p.color,
                  border: "2px solid var(--s-border)",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </ContentWrap>

      {/* Full-width component showcase — like shadcn's hero grid */}
      <div className="s-transition-all" style={{ marginTop: 48, padding: "0 24px 64px" }}>
        <HeroShowcase className="mx-auto" style={{ maxWidth: 1400 }} />
      </div>
    </section>
  );
}

/* ================================================================== */
/* 2 — Token System                                                    */
/* ================================================================== */

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
    <section
      style={{
        padding: "80px 24px",
        background: "var(--s-surface-sunken)",
      }}
    >
      <ContentWrap>
        <div
          className="grid gap-16"
          style={{ gridTemplateColumns: "1fr 1fr", alignItems: "start" }}
        >
          {/* Left — code block */}
          <pre
            className="s-mono"
            style={{
              margin: 0,
              padding: "24px 0 24px 24px",
              fontSize: 12.5,
              lineHeight: 1.7,
              color: "var(--s-text-secondary)",
              borderLeft: "3px solid var(--s-primary)",
              whiteSpace: "pre",
              overflow: "auto",
            }}
          >
            <code>{TOKEN_MD}</code>
          </pre>

          {/* Right — flow */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              paddingTop: 16,
            }}
          >
            <span
              className="s-mono"
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: "var(--s-text)",
              }}
            >
              Edit one file
            </span>
            <span
              style={{
                fontSize: 28,
                color: "var(--s-text-muted)",
                lineHeight: 1,
              }}
            >
              →
            </span>
            <span
              style={{
                fontSize: 16,
                color: "var(--s-text-secondary)",
                lineHeight: 1.5,
              }}
            >
              300+ CSS variables compile
            </span>
            <span
              style={{
                fontSize: 28,
                color: "var(--s-text-muted)",
                lineHeight: 1,
              }}
            >
              →
            </span>
            <span
              style={{
                fontSize: 16,
                color: "var(--s-text-secondary)",
                lineHeight: 1.5,
              }}
            >
              100+ components update instantly
            </span>
          </div>
        </div>

        {/* Comparison pairs */}
        <div
          className="grid gap-6 mt-16"
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          <TokenPair
            label="Button"
            left={
              <button
                type="button"
                style={{
                  background: "#6366f1",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "default",
                }}
              >
                sigil
              </button>
            }
            right={
              <button
                type="button"
                style={{
                  background: "#ea580c",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "default",
                  fontFamily: "monospace",
                }}
              >
                forge
              </button>
            }
          />

          <TokenPair
            label="Card"
            left={
              <div
                style={{
                  padding: 12,
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "#141419",
                  width: "100%",
                }}
              >
                <div
                  className="s-mono"
                  style={{ fontSize: 11, color: "#fafafa" }}
                >
                  crux — minimal
                </div>
              </div>
            }
            right={
              <div
                style={{
                  padding: 12,
                  borderRadius: 2,
                  border: "2px solid #71717a",
                  background: "#292524",
                  width: "100%",
                }}
              >
                <div
                  className="s-mono"
                  style={{ fontSize: 11, color: "#fafaf9" }}
                >
                  alloy — industrial
                </div>
              </div>
            }
          />

          <TokenPair
            label="Badge"
            left={
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: 4,
                  background: "#052e16",
                  color: "#22c55e",
                  fontSize: 11,
                  fontFamily: "monospace",
                  fontWeight: 500,
                }}
              >
                cipher
              </span>
            }
            right={
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: 20,
                  background: "#fef08a",
                  color: "#ec4899",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                vex
              </span>
            }
          />

          <TokenPair
            label="Input"
            left={
              <div
                className="s-mono"
                style={{
                  padding: "6px 10px",
                  borderRadius: 4,
                  border: "1px solid #262626",
                  background: "#000",
                  color: "#666",
                  fontSize: 11,
                  width: "100%",
                }}
              >
                noir — dark
              </div>
            }
            right={
              <div
                className="s-mono"
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "1px solid #c4b5fd",
                  background: "#f5f3ff",
                  color: "#7c3aed",
                  fontSize: 11,
                  width: "100%",
                }}
              >
                arc — light
              </div>
            }
          />
        </div>
      </ContentWrap>
    </section>
  );
}

function TokenPair({
  label,
  left,
  right,
}: {
  label: string;
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span
        className="s-mono"
        style={{
          fontSize: 10,
          color: "var(--s-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </span>
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center justify-center">{left}</div>
        <span
          style={{ fontSize: 14, color: "var(--s-text-subtle)", flexShrink: 0 }}
        >
          vs
        </span>
        <div className="flex-1 flex items-center justify-center">{right}</div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* 3 — Components                                                      */
/* ================================================================== */

const MINI_COMPONENTS = [
  "Button",
  "Card",
  "Badge",
  "Input",
  "Switch",
  "Slider",
  "Avatar",
  "KPI",
  "Accordion",
  "Dialog",
  "Tabs",
  "Select",
  "Tooltip",
  "Popover",
  "Alert",
  "Toast",
  "Progress",
  "Toggle",
  "Skeleton",
  "Spinner",
  "Breadcrumb",
  "Sidebar",
  "Table",
  "Command",
];

function Components() {
  return (
    <section
      id="components"
      style={{
        padding: "80px 24px",
        background: "var(--s-background)",
      }}
    >
      <ContentWrap>
        <h2
          style={{
            fontFamily: "var(--s-font-display)",
            fontWeight: 700,
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--s-text)",
            margin: "0 0 40px 0",
          }}
        >
          103 components.
        </h2>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
        >
          {MINI_COMPONENTS.map((name) => (
            <div
              key={name}
              className="group flex flex-col items-center justify-center transition-all"
              style={{
                width: "100%",
                height: 80,
                borderRadius: "var(--s-radius-md)",
                border: "1px solid var(--s-border-muted)",
                background: "var(--s-surface)",
                cursor: "default",
              }}
            >
              <MiniComponentDot name={name} />
              <span
                className="s-mono"
                style={{
                  fontSize: 10,
                  color: "var(--s-text-muted)",
                  marginTop: 6,
                  transition: "color 150ms",
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>

        <a
          href="/docs/components/button"
          className="s-mono no-underline mt-8 inline-block transition-colors"
          style={{
            fontSize: 13,
            color: "var(--s-text-muted)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--s-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--s-text-muted)")
          }
        >
          79 more →
        </a>
      </ContentWrap>
    </section>
  );
}

function MiniComponentDot({ name }: { name: string }) {
  const char = name[0];
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: 28,
        height: 28,
        borderRadius: "var(--s-radius-sm)",
        background:
          "color-mix(in oklch, var(--s-primary) 12%, var(--s-surface))",
        color: "var(--s-primary)",
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "var(--s-font-mono)",
      }}
    >
      {char}
    </div>
  );
}

/* ================================================================== */
/* 4 — Presets                                                         */
/* ================================================================== */

function Presets() {
  return (
    <section
      id="presets"
      style={{
        padding: "80px 24px",
        background: "var(--s-surface-sunken)",
      }}
    >
      <ContentWrap>
        <h2
          style={{
            fontFamily: "var(--s-font-display)",
            fontWeight: 700,
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--s-text)",
            margin: "0 0 8px 0",
          }}
        >
          30 presets. Not just colors.
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "var(--s-text-secondary)",
            margin: "0 0 40px 0",
            lineHeight: 1.6,
            maxWidth: 600,
          }}
        >
          Every preset changes layout, spacing, borders, radii, dividers, and
          grids — not just the palette.
        </p>

        <PresetShowcase />

        <a
          href="/docs/presets"
          className="s-mono no-underline mt-8 inline-block transition-colors"
          style={{
            fontSize: 13,
            color: "var(--s-text-muted)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--s-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--s-text-muted)")
          }
        >
          See all 30 →
        </a>
      </ContentWrap>
    </section>
  );
}

/* ================================================================== */
/* 5 — Demo Sites                                                      */
/* ================================================================== */

const EXTRA_DEMOS = [
  { name: "Portfolio", href: "/demos/portfolio" },
  { name: "Blog", href: "/demos/blog" },
  { name: "Agency", href: "/demos/agency" },
  { name: "CLI Tool", href: "/demos/cli-tool" },
  { name: "Playground", href: "/demos/playground" },
];

function DemoSites() {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "var(--s-background)",
      }}
    >
      <ContentWrap>
        <h2
          style={{
            fontFamily: "var(--s-font-display)",
            fontWeight: 700,
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--s-text)",
            margin: "0 0 40px 0",
          }}
        >
          10 demo sites.
        </h2>

        {/* Primary demo — full width */}
        <DemoBrowser
          title="AI SaaS Landing"
          url="ai-saas.sigil-ui.dev"
          href="/demos/ai-saas"
          variant="large"
        />

        {/* 2x2 grid */}
        <div
          className="grid gap-4 mt-4"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <DemoBrowser
            title="Dashboard"
            url="dashboard.sigil-ui.dev"
            href="/demos/dashboard"
            variant="small"
          />
          <DemoBrowser
            title="E-commerce"
            url="shop.sigil-ui.dev"
            href="/demos/ecommerce"
            variant="small"
          />
          <DemoBrowser
            title="Dev Docs"
            url="docs.sigil-ui.dev"
            href="/demos/dev-docs"
            variant="small"
          />
          <DemoBrowser
            title="Startup"
            url="startup.sigil-ui.dev"
            href="/demos/startup"
            variant="small"
          />
        </div>

        {/* Text links row */}
        <div className="flex items-center gap-6 mt-6 flex-wrap">
          {EXTRA_DEMOS.map((d) => (
            <a
              key={d.name}
              href={d.href}
              className="s-mono no-underline transition-colors"
              style={{ fontSize: 13, color: "var(--s-text-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--s-text)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--s-text-muted)")
              }
            >
              {d.name} →
            </a>
          ))}
        </div>
      </ContentWrap>
    </section>
  );
}

/* ================================================================== */
/* 6 — Sandbox CTA                                                     */
/* ================================================================== */

function SandboxCTA() {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "var(--s-surface-sunken)",
      }}
    >
      <ContentWrap>
        <div
          className="grid gap-16"
          style={{ gridTemplateColumns: "1fr 1fr", alignItems: "center" }}
        >
          {/* Left */}
          <div>
            <h3
              style={{
                fontFamily: "var(--s-font-display)",
                fontWeight: 700,
                fontSize: "clamp(24px, 3vw, 36px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--s-text)",
                margin: "0 0 12px 0",
              }}
            >
              Describe what you want.
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--s-text-secondary)",
                margin: "0 0 24px 0",
                maxWidth: 400,
              }}
            >
              Your agent builds it with your active preset.
            </p>
            <Button asChild>
              <a href="/sandbox">Open Sandbox</a>
            </Button>
          </div>

          {/* Right — mock chat */}
          <pre
            className="s-mono"
            style={{
              margin: 0,
              padding: "20px 24px",
              fontSize: 13,
              lineHeight: 2,
              color: "var(--s-text-secondary)",
              background:
                "color-mix(in oklch, var(--s-surface) 60%, transparent)",
              borderRadius: "var(--s-radius-md)",
              whiteSpace: "pre",
              overflow: "hidden",
            }}
          >
            <code>
              <span style={{ color: "var(--s-text-muted)" }}>you</span>
              {"    → "}
              <span style={{ color: "var(--s-text)" }}>
                &quot;dark mode pricing page&quot;
              </span>
              {"\n"}
              <span style={{ color: "var(--s-primary)" }}>sigil</span>
              {"  → "}
              <span>Generated Pricing with noir preset</span>
              {"\n"}
              <span style={{ color: "var(--s-text-muted)" }}>you</span>
              {"    → "}
              <span style={{ color: "var(--s-text)" }}>
                &quot;make the cards float&quot;
              </span>
            </code>
          </pre>
        </div>
      </ContentWrap>
    </section>
  );
}

/* ================================================================== */
/* 7 — CLI                                                             */
/* ================================================================== */

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
        padding: "80px 24px",
        background: "var(--s-background)",
      }}
    >
      <ContentWrap style={{ maxWidth: 720 }}>
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

/* ================================================================== */
/* 8 — Footer                                                          */
/* ================================================================== */

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
        padding: "64px 24px 32px",
        background: "var(--s-surface)",
      }}
    >
      <ContentWrap>
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          {FOOTER_COLS.map((col) => (
            <div key={col.group}>
              <span
                className="s-mono"
                style={{
                  fontSize: 11,
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
              <Stack gap={12}>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="s-mono no-underline transition-colors"
                    style={{
                      fontSize: 12,
                      color: "var(--s-text-muted)",
                      transitionDuration: "var(--s-duration-fast)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--s-text)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--s-text-muted)")
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </Stack>
            </div>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 mt-12"
          style={{
            paddingTop: 24,
            borderTop: "1px solid var(--s-border-muted)",
          }}
        >
          <span
            className="s-mono"
            style={{ fontSize: 12, color: "var(--s-text-muted)" }}
          >
            MIT License
          </span>
          <span
            className="s-mono"
            style={{ fontSize: 12, color: "var(--s-text-muted)" }}
          >
            Built by{" "}
            <a
              href="https://kevinliu.me"
              className="no-underline transition-colors"
              style={{ color: "var(--s-text-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--s-text)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--s-text-muted)")
              }
            >
              Kevin Liu
            </a>
          </span>
        </div>
      </ContentWrap>
    </footer>
  );
}

/* ================================================================== */
/* Page                                                                */
/* ================================================================== */

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
        <SandboxCTA />
        <CLISection />
      </main>
      <Footer />
    </>
  );
}
