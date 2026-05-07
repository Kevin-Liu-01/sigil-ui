"use client";

import React, { useState } from "react";
import {
  Button,
  Badge,
  Input,
  Switch,
  Label,
  Slider,
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
  const [sliderVal, setSliderVal] = useState([40]);
  const [switchOn, setSwitchOn] = useState(false);
  const [progressVal] = useState(62);

  return (
    <DemoShell>
      {/* Nav */}
      <Panel as="nav" className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}>Playground</span>
          <Badge>Interactive</Badge>
        </div>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Reset</Button>
      </Panel>

      {/* Controls */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Controls</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={2} gap="1rem">
            <BentoGridCell>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="demo-input" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Text Field</Label>
                  <Input id="demo-input" placeholder="Type something…" className="mt-1" />
                </div>
                <div>
                  <Label style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Slider — {sliderVal[0]}%</Label>
                  <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} className="mt-2" />
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={switchOn} onCheckedChange={setSwitchOn} id="demo-switch" />
                  <Label htmlFor="demo-switch" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>
                    {switchOn ? "Enabled" : "Disabled"}
                  </Label>
                </div>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button>Primary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <div>
                  <Label style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Progress — {progressVal}%</Label>
                  <Progress value={progressVal} className="mt-2" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                </div>
              </div>
            </BentoGridCell>
          </BentoGrid>
        </div>
      </Panel>

      {/* Components — Tabs */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Components</PanelHeader>
        <div className="p-4">
          <Tabs defaultValue="inputs">
            <TabsList>
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
            <TabsContent value="inputs" className="pt-4 space-y-3">
              <Input placeholder="Email address" />
              <Input placeholder="Password" type="password" />
              <div className="flex items-center gap-3">
                <Switch />
                <Label style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Remember me</Label>
              </div>
            </TabsContent>
            <TabsContent value="display" className="pt-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge>Active</Badge>
                <Badge variant="outline">Pending</Badge>
                <Badge variant="secondary">Archived</Badge>
              </div>
              <PlaceholderImage aspect="3/1" label="Display area" />
            </TabsContent>
            <TabsContent value="feedback" className="pt-4 space-y-3">
              <Progress value={30} />
              <Progress value={65} />
              <Progress value={90} />
            </TabsContent>
          </Tabs>
        </div>
      </Panel>

      {/* Configuration — Accordion */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Configuration</PanelHeader>
        <div className="p-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="theme">
              <AccordionTrigger>Theme</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontFamily: "var(--s-font-mono)", fontSize: 12, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                  Tokens control every visual property — colors, fonts, spacing, radius. Switch presets to change the entire visual identity in one command.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="typography">
              <AccordionTrigger>Typography</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontFamily: "var(--s-font-mono)", fontSize: 12, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                  Three font stacks: display, body, mono. All sizes, weights, and line heights flow from the token spec.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="spacing">
              <AccordionTrigger>Spacing</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontFamily: "var(--s-font-mono)", fontSize: 12, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                  4/8px base grid with a canonical spacing ladder. Button, card, input, and section padding all derive from the same scale.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="motion">
              <AccordionTrigger>Motion</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontFamily: "var(--s-font-mono)", fontSize: 12, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                  Duration and easing tokens for hover, press, and stagger. Purpose-driven animation with strict speed limits.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Panel>

      {/* Footer */}
      <PanelSpacer />
      <Panel as="footer" className="px-4 py-6 flex items-center justify-between">
        <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Sigil UI — Playground</span>
        <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Token-driven design system</span>
      </Panel>
    </DemoShell>
  );
}
