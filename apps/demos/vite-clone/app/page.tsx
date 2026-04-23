"use client";

import { useState } from "react";

const installCommands: Record<string, string> = {
  npm: "$ npm create vite@latest",
  Yarn: "$ yarn create vite",
  pnpm: "$ pnpm create vite",
  Bun: "$ bun create vite",
  Deno: "$ deno init --npm vite",
};

export default function Page() {
  const [activeTab, setActiveTab] = useState("npm");

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
          background: "linear-gradient(135deg, #646cff 0%, #bd34fe 50%, #646cff 100%)",
          fontFamily: "var(--r-font-mono)",
        }}
      >
        <span className="tracking-wide text-xs sm:text-sm font-medium">
          ANNOUNCING VITE+ ALPHA — THE UNIFIED JAVASCRIPT TOOLCHAIN
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
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-label="lightning">
            ⚡
          </span>
          <span className="text-lg font-bold tracking-tight">VITE</span>
        </div>
        <div
          className="hidden md:flex items-center gap-6 text-sm font-medium"
          style={{ color: "var(--r-text-muted)" }}
        >
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">Guide</a>
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">Config</a>
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">Plugins</a>
          <a href="#" className="hover:text-[var(--r-text)] transition-colors">Resources</a>
          <span
            className="px-2 py-0.5 text-xs rounded"
            style={{ background: "var(--r-surface)", color: "var(--r-text-muted)" }}
          >
            v6.2
          </span>
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
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 lg:px-12 pt-24 pb-20 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(100, 108, 255, 0.15), transparent 70%)",
          }}
        />
        <p
          className="relative text-sm font-medium mb-4"
          style={{ color: "var(--r-text-muted)" }}
        >
          by <span style={{ color: "var(--r-secondary)" }}>VOID(0)</span>
        </p>
        <h1
          className="relative text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-[-0.04em] leading-[0.95] mb-6"
        >
          The Build Tool{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #646cff, #bd34fe)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            for the
          </span>
          <br />
          Web
        </h1>
        <p
          className="relative max-w-xl mx-auto text-lg leading-relaxed mb-8"
          style={{ color: "var(--r-text-muted)" }}
        >
          Vite is a build tool that aims to provide a faster and leaner development
          experience for modern web projects.
        </p>
        <div className="relative flex items-center justify-center gap-3">
          <button
            className="px-6 py-3 text-sm font-semibold transition-colors"
            style={{
              background: "var(--r-primary)",
              color: "#ffffff",
              borderRadius: "var(--r-radius-lg)",
              border: "none",
            }}
          >
            Get Started
          </button>
          <button
            className="px-6 py-3 text-sm font-semibold transition-colors"
            style={{
              background: "transparent",
              color: "var(--r-text)",
              borderRadius: "var(--r-radius-lg)",
              border: "1px solid var(--r-border)",
            }}
          >
            View on GitHub
          </button>
        </div>
      </section>

      {/* Tabbed Install Command */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-xl mx-auto">
          <div
            className="flex items-center gap-0 text-sm overflow-x-auto"
            style={{
              borderBottom: "1px solid var(--r-border)",
            }}
          >
            {Object.keys(installCommands).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors"
                style={{
                  color: activeTab === tab ? "var(--r-primary)" : "var(--r-text-muted)",
                  borderBottom: activeTab === tab ? "2px solid var(--r-primary)" : "2px solid transparent",
                  background: "transparent",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div
            className="p-4 text-sm"
            style={{
              background: "var(--r-surface)",
              borderRadius: "0 0 var(--r-radius) var(--r-radius)",
              fontFamily: "var(--r-font-mono)",
              color: "var(--r-text-muted)",
            }}
          >
            {installCommands[activeTab]}
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section
        className="px-6 lg:px-12 py-16 text-center"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <p
          className="text-sm mb-8"
          style={{ color: "var(--r-text-muted)" }}
        >
          Trusted by the world&apos;s best software teams
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-10 text-sm font-medium"
          style={{ color: "var(--r-text-muted)", fontFamily: "var(--r-font-mono)" }}
        >
          {["Google", "Apple", "Shopify", "Cloudflare", "Stripe", "GitLab"].map((name) => (
            <span key={name} className="opacity-50 hover:opacity-100 transition-opacity">
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
              icon: "⚡",
              title: "Instant Server Start",
              desc: "On demand file serving over native ESM, no bundling required during development.",
            },
            {
              icon: "🔥",
              title: "Lightning Fast HMR",
              desc: "Hot Module Replacement that stays fast regardless of app size. Updates in milliseconds.",
            },
            {
              icon: "🛠",
              title: "Rich Features",
              desc: "Out-of-the-box support for TypeScript, JSX, CSS, and more. No configuration needed.",
            },
            {
              icon: "📦",
              title: "Optimized Build",
              desc: "Pre-configured Rolldown build with multi-page and library mode support.",
            },
            {
              icon: "🔌",
              title: "Universal Plugins",
              desc: "Shared plugin interface between dev and build powered by a superset of Rollup's plugin API.",
            },
            {
              icon: "🏷",
              title: "Fully Typed APIs",
              desc: "Flexible programmatic APIs with full TypeScript typing for a robust developer experience.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="p-6 transition-all hover:translate-y-[-2px]"
              style={{
                background: "var(--r-surface)",
                border: "1px solid var(--r-border)",
                borderRadius: "var(--r-radius-lg)",
              }}
            >
              <div className="text-2xl mb-3">{card.icon}</div>
              <h3 className="text-base font-semibold mb-2">{card.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 lg:px-12 py-24 text-center"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
          Ready to get started?
        </h2>
        <button
          className="px-8 py-3 text-sm font-semibold"
          style={{
            background: "var(--r-primary)",
            color: "#ffffff",
            borderRadius: "var(--r-radius-lg)",
            border: "none",
          }}
        >
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer
        className="px-6 lg:px-12 py-16"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-2">
            <span className="text-lg">⚡</span>
            <span className="text-base font-bold tracking-tight">VITE</span>
          </div>
          {[
            { heading: "Guide", links: ["Getting Started", "Features", "CLI", "Using Plugins"] },
            { heading: "Resources", links: ["Team", "Releases", "Community", "DEV.to"] },
            { heading: "Social", links: ["GitHub", "X / Twitter", "Discord", "Mastodon"] },
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
          Released under the MIT License. Copyright © 2024 Evan You & Vite Contributors.
        </div>
      </footer>
    </div>
  );
}
