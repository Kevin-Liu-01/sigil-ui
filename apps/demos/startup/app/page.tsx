"use client";

import React, { useState } from "react";
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

const features = [
  { title: "Analytics", desc: "Real-time dashboards with cohort analysis, funnels, and retention curves out of the box." },
  { title: "Collaboration", desc: "Multiplayer editing, inline comments, and shared workspaces for your entire team." },
  { title: "Deployment", desc: "One-click deploys to edge. Preview environments on every PR. Rollbacks in seconds." },
];

const stats = [
  { value: "12K+", label: "Active Users" },
  { value: "$1.2M", label: "MRR" },
  { value: "99.98%", label: "Uptime" },
  { value: "72", label: "NPS Score" },
];

const pricingPlans = [
  { name: "Starter", monthly: "Free", annual: "Free", desc: "For individuals and small side projects.", features: ["Up to 3 projects", "1 GB storage", "Community support"] },
  { name: "Pro", monthly: "$29/mo", annual: "$24/mo", desc: "For growing teams that need more power.", features: ["Unlimited projects", "50 GB storage", "Priority support", "Analytics dashboard"] },
  { name: "Enterprise", monthly: "Custom", annual: "Custom", desc: "For organizations with custom requirements.", features: ["SSO & SAML", "Dedicated SLA", "Custom integrations", "Audit logs", "On-premise option"] },
];

const faqItems = [
  { q: "How long does onboarding take?", a: "Most teams are fully onboarded in under 15 minutes. The CLI auto-detects your framework, installs dependencies, and generates configuration." },
  { q: "Do you offer a free trial?", a: "The Starter plan is free forever. Pro plans include a 14-day free trial with no credit card required." },
  { q: "Can I migrate from an existing tool?", a: "Yes. We provide migration scripts for most popular tools. Run `sigil migrate` and follow the interactive prompts." },
  { q: "What frameworks are supported?", a: "Next.js, Remix, Astro, SvelteKit, and Vite out of the box. Any React-based framework works with minimal configuration." },
];

export default function Page() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <DemoShell>
      {/* Navbar */}
      <Panel as="nav">
        <div className="flex items-center justify-between px-4 py-3">
          <span style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }}>LaunchPad</span>
          <div className="flex items-center gap-5">
            {["Product", "Pricing", "Company"].map((link) => (
              <a key={link} href="#" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>{link}</a>
            ))}
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Hero */}
      <Panel>
        <div className="px-4 py-20 text-center">
          <Badge>Y Combinator W26</Badge>
          <h1 className="mt-4" style={{ fontFamily: "var(--s-font-display)", fontSize: 44, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08 }}>Launch faster, iterate smarter</h1>
          <p className="mt-4 mx-auto" style={{ maxWidth: 440, fontSize: 14, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
            The deployment platform built for speed-obsessed teams. Ship every commit, measure everything, and iterate with confidence.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button>Start for free</Button>
            <Button variant="outline">Watch demo</Button>
          </div>
        </div>
      </Panel>

      {/* Product screenshot */}
      <Panel>
        <div className="px-4 py-4">
          <PlaceholderImage aspect="21/9" label="Product Demo" />
        </div>
      </Panel>

      <PanelSpacer />

      {/* Features */}
      <Panel>
        <PanelHeader>Features</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={{ md: 3 }} gap="0.5rem">
            {features.map((f) => (
              <BentoGridCell key={f.title}>
                <div className="p-4" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                  <h3 style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em" }}>{f.title}</h3>
                  <p className="mt-1.5" style={{ fontSize: 12, lineHeight: 1.5, color: "var(--s-text-muted)" }}>{f.desc}</p>
                </div>
              </BentoGridCell>
            ))}
          </BentoGrid>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Traction */}
      <Panel>
        <PanelHeader>Traction</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={{ md: 4 }} gap="0.5rem">
            {stats.map((s) => (
              <BentoGridCell key={s.label}>
                <div className="p-4 text-center" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                  <div style={{ fontFamily: "var(--s-font-display)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em" }}>{s.value}</div>
                  <div className="mt-1" style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, letterSpacing: "0.04em", color: "var(--s-text-muted)", textTransform: "uppercase" as const }}>{s.label}</div>
                </div>
              </BentoGridCell>
            ))}
          </BentoGrid>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Pricing */}
      <Panel>
        <PanelHeader right={
          <Tabs value={billing} onValueChange={(v) => setBilling(v as "monthly" | "annual")}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual</TabsTrigger>
            </TabsList>
          </Tabs>
        }>Pricing</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={{ md: 3 }} gap="0.5rem">
            {pricingPlans.map((plan) => (
              <BentoGridCell key={plan.name}>
                <div className="p-4 flex flex-col" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                  <h3 style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600 }}>{plan.name}</h3>
                  <div className="mt-2" style={{ fontFamily: "var(--s-font-display)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em" }}>
                    {billing === "monthly" ? plan.monthly : plan.annual}
                  </div>
                  <p className="mt-1" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>{plan.desc}</p>
                  <ul className="mt-3 space-y-1.5">
                    {plan.features.map((f) => (
                      <li key={f} style={{ fontSize: 12, color: "var(--s-text-muted)" }}>• {f}</li>
                    ))}
                  </ul>
                  <Button variant={plan.name === "Pro" ? "primary" : "outline"} size="sm" className="mt-4">
                    {plan.name === "Enterprise" ? "Contact sales" : "Get started"}
                  </Button>
                </div>
              </BentoGridCell>
            ))}
          </BentoGrid>
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

      {/* CTA */}
      <Panel>
        <div className="px-4 py-16 text-center">
          <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em" }}>Ready to launch?</h2>
          <p className="mt-2 mx-auto" style={{ maxWidth: 360, fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
            Join 12,000+ teams shipping with LaunchPad. Free to start, no credit card required.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Input placeholder="you@company.com" style={{ height: 32, fontSize: 12, width: 200 }} />
            <Button size="sm">Get early access</Button>
          </div>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Footer */}
      <Panel as="footer">
        <div className="flex items-center justify-between px-4 py-3">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>LaunchPad © 2026</span>
          <div className="flex gap-4">
            {["GitHub", "Twitter", "LinkedIn"].map((link) => (
              <a key={link} href="#" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>{link}</a>
            ))}
          </div>
        </div>
      </Panel>
    </DemoShell>
  );
}
