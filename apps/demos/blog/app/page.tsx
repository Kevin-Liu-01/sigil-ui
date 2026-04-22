"use client";

import { useState } from "react";

const articles = [
  {
    title: "The Future of Design Tokens",
    excerpt: "How semantic tokens are changing the way we think about design systems, from static variables to dynamic, context-aware values.",
    author: "Elena Voss",
    date: "Apr 18, 2026",
    readTime: "8 min read",
    category: "Design",
  },
  {
    title: "Building Accessible Component Libraries",
    excerpt: "A practical guide to ARIA patterns, keyboard navigation, and screen reader testing that goes beyond checkbox compliance.",
    author: "Marcus Chen",
    date: "Apr 15, 2026",
    readTime: "12 min read",
    category: "Engineering",
  },
  {
    title: "Why We Chose CSS Variables Over Tailwind Config",
    excerpt: "The architectural decision behind Sigil's theming system, and why runtime customization won over build-time configuration.",
    author: "Sarah Okafor",
    date: "Apr 12, 2026",
    readTime: "6 min read",
    category: "Engineering",
  },
  {
    title: "Motion Design Principles for UI",
    excerpt: "Spring physics, easing curves, and orchestration patterns that make interfaces feel alive without being distracting.",
    author: "James Park",
    date: "Apr 9, 2026",
    readTime: "10 min read",
    category: "Design",
  },
  {
    title: "Shipping a Component Library in 2026",
    excerpt: "Lessons from maintaining an open-source design system: monorepo tooling, testing strategies, and release automation.",
    author: "Elena Voss",
    date: "Apr 5, 2026",
    readTime: "15 min read",
    category: "Open Source",
  },
];

const faqs = [
  { q: "What is Sigil UI?", a: "Sigil UI is a themeable component library that uses CSS variable presets to create dramatically different visual identities from the same component primitives." },
  { q: "How do presets work?", a: "Presets are collections of CSS custom properties (--r-* variables) that control colors, spacing, typography, and border radius. Swapping a preset changes the entire visual identity without touching component code." },
  { q: "Can I create custom presets?", a: "Yes. Copy any existing preset's CSS variables, modify the values, and apply your custom class to the root element. The design token reference documents every available variable." },
  { q: "Is Sigil UI accessible?", a: "All components follow WAI-ARIA patterns with keyboard navigation, focus management, and screen reader support. Color contrast ratios meet WCAG 2.1 AA standards across all presets." },
];

const categories = ["All", "Design", "Engineering", "Open Source"];

export default function Page() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ background: "var(--r-background)", color: "var(--r-text)" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid var(--r-border)", fontFamily: "var(--r-font-heading)" }}
      >
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md" style={{ background: "var(--r-primary)" }} />
          <span className="text-base font-semibold">Sigil Blog</span>
        </div>
        <div className="flex items-center gap-6 text-sm" style={{ color: "var(--r-text-muted)" }}>
          <a href="#" className="hover:text-black transition-colors">Articles</a>
          <a href="#" className="hover:text-black transition-colors">Authors</a>
          <a href="#" className="hover:text-black transition-colors">RSS</a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--r-font-heading)" }}>
          Latest Articles
        </h1>
        <p className="text-base mb-10" style={{ color: "var(--r-text-muted)", lineHeight: 1.8 }}>
          Thoughts on design systems, component architecture, and the craft of building interfaces.
        </p>

        {/* Category Tabs */}
        <div className="flex gap-0 mb-10" style={{ borderBottom: "1px solid var(--r-border)", fontFamily: "var(--r-font-heading)" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2.5 text-sm font-medium transition-colors relative"
              style={{
                color: activeCategory === cat ? "var(--r-primary)" : "var(--r-text-muted)",
                borderBottom: activeCategory === cat ? "2px solid var(--r-primary)" : "2px solid transparent",
                marginBottom: "-1px",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article List */}
        <div className="space-y-0">
          {filteredArticles.map((article, i) => (
            <article key={article.title}>
              <a href="#" className="block py-8 group">
                <div className="flex items-center gap-3 mb-3" style={{ fontFamily: "var(--r-font-heading)" }}>
                  {/* Avatar */}
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "var(--r-primary)" }}
                  >
                    {article.author.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className="text-sm font-medium">{article.author}</span>
                  <span className="text-xs" style={{ color: "var(--r-text-muted)" }}>·</span>
                  <span className="text-xs" style={{ color: "var(--r-text-muted)" }}>{article.date}</span>
                  <span className="text-xs" style={{ color: "var(--r-text-muted)" }}>·</span>
                  <span className="text-xs" style={{ color: "var(--r-text-muted)" }}>{article.readTime}</span>
                </div>
                <h2
                  className="text-xl font-bold mb-2 group-hover:text-[var(--r-primary)] transition-colors"
                  style={{ fontFamily: "var(--r-font-heading)" }}
                >
                  {article.title}
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--r-text-muted)", lineHeight: 1.8 }}>
                  {article.excerpt}
                </p>
                <span
                  className="inline-block mt-3 px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    background: "rgba(30,64,175,0.06)",
                    color: "var(--r-primary)",
                    borderRadius: "var(--r-radius-sm)",
                    fontFamily: "var(--r-font-heading)",
                  }}
                >
                  {article.category}
                </span>
              </a>
              {i < filteredArticles.length - 1 && (
                <div style={{ height: "1px", background: "var(--r-border)" }} />
              )}
            </article>
          ))}
        </div>

        {/* Separator */}
        <div className="my-16 flex items-center gap-4">
          <div className="flex-1" style={{ height: "1px", background: "var(--r-border)" }} />
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--r-text-muted)", fontFamily: "var(--r-font-heading)" }}>
            FAQ
          </span>
          <div className="flex-1" style={{ height: "1px", background: "var(--r-border)" }} />
        </div>

        {/* Accordion FAQ */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--r-font-heading)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid var(--r-border)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left"
                  style={{ fontFamily: "var(--r-font-heading)" }}
                >
                  <span className="font-medium">{faq.q}</span>
                  <span
                    className="text-lg shrink-0 ml-4 transition-transform"
                    style={{
                      color: "var(--r-text-muted)",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="pb-4 leading-relaxed" style={{ color: "var(--r-text-muted)", lineHeight: 1.8 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 mt-12" style={{ borderTop: "1px solid var(--r-border)", fontFamily: "var(--r-font-heading)" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-sm" style={{ color: "var(--r-text-muted)" }}>© 2026 Sigil UI</span>
          <a href="#" className="text-sm" style={{ color: "var(--r-primary)" }}>Subscribe to RSS →</a>
        </div>
      </footer>
    </div>
  );
}
