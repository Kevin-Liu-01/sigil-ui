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

          {/* Server rack illustration */}
          <div
            className="w-full aspect-[4/3] flex items-center justify-center p-8"
            style={{
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-lg)",
              background: "var(--r-surface)",
            }}
          >
            <svg
              viewBox="0 0 200 260"
              fill="none"
              style={{ width: "100%", height: "100%", maxWidth: "240px" }}
            >
              {/* Rack outline */}
              <rect x="20" y="10" width="160" height="240" rx="4" stroke="var(--r-text-muted)" strokeWidth="1.5" />
              {/* Rack rails */}
              <line x1="36" y1="10" x2="36" y2="250" stroke="var(--r-border)" strokeWidth="1" />
              <line x1="164" y1="10" x2="164" y2="250" stroke="var(--r-border)" strokeWidth="1" />
              {/* Sled 1 */}
              <rect x="40" y="30" width="120" height="50" rx="2" stroke="var(--r-text-muted)" strokeWidth="1" />
              <rect x="50" y="42" width="30" height="8" rx="1" fill="var(--r-border)" />
              <rect x="85" y="42" width="30" height="8" rx="1" fill="var(--r-border)" />
              <rect x="50" y="56" width="50" height="6" rx="1" fill="var(--r-border)" />
              <circle cx="140" cy="46" r="3" fill="var(--r-primary)" />
              <circle cx="140" cy="58" r="3" fill="var(--r-primary)" opacity="0.4" />
              {/* Sled 2 */}
              <rect x="40" y="100" width="120" height="50" rx="2" stroke="var(--r-text-muted)" strokeWidth="1" />
              <rect x="50" y="112" width="30" height="8" rx="1" fill="var(--r-border)" />
              <rect x="85" y="112" width="30" height="8" rx="1" fill="var(--r-border)" />
              <rect x="50" y="126" width="50" height="6" rx="1" fill="var(--r-border)" />
              <circle cx="140" cy="116" r="3" fill="var(--r-primary)" />
              <circle cx="140" cy="128" r="3" fill="var(--r-primary)" opacity="0.4" />
              {/* Sled 3 */}
              <rect x="40" y="170" width="120" height="50" rx="2" stroke="var(--r-text-muted)" strokeWidth="1" />
              <rect x="50" y="182" width="30" height="8" rx="1" fill="var(--r-border)" />
              <rect x="85" y="182" width="30" height="8" rx="1" fill="var(--r-border)" />
              <rect x="50" y="196" width="50" height="6" rx="1" fill="var(--r-border)" />
              <circle cx="140" cy="186" r="3" fill="var(--r-primary)" />
              <circle cx="140" cy="198" r="3" fill="var(--r-primary)" opacity="0.4" />
            </svg>
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
                className={`aspect-video flex items-center justify-center p-6 ${
                  feature.flip ? "lg:[direction:ltr]" : ""
                }`}
                style={{
                  border: "1px solid var(--r-border)",
                  borderRadius: "var(--r-radius-lg)",
                  background: "var(--r-surface)",
                }}
              >
                {i === 0 && (
                  <svg viewBox="0 0 280 160" fill="none" style={{ width: "100%", height: "100%", maxWidth: "360px" }}>
                    {/* Sled chassis */}
                    <rect x="20" y="20" width="240" height="120" rx="3" stroke="var(--r-text-muted)" strokeWidth="1.5" />
                    {/* CPU modules */}
                    <rect x="36" y="36" width="44" height="34" rx="2" stroke="var(--r-border)" strokeWidth="1" />
                    <rect x="40" y="40" width="36" height="26" rx="1" fill="var(--r-border)" opacity="0.5" />
                    <rect x="90" y="36" width="44" height="34" rx="2" stroke="var(--r-border)" strokeWidth="1" />
                    <rect x="94" y="40" width="36" height="26" rx="1" fill="var(--r-border)" opacity="0.5" />
                    {/* Memory DIMMs */}
                    <rect x="148" y="36" width="8" height="34" rx="1" fill="var(--r-border)" opacity="0.6" />
                    <rect x="160" y="36" width="8" height="34" rx="1" fill="var(--r-border)" opacity="0.6" />
                    <rect x="172" y="36" width="8" height="34" rx="1" fill="var(--r-border)" opacity="0.6" />
                    <rect x="184" y="36" width="8" height="34" rx="1" fill="var(--r-border)" opacity="0.6" />
                    <rect x="196" y="36" width="8" height="34" rx="1" fill="var(--r-border)" opacity="0.6" />
                    <rect x="208" y="36" width="8" height="34" rx="1" fill="var(--r-border)" opacity="0.6" />
                    {/* NVMe slots */}
                    <rect x="36" y="84" width="60" height="16" rx="2" stroke="var(--r-border)" strokeWidth="1" />
                    <rect x="104" y="84" width="60" height="16" rx="2" stroke="var(--r-border)" strokeWidth="1" />
                    <rect x="172" y="84" width="60" height="16" rx="2" stroke="var(--r-border)" strokeWidth="1" />
                    {/* LEDs */}
                    <circle cx="236" cy="36" r="4" fill="var(--r-primary)" />
                    <circle cx="236" cy="50" r="4" fill="var(--r-primary)" opacity="0.4" />
                    <circle cx="236" cy="64" r="4" fill="var(--r-primary)" opacity="0.4" />
                    {/* Bottom label area */}
                    <rect x="36" y="112" width="80" height="8" rx="1" fill="var(--r-border)" opacity="0.3" />
                    <rect x="130" y="112" width="40" height="8" rx="1" fill="var(--r-border)" opacity="0.3" />
                  </svg>
                )}
                {i === 1 && (
                  <svg viewBox="0 0 280 160" fill="none" style={{ width: "100%", height: "100%", maxWidth: "360px" }}>
                    {/* Terminal window */}
                    <rect x="10" y="10" width="260" height="140" rx="4" stroke="var(--r-text-muted)" strokeWidth="1.5" />
                    {/* Title bar */}
                    <line x1="10" y1="30" x2="270" y2="30" stroke="var(--r-border)" strokeWidth="1" />
                    <circle cx="24" cy="20" r="3" stroke="var(--r-border)" strokeWidth="1" />
                    <circle cx="36" cy="20" r="3" stroke="var(--r-border)" strokeWidth="1" />
                    <circle cx="48" cy="20" r="3" stroke="var(--r-border)" strokeWidth="1" />
                    {/* Request */}
                    <text x="24" y="50" fontSize="9" fontFamily="monospace" fill="var(--r-primary)">GET</text>
                    <text x="50" y="50" fontSize="9" fontFamily="monospace" fill="var(--r-text)">/v1/instances</text>
                    {/* Headers */}
                    <text x="24" y="66" fontSize="8" fontFamily="monospace" fill="var(--r-text-muted)">Authorization: Bearer oxide_tk_...</text>
                    <text x="24" y="78" fontSize="8" fontFamily="monospace" fill="var(--r-text-muted)">Content-Type: application/json</text>
                    {/* Divider */}
                    <line x1="24" y1="86" x2="256" y2="86" stroke="var(--r-border)" strokeWidth="0.5" strokeDasharray="3 2" />
                    {/* Response */}
                    <text x="24" y="100" fontSize="9" fontFamily="monospace" fill="var(--r-primary)">200 OK</text>
                    <text x="24" y="116" fontSize="8" fontFamily="monospace" fill="var(--r-text-muted)">{"{"}</text>
                    <text x="34" y="128" fontSize="8" fontFamily="monospace" fill="var(--r-text-muted)">{'"items": [ { "name": "api-server-01",'}</text>
                    <text x="34" y="140" fontSize="8" fontFamily="monospace" fill="var(--r-text-muted)">{'"ncpus": 16, "memory": 68719476736 } ]'}</text>
                  </svg>
                )}
                {i === 2 && (
                  <svg viewBox="0 0 280 160" fill="none" style={{ width: "100%", height: "100%", maxWidth: "360px" }}>
                    {/* Window frame */}
                    <rect x="10" y="10" width="260" height="140" rx="4" stroke="var(--r-text-muted)" strokeWidth="1.5" />
                    {/* Title bar */}
                    <line x1="10" y1="30" x2="270" y2="30" stroke="var(--r-border)" strokeWidth="1" />
                    <circle cx="24" cy="20" r="3" stroke="var(--r-border)" strokeWidth="1" />
                    <circle cx="36" cy="20" r="3" stroke="var(--r-border)" strokeWidth="1" />
                    <circle cx="48" cy="20" r="3" stroke="var(--r-border)" strokeWidth="1" />
                    <text x="120" y="23" fontSize="8" fontFamily="monospace" fill="var(--r-text-muted)" textAnchor="middle">Oxide Console</text>
                    {/* Sidebar */}
                    <line x1="80" y1="30" x2="80" y2="150" stroke="var(--r-border)" strokeWidth="1" />
                    <rect x="18" y="38" width="52" height="8" rx="2" fill="var(--r-primary)" opacity="0.8" />
                    <rect x="18" y="52" width="48" height="6" rx="1" fill="var(--r-border)" opacity="0.4" />
                    <rect x="18" y="64" width="44" height="6" rx="1" fill="var(--r-border)" opacity="0.4" />
                    <rect x="18" y="76" width="50" height="6" rx="1" fill="var(--r-border)" opacity="0.4" />
                    <rect x="18" y="88" width="38" height="6" rx="1" fill="var(--r-border)" opacity="0.4" />
                    <rect x="18" y="100" width="46" height="6" rx="1" fill="var(--r-border)" opacity="0.4" />
                    {/* Content panel - instance table */}
                    <text x="92" y="46" fontSize="8" fontFamily="monospace" fill="var(--r-text)">Instances</text>
                    <line x1="88" y1="52" x2="262" y2="52" stroke="var(--r-border)" strokeWidth="0.5" />
                    {/* Table header */}
                    <text x="92" y="64" fontSize="7" fontFamily="monospace" fill="var(--r-text-muted)">NAME</text>
                    <text x="160" y="64" fontSize="7" fontFamily="monospace" fill="var(--r-text-muted)">CPU</text>
                    <text x="200" y="64" fontSize="7" fontFamily="monospace" fill="var(--r-text-muted)">STATUS</text>
                    <line x1="88" y1="68" x2="262" y2="68" stroke="var(--r-border)" strokeWidth="0.5" />
                    {/* Table rows */}
                    <text x="92" y="80" fontSize="7" fontFamily="monospace" fill="var(--r-text)">api-server-01</text>
                    <text x="160" y="80" fontSize="7" fontFamily="monospace" fill="var(--r-text-muted)">16</text>
                    <circle cx="208" cy="77" r="3" fill="var(--r-primary)" />
                    <text x="92" y="94" fontSize="7" fontFamily="monospace" fill="var(--r-text)">worker-pool-a</text>
                    <text x="160" y="94" fontSize="7" fontFamily="monospace" fill="var(--r-text-muted)">32</text>
                    <circle cx="208" cy="91" r="3" fill="var(--r-primary)" />
                    <text x="92" y="108" fontSize="7" fontFamily="monospace" fill="var(--r-text)">db-primary</text>
                    <text x="160" y="108" fontSize="7" fontFamily="monospace" fill="var(--r-text-muted)">8</text>
                    <circle cx="208" cy="105" r="3" fill="var(--r-primary)" />
                    <text x="92" y="122" fontSize="7" fontFamily="monospace" fill="var(--r-text)">cache-node-01</text>
                    <text x="160" y="122" fontSize="7" fontFamily="monospace" fill="var(--r-text-muted)">4</text>
                    <circle cx="208" cy="119" r="3" fill="var(--r-primary)" opacity="0.4" />
                  </svg>
                )}
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
