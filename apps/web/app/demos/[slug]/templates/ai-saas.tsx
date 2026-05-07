"use client";

import { useState } from "react";
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

const FEATURES = [
  {
    title: "Model Training",
    stat: "GPU Clusters",
    desc: "Distributed training on thousands of GPUs with automatic checkpointing and fault recovery.",
  },
  {
    title: "Inference API",
    stat: "Sub-100ms P99",
    desc: "Deploy models behind a global edge network with automatic scaling and zero cold starts.",
  },
  {
    title: "Fine-Tuning",
    stat: "Your Data",
    desc: "Customize foundation models with your own data. RLHF, DPO, and supervised fine-tuning.",
  },
];

const PRICING = {
  monthly: [
    { name: "Hobby", price: "$0", desc: "10K requests/mo · 1 model · Community support", cta: "Get Started" },
    { name: "Pro", price: "$49", desc: "500K requests/mo · 10 models · Priority support", cta: "Start Trial", badge: "Popular" },
    { name: "Enterprise", price: "$199", desc: "Unlimited · Dedicated infra · SSO + SAML", cta: "Contact Sales" },
  ],
  annual: [
    { name: "Hobby", price: "$0", desc: "10K requests/mo · 1 model · Community support", cta: "Get Started" },
    { name: "Pro", price: "$39", desc: "500K requests/mo · 10 models · Priority support", cta: "Start Trial", badge: "Popular" },
    { name: "Enterprise", price: "$159", desc: "Unlimited · Dedicated infra · SSO + SAML", cta: "Contact Sales" },
  ],
};

const FAQ = [
  { q: "How do I get started?", a: "Sign up, choose a model, and make your first API call in under 2 minutes. No credit card required for the Hobby plan." },
  { q: "Can I bring my own model?", a: "Yes. Upload custom weights or fine-tune any supported foundation model with your own dataset." },
  { q: "What's the latency for inference?", a: "Sub-100ms P99 latency globally. We deploy to 30+ edge locations and auto-scale based on traffic patterns." },
  { q: "Is there a free tier?", a: "The Hobby plan is free forever — 10K requests per month, one model, community support." },
];

export default function AISaasDemo() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const plans = PRICING[billing];

  return (
    <DemoShell>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 13, fontWeight: 600 }}>
            Sigil AI
          </span>
          <div className="flex items-center gap-5">
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Features</span>
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Docs</span>
            <span className="hidden text-sm sm:inline" style={{ color: "var(--s-text-muted)" }}>Pricing</span>
            <Button size="sm">Login</Button>
          </div>
        </div>
      </Panel>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="px-4 pt-16 pb-12 text-center">
          <Badge variant="outline" className="mb-4">Generative AI Platform</Badge>
          <h1
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Ship AI Products Faster
          </h1>
          <p
            className="mx-auto mt-4"
            style={{
              fontSize: 16,
              color: "var(--s-text-muted)",
              maxWidth: "28rem",
              lineHeight: 1.6,
            }}
          >
            Full-stack inference platform with model training, fine-tuning, and deployment.
            Go from prototype to production in minutes.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button>Start Building</Button>
            <Button variant="outline">Read Docs</Button>
          </div>
        </div>
      </Panel>

      {/* ── Hero image ──────────────────────────────────────────── */}
      <Panel>
        <div className="px-4 pb-6">
          <PlaceholderImage
            aspect="21/9"
            gradient="linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 20%, var(--s-background)) 0%, var(--s-surface) 50%, color-mix(in oklch, var(--s-primary) 10%, var(--s-surface)) 100%)"
            label="Platform Dashboard"
          />
        </div>
      </Panel>

      {/* ── Capabilities ────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Capabilities</PanelHeader>
        <BentoGrid columns={{ md: 3 }} gap={4} className="p-1">
          {FEATURES.map((f) => (
            <BentoGridCell key={f.title}>
              <div className="flex w-full flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{f.title}</span>
                  <span
                    style={{
                      fontFamily: "var(--s-font-mono)",
                      fontSize: 9,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--s-primary)",
                    }}
                  >
                    {f.stat}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  {f.desc}
                </p>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── Pricing ─────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader
          right={
            <Tabs value={billing} onValueChange={(v) => setBilling(v as "monthly" | "annual")}>
              <TabsList>
                <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
                <TabsTrigger value="annual" className="text-xs">Annual</TabsTrigger>
              </TabsList>
            </Tabs>
          }
        >
          Pricing
        </PanelHeader>
        <BentoGrid columns={{ md: 3 }} gap={4} className="p-1">
          {plans.map((plan) => (
            <BentoGridCell key={plan.name}>
              <div className="flex w-full flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{plan.name}</span>
                  {plan.badge && <Badge variant="secondary" className="text-[10px]">{plan.badge}</Badge>}
                </div>
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {plan.price}
                  {plan.price !== "$0" && (
                    <span style={{ fontSize: 13, fontWeight: 400, color: "var(--s-text-muted)" }}>
                      /mo
                    </span>
                  )}
                </span>
                <p style={{ fontSize: 12, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
                  {plan.desc}
                </p>
                <Button variant={plan.badge ? "primary" : "outline"} size="sm" className="mt-1 w-full">
                  {plan.cta}
                </Button>
              </div>
            </BentoGridCell>
          ))}
        </BentoGrid>
      </Panel>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>FAQ</PanelHeader>
        <div className="px-4 py-2">
          <Accordion type="single" collapsible>
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm">{item.q}</AccordionTrigger>
                <AccordionContent>
                  <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.6 }}>
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Panel>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="flex flex-col items-center gap-4 px-4 py-12 text-center">
          <h2
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Ready to ship?
          </h2>
          <div className="flex w-full max-w-sm gap-2">
            <Input placeholder="you@company.com" className="flex-1" />
            <Button>Get Started</Button>
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
            © 2026 Sigil AI · Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>sigil-ui</span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
