"use client";

import { useState } from "react";
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

const INSTALL_COMMANDS: Record<string, string> = {
  npm: "npm create vite@latest my-app",
  pnpm: "pnpm create vite my-app",
  yarn: "yarn create vite my-app",
};

const FEATURES = [
  {
    title: "Instant Start",
    desc: "Native ESM dev server with no bundling required. Start coding in milliseconds, not minutes.",
  },
  {
    title: "Lightning HMR",
    desc: "Hot Module Replacement that stays fast regardless of app size. Updates reflect instantly in the browser.",
  },
  {
    title: "Optimized Build",
    desc: "Pre-configured Rollup build with automatic code splitting, tree shaking, and minification.",
  },
];

const FRAMEWORKS = ["React", "Vue", "Svelte", "Preact", "Lit", "Solid"];

export default function ViteCloneDemo() {
  const [pm, setPm] = useState("npm");

  return (
    <DemoShell>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <Panel>
        <div className="px-4 pt-16 pb-14 text-center">
          <Badge variant="outline" className="mb-4">v6.0</Badge>
          <h1
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
            }}
          >
            Next Generation
            <br />
            Build Tool
          </h1>
          <p
            className="mx-auto mt-4"
            style={{ fontSize: 16, color: "var(--s-text-muted)", maxWidth: "26rem", lineHeight: 1.6 }}
          >
            Get ready for a development environment that can finally keep up with you.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button>Get Started</Button>
            <Button variant="outline">Why Vite?</Button>
          </div>
        </div>
      </Panel>

      {/* ── Install ─────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Install</PanelHeader>
        <div className="px-4 py-3">
          <Tabs value={pm} onValueChange={setPm}>
            <TabsList>
              {Object.keys(INSTALL_COMMANDS).map((key) => (
                <TabsTrigger key={key} value={key} className="text-xs">{key}</TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(INSTALL_COMMANDS).map(([key, cmd]) => (
              <TabsContent key={key} value={key} className="mt-3">
                <div
                  className="px-4 py-3"
                  style={{
                    fontFamily: "var(--s-font-mono)",
                    fontSize: 13,
                    color: "var(--s-text-muted)",
                    background: "var(--s-surface)",
                    borderRadius: "var(--s-radius-sm, 6px)",
                  }}
                >
                  <span style={{ color: "var(--s-primary)", opacity: 0.7 }}>$</span>{" "}
                  {cmd}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Panel>

      {/* ── Features ────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Features</PanelHeader>
        <BentoGrid columns={{ md: 3 }} gap={4} className="p-1">
          {FEATURES.map((f) => (
            <BentoGridCell key={f.title}>
              <div className="flex w-full flex-col gap-2">
                <span style={{ fontSize: 15, fontWeight: 600 }}>{f.title}</span>
                <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  {f.desc}
                </p>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Powered By ──────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Powered By</PanelHeader>
        <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-6">
          {FRAMEWORKS.map((fw) => (
            <Badge key={fw} variant="secondary">{fw}</Badge>
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
            © 2026 Vite · Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>sigil-ui</span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
