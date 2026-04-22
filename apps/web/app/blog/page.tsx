import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Sigil UI",
  description: "Updates, thinking, and technical writing from the Sigil UI team.",
};

const posts = [
  {
    date: "2026-04-22",
    title: "Introducing Sigil UI",
    excerpt:
      "The token-driven design system that replaces scattered Tailwind overrides with a single source of truth. One file, 300+ variables, 30 presets.",
  },
  {
    date: "2026-04-20",
    title: "Why Presets Beat Themes",
    excerpt:
      "shadcn gives you components. Sigil gives you components plus a complete visual identity you can swap in one command. Here's why that matters.",
  },
  {
    date: "2026-04-18",
    title: "The Alignment Rail System",
    excerpt:
      "How margins, gutters, and content widths compose into a structural grid that adapts from mobile to ultrawide without breakpoint spaghetti.",
  },
];

export default function BlogPage() {
  return (
    <div style={{ padding: "120px 24px 80px", maxWidth: 720, margin: "0 auto" }}>
      <h1
        style={{
          fontFamily: "var(--s-font-display)",
          fontSize: 40,
          fontWeight: 700,
          marginBottom: 48,
          color: "var(--s-text)",
        }}
      >
        Blog
      </h1>

      {posts.map((post) => (
        <article
          key={post.title}
          style={{
            marginBottom: 48,
            borderBottom: "1px solid var(--s-border-muted)",
            paddingBottom: 32,
          }}
        >
          <time
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 12,
              color: "var(--s-text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            {post.date}
          </time>
          <h2
            style={{
              margin: "8px 0",
              fontSize: 24,
              fontWeight: 600,
              fontFamily: "var(--s-font-display)",
              color: "var(--s-text)",
            }}
          >
            {post.title}
          </h2>
          <p style={{ color: "var(--s-text-secondary)", lineHeight: 1.7 }}>
            {post.excerpt}
          </p>
        </article>
      ))}

      <a
        href="/"
        style={{
          color: "var(--s-primary)",
          fontFamily: "var(--s-font-mono)",
          fontSize: 14,
        }}
      >
        ← Back home
      </a>
    </div>
  );
}
