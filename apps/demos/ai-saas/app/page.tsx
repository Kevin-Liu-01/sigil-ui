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
  { title: "Model Training", desc: "Fine-tune foundation models on your data with a single API call. Track experiments, compare runs, and deploy winners." },
  { title: "Inference API", desc: "Sub-100ms inference at scale. Auto-batching, caching, and multi-region routing built in." },
  { title: "Fine-Tuning", desc: "RLHF, DPO, and supervised fine-tuning pipelines with built-in evaluation harness." },
];

const pricingTiers = [
  { name: "Starter", monthly: "$0", annual: "$0", desc: "For experiments", features: ["1K requests/mo", "Community support", "1 model"] },
  { name: "Pro", monthly: "$49", annual: "$39", desc: "For growing products", features: ["100K requests/mo", "Priority support", "Unlimited models", "Custom endpoints"], highlighted: true },
  { name: "Enterprise", monthly: "Custom", annual: "Custom", desc: "For teams at scale", features: ["Unlimited requests", "SSO & RBAC", "SLA guarantee", "Dedicated support"] },
];

const faqs = [
  { q: "How do I get started?", a: "Sign up for a free account, grab your API key, and start sending requests. No credit card required." },
  { q: "What models are supported?", a: "We support GPT-4, Claude, Llama, Mistral, and any custom model you fine-tune on our platform." },
  { q: "Is there a rate limit?", a: "Free tier is capped at 1K requests/month. Pro and Enterprise plans have configurable rate limits." },
  { q: "Can I self-host?", a: "Enterprise plans include an on-prem deployment option with full air-gapped support." },
];

export default function Page() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <DemoShell>
      {/* Navbar */}
      <Panel as="nav" className="sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <span style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 700, letterSpacing: "0.02em" }}>Sigil AI</span>
          <div className="hidden md:flex items-center gap-6">
            {["Features", "Pricing", "Docs"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="transition-opacity hover:opacity-70" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>{link}</a>
            ))}
          </div>
          <Button variant="outline" size="sm">Login</Button>
        </div>
      </Panel>

      {/* Hero */}
      <PanelSpacer />
      <Panel>
        <div className="flex flex-col items-center text-center px-4 py-20">
          <Badge variant="outline" className="mb-4">Generative AI Platform</Badge>
          <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Ship AI Products Faster
          </h1>
          <p className="mt-4 max-w-md" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
            Drop-in components for embeddings, chat, RAG, and agents. Beautiful defaults. Full control when you need it.
          </p>
          <div className="flex gap-3 mt-8">
            <Button>Start Building</Button>
            <Button variant="outline">View Docs</Button>
          </div>
        </div>
      </Panel>

      {/* Platform Screenshot */}
      <Panel className="p-4">
        <PlaceholderImage aspect="21/9" label="Platform Dashboard" />
      </Panel>

      {/* Capabilities */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Capabilities</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={{ md: 3 }} gap="1rem">
            {features.map((f) => (
              <BentoGridCell key={f.title}>
                <div className="p-4" style={{ background: "var(--s-surface)", borderRadius: "var(--s-radius-sm, 6px)", border: "1px solid var(--s-border)" }}>
                  <h3 style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.5, color: "var(--s-text-muted)" }}>{f.desc}</p>
                </div>
              </BentoGridCell>
            ))}
          </BentoGrid>
        </div>
      </Panel>

      {/* Pricing */}
      <PanelSpacer />
      <Panel>
        <PanelHeader
          right={
            <Tabs value={billing} onValueChange={(v) => setBilling(v as "monthly" | "annual")}>
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">Annual</TabsTrigger>
              </TabsList>
            </Tabs>
          }
        >
          Pricing
        </PanelHeader>
        <div className="p-4">
          <BentoGrid columns={{ md: 3 }} gap="1rem">
            {pricingTiers.map((tier) => (
              <BentoGridCell key={tier.name}>
                <div className="flex flex-col h-full p-4" style={{ background: "var(--s-surface)", borderRadius: "var(--s-radius-sm, 6px)", border: tier.highlighted ? "1px solid var(--s-primary)" : "1px solid var(--s-border)" }}>
                  <h3 style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 600 }}>{tier.name}</h3>
                  <p style={{ fontSize: 12, color: "var(--s-text-muted)", marginTop: 2 }}>{tier.desc}</p>
                  <div className="mt-4 mb-4">
                    <span style={{ fontFamily: "var(--s-font-display)", fontSize: 28, fontWeight: 700 }}>
                      {billing === "monthly" ? tier.monthly : tier.annual}
                    </span>
                    {tier.monthly !== "Custom" && <span style={{ fontSize: 12, color: "var(--s-text-muted)" }}>/mo</span>}
                  </div>
                  <ul className="flex-1 space-y-2 mb-4">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2" style={{ fontSize: 13, color: "var(--s-text-muted)" }}>
                        <span style={{ color: "var(--s-primary)" }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={tier.highlighted ? "primary" : "outline"} className="w-full">
                    {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              </BentoGridCell>
            ))}
          </BentoGrid>
        </div>
      </Panel>

      {/* FAQ */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>FAQ</PanelHeader>
        <div className="p-4">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Panel>

      {/* CTA */}
      <PanelSpacer />
      <Panel>
        <div className="flex flex-col items-center text-center px-4 py-16">
          <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Ready to ship?</h2>
          <div className="flex gap-2 w-full max-w-sm">
            <Input placeholder="you@company.com" className="flex-1" />
            <Button>Get Started</Button>
          </div>
        </div>
      </Panel>

      {/* Footer */}
      <PanelSpacer />
      <Panel as="footer">
        <div className="flex items-center justify-between px-4 py-4">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>© 2026 Sigil AI</span>
          <div className="flex gap-4">
            {["GitHub", "Discord", "Twitter"].map((link) => (
              <a key={link} href="#" className="transition-opacity hover:opacity-70" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>{link}</a>
            ))}
          </div>
        </div>
      </Panel>
    </DemoShell>
  );
}
