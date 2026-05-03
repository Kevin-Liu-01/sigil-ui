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
                className="flex-1 w-full aspect-[4/3] flex items-center justify-center p-8"
                style={{
                  background: "var(--r-surface)",
                  borderRadius: "var(--r-radius-lg)",
                  border: "1px solid var(--r-border)",
                }}
              >
                {i === 0 && (
                  <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
                    <rect x="50" y="30" width="80" height="55" rx="8" stroke="var(--r-border)" strokeWidth="1.5" />
                    <path d="M90 43 L102 66 L78 66 Z" stroke="var(--r-text-muted)" strokeWidth="1.5" />
                    <rect x="160" y="30" width="80" height="55" rx="8" stroke="var(--r-border)" strokeWidth="1.5" />
                    <path d="M192 44 C202 38 210 44 204 52 C198 58 194 62 204 66" stroke="var(--r-primary)" strokeWidth="2" strokeLinecap="round" />
                    <rect x="270" y="30" width="80" height="55" rx="8" stroke="var(--r-border)" strokeWidth="1.5" />
                    <path d="M298 68 L310 45 L322 68" stroke="var(--r-text-muted)" strokeWidth="1.5" />
                    <path d="M315 68 L322 56 L329 68" stroke="var(--r-primary)" strokeWidth="1.5" />
                    <line x1="90" y1="85" x2="200" y2="140" stroke="var(--r-border)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="200" y1="85" x2="200" y2="140" stroke="var(--r-border)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="310" y1="85" x2="200" y2="140" stroke="var(--r-border)" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="200" cy="140" r="5" fill="var(--r-primary)" />
                    <line x1="200" y1="145" x2="200" y2="165" stroke="var(--r-border)" strokeWidth="1" strokeDasharray="4 4" />
                    <rect x="120" y="165" width="160" height="100" rx="8" stroke="var(--r-text-muted)" strokeWidth="1.5" />
                    <line x1="120" y1="198" x2="280" y2="198" stroke="var(--r-border)" strokeWidth="1" />
                    <line x1="120" y1="232" x2="280" y2="232" stroke="var(--r-border)" strokeWidth="1" />
                    <rect x="135" y="178" width="40" height="4" rx="2" fill="var(--r-border)" />
                    <rect x="135" y="210" width="30" height="4" rx="2" fill="var(--r-border)" />
                    <rect x="135" y="244" width="35" height="4" rx="2" fill="var(--r-border)" />
                    <circle cx="265" cy="182" r="4" fill="var(--r-primary)" />
                    <circle cx="265" cy="215" r="4" fill="var(--r-primary)" />
                    <circle cx="265" cy="248" r="4" fill="var(--r-primary)" />
                  </svg>
                )}
                {i === 1 && (
                  <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
                    <circle cx="200" cy="150" r="70" stroke="var(--r-text-muted)" strokeWidth="1.5" />
                    <ellipse cx="200" cy="150" rx="70" ry="22" stroke="var(--r-border)" strokeWidth="1" />
                    <ellipse cx="200" cy="120" rx="52" ry="14" stroke="var(--r-border)" strokeWidth="0.75" />
                    <ellipse cx="200" cy="180" rx="52" ry="14" stroke="var(--r-border)" strokeWidth="0.75" />
                    <ellipse cx="200" cy="150" rx="22" ry="70" stroke="var(--r-border)" strokeWidth="1" />
                    <circle cx="60" cy="55" r="8" stroke="var(--r-primary)" strokeWidth="1.5" fill="var(--r-surface)" />
                    <circle cx="340" cy="70" r="8" stroke="var(--r-primary)" strokeWidth="1.5" fill="var(--r-surface)" />
                    <circle cx="50" cy="220" r="8" stroke="var(--r-text-muted)" strokeWidth="1.5" fill="var(--r-surface)" />
                    <circle cx="350" cy="230" r="8" stroke="var(--r-text-muted)" strokeWidth="1.5" fill="var(--r-surface)" />
                    <circle cx="200" cy="22" r="8" stroke="var(--r-primary)" strokeWidth="1.5" fill="var(--r-surface)" />
                    <circle cx="95" cy="270" r="8" stroke="var(--r-text-muted)" strokeWidth="1.5" fill="var(--r-surface)" />
                    <circle cx="310" cy="275" r="8" stroke="var(--r-text-muted)" strokeWidth="1.5" fill="var(--r-surface)" />
                    <line x1="137" y1="105" x2="67" y2="59" stroke="var(--r-border)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="263" y1="110" x2="333" y2="74" stroke="var(--r-border)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="137" y1="195" x2="57" y2="216" stroke="var(--r-border)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="263" y1="190" x2="343" y2="226" stroke="var(--r-border)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="200" y1="80" x2="200" y2="30" stroke="var(--r-border)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="148" y1="210" x2="102" y2="265" stroke="var(--r-border)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="252" y1="210" x2="303" y2="270" stroke="var(--r-border)" strokeWidth="1" strokeDasharray="4 3" />
                    <circle cx="137" cy="105" r="3" fill="var(--r-primary)" />
                    <circle cx="263" cy="110" r="3" fill="var(--r-primary)" />
                    <circle cx="200" cy="80" r="3" fill="var(--r-primary)" />
                  </svg>
                )}
                {i === 2 && (
                  <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
                    <rect x="40" y="20" width="320" height="260" rx="10" stroke="var(--r-border)" strokeWidth="1.5" fill="var(--r-surface)" />
                    <rect x="41" y="21" width="318" height="50" rx="9" fill="var(--r-border)" fillOpacity={0.15} />
                    <line x1="40" y1="71" x2="360" y2="71" stroke="var(--r-border)" strokeWidth="1" />
                    <circle cx="72" cy="46" r="14" stroke="var(--r-text-muted)" strokeWidth="1.5" fill="var(--r-surface)" />
                    <circle cx="72" cy="46" r="5" stroke="var(--r-text-muted)" strokeWidth="1.5" />
                    <line x1="72" y1="38" x2="72" y2="41" stroke="var(--r-text-muted)" strokeWidth="1.5" />
                    <line x1="72" y1="51" x2="72" y2="54" stroke="var(--r-text-muted)" strokeWidth="1.5" />
                    <line x1="64" y1="46" x2="67" y2="46" stroke="var(--r-text-muted)" strokeWidth="1.5" />
                    <line x1="77" y1="46" x2="80" y2="46" stroke="var(--r-text-muted)" strokeWidth="1.5" />
                    <rect x="96" y="39" width="70" height="6" rx="3" fill="var(--r-text-muted)" />
                    <rect x="96" y="51" width="35" height="4" rx="2" fill="var(--r-border)" />
                    <rect x="65" y="90" width="220" height="5" rx="2.5" fill="var(--r-border)" />
                    <rect x="65" y="103" width="170" height="5" rx="2.5" fill="var(--r-border)" />
                    <rect x="65" y="125" width="200" height="32" rx="6" stroke="var(--r-border)" strokeWidth="1.5" />
                    <rect x="80" y="138" width="120" height="5" rx="2.5" fill="var(--r-primary)" />
                    <path d="M228 134 L236 134 L236 142" stroke="var(--r-primary)" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="228" y1="142" x2="236" y2="134" stroke="var(--r-primary)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="80" cy="192" r="10" stroke="var(--r-primary)" strokeWidth="1.5" />
                    <path d="M75 192 L78 195 L85 188" stroke="var(--r-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="100" y="187" width="120" height="5" rx="2.5" fill="var(--r-border)" />
                    <rect x="100" y="198" width="80" height="4" rx="2" fill="var(--r-border)" fillOpacity={0.5} />
                    <circle cx="80" cy="232" r="10" stroke="var(--r-primary)" strokeWidth="1.5" />
                    <path d="M75 232 L78 235 L85 228" stroke="var(--r-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="100" y="227" width="100" height="5" rx="2.5" fill="var(--r-border)" />
                    <rect x="100" y="238" width="60" height="4" rx="2" fill="var(--r-border)" fillOpacity={0.5} />
                  </svg>
                )}
              </div>
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
