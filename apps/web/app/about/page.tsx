import { buildPageMetadata } from "@/lib/metadata";
import { SIGIL_PRODUCT_STATS } from "@/lib/product-stats";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "Why we built Sigil UI — a React component library where one token file replaces scattered styling across hundreds of components.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div style={{ padding: "120px 24px 80px", maxWidth: 720, margin: "0 auto" }}>
      <h1
        style={{
          fontFamily: "var(--s-font-display)",
          fontSize: 40,
          fontWeight: 700,
          marginBottom: 24,
          color: "var(--s-text)",
        }}
      >
        About Sigil
      </h1>
      <div
        style={{
          fontFamily: "var(--s-font-body)",
          fontSize: 16,
          lineHeight: 1.8,
          color: "var(--s-text-secondary)",
        }}
      >
        <p>
          Most design systems give you components without opinions. You copy them,
          manually style each one, and inevitably drift. Sigil takes a different
          approach: one token file controls your entire visual identity. Every
          color, font, radius, shadow, and animation resolves to a single named
          token. {SIGIL_PRODUCT_STATS.componentCountLabel} components read those
          tokens through CSS custom properties — so you change the source, and
          everything downstream updates.
        </p>
        <p style={{ marginTop: 16 }}>
          The token surface is a markdown file (<code>sigil.tokens.md</code>)
          that compiles to {SIGIL_PRODUCT_STATS.tokenCount} CSS variables. Humans
          and AI agents edit the same file. {SIGIL_PRODUCT_STATS.presetCount}{" "}
          curated presets swap every token at once — not a color toggle, a
          different design language.
        </p>
        <p style={{ marginTop: 16 }}>
          Sigil also ships a CLI for project setup, preset switching, and health
          checks; a drag-and-drop sandbox for composing pages; and auto-generated
          agent instructions so LLMs can build with it immediately.
        </p>
        <p style={{ marginTop: 16 }}>Built by Kevin Liu.</p>
        <p style={{ marginTop: 24 }}>
          <a href="/" style={{ color: "var(--s-primary)" }}>
            ← Back home
          </a>
        </p>
      </div>
    </div>
  );
}
