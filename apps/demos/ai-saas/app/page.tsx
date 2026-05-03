export default function Page() {
  return (
    <div className="min-h-screen" style={{ background: "var(--r-background)", color: "var(--r-text)" }}>
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md"
        style={{ borderBottom: "1px solid var(--r-border)", background: "rgba(10,10,15,0.8)" }}
      >
        <div className="flex items-center gap-2">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" fill="var(--r-primary)" />
            <circle cx="4" cy="4" r="2" fill="var(--r-primary)" opacity="0.6" />
            <circle cx="20" cy="4" r="2" fill="var(--r-primary)" opacity="0.6" />
            <circle cx="4" cy="20" r="2" fill="var(--r-primary)" opacity="0.6" />
            <circle cx="20" cy="20" r="2" fill="var(--r-primary)" opacity="0.6" />
            <line x1="9" y1="9" x2="5.5" y2="5.5" stroke="var(--r-primary)" strokeWidth="1.5" opacity="0.5" />
            <line x1="15" y1="9" x2="18.5" y2="5.5" stroke="var(--r-primary)" strokeWidth="1.5" opacity="0.5" />
            <line x1="9" y1="15" x2="5.5" y2="18.5" stroke="var(--r-primary)" strokeWidth="1.5" opacity="0.5" />
            <line x1="15" y1="15" x2="18.5" y2="18.5" stroke="var(--r-primary)" strokeWidth="1.5" opacity="0.5" />
          </svg>
          <span className="text-lg font-semibold">Sigil AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--r-text-muted)" }}>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-white transition-colors">Docs</a>
        </div>
        <button
          className="px-4 py-2 text-sm font-medium transition-all hover:opacity-90"
          style={{
            background: "var(--r-primary)",
            color: "var(--r-background)",
            borderRadius: "var(--r-radius-sm)",
          }}
        >
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(155,153,232,0.15), transparent 60%)",
          }}
        />
        <span
          className="mb-4 inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase"
          style={{
            background: "rgba(155,153,232,0.1)",
            color: "var(--r-primary)",
            borderRadius: "var(--r-radius)",
            border: "1px solid rgba(155,153,232,0.2)",
          }}
        >
          Now in public beta
        </span>
        <h1 className="max-w-3xl text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          Ship AI features{" "}
          <span style={{ color: "var(--r-primary)" }}>in minutes</span>
        </h1>
        <p
          className="mt-6 max-w-xl text-lg leading-relaxed"
          style={{ color: "var(--r-text-muted)" }}
        >
          Drop-in components for embeddings, chat, RAG, and agents.
          Beautiful defaults. Full control when you need it.
        </p>
        <div className="mt-10 flex gap-4">
          <button
            className="px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02]"
            style={{
              background: "var(--r-primary)",
              color: "var(--r-background)",
              borderRadius: "var(--r-radius-sm)",
              boxShadow: "0 0 24px rgba(155,153,232,0.3)",
            }}
          >
            Start building
          </button>
          <button
            className="px-6 py-3 text-sm font-semibold transition-all hover:bg-white/5"
            style={{
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-sm)",
              color: "var(--r-text-muted)",
            }}
          >
            View docs →
          </button>
        </div>

        {/* 3D Box */}
        <div className="relative mt-20 w-64 h-48" style={{ perspective: "600px" }}>
          <div
            className="absolute inset-0 transition-transform duration-700 hover:rotate-y-6"
            style={{
              transform: "rotateX(12deg) rotateY(-8deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, var(--r-surface), rgba(155,153,232,0.1))",
                border: "1px solid var(--r-border)",
                borderRadius: "var(--r-radius)",
                boxShadow: "var(--r-shadow)",
              }}
            />
            <div
              className="absolute inset-x-4 top-4 h-3 rounded"
              style={{ background: "rgba(155,153,232,0.2)" }}
            />
            <div
              className="absolute inset-x-4 top-10 h-2 w-3/4 rounded"
              style={{ background: "rgba(155,153,232,0.1)" }}
            />
            <div
              className="absolute bottom-4 left-4 right-4 h-16 rounded-lg"
              style={{ background: "rgba(155,153,232,0.05)", border: "1px solid var(--r-border)" }}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold mb-4">Everything you need</h2>
          <p className="text-center mb-16" style={{ color: "var(--r-text-muted)" }}>
            Production-ready AI components, designed for developers.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Embeddings",
                desc: "Vector search with semantic understanding. Index your data in seconds.",
                icon: "◆",
              },
              {
                title: "Chat Interface",
                desc: "Streaming chat UI with markdown, code blocks, and tool calls built in.",
                icon: "◈",
              },
              {
                title: "RAG Pipeline",
                desc: "Retrieval-augmented generation with automatic chunking and ranking.",
                icon: "◇",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group p-6 transition-all hover:translate-y-[-2px]"
                style={{
                  background: "var(--r-surface)",
                  border: "1px solid var(--r-border)",
                  borderRadius: "var(--r-radius)",
                }}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center text-lg"
                  style={{
                    background: "rgba(155,153,232,0.1)",
                    borderRadius: "var(--r-radius-sm)",
                    color: "var(--r-primary)",
                  }}
                >
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold mb-4">Simple pricing</h2>
          <p className="text-center mb-16" style={{ color: "var(--r-text-muted)" }}>
            Start free, scale when you're ready.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Hobby", price: "$0", desc: "For side projects", features: ["1,000 embeddings", "100 chat messages/mo", "Community support"] },
              { name: "Pro", price: "$49", desc: "For growing products", features: ["100K embeddings", "Unlimited chat", "Priority support", "Custom models"], highlighted: true },
              { name: "Enterprise", price: "Custom", desc: "For teams at scale", features: ["Unlimited everything", "SSO & RBAC", "SLA guarantee", "Dedicated support"] },
            ].map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col p-6"
                style={{
                  background: "var(--r-surface)",
                  border: tier.highlighted
                    ? "1px solid var(--r-primary)"
                    : "1px solid var(--r-border)",
                  borderRadius: "var(--r-radius)",
                  boxShadow: tier.highlighted
                    ? "0 0 32px rgba(155,153,232,0.15)"
                    : "none",
                }}
              >
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className="text-sm mt-1" style={{ color: "var(--r-text-muted)" }}>
                  {tier.desc}
                </p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== "Custom" && (
                    <span className="text-sm" style={{ color: "var(--r-text-muted)" }}>
                      /month
                    </span>
                  )}
                </div>
                <ul className="flex-1 space-y-3 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span style={{ color: "var(--r-primary)" }}>✓</span>
                      <span style={{ color: "var(--r-text-muted)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-2.5 text-sm font-medium transition-all"
                  style={{
                    background: tier.highlighted ? "var(--r-primary)" : "transparent",
                    color: tier.highlighted ? "var(--r-background)" : "var(--r-text)",
                    border: tier.highlighted ? "none" : "1px solid var(--r-border)",
                    borderRadius: "var(--r-radius-sm)",
                  }}
                >
                  {tier.name === "Enterprise" ? "Contact sales" : "Get started"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-12"
        style={{ borderTop: "1px solid var(--r-border)" }}
      >
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="5" fill="var(--r-primary)" />
              <circle cx="4" cy="4" r="2" fill="var(--r-primary)" opacity="0.6" />
              <circle cx="20" cy="4" r="2" fill="var(--r-primary)" opacity="0.6" />
              <circle cx="4" cy="20" r="2" fill="var(--r-primary)" opacity="0.6" />
              <circle cx="20" cy="20" r="2" fill="var(--r-primary)" opacity="0.6" />
              <line x1="9" y1="9" x2="5.5" y2="5.5" stroke="var(--r-primary)" strokeWidth="1.5" opacity="0.5" />
              <line x1="15" y1="9" x2="18.5" y2="5.5" stroke="var(--r-primary)" strokeWidth="1.5" opacity="0.5" />
              <line x1="9" y1="15" x2="5.5" y2="18.5" stroke="var(--r-primary)" strokeWidth="1.5" opacity="0.5" />
              <line x1="15" y1="15" x2="18.5" y2="18.5" stroke="var(--r-primary)" strokeWidth="1.5" opacity="0.5" />
            </svg>
            <span className="text-sm font-medium">Sigil AI</span>
          </div>
          <div className="flex gap-8 text-sm" style={{ color: "var(--r-text-muted)" }}>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
          <p className="text-xs" style={{ color: "var(--r-text-muted)" }}>
            © 2026 Sigil UI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
