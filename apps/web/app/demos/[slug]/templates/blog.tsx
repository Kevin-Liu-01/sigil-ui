"use client";

import { useState } from "react";
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
  PlaceholderImage,
} from "./_shell";

type Category = "All" | "Design" | "Engineering" | "Tokens" | "Philosophy";

interface Article {
  title: string;
  category: Exclude<Category, "All">;
  date: string;
  excerpt: string;
  gradient: string;
}

const ARTICLES: Article[] = [
  {
    title: "On Design Systems",
    category: "Design",
    date: "Apr 22, 2026",
    excerpt: "Why constraints breed creativity — and how a token-driven architecture makes every component a downstream consumer.",
    gradient: "linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 18%, var(--s-surface)) 0%, var(--s-surface) 100%)",
  },
  {
    title: "The Token Manifesto",
    category: "Tokens",
    date: "Apr 18, 2026",
    excerpt: "519 configurable fields, 33 categories, one source of truth. Edit the spec, not the components.",
    gradient: "linear-gradient(150deg, color-mix(in oklch, var(--s-primary) 12%, var(--s-background)) 0%, var(--s-surface) 100%)",
  },
  {
    title: "Why OKLCH Matters",
    category: "Engineering",
    date: "Apr 14, 2026",
    excerpt: "Perceptual uniformity, wider gamut, and predictable lightness. The case for a modern color space.",
    gradient: "linear-gradient(120deg, var(--s-surface) 0%, color-mix(in oklch, var(--s-primary) 14%, var(--s-surface)) 100%)",
  },
  {
    title: "Preset Philosophy",
    category: "Philosophy",
    date: "Apr 10, 2026",
    excerpt: "46 presets, seven aesthetic families. How visual identity becomes a single function call.",
    gradient: "linear-gradient(160deg, color-mix(in oklch, var(--s-primary) 10%, var(--s-surface)) 0%, var(--s-background) 100%)",
  },
  {
    title: "Component Architecture",
    category: "Engineering",
    date: "Apr 6, 2026",
    excerpt: "forwardRef, className passthrough, var(--s-*) only. Anatomy of a token-driven component.",
    gradient: "linear-gradient(135deg, var(--s-surface) 0%, color-mix(in oklch, var(--s-primary) 16%, var(--s-background)) 100%)",
  },
  {
    title: "The Color of Intent",
    category: "Design",
    date: "Apr 2, 2026",
    excerpt: "Semantic color tokens map meaning to hue. Primary, destructive, muted — each carries weight.",
    gradient: "linear-gradient(145deg, color-mix(in oklch, var(--s-primary) 20%, var(--s-surface)) 0%, var(--s-surface) 100%)",
  },
  {
    title: "Shipping at Scale",
    category: "Engineering",
    date: "Mar 28, 2026",
    excerpt: "Turbo, tsup, pnpm workspaces. How we build 350+ components across six packages.",
    gradient: "linear-gradient(130deg, var(--s-background) 0%, color-mix(in oklch, var(--s-primary) 12%, var(--s-surface)) 100%)",
  },
  {
    title: "Design Constraints",
    category: "Philosophy",
    date: "Mar 24, 2026",
    excerpt: "Constraints don't limit expression — they channel it. Context tells agents what looks good; constraints make it impossible to look bad.",
    gradient: "linear-gradient(155deg, color-mix(in oklch, var(--s-primary) 8%, var(--s-surface)) 0%, var(--s-surface) 100%)",
  },
];

const CATEGORIES: Category[] = ["All", "Design", "Engineering", "Tokens", "Philosophy"];

const FAQ = [
  { q: "How often do you publish?", a: "We publish new articles weekly, typically on Tuesdays. Longer essays and deep-dives drop monthly." },
  { q: "Can I contribute?", a: "Yes — we accept guest posts from practitioners working with design systems, tokens, and component architecture. Reach out with a pitch." },
  { q: "What topics do you cover?", a: "Design systems, token architecture, component engineering, color science, preset philosophy, and the intersection of constraints and creativity." },
  { q: "How do I subscribe?", a: "Hit the Subscribe button in the nav. You'll get new posts delivered to your inbox — no spam, unsubscribe anytime." },
];

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <PlaceholderImage
        aspect={featured ? "21/9" : "16/9"}
        gradient={article.gradient}
        label={article.category}
      />
      <div className="flex flex-col gap-1.5">
        <h3
          style={{
            fontFamily: "var(--s-font-display)",
            fontSize: featured ? 20 : 15,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}
        >
          {article.title}
        </h3>
        <span
          style={{
            fontFamily: "var(--s-font-mono)",
            fontSize: 10,
            letterSpacing: "0.04em",
            color: "var(--s-text-muted)",
          }}
        >
          {article.date}
        </span>
        <p style={{ fontSize: 13, color: "var(--s-text-muted)", lineHeight: 1.5 }}>
          {article.excerpt}
        </p>
      </div>
    </div>
  );
}

export default function BlogDemo() {
  const [category, setCategory] = useState<Category>("All");

  const filtered = category === "All"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === category);

  const hero = ARTICLES[0];

  return (
    <DemoShell>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <span
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            The Sigil Journal
          </span>
          <Button size="sm" variant="outline">Subscribe</Button>
        </div>
      </Panel>

      {/* ── Featured Article ─────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="flex flex-col gap-4 px-4 py-6">
          <PlaceholderImage
            aspect="21/9"
            gradient={hero.gradient}
            label="Featured"
          />
          <div className="flex flex-col gap-2">
            <Badge variant="outline" className="w-fit text-[10px]">{hero.category}</Badge>
            <h1
              style={{
                fontFamily: "var(--s-font-display)",
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
              }}
            >
              {hero.title}
            </h1>
            <p style={{ fontSize: 15, color: "var(--s-text-muted)", lineHeight: 1.6, maxWidth: "36rem" }}>
              {hero.excerpt}
            </p>
            <span
              style={{
                fontFamily: "var(--s-font-mono)",
                fontSize: 11,
                letterSpacing: "0.04em",
                color: "var(--s-text-muted)",
              }}
            >
              {hero.date}
            </span>
            <Button className="mt-2 w-fit" size="sm">Read More</Button>
          </div>
        </div>
      </Panel>

      {/* ── Articles ─────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Articles</PanelHeader>
        <div className="px-4 py-3">
          <Tabs value={category} onValueChange={(v) => setCategory(v as Category)}>
            <TabsList>
              {CATEGORIES.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="text-xs">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {CATEGORIES.map((cat) => {
              const items = cat === "All"
                ? ARTICLES
                : ARTICLES.filter((a) => a.category === cat);

              return (
                <TabsContent key={cat} value={cat}>
                  <BentoGrid columns={{ sm: 2 }} gap={4} className="pt-3">
                    {items.map((article, i) => (
                      <BentoGridCell key={article.title} colSpan={i === 0 ? 2 : 1}>
                        <ArticleCard article={article} featured={i === 0} />
                      </BentoGridCell>
                    ))}
                  </BentoGrid>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
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
            © 2026 The Sigil Journal · Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>sigil-ui</span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
