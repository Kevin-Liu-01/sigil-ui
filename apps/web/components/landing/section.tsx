import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  grid?: boolean;
  narrow?: boolean;
};

export function Section({
  children,
  id,
  className = "",
  grid = false,
  narrow = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative ${grid ? "r-grid-bg-subtle" : ""} ${className}`}
      style={{ padding: "var(--s-space-24) var(--s-space-6)" }}
    >
      <div
        className="mx-auto relative"
        style={{ maxWidth: narrow ? "960px" : "var(--s-content-max)" }}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      className="r-mono inline-flex items-center gap-2 mb-4"
      style={{
        fontSize: "12px",
        color: "var(--s-primary)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "var(--s-radius-full)",
          background: "var(--s-primary)",
          display: "inline-block",
          opacity: 0.6,
        }}
      />
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="r-balance"
      style={{
        fontFamily: "var(--s-font-display)",
        fontWeight: 600,
        fontSize: "clamp(28px, 4vw, 42px)",
        lineHeight: 1.15,
        letterSpacing: "-0.02em",
        color: "var(--s-text)",
        margin: "0 0 var(--s-space-4) 0",
      }}
    >
      {children}
    </h2>
  );
}

export function SectionDescription({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: "17px",
        lineHeight: 1.65,
        color: "var(--s-text-secondary)",
        maxWidth: "640px",
        margin: "0 0 var(--s-space-12) 0",
      }}
    >
      {children}
    </p>
  );
}
