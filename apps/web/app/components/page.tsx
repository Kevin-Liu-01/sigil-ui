"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { SigilFrame } from "@/components/landing/sigil-frame";
import { ComponentShowcase } from "@/components/landing/component-showcase";
import { TechFrame } from "@/components/landing/tech-frame";

import { SigilSection, SectionDivider } from "@sigil-ui/components";

export default function ComponentsPage() {
  return (
    <SigilFrame>
      <LandingNavbar />

      <SigilSection borderTop padding="96px 24px 48px">
        <div className="mb-12">
          <span className="font-[family-name:var(--s-font-mono)] text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--s-primary)] block mb-4">
            / Components
          </span>

          <h1 className="font-[family-name:var(--s-font-display)] font-bold text-[clamp(32px,5vw,56px)] leading-[1.08] tracking-[-0.03em] text-[var(--s-text)] mb-4 max-w-3xl">
            100+ Token-Driven Components.
          </h1>

          <p className="font-[family-name:var(--s-font-mono)] text-sm leading-relaxed text-[var(--s-text-secondary)] mb-6 max-w-[528px]">
            Every component reads from <code className="text-[var(--s-primary)]">var(--s-*)</code> tokens.
            Switch presets and the entire library updates instantly. No prop drilling, no theme objects.
          </p>

          <div className="flex gap-3">
            <a
              href="/docs/components/button"
              className="inline-flex items-center px-5 py-2.5 bg-[var(--s-primary)] text-[var(--s-primary-contrast,#fff)] font-[family-name:var(--s-font-mono)] text-[13px] font-semibold border border-[var(--s-primary)] no-underline transition-all duration-[var(--s-duration-fast,200ms)] hover:brightness-110"
            >
              View Docs
            </a>
            <a
              href="/sandbox"
              className="inline-flex items-center px-5 py-2.5 bg-transparent text-[var(--s-text)] font-[family-name:var(--s-font-mono)] text-[13px] font-medium border border-[var(--s-border)] no-underline transition-all duration-[var(--s-duration-fast,200ms)] hover:bg-[var(--s-surface)]"
            >
              Open Sandbox
            </a>
          </div>
        </div>
      </SigilSection>

      <SectionDivider pattern="crosshatch" size="sm" />

      <SigilSection>
        <TechFrame variant="overshoot" extend={16} opacity={0.2} padding={16}>
          <ComponentShowcase />
        </TechFrame>
      </SigilSection>

      <LandingFooter />
    </SigilFrame>
  );
}
