export default function Page() {
  return (
    <div className="min-h-screen relative" style={{ background: "var(--r-background)", color: "var(--r-text)" }}>
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Navbar */}
      <nav
        className="relative z-10 flex items-center justify-between px-8 py-5"
        style={{ borderBottom: "1px solid var(--r-border)" }}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <div
              className="absolute inset-0 rotate-45"
              style={{ background: "var(--r-primary)", borderRadius: "4px" }}
            />
          </div>
          <span className="text-lg font-semibold tracking-tight">Sigil Labs</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--r-text-muted)" }}>
          <a href="#" className="hover:text-white transition-colors">Services</a>
          <a href="#" className="hover:text-white transition-colors">Work</a>
          <a href="#" className="hover:text-white transition-colors">Process</a>
          <a href="#" className="hover:text-white transition-colors">Team</a>
        </div>
        <button
          className="px-4 py-2 text-sm font-medium"
          style={{
            background: "var(--r-primary)",
            color: "var(--r-background)",
            borderRadius: "var(--r-radius-sm)",
          }}
        >
          Start a project
        </button>
      </nav>

      {/* Hero with isometric diagram */}
      <section className="relative z-10 px-8 pt-32 pb-40">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="inline-block px-3 py-1 text-xs font-mono tracking-wider uppercase mb-6"
              style={{
                border: "1px solid var(--r-border)",
                borderRadius: "var(--r-radius-sm)",
                color: "var(--r-text-muted)",
              }}
            >
              Design × Engineering
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              We build{" "}
              <span style={{ color: "var(--r-primary)" }}>infrastructure</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed max-w-lg" style={{ color: "var(--r-text-muted)" }}>
              Systems that scale. Interfaces that ship. We help teams build
              the technical foundations that let products grow without rewrites.
            </p>
            <div className="mt-10 flex gap-4">
              <button
                className="px-6 py-3 text-sm font-semibold"
                style={{
                  background: "var(--r-primary)",
                  color: "var(--r-background)",
                  borderRadius: "var(--r-radius-sm)",
                  boxShadow: "0 0 24px rgba(155,153,232,0.2)",
                }}
              >
                View our work
              </button>
              <button
                className="px-6 py-3 text-sm font-semibold"
                style={{
                  border: "1px solid var(--r-border)",
                  borderRadius: "var(--r-radius-sm)",
                  color: "var(--r-text-muted)",
                }}
              >
                Our process →
              </button>
            </div>
          </div>

          {/* Isometric diagram */}
          <div className="relative h-96" style={{ perspective: "800px" }}>
            {/* Base platform */}
            <div
              className="absolute bottom-12 left-8 right-8 h-4"
              style={{
                background: "rgba(155,153,232,0.08)",
                border: "1px solid var(--r-border)",
                borderRadius: "var(--r-radius-sm)",
                transform: "rotateX(60deg) rotateZ(-45deg)",
              }}
            />

            {/* Floating cards composition */}
            <div
              className="absolute top-8 left-0 w-48 p-4"
              style={{
                background: "var(--r-surface)",
                border: "1px solid var(--r-border)",
                borderRadius: "var(--r-radius)",
                boxShadow: "var(--r-shadow)",
                transform: "translateZ(20px)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full" style={{ background: "#22c55e" }} />
                <span className="text-xs font-mono" style={{ color: "var(--r-text-muted)" }}>API Gateway</span>
              </div>
              <div className="h-1.5 w-3/4 rounded mb-1.5" style={{ background: "rgba(155,153,232,0.2)" }} />
              <div className="h-1.5 w-1/2 rounded" style={{ background: "rgba(155,153,232,0.1)" }} />
            </div>

            <div
              className="absolute top-24 right-4 w-52 p-4"
              style={{
                background: "var(--r-surface)",
                border: "1px solid rgba(155,153,232,0.2)",
                borderRadius: "var(--r-radius)",
                boxShadow: "0 8px 32px rgba(155,153,232,0.1)",
                transform: "translateZ(40px)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full" style={{ background: "var(--r-primary)" }} />
                <span className="text-xs font-mono" style={{ color: "var(--r-text-muted)" }}>Auth Service</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 rounded"
                    style={{ background: `rgba(155,153,232,${0.05 + i * 0.03})` }}
                  />
                ))}
              </div>
            </div>

            <div
              className="absolute bottom-16 left-12 w-44 p-4"
              style={{
                background: "var(--r-surface)",
                border: "1px solid var(--r-border)",
                borderRadius: "var(--r-radius)",
                boxShadow: "var(--r-shadow)",
                transform: "translateZ(30px)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full" style={{ background: "#eab308" }} />
                <span className="text-xs font-mono" style={{ color: "var(--r-text-muted)" }}>Data Layer</span>
              </div>
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 rounded-sm"
                    style={{
                      height: `${20 + Math.sin(i) * 12}px`,
                      background: `rgba(155,153,232,${0.15 + i * 0.05})`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
              <line x1="96" y1="100" x2="210" y2="140" stroke="#9b99e8" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="210" y1="180" x2="120" y2="260" stroke="#9b99e8" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative z-10 px-8 py-24" style={{ borderTop: "1px solid var(--r-border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">What we do</h2>
              <p className="mt-3 text-sm" style={{ color: "var(--r-text-muted)" }}>
                End-to-end technical execution, from architecture to production.
              </p>
            </div>
            {[
              { title: "Platform Engineering", desc: "Cloud infrastructure, CI/CD, observability. We build the foundations your team deploys on." },
              { title: "Design Systems", desc: "Component libraries, design tokens, documentation. Consistent UI at any scale." },
              { title: "Product Development", desc: "Full-stack applications from prototype to production. TypeScript, React, Go." },
            ].map((svc) => (
              <div
                key={svc.title}
                className="p-6 transition-all hover:translate-y-[-2px]"
                style={{
                  background: "var(--r-surface)",
                  border: "1px solid var(--r-border)",
                  borderRadius: "var(--r-radius)",
                }}
              >
                <h3 className="font-semibold mb-3">{svc.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="relative z-10 px-8 py-16" style={{ borderTop: "1px solid var(--r-border)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "47", label: "Projects shipped" },
            { value: "12", label: "Enterprise clients" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "< 50ms", label: "P95 latency" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold" style={{ color: "var(--r-primary)" }}>{stat.value}</p>
              <p className="text-sm mt-1" style={{ color: "var(--r-text-muted)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-8 py-24" style={{ borderTop: "1px solid var(--r-border)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Ready to build?</h2>
          <p className="text-lg mb-8" style={{ color: "var(--r-text-muted)" }}>
            We partner with 3-4 teams at a time. Let's talk about your next project.
          </p>
          <button
            className="px-8 py-4 text-base font-semibold"
            style={{
              background: "var(--r-primary)",
              color: "var(--r-background)",
              borderRadius: "var(--r-radius-sm)",
              boxShadow: "0 0 32px rgba(155,153,232,0.25)",
            }}
          >
            Start a conversation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 px-8 py-10"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-sm font-medium">Sigil Labs</span>
          <div className="flex gap-8 text-sm" style={{ color: "var(--r-text-muted)" }}>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <p className="text-xs" style={{ color: "var(--r-text-muted)" }}>© 2026 Sigil Labs</p>
        </div>
      </footer>
    </div>
  );
}
