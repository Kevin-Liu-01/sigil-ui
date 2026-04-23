export default function Page() {
  const logos = ["Zapier", "Hashicorp", "McDonald's", "Auth0", "The Washington Post", "Tripadvisor"];

  const features = [
    {
      title: "Framework-defined infrastructure",
      desc: "Your frontend framework defines your infrastructure. Next.js, SvelteKit, Nuxt, Astro — Vercel detects your framework and provisions the optimal infrastructure automatically.",
      align: "left" as const,
    },
    {
      title: "Edge-first architecture",
      desc: "Your application runs at the edge by default. Static assets served from the CDN, dynamic routes computed at the nearest edge location. Zero configuration required.",
      align: "right" as const,
    },
    {
      title: "Preview deployments",
      desc: "Every git push generates a live, shareable URL. Comment on PRs with deployment links. See visual diffs before merging. Collaborate with your entire team.",
      align: "left" as const,
    },
  ];

  const stats = [
    { value: "99.99%", label: "Uptime SLA" },
    { value: "~60M", label: "Requests per second" },
    { value: "300+", label: "Edge locations" },
    { value: "<50ms", label: "Cold start (Edge)" },
  ];

  const tabs = ["Next.js", "SvelteKit", "Nuxt"];
  const codeSnippets: Record<string, string> = {
    "Next.js": `// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json({
    message: 'Hello from the Edge',
    region: process.env.VERCEL_REGION,
  });
}`,
    SvelteKit: `// src/routes/api/hello/+server.ts
import { json } from '@sveltejs/kit';

export const config = { runtime: 'edge' };

export async function GET() {
  return json({
    message: 'Hello from the Edge',
  });
}`,
    Nuxt: `// server/api/hello.ts
export default defineEventHandler(() => {
  return {
    message: 'Hello from the Edge',
  };
});`,
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--r-background)", color: "var(--r-text)" }}>
      {/* Announcement banner */}
      <div
        className="flex items-center justify-center px-4 py-2.5 text-sm"
        style={{
          background: "var(--r-surface)",
          borderBottom: "1px solid var(--r-border)",
          color: "var(--r-text-muted)",
        }}
      >
        <span>Ship 2.0 is here — Incremental Static Regeneration at the Edge.</span>
        <a href="#" className="ml-2 font-medium underline" style={{ color: "var(--r-text)" }}>
          Read more →
        </a>
      </div>

      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid var(--r-border)" }}
      >
        <div className="flex items-center gap-8">
          <span className="text-base font-semibold tracking-tight">
            <svg width="18" height="18" viewBox="0 0 76 65" fill="currentColor" className="inline-block mr-1.5 -mt-0.5">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
            Ship
          </span>
          <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "var(--r-text-muted)" }}>
            <a href="#" className="hover:text-black transition-colors">Products</a>
            <a href="#" className="hover:text-black transition-colors">Solutions</a>
            <a href="#" className="hover:text-black transition-colors">Resources</a>
            <a href="#" className="hover:text-black transition-colors">Enterprise</a>
            <a href="#" className="hover:text-black transition-colors">Pricing</a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm" style={{ color: "var(--r-text-muted)" }}>
            Log In
          </button>
          <button className="px-4 py-2 text-sm" style={{ color: "var(--r-text-muted)" }}>
            Contact
          </button>
          <button
            className="px-4 py-2 text-sm font-medium"
            style={{
              background: "var(--r-primary)",
              color: "var(--r-background)",
              borderRadius: "var(--r-radius-sm)",
            }}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-32 pb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] max-w-4xl mx-auto">
          Build and deploy
          <br />
          on the cloud.
        </h1>
        <p className="mt-6 text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
          Ship provides the developer experience and infrastructure to build,
          scale, and secure a faster, more personalized web.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            className="px-6 py-3 text-sm font-medium"
            style={{
              background: "var(--r-primary)",
              color: "var(--r-background)",
              borderRadius: "var(--r-radius-sm)",
            }}
          >
            Start Deploying
          </button>
          <button
            className="px-6 py-3 text-sm font-medium"
            style={{
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-sm)",
              color: "var(--r-text-muted)",
            }}
          >
            Get a Demo
          </button>
        </div>
      </section>

      {/* Logo cloud */}
      <section className="px-6 py-16" style={{ borderTop: "1px solid var(--r-border)" }}>
        <p
          className="text-center text-xs font-medium uppercase tracking-widest mb-8"
          style={{ color: "var(--r-text-subtle)" }}
        >
          Trusted by the best frontend teams
        </p>
        <div className="flex items-center justify-center gap-12 flex-wrap">
          {logos.map((name) => (
            <span key={name} className="text-sm font-medium" style={{ color: "var(--r-text-subtle)" }}>
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Feature showcase — alternating rows */}
      <section className="px-6 py-24" style={{ borderTop: "1px solid var(--r-border)" }}>
        <div className="max-w-5xl mx-auto space-y-32">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`flex flex-col md:flex-row items-center gap-16 ${f.align === "right" ? "md:flex-row-reverse" : ""}`}
            >
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "var(--r-text-subtle)" }}>
                  0{i + 1}
                </p>
                <h3 className="text-3xl font-semibold tracking-tight mb-4">{f.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
                  {f.desc}
                </p>
              </div>
              <div
                className="flex-1 w-full aspect-[4/3]"
                style={{
                  background: "var(--r-surface)",
                  borderRadius: "var(--r-radius-lg)",
                  border: "1px solid var(--r-border)",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Stats row */}
      <section
        className="px-6 py-20"
        style={{ borderTop: "1px solid var(--r-border)", background: "var(--r-surface)" }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold tracking-tight">{s.value}</div>
              <div className="mt-2 text-sm" style={{ color: "var(--r-text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Code showcase */}
      <section className="px-6 py-24" style={{ borderTop: "1px solid var(--r-border)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight text-center mb-4">
            Deploy in seconds
          </h2>
          <p className="text-center text-base mb-12" style={{ color: "var(--r-text-muted)" }}>
            Write your code. Push to git. We handle the rest.
          </p>
          <div
            className="overflow-hidden"
            style={{
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-lg)",
            }}
          >
            <div
              className="flex gap-0"
              style={{ borderBottom: "1px solid var(--r-border)", background: "var(--r-surface)" }}
            >
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  className="px-5 py-3 text-sm font-medium"
                  style={{
                    background: i === 0 ? "var(--r-background)" : "transparent",
                    color: i === 0 ? "var(--r-text)" : "var(--r-text-muted)",
                    borderRight: "1px solid var(--r-border)",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <pre
              className="p-6 text-sm leading-relaxed overflow-x-auto"
              style={{
                background: "var(--r-background)",
                fontFamily: "var(--r-font-mono)",
                color: "var(--r-text-muted)",
              }}
            >
              <code>{codeSnippets["Next.js"]}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA split */}
      <section
        className="px-6 py-24"
        style={{ borderTop: "1px solid var(--r-border)", background: "var(--r-surface)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-semibold tracking-tight mb-4">
              Start building today.
            </h2>
            <p className="text-base mb-8" style={{ color: "var(--r-text-muted)" }}>
              Deploy your first project in under 30 seconds. Free for hobby projects.
            </p>
            <div className="flex gap-3">
              <button
                className="px-6 py-3 text-sm font-medium"
                style={{
                  background: "var(--r-primary)",
                  color: "var(--r-background)",
                  borderRadius: "var(--r-radius-sm)",
                }}
              >
                Start Deploying
              </button>
              <button
                className="px-6 py-3 text-sm font-medium"
                style={{
                  border: "1px solid var(--r-border)",
                  borderRadius: "var(--r-radius-sm)",
                  color: "var(--r-text-muted)",
                }}
              >
                Contact Sales
              </button>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div
              className="p-6 font-mono text-sm leading-relaxed"
              style={{
                background: "var(--r-text)",
                color: "#a1a1aa",
                borderRadius: "var(--r-radius-lg)",
              }}
            >
              <div style={{ color: "#52525b" }}>$ npx create-next-app@latest my-app</div>
              <div className="mt-1">Creating a new Next.js app in ./my-app</div>
              <div className="mt-1">Installing dependencies...</div>
              <div className="mt-3" style={{ color: "#52525b" }}>$ cd my-app && npx ship</div>
              <div className="mt-1" style={{ color: "#22c55e" }}>✓ Deploying to production</div>
              <div style={{ color: "#22c55e" }}>✓ https://my-app.ship.app (1.8s)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16" style={{ borderTop: "1px solid var(--r-border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <div className="col-span-2 md:col-span-1">
              <span className="text-base font-semibold tracking-tight">
                <svg width="16" height="16" viewBox="0 0 76 65" fill="currentColor" className="inline-block mr-1 -mt-0.5">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
                Ship
              </span>
            </div>
            {[
              { heading: "Product", links: ["Previews", "Edge Functions", "Analytics", "Next.js"] },
              { heading: "Resources", links: ["Documentation", "Guides", "Blog", "API Reference"] },
              { heading: "Company", links: ["About", "Careers", "Contact", "Partners"] },
              { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "DPA", "SLA"] },
              { heading: "Social", links: ["GitHub", "Twitter", "YouTube", "Discord"] },
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="text-sm font-medium mb-4" style={{ color: "var(--r-text-subtle)" }}>
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm hover:text-black transition-colors"
                        style={{ color: "var(--r-text-muted)" }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            className="mt-12 pt-8 flex items-center justify-between text-sm"
            style={{ borderTop: "1px solid var(--r-border)", color: "var(--r-text-subtle)" }}
          >
            <span>&copy; 2026 Ship Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
