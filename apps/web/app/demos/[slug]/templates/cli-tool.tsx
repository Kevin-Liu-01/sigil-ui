"use client";

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
import {
  DemoShell,
  Panel,
  PanelSpacer,
  PanelHeader,
} from "./_shell";

const INSTALL_CMDS: Record<string, string> = {
  npm: "npx @sigil-ui/cli init",
  pnpm: "pnpm dlx @sigil-ui/cli init",
  yarn: "yarn dlx @sigil-ui/cli init",
  bun: "bunx @sigil-ui/cli init",
};

const COMMANDS = [
  {
    cmd: "bolt init",
    desc: "Interactive setup — detects your project, recommends presets, configures everything.",
  },
  {
    cmd: "bolt add <name>",
    desc: "Copy components into your project. They consume tokens, never hardcode values.",
  },
  {
    cmd: "bolt preset <name>",
    desc: "Switch visual identity in one command. All 519 tokens update atomically.",
  },
  {
    cmd: "bolt diff",
    desc: "Show token CSS changes since last sync. Catch drift before it ships.",
  },
  {
    cmd: "bolt doctor",
    desc: "Validate project health — config, tokens, components, deps, CSS imports.",
  },
  {
    cmd: "bolt create",
    desc: "Scaffold a new Sigil project from scratch with preset selection and template.",
  },
];

const BENCHMARKS = [
  { label: "Init Time", value: "4ms" },
  { label: "Package Size", value: "0.8MB" },
  { label: "Token Count", value: "519" },
];

const REFERENCE = [
  {
    title: "Configuration",
    desc: "bolt uses a sigil.config.ts at your project root. Define your preset, token overrides, component aliases, and output paths.",
    code: `// sigil.config.ts
export default {
  preset: "cobalt",
  output: "./src/tokens.css",
  components: "./src/ui",
  typescript: true,
}`,
  },
  {
    title: "Presets",
    desc: "46 curated presets across seven aesthetic families. Each preset populates all 519 tokens — no partial overrides, no gaps.",
    code: `$ bolt preset list
  Structural : sigil, kova, cobalt, helix, hex
  Minimal    : crux, axiom, arc, mono
  Dark       : basalt, onyx, fang, obsid, cipher, noir
  Colorful   : flux, shard, prism, vex, dsgn, dusk
  ...`,
  },
  {
    title: "Migrations",
    desc: "Convert existing shadcn/ui, Bootstrap, or Material projects. The adapter maps their variables into Sigil tokens automatically.",
    code: `$ bolt convert --from shadcn
  ✓ Detected shadcn/ui v2.1
  ✓ Mapped 84 CSS variables → Sigil tokens
  ✓ Wrote sigil-tokens.css
  ✓ Updated tailwind.config.ts
  ✓ Generated .sigil/AGENTS.md`,
  },
  {
    title: "Plugins",
    desc: "Extend bolt with custom commands. Plugins are plain Node modules that export a register function.",
    code: `// bolt-plugin-figma.ts
export function register(cli) {
  cli.command("figma sync")
    .description("Sync tokens from Figma variables")
    .action(async () => { /* ... */ });
}`,
  },
];

function MonoBlock({ children }: { children: string }) {
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

export default function CliToolDemo() {
  return (
    <DemoShell>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "var(--s-font-mono)",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              bolt
            </span>
            <Badge variant="secondary" className="text-[10px]">
              v2.0
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="hidden text-sm sm:inline"
              style={{ color: "var(--s-text-muted)", cursor: "pointer" }}
            >
              Docs
            </span>
            <span
              className="hidden text-sm sm:inline"
              style={{ color: "var(--s-text-muted)", cursor: "pointer" }}
            >
              GitHub
            </span>
          </div>
        </div>
      </Panel>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="px-4 pt-16 pb-10 text-center">
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            bolt
          </span>
          <p
            className="mx-auto mt-5"
            style={{
              fontSize: 15,
              color: "var(--s-text-muted)",
              maxWidth: "28rem",
              lineHeight: 1.6,
            }}
          >
            The CLI for token-driven design systems. Init, add, preset, diff,
            doctor — everything you need to ship beautiful interfaces from the terminal.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button>Install Now</Button>
            <Button variant="outline">Read Docs</Button>
          </div>
        </div>
      </Panel>

      {/* ── Install ─────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Install</PanelHeader>
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
                <div
                  style={{
                    fontFamily: "var(--s-font-mono)",
                    fontSize: 13,
                    lineHeight: 1.6,
                    background: "var(--s-surface)",
                    borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))",
                    padding: "14px 16px",
                    border: "1px solid var(--s-border)",
                  }}
                >
                  <span style={{ color: "var(--s-text-muted)" }}>$ </span>
                  <span style={{ color: "var(--s-primary)" }}>{cmd}</span>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Panel>

      {/* ── Commands ────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Commands</PanelHeader>
        <BentoGrid columns={{ md: 2 }} gap={4} className="p-1">
          {COMMANDS.map((c) => (
            <BentoGridCell key={c.cmd}>
              <div className="flex w-full flex-col gap-2">
                <span
                  style={{
                    fontFamily: "var(--s-font-mono)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--s-primary)",
                  }}
                >
                  {c.cmd}
                </span>
                <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  {c.desc}
                </p>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Benchmarks ──────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Benchmarks</PanelHeader>
        <BentoGrid columns={{ md: 3 }} gap={4} className="p-1">
          {BENCHMARKS.map((stat) => (
            <BentoGridCell key={stat.label}>
              <div className="flex w-full flex-col items-center gap-1.5 py-5">
                <span
                  style={{
                    fontFamily: "var(--s-font-display)",
                    fontSize: 32,
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </span>
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
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Reference ───────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Reference</PanelHeader>
        <div className="px-4 py-2">
          <Accordion type="single" collapsible>
            {REFERENCE.map((section, i) => (
              <AccordionItem key={i} value={`ref-${i}`}>
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
                    <MonoBlock>{section.code}</MonoBlock>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
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
            © 2026 bolt
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
