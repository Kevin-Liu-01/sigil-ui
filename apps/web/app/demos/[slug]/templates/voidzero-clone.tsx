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

const ECOSYSTEM_TABS: Record<string, { tool: string; desc: string }> = {
  Build: { tool: "Vite", desc: "Next-generation frontend build tool. Instant dev server startup with native ES modules and lightning-fast HMR." },
  Test: { tool: "Vitest", desc: "Blazing fast unit test framework powered by Vite. Compatible with Jest API, native ESM, and TypeScript." },
  Bundle: { tool: "Rolldown", desc: "Rust-based bundler designed as a drop-in Rollup replacement. 10-100x faster builds with full plugin compatibility." },
  Compile: { tool: "OXC", desc: "Oxidation compiler toolchain written in Rust. Parser, linter, formatter, transformer, and minifier — all in one." },
};

const BENTO_TOOLS = [
  { name: "Vite", desc: "Dev server & build" },
  { name: "Vitest", desc: "Unit testing" },
  { name: "Rolldown", desc: "Bundler" },
  { name: "OXC", desc: "Compiler toolchain" },
];

const LINKS = ["GitHub", "Discord", "Blog", "RFC Process", "Contributing"];

export default function VoidZeroCloneDemo() {
  return (
    <DemoShell>
      {/* ── Banner ──────────────────────────────────────────────── */}
      <Panel as="header">
        <div
          className="flex items-center justify-center px-4 py-2.5"
          style={{ background: "color-mix(in oklch, var(--s-primary) 12%, var(--s-background))" }}
        >
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 11,
              letterSpacing: "0.04em",
              color: "var(--s-primary)",
            }}
          >
            Announcing VoidZero Inc — the company behind Vite
          </span>
        </div>
      </Panel>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="px-4 pt-20 pb-16 text-center">
          <h1
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(3rem, 8vw, 5rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            VOID(0)
          </h1>
          <p
            className="mx-auto mt-5"
            style={{ fontSize: 16, color: "var(--s-text-muted)", maxWidth: "28rem", lineHeight: 1.6 }}
          >
            A unified, high-performance toolchain for the JavaScript ecosystem.
            Build, test, bundle, and compile — all on Rust.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button>Get Started</Button>
            <Button variant="outline">GitHub</Button>
          </div>
        </div>
      </Panel>

      {/* ── Ecosystem Tabs ──────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Ecosystem</PanelHeader>
        <div className="px-4 py-3">
          <Tabs defaultValue="Build">
            <TabsList>
              {Object.keys(ECOSYSTEM_TABS).map((tab) => (
                <TabsTrigger key={tab} value={tab} className="text-xs">{tab}</TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(ECOSYSTEM_TABS).map(([key, { tool, desc }]) => (
              <TabsContent key={key} value={key} className="mt-4">
                <div
                  className="flex flex-col gap-2 p-4"
                  style={{
                    background: "var(--s-surface)",
                    borderRadius: "var(--s-radius-sm, 6px)",
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{tool}</span>
                  <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>{desc}</p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Panel>

      {/* ── Bento Grid ──────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Toolchain</PanelHeader>
        <BentoGrid columns={{ sm: 2 }} gap={4} className="p-1">
          {BENTO_TOOLS.map((t) => (
            <BentoGridCell key={t.name}>
              <div className="flex w-full flex-col gap-1.5 py-2 text-center">
                <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>{t.name}</span>
                <span
                  style={{
                    fontFamily: "var(--s-font-mono)",
                    fontSize: 11,
                    color: "var(--s-text-muted)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {t.desc}
                </span>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Open Source ──────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Open Source</PanelHeader>
        <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-6">
          {LINKS.map((link) => (
            <span
              key={link}
              style={{
                fontSize: 13,
                color: "var(--s-primary)",
                cursor: "pointer",
              }}
            >
              {link}
            </span>
          ))}
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
            © 2026 VoidZero Inc · Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>sigil-ui</span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
