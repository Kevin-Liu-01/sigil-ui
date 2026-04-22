"use client";

import { Navbar } from "@/components/landing/navbar";
import { Stack } from "@sigil-ui/components";

function ContentWrap({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", ...style }}>
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="s-mono"
      style={{
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "var(--s-primary)",
        marginBottom: 24,
        paddingBottom: 12,
        borderBottom: "1px solid var(--s-border-muted)",
      }}
    >
      {children}
    </h2>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 16,
        lineHeight: 1.75,
        color: "var(--s-text-secondary)",
        marginBottom: 24,
        fontFamily: "var(--s-font-body)",
      }}
    >
      {children}
    </p>
  );
}

function Emphasis({ children }: { children: React.ReactNode }) {
  return (
    <strong style={{ color: "var(--s-text)", fontWeight: 500 }}>
      {children}
    </strong>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      style={{
        margin: "48px 0",
        padding: "0 0 0 24px",
        borderLeft: "2px solid var(--s-primary)",
        fontSize: 20,
        lineHeight: 1.6,
        color: "var(--s-text)",
        fontFamily: "var(--s-font-display)",
        fontWeight: 400,
      }}
    >
      {children}
    </blockquote>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: "0 0 24px 0",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            gap: 12,
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--s-text-secondary)",
            fontFamily: "var(--s-font-body)",
          }}
        >
          <span
            className="s-mono"
            style={{
              color: "var(--s-primary)",
              fontSize: 11,
              marginTop: 5,
              flexShrink: 0,
            }}
          >
            //
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ManifestoContent() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, paddingBottom: 80 }}>
        {/* Header */}
        <ContentWrap style={{ marginBottom: 80 }}>
          <span
            className="s-mono"
            style={{
              fontSize: 11,
              color: "var(--s-text-subtle)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "block",
              marginBottom: 16,
            }}
          >
            / manifesto
          </span>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 500,
              lineHeight: 1.1,
              color: "var(--s-text)",
              fontFamily: "var(--s-font-display)",
              marginBottom: 32,
              letterSpacing: "-0.02em",
            }}
          >
            Why Sigil Exists
          </h1>
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.6,
              color: "var(--s-text-secondary)",
              fontFamily: "var(--s-font-body)",
              maxWidth: 560,
            }}
          >
            Every AI-coded site looks the same. Sigil is the decision to make them not.
          </p>
        </ContentWrap>

        <ContentWrap>
          <div
            style={{
              borderTop: "1px solid var(--s-border-muted)",
              paddingTop: 64,
              display: "flex",
              flexDirection: "column",
              gap: 64,
            }}
          >
            {/* The sameness */}
            <section>
              <Paragraph>
                Centered hero. Blurred gradient blob. Pill buttons. Inter. The same six
                Tailwind blues. A dashboard screenshot floating at an angle with a drop
                shadow. <em>"Built for the modern web."</em>
              </Paragraph>
              <Paragraph>
                You've seen it. A thousand times. You'll see it a thousand more, because the
                tools make it the path of least resistance. Copy a component library, prompt
                an agent, get the same output everyone else gets. The "AI-generated"
                aesthetic isn't a style — it's the absence of one. It's what happens when
                nobody makes a decision.
              </Paragraph>
              <PullQuote>Sigil is the decision.</PullQuote>
            </section>

            {/* The Problem */}
            <section>
              <SectionHeading>The Problem</SectionHeading>
              <Paragraph>
                Design systems today give you components. They don't give you a point of
                view. You get a button, a card, an input — all competently built, all
                visually interchangeable with every other component library. The moment you
                want your product to look like <em>your product</em>, you're back to
                hand-editing dozens of files, overriding defaults, fighting the system you
                adopted to save time.
              </Paragraph>
              <Paragraph>
                AI agents make this worse. They're excellent at producing code that compiles.
                They're terrible at producing code that has taste. An agent will happily
                generate a pixel-perfect page that looks like it was designed by committee —
                because in a sense, it was. The training data <em>is</em> the committee.
              </Paragraph>
            </section>

            {/* The Inevitability */}
            <section>
              <SectionHeading>The Inevitability</SectionHeading>
              <Paragraph>
                Here's the thing: agent-first design isn't coming. It's here. The majority
                of new UI will be written — or at least drafted — by agents within a few
                years. Fighting that is pointless. The question isn't{" "}
                <em>whether</em> agents will build your frontend. It's whether the tools
                they use produce sameness or distinction.
              </Paragraph>
              <Paragraph>
                Most design systems weren't built for this. They were built for humans
                browsing docs and copy-pasting snippets. An agent interacting with those
                systems does what any agent does: takes the path of least resistance,
                produces the median output, moves on. The system has no interface{" "}
                <em>for</em> the agent — so the agent defaults to generic.
              </Paragraph>
              <Paragraph>
                Sigil is one of the first design systems built to be{" "}
                <Emphasis>agent-interfaceable</Emphasis>. Not agent-proof. Not
                agent-resistant. Agent-native. The entire architecture assumes an AI agent is
                the primary operator, and gives it a surface that channels its strengths —
                structured editing, pattern consistency, exhaustive coverage — while
                constraining its weakness: taste.
              </Paragraph>
            </section>

            {/* The Belief */}
            <section>
              <SectionHeading>The Belief</SectionHeading>
              <PullQuote>
                Visual identity should be a first-class primitive, not a weekend project
                after the features ship.
              </PullQuote>
              <Paragraph>
                A design system should have opinions. Not just about how components behave,
                but about how they <em>feel</em> — the weight of a border, the tension in a
                radius, the rhythm of spacing, the attitude of a typeface. These aren't
                cosmetic details. They're the difference between a product people remember
                and one they don't.
              </Paragraph>
            </section>

            {/* The Bet */}
            <section>
              <SectionHeading>The Bet</SectionHeading>
              <Paragraph>
                AI agents are great at editing structured documents. They're bad at making
                aesthetic judgments from a blank canvas. So give them structure.
              </Paragraph>
              <Paragraph>
                Sigil puts every visual decision — colors, type, spacing, radius, motion,
                borders, shadows, 259 tokens total — into a single markdown file that an
                agent can read, reason about, and modify. Components don't own their
                appearance. The token spec does. Change the spec, everything updates.
              </Paragraph>
              <PullQuote>
                The agent doesn't need taste. The preset has taste. The agent just needs to
                follow the spec — and that's exactly what agents are good at.
              </PullQuote>
              <BulletList
                items={[
                  "An agent can switch from "warm editorial" to "cold industrial" by swapping a preset, not rewriting components",
                  "A designer can lock down the token spec and hand it to an agent with confidence",
                  "Two projects using Sigil can look nothing alike, because the system was designed for divergence, not convergence",
                  "The agent has a legible, structured interface to the entire visual system — not scattered Tailwind classes across hundreds of files",
                ]}
              />
            </section>

            {/* The Name */}
            <section>
              <SectionHeading>The Name</SectionHeading>
              <Paragraph>
                A sigil is a mark with intention. Not decoration — designation. Every preset
                in this system is a distinct sigil: a coherent set of visual decisions that
                says something specific about the product wearing it.
              </Paragraph>
              <Paragraph>
                Thirty-one presets. Not thirty-one themes. Themes are wallpaper. Presets are
                identities.
              </Paragraph>
            </section>

            {/* The Standard */}
            <section
              style={{
                padding: "48px 0",
                borderTop: "1px solid var(--s-border-muted)",
                borderBottom: "1px solid var(--s-border-muted)",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(20px, 3vw, 28px)",
                  lineHeight: 1.4,
                  color: "var(--s-text)",
                  fontFamily: "var(--s-font-display)",
                  fontWeight: 400,
                  textAlign: "center",
                  letterSpacing: "-0.01em",
                }}
              >
                If it looks like every other AI-generated site, it failed.
                <br />
                <span style={{ color: "var(--s-text-muted)" }}>That's the bar.</span>
              </p>
            </section>

            {/* Back link */}
            <Stack direction="row" justify="center" style={{ paddingTop: 16 }}>
              <a
                href="/"
                className="s-mono"
                style={{
                  fontSize: 12,
                  color: "var(--s-text-muted)",
                  textDecoration: "none",
                  transition: "color var(--s-duration-fast)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--s-text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--s-text-muted)";
                }}
              >
                ← Back to Sigil
              </a>
            </Stack>
          </div>
        </ContentWrap>
      </main>
    </>
  );
}
