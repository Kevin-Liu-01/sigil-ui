"use client";

import React from "react";
import {
  Button,
  Badge,
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

function Panel({ children, className = "", as: Tag = "section" }: { children: React.ReactNode; className?: string; as?: "section" | "nav" | "footer" | "header" | "div" | "aside" }) {
  return <Tag className={`s-screen-line-top s-screen-line-bottom s-container-column ${className}`}>{children}</Tag>;
}
function PanelSpacer() {
  return <div className="s-screen-line-top s-screen-line-bottom s-container-column h-8" />;
}
function PanelHeader({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <header className="s-screen-line-bottom flex items-center justify-between px-4 py-2.5">
      <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>{children}</span>
      {right}
    </header>
  );
}
function DemoShell({ children, maxWidth = "56rem" }: { children: React.ReactNode; maxWidth?: string }) {
  return (
    <div className="min-h-screen overflow-x-clip" style={{ background: "var(--s-background)", color: "var(--s-text)", fontFamily: "var(--s-font-body)" }}>
      <div className="mx-auto px-2" style={{ maxWidth }}>{children}</div>
    </div>
  );
}
function PlaceholderImage({ aspect = "16/9", gradient, label, className = "" }: { aspect?: string; gradient?: string; label?: string; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`} style={{ aspectRatio: aspect, background: gradient ?? "linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 15%, var(--s-surface)) 0%, var(--s-surface) 100%)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
      {label && <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--s-text-muted)", opacity: 0.6 }}>{label}</span>}
    </div>
  );
}

const commands = [
  { cmd: "init", desc: "Scaffold a new Sigil project with interactive preset selection." },
  { cmd: "add", desc: "Copy components into your project. They consume tokens, never hardcode." },
  { cmd: "preset", desc: "Switch visual identity. One command rewrites all 519 tokens." },
  { cmd: "design", desc: "Generate, compile, or sync DESIGN.md from current tokens." },
  { cmd: "doctor", desc: "Validate project health — config, tokens, deps, CSS imports." },
  { cmd: "diff", desc: "Show token CSS changes since last sync." },
];

export default function Page() {
  return (
    <DemoShell>
      {/* Nav */}
      <Panel as="nav" className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 16, fontWeight: 700 }}>sigil-cli</span>
          <Badge variant="outline">v2.0</Badge>
        </div>
        <div className="flex items-center gap-5 text-sm" style={{ color: "var(--s-text-muted)" }}>
          <a href="#">Docs</a>
          <a href="#">GitHub</a>
        </div>
      </Panel>

      {/* Hero */}
      <PanelSpacer />
      <Panel className="px-4 py-16 md:py-24">
        <Badge className="mb-4">CLI Tool</Badge>
        <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          The developer toolkit
        </h1>
        <p className="mt-4 max-w-md text-base" style={{ color: "var(--s-text-muted)", lineHeight: 1.7 }}>
          Init projects, add components, switch presets, compile design tokens, and validate
          everything — from your terminal. One CLI for the entire Sigil workflow.
        </p>
      </Panel>

      {/* Install Command */}
      <Panel className="px-4 py-5">
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{
            background: "var(--s-surface)",
            borderRadius: "var(--s-radius-md, 8px)",
            border: "1px solid var(--s-border)",
            fontFamily: "var(--s-font-mono)",
            fontSize: 14,
          }}
        >
          <span style={{ color: "var(--s-text-muted)" }}>$</span>
          <span>npm install -g @sigil-ui/cli</span>
          <Button size="sm" variant="ghost" className="ml-auto">Copy</Button>
        </div>
      </Panel>

      {/* Commands */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Commands</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={3} gap="0.75rem">
            {commands.map((c) => (
              <BentoGridCell key={c.cmd}>
                <div className="p-4" style={{ background: "var(--s-surface)", borderRadius: "var(--s-radius-md, 8px)", border: "1px solid var(--s-border)" }}>
                  <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 13, fontWeight: 600, color: "var(--s-primary)" }}>sigil {c.cmd}</span>
                  <p className="mt-1.5 text-sm" style={{ color: "var(--s-text-muted)", lineHeight: 1.5 }}>{c.desc}</p>
                </div>
              </BentoGridCell>
            ))}
          </BentoGrid>
        </div>
      </Panel>

      {/* Usage */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Usage</PanelHeader>
        <div className="p-4">
          <Tabs defaultValue="init">
            <TabsList>
              <TabsTrigger value="init">Init</TabsTrigger>
              <TabsTrigger value="add">Add</TabsTrigger>
              <TabsTrigger value="preset">Preset</TabsTrigger>
            </TabsList>
            <TabsContent value="init">
              <div className="mt-4 p-4" style={{ background: "var(--s-surface)", borderRadius: "var(--s-radius-md, 8px)", border: "1px solid var(--s-border)", fontFamily: "var(--s-font-mono)", fontSize: 13, lineHeight: 1.8 }}>
                <div><span style={{ color: "var(--s-text-muted)" }}>$</span> npx @sigil-ui/cli init</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ◆ Detected Next.js project</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ◆ Choose a preset: cobalt</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ✓ Generated token CSS (519 variables)</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ✓ Created .sigil/AGENTS.md</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ✓ Ready — run `sigil doctor` to validate</div>
              </div>
            </TabsContent>
            <TabsContent value="add">
              <div className="mt-4 p-4" style={{ background: "var(--s-surface)", borderRadius: "var(--s-radius-md, 8px)", border: "1px solid var(--s-border)", fontFamily: "var(--s-font-mono)", fontSize: 13, lineHeight: 1.8 }}>
                <div><span style={{ color: "var(--s-text-muted)" }}>$</span> npx @sigil-ui/cli add Button Badge Tabs</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ◆ Copying 3 components...</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ✓ components/ui/Button.tsx</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ✓ components/ui/Badge.tsx</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ✓ components/ui/Tabs.tsx</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ✓ Added 3 components</div>
              </div>
            </TabsContent>
            <TabsContent value="preset">
              <div className="mt-4 p-4" style={{ background: "var(--s-surface)", borderRadius: "var(--s-radius-md, 8px)", border: "1px solid var(--s-border)", fontFamily: "var(--s-font-mono)", fontSize: 13, lineHeight: 1.8 }}>
                <div><span style={{ color: "var(--s-text-muted)" }}>$</span> npx @sigil-ui/cli preset onyx</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ◆ Switching to preset: onyx</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ◆ Regenerating token CSS...</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ✓ Updated 519 tokens across 33 categories</div>
                <div style={{ color: "var(--s-text-muted)" }}>  ✓ Visual identity changed — restart dev server</div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Panel>

      {/* FAQ */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>FAQ</PanelHeader>
        <div className="p-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="install">
              <AccordionTrigger>Do I need to install globally?</AccordionTrigger>
              <AccordionContent>No — you can use npx to run any command without installing. Global install just saves you from typing the prefix each time.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="frameworks">
              <AccordionTrigger>Which frameworks are supported?</AccordionTrigger>
              <AccordionContent>Next.js, Vite, Remix, and Astro are all detected automatically by sigil init. The components are framework-agnostic React.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="preset-custom">
              <AccordionTrigger>Can I create my own preset?</AccordionTrigger>
              <AccordionContent>Run sigil preset create to scaffold a custom preset from any existing base. All 519 fields are pre-populated — just change the values you want.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="ci">
              <AccordionTrigger>Can I run sigil doctor in CI?</AccordionTrigger>
              <AccordionContent>Yes. It exits with code 1 on validation failure, so you can add it to your GitHub Actions or any CI pipeline as a quality gate.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Panel>

      {/* Footer */}
      <PanelSpacer />
      <Panel as="footer" className="flex items-center justify-between px-4 py-4">
        <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>sigil-cli · MIT License</span>
        <div className="flex items-center gap-4 text-sm" style={{ color: "var(--s-text-muted)" }}>
          <a href="#">GitHub</a>
          <a href="#">Changelog</a>
          <a href="#">Discord</a>
        </div>
      </Panel>
    </DemoShell>
  );
}
