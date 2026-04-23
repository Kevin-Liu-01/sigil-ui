export default function Page() {
  const features = [
    {
      title: "Issue tracking",
      desc: "Create, assign, and track issues with keyboard-first workflows and real-time sync across your team.",
    },
    {
      title: "Cycles",
      desc: "Fixed-length sprints that automatically roll over incomplete work. Measure velocity, not vanity metrics.",
    },
    {
      title: "Roadmaps",
      desc: "Connect issues to projects to initiatives. See the big picture without losing track of the details.",
    },
    {
      title: "Workflows",
      desc: "Automate repetitive work with custom rules. Triage, assign, and transition issues automatically.",
    },
    {
      title: "Integrations",
      desc: "GitHub, GitLab, Slack, Figma, Sentry — connect the tools your team already uses.",
    },
    {
      title: "Analytics",
      desc: "Understand how your team ships. Track cycle time, throughput, and bottlenecks in real time.",
    },
  ];

  const logos = ["Stripe", "Vercel", "Notion", "Loom", "Pitch", "Retool"];

  return (
    <div className="min-h-screen" style={{ background: "var(--r-background)", color: "var(--r-text)" }}>
      {/* Navbar — sticky */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl"
        style={{
          background: "rgba(9, 9, 11, 0.8)",
          borderBottom: "1px solid var(--r-border)",
        }}
      >
        <div className="flex items-center gap-8">
          <span className="text-base font-semibold tracking-tight">Acme</span>
          <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "var(--r-text-muted)" }}>
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Method</a>
            <a href="#" className="hover:text-white transition-colors">Customers</a>
            <a href="#" className="hover:text-white transition-colors">Changelog</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 text-sm font-medium"
            style={{ color: "var(--r-text-muted)" }}
          >
            Log in
          </button>
          <button
            className="px-4 py-2 text-sm font-medium"
            style={{
              background: "var(--r-text)",
              color: "var(--r-background)",
              borderRadius: "var(--r-radius-sm)",
            }}
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-24 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% -10%, var(--r-gradient-start), transparent)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium mb-8"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-full)",
              color: "var(--r-text-muted)",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5"
              style={{ background: "var(--r-primary)", borderRadius: "var(--r-radius-full)" }}
            />
            Introducing Acme Cycles 2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            The project management{" "}
            <br className="hidden md:block" />
            system for modern teams
          </h1>
          <p
            className="mt-6 text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--r-text-muted)" }}
          >
            Streamline issues, projects, and product roadmaps.
            Built for the way modern software teams work.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              className="px-6 py-3 text-sm font-medium"
              style={{
                background: "linear-gradient(to bottom, var(--r-gradient-start), var(--r-gradient-end))",
                color: "#fff",
                borderRadius: "var(--r-radius-sm)",
              }}
            >
              Get started free
            </button>
            <button
              className="px-6 py-3 text-sm font-medium"
              style={{
                background: "var(--r-surface)",
                border: "1px solid var(--r-border)",
                borderRadius: "var(--r-radius-sm)",
                color: "var(--r-text-muted)",
              }}
            >
              Talk to sales
            </button>
          </div>
        </div>
      </section>

      {/* Logo cloud */}
      <section className="px-6 py-16" style={{ borderTop: "1px solid var(--r-border)" }}>
        <p className="text-center text-xs font-medium uppercase tracking-widest mb-8" style={{ color: "var(--r-text-subtle)" }}>
          Trusted by the best teams in the world
        </p>
        <div className="flex items-center justify-center gap-12 flex-wrap">
          {logos.map((name) => (
            <span
              key={name}
              className="text-sm font-medium tracking-wide"
              style={{ color: "var(--r-text-subtle)" }}
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Large cinematic text */}
      <section
        className="px-6 py-32 text-center"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-semibold tracking-tight leading-[1.1]">
          A new species
          <br />
          <span style={{ color: "var(--r-text-subtle)" }}>of tool.</span>
        </h2>
      </section>

      {/* Feature cards */}
      <section
        className="px-6 py-24"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-medium uppercase tracking-widest mb-12" style={{ color: "var(--r-text-subtle)" }}>
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--r-border)" }}>
            {features.map((f) => (
              <div
                key={f.title}
                className="p-8"
                style={{ background: "var(--r-background)" }}
              >
                <h3 className="text-base font-semibold mb-3">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento grid */}
      <section className="px-6 py-24" style={{ borderTop: "1px solid var(--r-border)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-medium uppercase tracking-widest mb-12" style={{ color: "var(--r-text-subtle)" }}>
            Built for speed
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Large cell — spans 2 cols */}
            <div
              className="md:col-span-2 p-8 flex flex-col justify-end min-h-[280px]"
              style={{
                background: "var(--r-surface)",
                borderRadius: "var(--r-radius-lg)",
                border: "1px solid var(--r-border)",
              }}
            >
              <h3 className="text-lg font-semibold mb-2">Keyboard-first design</h3>
              <p className="text-sm" style={{ color: "var(--r-text-muted)" }}>
                Every action is one keystroke away. Cmd+K to search, C to create, S to set status.
              </p>
            </div>
            {/* Small cell */}
            <div
              className="p-8 flex flex-col justify-end min-h-[280px]"
              style={{
                background: "var(--r-surface)",
                borderRadius: "var(--r-radius-lg)",
                border: "1px solid var(--r-border)",
              }}
            >
              <h3 className="text-lg font-semibold mb-2">Real-time sync</h3>
              <p className="text-sm" style={{ color: "var(--r-text-muted)" }}>
                Changes appear instantly across all connected clients. No refresh needed.
              </p>
            </div>
            {/* Small cell */}
            <div
              className="p-8 flex flex-col justify-end min-h-[280px]"
              style={{
                background: "var(--r-surface)",
                borderRadius: "var(--r-radius-lg)",
                border: "1px solid var(--r-border)",
              }}
            >
              <h3 className="text-lg font-semibold mb-2">50ms responses</h3>
              <p className="text-sm" style={{ color: "var(--r-text-muted)" }}>
                Local-first architecture with optimistic updates. The UI never waits for the server.
              </p>
            </div>
            {/* Large cell — spans 2 cols */}
            <div
              className="md:col-span-2 p-8 flex flex-col justify-end min-h-[280px]"
              style={{
                background: "var(--r-surface)",
                borderRadius: "var(--r-radius-lg)",
                border: "1px solid var(--r-border)",
              }}
            >
              <h3 className="text-lg font-semibold mb-2">GitHub & GitLab</h3>
              <p className="text-sm" style={{ color: "var(--r-text-muted)" }}>
                Auto-link PRs to issues. Close issues on merge. Sync labels, branches, and deployment status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section
        className="px-6 py-24 text-center"
        style={{
          borderTop: "1px solid var(--r-border)",
          background: "var(--r-surface)",
        }}
      >
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Available today.
        </h2>
        <p className="mt-4 text-base" style={{ color: "var(--r-text-muted)" }}>
          Free for teams up to 250 issues. No credit card required.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            className="px-6 py-3 text-sm font-medium"
            style={{
              background: "linear-gradient(to bottom, var(--r-gradient-start), var(--r-gradient-end))",
              color: "#fff",
              borderRadius: "var(--r-radius-sm)",
            }}
          >
            Get started
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
      <footer
        className="px-6 py-16"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <div className="col-span-2 md:col-span-1">
              <span className="text-base font-semibold">Acme</span>
            </div>
            {[
              { heading: "Product", links: ["Features", "Integrations", "Pricing", "Changelog"] },
              { heading: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { heading: "Resources", links: ["Documentation", "API Reference", "Guides", "Status"] },
              { heading: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
              { heading: "Connect", links: ["Twitter", "GitHub", "Discord", "LinkedIn"] },
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
        </div>
      </footer>
    </div>
  );
}
