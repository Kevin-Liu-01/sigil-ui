"use client";

import {
  Button,
  Badge,
  Input,
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  BentoGrid,
  BentoGridCell,
} from "@sigil-ui/components";
import {
  DemoShell,
  Panel,
  PanelSpacer,
  PanelHeader,
  PlaceholderImage,
} from "./_shell";

const STEPS = [
  { num: "01", title: "Scaffold", desc: "Generate a new project with your preferred framework and tooling in one command." },
  { num: "02", title: "Develop", desc: "Native ESM dev server with instant HMR. Changes reflect before you blink." },
  { num: "03", title: "Test", desc: "Vitest runs your unit and integration tests with the same config. No separate setup." },
  { num: "04", title: "Deploy", desc: "Optimized production build with tree shaking, code splitting, and asset hashing." },
];

const INSTALL_OUTPUT = `$ npm create vite-plus@latest my-app
✔ Framework: React + TypeScript
✔ Features: ESLint, Vitest, Playwright
✔ Installing dependencies...

  cd my-app
  npm run dev`;

const FEATURE_SECTIONS = [
  { title: "Build", desc: "Rolldown-powered bundler with Rust-speed compilation. Automatic code splitting, tree shaking, and minification with zero configuration." },
  { title: "Test", desc: "Vitest with in-source testing support. Run unit, component, and snapshot tests using the same Vite pipeline." },
  { title: "Lint", desc: "OXC linter with opinionated defaults. Catches bugs, enforces conventions, and auto-fixes on save." },
  { title: "Format", desc: "Consistent code formatting powered by OXC formatter. Fast, deterministic, and compatible with Prettier config." },
];

export default function VitePlusCloneDemo() {
  return (
    <DemoShell>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em" }}>
            VITE+
          </span>
          <div className="flex items-center gap-5">
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Guide</span>
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Config</span>
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Plugins</span>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </Panel>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="px-4 pt-16 pb-14 text-center">
          <h1
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            The Unified Toolchain
          </h1>
          <p
            className="mx-auto mt-4"
            style={{ fontSize: 16, color: "var(--s-text-muted)", maxWidth: "26rem", lineHeight: 1.6 }}
          >
            Build, test, lint, and format — one toolchain, one config,
            zero friction. Powered by Rust.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button>Get Started</Button>
            <Button variant="outline">View on GitHub</Button>
          </div>
        </div>
      </Panel>

      {/* ── Workflow Steps ──────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Workflow</PanelHeader>
        <BentoGrid columns={{ sm: 2, md: 4 }} gap={4} className="p-1">
          {STEPS.map((step) => (
            <BentoGridCell key={step.num}>
              <div className="flex w-full flex-col gap-3">
                <PlaceholderImage aspect="3/2" label={step.title} />
                <div className="flex items-baseline gap-2">
                  <span
                    style={{
                      fontFamily: "var(--s-font-mono)",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "var(--s-primary)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {step.num}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{step.title}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Install ─────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Install</PanelHeader>
        <div className="px-4 py-3">
          <pre
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 12,
              lineHeight: 1.6,
              color: "var(--s-text-muted)",
              background: "var(--s-surface)",
              borderRadius: "var(--s-radius-sm, 6px)",
              padding: "16px",
              overflowX: "auto",
              whiteSpace: "pre",
            }}
          >
            {INSTALL_OUTPUT}
          </pre>
        </div>
      </Panel>

      {/* ── Features Accordion ──────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Features</PanelHeader>
        <div className="px-4 py-2">
          <Accordion type="single" collapsible>
            {FEATURE_SECTIONS.map((section, i) => (
              <AccordionItem key={i} value={`feat-${i}`}>
                <AccordionTrigger className="text-sm">{section.title}</AccordionTrigger>
                <AccordionContent>
                  <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                    {section.desc}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Panel>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="flex flex-col items-center gap-4 px-4 py-10 text-center">
          <h2
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Ready to unify your toolchain?
          </h2>
          <Button>Get Started</Button>
        </div>
      </Panel>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel as="footer">
        <div className="px-4 py-5 text-center">
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 11,
              color: "var(--s-text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Vite+ · Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>sigil-ui</span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
