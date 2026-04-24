import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Sigil UI",
  description: "The story behind Sigil UI.",
};

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
          Sigil is a token-driven design system for people who believe visual
          identity should be a single source of truth — not scattered across
          hundreds of component files. One spec controls 300+ CSS variables.
          100+ components read those variables. 30 presets swap the entire
          aesthetic in a single command.
        </p>
        <p style={{ marginTop: 16 }}>Built by Kevin Liu.</p>
        <p style={{ marginTop: 16 }}>
          The idea: one markdown file (<code>sigil.tokens.md</code>) controls
          300+ CSS variables. 100+ components read these variables. 30 presets
          swap the entire visual identity. Your agent edits one file. Everything
          updates.
        </p>
        <p style={{ marginTop: 16 }}>
          Sigil ships a CLI (<code>npx @sigil-ui/cli convert</code>), a preset browser, a
          drag-and-drop sandbox, and agent instructions so LLMs can build with
          it out of the box.
        </p>
        <p style={{ marginTop: 24 }}>
          <a href="/" style={{ color: "var(--s-primary)" }}>
            ← Back home
          </a>
        </p>
      </div>
    </div>
  );
}
