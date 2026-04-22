"use client";

import { useEffect, useState } from "react";

import { Navbar } from "./components/navbar";
import { PresetCard } from "./components/preset-card";
import { Section, SectionDescription, SectionLabel, SectionTitle } from "./components/section";
import { Terminal } from "./components/terminal";

/* ================================================================== */
/* Section 1: Hero                                                      */
/* ================================================================== */

const CYCLE_WORDS = ["tokens", "preset", "agent", "design"] as const;

function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLE_WORDS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative r-grid-bg-subtle flex flex-col items-center justify-center text-center"
      style={{
        minHeight: "100vh",
        padding: "var(--r-space-24) var(--r-space-6)",
      }}
    >
      {/* Decorative crosses */}
      <div className="r-cross-mark absolute" style={{ top: 48, left: 48, opacity: 0.3 }} />
      <div className="r-cross-mark absolute" style={{ top: 48, right: 48, opacity: 0.3 }} />
      <div className="r-cross-mark absolute" style={{ bottom: 48, left: 48, opacity: 0.3 }} />
      <div className="r-cross-mark absolute" style={{ bottom: 48, right: 48, opacity: 0.3 }} />

      {/* Rail lines */}
      <div
        className="absolute top-0 bottom-0 hidden lg:block"
        style={{
          left: "var(--r-rail-gap)",
          width: "0.5px",
          background: "var(--r-border-muted)",
        }}
      />
      <div
        className="absolute top-0 bottom-0 hidden lg:block"
        style={{
          right: "var(--r-rail-gap)",
          width: "0.5px",
          background: "var(--r-border-muted)",
        }}
      />

      <div className="relative z-10" style={{ maxWidth: 800 }}>
        <div
          className="r-mono inline-block mb-6"
          style={{
            fontSize: "12px",
            color: "var(--r-primary)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "var(--r-space-1) var(--r-space-3)",
            border: "1px solid color-mix(in oklch, var(--r-primary) 30%, transparent)",
            borderRadius: "var(--r-radius-full)",
          }}
        >
          v0.1 — Now in alpha
        </div>

        <h1
          className="r-balance"
          style={{
            fontFamily: "var(--r-font-display)",
            fontWeight: 700,
            fontSize: "clamp(36px, 6vw, 64px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "var(--r-text)",
            margin: "0 0 var(--r-space-6) 0",
          }}
        >
          Change the{" "}
          <span
            className="inline-block r-mono"
            style={{
              color: "var(--r-primary)",
              minWidth: "3ch",
              transition: "all var(--r-duration-normal) var(--r-ease-default)",
            }}
            key={wordIndex}
          >
            {CYCLE_WORDS[wordIndex]}
          </span>
          .
          <br />
          Everything updates.
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2vw, 19px)",
            lineHeight: 1.6,
            color: "var(--r-text-secondary)",
            maxWidth: 560,
            margin: "0 auto var(--r-space-12) auto",
          }}
        >
          The component library where one markdown file controls your entire
          design system. 70+ components. 5 presets. Built for AI agents.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="r-press r-mono inline-flex items-center no-underline font-medium transition-all"
            style={{
              padding: "var(--r-space-3) var(--r-space-6)",
              borderRadius: "var(--r-radius-md)",
              background: "var(--r-primary)",
              color: "#fff",
              fontSize: "14px",
              border: "none",
              boxShadow: "var(--r-shadow-primary)",
              transitionDuration: "var(--r-duration-fast)",
            }}
          >
            Get Started
          </a>
          <a
            href="#components"
            className="r-press r-mono inline-flex items-center no-underline font-medium transition-all"
            style={{
              padding: "var(--r-space-3) var(--r-space-6)",
              borderRadius: "var(--r-radius-md)",
              background: "transparent",
              color: "var(--r-text-secondary)",
              fontSize: "14px",
              border: "1px solid var(--r-border)",
              transitionDuration: "var(--r-duration-fast)",
            }}
          >
            View Components
          </a>
        </div>
      </div>

      {/* Bottom cross line */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "0.5px", background: "var(--r-border-muted)" }}
      />
    </section>
  );
}

/* ================================================================== */
/* Section 2: Problem                                                   */
/* ================================================================== */

const SHADCN_STEPS = [
  "Copy 50 components",
  "Edit globals.css",
  "Customize each one",
  "Components drift",
  "Grep through files",
  "Repeat",
];

const SIGIL_STEPS = [
  "Install preset",
  "All components inherit",
  "Edit one token file",
  "Everything updates",
  "Ship consistent UI",
  "Your agent handles it",
];

function Problem() {
  return (
    <Section id="problem">
      <SectionLabel>The problem</SectionLabel>
      <SectionTitle>shadcn gives you components. You still build the system.</SectionTitle>
      <SectionDescription>
        Every shadcn project reinvents the design system. Tokens, presets, and
        consistency are your problem. Sigil makes them the library's problem.
      </SectionDescription>

      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))" }}
      >
        {/* shadcn side */}
        <ComparisonCard
          label="shadcn/ui"
          sublabel="The current workflow"
          steps={SHADCN_STEPS}
          iconColor="var(--r-text-subtle)"
          icon="×"
        />

        {/* Sigil side */}
        <ComparisonCard
          label="Sigil UI"
          sublabel="One token file"
          steps={SIGIL_STEPS}
          iconColor="var(--r-success)"
          icon="✓"
          highlighted
        />
      </div>
    </Section>
  );
}

function ComparisonCard({
  label,
  sublabel,
  steps,
  iconColor,
  icon,
  highlighted = false,
}: {
  label: string;
  sublabel: string;
  steps: string[];
  iconColor: string;
  icon: string;
  highlighted?: boolean;
}) {
  return (
    <div
      style={{
        padding: "var(--r-space-8)",
        borderRadius: "var(--r-card-radius)",
        border: highlighted
          ? "1px solid color-mix(in oklch, var(--r-primary) 40%, transparent)"
          : "1px solid var(--r-border)",
        background: highlighted
          ? "color-mix(in oklch, var(--r-primary) 4%, var(--r-surface))"
          : "var(--r-surface)",
      }}
    >
      <div
        className="r-mono font-semibold"
        style={{
          fontSize: "14px",
          color: highlighted ? "var(--r-primary)" : "var(--r-text)",
          marginBottom: "var(--r-space-1)",
        }}
      >
        {label}
      </div>
      <div
        className="r-mono"
        style={{
          fontSize: "11px",
          color: "var(--r-text-subtle)",
          marginBottom: "var(--r-space-6)",
        }}
      >
        {sublabel}
      </div>
      <div className="flex flex-col" style={{ gap: "var(--r-space-3)" }}>
        {steps.map((step, i) => (
          <div
            key={i}
            className="r-mono flex items-start"
            style={{ gap: "var(--r-space-3)", fontSize: "13px" }}
          >
            <span
              className="r-tabular"
              style={{
                color: iconColor,
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "20px",
                flexShrink: 0,
                width: 16,
                textAlign: "center",
              }}
            >
              {icon}
            </span>
            <span style={{ color: "var(--r-text-secondary)", lineHeight: "20px" }}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Section 3: Token Demo                                                */
/* ================================================================== */

const TOKEN_CODE = `# sigil.tokens.md

## Colors
| Token       | Value                    |
|-------------|--------------------------|
| primary     | oklch(0.65 0.15 280)     |
| background  | #0a0a0f                  |
| surface     | #141419                  |
| text        | #fafafa                  |

## Typography
| Token       | Value                    |
|-------------|--------------------------|
| display     | Nacelle, system-ui       |
| body        | system-ui, sans-serif    |
| mono        | Roboto Mono, monospace   |

## Spacing
| Token       | Value                    |
|-------------|--------------------------|
| grid-cell   | 48px                     |
| card-radius | 10px                     |`;

function TokenDemo() {
  return (
    <Section id="tokens" grid>
      <SectionLabel>Token system</SectionLabel>
      <SectionTitle>One file. Every component.</SectionTitle>
      <SectionDescription>
        Your entire design system lives in a single markdown file. Change a
        value, and every component that references it updates immediately.
      </SectionDescription>

      {/* Code block */}
      <div
        className="overflow-hidden"
        style={{
          borderRadius: "var(--r-card-radius)",
          border: "1px solid var(--r-border)",
          background: "var(--r-surface)",
          marginBottom: "var(--r-space-12)",
        }}
      >
        <div
          className="r-mono flex items-center"
          style={{
            padding: "var(--r-space-3) var(--r-space-4)",
            borderBottom: "1px solid var(--r-border)",
            fontSize: "11px",
            color: "var(--r-text-subtle)",
          }}
        >
          sigil.tokens.md
        </div>
        <pre
          className="r-mono overflow-x-auto"
          style={{
            padding: "var(--r-space-6)",
            fontSize: "12.5px",
            lineHeight: 1.7,
            color: "var(--r-text-secondary)",
            margin: 0,
          }}
        >
          <code>{TOKEN_CODE}</code>
        </pre>
      </div>

      {/* Mini component previews */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}
      >
        <MiniPreview label="Button">
          <div
            className="r-mono r-press"
            style={{
              padding: "var(--r-space-2) var(--r-space-4)",
              borderRadius: "var(--r-radius-md)",
              background: "var(--r-primary)",
              color: "#fff",
              fontSize: "13px",
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            Primary action
          </div>
        </MiniPreview>

        <MiniPreview label="Card">
          <div
            style={{
              padding: "var(--r-space-4)",
              borderRadius: "var(--r-card-radius)",
              border: "1px solid var(--r-border)",
              background: "var(--r-surface-elevated)",
            }}
          >
            <div
              className="r-mono"
              style={{ fontSize: "12px", color: "var(--r-text)", fontWeight: 600, marginBottom: 4 }}
            >
              Card title
            </div>
            <div style={{ fontSize: "11px", color: "var(--r-text-muted)" }}>
              Inherits all tokens
            </div>
          </div>
        </MiniPreview>

        <MiniPreview label="Badge">
          <div className="flex gap-2">
            <span
              className="r-mono"
              style={{
                padding: "2px var(--r-space-2)",
                borderRadius: "var(--r-radius-full)",
                background: "var(--r-primary-muted)",
                color: "var(--r-primary)",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              default
            </span>
            <span
              className="r-mono"
              style={{
                padding: "2px var(--r-space-2)",
                borderRadius: "var(--r-radius-full)",
                background: "var(--r-success-muted)",
                color: "var(--r-success)",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              success
            </span>
          </div>
        </MiniPreview>

        <MiniPreview label="Input">
          <div
            className="r-mono"
            style={{
              padding: "var(--r-space-2) var(--r-space-3)",
              borderRadius: "var(--r-radius-md)",
              border: "1px solid var(--r-border)",
              background: "var(--r-bg)",
              color: "var(--r-text-muted)",
              fontSize: "12px",
              width: "100%",
            }}
          >
            Placeholder text...
          </div>
        </MiniPreview>
      </div>
    </Section>
  );
}

function MiniPreview({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "var(--r-space-6)",
        borderRadius: "var(--r-card-radius)",
        border: "1px solid var(--r-border)",
        background: "var(--r-surface)",
      }}
    >
      <div
        className="r-mono"
        style={{
          fontSize: "10px",
          color: "var(--r-text-subtle)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "var(--r-space-4)",
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

/* ================================================================== */
/* Section 4: Component Showcase                                        */
/* ================================================================== */

const COMPONENT_CATEGORIES = [
  { name: "Layout", count: 12, examples: ["Grid", "Stack", "Frame", "PageGrid"] },
  { name: "UI", count: 18, examples: ["Button", "Badge", "Card", "Avatar"] },
  { name: "Navigation", count: 8, examples: ["Tabs", "Breadcrumb", "Sidebar"] },
  { name: "Overlays", count: 7, examples: ["Dialog", "Popover", "Tooltip"] },
  { name: "Shapes", count: 10, examples: ["Diamond", "Hexagon", "Triangle"] },
  { name: "3D", count: 5, examples: ["Box3D", "Sphere", "Prism"] },
  { name: "Diagrams", count: 6, examples: ["Flowchart", "Tree", "Network"] },
  { name: "Marketing", count: 8, examples: ["Hero", "Pricing", "Feature"] },
];

function ComponentShowcase() {
  return (
    <Section id="components">
      <SectionLabel>Components</SectionLabel>
      <SectionTitle>70+ components. Zero configuration.</SectionTitle>
      <SectionDescription>
        Every component reads your token file. Install once, customize everything
        by editing tokens — not component source code.
      </SectionDescription>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))" }}
      >
        {COMPONENT_CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className="group transition-colors"
            style={{
              padding: "var(--r-space-6)",
              borderRadius: "var(--r-card-radius)",
              border: "1px solid var(--r-border)",
              background: "var(--r-surface)",
            }}
          >
            <div className="flex items-baseline justify-between mb-3">
              <span
                className="r-mono font-semibold"
                style={{ fontSize: "14px", color: "var(--r-text)" }}
              >
                {cat.name}
              </span>
              <span
                className="r-mono r-tabular"
                style={{ fontSize: "11px", color: "var(--r-text-subtle)" }}
              >
                {cat.count}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.examples.map((ex) => (
                <span
                  key={ex}
                  className="r-mono"
                  style={{
                    fontSize: "11px",
                    padding: "2px var(--r-space-2)",
                    borderRadius: "var(--r-radius-sm)",
                    background: "var(--r-bg)",
                    color: "var(--r-text-muted)",
                    border: "1px solid var(--r-border-muted)",
                  }}
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ================================================================== */
/* Section 5: Preset Gallery                                            */
/* ================================================================== */

const PRESETS = [
  {
    name: "Sigil",
    fonts: "Nacelle / System / Roboto Mono",
    colors: ["#9b99e8", "#0a0a0f", "#fafafa", "#141419", "#27272a"],
    bg: "#0a0a0f",
    text: "#fafafa",
    border: "#27272a",
    active: true,
  },
  {
    name: "Midnight",
    fonts: "Inter / System / Fira Code",
    colors: ["#6366f1", "#020617", "#e2e8f0", "#0f172a", "#1e293b"],
    bg: "#020617",
    text: "#e2e8f0",
    border: "#1e293b",
  },
  {
    name: "Editorial",
    fonts: "Playfair / Georgia / IBM Plex Mono",
    colors: ["#c2410c", "#faf5ef", "#1c1917", "#f5ebe0", "#d6cdc5"],
    bg: "#faf5ef",
    text: "#1c1917",
    border: "#d6cdc5",
  },
  {
    name: "Brutalist",
    fonts: "Space Grotesk / System / Space Mono",
    colors: ["#ff3d00", "#ffffff", "#000000", "#f5f5f5", "#e0e0e0"],
    bg: "#ffffff",
    text: "#000000",
    border: "#000000",
  },
  {
    name: "Soft",
    fonts: "Nunito / System / JetBrains Mono",
    colors: ["#8b5cf6", "#faf5ff", "#1e1b4b", "#f3e8ff", "#e9d5ff"],
    bg: "#faf5ff",
    text: "#1e1b4b",
    border: "#e9d5ff",
  },
];

function PresetGallery() {
  return (
    <Section id="presets">
      <SectionLabel>Presets</SectionLabel>
      <SectionTitle>Ship a preset, not a Tailwind config.</SectionTitle>
      <SectionDescription>
        Pick a preset. Your entire component library adapts — colors, typography,
        spacing, radius, shadows. No manual theming.
      </SectionDescription>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))" }}
      >
        {PRESETS.map((p) => (
          <PresetCard key={p.name} {...p} />
        ))}
      </div>
    </Section>
  );
}

/* ================================================================== */
/* Section 6: Shapes & 3D                                               */
/* ================================================================== */

function ShapesSection() {
  return (
    <Section id="shapes" grid>
      <SectionLabel>Shapes</SectionLabel>
      <SectionTitle>Shapes that shadcn doesn&apos;t have.</SectionTitle>
      <SectionDescription>
        Diamond, hexagon, triangle, diagonal — token-aware shape components for
        layouts that need more than rectangles.
      </SectionDescription>

      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 180px), 1fr))" }}
      >
        {/* Diamond */}
        <ShapeCard name="Diamond">
          <div
            style={{
              width: 56,
              height: 56,
              background: "var(--r-primary)",
              transform: "rotate(45deg)",
              borderRadius: "var(--r-radius-sm)",
              opacity: 0.8,
            }}
          />
        </ShapeCard>

        {/* Hexagon */}
        <ShapeCard name="Hexagon">
          <div
            style={{
              width: 64,
              height: 56,
              background: "var(--r-primary)",
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              opacity: 0.8,
            }}
          />
        </ShapeCard>

        {/* Triangle */}
        <ShapeCard name="Triangle">
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "32px solid transparent",
              borderRight: "32px solid transparent",
              borderBottom: "56px solid var(--r-primary)",
              opacity: 0.8,
            }}
          />
        </ShapeCard>

        {/* Diagonal */}
        <ShapeCard name="Diagonal">
          <div
            style={{
              width: 64,
              height: 56,
              background: "var(--r-primary)",
              clipPath: "polygon(0 0, 100% 20%, 100% 100%, 0 80%)",
              opacity: 0.8,
            }}
          />
        </ShapeCard>
      </div>

      {/* 3D Box showcase */}
      <div
        className="mt-12 flex items-center justify-center"
        style={{
          padding: "var(--r-space-16) 0",
        }}
      >
        <div style={{ perspective: "600px" }}>
          <div
            style={{
              width: 120,
              height: 120,
              position: "relative",
              transformStyle: "preserve-3d",
              transform: "rotateX(-20deg) rotateY(30deg)",
            }}
          >
            {/* Front face */}
            <div
              style={{
                position: "absolute",
                width: 120,
                height: 120,
                background: "var(--r-primary)",
                opacity: 0.9,
                border: "1px solid color-mix(in oklch, var(--r-primary) 60%, white)",
                transform: "translateZ(60px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="r-mono" style={{ color: "#fff", fontSize: "12px" }}>front</span>
            </div>
            {/* Right face */}
            <div
              style={{
                position: "absolute",
                width: 120,
                height: 120,
                background: "color-mix(in oklch, var(--r-primary) 70%, black)",
                opacity: 0.9,
                border: "1px solid color-mix(in oklch, var(--r-primary) 40%, black)",
                transform: "rotateY(90deg) translateZ(60px)",
              }}
            />
            {/* Top face */}
            <div
              style={{
                position: "absolute",
                width: 120,
                height: 120,
                background: "color-mix(in oklch, var(--r-primary) 80%, white)",
                opacity: 0.9,
                border: "1px solid color-mix(in oklch, var(--r-primary) 60%, white)",
                transform: "rotateX(90deg) translateZ(60px)",
              }}
            />
          </div>
        </div>

        <div
          className="r-mono ml-12 hidden md:block"
          style={{ fontSize: "12px", color: "var(--r-text-muted)", maxWidth: 280 }}
        >
          <div style={{ color: "var(--r-text)", fontWeight: 600, marginBottom: "var(--r-space-2)" }}>
            Box3D
          </div>
          Token-driven 3D primitives with CSS transforms.
          Color, radius, and depth respond to your token file.
        </div>
      </div>
    </Section>
  );
}

function ShapeCard({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        padding: "var(--r-space-8) var(--r-space-4)",
        borderRadius: "var(--r-card-radius)",
        border: "1px solid var(--r-border)",
        background: "var(--r-surface)",
        gap: "var(--r-space-4)",
      }}
    >
      {children}
      <span
        className="r-mono"
        style={{ fontSize: "12px", color: "var(--r-text-muted)" }}
      >
        {name}
      </span>
    </div>
  );
}

/* ================================================================== */
/* Section 7: Agent-Friendly                                            */
/* ================================================================== */

function AgentFriendly() {
  return (
    <Section id="agents">
      <SectionLabel>AI-native</SectionLabel>
      <SectionTitle>Built for the way you actually build.</SectionTitle>
      <SectionDescription>
        Your agent reads one markdown file and understands your entire design
        system. No custom prompts, no component introspection, no guessing.
      </SectionDescription>

      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}
      >
        {/* Concept */}
        <div
          style={{
            padding: "var(--r-space-8)",
            borderRadius: "var(--r-card-radius)",
            border: "1px solid var(--r-border)",
            background: "var(--r-surface)",
          }}
        >
          <div
            className="r-mono font-semibold"
            style={{ fontSize: "14px", color: "var(--r-text)", marginBottom: "var(--r-space-6)" }}
          >
            How it works
          </div>
          <div className="flex flex-col" style={{ gap: "var(--r-space-4)" }}>
            {[
              { num: "01", text: "Agent reads sigil.tokens.md" },
              { num: "02", text: "Understands your colors, fonts, spacing, radius" },
              { num: "03", text: "Generates components that match your system" },
              { num: "04", text: "Changes propagate — edit tokens, not components" },
            ].map((step) => (
              <div
                key={step.num}
                className="r-mono flex items-start"
                style={{ gap: "var(--r-space-3)", fontSize: "13px" }}
              >
                <span
                  className="r-tabular"
                  style={{
                    color: "var(--r-primary)",
                    fontWeight: 600,
                    fontSize: "11px",
                    lineHeight: "20px",
                    flexShrink: 0,
                  }}
                >
                  {step.num}
                </span>
                <span style={{ color: "var(--r-text-secondary)", lineHeight: "20px" }}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Code example */}
        <div
          className="overflow-hidden"
          style={{
            borderRadius: "var(--r-card-radius)",
            border: "1px solid var(--r-border)",
            background: "var(--r-surface)",
          }}
        >
          <div
            className="r-mono"
            style={{
              padding: "var(--r-space-3) var(--r-space-4)",
              borderBottom: "1px solid var(--r-border)",
              fontSize: "11px",
              color: "var(--r-text-subtle)",
            }}
          >
            workflow
          </div>
          <pre
            className="r-mono"
            style={{
              padding: "var(--r-space-6)",
              fontSize: "12.5px",
              lineHeight: 2,
              color: "var(--r-text-secondary)",
              margin: 0,
            }}
          >
            <code>
              <span style={{ color: "var(--r-text-subtle)" }}>$ </span>
              <span style={{ color: "var(--r-text)" }}>npx sigil init</span>
              {"\n"}
              <span style={{ color: "var(--r-text-subtle)" }}>{"  "}→ </span>
              creates sigil.tokens.md
              {"\n\n"}
              <span style={{ color: "var(--r-text-subtle)" }}>$ </span>
              <span style={{ color: "var(--r-text)" }}>edit tokens</span>
              {"\n"}
              <span style={{ color: "var(--r-text-subtle)" }}>{"  "}→ </span>
              change primary to oklch(0.70 0.18 160)
              {"\n\n"}
              <span style={{ color: "var(--r-text-subtle)" }}>$ </span>
              <span style={{ color: "var(--r-text)" }}>all components update</span>
              {"\n"}
              <span style={{ color: "var(--r-text-subtle)" }}>{"  "}→ </span>
              zero manual changes
            </code>
          </pre>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/* Section 8: CLI                                                       */
/* ================================================================== */

const CLI_LINES = [
  { text: "npx sigil init", prefix: "$", color: "var(--r-text)", delay: 800 },
  { text: "", delay: 300 },
  { text: "Preset: sigil", prefix: "✓", color: "var(--r-success)", delay: 500 },
  { text: "Created sigil.config.ts", prefix: "✓", color: "var(--r-success)", delay: 400 },
  { text: "Created sigil.tokens.md", prefix: "✓", color: "var(--r-success)", delay: 400 },
  { text: "Installed token CSS variables", prefix: "✓", color: "var(--r-success)", delay: 400 },
  { text: "Ready to import components", prefix: "✓", color: "var(--r-success)", delay: 400 },
  { text: "", delay: 200 },
  { text: "Done in 1.2s", prefix: " ", color: "var(--r-text-muted)", delay: 300 },
];

function CLISection() {
  return (
    <Section id="cli" narrow>
      <div className="text-center" style={{ marginBottom: "var(--r-space-12)" }}>
        <SectionLabel>CLI</SectionLabel>
        <SectionTitle>One command. Done.</SectionTitle>
        <SectionDescription>
          No configuration wizard. No multi-step setup. One command installs your
          preset, generates your token file, and you&apos;re building.
        </SectionDescription>
      </div>

      <Terminal lines={CLI_LINES} title="~/ — zsh" />
    </Section>
  );
}

/* ================================================================== */
/* Section 9: Open Source                                                */
/* ================================================================== */

function OpenSource() {
  return (
    <Section id="open-source" grid>
      <div className="text-center flex flex-col items-center">
        <SectionLabel>Open source</SectionLabel>
        <SectionTitle>Free. Open source. MIT.</SectionTitle>

        {/* Stats */}
        <div
          className="flex flex-wrap justify-center"
          style={{ gap: "var(--r-space-12)", marginBottom: "var(--r-space-12)" }}
        >
          {[
            { value: "70+", label: "Components" },
            { value: "5", label: "Presets" },
            { value: "0", label: "Config needed" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="r-mono r-tabular font-bold"
                style={{
                  fontSize: "36px",
                  letterSpacing: "-0.03em",
                  color: "var(--r-text)",
                  lineHeight: 1,
                  marginBottom: "var(--r-space-2)",
                }}
              >
                {stat.value}
              </div>
              <div
                className="r-mono"
                style={{ fontSize: "12px", color: "var(--r-text-muted)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Install command */}
        <div
          className="r-mono flex items-center gap-3"
          style={{
            padding: "var(--r-space-3) var(--r-space-6)",
            borderRadius: "var(--r-radius-md)",
            background: "var(--r-surface)",
            border: "1px solid var(--r-border)",
            fontSize: "13px",
            color: "var(--r-text-secondary)",
            marginBottom: "var(--r-space-8)",
          }}
        >
          <span style={{ color: "var(--r-text-subtle)", userSelect: "none" }}>$</span>
          <span>npm install @sigil-ui/components</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://github.com/sigil-ui/sigil"
            target="_blank"
            rel="noopener noreferrer"
            className="r-press r-mono inline-flex items-center gap-2 no-underline font-medium transition-all"
            style={{
              padding: "var(--r-space-3) var(--r-space-6)",
              borderRadius: "var(--r-radius-md)",
              background: "var(--r-surface)",
              color: "var(--r-text)",
              fontSize: "13px",
              border: "1px solid var(--r-border)",
              transitionDuration: "var(--r-duration-fast)",
            }}
          >
            <GitHubIcon />
            Star on GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/@sigil-ui/components"
            target="_blank"
            rel="noopener noreferrer"
            className="r-press r-mono inline-flex items-center gap-2 no-underline font-medium transition-all"
            style={{
              padding: "var(--r-space-3) var(--r-space-6)",
              borderRadius: "var(--r-radius-md)",
              background: "transparent",
              color: "var(--r-text-secondary)",
              fontSize: "13px",
              border: "1px solid var(--r-border)",
              transitionDuration: "var(--r-duration-fast)",
            }}
          >
            View on npm
          </a>
        </div>
      </div>
    </Section>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

/* ================================================================== */
/* Section 10: Footer                                                   */
/* ================================================================== */

const FOOTER_LINKS = [
  { group: "Product", links: [{ label: "Docs", href: "#" }, { label: "Components", href: "#components" }, { label: "Presets", href: "#presets" }, { label: "CLI", href: "#cli" }] },
  { group: "Community", links: [{ label: "GitHub", href: "https://github.com/sigil-ui/sigil" }, { label: "npm", href: "https://www.npmjs.com/package/@sigil-ui/components" }, { label: "Discord", href: "#" }] },
  { group: "Resources", links: [{ label: "Token Guide", href: "#" }, { label: "Preset API", href: "#" }, { label: "Agent Integration", href: "#" }] },
];

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--r-border)",
        padding: "var(--r-space-16) var(--r-space-6) var(--r-space-8)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--r-content-max)" }}>
        <div
          className="grid gap-12 mb-12"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))" }}
        >
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="1.5" />
                <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span
                className="r-mono font-semibold"
                style={{ fontSize: "14px", color: "var(--r-text)" }}
              >
                sigil
              </span>
            </div>
            <p
              className="r-mono"
              style={{
                fontSize: "12px",
                color: "var(--r-text-muted)",
                lineHeight: 1.6,
                maxWidth: 240,
              }}
            >
              Change the tokens. Everything updates.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.group}>
              <div
                className="r-mono font-semibold"
                style={{
                  fontSize: "12px",
                  color: "var(--r-text-subtle)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "var(--r-space-4)",
                }}
              >
                {group.group}
              </div>
              <div className="flex flex-col" style={{ gap: "var(--r-space-3)" }}>
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="r-mono no-underline transition-colors"
                    style={{
                      fontSize: "13px",
                      color: "var(--r-text-muted)",
                      transitionDuration: "var(--r-duration-fast)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--r-text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--r-text-muted)")}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="flex flex-wrap items-center justify-between gap-4"
          style={{
            paddingTop: "var(--r-space-6)",
            borderTop: "1px solid var(--r-border-muted)",
          }}
        >
          <span
            className="r-mono"
            style={{ fontSize: "12px", color: "var(--r-text-subtle)" }}
          >
            MIT License
          </span>
          <span className="r-mono" style={{ fontSize: "12px", color: "var(--r-text-subtle)" }}>
            Built by{" "}
            <a
              href="https://kevinliu.me"
              className="no-underline transition-colors"
              style={{ color: "var(--r-text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--r-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--r-text-muted)")}
            >
              Kevin Liu
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/* Page                                                                 */
/* ================================================================== */

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <TokenDemo />
        <ComponentShowcase />
        <PresetGallery />
        <ShapesSection />
        <AgentFriendly />
        <CLISection />
        <OpenSource />
      </main>
      <Footer />
    </>
  );
}
