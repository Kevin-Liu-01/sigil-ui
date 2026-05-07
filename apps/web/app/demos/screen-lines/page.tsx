"use client";

import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Input,
  Switch,
  Avatar,
  KPI,
  Progress,
  Slider,
  Toggle,
  Label,
  LoadingSpinner,
  Skeleton,
  BentoGrid,
  BentoGridCell,
} from "@sigil-ui/components";

/* -------------------------------------------------------------------------- */
/*  Section panel — the atomic structural unit                                */
/* -------------------------------------------------------------------------- */

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`s-screen-line-top s-screen-line-bottom s-container-column ${className}`}
    >
      {children}
    </section>
  );
}

function PanelSpacer() {
  return (
    <div className="s-screen-line-top s-screen-line-bottom s-container-column h-8" />
  );
}

function PanelHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="s-screen-line-bottom flex items-center px-4 py-2.5">
      <span
        className="s-mono"
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.04em",
          color: "var(--s-text-muted)",
        }}
      >
        {children}
      </span>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function ScreenLinesDemo() {
  return (
    <div
      className="min-h-screen overflow-x-clip"
      style={{
        background: "var(--s-background)",
        color: "var(--s-text)",
        fontFamily: "var(--s-font-body)",
      }}
    >
      <div className="mx-auto max-w-4xl px-2">
        {/* ── Navbar ──────────────────────────────────────────────── */}
        <Panel>
          <div className="flex h-12 items-center justify-between px-4">
            <span
              className="s-mono"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--s-text)",
              }}
            >
              sigil
            </span>
            <span
              className="s-mono"
              style={{ fontSize: 10, color: "var(--s-text-muted)" }}
            >
              screen-lines
            </span>
          </div>
        </Panel>

        {/* ── Hero heading ────────────────────────────────────────── */}
        <PanelSpacer />
        <Panel>
          <div className="px-4 pt-12 pb-10">
            <p
              className="s-mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.08em",
                color: "var(--s-primary)",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Component Showcase
            </p>
            <h1
              className="s-display"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: 10,
              }}
            >
              Pixel&#8209;perfect, token&#8209;driven.
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "var(--s-text-secondary, var(--s-text-muted))",
                maxWidth: "32rem",
                lineHeight: 1.6,
              }}
            >
              Every visual property flows from a central token spec through
              CSS custom properties into 350+ components.
            </p>
          </div>
        </Panel>

        {/* ── Overview ────────────────────────────────────────────── */}
        <PanelSpacer />
        <Panel>
          <PanelHeader>Overview</PanelHeader>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { label: "Components", value: "350+" },
              { label: "Tokens", value: "519" },
              { label: "Presets", value: "46" },
              { label: "Categories", value: "33" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="px-4 py-4"
                style={{
                  borderRight:
                    i < 3 ? "1px solid var(--s-line, var(--s-border-muted))" : undefined,
                }}
              >
                <div
                  className="s-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--s-text-muted)",
                    marginBottom: 4,
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* ── Components ──────────────────────────────────────────── */}
        <PanelSpacer />
        <Panel>
          <PanelHeader>Components</PanelHeader>
          <BentoGrid columns={{ md: 3 }} gap={4} className="p-1">
            <BentoGridCell rowSpan={2}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">Secondary</Button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="outline">Outline</Button>
                  <Button size="sm" variant="ghost">Ghost</Button>
                </div>
              </div>
            </BentoGridCell>

            <BentoGridCell>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">v2</Badge>
                <Badge variant="outline">Beta</Badge>
              </div>
            </BentoGridCell>

            <BentoGridCell>
              <div className="flex items-center gap-4">
                <Toggle size="sm" defaultPressed>On</Toggle>
                <Switch defaultChecked />
              </div>
            </BentoGridCell>

            <BentoGridCell colSpan={2}>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Token Pipeline</CardTitle>
                  <CardDescription>
                    519 configurable fields across 33 categories — colors,
                    typography, spacing, motion, and more.
                  </CardDescription>
                </CardHeader>
              </Card>
            </BentoGridCell>

            <BentoGridCell>
              <div className="flex items-center gap-3">
                <Avatar fallback="KL" size="sm" />
                <Avatar fallback="CD" size="md" />
                <Avatar fallback="UI" size="lg" />
              </div>
            </BentoGridCell>

            <BentoGridCell>
              <KPI label="Components" value="350+" change="+12%" trend="up" />
            </BentoGridCell>

            <BentoGridCell>
              <div className="w-full px-1">
                <Slider defaultValue={[40]} max={100} step={1} />
              </div>
            </BentoGridCell>

            <BentoGridCell colSpan={2}>
              <div className="flex w-full flex-col gap-3">
                <Progress value={72} className="w-full" />
                <Progress value={38} className="w-full" />
              </div>
            </BentoGridCell>

            <BentoGridCell>
              <div className="flex w-full flex-col gap-2">
                <Label>Email</Label>
                <Input placeholder="you@example.com" className="w-full" />
              </div>
            </BentoGridCell>
          </BentoGrid>
        </Panel>

        {/* ── Stack ───────────────────────────────────────────────── */}
        <PanelSpacer />
        <Panel>
          <PanelHeader>Stack</PanelHeader>
          <div className="flex flex-wrap gap-1.5 px-4 py-4">
            {[
              "React", "Next.js", "TypeScript", "Tailwind CSS",
              "Radix UI", "tsup", "Turborepo", "pnpm",
              "OKLCH", "CSS Custom Properties",
            ].map((tech) => (
              <span
                key={tech}
                className="s-mono"
                style={{
                  fontSize: 11,
                  padding: "4px 10px",
                  borderRadius: "var(--s-radius-full, 999px)",
                  border: "1px solid var(--s-line, var(--s-border-muted))",
                  color: "var(--s-text-secondary, var(--s-text-muted))",
                  background: "var(--s-background)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </Panel>

        {/* ── Metrics ─────────────────────────────────────────────── */}
        <PanelSpacer />
        <Panel>
          <PanelHeader>Metrics</PanelHeader>
          <div className="px-4 py-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span
                  className="s-mono"
                  style={{ fontSize: 11, color: "var(--s-text-muted)" }}
                >
                  Token Coverage
                </span>
                <span
                  className="s-mono"
                  style={{
                    fontSize: 11,
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--s-text)",
                  }}
                >
                  100%
                </span>
              </div>
              <Progress value={100} className="w-full" />

              <div className="flex items-center justify-between">
                <span
                  className="s-mono"
                  style={{ fontSize: 11, color: "var(--s-text-muted)" }}
                >
                  Preset Migration
                </span>
                <span
                  className="s-mono"
                  style={{
                    fontSize: 11,
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--s-text)",
                  }}
                >
                  72%
                </span>
              </div>
              <Progress value={72} className="w-full" />

              <div className="flex items-center justify-between">
                <span
                  className="s-mono"
                  style={{ fontSize: 11, color: "var(--s-text-muted)" }}
                >
                  Component Audit
                </span>
                <span
                  className="s-mono"
                  style={{
                    fontSize: 11,
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--s-text)",
                  }}
                >
                  45%
                </span>
              </div>
              <Progress value={45} className="w-full" />
            </div>
          </div>
        </Panel>

        {/* ── Loading States ──────────────────────────────────────── */}
        <PanelSpacer />
        <Panel>
          <PanelHeader>Loading States</PanelHeader>
          <div className="flex items-center gap-6 px-4 py-6">
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="md" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 flex-1" />
          </div>
        </Panel>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <PanelSpacer />
        <Panel>
          <div className="px-4 py-5 text-center">
            <p
              className="s-mono"
              style={{
                fontSize: 11,
                color: "var(--s-text-muted)",
                letterSpacing: "0.04em",
              }}
            >
              Built with{" "}
              <span style={{ fontWeight: 600, color: "var(--s-text)" }}>
                sigil-ui
              </span>
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
