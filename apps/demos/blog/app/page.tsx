"use client";

import React from "react";
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

const posts = [
  { title: "Token-Driven Theming at Scale", excerpt: "How semantic tokens let you ship one component library that powers fifty brands.", category: "Design", date: "Apr 28, 2026" },
  { title: "Server Components and Design Systems", excerpt: "Why RSC changes the rules for component libraries — and what to do about it.", category: "Engineering", date: "Apr 22, 2026" },
  { title: "Accessible Color in OKLCH", excerpt: "Perceptually uniform color spaces make contrast ratios predictable across every preset.", category: "Design", date: "Apr 18, 2026" },
  { title: "Monorepo Tooling in 2026", excerpt: "Turbo, pnpm workspaces, and tsup: the stack that powers Sigil's build pipeline.", category: "Engineering", date: "Apr 14, 2026" },
  { title: "Composing Layouts with BentoGrid", excerpt: "A practical guide to asymmetric grid layouts using the BentoGrid primitive.", category: "Product", date: "Apr 10, 2026" },
  { title: "Motion Principles for UI Engineers", excerpt: "Spring physics, easing curves, and the seven rules that make interfaces feel alive.", category: "Design", date: "Apr 6, 2026" },
];

const topics = [
  { name: "Design Systems", count: 24 },
  { name: "React Patterns", count: 18 },
  { name: "TypeScript", count: 15 },
  { name: "CSS Architecture", count: 12 },
  { name: "Performance", count: 9 },
  { name: "Accessibility", count: 7 },
];

export default function Page() {
  return (
    <DemoShell>
      {/* Nav */}
      <Panel as="nav" className="flex items-center justify-between px-4 py-3">
        <span style={{ fontFamily: "var(--s-font-display)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.03em" }}>Chronicle</span>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-5 text-sm" style={{ color: "var(--s-text-muted)" }}>
            <a href="#">Blog</a>
            <a href="#">Newsletter</a>
            <a href="#">About</a>
          </nav>
          <Button size="sm">Subscribe</Button>
        </div>
      </Panel>

      {/* Hero — Featured Post */}
      <PanelSpacer />
      <Panel className="p-4">
        <PlaceholderImage aspect="21/9" label="Featured Article" />
        <div className="mt-4 flex items-center gap-2">
          <Badge>Featured</Badge>
        </div>
        <h1 className="mt-3" style={{ fontFamily: "var(--s-font-display)", fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
          The Future of Design Systems
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm" style={{ color: "var(--s-text-muted)" }}>
          <span>Elena Voss</span>
          <span>·</span>
          <span>Apr 30, 2026</span>
          <span>·</span>
          <span>12 min read</span>
        </div>
      </Panel>

      {/* Latest Posts */}
      <PanelSpacer />
      <Panel>
        <PanelHeader right={<span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>{posts.length} articles</span>}>Latest</PanelHeader>
        <div className="p-4">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="product">Product</TabsTrigger>
            </TabsList>
            {["all", "design", "engineering", "product"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <BentoGrid columns={{ md: 2 }} gap="1rem" className="mt-4">
                  {posts
                    .filter((p) => tab === "all" || p.category.toLowerCase() === tab)
                    .map((post) => (
                      <BentoGridCell key={post.title}>
                        <div className="p-3" style={{ background: "var(--s-surface)", borderRadius: "var(--s-radius-md, 8px)", border: "1px solid var(--s-border)" }}>
                          <PlaceholderImage aspect="16/9" label={post.category} />
                          <div className="mt-3 flex items-center gap-2">
                            <Badge variant="outline">{post.category}</Badge>
                            <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 10, color: "var(--s-text-muted)" }}>{post.date}</span>
                          </div>
                          <h3 className="mt-2" style={{ fontFamily: "var(--s-font-display)", fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em" }}>{post.title}</h3>
                          <p className="mt-1 text-sm" style={{ color: "var(--s-text-muted)", lineHeight: 1.6 }}>{post.excerpt}</p>
                        </div>
                      </BentoGridCell>
                    ))}
                </BentoGrid>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Panel>

      {/* Topics */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Topics</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={{ md: 3 }} gap="0.75rem">
            {topics.map((topic) => (
              <BentoGridCell key={topic.name}>
                <div className="p-4 text-center" style={{ background: "var(--s-surface)", borderRadius: "var(--s-radius-md, 8px)", border: "1px solid var(--s-border)" }}>
                  <span style={{ fontFamily: "var(--s-font-display)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em" }}>{topic.name}</span>
                  <div className="mt-1" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>{topic.count} articles</div>
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
            <AccordionItem value="contribute">
              <AccordionTrigger>How can I contribute an article?</AccordionTrigger>
              <AccordionContent>We accept guest posts from practicing engineers and designers. Open a draft PR against the content repo with your markdown file and we will review within a week.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="rss">
              <AccordionTrigger>Do you have an RSS feed?</AccordionTrigger>
              <AccordionContent>Yes — the feed is available at /rss.xml and updates within minutes of a new post going live.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="newsletter">
              <AccordionTrigger>How often does the newsletter go out?</AccordionTrigger>
              <AccordionContent>We send a curated digest every two weeks with the best articles, community highlights, and upcoming events.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="contact">
              <AccordionTrigger>How do I contact the editorial team?</AccordionTrigger>
              <AccordionContent>Reach us at editors@chronicle.dev or open an issue in the content repository. We respond within 48 hours.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Panel>

      {/* Footer */}
      <PanelSpacer />
      <Panel as="footer" className="flex items-center justify-between px-4 py-4">
        <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>© 2026 Chronicle</span>
        <div className="flex items-center gap-4 text-sm" style={{ color: "var(--s-text-muted)" }}>
          <a href="#">RSS</a>
          <a href="#">Twitter</a>
          <a href="#">GitHub</a>
        </div>
      </Panel>
    </DemoShell>
  );
}
