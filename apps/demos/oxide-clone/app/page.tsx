export default function Page() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--r-background)",
        color: "var(--r-text)",
        fontFamily: "var(--r-font-mono)",
      }}
    >
      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-6 lg:px-12 py-4"
        style={{ borderBottom: "1px solid var(--r-border)" }}
      >
        <span className="text-xl font-bold" style={{ color: "var(--r-primary)" }}>
          0xide
        </span>
        <div
          className="hidden md:flex items-center gap-8 text-xs font-medium tracking-[0.15em] uppercase"
          style={{ color: "var(--r-text-muted)" }}
        >
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">Product</a>
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">Docs</a>
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">Company</a>
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">Careers</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 text-xs font-semibold tracking-[0.1em] uppercase transition-colors"
            style={{
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius)",
              color: "var(--r-text)",
              background: "transparent",
            }}
          >
            Try Now
          </button>
          <button
            className="px-4 py-2 text-xs font-semibold tracking-[0.1em] uppercase transition-colors"
            style={{
              background: "var(--r-primary)",
              color: "var(--r-background)",
              borderRadius: "var(--r-radius)",
              border: "none",
            }}
          >
            Contact Sales
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Terminal mock */}
          <div
            className="w-full"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-lg)",
              overflow: "hidden",
            }}
          >
            {/* Tab bar */}
            <div
              className="flex items-center gap-0 text-xs"
              style={{ borderBottom: "1px solid var(--r-border)" }}
            >
              {["CLI", "API", "CONSOLE"].map((tab, i) => (
                <button
                  key={tab}
                  className="px-5 py-3 font-medium tracking-[0.1em] uppercase transition-colors"
                  style={{
                    background: i === 0 ? "var(--r-background)" : "transparent",
                    color: i === 0 ? "var(--r-primary)" : "var(--r-text-muted)",
                    borderRight: "1px solid var(--r-border)",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Terminal content */}
            <div className="p-5 space-y-2 text-sm leading-relaxed">
              <div>
                <span style={{ color: "var(--r-primary)" }}>→ </span>
                <span style={{ color: "var(--r-text-muted)" }}>oxide auth login</span>
              </div>
              <div style={{ color: "var(--r-text-muted)" }}>
                ✓ Authenticated as admin@oxide.computer
              </div>
              <div className="pt-2">
                <span style={{ color: "var(--r-primary)" }}>→ </span>
                <span style={{ color: "var(--r-text-muted)" }}>oxide instance create \</span>
              </div>
              <div style={{ color: "var(--r-text-muted)" }}>
                {"    "}--project production \
              </div>
              <div style={{ color: "var(--r-text-muted)" }}>
                {"    "}--name api-server-01 \
              </div>
              <div style={{ color: "var(--r-text-muted)" }}>
                {"    "}--ncpus 16 --memory 64
              </div>
              <div className="pt-2" style={{ color: "var(--r-primary)" }}>
                ✓ Instance created: api-server-01 (16 vCPU, 64 GiB)
              </div>
              <div className="pt-1">
                <span style={{ color: "var(--r-primary)" }}>→ </span>
                <span className="animate-pulse">█</span>
              </div>
            </div>
          </div>

          {/* Product photo placeholder */}
          <div
            className="w-full aspect-[4/3] flex items-center justify-center"
            style={{
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-lg)",
              background: "var(--r-surface)",
            }}
          >
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--r-text-muted)" }}>
              Product Image
            </span>
          </div>
        </div>
      </section>

      {/* Headline */}
      <section className="px-6 lg:px-12 py-16">
        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05] max-w-5xl"
          style={{ color: "var(--r-text)" }}
        >
          On-prem that feels like the public cloud
        </h1>
      </section>

      {/* Logo Bar */}
      <section
        className="px-6 lg:px-12 py-12"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <p
          className="text-[10px] font-medium tracking-[0.3em] uppercase mb-6"
          style={{ color: "var(--r-text-muted)" }}
        >
          Powering the best teams
        </p>
        <div
          className="flex flex-wrap items-center gap-10 text-xs font-medium tracking-[0.15em] uppercase"
          style={{ color: "var(--r-text-muted)" }}
        >
          {["Databricks", "Palantir", "Bloomberg", "Figma", "Ramp"].map((name) => (
            <span key={name} className="opacity-50 hover:opacity-100 transition-opacity">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section
        className="px-6 lg:px-12 py-20"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <p className="text-2xl sm:text-3xl lg:text-4xl leading-[1.4] max-w-4xl font-medium">
          <span style={{ color: "var(--r-text)" }}>One integrated platform. </span>
          <span style={{ color: "var(--r-text-muted)" }}>
            Compute, storage, networking, software.{" "}
          </span>
          <span style={{ color: "var(--r-text)" }}>
            The public cloud is built this way.{" "}
          </span>
          <span style={{ color: "var(--r-text-muted)" }}>Oxide is, too. </span>
          <span style={{ color: "var(--r-text)" }}>The first cloud you own.</span>
        </p>
      </section>

      {/* Feature Showcase */}
      <section
        className="px-6 lg:px-12 py-16"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <div className="max-w-7xl mx-auto space-y-16">
          {[
            {
              title: "Purpose-built hardware",
              desc: "A fully integrated rack designed from the ground up. Every component — from the sled to the switch — is built to work together seamlessly.",
              flip: false,
            },
            {
              title: "A real API for your datacenter",
              desc: "Everything is API-driven. Provision VMs, manage networking, configure storage — all through a first-class REST API with full OpenAPI specs.",
              flip: true,
            },
            {
              title: "Software you'd actually want to use",
              desc: "The console, CLI, and SDKs are built by the same team that builds the hardware. No afterthought integrations. No third-party sprawl.",
              flip: false,
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                feature.flip ? "lg:[direction:rtl]" : ""
              }`}
            >
              <div className={feature.flip ? "lg:[direction:ltr]" : ""}>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
                  {feature.desc}
                </p>
              </div>
              <div
                className={`aspect-video flex items-center justify-center ${
                  feature.flip ? "lg:[direction:ltr]" : ""
                }`}
                style={{
                  border: "1px solid var(--r-border)",
                  borderRadius: "var(--r-radius-lg)",
                  background: "var(--r-surface)",
                }}
              >
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: "var(--r-text-muted)" }}
                >
                  Feature Image
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 lg:px-12 py-24 text-center"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">Start building today</h2>
        <div className="flex items-center justify-center gap-4">
          <button
            className="px-6 py-3 text-xs font-semibold tracking-[0.1em] uppercase"
            style={{
              background: "var(--r-primary)",
              color: "var(--r-background)",
              borderRadius: "var(--r-radius)",
              border: "none",
            }}
          >
            Request a Demo
          </button>
          <button
            className="px-6 py-3 text-xs font-semibold tracking-[0.1em] uppercase"
            style={{
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius)",
              color: "var(--r-text)",
              background: "transparent",
            }}
          >
            Read the Docs
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 lg:px-12 py-16"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <span className="text-lg font-bold" style={{ color: "var(--r-primary)" }}>
              0xide
            </span>
          </div>
          {[
            { heading: "Product", links: ["Overview", "Hardware", "Software", "Pricing"] },
            { heading: "Resources", links: ["Docs", "API Reference", "CLI", "Blog"] },
            { heading: "Company", links: ["About", "Careers", "Press", "Contact"] },
            { heading: "Social", links: ["GitHub", "X / Twitter", "LinkedIn", "YouTube"] },
          ].map((col) => (
            <div key={col.heading}>
              <h4
                className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ color: "var(--r-text-muted)" }}
              >
                {col.heading}
              </h4>
              <ul className="space-y-2 text-xs" style={{ color: "var(--r-text-muted)" }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[var(--r-text)] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="max-w-7xl mx-auto mt-12 pt-6 text-[10px] tracking-[0.1em]"
          style={{ borderTop: "1px solid var(--r-border)", color: "var(--r-text-muted)" }}
        >
          © 2024 Oxide Computer Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
