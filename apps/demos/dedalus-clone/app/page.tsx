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
        <div className="flex items-center gap-8">
          <span style={{ fontFamily: "var(--s-font-display)", fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em" }}>Dedalus</span>
          <div className="hidden md:flex items-center gap-6">
            {["Products", "Research", "Company"].map((link) => (
              <a key={link} href="#" style={{ fontSize: 13, color: "var(--s-text-muted)" }}>{link}</a>
            ))}
          </div>
        </div>
        <Button size="sm">Get Access</Button>
      </Panel>

      <PanelSpacer />

      {/* Hero */}
      <Panel className="px-4 py-16 md:py-24">
        <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>AI Infrastructure</span>
        <h1 className="mt-4" style={{ fontFamily: "var(--s-font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
          Intelligence infrastructure for the next era
        </h1>
        <p className="mt-4 max-w-xl" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
          Dedalus builds foundational AI systems — compute fabric, model registry, and inference engine — for teams that need to operate at scale with full control.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Button>Start Building</Button>
          <Button variant="outline">Documentation</Button>
        </div>
      </Panel>

      {/* Hero Image */}
      <Panel>
        <PlaceholderImage aspect="21/9" label="Architecture Overview" />
      </Panel>

      <PanelSpacer />

      {/* Products */}
      <Panel>
        <PanelHeader>Products</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={3} gap="1rem">
            <BentoGridCell>
              <div className="p-5" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                <Badge className="mb-3">Compute</Badge>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Compute Fabric</h3>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--s-text-muted)" }}>Distributed GPU orchestration with automatic scheduling, fault tolerance, and elastic scaling across clusters.</p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="p-5" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                <Badge className="mb-3">Models</Badge>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Model Registry</h3>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--s-text-muted)" }}>Version, deploy, and serve models with lineage tracking, A/B testing, and automatic rollback.</p>
              </div>
            </BentoGridCell>
            <BentoGridCell>
              <div className="p-5" style={{ background: "var(--s-surface)", borderRadius: "var(--s-grid-cell-radius, var(--s-radius-sm, 6px))" }}>
                <Badge className="mb-3">Serving</Badge>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Inference Engine</h3>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--s-text-muted)" }}>Low-latency serving with dynamic batching, quantization, and speculative decoding built in.</p>
              </div>
            </BentoGridCell>
          </BentoGrid>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Technology Tabs */}
      <Panel>
        <PanelHeader>Technology</PanelHeader>
        <div className="p-4">
          <Tabs defaultValue="compute">
            <TabsList>
              <TabsTrigger value="compute">Compute</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
              <TabsTrigger value="serving">Serving</TabsTrigger>
            </TabsList>
            <TabsContent value="compute" className="pt-4">
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
                The Compute Fabric abstracts GPU clusters into a unified resource pool. Jobs are scheduled using a topology-aware allocator that optimizes for data locality, minimizing cross-node communication overhead. Supports NVIDIA H100, A100, and AMD MI300X.
              </p>
            </TabsContent>
            <TabsContent value="models" className="pt-4">
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
                The Model Registry provides immutable artifact storage with full lineage tracking. Every training run, dataset snapshot, and hyperparameter set is versioned. Deploy directly from the registry with canary releases and automatic rollback on metric degradation.
              </p>
            </TabsContent>
            <TabsContent value="serving" className="pt-4">
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--s-text-muted)" }}>
                The Inference Engine supports continuous batching, paged attention (vLLM-compatible), and speculative decoding. Serve models at scale with automatic INT8/FP8 quantization and request-level priority queues for latency-sensitive workloads.
              </p>
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
            <AccordionItem value="q1">
              <AccordionTrigger>What infrastructure does Dedalus support?</AccordionTrigger>
              <AccordionContent>Dedalus runs on any cloud or on-premise infrastructure. We support AWS, GCP, Azure, and bare-metal deployments with NVIDIA and AMD GPUs. Our control plane manages heterogeneous clusters transparently.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>How does pricing work?</AccordionTrigger>
              <AccordionContent>Pricing is based on compute hours consumed and number of models served. The platform itself is free for up to 3 team members with community support. Enterprise plans include dedicated support, SLAs, and custom integrations.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Can I bring my own models?</AccordionTrigger>
              <AccordionContent>Yes. Dedalus supports any PyTorch, JAX, or ONNX model. Upload your weights to the Model Registry and deploy with a single command. We handle optimization, quantization, and serving infrastructure.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Is Dedalus open source?</AccordionTrigger>
              <AccordionContent>The core runtime and CLI are open source under the Apache 2.0 license. The managed platform adds enterprise features like SSO, audit logs, and multi-region replication. Self-hosting is fully supported.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Panel>

      <PanelSpacer />

      {/* Footer */}
      <Panel as="footer" className="px-4 py-6 flex items-center justify-between">
        <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>&copy; 2026 Dedalus Labs</span>
        <div className="flex items-center gap-4">
          {["GitHub", "Docs", "Blog"].map((link) => (
            <a key={link} href="#" style={{ fontSize: 12, color: "var(--s-text-muted)" }}>{link}</a>
          ))}
        </div>
      </Panel>
    </DemoShell>
  );
}
