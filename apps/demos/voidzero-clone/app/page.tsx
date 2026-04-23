export default function Page() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--r-background)",
        color: "var(--r-text)",
        fontFamily: "var(--r-font-sans)",
      }}
    >
      {/* Announcement Banner */}
      <div
        className="relative flex items-center justify-center px-4 py-2.5 text-white text-sm"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #7c3aed 100%)",
          fontFamily: "var(--r-font-mono)",
        }}
      >
        <span className="tracking-wide text-xs sm:text-sm font-medium">
          ANNOUNCING VITE+ ALPHA: OPEN SOURCE. UNIFIED. NEXT-GEN.
        </span>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>

      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-6 lg:px-12 py-4"
        style={{ borderBottom: "1px solid var(--r-border)" }}
      >
        <span
          className="text-xl font-black tracking-[-0.04em]"
          style={{ fontFamily: "var(--r-font-mono)" }}
        >
          VOID(0)
        </span>
        <div
          className="hidden md:flex items-center gap-8 text-sm font-medium"
          style={{ color: "var(--r-text-muted)" }}
        >
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">
            Open Source
          </a>
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">
            Blog
          </a>
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">
            About
          </a>
        </div>
        <div className="flex items-center gap-4" style={{ color: "var(--r-text-muted)" }}>
          <a href="#" className="hover:text-[var(--r-text)] transition-colors" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a href="#" className="hover:text-[var(--r-text)] transition-colors" aria-label="X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="#" className="hover:text-[var(--r-text)] transition-colors" aria-label="Discord">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 lg:px-12 pt-24 pb-20 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-medium tracking-wider uppercase"
          style={{
            background: "var(--r-surface)",
            borderRadius: "var(--r-radius-lg)",
            border: "1px solid var(--r-border)",
            fontFamily: "var(--r-font-mono)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#22c55e" }}
          />
          <span style={{ color: "var(--r-text-muted)" }}>prod server</span>
          <span style={{ color: "var(--r-border)" }}>/</span>
          <span style={{ color: "#22c55e" }}>running</span>
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.95] mb-6"
          style={{ color: "var(--r-text)" }}
        >
          The JavaSc
          <span style={{ color: "var(--r-primary)" }}>ript</span>
          <br />
          Tooling Com
          <span style={{ color: "var(--r-primary)" }}>pany</span>
        </h1>

        <p
          className="max-w-xl mx-auto text-lg leading-relaxed"
          style={{ color: "var(--r-text-muted)" }}
        >
          Building the next generation of JavaScript tooling.
          Open source, unified, and blazing fast.
        </p>
      </section>

      {/* Product Diagram */}
      <section className="px-6 lg:px-12 py-20" style={{ borderTop: "1px solid var(--r-border)" }}>
        <div className="max-w-4xl mx-auto" style={{ perspective: "1200px" }}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Left column */}
            <div className="flex flex-col gap-4 items-end">
              {["Vite+", "Vite", "OXC"].map((name) => (
                <div
                  key={name}
                  className="relative px-6 py-3 text-sm font-semibold"
                  style={{
                    background: "var(--r-surface)",
                    border: "1px solid var(--r-border)",
                    borderRadius: "var(--r-radius)",
                    fontFamily: "var(--r-font-mono)",
                    transform: "rotateY(-8deg) rotateX(4deg)",
                    boxShadow: "0 4px 16px rgba(124, 58, 237, 0.08)",
                  }}
                >
                  {name}
                  <div
                    className="absolute right-[-24px] top-1/2 w-6 h-px"
                    style={{ background: "var(--r-border)" }}
                  />
                </div>
              ))}
            </div>

            {/* Center hub */}
            <div
              className="w-20 h-20 flex items-center justify-center text-white font-bold text-xs rounded-full shrink-0"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                boxShadow: "0 0 40px rgba(124, 58, 237, 0.3)",
              }}
            >
              VOID
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4 items-start">
              {["Vitest", "Rolldown"].map((name) => (
                <div
                  key={name}
                  className="relative px-6 py-3 text-sm font-semibold"
                  style={{
                    background: "var(--r-surface)",
                    border: "1px solid var(--r-border)",
                    borderRadius: "var(--r-radius)",
                    fontFamily: "var(--r-font-mono)",
                    transform: "rotateY(8deg) rotateX(4deg)",
                    boxShadow: "0 4px 16px rgba(124, 58, 237, 0.08)",
                  }}
                >
                  <div
                    className="absolute left-[-24px] top-1/2 w-6 h-px"
                    style={{ background: "var(--r-border)" }}
                  />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section
        className="px-6 lg:px-12 py-16 text-center"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <p
          className="text-xs font-medium tracking-[0.2em] uppercase mb-8"
          style={{ color: "var(--r-text-muted)" }}
        >
          Trusted by
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-10 text-sm font-medium tracking-wider"
          style={{ color: "var(--r-text-muted)", fontFamily: "var(--r-font-mono)" }}
        >
          {["Shopify", "OpenAI", "Framer", "Linear", "Google"].map((name) => (
            <span key={name} className="opacity-60 hover:opacity-100 transition-opacity">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section
        className="px-6 lg:px-12 py-20"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Blazing Fast",
              desc: "Native-speed tooling powered by Rust. Build times measured in milliseconds, not seconds.",
            },
            {
              title: "Unified Toolchain",
              desc: "One cohesive system for bundling, transpiling, linting, formatting, and testing.",
            },
            {
              title: "Type Safe",
              desc: "First-class TypeScript support with zero-config type checking built into every tool.",
            },
            {
              title: "Plugin System",
              desc: "Extensible architecture with a universal plugin interface compatible across all tools.",
            },
            {
              title: "Dev Server",
              desc: "Instant server startup with true on-demand compilation and sub-millisecond HMR.",
            },
            {
              title: "Production Build",
              desc: "Optimized output with tree-shaking, code splitting, and asset optimization out of the box.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="p-6 transition-all hover:translate-y-[-2px]"
              style={{
                background: "var(--r-surface)",
                border: "1px solid var(--r-border)",
                borderRadius: "var(--r-radius-lg)",
                boxShadow: "var(--r-shadow)",
              }}
            >
              <h3 className="text-lg font-bold mb-2">{card.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Large Statement */}
      <section
        className="px-6 lg:px-12 py-28 text-center"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <h2
          className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.05] max-w-4xl mx-auto"
          style={{ color: "var(--r-text)" }}
        >
          A new species of JavaScript tooling.
        </h2>
      </section>

      {/* Gradient Banner */}
      <section
        className="py-20 flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 40%, #c084fc 100%)",
        }}
      >
        <span
          className="text-3xl sm:text-4xl font-black text-white tracking-[-0.04em]"
          style={{ fontFamily: "var(--r-font-mono)" }}
        >
          VOID(0)
        </span>
      </section>

      {/* Footer */}
      <footer
        className="px-6 lg:px-12 py-16"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span
              className="text-lg font-black tracking-[-0.04em]"
              style={{ fontFamily: "var(--r-font-mono)" }}
            >
              VOID(0)
            </span>
          </div>
          <div>
            <h4
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
              style={{ color: "var(--r-text-muted)" }}
            >
              Product
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--r-text-muted)" }}>
              <li><a href="#" className="hover:text-[var(--r-text)]">Vite</a></li>
              <li><a href="#" className="hover:text-[var(--r-text)]">Vitest</a></li>
              <li><a href="#" className="hover:text-[var(--r-text)]">Rolldown</a></li>
              <li><a href="#" className="hover:text-[var(--r-text)]">OXC</a></li>
            </ul>
          </div>
          <div>
            <h4
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
              style={{ color: "var(--r-text-muted)" }}
            >
              Company
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--r-text-muted)" }}>
              <li><a href="#" className="hover:text-[var(--r-text)]">About</a></li>
              <li><a href="#" className="hover:text-[var(--r-text)]">Blog</a></li>
              <li><a href="#" className="hover:text-[var(--r-text)]">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
              style={{ color: "var(--r-text-muted)" }}
            >
              Social
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--r-text-muted)" }}>
              <li><a href="#" className="hover:text-[var(--r-text)]">GitHub</a></li>
              <li><a href="#" className="hover:text-[var(--r-text)]">X / Twitter</a></li>
              <li><a href="#" className="hover:text-[var(--r-text)]">Discord</a></li>
            </ul>
          </div>
        </div>
        <div
          className="max-w-6xl mx-auto mt-12 pt-6 text-xs"
          style={{ borderTop: "1px solid var(--r-border)", color: "var(--r-text-muted)" }}
        >
          © 2024 VoidZero Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
