"use client";

import { useState } from "react";

export default function Page() {
  const [activeWorkflow, setActiveWorkflow] = useState("create");

  const terminalOutputs: Record<string, string[]> = {
    create: [
      "$ vp create",
      "",
      "┌  Vite+ — Create a new project",
      "│",
      "◆  Select a template:",
      "│  ● React + TypeScript (recommended)",
      "│  ○ Vue + TypeScript",
      "│  ○ Svelte + TypeScript",
      "│  ○ Vanilla",
      "│",
      "◆  Project directory: ./my-app",
      "│",
      "◇  Dependencies installed via pnpm",
      "│",
      "└  Done in 1.2s",
    ],
    dev: [
      "$ vp dev",
      "",
      "  VITE+ v1.0.0  ready in 89ms",
      "",
      "  ➜  Local:   http://localhost:5173/",
      "  ➜  Network: http://192.168.1.5:5173/",
      "  ➜  press h + enter to show help",
    ],
    check: [
      "$ vp check",
      "",
      "  Checking types... done in 340ms",
      "  Linting... done in 120ms",
      "  Formatting... done in 80ms",
      "",
      "  ✓ No issues found",
    ],
    test: [
      "$ vp test",
      "",
      "  ✓ src/App.test.tsx (3 tests) 12ms",
      "  ✓ src/utils.test.ts (5 tests) 8ms",
      "",
      "  Test Files  2 passed (2)",
      "  Tests       8 passed (8)",
      "  Duration    340ms",
    ],
    build: [
      "$ vp build",
      "",
      "  vite+ v1.0.0 building for production...",
      "  ✓ 847 modules transformed.",
      "",
      "  dist/index.html        0.46 kB │ gzip:  0.30 kB",
      "  dist/assets/index.css  14.20 kB │ gzip:  3.84 kB",
      "  dist/assets/index.js   82.34 kB │ gzip: 26.12 kB",
      "",
      "  ✓ built in 420ms",
    ],
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--r-background)",
        color: "var(--r-text)",
        fontFamily: "var(--r-font-sans)",
      }}
    >
      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-6 lg:px-12 py-4"
        style={{ borderBottom: "1px solid var(--r-border)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-lg">⚡</span>
          <span className="text-lg font-bold tracking-tight">VITE+</span>
        </div>
        <div
          className="hidden md:flex items-center gap-6 text-sm font-medium"
          style={{ color: "var(--r-text-muted)" }}
        >
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">Guide</a>
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">Config</a>
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">Resources</a>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius)",
              color: "var(--r-text-muted)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Search
          </div>
          <a href="#" style={{ color: "var(--r-text-muted)" }} aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a href="#" style={{ color: "var(--r-text-muted)" }} aria-label="X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 lg:px-12 pt-24 pb-16 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.1), transparent 60%)",
          }}
        />
        <div
          className="relative mx-auto mb-6 w-16 h-16 flex items-center justify-center text-3xl"
          style={{
            background: "linear-gradient(135deg, #6366f1, #818cf8)",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(99, 102, 241, 0.25)",
          }}
        >
          ⚡
        </div>
        <h1 className="relative text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] leading-[1.0] mb-6">
          The{" "}
          <span style={{ color: "var(--r-primary)" }}>Uni</span>fied
          <br />
          Toolchain for{" "}
          <span style={{ color: "var(--r-primary)" }}>the</span>
          <br />
          <span style={{ color: "var(--r-primary)" }}>Web</span>
        </h1>
        <p
          className="relative max-w-lg mx-auto text-base leading-relaxed mb-2"
          style={{ color: "var(--r-text-muted)" }}
        >
          One command to create, develop, check, test, and build.
          Powered by Vite, OXC, and Rolldown.
        </p>
        <p
          className="relative max-w-md mx-auto text-sm leading-relaxed mb-8"
          style={{ color: "var(--r-text-muted)" }}
        >
          A single tool that replaces your bundler, linter, formatter,
          test runner, and type checker.
        </p>
        <div className="relative flex items-center justify-center gap-3">
          <button
            className="px-6 py-3 text-sm font-semibold text-white"
            style={{
              background: "var(--r-primary)",
              borderRadius: "var(--r-radius-lg)",
              border: "none",
            }}
          >
            Get started
          </button>
          <button
            className="px-6 py-3 text-sm font-semibold"
            style={{
              background: "transparent",
              color: "var(--r-text)",
              borderRadius: "var(--r-radius-lg)",
              border: "1px solid var(--r-border)",
            }}
          >
            Read the Announcement
          </button>
        </div>
      </section>

      {/* Terminal Demo */}
      <section className="px-6 lg:px-12 pb-4">
        <div
          className="max-w-2xl mx-auto overflow-hidden"
          style={{
            background: "#1b1b1f",
            borderRadius: "var(--r-radius-lg)",
            border: "1px solid #2e2e32",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid #2e2e32" }}>
            <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div className="p-5 text-sm leading-relaxed" style={{ fontFamily: "var(--r-font-mono)" }}>
            {terminalOutputs[activeWorkflow].map((line, i) => (
              <div key={i} className="whitespace-pre" style={{
                color: line.startsWith("$")
                  ? "#e4e4e7"
                  : line.includes("✓") || line.includes("✓") || line.includes("Done") || line.includes("ready")
                    ? "#10b981"
                  : line.includes("●")
                    ? "#6366f1"
                  : line.startsWith("  ➜")
                    ? "#818cf8"
                  : "#a1a1aa",
              }}>
                {line || "\u00A0"}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Tab Bar */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="flex items-center justify-center gap-1 max-w-2xl mx-auto pt-4">
          {["create", "dev", "check", "test", "build"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveWorkflow(tab)}
              className="px-4 py-2 text-sm font-medium transition-all"
              style={{
                background: activeWorkflow === tab ? "var(--r-primary)" : "var(--r-surface)",
                color: activeWorkflow === tab ? "#ffffff" : "var(--r-text-muted)",
                borderRadius: "var(--r-radius)",
                border: activeWorkflow === tab ? "none" : "1px solid var(--r-border)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Install Section */}
      <section
        className="px-6 lg:px-12 py-20"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p
              className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "var(--r-primary)", fontFamily: "var(--r-font-mono)" }}
            >
              Getting Started
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Install vp globally
            </h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--r-text-muted)" }}>
              The Vite+ CLI manages your runtime, package manager, and
              development tools in a single binary.
            </p>
            <p className="text-xs" style={{ color: "var(--r-text-muted)" }}>
              For CI, use{" "}
              <code
                className="px-1.5 py-0.5"
                style={{
                  background: "var(--r-surface)",
                  borderRadius: "var(--r-radius-sm)",
                  fontFamily: "var(--r-font-mono)",
                }}
              >
                setup-vp
              </code>
              .
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                label: "macOS / Linux",
                cmd: 'curl -fsSL https://get.viteplus.dev | sh',
              },
              {
                label: "Windows / PowerShell",
                cmd: "irm https://get.viteplus.dev/install.ps1 | iex",
              },
            ].map((block) => (
              <div key={block.label}>
                <p
                  className="text-xs font-medium mb-2"
                  style={{ color: "var(--r-text-muted)" }}
                >
                  {block.label}
                </p>
                <div
                  className="flex items-center justify-between px-4 py-3 text-sm"
                  style={{
                    background: "var(--r-surface)",
                    border: "1px solid var(--r-border)",
                    borderRadius: "var(--r-radius)",
                    fontFamily: "var(--r-font-mono)",
                  }}
                >
                  <code style={{ color: "var(--r-text)" }}>{block.cmd}</code>
                  <button
                    className="ml-3 px-2 py-1 text-xs shrink-0"
                    style={{
                      color: "var(--r-text-muted)",
                      background: "var(--r-background)",
                      border: "1px solid var(--r-border)",
                      borderRadius: "var(--r-radius-sm)",
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section
        className="px-6 lg:px-12 py-20"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Runtime & Package Manager */}
          <div
            className="p-6"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-lg)",
            }}
          >
            <h3 className="text-base font-semibold mb-3">
              Manages your runtime and package manager
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--r-text-muted)" }}>
              Pin exact Node.js versions and package managers per project. No more nvm, fnm, or corepack.
            </p>
            <div className="flex flex-wrap gap-2">
              {["pnpm", "npm", "yarn", "bun"].map((pm) => (
                <span
                  key={pm}
                  className="px-2.5 py-1 text-xs font-medium"
                  style={{
                    background: "var(--r-background)",
                    border: "1px solid var(--r-border)",
                    borderRadius: "var(--r-radius-sm)",
                    fontFamily: "var(--r-font-mono)",
                  }}
                >
                  {pm}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Simplifies Development */}
          <div
            className="p-6"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-lg)",
            }}
          >
            <h3 className="text-base font-semibold mb-3">
              Simplifies everyday development
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--r-text-muted)" }}>
              One CLI that wraps create, dev, check, test, and build. Consistent interface across all your projects.
            </p>
            <div className="flex flex-wrap gap-2">
              {["vp env", "vp install", "vp dev", "vp check", "vp test", "vp build"].map((cmd) => (
                <span
                  key={cmd}
                  className="px-2.5 py-1 text-xs font-medium"
                  style={{
                    background: "var(--r-primary)",
                    color: "#ffffff",
                    borderRadius: "var(--r-radius)",
                    fontFamily: "var(--r-font-mono)",
                  }}
                >
                  {cmd}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Frameworks */}
          <div
            className="p-6"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-lg)",
            }}
          >
            <h3 className="text-base font-semibold mb-3">
              Powering your favorite frameworks
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--r-text-muted)" }}>
              First-class templates for React, Vue, Svelte, Solid, Qwik, Astro, and more. Zero config to get started.
            </p>
            <div className="flex flex-wrap gap-3">
              {["React", "Vue", "Svelte", "Solid", "Qwik", "Astro"].map((fw) => (
                <div
                  key={fw}
                  className="w-10 h-10 flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "var(--r-background)",
                    border: "1px solid var(--r-border)",
                    borderRadius: "var(--r-radius)",
                    color: "var(--r-text-muted)",
                  }}
                >
                  {fw[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Features */}
      <section
        className="px-6 lg:px-12 py-20"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div
            className="p-8"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-lg)",
            }}
          >
            <h3 className="text-xl font-bold mb-3">A trusted stack to standardize on</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
              Vite+ is built on proven open-source foundations: Vite for dev serving
              and building, OXC for parsing and linting, Rolldown for bundling, and
              Vitest for testing. Each tool is best-in-class. Together, they form a
              cohesive, reliable foundation that engineering teams can adopt with confidence.
            </p>
          </div>
          <div
            className="p-8"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-lg)",
            }}
          >
            <h3 className="text-xl font-bold mb-3">Stay fast at scale</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
              Native-speed tooling means your build pipeline stays fast as your codebase
              grows. No more quadratic slowdowns from JavaScript-based tools. Vite+ scales
              linearly — 10x the code, same build time. CI pipelines finish in seconds,
              not minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 lg:px-12 py-16"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-1.5">
            <span className="text-lg">⚡</span>
            <span className="text-base font-bold tracking-tight">VITE+</span>
          </div>
          {[
            { heading: "Guide", links: ["Getting Started", "Installation", "CLI Reference", "Configuration"] },
            { heading: "Resources", links: ["Blog", "Changelog", "Roadmap", "Contributing"] },
            { heading: "Social", links: ["GitHub", "X / Twitter", "Discord", "Bluesky"] },
          ].map((col) => (
            <div key={col.heading}>
              <h4
                className="text-xs font-semibold tracking-wider uppercase mb-4"
                style={{ color: "var(--r-text-muted)" }}
              >
                {col.heading}
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "var(--r-text-muted)" }}>
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
          className="max-w-6xl mx-auto mt-12 pt-6 text-xs"
          style={{ borderTop: "1px solid var(--r-border)", color: "var(--r-text-muted)" }}
        >
          Released under the MIT License. Copyright © 2024 VoidZero Inc. & Vite+ Contributors.
        </div>
      </footer>
    </div>
  );
}
