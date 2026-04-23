"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { SigilFrame } from "@/components/landing/sigil-frame";
import { TechFrame } from "@/components/landing/tech-frame";

import { SigilSection, SectionDivider, Badge } from "@sigil-ui/components";
import { ArrowUpRight } from "lucide-react";

const DEMOS = [
  { num: "01", name: "AI SaaS Landing", slug: "ai-saas", preset: "sigil", description: "Modern AI product landing with gradient hero, feature grid, and pricing tiers." },
  { num: "02", name: "Dashboard", slug: "dashboard", preset: "cobalt", description: "Analytics dashboard with KPIs, charts, sidebar navigation, and data tables." },
  { num: "03", name: "E-commerce", slug: "ecommerce", preset: "kova", description: "Product catalog with filters, cart, checkout flow, and order tracking." },
  { num: "04", name: "Developer Docs", slug: "dev-docs", preset: "etch", description: "Documentation site with sidebar nav, code blocks, and API reference." },
  { num: "05", name: "Startup", slug: "startup", preset: "flux", description: "Startup landing page with hero, testimonials, and CTA sections." },
  { num: "06", name: "Portfolio", slug: "portfolio", preset: "noir", description: "Creative portfolio with project grid, about section, and contact form." },
  { num: "07", name: "Blog", slug: "blog", preset: "strata", description: "Editorial blog with article grid, categories, and reading progress." },
  { num: "08", name: "Agency", slug: "agency", preset: "onyx", description: "Agency site with case studies, team section, and service offerings." },
  { num: "09", name: "CLI Tool", slug: "cli-tool", preset: "cipher", description: "Developer tool landing with terminal demo, installation guide, and API docs." },
  { num: "10", name: "Playground", slug: "playground", preset: "dsgn", description: "Interactive sandbox with drag-and-drop canvas and live code editing." },
  { num: "11", name: "Linear Clone", slug: "linear-clone", preset: "onyx", description: "Dark B2B SaaS landing inspired by Linear. Hero, logo cloud, bento grid, and cinematic CTA." },
  { num: "12", name: "Vercel Clone", slug: "vercel-clone", preset: "crux", description: "Developer platform marketing inspired by Vercel. Clean hero, feature rows, stats, and split CTA." },
  { num: "13", name: "Dedalus Clone", slug: "dedalus-clone", preset: "basalt", description: "Dark developer tool landing inspired by Dedalus. Purple accent, install command, FAQ, and code tabs." },
  { num: "14", name: "VoidZero Clone", slug: "voidzero-clone", preset: "prism", description: "Open source tooling site inspired by VoidZero. Gradient banner, accent headlines, and ecosystem diagram." },
  { num: "15", name: "Oxide Clone", slug: "oxide-clone", preset: "forge", description: "Industrial hardware site inspired by Oxide. Green accent, terminal hero, monospace throughout." },
  { num: "16", name: "Vite Clone", slug: "vite-clone", preset: "helix", description: "Build tool landing inspired by Vite. Tabbed install, logo cloud, feature cards, and dark theme." },
  { num: "17", name: "VitePlus Clone", slug: "viteplus-clone", preset: "arc", description: "Unified toolchain site inspired by VitePlus. Light theme, terminal demo, install section, workflow tabs." },
];

export default function DemosPage() {
  return (
    <SigilFrame>
      <LandingNavbar />

      <SigilSection borderTop padding="96px 24px 48px">
        <div className="mb-12">
          <span className="font-[family-name:var(--s-font-mono)] text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--s-primary)] block mb-4">
            / Demos
          </span>

          <h1 className="font-[family-name:var(--s-font-display)] font-bold text-[clamp(32px,5vw,56px)] leading-[1.08] tracking-[-0.03em] text-[var(--s-text)] mb-4 max-w-3xl">
            17 Production Templates.
          </h1>

          <p className="font-[family-name:var(--s-font-mono)] text-sm leading-relaxed text-[var(--s-text-secondary)] mb-6 max-w-[528px]">
            Real sites built with Sigil. Each uses a different preset and demonstrates
            how token-driven components adapt to any visual identity.
          </p>
        </div>
      </SigilSection>

      <SectionDivider pattern="grid" size="sm" />

      <SigilSection>
        <TechFrame variant="brackets" extend={12} opacity={0.2} padding={8}>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(288px, 1fr))" }}>
            {DEMOS.map((demo) => (
              <a
                key={demo.slug}
                href={`/demos/${demo.slug}`}
                className="group flex flex-col gap-3 p-6 no-underline text-inherit transition-all duration-200"
                style={{
                  border: "1px solid var(--s-border-muted)",
                  background: "var(--s-surface)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--s-border-strong)";
                  e.currentTarget.style.background = "var(--s-surface-elevated)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--s-border-muted)";
                  e.currentTarget.style.background = "var(--s-surface)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-[family-name:var(--s-font-mono)] text-2xl font-bold text-[var(--s-text-subtle)] tabular-nums tracking-[-0.02em]">
                    {demo.num}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-[var(--s-text-muted)] group-hover:text-[var(--s-primary)] transition-colors"
                  />
                </div>

                <div>
                  <span className="font-[family-name:var(--s-font-display)] text-base font-bold text-[var(--s-text)] block mb-1">
                    {demo.name}
                  </span>
                  <p className="font-[family-name:var(--s-font-mono)] text-[11px] leading-relaxed text-[var(--s-text-muted)] m-0">
                    {demo.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-auto pt-2" style={{ borderTop: "1px solid var(--s-border-muted)" }}>
                  <Badge size="sm" variant="outline">{demo.preset}</Badge>
                  <span className="font-[family-name:var(--s-font-mono)] text-[10px] text-[var(--s-text-subtle)]">
                    {demo.slug}.sigil-ui.dev
                  </span>
                </div>
              </a>
            ))}
          </div>
        </TechFrame>
      </SigilSection>

      <LandingFooter />
    </SigilFrame>
  );
}
