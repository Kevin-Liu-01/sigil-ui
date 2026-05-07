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

const featured = [
  { name: "Classic Runner", price: "$135", gradient: "linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 20%, var(--s-surface)) 0%, var(--s-surface) 100%)" },
  { name: "Linen Overshirt", price: "$89", gradient: "linear-gradient(135deg, color-mix(in oklch, var(--s-secondary, var(--s-primary)) 15%, var(--s-surface)) 0%, var(--s-surface) 100%)" },
  { name: "Canvas Tote", price: "$45", gradient: "linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 10%, var(--s-surface)) 0%, var(--s-surface) 100%)" },
];

const clothing = [
  { name: "Wool Blazer", price: "$220" },
  { name: "Cotton Crew", price: "$48" },
  { name: "Pleated Trouser", price: "$110" },
];

const accessories = [
  { name: "Leather Belt", price: "$65" },
  { name: "Silk Scarf", price: "$78" },
  { name: "Watch Strap", price: "$42" },
];

const homeItems = [
  { name: "Stoneware Mug", price: "$28" },
  { name: "Linen Throw", price: "$95" },
  { name: "Brass Candleholder", price: "$55" },
];

const faqs = [
  { q: "What are the shipping options?", a: "We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free standard shipping on orders over $100." },
  { q: "How do returns work?", a: "Returns are accepted within 30 days of purchase. Items must be unworn with tags attached. We provide a prepaid return label." },
  { q: "How do I find my size?", a: "Check our size guide on each product page. We use standard US sizing. When in doubt, size up." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, Apple Pay, Google Pay, and Shop Pay. Afterpay available on orders over $50." },
];

function ProductCard({ name, price, gradient }: { name: string; price: string; gradient?: string }) {
  return (
    <div>
      <PlaceholderImage aspect="4/5" gradient={gradient} label={name} />
      <div className="mt-3 flex items-center justify-between">
        <span style={{ fontFamily: "var(--s-font-display)", fontSize: 13, fontWeight: 600 }}>{name}</span>
        <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 12, fontWeight: 500 }}>{price}</span>
      </div>
    </div>
  );
}

function CategoryGrid({ items }: { items: { name: string; price: string }[] }) {
  return (
    <BentoGrid columns={3} gap="1rem">
      {items.map((item) => (
        <BentoGridCell key={item.name}>
          <ProductCard name={item.name} price={item.price} />
        </BentoGridCell>
      ))}
    </BentoGrid>
  );
}

export default function Page() {
  return (
    <DemoShell>
      {/* Navbar */}
      <Panel as="nav">
        <div className="flex items-center justify-between px-4 py-3">
          <span style={{ fontFamily: "var(--s-font-display)", fontSize: 15, fontWeight: 700, letterSpacing: "0.04em" }}>Store</span>
          <div className="hidden md:flex items-center gap-5">
            {["New", "Sale", "Collections"].map((link) => (
              <a key={link} href="#" className="transition-opacity hover:opacity-70" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--s-text-muted)" }}>{link}</a>
            ))}
          </div>
          <Button variant="outline" size="sm">Cart (0)</Button>
        </div>
      </Panel>

      {/* Hero */}
      <PanelSpacer />
      <Panel className="p-4">
        <PlaceholderImage aspect="21/9" label="Summer Collection" gradient="linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 18%, var(--s-surface)) 0%, var(--s-surface) 100%)" />
      </Panel>

      {/* Featured */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Featured</PanelHeader>
        <div className="p-4">
          <BentoGrid columns={3} gap="1rem">
            {featured.map((p) => (
              <BentoGridCell key={p.name}>
                <ProductCard name={p.name} price={p.price} gradient={p.gradient} />
              </BentoGridCell>
            ))}
          </BentoGrid>
        </div>
      </Panel>

      {/* Categories */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Categories</PanelHeader>
        <div className="p-4">
          <Tabs defaultValue="clothing">
            <TabsList>
              <TabsTrigger value="clothing">Clothing</TabsTrigger>
              <TabsTrigger value="accessories">Accessories</TabsTrigger>
              <TabsTrigger value="home">Home</TabsTrigger>
            </TabsList>
            <TabsContent value="clothing">
              <CategoryGrid items={clothing} />
            </TabsContent>
            <TabsContent value="accessories">
              <CategoryGrid items={accessories} />
            </TabsContent>
            <TabsContent value="home">
              <CategoryGrid items={homeItems} />
            </TabsContent>
          </Tabs>
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

      {/* Footer */}
      <PanelSpacer />
      <Panel as="footer">
        <div className="flex items-center justify-between px-4 py-4">
          <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>© 2026 Store</span>
          <div className="flex gap-4">
            {["Shipping", "Returns", "Contact"].map((link) => (
              <a key={link} href="#" className="transition-opacity hover:opacity-70" style={{ fontFamily: "var(--s-font-mono)", fontSize: 11, color: "var(--s-text-muted)" }}>{link}</a>
            ))}
          </div>
        </div>
      </Panel>
    </DemoShell>
  );
}
