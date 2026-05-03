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

function ProjectPattern({ id, className }: { id: number; className?: string }) {
  const c = "var(--r-text)";

  switch (id) {
    case 1:
      return (
        <svg className={className} viewBox="0 0 200 160" width="100%" height="100%">
          {[20, 35, 50, 65, 80].map((r) => (
            <circle key={r} cx={100} cy={80} r={r} fill="none" stroke={c} strokeWidth={1} opacity={0.2} />
          ))}
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            return (
              <line key={i} x1={100 + 15 * Math.cos(a)} y1={80 + 15 * Math.sin(a)} x2={100 + 80 * Math.cos(a)} y2={80 + 80 * Math.sin(a)} stroke={c} strokeWidth={0.5} opacity={0.15} />
            );
          })}
          <circle cx={100} cy={80} r={4} fill={c} opacity={0.25} />
        </svg>
      );
    case 2:
      return (
        <svg className={className} viewBox="0 0 200 160" width="100%" height="100%">
          {Array.from({ length: 10 }, (_, row) =>
            Array.from({ length: 13 }, (_, col) => {
              const filled = (row * 7 + col * 13 + row * col) % 5 < 2;
              return (
                <rect key={`${row}-${col}`} x={col * 15 + 3} y={row * 15 + 5} width={12} height={12} fill={filled ? c : "none"} stroke={c} strokeWidth={0.5} opacity={filled ? 0.2 : 0.1} />
              );
            })
          )}
        </svg>
      );
    case 3:
      return (
        <svg className={className} viewBox="0 0 200 160" width="100%" height="100%">
          {(
            [
              [15, [[20, 35, 0.15], [60, 50, 0.15], [120, 25, 0.15]]],
              [28, [[30, 20, 0.15], [55, 65, 0.15]]],
              [41, [[30, 40, 0.3], [80, 30, 0.15], [120, 45, 0.15]]],
              [54, [[40, 25, 0.15], [70, 55, 0.3]]],
              [67, [[40, 80, 0.15]]],
              [80, [[30, 15, 0.15], [50, 40, 0.3], [100, 20, 0.15]]],
              [93, [[30, 60, 0.15], [100, 30, 0.15]]],
              [106, [[20, 45, 0.3], [75, 25, 0.15]]],
              [119, [[20, 30, 0.15], [60, 70, 0.15]]],
              [132, [[20, 55, 0.15]]],
              [145, [[20, 20, 0.15], [50, 35, 0.3]]],
            ] as [number, number[][]][]
          ).map(([y, segs]) =>
            segs.map(([x, w, o], i) => (
              <rect key={`${y}-${i}`} x={x} y={y} width={w} height={4} fill={c} opacity={o} rx={1} />
            ))
          )}
        </svg>
      );
    case 4:
      return (
        <svg className={className} viewBox="0 0 200 160" width="100%" height="100%">
          {([
            [20, 10, 160, 25, 0.25],
            [20, 40, 75, 35, 0.15],
            [100, 40, 80, 35, 0.2],
            [20, 80, 50, 20, 0.15],
            [75, 80, 50, 20, 0.25],
            [130, 80, 50, 20, 0.15],
            [20, 105, 110, 15, 0.2],
            [135, 105, 45, 15, 0.15],
            [20, 125, 35, 30, 0.15],
            [60, 125, 60, 30, 0.25],
            [125, 125, 55, 30, 0.15],
          ] as number[][]).map(([x, y, w, h, o], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill="none" stroke={c} strokeWidth={1.5} opacity={o} />
          ))}
        </svg>
      );
    case 5:
      return (
        <svg className={className} viewBox="0 0 200 160" width="100%" height="100%">
          {[40, 60, 100, 120].map((y) => (
            <line key={y} x1={0} y1={y} x2={200} y2={y} stroke={c} strokeWidth={0.5} opacity={0.08} />
          ))}
          <polyline
            points="0,80 30,80 40,80 50,60 60,100 70,40 80,120 90,55 100,80 110,80 130,80 140,75 150,85 160,80 200,80"
            fill="none"
            stroke={c}
            strokeWidth={2}
            opacity={0.25}
          />
          <polyline
            points="0,80 30,80 40,80 50,60 60,100 70,40 80,120 90,55 100,80 110,80 130,80 140,75 150,85 160,80 200,80"
            fill="none"
            stroke={c}
            strokeWidth={6}
            opacity={0.06}
          />
        </svg>
      );
    case 6:
      return (
        <svg className={className} viewBox="0 0 200 160" width="100%" height="100%">
          {[
            "M100,80 C115,65 130,60 140,65 C150,70 155,80 150,90 C145,100 130,105 115,100 C105,95 95,85 100,80Z",
            "M90,80 C105,55 135,45 155,55 C170,65 175,85 165,100 C155,115 130,120 110,112 C95,105 80,95 90,80Z",
            "M75,85 C90,45 135,30 165,45 C185,55 195,80 180,105 C165,130 125,140 100,128 C80,118 65,100 75,85Z",
            "M60,90 C75,35 130,15 170,35 C200,50 210,85 195,115 C175,145 120,158 85,140 C60,125 50,108 60,90Z",
            "M45,95 C60,25 125,0 175,25 C215,45 225,90 205,125 C185,160 115,175 70,150 C40,130 35,110 45,95Z",
          ].map((d, i) => (
            <path key={i} d={d} fill="none" stroke={c} strokeWidth={1} opacity={0.25 - i * 0.03} />
          ))}
        </svg>
      );
    default:
      return null;
  }
}

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
                <ProjectPattern id={project.id} className="opacity-60 group-hover:opacity-100 transition-opacity" />
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
              <ProjectPattern id={selected.id} />
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
