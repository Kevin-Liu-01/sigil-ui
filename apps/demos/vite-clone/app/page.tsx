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
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: "var(--s-font-display)", fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em" }}>Vite</span>
          <Badge>v6</Badge>
        </div>
        <div className="hidden md:flex items-center gap-5">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Guide</span>
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Config</span>
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Plugins</span>
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Resources</span>
        </div>
        <Button size="sm">Get Started</Button>
      </Panel>

      {/* Hero */}
      <PanelSpacer />
      <Panel className="px-4 py-16 text-center">
        <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          Next Generation Frontend Tooling
        </h1>
        <p className="mx-auto mt-4 max-w-lg" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
          Instant server start with native ESM, lightning-fast HMR that stays fast regardless of app size, and optimized builds powered by Rolldown.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button>Get Started</Button>
          <Button variant="outline">View on GitHub</Button>
        </div>
      </Panel>

      {/* Hero Image */}
      <Panel className="px-4 py-4">
        <PlaceholderImage aspect="21/9" label="Dev Server" />
      </Panel>

      {/* Features */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Features</PanelHeader>
        <div className="px-4 py-6">
          <BentoGrid columns={{ md: 3 }} gap="1rem">
            <BentoGridCell>
              <div className="p-4">
                <h3 style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em" }}>Instant Server Start</h3>
                <p className="mt-2" style={{ fontSize: 13, lineHeight: 1.5, color: "var(--s-text-muted)" }}>On-demand file serving over native ESM, no bundling required during development.</p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="p-4">
                <h3 style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em" }}>Lightning HMR</h3>
                <p className="mt-2" style={{ fontSize: 13, lineHeight: 1.5, color: "var(--s-text-muted)" }}>Hot Module Replacement that stays fast regardless of app size. Updates in milliseconds.</p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="p-4">
                <h3 style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em" }}>Optimized Build</h3>
                <p className="mt-2" style={{ fontSize: 13, lineHeight: 1.5, color: "var(--s-text-muted)" }}>Pre-configured Rolldown bundler with multi-page and library mode support.</p>
              </div>
            </BentoGridCell>
          </BentoGrid>
        </div>
      </Panel>

      {/* Ecosystem */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Ecosystem</PanelHeader>
        <div className="px-4 py-6">
          <Tabs defaultValue="frameworks">
            <TabsList>
              <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
              <TabsTrigger value="plugins">Plugins</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            <TabsContent value="frameworks">
              <BentoGrid columns={{ md: 3 }} gap="1rem" className="mt-4">
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>React</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>First-class React support with Fast Refresh and JSX transform.</p>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>Vue</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>Deep Vue integration with SFC support and reactive HMR.</p>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>Svelte</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>Native Svelte compilation with optimized output and HMR.</p>
                  </div>
                </BentoGridCell>
              </BentoGrid>
            </TabsContent>
            <TabsContent value="plugins">
              <BentoGrid columns={{ md: 3 }} gap="1rem" className="mt-4">
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>PWA</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>Zero-config PWA support with service worker generation.</p>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>SSR</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>Server-side rendering with streaming and hydration support.</p>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>Legacy</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>Browser compatibility transforms for older environments.</p>
                  </div>
                </BentoGridCell>
              </BentoGrid>
            </TabsContent>
            <TabsContent value="templates">
              <BentoGrid columns={{ md: 3 }} gap="1rem" className="mt-4">
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>Starter</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>Minimal template with TypeScript and ESLint configured.</p>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>Library</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>Publish-ready library template with DTS generation.</p>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>Monorepo</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>Multi-package workspace with shared configs and tooling.</p>
                  </div>
                </BentoGridCell>
              </BentoGrid>
            </TabsContent>
          </Tabs>
        </div>
      </Panel>

      {/* FAQ */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>FAQ</PanelHeader>
        <div className="px-4 py-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="webpack">
              <AccordionTrigger>How does Vite differ from webpack?</AccordionTrigger>
              <AccordionContent>
                Vite leverages native ES modules during development for instant server start, while webpack bundles everything upfront. In production, Vite uses Rolldown for optimized builds with tree-shaking and code splitting.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="frameworks">
              <AccordionTrigger>Which frameworks does Vite support?</AccordionTrigger>
              <AccordionContent>
                Vite has first-class support for React, Vue, Svelte, Solid, Qwik, Lit, and Preact through official and community plugins. Any framework that compiles to standard JavaScript can work with Vite.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="production">
              <AccordionTrigger>Is Vite production-ready?</AccordionTrigger>
              <AccordionContent>
                Yes. Vite is used in production by thousands of companies including Google, Apple, Shopify, and Cloudflare. The production build uses Rolldown for optimized, tree-shaken output with code splitting.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="migration">
              <AccordionTrigger>How do I migrate from Create React App?</AccordionTrigger>
              <AccordionContent>
                Migration is straightforward: install Vite, create a vite.config.ts, move your index.html to the root, and update your scripts. Most CRA projects can be migrated in under 30 minutes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Panel>

      {/* Footer */}
      <PanelSpacer />
      <Panel as="footer" className="px-4 py-6 text-center">
        <p style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>
          &copy; 2026 Vite Contributors &middot; MIT License
        </p>
      </Panel>
    </DemoShell>
  );
}
