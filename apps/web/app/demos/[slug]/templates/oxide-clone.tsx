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

const SPECS = [
  { value: "32", unit: "Sleds", desc: "Compute nodes per rack" },
  { value: "1,536", unit: "Cores", desc: "Total CPU cores" },
  { value: "16 TB", unit: "RAM", desc: "Total memory capacity" },
];

const CONSOLE_OUTPUT = `$ oxide sled list
ID        MODEL         SERIAL       STATE    SLOTS
────────  ────────────  ───────────  ───────  ─────
sled-001  Gimlet Rev C  OX-20261001  active   32
sled-002  Gimlet Rev C  OX-20261002  active   32
sled-003  Gimlet Rev C  OX-20261003  active   32
sled-004  Gimlet Rev C  OX-20261004  active   32

4 sleds, 128 slots, all healthy`;

const PRODUCT_SPECS = [
  { title: "Compute", desc: "AMD EPYC processors with hardware root of trust. Each sled runs the Oxide Helios operating system with a minimal attack surface." },
  { title: "Network", desc: "Custom switch ASIC with 25/100GbE connectivity. Software-defined networking with isolated VPCs and zero-trust microsegmentation." },
  { title: "Storage", desc: "NVMe SSDs with software-defined storage layer. Redundant, encrypted-at-rest, with instant snapshots and replication." },
  { title: "Control Plane", desc: "Fully integrated management via CLI, API, and web console. Rack-scale operations, firmware updates, and diagnostics from a single pane." },
];

export default function OxideCloneDemo() {
  return (
    <DemoShell>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 14, fontWeight: 700, letterSpacing: "0.08em" }}>
            0XIDE
          </span>
          <div className="flex items-center gap-5">
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)", fontFamily: "var(--s-font-mono)", fontSize: 12 }}>Product</span>
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)", fontFamily: "var(--s-font-mono)", fontSize: 12 }}>Blog</span>
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)", fontFamily: "var(--s-font-mono)", fontSize: 12 }}>Careers</span>
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)", fontFamily: "var(--s-font-mono)", fontSize: 12 }}>GitHub</span>
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
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Cloud Computing,
            <br />
            Rewritten
          </h1>
          <p
            className="mx-auto mt-4"
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 14,
              color: "var(--s-text-muted)",
              maxWidth: "30rem",
              lineHeight: 1.7,
            }}
          >
            Rack-scale computers designed from scratch.
            Hardware, firmware, OS, and control plane — integrated.
          </p>
        </div>
      </Panel>

      {/* ── Console ─────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Console</PanelHeader>
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
            {CONSOLE_OUTPUT}
          </pre>
        </div>
      </Panel>

      {/* ── Specs ───────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Specs</PanelHeader>
        <BentoGrid columns={{ md: 3 }} gap={4} className="p-1">
          {SPECS.map((s) => (
            <BentoGridCell key={s.unit}>
              <div className="flex w-full flex-col items-center gap-1 py-3 text-center">
                <span
                  style={{
                    fontFamily: "var(--s-font-mono)",
                    fontSize: 36,
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--s-font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--s-primary)",
                  }}
                >
                  {s.unit}
                </span>
                <span style={{ fontSize: 12, color: "var(--s-text-muted)", marginTop: 2 }}>
                  {s.desc}
                </span>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Product Specs Accordion ─────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Product</PanelHeader>
        <div className="px-4 py-2">
          <Accordion type="single" collapsible>
            {PRODUCT_SPECS.map((spec, i) => (
              <AccordionItem key={i} value={`spec-${i}`}>
                <AccordionTrigger className="text-sm" style={{ fontFamily: "var(--s-font-mono)" }}>
                  {spec.title}
                </AccordionTrigger>
                <AccordionContent>
                  <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                    {spec.desc}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
            © 2026 Oxide Computer Company · Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>sigil-ui</span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
