"use client";

import { useState } from "react";
import {
  Button,
  Badge,
  Input,
  Progress,
  Avatar,
  Switch,
  Label,
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
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@sigil-ui/components";
import {
  DemoShell,
  Panel,
  PanelSpacer,
  PanelHeader,
} from "./_shell";

export default function PlaygroundDemo() {
  const [progress, setProgress] = useState(68);
  const [switchA, setSwitchA] = useState(true);
  const [switchB, setSwitchB] = useState(false);

  return (
    <DemoShell maxWidth="64rem">
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <span
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            Component Playground
          </span>
          <Button size="sm" variant="outline">
            Open Sandbox
          </Button>
        </div>
      </Panel>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="px-4 pt-10 pb-8">
          <h1
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          >
            Live Components
          </h1>
          <p
            className="mt-3"
            style={{
              fontSize: 14,
              color: "var(--s-text-muted)",
              maxWidth: "32rem",
              lineHeight: 1.6,
            }}
          >
            Every component below is real, interactive, and token-driven.
            Switch presets and watch them all update.
          </p>
        </div>
      </Panel>

      {/* ── UI Components ───────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>UI Components</PanelHeader>
        <div className="px-4 py-4">
          <Tabs defaultValue="buttons">
            <TabsList>
              <TabsTrigger value="buttons" className="text-xs">Buttons</TabsTrigger>
              <TabsTrigger value="inputs" className="text-xs">Inputs</TabsTrigger>
              <TabsTrigger value="feedback" className="text-xs">Feedback</TabsTrigger>
              <TabsTrigger value="data" className="text-xs">Data</TabsTrigger>
            </TabsList>

            {/* Buttons */}
            <TabsContent value="buttons">
              <BentoGrid columns={{ sm: 2, md: 3 }} gap={4} className="pt-3">
                <BentoGridCell>
                  <div className="flex w-full flex-wrap gap-2">
                    <Button size="sm">Primary</Button>
                    <Button size="sm" variant="outline">Outline</Button>
                    <Button size="sm" variant="ghost">Ghost</Button>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="flex w-full flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="flex w-full flex-wrap gap-2">
                    <Button size="lg">Large</Button>
                    <Button size="sm">Small</Button>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="flex w-full flex-wrap gap-2">
                    <Button variant="outline" size="sm" disabled>Disabled</Button>
                    <Button variant="secondary" size="sm">Secondary</Button>
                  </div>
                </BentoGridCell>
              </BentoGrid>
            </TabsContent>

            {/* Inputs */}
            <TabsContent value="inputs">
              <BentoGrid columns={{ sm: 2 }} gap={4} className="pt-3">
                <BentoGridCell>
                  <div className="flex w-full flex-col gap-3">
                    <Input placeholder="Default input" />
                    <Input placeholder="Disabled" disabled />
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="flex w-full flex-col gap-3">
                    <Input placeholder="Search…" type="search" />
                    <Input placeholder="Email" type="email" />
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="flex w-full items-center gap-3">
                    <Switch
                      id="play-switch-a"
                      checked={switchA}
                      onCheckedChange={setSwitchA}
                    />
                    <Label htmlFor="play-switch-a" style={{ fontSize: 13 }}>
                      Enabled
                    </Label>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="flex w-full items-center gap-3">
                    <Switch
                      id="play-switch-b"
                      checked={switchB}
                      onCheckedChange={setSwitchB}
                    />
                    <Label htmlFor="play-switch-b" style={{ fontSize: 13 }}>
                      Dark mode
                    </Label>
                  </div>
                </BentoGridCell>
              </BentoGrid>
            </TabsContent>

            {/* Feedback */}
            <TabsContent value="feedback">
              <BentoGrid columns={{ sm: 2, md: 3 }} gap={4} className="pt-3">
                <BentoGridCell colSpan={2}>
                  <div className="flex w-full flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span style={{ fontSize: 12, color: "var(--s-text-muted)" }}>
                        Upload progress
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--s-font-mono)",
                          fontSize: 11,
                          fontVariantNumeric: "tabular-nums",
                          color: "var(--s-text-muted)",
                        }}
                      >
                        {progress}%
                      </span>
                    </div>
                    <Progress value={progress} />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setProgress(Math.max(0, progress - 10))}
                      >
                        −10
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setProgress(Math.min(100, progress + 10))}
                      >
                        +10
                      </Button>
                    </div>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="flex w-full flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Error</Badge>
                  </div>
                </BentoGridCell>
              </BentoGrid>
            </TabsContent>

            {/* Data */}
            <TabsContent value="data">
              <BentoGrid columns={{ sm: 2, md: 4 }} gap={4} className="pt-3">
                <BentoGridCell>
                  <div className="flex w-full items-center gap-3">
                    <Avatar fallback="KL" size="sm" />
                    <div className="flex flex-col">
                      <span style={{ fontSize: 13, fontWeight: 500 }}>Kevin L.</span>
                      <span style={{ fontSize: 11, color: "var(--s-text-muted)" }}>Admin</span>
                    </div>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="flex w-full items-center gap-3">
                    <Avatar fallback="AM" size="sm" />
                    <div className="flex flex-col">
                      <span style={{ fontSize: 13, fontWeight: 500 }}>Alex M.</span>
                      <span style={{ fontSize: 11, color: "var(--s-text-muted)" }}>Editor</span>
                    </div>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="flex w-full items-center gap-3">
                    <Avatar fallback="JR" size="sm" />
                    <div className="flex flex-col">
                      <span style={{ fontSize: 13, fontWeight: 500 }}>Jamie R.</span>
                      <span style={{ fontSize: 11, color: "var(--s-text-muted)" }}>Viewer</span>
                    </div>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="flex w-full items-center gap-3">
                    <Avatar fallback="TS" size="sm" />
                    <div className="flex flex-col">
                      <span style={{ fontSize: 13, fontWeight: 500 }}>Tara S.</span>
                      <span style={{ fontSize: 11, color: "var(--s-text-muted)" }}>Owner</span>
                    </div>
                  </div>
                </BentoGridCell>
              </BentoGrid>
            </TabsContent>
          </Tabs>
        </div>
      </Panel>

      {/* ── Layout ──────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Layout</PanelHeader>
        <div className="px-4 py-4">
          <BentoGrid columns={{ md: 3 }} gap={4}>
            <BentoGridCell colSpan={2}>
              <BentoGrid columns={{ sm: 2 }} gap={3} className="w-full">
                <BentoGridCell>
                  <div
                    className="flex h-20 w-full items-center justify-center"
                    style={{
                      background: "color-mix(in oklch, var(--s-primary) 10%, var(--s-surface))",
                      borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--s-font-mono)",
                        fontSize: 10,
                        color: "var(--s-text-muted)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      2-col nested
                    </span>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div
                    className="flex h-20 w-full items-center justify-center"
                    style={{
                      background: "color-mix(in oklch, var(--s-primary) 8%, var(--s-surface))",
                      borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--s-font-mono)",
                        fontSize: 10,
                        color: "var(--s-text-muted)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      2-col nested
                    </span>
                  </div>
                </BentoGridCell>
              </BentoGrid>
            </BentoGridCell>
            <BentoGridCell>
              <div
                className="flex h-full min-h-[10rem] w-full items-center justify-center"
                style={{
                  background: "color-mix(in oklch, var(--s-primary) 6%, var(--s-surface))",
                  borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--s-font-mono)",
                    fontSize: 10,
                    color: "var(--s-text-muted)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  1-col sidebar
                </span>
              </div>
            </BentoGridCell>
          </BentoGrid>

          <BentoGrid columns={{ sm: 2, md: 4 }} gap={4} className="mt-4">
            {[1, 2, 3, 4].map((n) => (
              <BentoGridCell key={n}>
                <div
                  className="flex h-16 w-full items-center justify-center"
                  style={{
                    background: `color-mix(in oklch, var(--s-primary) ${4 + n * 3}%, var(--s-surface))`,
                    borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--s-font-mono)",
                      fontSize: 10,
                      color: "var(--s-text-muted)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    4-col
                  </span>
                </div>
              </BentoGridCell>
            ))}
          </BentoGrid>
        </div>
      </Panel>

      {/* ── Interactive ─────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Interactive</PanelHeader>
        <div className="grid gap-6 px-4 py-4 md:grid-cols-2">
          {/* Accordion */}
          <div className="flex flex-col gap-2">
            <span
              style={{
                fontFamily: "var(--s-font-mono)",
                fontSize: 10,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--s-text-muted)",
              }}
            >
              Accordion
            </span>
            <Accordion type="single" collapsible defaultValue="acc-0">
              {["First Section", "Second Section", "Third Section"].map((title, i) => (
                <AccordionItem key={i} value={`acc-${i}`}>
                  <AccordionTrigger className="text-sm">{title}</AccordionTrigger>
                  <AccordionContent>
                    <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                      Content for {title.toLowerCase()}. This accordion item expands and
                      collapses with smooth animation driven by token durations.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Tabs + Collapsible */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span
                style={{
                  fontFamily: "var(--s-font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--s-text-muted)",
                }}
              >
                Tabs
              </span>
              <Tabs defaultValue="one">
                <TabsList>
                  <TabsTrigger value="one" className="text-xs">Tab One</TabsTrigger>
                  <TabsTrigger value="two" className="text-xs">Tab Two</TabsTrigger>
                  <TabsTrigger value="three" className="text-xs">Tab Three</TabsTrigger>
                </TabsList>
                <TabsContent value="one">
                  <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5, paddingTop: 8 }}>
                    First tab content. Tabs consume token radius, borders, and motion.
                  </p>
                </TabsContent>
                <TabsContent value="two">
                  <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5, paddingTop: 8 }}>
                    Second tab content. Switch presets and see the visual change.
                  </p>
                </TabsContent>
                <TabsContent value="three">
                  <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5, paddingTop: 8 }}>
                    Third tab content. All styling flows from var(--s-*) tokens.
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex flex-col gap-2">
              <span
                style={{
                  fontFamily: "var(--s-font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--s-text-muted)",
                }}
              >
                Collapsible
              </span>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-between">
                    Toggle Details
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div
                    className="mt-2"
                    style={{
                      fontSize: 13,
                      color: "var(--s-text-muted)",
                      lineHeight: 1.5,
                      padding: "12px 14px",
                      background: "var(--s-surface)",
                      borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))",
                      border: "1px solid var(--s-border)",
                    }}
                  >
                    Collapsible content reveals on demand. Useful for progressive
                    disclosure — show essential info first, details on interaction.
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
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
            © 2026 Component Playground · Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>sigil-ui</span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
