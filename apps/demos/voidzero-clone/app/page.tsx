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

export default function Page() {
  return (
    <DemoShell>
      {/* Nav */}
      <Panel as="nav" className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-8">
          <span style={{ fontFamily: "var(--s-font-display)", fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em" }}>VoidZero</span>
          <div className="hidden md:flex items-center gap-6">
            {["Vite", "Vitest", "OXC", "Rolldown"].map((link) => (
              <a key={link} href="#" style={{ fontSize: 13, color: "var(--s-text-muted)" }}>{link}</a>
            ))}
          </div>
        </div>
        <Button size="sm">Get Started</Button>
      </Panel>

      <PanelSpacer />

      {/* Hero */}
      <Panel className="px-4 py-16 md:py-24">
        <Badge className="mb-4">Open Source</Badge>
        <h1 className="mt-2" style={{ fontFamily: "var(--s-font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
          Next Generation JavaScript Toolchain
        </h1>
        <p className="mt-4 max-w-xl" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
          VoidZero is unifying the JavaScript ecosystem with a new generation of open-source tools. Blazing fast, written in Rust, and designed to work together as a single cohesive toolchain.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Button>Get Started</Button>
          <Button variant="outline">View on GitHub</Button>
        </div>
      </Panel>

      {/* Hero Image */}
      <Panel>
        <PlaceholderImage aspect="21/9" label="Ecosystem" />
      </Panel>

      <PanelSpacer />

      {/* Projects */}
      <Panel>
        <PanelHeader>Projects</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={{ md: 2 }} gap="1rem">
            <BentoGridCell>
              <div className="p-5" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                <Badge className="mb-3">Bundler</Badge>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Vite</h3>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--s-text-muted)" }}>Next-generation frontend build tool with instant dev server startup, lightning-fast HMR, and optimized production builds.</p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="p-5" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                <Badge className="mb-3">Testing</Badge>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Vitest</h3>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--s-text-muted)" }}>Vite-native unit testing framework with out-of-the-box ESM, TypeScript, and JSX support. Compatible with Jest APIs.</p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="p-5" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                <Badge className="mb-3">Parser</Badge>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>OXC</h3>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--s-text-muted)" }}>High-performance JavaScript/TypeScript parser, linter, and transformer written in Rust. 50-100x faster than existing tools.</p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="p-5" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                <Badge className="mb-3">Bundler</Badge>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Rolldown</h3>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--s-text-muted)" }}>Rust-powered bundler designed as a drop-in replacement for Rollup. Native-speed builds with full Rollup plugin compatibility.</p>
              </div>
            </BentoGridCell>
          </BentoGrid>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Performance Tabs */}
      <Panel>
        <PanelHeader>Performance</PanelHeader>
        <div className="p-4">
          <Tabs defaultValue="build">
            <TabsList>
              <TabsTrigger value="build">Build</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
              <TabsTrigger value="lint">Lint</TabsTrigger>
            </TabsList>
            <TabsContent value="build" className="pt-4">
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
                Rolldown + Vite achieves sub-second production builds on large codebases. Cold start time is under 150ms for projects with 10,000+ modules. Tree-shaking, code splitting, and asset optimization happen in a single pass with zero configuration.
              </p>
            </TabsContent>
            <TabsContent value="test" className="pt-4">
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
                Vitest runs test suites 2-5x faster than Jest by leveraging Vite&apos;s transformation pipeline. Watch mode re-runs only affected tests with sub-100ms feedback loops. Native ESM support means no more transform overhead.
              </p>
            </TabsContent>
            <TabsContent value="lint" className="pt-4">
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
                OXC lints 100,000 lines of TypeScript in under 200ms — 50-100x faster than ESLint. The Rust-based parser provides precise error recovery and full type-aware analysis without a separate TypeScript compilation step.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </Panel>

      <PanelSpacer />

      {/* FAQ */}
      <Panel>
        <PanelHeader>FAQ</PanelHeader>
        <div className="p-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>Is VoidZero open source?</AccordionTrigger>
              <AccordionContent>Yes. All VoidZero projects — Vite, Vitest, OXC, and Rolldown — are open source under the MIT license. We believe the JavaScript ecosystem deserves fast, free, and community-driven tooling.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>How does VoidZero make money?</AccordionTrigger>
              <AccordionContent>VoidZero is backed by venture capital and sustainable open-source funding. We offer enterprise support, consulting, and managed infrastructure for teams that need SLAs and dedicated assistance.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Can I migrate from webpack or Rollup?</AccordionTrigger>
              <AccordionContent>Vite already supports most webpack and Rollup projects with minimal configuration. Rolldown is designed as a drop-in Rollup replacement with the same plugin API. Migration guides are available in our documentation.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>What frameworks are supported?</AccordionTrigger>
              <AccordionContent>Vite supports React, Vue, Svelte, Solid, Preact, Lit, and vanilla JavaScript out of the box. Any framework can integrate through the plugin API. Vitest works with any Vite-compatible project.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Footer */}
      <Panel as="footer" className="px-4 py-6 flex items-center justify-between">
        <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>&copy; 2026 VoidZero Inc.</span>
        <div className="flex items-center gap-4">
          {["GitHub", "Discord", "Blog"].map((link) => (
            <a key={link} href="#" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>{link}</a>
          ))}
        </div>
      </Panel>
    </DemoShell>
  );
}
