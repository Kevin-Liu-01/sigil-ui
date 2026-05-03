import { buildPageMetadata } from "@/lib/metadata";
import { SIGIL_PRODUCT_STATS } from "@/lib/product-stats";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "Why we built Sigil UI — a token-driven design system where one DESIGN.md controls 350+ components across 519 tokens and 33 categories.",
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
          approach: one <code>DESIGN.md</code> file controls your entire visual
          identity. {SIGIL_PRODUCT_STATS.tokenCount} tokens across{" "}
          {SIGIL_PRODUCT_STATS.categoryCount} categories — colors, typography,
          spacing, radius, shadows, motion, page composition, and more.{" "}
          {SIGIL_PRODUCT_STATS.componentCountLabel} components read those tokens
          through CSS custom properties.
        </p>
        <p style={{ marginTop: 16 }}>
          Edit the markdown. Run <code>sigil design compile</code>. CSS custom
          properties and Tailwind v4 regenerate. Every component updates. No
          grep-and-replace. No component-level edits.{" "}
          {SIGIL_PRODUCT_STATS.presetCount} curated presets swap all 519 tokens
          at once — not a color toggle, a completely different design language.
        </p>
        <p style={{ marginTop: 16 }}>
          Sigil ships a CLI for project setup, DESIGN.md generation, preset
          management, and health checks; a drag-and-drop sandbox for composing
          pages; and auto-generated agent instructions so AI agents can build
          with it immediately.
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
