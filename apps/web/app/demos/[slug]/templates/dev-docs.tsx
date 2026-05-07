"use client";

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
import {
  DemoShell,
  Panel,
  PanelSpacer,
  PanelHeader,
} from "./_shell";

const INSTALL_CMDS: Record<string, string> = {
  npm: "npm install @sigil-ui/components @sigil-ui/tokens",
  pnpm: "pnpm add @sigil-ui/components @sigil-ui/tokens",
  yarn: "yarn add @sigil-ui/components @sigil-ui/tokens",
  bun: "bun add @sigil-ui/components @sigil-ui/tokens",
};

const TOKEN_CONFIG = `// sigil.config.ts
import { defineConfig } from "@sigil-ui/tokens";

export default defineConfig({
  preset: "cobalt",
  tokens: {
    colors: {
      primary: "oklch(0.65 0.25 260)",
      background: "oklch(0.13 0.01 260)",
      surface: "oklch(0.18 0.015 260)",
    },
    typography: {
      fontDisplay: '"Inter", sans-serif',
      fontMono: '"JetBrains Mono", monospace',
    },
    radius: { md: "8px" },
  },
});`;

const API_SECTIONS = [
  {
    title: "Authentication",
    desc: "All API requests require a bearer token. Generate tokens from the dashboard or via the CLI.",
    code: `curl -H "Authorization: Bearer sk-proj-••••••3f9a" \\
     https://api.sigil.dev/v1/tokens`,
  },
  {
    title: "Endpoints",
    desc: "The REST API exposes CRUD operations for tokens, presets, and components.",
    code: `GET    /v1/tokens          # List all tokens
POST   /v1/tokens          # Create token set
GET    /v1/presets          # List presets
POST   /v1/presets/compile  # Compile preset → CSS`,
  },
  {
    title: "Rate Limits",
    desc: "Free tier: 100 req/min. Pro: 1,000 req/min. Enterprise: unlimited with dedicated capacity.",
    code: `HTTP/1.1 429 Too Many Requests
Retry-After: 30
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1714000000`,
  },
  {
    title: "Webhooks",
    desc: "Subscribe to token changes, preset switches, and component additions via webhook events.",
    code: `{
  "event": "preset.switched",
  "preset": "cobalt",
  "timestamp": "2026-05-07T12:00:00Z",
  "tokens_changed": 519
}`,
  },
];

const STATS = [
  { label: "Version", value: "2.1.0" },
  { label: "Tokens", value: "519" },
  { label: "Presets", value: "46" },
];

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      style={{
        fontFamily: "var(--s-font-mono)",
        fontSize: 12,
        lineHeight: 1.6,
        color: "var(--s-text)",
        background: "var(--s-surface)",
        borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))",
        padding: "12px 16px",
        overflowX: "auto",
        border: "1px solid var(--s-border)",
      }}
    >
      <code>{children}</code>
    </pre>
  );
}

export default function DevDocsDemo() {
  return (
    <DemoShell>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "var(--s-font-display)",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              Sigil Docs
            </span>
            <Badge variant="secondary" className="text-[10px]">
              v2.1.0
            </Badge>
          </div>
          <Input
            placeholder="Search docs…"
            className="hidden w-44 sm:block"
            style={{ height: 30, fontSize: 12 }}
          />
        </div>
      </Panel>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="px-4 pt-14 pb-10">
          <h1
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Installation
          </h1>
          <p
            className="mt-4"
            style={{
              fontSize: 15,
              color: "var(--s-text-muted)",
              maxWidth: "34rem",
              lineHeight: 1.6,
            }}
          >
            Get started with Sigil UI in under two minutes. Install the packages,
            configure your tokens, and start building with 350+ components.
          </p>
        </div>
      </Panel>

      {/* ── Quick Start ─────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Quick Start</PanelHeader>
        <div className="px-4 py-4">
          <Tabs defaultValue="pnpm">
            <TabsList>
              {Object.keys(INSTALL_CMDS).map((pm) => (
                <TabsTrigger key={pm} value={pm} className="text-xs">
                  {pm}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(INSTALL_CMDS).map(([pm, cmd]) => (
              <TabsContent key={pm} value={pm} className="mt-3">
                <CodeBlock>{cmd}</CodeBlock>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Panel>

      {/* ── Configuration ───────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Configuration</PanelHeader>
        <div className="px-4 py-4">
          <p
            className="mb-3"
            style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}
          >
            Create a <code style={{ fontFamily: "var(--s-font-mono)", fontSize: 12 }}>sigil.config.ts</code> at
            your project root. Every visual property flows from this file.
          </p>
          <CodeBlock>{TOKEN_CONFIG}</CodeBlock>
        </div>
      </Panel>

      {/* ── API Reference ───────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>API Reference</PanelHeader>
        <div className="px-4 py-2">
          <Accordion type="single" collapsible>
            {API_SECTIONS.map((section, i) => (
              <AccordionItem key={i} value={`api-${i}`}>
                <AccordionTrigger className="text-sm">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3 py-1">
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--s-text-muted)",
                        lineHeight: 1.6,
                      }}
                    >
                      {section.desc}
                    </p>
                    <CodeBlock>{section.code}</CodeBlock>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Panel>

      {/* ── Stats ───────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Stats</PanelHeader>
        <BentoGrid columns={{ md: 3 }} gap={4} className="p-1">
          {STATS.map((stat) => (
            <BentoGridCell key={stat.label}>
              <div className="flex w-full flex-col items-center gap-1.5 py-4">
                <span
                  style={{
                    fontFamily: "var(--s-font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--s-text-muted)",
                  }}
                >
                  {stat.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--s-font-display)",
                    fontSize: 28,
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </span>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel as="footer">
        <div className="flex items-center justify-between px-4 py-5">
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 11,
              color: "var(--s-text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Sigil UI
          </span>
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 11,
              color: "var(--s-text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>sigil-ui</span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
