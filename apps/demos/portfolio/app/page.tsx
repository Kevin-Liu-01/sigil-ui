"use client";

import { useState } from "react";

const projects = [
  { id: 1, title: "VOID PROTOCOL", category: "BRANDING", year: "2025", desc: "A visual identity system for a decentralized compute network. Black and white typography with generative elements." },
  { id: 2, title: "GRIDLOCK", category: "WEB APP", year: "2025", desc: "Real-time collaboration canvas with brutalist UI patterns. 60fps pan-zoom with WebGL rendering." },
  { id: 3, title: "NEON SYNTAX", category: "DEV TOOL", year: "2024", desc: "A code editor theme engine that generates palettes from album art. 50K installs on VS Code Marketplace." },
  { id: 4, title: "CONCRETE", category: "DESIGN SYSTEM", year: "2024", desc: "A component library built on constraint-driven design. Zero border-radius, maximum information density." },
  { id: 5, title: "PULSE", category: "MOBILE APP", year: "2024", desc: "Health tracking with radical transparency. Shows raw sensor data alongside insights." },
  { id: 6, title: "TERRAFORM", category: "INSTALLATION", year: "2023", desc: "Generative landscape projected across a 40-meter warehouse wall. Written in Rust + wgpu." },
];

export default function Page() {
  const [selected, setSelected] = useState<typeof projects[number] | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--r-background)", color: "var(--r-text)" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "3px solid var(--r-border)" }}
      >
        <span className="text-xl font-black tracking-tighter uppercase">Portfolio</span>
        <div className="flex items-center gap-6 text-sm font-bold uppercase tracking-wider">
          <a href="#" className="hover:line-through transition-all">Work</a>
          <a href="#" className="hover:line-through transition-all">About</a>
          <a
            href="#"
            className="px-4 py-2 font-bold"
            style={{
              background: "var(--r-primary)",
              border: "2px solid var(--r-border)",
              boxShadow: "var(--r-shadow)",
            }}
          >
            Contact
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-20" style={{ borderBottom: "3px solid var(--r-border)" }}>
        <h1 className="text-6xl md:text-[8rem] font-black leading-[0.9] tracking-tighter uppercase">
          Selected<br />
          <span style={{ color: "var(--r-background)", WebkitTextStroke: "3px var(--r-text)" } as React.CSSProperties}>
            Work
          </span>
        </h1>
        <p className="mt-6 max-w-lg text-lg font-medium" style={{ color: "var(--r-text-muted)" }}>
          Design engineering at the intersection of systems thinking and visual culture.
          Everything ships.
        </p>
      </section>

      {/* Project Grid */}
      <section className="px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelected(project)}
              className="text-left p-6 transition-all hover:bg-[var(--r-primary)] group"
              style={{ border: "2px solid var(--r-border)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--r-text-muted)" }}>
                  {project.category}
                </span>
                <span className="text-xs font-mono">{project.year}</span>
              </div>
              <div
                className="w-full h-40 mb-4 flex items-center justify-center"
                style={{
                  background: "var(--r-surface)",
                  border: "2px solid var(--r-border)",
                }}
              >
                <span className="text-4xl font-black opacity-10 group-hover:opacity-30 transition-opacity">
                  {String(project.id).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">{project.title}</h3>
              <p className="mt-2 text-sm line-clamp-2" style={{ color: "var(--r-text-muted)" }}>
                {project.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Carousel / Horizontal scroll */}
      <section className="px-6 py-16" style={{ borderTop: "3px solid var(--r-border)" }}>
        <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Experiments</h2>
        <div className="flex gap-0 overflow-x-auto pb-4" style={{ scrollSnapType: "x mandatory" }}>
          {["GLITCH—01", "WAVE—02", "GRID—03", "PULSE—04", "VOID—05"].map((label, i) => (
            <div
              key={label}
              className="shrink-0 w-72 h-48 flex items-end p-4"
              style={{
                background: i % 2 === 0 ? "var(--r-text)" : "var(--r-primary)",
                border: "2px solid var(--r-border)",
                scrollSnapAlign: "start",
              }}
            >
              <span
                className="text-sm font-black uppercase tracking-widest"
                style={{ color: i % 2 === 0 ? "var(--r-background)" : "var(--r-text)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 flex items-center justify-between" style={{ borderTop: "3px solid var(--r-border)" }}>
        <span className="text-sm font-bold uppercase">© 2026</span>
        <div className="flex gap-6 text-sm font-bold uppercase">
          <a href="#" className="hover:line-through">GitHub</a>
          <a href="#" className="hover:line-through">Twitter</a>
          <a href="#" className="hover:line-through">Are.na</a>
        </div>
      </footer>

      {/* Dialog/Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg p-8"
            style={{
              background: "var(--r-background)",
              border: "3px solid var(--r-border)",
              boxShadow: "8px 8px 0px var(--r-border)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--r-text-muted)" }}>
                {selected.category} — {selected.year}
              </span>
              <button
                onClick={() => setSelected(null)}
                className="h-8 w-8 flex items-center justify-center font-bold text-lg hover:bg-[var(--r-primary)] transition-colors"
                style={{ border: "2px solid var(--r-border)" }}
              >
                ✕
              </button>
            </div>
            <div
              className="w-full h-48 mb-6 flex items-center justify-center"
              style={{ background: "var(--r-surface)", border: "2px solid var(--r-border)" }}
            >
              <span className="text-6xl font-black opacity-10">
                {String(selected.id).padStart(2, "0")}
              </span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">{selected.title}</h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
              {selected.desc}
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="px-6 py-3 text-sm font-bold uppercase"
                style={{
                  background: "var(--r-primary)",
                  border: "2px solid var(--r-border)",
                  boxShadow: "var(--r-shadow)",
                }}
              >
                View Project
              </a>
              <a
                href="#"
                className="px-6 py-3 text-sm font-bold uppercase"
                style={{ border: "2px solid var(--r-border)" }}
              >
                GitHub →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
