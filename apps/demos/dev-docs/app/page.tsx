"use client";

import React from "react";
import {
  Button,
  Badge,
  Input,
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

const guideCards = [
  { title: "Installation", desc: "Get Sigil set up in your project with a single command. Supports npm, pnpm, and yarn." },
  { title: "Configuration", desc: "Configure your token spec, choose a preset, and connect your design system." },
  { title: "Components", desc: "Browse the full component library — 350+ token-driven primitives and composites." },
];

const apiEntries = {
  components: [
    { name: "Button", desc: "Interactive button with variants, sizes, and icon support." },
    { name: "Card", desc: "Surface container with header, body, and footer slots." },
    { name: "Input", desc: "Text input with label, helper text, and validation states." },
    { name: "Badge", desc: "Inline status indicator with color and size variants." },
    { name: "Accordion", desc: "Collapsible content sections with animated disclosure." },
  ],
  hooks: [
    { name: "useTheme", desc: "Access and toggle the active preset at runtime." },
    { name: "useTokens", desc: "Read resolved token values from the current context." },
    { name: "useMediaQuery", desc: "Reactive media query matching for responsive logic." },
    { name: "useScrollLock", desc: "Prevent body scroll when modals or drawers are open." },
  ],
  utilities: [
    { name: "cn()", desc: "Merge Tailwind classes with conflict resolution." },
    { name: "compileToCss()", desc: "Compile a SigilTokens object to CSS custom properties." },
    { name: "parseDesignMarkdown()", desc: "Parse a DESIGN.md file into a SigilTokens object." },
  ],
};

const faqItems = [
  { q: "How do I install Sigil in an existing project?", a: "Run `npx @sigil-ui/cli convert` in your project root. The CLI detects your framework, installs dependencies, generates token CSS, and sets up the import chain." },
  { q: "Can I use Sigil with shadcn/ui?", a: "Yes. Run `sigil adapter shadcn` to bridge shadcn CSS variables into Sigil tokens. Existing shadcn components will read from --s-* tokens automatically." },
  { q: "How do presets work?", a: "A preset is a complete set of 519 token values. Switching presets changes every visual property at once — colors, typography, spacing, radius, shadows, and motion." },
  { q: "Is Sigil compatible with Tailwind v4?", a: "Sigil is built for Tailwind v4. Token CSS compiles into a @theme block, and all components reference tokens via var(--s-*) custom properties." },
];

export default function Page() {
  return (
    <DemoShell>
      {/* Navbar */}
      <Panel as="nav">
        <div className="flex items-center justify-between px-4 py-3">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}>DevDocs</span>
          <div className="flex items-center gap-5">
            {["Guide", "API", "Examples"].map((link) => (
              <a key={link} href="#" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>{link}</a>
            ))}
            <Input placeholder="Search docs…" style={{ height: 28, fontSize: 11, width: 160 }} />
          </div>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Hero */}
      <Panel>
        <div className="px-4 py-16 text-center">
          <Badge>Documentation</Badge>
          <h1 className="mt-4" style={{ fontFamily: "var(--s-font-display)", fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>Build with Sigil</h1>
          <p className="mt-3 mx-auto" style={{ maxWidth: 420, fontSize: 14, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
            A comprehensive documentation platform for the token-driven design system. Everything you need to get started, explore APIs, and ship faster.
          </p>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Getting Started */}
      <Panel>
        <PanelHeader>Getting Started</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={{ md: 3 }} gap="0.5rem">
            {guideCards.map((card) => (
              <BentoGridCell key={card.title}>
                <div className="p-4" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                  <h3 style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em" }}>{card.title}</h3>
                  <p className="mt-1.5" style={{ fontSize: 12, lineHeight: 1.5, color: "var(--s-text-muted)" }}>{card.desc}</p>
                  <Button variant="ghost" size="sm" className="mt-3">Read guide →</Button>
                </div>
              </BentoGridCell>
            ))}
          </BentoGrid>
        </div>
      </Panel>

      <PanelSpacer />

      {/* API Reference */}
      <Panel>
        <PanelHeader>API Reference</PanelHeader>
        <div className="p-4">
          <Tabs defaultValue="components">
            <TabsList>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="hooks">Hooks</TabsTrigger>
              <TabsTrigger value="utilities">Utilities</TabsTrigger>
            </TabsList>
            <TabsContent value="components">
              <div className="mt-3 space-y-2">
                {apiEntries.components.map((entry) => (
                  <div key={entry.name} className="flex items-baseline gap-3 py-2" style={{ borderBottom: "1px solid var(--s-line)" }}>
                    <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 12, fontWeight: 600 }}>{entry.name}</span>
                    <span style={{ fontSize: 12, color: "var(--s-text-muted)" }}>{entry.desc}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="hooks">
              <div className="mt-3 space-y-2">
                {apiEntries.hooks.map((entry) => (
                  <div key={entry.name} className="flex items-baseline gap-3 py-2" style={{ borderBottom: "1px solid var(--s-line)" }}>
                    <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 12, fontWeight: 600 }}>{entry.name}</span>
                    <span style={{ fontSize: 12, color: "var(--s-text-muted)" }}>{entry.desc}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="utilities">
              <div className="mt-3 space-y-2">
                {apiEntries.utilities.map((entry) => (
                  <div key={entry.name} className="flex items-baseline gap-3 py-2" style={{ borderBottom: "1px solid var(--s-line)" }}>
                    <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 12, fontWeight: 600 }}>{entry.name}</span>
                    <span style={{ fontSize: 12, color: "var(--s-text-muted)" }}>{entry.desc}</span>
                  </div>
                ))}
              </div>
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
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Footer */}
      <Panel as="footer">
        <div className="flex items-center justify-between px-4 py-3">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>DevDocs © 2026</span>
          <div className="flex gap-4">
            {["GitHub", "Discord", "Twitter"].map((link) => (
              <a key={link} href="#" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>{link}</a>
            ))}
          </div>
        </div>
      </Panel>
    </DemoShell>
  );
}
