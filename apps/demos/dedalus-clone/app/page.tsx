export default function Page() {
  const features = [
    {
      title: "Type-safe from edge to database",
      desc: "End-to-end TypeScript with generated types for your database schema. Catch errors at compile time, not in production.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--r-primary)" }}>
          <polyline points="7 4 2 10 7 16" />
          <polyline points="13 4 18 10 13 16" />
        </svg>
      ),
    },
    {
      title: "Built-in auth & permissions",
      desc: "Row-level security, JWT tokens, and social auth providers configured in minutes. No third-party auth service needed.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--r-primary)" }}>
          <path d="M10 2L3 6v4c0 4.4 3 8.5 7 10 4-1.5 7-5.6 7-10V6l-7-4z" />
          <polyline points="7 10 9 12 13 8" />
        </svg>
      ),
    },
    {
      title: "Real-time subscriptions",
      desc: "Subscribe to database changes with a single line of code. Build collaborative features without managing WebSockets.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--r-primary)" }}>
          <path d="M11 2L4 11h5l-1 7 7-9h-5l1-7z" />
        </svg>
      ),
    },
  ];

  const tabs = ["TypeScript", "Python", "cURL"];
  const code = `import { createClient } from '@dedalus/sdk';

const db = createClient({
  url: process.env.DEDALUS_URL!,
  key: process.env.DEDALUS_KEY!,
});

const { data, error } = await db
  .from('posts')
  .select('id, title, author(name)')
  .order('created_at', { ascending: false })
  .limit(10);`;

  const stats = [
    { value: "180K+", label: "Developers" },
    { value: "2.1M", label: "Databases created" },
    { value: "99.95%", label: "Uptime" },
    { value: "12", label: "Regions" },
  ];

  const faqs = [
    {
      q: "How does pricing work?",
      a: "Free tier includes 2 projects, 500MB database, and 1GB bandwidth. Pro starts at $25/mo per project with 8GB database and 50GB bandwidth. Enterprise pricing is custom.",
    },
    {
      q: "Can I self-host Dedalus?",
      a: "Yes. Dedalus is open source under the Apache 2.0 license. You can self-host on any infrastructure using Docker, or use our cloud platform for a managed experience.",
    },
    {
      q: "What databases are supported?",
      a: "Dedalus uses PostgreSQL under the hood. You get full Postgres access with extensions like pgvector, PostGIS, and pg_cron. Connect with any Postgres client.",
    },
    {
      q: "How does row-level security work?",
      a: "RLS policies are defined in SQL and enforced at the database level. Every API request is authenticated and filtered through your security policies automatically.",
    },
    {
      q: "Do you offer SOC 2 compliance?",
      a: "Yes. Dedalus Cloud is SOC 2 Type II certified. We also offer HIPAA BAAs and GDPR DPAs for enterprise customers. Contact sales for details.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--r-background)", color: "var(--r-text)" }}>
      {/* Announcement bar */}
      <div
        className="flex items-center justify-center px-4 py-2.5 text-sm gap-2"
        style={{
          background: "var(--r-primary-dim)",
          borderBottom: "1px solid var(--r-border)",
        }}
      >
        <span
          className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: "var(--r-primary)",
            color: "var(--r-background)",
            borderRadius: "var(--r-radius-sm)",
          }}
        >
          New
        </span>
        <span style={{ color: "var(--r-text-muted)" }}>
          Backed by Y Combinator — Series A announced.
        </span>
        <a href="#" className="font-medium" style={{ color: "var(--r-primary)" }}>
          Read more →
        </a>
      </div>

      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid var(--r-border)" }}
      >
        <div className="flex items-center gap-8">
          <span className="text-base font-semibold tracking-tight" style={{ color: "var(--r-primary)" }}>
            ◈ Dedalus
          </span>
          <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "var(--r-text-muted)" }}>
            <a href="#" className="hover:text-white transition-colors">Product</a>
            <a href="#" className="hover:text-white transition-colors">Developers</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm" style={{ color: "var(--r-text-muted)" }}>
            Sign in
          </button>
          <button
            className="px-4 py-2 text-sm font-medium"
            style={{
              background: "var(--r-primary)",
              color: "var(--r-background)",
              borderRadius: "var(--r-radius-sm)",
            }}
          >
            Start your project
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-24 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(ellipse 50% 40% at 50% -5%, var(--r-primary), transparent)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            Build in a weekend.
            <br />
            <span style={{ color: "var(--r-primary)" }}>Scale to millions.</span>
          </h1>
          <p className="mt-6 text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
            The open-source backend platform. Postgres database, authentication,
            real-time subscriptions, edge functions, and storage in one toolkit.
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
              Start your project
            </button>
            <button
              className="px-6 py-3 text-sm font-medium"
              style={{
                border: "1px solid var(--r-border)",
                borderRadius: "var(--r-radius-sm)",
                color: "var(--r-text-muted)",
              }}
            >
              View documentation
            </button>
          </div>
          <div
            className="mt-8 inline-flex items-center gap-3 px-5 py-3 text-sm"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius)",
              fontFamily: "var(--r-font-mono)",
              color: "var(--r-text-muted)",
            }}
          >
            <span style={{ color: "var(--r-text-subtle)" }}>$</span>
            <span>npx create-dedalus-app my-project</span>
            <button
              className="ml-2 px-2 py-1 text-xs"
              style={{
                background: "var(--r-surface-hover)",
                borderRadius: "var(--r-radius-sm)",
                color: "var(--r-text-subtle)",
              }}
            >
              Copy
            </button>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="px-6 py-24" style={{ borderTop: "1px solid var(--r-border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-8"
                style={{
                  background: "var(--r-surface)",
                  border: "1px solid var(--r-border)",
                  borderRadius: "var(--r-radius-lg)",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-5"
                  style={{
                    background: "var(--r-primary-dim)",
                    borderRadius: "var(--r-radius)",
                  }}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold mb-3">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code showcase */}
      <section className="px-6 py-24" style={{ borderTop: "1px solid var(--r-border)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight text-center mb-4">
            Start building in minutes
          </h2>
          <p className="text-center text-base mb-12" style={{ color: "var(--r-text-muted)" }}>
            Use our client libraries to query your database with full type safety.
          </p>
          <div
            className="overflow-hidden"
            style={{
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-lg)",
              boxShadow: "var(--r-glow)",
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
                    color: i === 0 ? "var(--r-primary)" : "var(--r-text-subtle)",
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
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section
        className="px-6 py-20"
        style={{
          borderTop: "1px solid var(--r-border)",
          background: "var(--r-surface)",
        }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold tracking-tight" style={{ color: "var(--r-primary)" }}>
                {s.value}
              </div>
              <div className="mt-2 text-sm" style={{ color: "var(--r-text-muted)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="px-6 py-24" style={{ borderTop: "1px solid var(--r-border)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-0">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group"
                style={{ borderBottom: "1px solid var(--r-border)" }}
              >
                <summary
                  className="flex items-center justify-between py-5 text-base font-medium cursor-pointer list-none"
                  style={{ color: "var(--r-text)" }}
                >
                  {faq.q}
                  <span
                    className="text-xl leading-none transition-transform group-open:rotate-45"
                    style={{ color: "var(--r-text-subtle)" }}
                  >
                    +
                  </span>
                </summary>
                <div className="pb-5 text-sm leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section
        className="relative px-6 py-24 text-center overflow-hidden"
        style={{
          borderTop: "1px solid var(--r-border)",
          background: "var(--r-surface)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, var(--r-primary), transparent)",
          }}
        />
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Start building today.
        </h2>
        <p className="mt-4 text-base" style={{ color: "var(--r-text-muted)" }}>
          Free tier with 2 projects. No credit card required.
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
            Start your project
          </button>
          <button
            className="px-6 py-3 text-sm font-medium"
            style={{
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-sm)",
              color: "var(--r-text-muted)",
            }}
          >
            Contact sales
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16" style={{ borderTop: "1px solid var(--r-border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <div className="col-span-2 md:col-span-1">
              <span className="text-base font-semibold" style={{ color: "var(--r-primary)" }}>
                ◈ Dedalus
              </span>
            </div>
            {[
              { heading: "Product", links: ["Database", "Auth", "Storage", "Edge Functions", "Realtime"] },
              { heading: "Developers", links: ["Documentation", "API Reference", "Guides", "Examples"] },
              { heading: "Resources", links: ["Blog", "Changelog", "Open Source", "Brand Assets"] },
              { heading: "Company", links: ["About", "Careers", "Contact", "Partners"] },
              { heading: "Legal", links: ["Privacy", "Terms", "DPA", "SLA"] },
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
                        className="text-sm hover:text-white transition-colors"
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
            <span>&copy; 2026 Dedalus Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
