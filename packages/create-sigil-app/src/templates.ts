export type TemplateId =
  | "minimal"
  | "ai-saas"
  | "dev-docs"
  | "dashboard"
  | "portfolio"
  | "ecommerce"
  | "blog"
  | "agency"
  | "cli-tool"
  | "startup";

export type TemplateDefinition = {
  value: TemplateId;
  label: string;
  description: string;
  defaultPreset: string;
  badge: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  metrics: readonly [string, string][];
  sections: readonly [string, string][];
};

export const TEMPLATES: readonly TemplateDefinition[] = [
  {
    value: "minimal",
    label: "Minimal",
    description: "Clean starting point — just Next.js + Sigil",
    defaultPreset: "sigil",
    badge: "Token-native starter",
    headline: "A Sigil app with the design layer already wired.",
    subheadline:
      "Start from one token file, one component system, and one agent-readable contract.",
    primaryCta: "Open the token file",
    secondaryCta: "Browse components",
    metrics: [
      ["1", "token source"],
      ["46", "preset identities"],
      ["200+", "components"],
    ],
    sections: [
      ["Token pipeline", "Preset CSS is imported once and every component reads from the same variables."],
      ["Agent-ready", "The generated .sigil/AGENTS.md tells coding agents where to make visual changes."],
      ["Owned source", "Add components as editable source without losing token-driven styling."],
    ],
  },
  {
    value: "ai-saas",
    label: "AI SaaS",
    description: "AI product landing with workflow cards, pricing, and conversion sections",
    defaultPreset: "sigil",
    badge: "AI SaaS template",
    headline: "Launch an AI product site without rebuilding the design system.",
    subheadline:
      "Hero, workflow proof, feature cards, pricing cues, and CTA structure generated from Sigil tokens.",
    primaryCta: "Start building",
    secondaryCta: "View workflow",
    metrics: [
      ["24ms", "agent loop"],
      ["3.4x", "faster launches"],
      ["99.9%", "workflow uptime"],
    ],
    sections: [
      ["Model orchestration", "Route prompts, tools, and evaluations through a single operational surface."],
      ["Trust layer", "Explainable logs, approvals, and audit trails are designed into the page from day one."],
      ["Upgrade path", "Swap from calm SaaS to cinematic dark by changing presets, not rewriting sections."],
    ],
  },
  {
    value: "dashboard",
    label: "Dashboard",
    description: "Analytics app shell with KPI cards, tables, and operational surfaces",
    defaultPreset: "cobalt",
    badge: "Dashboard template",
    headline: "A dense analytics surface that still has a visual identity.",
    subheadline:
      "Build admin panels from tokenized app shells, KPI grids, data cards, and action rows.",
    primaryCta: "Open dashboard",
    secondaryCta: "Inspect metrics",
    metrics: [
      ["12", "active views"],
      ["8.2k", "events/min"],
      ["4", "alerts"],
    ],
    sections: [
      ["Operational grid", "Cards, tables, and sidebars align to the same spacing and rail tokens."],
      ["Status clarity", "Success, warning, error, and info states are preset-controlled and consistent."],
      ["Dark-mode native", "Themed color tokens carry dashboard contrast across light and dark modes."],
    ],
  },
  {
    value: "dev-docs",
    label: "Developer Docs",
    description: "Documentation site with install blocks, API cards, and agent-readable structure",
    defaultPreset: "etch",
    badge: "Docs template",
    headline: "Docs that humans can scan and agents can parse.",
    subheadline:
      "Use Sigil tokens for code blocks, navigation, callouts, and copy-ready installation sections.",
    primaryCta: "Read the guide",
    secondaryCta: "Copy install",
    metrics: [
      ["5min", "setup"],
      ["12", "guides"],
      ["0", "theme drift"],
    ],
    sections: [
      ["Install-first IA", "Every path starts with concrete commands and component examples."],
      ["Agent docs", "Generated instructions and llms.txt give coding agents the same source of truth."],
      ["Code surfaces", "Code tokens control syntax, borders, padding, and selection states."],
    ],
  },
  {
    value: "portfolio",
    label: "Portfolio",
    description: "Personal or studio portfolio with project cards and narrative sections",
    defaultPreset: "noir",
    badge: "Portfolio template",
    headline: "Show the work with a system that does not look default.",
    subheadline:
      "A portfolio starter with project cells, capability sections, and restrained motion hooks.",
    primaryCta: "View projects",
    secondaryCta: "Contact",
    metrics: [
      ["18", "case studies"],
      ["6", "disciplines"],
      ["1", "clear voice"],
    ],
    sections: [
      ["Case-study grid", "Reusable cards keep projects visually coherent across wildly different work."],
      ["Editorial rhythm", "Typography tokens give your writing a point of view before custom design work."],
      ["Atmosphere", "Dark, editorial, and expressive presets change the portfolio mood instantly."],
    ],
  },
  {
    value: "ecommerce",
    label: "E-commerce",
    description: "Product catalog starter with merchandising, trust, and checkout sections",
    defaultPreset: "arc",
    badge: "Commerce template",
    headline: "A storefront where the brand is not trapped in the component defaults.",
    subheadline:
      "Tokenized product cards, category sections, value props, and checkout cues for fast storefront starts.",
    primaryCta: "Shop collection",
    secondaryCta: "See details",
    metrics: [
      ["42", "products"],
      ["2.1s", "browse path"],
      ["AA", "contrast target"],
    ],
    sections: [
      ["Product cards", "Image, price, badge, and CTA styles inherit from the active preset."],
      ["Trust details", "Delivery, returns, and support blocks stay consistent with the rest of the store."],
      ["Seasonal swaps", "Change a campaign aesthetic by shipping a preset instead of a redesign."],
    ],
  },
  {
    value: "blog",
    label: "Blog",
    description: "Editorial publication with article cards, categories, and subscription CTA",
    defaultPreset: "strata",
    badge: "Blog template",
    headline: "An editorial surface with design tokens behind every typographic decision.",
    subheadline:
      "Article lists, featured essays, tags, author notes, and subscription blocks tuned for reading.",
    primaryCta: "Read latest",
    secondaryCta: "Subscribe",
    metrics: [
      ["62ch", "prose width"],
      ["3", "content lanes"],
      ["7", "topics"],
    ],
    sections: [
      ["Readable defaults", "Prose width, heading rhythm, and code styling are all token-controlled."],
      ["Category system", "Badges and filters use the same status and accent tokens as the rest of Sigil."],
      ["Publisher feel", "Editorial presets make the same components feel like a magazine, not an app shell."],
    ],
  },
  {
    value: "agency",
    label: "Agency",
    description: "Studio landing page with services, proof, case studies, and inquiry CTA",
    defaultPreset: "onyx",
    badge: "Agency template",
    headline: "A studio site that starts with taste instead of a blank grid.",
    subheadline:
      "Positioning, service cards, proof points, and case-study architecture assembled from Sigil primitives.",
    primaryCta: "Plan a project",
    secondaryCta: "See work",
    metrics: [
      ["14", "launches"],
      ["4", "service lines"],
      ["30d", "prototype sprint"],
    ],
    sections: [
      ["Positioning system", "Service cards and proof points share visual language without feeling generic."],
      ["Case studies", "Use bento and gap-pixel grids to turn project evidence into a memorable surface."],
      ["Inquiry flow", "CTA and form components inherit the same token contract as the marketing page."],
    ],
  },
  {
    value: "cli-tool",
    label: "CLI Tool",
    description: "Developer tool site with terminal hero, command cards, and API sections",
    defaultPreset: "cipher",
    badge: "CLI template",
    headline: "A developer tool landing page built around commands, not screenshots.",
    subheadline:
      "Install blocks, terminal surfaces, feature specs, and changelog rows in a tokenized devtool frame.",
    primaryCta: "Install CLI",
    secondaryCta: "Read API",
    metrics: [
      ["1", "install command"],
      ["8", "core commands"],
      ["0", "CSS rewrites"],
    ],
    sections: [
      ["Terminal-first", "Mono labels, command blocks, and copy surfaces are controlled by code tokens."],
      ["Reference-ready", "Docs generation can describe installed components and active presets locally."],
      ["Agent-friendly", "The same artifacts work as human docs and machine-readable project context."],
    ],
  },
  {
    value: "startup",
    label: "Startup",
    description: "Launch page with waitlist, social proof, features, pricing, and FAQ sections",
    defaultPreset: "flux",
    badge: "Startup template",
    headline: "Ship the first version with a real design direction already in place.",
    subheadline:
      "A fast launch scaffold for waitlists, early customers, feature proof, pricing, and investor-friendly polish.",
    primaryCta: "Join waitlist",
    secondaryCta: "See roadmap",
    metrics: [
      ["10x", "site velocity"],
      ["5", "launch sections"],
      ["1", "token file"],
    ],
    sections: [
      ["Waitlist-ready", "CTA, form, proof, and FAQ blocks are arranged for fast launch iteration."],
      ["Preset proof", "Run one command to test how the same startup page feels in different categories."],
      ["No rewrite cliff", "The starter is source-owned, token-driven, and ready for real product code."],
    ],
  },
] as const;

export function getTemplate(value: string | undefined): TemplateDefinition {
  return TEMPLATES.find((template) => template.value === value) ?? TEMPLATES[0];
}

export function generateTemplatePage(template: TemplateDefinition): string {
  const metrics = JSON.stringify(template.metrics, null, 2);
  const sections = JSON.stringify(template.sections, null, 2);

  return `import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  GapPixelCell,
  GapPixelGrid,
} from "@sigil-ui/components";

const metrics: Array<[string, string]> = ${metrics};

const sections: Array<[string, string]> = ${sections};

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--s-background)] text-[var(--s-text)]">
      <section className="mx-auto flex min-h-screen w-full max-w-[var(--s-content-max,1200px)] flex-col px-6 py-8">
        <nav className="flex items-center justify-between border-b border-[var(--s-border)] pb-4">
          <div className="font-[family-name:var(--s-font-display)] text-sm font-semibold tracking-tight">
            Sigil / ${template.label}
          </div>
          <div className="hidden items-center gap-5 text-xs font-medium text-[var(--s-text-muted)] sm:flex">
            <a href="#system" className="transition-colors hover:text-[var(--s-text)]">System</a>
            <a href="#proof" className="transition-colors hover:text-[var(--s-text)]">Proof</a>
            <a href="#ship" className="transition-colors hover:text-[var(--s-text)]">Ship</a>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge variant="outline" className="mb-5">
              ${template.badge}
            </Badge>
            <h1 className="max-w-3xl text-balance font-[family-name:var(--s-font-display)] text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.06em]">
              ${template.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[var(--s-text-muted)] sm:text-lg">
              ${template.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg">${template.primaryCta}</Button>
              <Button variant="outline" size="lg">${template.secondaryCta}</Button>
            </div>
          </div>

          <Card hoverable className="overflow-hidden">
            <CardHeader>
              <CardTitle>Token surface</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-px overflow-hidden rounded-[var(--s-radius-card,8px)] border border-[var(--s-border)] bg-[var(--s-border)]">
                {metrics.map(([value, label]) => (
                  <div key={label} className="flex items-end justify-between bg-[var(--s-surface)] p-5">
                    <span className="font-[family-name:var(--s-font-mono)] text-2xl font-semibold tabular-nums">
                      {value}
                    </span>
                    <span className="text-xs uppercase tracking-[0.16em] text-[var(--s-text-muted)]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="system" className="border-t border-[var(--s-border)] px-6 py-16">
        <div className="mx-auto max-w-[var(--s-content-max,1200px)]">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="font-[family-name:var(--s-font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--s-primary)]">
                Template architecture
              </p>
              <h2 className="mt-3 max-w-2xl text-balance font-[family-name:var(--s-font-display)] text-3xl font-semibold tracking-tight">
                Same structure. Different identity when the preset changes.
              </h2>
            </div>
          </div>

          <GapPixelGrid columns={{ md: 3 }}>
            {sections.map(([title, body]) => (
              <GapPixelCell key={title} className="p-6">
                <h3 className="font-[family-name:var(--s-font-display)] text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--s-text-muted)]">
                  {body}
                </p>
              </GapPixelCell>
            ))}
          </GapPixelGrid>
        </div>
      </section>

      <section id="ship" className="border-t border-[var(--s-border)] px-6 py-12">
        <div className="mx-auto flex max-w-[var(--s-content-max,1200px)] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-[family-name:var(--s-font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--s-text-muted)]">
              Next step
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--s-text-muted)]">
              Edit <code className="text-[var(--s-text)]">src/styles/sigil.tokens.css</code> or run <code className="text-[var(--s-text)]">npx @sigil-ui/cli preset list</code> to change the whole visual identity.
            </p>
          </div>
          <Button variant="secondary">Keep building</Button>
        </div>
      </section>
    </main>
  );
}
`;
}
