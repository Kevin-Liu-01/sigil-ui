"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Badge,
  Input,
  KPI,
  Separator,
  Progress,
  Avatar,
  Switch,
  LoadingSpinner,
  Label,
  Checkbox,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Terminal,
} from "@sigil-ui/components";

/* -------------------------------------------------------------------------- */
/*  Preset color palettes                                                      */
/* -------------------------------------------------------------------------- */

type PresetColors = {
  bg: string;
  surface: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
};

const presets: Record<string, PresetColors> = {
  sigil: {
    bg: "oklch(0.13 0.02 260)",
    surface: "oklch(0.17 0.02 260)",
    primary: "oklch(0.72 0.19 250)",
    text: "oklch(0.95 0.01 260)",
    textSecondary: "oklch(0.65 0.02 260)",
    border: "oklch(0.25 0.02 260)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  cobalt: {
    bg: "oklch(0.14 0.03 250)",
    surface: "oklch(0.18 0.03 250)",
    primary: "oklch(0.68 0.16 245)",
    text: "oklch(0.94 0.01 250)",
    textSecondary: "oklch(0.62 0.03 250)",
    border: "oklch(0.26 0.03 250)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  kova: {
    bg: "oklch(0.98 0.005 80)",
    surface: "oklch(1.0 0 0)",
    primary: "oklch(0.55 0.15 150)",
    text: "oklch(0.15 0.01 80)",
    textSecondary: "oklch(0.45 0.02 80)",
    border: "oklch(0.88 0.01 80)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  etch: {
    bg: "oklch(0.97 0.005 60)",
    surface: "oklch(1.0 0 0)",
    primary: "oklch(0.45 0.12 30)",
    text: "oklch(0.18 0.01 60)",
    textSecondary: "oklch(0.50 0.02 60)",
    border: "oklch(0.85 0.01 60)",
    fontDisplay: "'Playfair Display', Georgia, serif",
    fontBody: "'Source Serif 4', Georgia, serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  shard: {
    bg: "oklch(0.12 0.04 300)",
    surface: "oklch(0.16 0.04 300)",
    primary: "oklch(0.75 0.22 330)",
    text: "oklch(0.95 0.01 300)",
    textSecondary: "oklch(0.65 0.03 300)",
    border: "oklch(0.24 0.04 300)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  noir: {
    bg: "oklch(0.10 0 0)",
    surface: "oklch(0.14 0 0)",
    primary: "oklch(0.85 0 0)",
    text: "oklch(0.92 0 0)",
    textSecondary: "oklch(0.55 0 0)",
    border: "oklch(0.22 0 0)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  rune: {
    bg: "oklch(0.96 0.008 50)",
    surface: "oklch(1.0 0 0)",
    primary: "oklch(0.42 0.10 25)",
    text: "oklch(0.20 0.01 50)",
    textSecondary: "oklch(0.50 0.02 50)",
    border: "oklch(0.86 0.01 50)",
    fontDisplay: "'Playfair Display', Georgia, serif",
    fontBody: "'Lora', Georgia, serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  forge: {
    bg: "oklch(0.15 0.01 70)",
    surface: "oklch(0.19 0.01 70)",
    primary: "oklch(0.72 0.14 70)",
    text: "oklch(0.92 0.01 70)",
    textSecondary: "oklch(0.60 0.02 70)",
    border: "oklch(0.28 0.01 70)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  cipher: {
    bg: "oklch(0.08 0.02 160)",
    surface: "oklch(0.12 0.02 160)",
    primary: "oklch(0.78 0.18 160)",
    text: "oklch(0.78 0.18 160)",
    textSecondary: "oklch(0.50 0.06 160)",
    border: "oklch(0.18 0.02 160)",
    fontDisplay: "'JetBrains Mono', monospace",
    fontBody: "'JetBrains Mono', monospace",
    fontMono: "'JetBrains Mono', monospace",
  },
};

/* -------------------------------------------------------------------------- */
/*  Demo registry                                                              */
/* -------------------------------------------------------------------------- */

type DemoEntry = {
  title: string;
  description: string;
  preset: PresetColors;
};

const DEMOS: Record<string, DemoEntry> = {
  "ai-saas": {
    title: "AI SaaS",
    description: "Developer-facing cloud product with pricing tiers and technical hero.",
    preset: presets.sigil,
  },
  dashboard: {
    title: "Dashboard",
    description: "Analytics dashboard with KPIs, tables, and sidebar navigation.",
    preset: presets.cobalt,
  },
  ecommerce: {
    title: "E-Commerce",
    description: "Product catalog with search, cart, and product grid.",
    preset: presets.kova,
  },
  "dev-docs": {
    title: "Dev Docs",
    description: "Developer documentation with sidebar, code blocks, and monospace typography.",
    preset: presets.etch,
  },
  startup: {
    title: "Startup",
    description: "Bold full-bleed startup landing page with stats.",
    preset: presets.shard,
  },
  portfolio: {
    title: "Portfolio",
    description: "Dark, dramatic project portfolio with gradient cards.",
    preset: presets.noir,
  },
  blog: {
    title: "Blog",
    description: "Editorial blog with serif typography and article list.",
    preset: presets.rune,
  },
  agency: {
    title: "Agency",
    description: "Creative agency site with case studies and contact form.",
    preset: presets.forge,
  },
  "cli-tool": {
    title: "CLI Tool",
    description: "Terminal-first product page with green-on-black aesthetic.",
    preset: presets.cipher,
  },
  playground: {
    title: "Playground",
    description: "Tabbed component showcase across all categories.",
    preset: presets.sigil,
  },
};

const SLUGS = Object.keys(DEMOS);

/* -------------------------------------------------------------------------- */
/*  Root page component                                                        */
/* -------------------------------------------------------------------------- */

export default function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const demo = DEMOS[slug];
  if (!demo) notFound();

  const p = demo.preset;
  const vars = {
    "--s-background": p.bg,
    "--s-surface": p.surface,
    "--s-primary": p.primary,
    "--s-text": p.text,
    "--s-text-secondary": p.textSecondary,
    "--s-text-muted": p.textSecondary,
    "--s-border": p.border,
    "--s-border-muted": p.border,
    "--s-font-display": p.fontDisplay,
    "--s-font-body": p.fontBody,
    "--s-font-mono": p.fontMono,
    "--s-success": "oklch(0.72 0.19 155)",
    "--s-error": "oklch(0.65 0.22 25)",
    "--s-shadow-sm": "0 1px 2px oklch(0 0 0 / 0.15)",
    "--s-shadow-md": "0 4px 12px oklch(0 0 0 / 0.2)",
    "--s-card-radius": "8px",
    "--s-radius-md": "6px",
    "--s-radius-sm": "4px",
  } as React.CSSProperties;

  return (
    <div
      style={{
        ...vars,
        background: p.bg,
        color: p.text,
        minHeight: "100vh",
        fontFamily: p.fontBody,
      }}
    >
      <DemoContent slug={slug} demo={demo} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Demo router                                                                */
/* -------------------------------------------------------------------------- */

function DemoContent({ slug, demo }: { slug: string; demo: DemoEntry }) {
  const back = (
    <a
      href="/demos"
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        zIndex: 50,
        fontSize: 13,
        fontFamily: "var(--s-font-mono)",
        color: "var(--s-text-muted)",
        textDecoration: "none",
        background: "var(--s-surface)",
        border: "1px solid var(--s-border)",
        borderRadius: 6,
        padding: "6px 12px",
      }}
    >
      ← Demos
    </a>
  );

  switch (slug) {
    case "ai-saas":
      return <>{back}<AISaasDemo /></>;
    case "dashboard":
      return <>{back}<DashboardDemo /></>;
    case "ecommerce":
      return <>{back}<EcommerceDemo /></>;
    case "dev-docs":
      return <>{back}<DevDocsDemo /></>;
    case "startup":
      return <>{back}<StartupDemo /></>;
    case "portfolio":
      return <>{back}<PortfolioDemo /></>;
    case "blog":
      return <>{back}<BlogDemo /></>;
    case "agency":
      return <>{back}<AgencyDemo /></>;
    case "cli-tool":
      return <>{back}<CliToolDemo /></>;
    case "playground":
      return <>{back}<PlaygroundDemo /></>;
    default:
      notFound();
  }
}

/* -------------------------------------------------------------------------- */
/*  1. AI SaaS (sigil)                                                         */
/* -------------------------------------------------------------------------- */

function AISaasDemo() {
  return (
    <div>
      {/* Navbar */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", borderBottom: "1px solid var(--s-border)" }}>
        <span style={{ fontFamily: "var(--s-font-display)", fontWeight: 700, fontSize: 18 }}>Sigil SaaS</span>
        <div style={{ display: "flex", gap: 24, fontSize: 14 }}>
          <a href="#pricing" style={{ color: "var(--s-text-secondary)", textDecoration: "none" }}>Pricing</a>
          <a href="#" style={{ color: "var(--s-text-secondary)", textDecoration: "none" }}>Docs</a>
          <a href="#" style={{ color: "var(--s-text-secondary)", textDecoration: "none" }}>Login</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "100px 24px 80px", maxWidth: 720, margin: "0 auto" }}>
        <Badge>Now in Public Beta</Badge>
        <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: 56, fontWeight: 800, lineHeight: 1.1, marginTop: 16 }}>
          Full Linux in 50ms
        </h1>
        <p style={{ fontSize: 18, color: "var(--s-text-secondary)", marginTop: 16, lineHeight: 1.6 }}>
          Instant cloud sandboxes for AI agents. Spin up, execute, tear down — faster than a cold function.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32 }}>
          <Button>Start Building</Button>
          <Button variant="outline">Read Docs</Button>
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section style={{ padding: "64px 24px", maxWidth: 960, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
          Built for Speed
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <KPI label="Cold Start" value="50ms" change="10x faster" trend="up" />
          <KPI label="Uptime" value="99.99%" change="+0.02% MoM" trend="up" />
          <KPI label="Idle Cost" value="$0" change="Pay per use" trend="neutral" />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: "64px 24px", maxWidth: 960, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
          Simple Pricing
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { name: "Starter", price: "$20", features: ["10k executions/mo", "1 GB RAM", "Community support"] },
            { name: "Pro", price: "$50", features: ["100k executions/mo", "4 GB RAM", "Priority support", "Custom domains"] },
            { name: "Enterprise", price: "Custom", features: ["Unlimited", "Dedicated infra", "SLA", "SSO + SAML"] },
          ].map((tier) => (
            <Card key={tier.name} hoverable>
              <CardHeader>
                <CardDescription>{tier.name}</CardDescription>
                <CardTitle style={{ fontSize: 36 }}>{tier.price}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {tier.features.map((f) => (
                    <li key={f} style={{ fontSize: 14, color: "var(--s-text-secondary)" }}>✓ {f}</li>
                  ))}
                </ul>
                <Button variant="outline" style={{ width: "100%", marginTop: 24 }}>
                  {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--s-border)", padding: "32px 24px", textAlign: "center", fontSize: 13, color: "var(--s-text-muted)" }}>
        © 2026 Sigil SaaS · Built with Sigil UI
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Dashboard (cobalt)                                                      */
/* -------------------------------------------------------------------------- */

function DashboardDemo() {
  const navItems = ["Overview", "Analytics", "Customers", "Settings"];
  const tableRows = [
    { id: "INV-001", customer: "Alice Zhang", amount: "$1,240", status: "Paid", date: "Apr 22" },
    { id: "INV-002", customer: "Bob Chen", amount: "$890", status: "Pending", date: "Apr 21" },
    { id: "INV-003", customer: "Carol Voss", amount: "$3,100", status: "Paid", date: "Apr 20" },
    { id: "INV-004", customer: "Dan Kim", amount: "$540", status: "Overdue", date: "Apr 19" },
    { id: "INV-005", customer: "Eve Park", amount: "$2,200", status: "Paid", date: "Apr 18" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, borderRight: "1px solid var(--s-border)", padding: "24px 16px", flexShrink: 0 }}>
        <div style={{ fontFamily: "var(--s-font-display)", fontWeight: 700, fontSize: 16, marginBottom: 32 }}>Dashboard</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map((item, i) => (
            <div
              key={item}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                fontSize: 14,
                cursor: "pointer",
                background: i === 0 ? "var(--s-primary)" : "transparent",
                color: i === 0 ? "var(--s-background)" : "var(--s-text-secondary)",
              }}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: 32 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: 24, fontWeight: 700 }}>Analytics Overview</h1>
          <Badge variant="outline">Last 30 days</Badge>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          <KPI label="Users" value="2,847" change="+12.5%" trend="up" />
          <KPI label="Revenue" value="$4.2k" change="+8.1%" trend="up" />
          <KPI label="Sessions" value="12.4k" change="+3.2%" trend="up" />
          <KPI label="Bounce Rate" value="24%" change="-2.1%" trend="down" />
        </div>

        {/* Chart placeholder */}
        <Card style={{ marginBottom: 32 }}>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly recurring revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: 180, display: "flex", alignItems: "flex-end", gap: 8, padding: "0 16px" }}>
              {[40, 55, 48, 72, 65, 80, 90, 85, 95, 88, 92, 100].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    background: "var(--s-primary)",
                    borderRadius: "4px 4px 0 0",
                    opacity: 0.6 + (h / 250),
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--s-border)" }}>
                    {["Invoice", "Customer", "Amount", "Status", "Date"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontWeight: 600, color: "var(--s-text-muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.id} style={{ borderBottom: "1px solid var(--s-border)" }}>
                      <td style={{ padding: "10px 12px", fontFamily: "var(--s-font-mono)", fontSize: 13 }}>{row.id}</td>
                      <td style={{ padding: "10px 12px" }}>{row.customer}</td>
                      <td style={{ padding: "10px 12px", fontFamily: "var(--s-font-mono)" }}>{row.amount}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <Badge variant={row.status === "Overdue" ? "destructive" : row.status === "Pending" ? "outline" : "default"}>
                          {row.status}
                        </Badge>
                      </td>
                      <td style={{ padding: "10px 12px", color: "var(--s-text-muted)" }}>{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. E-Commerce (kova)                                                       */
/* -------------------------------------------------------------------------- */

function EcommerceDemo() {
  const products = [
    { name: "Alpine Jacket", price: "$189", category: "Outerwear", color: "oklch(0.65 0.08 200)" },
    { name: "Trail Runner Pro", price: "$145", category: "Footwear", color: "oklch(0.55 0.12 150)" },
    { name: "Summit Pack 40L", price: "$120", category: "Bags", color: "oklch(0.60 0.06 70)" },
    { name: "Base Layer Merino", price: "$78", category: "Apparel", color: "oklch(0.50 0.10 280)" },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", borderBottom: "1px solid var(--s-border)" }}>
        <span style={{ fontFamily: "var(--s-font-display)", fontWeight: 700, fontSize: 20 }}>Shop</span>
        <div style={{ flex: 1, maxWidth: 400, margin: "0 32px" }}>
          <Input placeholder="Search products…" />
        </div>
        <Button variant="outline" size="sm">Cart (0)</Button>
      </nav>

      {/* Products */}
      <section style={{ padding: "48px 32px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: 28, fontWeight: 700 }}>All Products</h1>
          <Badge variant="outline">{products.length} items</Badge>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {products.map((product) => (
            <Card key={product.name} hoverable>
              <div
                style={{
                  aspectRatio: "4/3",
                  background: product.color,
                  borderRadius: "8px 8px 0 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 48, opacity: 0.3 }}>◇</span>
              </div>
              <CardHeader>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Badge variant="outline" style={{ fontSize: 11 }}>{product.category}</Badge>
                  <span style={{ fontFamily: "var(--s-font-mono)", fontWeight: 600 }}>{product.price}</span>
                </div>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button style={{ width: "100%" }}>Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Dev Docs (etch)                                                         */
/* -------------------------------------------------------------------------- */

function DevDocsDemo() {
  const sidebarItems = ["Getting Started", "Installation", "API Reference", "Components", "Tokens", "Presets", "CLI", "Changelog"];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: 240, borderRight: "1px solid var(--s-border)", padding: "24px 16px", flexShrink: 0 }}>
        <div style={{ fontFamily: "var(--s-font-display)", fontWeight: 700, fontSize: 16, marginBottom: 32 }}>Sigil Docs</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sidebarItems.map((item, i) => (
            <div
              key={item}
              style={{
                padding: "6px 12px",
                borderRadius: 4,
                fontSize: 14,
                fontFamily: i === 0 ? "var(--s-font-body)" : "var(--s-font-body)",
                cursor: "pointer",
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? "var(--s-primary)" : "var(--s-text-secondary)",
              }}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: "48px 64px", maxWidth: 720 }}>
        <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: 36, fontWeight: 700, marginBottom: 8 }}>Getting Started</h1>
        <p style={{ color: "var(--s-text-secondary)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Sigil is a token-driven design system. Install it, pick a preset, and start building.
        </p>

        <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Installation</h2>
        <Terminal
          title="terminal"
          lines={[
            "npx create-sigil-app my-app",
            "cd my-app",
            "npx sigil preset cobalt",
            "npm run dev",
          ]}
          showLineNumbers={false}
        />

        <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: 22, fontWeight: 600, marginTop: 40, marginBottom: 12 }}>Configuration</h2>
        <p style={{ color: "var(--s-text-secondary)", fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
          After init, Sigil creates a <code style={{ fontFamily: "var(--s-font-mono)", fontSize: 13, padding: "2px 6px", background: "var(--s-surface)", borderRadius: 4 }}>sigil.tokens.md</code> file
          in your project root. Edit this file to customize any of the 259 token fields.
        </p>
        <Terminal
          title="sigil.tokens.md"
          lines={[
            "# Colors",
            "primary: oklch(0.68 0.16 245)",
            "background: oklch(0.14 0.03 250)",
            "",
            "# Typography",
            "font-display: Inter",
            "font-body: Inter",
          ]}
          showLineNumbers
        />

        <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: 22, fontWeight: 600, marginTop: 40, marginBottom: 12 }}>Next Steps</h2>
        <ul style={{ color: "var(--s-text-secondary)", fontSize: 15, lineHeight: 2, paddingLeft: 20 }}>
          <li>Browse the <strong>Components</strong> to see what's available</li>
          <li>Try <code style={{ fontFamily: "var(--s-font-mono)", fontSize: 13, padding: "2px 6px", background: "var(--s-surface)", borderRadius: 4 }}>sigil preset list</code> to explore presets</li>
          <li>Read the <strong>Token</strong> reference for full customization</li>
        </ul>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. Startup (shard)                                                         */
/* -------------------------------------------------------------------------- */

function StartupDemo() {
  return (
    <div>
      {/* Hero */}
      <section style={{ textAlign: "center", padding: "140px 24px 100px", maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: 80, fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.03em" }}>
          Move fast.
        </h1>
        <p style={{ fontSize: 20, color: "var(--s-text-secondary)", marginTop: 24, lineHeight: 1.6, maxWidth: 520, margin: "24px auto 0" }}>
          Ship products that feel like magic. Sigil handles the design system so you can focus on what matters.
        </p>
        <Button style={{ marginTop: 40, fontSize: 16, padding: "12px 32px" }}>Get Early Access</Button>
      </section>

      {/* Stats */}
      <section style={{ padding: "64px 24px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, textAlign: "center" }}>
          {[
            { value: "259", label: "Configurable tokens" },
            { value: "31", label: "Curated presets" },
            { value: "65+", label: "Components" },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontFamily: "var(--s-font-display)", fontSize: 56, fontWeight: 800, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 14, color: "var(--s-text-secondary)", marginTop: 8 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section style={{ textAlign: "center", padding: "80px 24px" }}>
        <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: 36, fontWeight: 700 }}>Ready to ship?</h2>
        <p style={{ color: "var(--s-text-secondary)", marginTop: 12, fontSize: 16 }}>Join the waitlist. First 100 teams get lifetime access.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, maxWidth: 400, margin: "32px auto 0" }}>
          <Input placeholder="you@company.com" style={{ flex: 1 }} />
          <Button>Join</Button>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. Portfolio (noir)                                                        */
/* -------------------------------------------------------------------------- */

function PortfolioDemo() {
  const projects = [
    { title: "Neon Grid", desc: "Real-time data visualization for energy markets", gradient: "linear-gradient(135deg, oklch(0.3 0.1 250), oklch(0.15 0.05 300))" },
    { title: "Void OS", desc: "Minimal operating system interface concept", gradient: "linear-gradient(135deg, oklch(0.25 0.08 200), oklch(0.12 0.04 240))" },
    { title: "Cipher", desc: "End-to-end encrypted messaging platform", gradient: "linear-gradient(135deg, oklch(0.3 0.06 160), oklch(0.15 0.03 180))" },
    { title: "Arclight", desc: "Photography portfolio with AI-powered curation", gradient: "linear-gradient(135deg, oklch(0.35 0.12 30), oklch(0.18 0.06 50))" },
    { title: "Tessera", desc: "Generative art marketplace on Ethereum", gradient: "linear-gradient(135deg, oklch(0.3 0.1 300), oklch(0.15 0.05 330))" },
    { title: "Strand", desc: "DNA sequencing dashboard for biotech researchers", gradient: "linear-gradient(135deg, oklch(0.3 0.12 150), oklch(0.15 0.06 170))" },
  ];

  return (
    <div style={{ padding: "80px 32px", maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: 48, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
        Selected Work
      </h1>
      <p style={{ color: "var(--s-text-secondary)", fontSize: 16, marginBottom: 48 }}>
        Design engineering across product, brand, and systems.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
        {projects.map((project) => (
          <Card key={project.title} hoverable style={{ overflow: "hidden", cursor: "pointer" }}>
            <div style={{ height: 200, background: project.gradient }} />
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Separator style={{ margin: "64px 0 48px" }} />

      <section>
        <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: 28, fontWeight: 700, marginBottom: 16 }}>About</h2>
        <p style={{ color: "var(--s-text-secondary)", lineHeight: 1.8, maxWidth: 600 }}>
          Design engineer focused on interfaces that feel inevitable.
          Currently building Sigil UI — a token-driven design system where
          one file controls everything.
        </p>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  7. Blog (rune)                                                             */
/* -------------------------------------------------------------------------- */

function BlogDemo() {
  const articles = [
    {
      date: "April 22, 2026",
      title: "The Death of Theme Toggles",
      excerpt: "Why switching between light and dark isn't enough. Presets change typography, spacing, motion, and personality — not just colors.",
    },
    {
      date: "April 18, 2026",
      title: "Token-Driven Design at Scale",
      excerpt: "How a single markdown file replaced 40+ design token JSON files across our monorepo. The migration story from scattered variables to one source of truth.",
    },
    {
      date: "April 14, 2026",
      title: "Agents Don't Need Design Systems. They Need Token Specs.",
      excerpt: "An LLM can't reason about a Figma file. But give it a typed, documented token spec and it builds consistent UI on the first try.",
    },
  ];

  return (
    <div style={{ padding: "80px 24px", maxWidth: 640, margin: "0 auto" }}>
      <header style={{ marginBottom: 64 }}>
        <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: 44, fontWeight: 700, lineHeight: 1.1 }}>Journal</h1>
        <p style={{ color: "var(--s-text-secondary)", marginTop: 12, fontSize: 16, fontFamily: "var(--s-font-body)", fontStyle: "italic" }}>
          Thoughts on design systems, token architecture, and building for agents.
        </p>
      </header>

      {articles.map((article) => (
        <article key={article.title} style={{ marginBottom: 48, paddingBottom: 48, borderBottom: "1px solid var(--s-border)" }}>
          <time style={{ fontFamily: "var(--s-font-mono)", fontSize: 12, color: "var(--s-text-muted)", letterSpacing: "0.04em" }}>
            {article.date}
          </time>
          <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: 28, fontWeight: 600, marginTop: 8, lineHeight: 1.2 }}>
            {article.title}
          </h2>
          <p style={{ color: "var(--s-text-secondary)", marginTop: 12, lineHeight: 1.7, fontFamily: "var(--s-font-body)" }}>
            {article.excerpt}
          </p>
          <a href="#" style={{ color: "var(--s-primary)", fontSize: 14, marginTop: 12, display: "inline-block", textDecoration: "none" }}>
            Read more →
          </a>
        </article>
      ))}

      <section style={{ marginTop: 32, padding: 24, background: "var(--s-surface)", borderRadius: 8, border: "1px solid var(--s-border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar fallback="KL" size="md" />
          <div>
            <div style={{ fontWeight: 600 }}>Kevin Liu</div>
            <div style={{ fontSize: 13, color: "var(--s-text-muted)" }}>Design engineer building Sigil UI</div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  8. Agency (forge)                                                          */
/* -------------------------------------------------------------------------- */

function AgencyDemo() {
  const caseStudies = [
    { title: "NovaPay Rebrand", tag: "Fintech", desc: "Complete visual identity overhaul for a Series B payments startup." },
    { title: "Helios Dashboard", tag: "SaaS", desc: "Analytics platform serving 50k daily active users across 12 markets." },
    { title: "Meridian Launch", tag: "E-Commerce", desc: "Headless storefront that doubled conversion in 90 days." },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "120px 32px 80px", maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: 64, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em" }}>
          We build<br />what's next.
        </h1>
        <p style={{ color: "var(--s-text-secondary)", fontSize: 18, marginTop: 24, lineHeight: 1.6, maxWidth: 480 }}>
          Strategy, design, and engineering for companies that refuse to blend in.
        </p>
        <Button style={{ marginTop: 32 }}>Start a Project</Button>
      </section>

      <Separator />

      {/* Case Studies */}
      <section style={{ padding: "64px 32px", maxWidth: 960, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: 28, fontWeight: 700, marginBottom: 32 }}>Case Studies</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {caseStudies.map((study) => (
            <Card key={study.title} hoverable>
              <div style={{ height: 160, background: "var(--s-border)", borderRadius: "8px 8px 0 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 32, opacity: 0.3 }}>◆</span>
              </div>
              <CardHeader>
                <Badge variant="outline" style={{ width: "fit-content" }}>{study.tag}</Badge>
                <CardTitle>{study.title}</CardTitle>
                <CardDescription>{study.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Contact Form */}
      <section style={{ padding: "64px 32px", maxWidth: 520, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--s-font-display)", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Get in Touch</h2>
        <p style={{ color: "var(--s-text-secondary)", marginBottom: 32 }}>Tell us about your project.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <Label>Name</Label>
            <Input placeholder="Jane Doe" style={{ marginTop: 4 }} />
          </div>
          <div>
            <Label>Email</Label>
            <Input placeholder="jane@company.com" style={{ marginTop: 4 }} />
          </div>
          <div>
            <Label>Message</Label>
            <textarea
              placeholder="Tell us about your project…"
              rows={4}
              style={{
                marginTop: 4,
                width: "100%",
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid var(--s-border)",
                background: "var(--s-surface)",
                color: "var(--s-text)",
                fontFamily: "var(--s-font-body)",
                fontSize: 14,
                resize: "vertical",
              }}
            />
          </div>
          <Button style={{ alignSelf: "flex-start" }}>Send Message</Button>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  9. CLI Tool (cipher)                                                       */
/* -------------------------------------------------------------------------- */

function CliToolDemo() {
  return (
    <div>
      {/* Hero */}
      <section style={{ textAlign: "center", padding: "120px 24px 80px", maxWidth: 680, margin: "0 auto" }}>
        <Badge style={{ fontFamily: "var(--s-font-mono)" }}>v1.0.0</Badge>
        <h1 style={{ fontFamily: "var(--s-font-mono)", fontSize: 48, fontWeight: 700, marginTop: 16, lineHeight: 1.1 }}>
          sigil-cli
        </h1>
        <p style={{ color: "var(--s-text-secondary)", marginTop: 16, fontFamily: "var(--s-font-mono)", fontSize: 15, lineHeight: 1.7 }}>
          Init, add, preset, diff, doctor — everything you need to manage a Sigil project from the terminal.
        </p>
      </section>

      {/* Terminal */}
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 48px" }}>
        <Terminal
          title="~ terminal"
          lines={[
            "$ npm install -g @sigil-ui/cli",
            "",
            "$ sigil init",
            "✔ Detected Next.js project",
            "✔ Selected preset: cobalt",
            "✔ Generated sigil.tokens.md",
            "✔ Created .sigil/AGENTS.md",
            "",
            "$ sigil add button card input",
            "✔ Added 3 components",
            "",
            "$ sigil doctor",
            "✔ Config valid",
            "✔ Tokens synced",
            "✔ 0 issues found",
          ]}
          showLineNumbers={false}
        />
      </section>

      <Separator />

      {/* Features */}
      <section style={{ padding: "64px 24px", maxWidth: 560, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--s-font-mono)", fontSize: 22, fontWeight: 700, marginBottom: 32 }}>Features</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            "Interactive project setup with preset recommendations",
            "Copy components into your project (they still read tokens)",
            "Switch presets instantly — regenerates token CSS",
            "Diff token changes since last sync",
            "Doctor validates config, tokens, components, and deps",
            "Agent instructions generated automatically",
          ].map((feature) => (
            <div key={feature} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ color: "var(--s-primary)", fontWeight: 700, flexShrink: 0 }}>✓</span>
              <span style={{ fontFamily: "var(--s-font-mono)", fontSize: 14, color: "var(--s-text-secondary)", lineHeight: 1.5 }}>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Install CTA */}
      <section style={{ textAlign: "center", padding: "64px 24px 80px" }}>
        <h2 style={{ fontFamily: "var(--s-font-mono)", fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Install now</h2>
        <div style={{ display: "inline-block", background: "var(--s-surface)", border: "1px solid var(--s-border)", borderRadius: 8, padding: "12px 24px" }}>
          <code style={{ fontFamily: "var(--s-font-mono)", fontSize: 15, color: "var(--s-primary)" }}>
            npm install @sigil-ui/cli
          </code>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  10. Playground (sigil)                                                     */
/* -------------------------------------------------------------------------- */

function PlaygroundDemo() {
  return (
    <div style={{ padding: "80px 32px", maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--s-font-display)", fontSize: 36, fontWeight: 700, marginBottom: 8 }}>Component Playground</h1>
      <p style={{ color: "var(--s-text-secondary)", marginBottom: 32 }}>Interactive showcase of Sigil UI components across categories.</p>

      <Tabs defaultValue="ui">
        <TabsList>
          <TabsTrigger value="ui">UI</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        {/* UI Tab */}
        <TabsContent value="ui">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 24 }}>
            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Primary actions and variants</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Button>Primary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button size="sm">Small</Button>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>Status and category indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Badge>Default</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Inputs */}
            <Card>
              <CardHeader>
                <CardTitle>Inputs</CardTitle>
                <CardDescription>Text fields and controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <Input placeholder="Text input" />
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Checkbox id="pg-check" />
                    <Label htmlFor="pg-check">Checkbox option</Label>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Switch />
                    <Label>Toggle switch</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPI */}
            <Card>
              <CardHeader>
                <CardTitle>KPI</CardTitle>
                <CardDescription>Metric display with trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <KPI label="Users" value="1,284" change="+14%" trend="up" />
                  <KPI label="Errors" value="3" change="-67%" trend="down" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 24 }}>
            <Card>
              <CardHeader>
                <CardTitle>Cards</CardTitle>
                <CardDescription>Content containers with hover states</CardDescription>
              </CardHeader>
              <CardContent>
                <Card hoverable style={{ padding: 16 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Nested Card</div>
                  <div style={{ fontSize: 13, color: "var(--s-text-muted)" }}>Cards can nest to create depth hierarchy.</div>
                </Card>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Separator</CardTitle>
                <CardDescription>Visual dividers between content sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ fontSize: 14 }}>Section one content</div>
                  <Separator />
                  <div style={{ fontSize: 14 }}>Section two content</div>
                  <Separator />
                  <div style={{ fontSize: 14 }}>Section three content</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avatar</CardTitle>
                <CardDescription>User and entity representations</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Avatar fallback="KL" size="sm" />
                  <Avatar fallback="AB" size="md" />
                  <Avatar fallback="XY" size="lg" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Terminal</CardTitle>
                <CardDescription>Code and command display</CardDescription>
              </CardHeader>
              <CardContent>
                <Terminal
                  title="bash"
                  lines={["npx sigil init", "✔ Ready"]}
                  showLineNumbers={false}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Navigation Tab */}
        <TabsContent value="navigation">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 24 }}>
            <Card>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
                <CardDescription>Tabbed content organization</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="one">
                  <TabsList>
                    <TabsTrigger value="one">Tab 1</TabsTrigger>
                    <TabsTrigger value="two">Tab 2</TabsTrigger>
                    <TabsTrigger value="three">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="one">
                    <div style={{ padding: "12px 0", fontSize: 14, color: "var(--s-text-secondary)" }}>First tab content panel.</div>
                  </TabsContent>
                  <TabsContent value="two">
                    <div style={{ padding: "12px 0", fontSize: 14, color: "var(--s-text-secondary)" }}>Second tab content panel.</div>
                  </TabsContent>
                  <TabsContent value="three">
                    <div style={{ padding: "12px 0", fontSize: 14, color: "var(--s-text-secondary)" }}>Third tab content panel.</div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Groups</CardTitle>
                <CardDescription>Grouped actions for navigation patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <Button size="sm" variant="outline">← Prev</Button>
                    <Button size="sm" variant="outline">1</Button>
                    <Button size="sm">2</Button>
                    <Button size="sm" variant="outline">3</Button>
                    <Button size="sm" variant="outline">Next →</Button>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button size="sm">Save</Button>
                    <Button size="sm" variant="outline">Cancel</Button>
                    <Button size="sm" variant="ghost">Reset</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 24 }}>
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
                <CardDescription>Determinate progress indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--s-text-muted)", marginBottom: 4 }}>Upload: 72%</div>
                    <Progress value={72} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--s-text-muted)", marginBottom: 4 }}>Build: 100%</div>
                    <Progress value={100} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--s-text-muted)", marginBottom: 4 }}>Deploy: 35%</div>
                    <Progress value={35} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loading</CardTitle>
                <CardDescription>Indeterminate loading states</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <div style={{ textAlign: "center" }}>
                    <LoadingSpinner size="sm" />
                    <div style={{ fontSize: 12, color: "var(--s-text-muted)", marginTop: 8 }}>Small</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <LoadingSpinner size="md" />
                    <div style={{ fontSize: 12, color: "var(--s-text-muted)", marginTop: 8 }}>Medium</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <LoadingSpinner size="lg" />
                    <div style={{ fontSize: 12, color: "var(--s-text-muted)", marginTop: 8 }}>Large</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Badges</CardTitle>
                <CardDescription>Contextual status communication</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Build #847", status: "Passed", variant: "default" as const },
                    { label: "Build #846", status: "Running", variant: "outline" as const },
                    { label: "Build #845", status: "Failed", variant: "destructive" as const },
                  ].map((build) => (
                    <div key={build.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14, fontFamily: "var(--s-font-mono)" }}>{build.label}</span>
                      <Badge variant={build.variant}>{build.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Metrics</CardTitle>
                <CardDescription>Live data with trend indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <KPI label="Latency" value="12ms" change="-4ms" trend="down" />
                  <KPI label="Throughput" value="8.4k/s" change="+12%" trend="up" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
