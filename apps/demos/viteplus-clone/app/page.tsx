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
          <span style={{ fontFamily: "var(--s-font-display)", fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em" }}>Vite+</span>
          <Badge>Enterprise</Badge>
        </div>
        <div className="hidden md:flex items-center gap-5">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Features</span>
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Pricing</span>
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>Docs</span>
        </div>
        <Button size="sm">Start Trial</Button>
      </Panel>

      {/* Hero */}
      <PanelSpacer />
      <Panel className="px-4 py-16 text-center">
        <div className="flex justify-center mb-4">
          <Badge variant="outline">Built on Vite</Badge>
        </div>
        <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          Vite, supercharged for teams
        </h1>
        <p className="mx-auto mt-4 max-w-lg" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
          Remote caching, module federation, and build analytics — enterprise-grade features on top of the Vite you already love.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button>Start Free Trial</Button>
          <Button variant="outline">View Documentation</Button>
        </div>
      </Panel>

      {/* Hero Image */}
      <Panel className="px-4 py-4">
        <PlaceholderImage aspect="21/9" label="Team Dashboard" />
      </Panel>

      {/* Features */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Features</PanelHeader>
        <div className="px-4 py-6">
          <BentoGrid columns={{ md: 3 }} gap="1rem">
            <BentoGridCell>
              <div className="p-4">
                <h3 style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em" }}>Remote Caching</h3>
                <p className="mt-2" style={{ fontSize: 13, lineHeight: 1.5, color: "var(--s-text-muted)" }}>Share build artifacts across your team. Never rebuild what a teammate already built.</p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="p-4">
                <h3 style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em" }}>Module Federation</h3>
                <p className="mt-2" style={{ fontSize: 13, lineHeight: 1.5, color: "var(--s-text-muted)" }}>Share code between apps at runtime. Deploy micro-frontends independently.</p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="p-4">
                <h3 style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em" }}>Build Analytics</h3>
                <p className="mt-2" style={{ fontSize: 13, lineHeight: 1.5, color: "var(--s-text-muted)" }}>Deep insights into build performance, bundle composition, and cache hit rates.</p>
              </div>
            </BentoGridCell>
          </BentoGrid>
        </div>
      </Panel>

      {/* Plans */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Plans</PanelHeader>
        <div className="px-4 py-6">
          <Tabs defaultValue="team">
            <TabsList>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>
            <TabsContent value="team">
              <BentoGrid columns={{ md: 3 }} gap="1rem" className="mt-4">
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>Remote Cache</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>Up to 50GB shared cache storage with 30-day retention.</p>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>Team Dashboard</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>Build analytics, cache insights, and team usage metrics.</p>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>Priority Support</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>Email support with 24-hour SLA and community Discord access.</p>
                  </div>
                </BentoGridCell>
              </BentoGrid>
            </TabsContent>
            <TabsContent value="enterprise">
              <BentoGrid columns={{ md: 3 }} gap="1rem" className="mt-4">
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>Unlimited Cache</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>Unlimited storage with 90-day retention and custom purge rules.</p>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>SSO &amp; RBAC</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>SAML/OIDC single sign-on with role-based access controls.</p>
                  </div>
                </BentoGridCell>
                <BentoGridCell>
                  <div className="p-4">
                    <h4 style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em" }}>Dedicated Support</h4>
                    <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>Dedicated engineer, Slack channel, 1-hour SLA, onboarding assistance.</p>
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
            <AccordionItem value="oss">
              <AccordionTrigger>Is Vite+ open source?</AccordionTrigger>
              <AccordionContent>
                The core Vite runtime remains fully open source. Vite+ adds enterprise features (remote caching, analytics, federation orchestration) as a commercial layer on top of the open-source foundation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="existing">
              <AccordionTrigger>Can I use Vite+ with my existing Vite project?</AccordionTrigger>
              <AccordionContent>
                Yes. Vite+ is a drop-in enhancement — install the package, add your team token, and your existing vite.config.ts works without modification. Enterprise features activate automatically.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cache">
              <AccordionTrigger>How does remote caching work?</AccordionTrigger>
              <AccordionContent>
                Build artifacts are hashed and stored in a shared cloud cache. When any team member builds the same input, the output is restored instantly instead of recomputed — saving minutes on every build.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="security">
              <AccordionTrigger>What about security and compliance?</AccordionTrigger>
              <AccordionContent>
                Vite+ is SOC 2 Type II certified. Cache artifacts are encrypted at rest and in transit. Enterprise plans include audit logs, IP allowlisting, and custom data retention policies.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Panel>

      {/* CTA */}
      <PanelSpacer />
      <Panel className="px-4 py-16 text-center">
        <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em" }}>
          Ready to supercharge your builds?
        </h2>
        <div className="mt-6">
          <Button>Start Free Trial</Button>
        </div>
      </Panel>

      {/* Footer */}
      <PanelSpacer />
      <Panel as="footer" className="px-4 py-6 text-center">
        <p style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>
          &copy; 2026 VitePlus
        </p>
      </Panel>
    </DemoShell>
  );
}
