export default function Page() {
  const terminalLines = [
    { type: "prompt", text: "$ bolt install react next tailwindcss" },
    { type: "output", text: "  ◆ Resolving dependencies..." },
    { type: "output", text: "  ◆ Downloading 847 packages..." },
    { type: "success", text: "  ✓ Installed 847 packages in 1.2s" },
    { type: "blank", text: "" },
    { type: "prompt", text: "$ bolt dev" },
    { type: "output", text: "  ◆ Starting dev server..." },
    { type: "success", text: "  ✓ Ready on http://localhost:3000 (240ms)" },
  ];

  const commands = [
    { cmd: "bolt init", desc: "Initialize a new project with bolt.config.ts", flags: "--template, --preset" },
    { cmd: "bolt install", desc: "Install dependencies with automatic lockfile resolution", flags: "--frozen, --dev, --save-exact" },
    { cmd: "bolt dev", desc: "Start the development server with HMR", flags: "--port, --host, --https" },
    { cmd: "bolt build", desc: "Create a production build with tree-shaking", flags: "--analyze, --sourcemap" },
    { cmd: "bolt publish", desc: "Publish packages to npm with changelog generation", flags: "--tag, --access, --otp" },
    { cmd: "bolt run", desc: "Execute scripts defined in package.json", flags: "--filter, --parallel" },
  ];

  const configCode = `// bolt.config.ts
import { defineConfig } from "bolt";

export default defineConfig({
  // Package manager configuration
  nodeLinker: "hoisted",
  shamefullyHoist: false,

  // Build settings
  build: {
    target: "es2022",
    sourcemap: true,
    minify: "oxc",
  },

  // Dev server
  dev: {
    port: 3000,
    hmr: { overlay: true },
  },

  // Workspace settings
  workspace: {
    packages: ["packages/*", "apps/*"],
    catalog: true,
  },
});`;

  return (
    <div className="min-h-screen" style={{ background: "var(--s-background)", color: "var(--s-text)" }}>
      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid var(--s-border)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold" style={{ fontFamily: "var(--s-font-mono)", color: "var(--s-primary)" }}>
            ⚡ bolt
          </span>
          <span
            className="text-xs px-2 py-0.5"
            style={{
              background: "rgba(59,130,246,0.1)",
              color: "var(--s-primary)",
              borderRadius: "var(--s-radius-sm)",
              fontFamily: "var(--s-font-mono)",
            }}
          >
            v3.0.0
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "var(--s-text-muted)" }}>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-16 text-center">
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight"
          style={{ fontFamily: "var(--s-font-mono)" }}
        >
          <span style={{ color: "var(--s-primary)" }}>bolt</span>
          <span className="text-3xl md:text-5xl" style={{ color: "var(--s-text-muted)" }}> — the fastest</span>
          <br />
          <span>package manager</span>
        </h1>
        <p
          className="mt-6 max-w-lg mx-auto text-lg"
          style={{ color: "var(--s-text-muted)" }}
        >
          10x faster installs. Intelligent caching. Zero-config monorepo support.
          Drop-in replacement for npm, yarn, and pnpm.
        </p>

        {/* Install command */}
        <div
          className="mt-10 inline-flex items-center gap-3 px-5 py-3"
          style={{
            background: "var(--s-surface)",
            border: "1px solid var(--s-border)",
            borderRadius: "var(--s-radius-md)",
            fontFamily: "var(--s-font-mono)",
          }}
        >
          <span style={{ color: "var(--s-text-muted)" }}>$</span>
          <span>curl -fsSL https://bolt.dev/install | sh</span>
          <button
            className="ml-2 px-2 py-1 text-xs hover:bg-white/5 transition-colors"
            style={{
              border: "1px solid var(--s-border)",
              borderRadius: "var(--s-radius-sm)",
              color: "var(--s-text-muted)",
            }}
          >
            Copy
          </button>
        </div>
      </section>

      {/* Terminal */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <div
            className="overflow-hidden"
            style={{
              background: "#0c0c1a",
              border: "1px solid var(--s-border)",
              borderRadius: "var(--s-radius-md)",
              boxShadow: "0 8px 48px rgba(59,130,246,0.1)",
            }}
          >
            {/* Terminal header */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: "1px solid var(--s-border)" }}
            >
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
              </div>
              <span className="ml-2 text-xs" style={{ color: "var(--s-text-muted)", fontFamily: "var(--s-font-mono)" }}>
                ~/my-project
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-4 space-y-1" style={{ fontFamily: "var(--s-font-mono)", fontSize: "0.8125rem" }}>
              {terminalLines.map((line, i) => (
                <div key={i}>
                  {line.type === "blank" ? (
                    <br />
                  ) : (
                    <span
                      style={{
                        color:
                          line.type === "prompt"
                            ? "var(--s-text)"
                            : line.type === "success"
                              ? "#22c55e"
                              : "var(--s-text-muted)",
                      }}
                    >
                      {line.text}
                    </span>
                  )}
                </div>
              ))}
              <div className="flex items-center mt-2">
                <span style={{ color: "var(--s-text)" }}>$ </span>
                <span
                  className="ml-1 w-2 h-4 inline-block animate-pulse"
                  style={{ background: "var(--s-primary)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmarks */}
      <section className="px-6 py-20" style={{ borderTop: "1px solid var(--s-border)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Benchmarks</h2>
          <div className="space-y-4">
            {[
              { name: "bolt", time: "1.2s", pct: 100 },
              { name: "pnpm", time: "8.4s", pct: 14 },
              { name: "yarn", time: "12.1s", pct: 10 },
              { name: "npm", time: "18.7s", pct: 6 },
            ].map((b) => (
              <div key={b.name} className="flex items-center gap-4">
                <span className="w-12 text-sm text-right" style={{ fontFamily: "var(--s-font-mono)", color: "var(--s-text-muted)" }}>
                  {b.name}
                </span>
                <div className="flex-1 h-8 relative" style={{ background: "var(--s-surface)", borderRadius: "var(--s-radius-sm)" }}>
                  <div
                    className="h-full flex items-center px-3"
                    style={{
                      width: `${b.pct}%`,
                      minWidth: "60px",
                      background: b.name === "bolt" ? "var(--s-primary)" : "rgba(59,130,246,0.15)",
                      borderRadius: "var(--s-radius-sm)",
                    }}
                  >
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: b.name === "bolt" ? "#050510" : "var(--s-text-muted)" }}
                    >
                      {b.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center mt-4" style={{ color: "var(--s-text-muted)" }}>
            Cold install, 847 packages, no lockfile. M4 MacBook Pro.
          </p>
        </div>
      </section>

      {/* Config code block */}
      <section className="px-6 py-20" style={{ borderTop: "1px solid var(--s-border)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Configuration</h2>
          <p className="text-sm mb-6" style={{ color: "var(--s-text-muted)" }}>
            Zero config by default. Full control when you need it.
          </p>
          <div
            className="overflow-x-auto"
            style={{
              background: "#0c0c1a",
              border: "1px solid var(--s-border)",
              borderRadius: "var(--s-radius-md)",
            }}
          >
            <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: "1px solid var(--s-border)" }}>
              <span className="text-xs" style={{ color: "var(--s-text-muted)", fontFamily: "var(--s-font-mono)" }}>
                bolt.config.ts
              </span>
              <button className="text-xs px-2 py-1 rounded hover:bg-white/5 transition-colors" style={{ color: "var(--s-text-muted)" }}>
                Copy
              </button>
            </div>
            <pre
              className="p-4 text-sm leading-relaxed overflow-x-auto"
              style={{ fontFamily: "var(--s-font-mono)", color: "#cdd6f4" }}
            >
              <code>{configCode}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Command reference */}
      <section className="px-6 py-20" style={{ borderTop: "1px solid var(--s-border)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Command Reference</h2>
          <div
            className="overflow-x-auto"
            style={{
              background: "var(--s-surface)",
              border: "1px solid var(--s-border)",
              borderRadius: "var(--s-radius-md)",
            }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--s-border)" }}>
                  <th className="text-left px-5 py-3 font-medium text-xs uppercase tracking-wider" style={{ color: "var(--s-text-muted)" }}>Command</th>
                  <th className="text-left px-5 py-3 font-medium text-xs uppercase tracking-wider" style={{ color: "var(--s-text-muted)" }}>Description</th>
                  <th className="text-left px-5 py-3 font-medium text-xs uppercase tracking-wider" style={{ color: "var(--s-text-muted)" }}>Key Flags</th>
                </tr>
              </thead>
              <tbody>
                {commands.map((cmd, i) => (
                  <tr
                    key={cmd.cmd}
                    style={{
                      borderBottom: i < commands.length - 1 ? "1px solid var(--s-border)" : "none",
                    }}
                  >
                    <td className="px-5 py-3" style={{ fontFamily: "var(--s-font-mono)", color: "var(--s-primary)" }}>
                      {cmd.cmd}
                    </td>
                    <td className="px-5 py-3" style={{ color: "var(--s-text-muted)" }}>
                      {cmd.desc}
                    </td>
                    <td className="px-5 py-3 text-xs" style={{ fontFamily: "var(--s-font-mono)", color: "var(--s-text-muted)" }}>
                      {cmd.flags}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8" style={{ borderTop: "1px solid var(--s-border)" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-sm" style={{ fontFamily: "var(--s-font-mono)", color: "var(--s-primary)" }}>⚡ bolt</span>
          <div className="flex gap-6 text-sm" style={{ color: "var(--s-text-muted)" }}>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Changelog</a>
          </div>
          <p className="text-xs" style={{ color: "var(--s-text-muted)" }}>MIT License</p>
        </div>
      </footer>
    </div>
  );
}
