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
      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "3px solid var(--r-border)" }}
      >
        <span className="text-xl font-bold tracking-tighter uppercase">
          ◆ VELOCITY
        </span>
        <div className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-wider">
          <a href="#" className="hover:line-through">
            Product
          </a>
          <a href="#" className="hover:line-through">
            Pricing
          </a>
          <a href="#" className="hover:line-through">
            Company
          </a>
        </div>
        <button
          className="px-5 py-2.5 text-sm font-bold uppercase"
          style={{
            background: "var(--r-text)",
            color: "var(--r-background)",
            border: "2px solid var(--r-border)",
          }}
        >
          Get Access
        </button>
      </nav>

      {/* Hero with diamond shapes and acid yellow accents */}
      <section
        className="relative px-6 py-32 overflow-hidden"
        style={{ borderBottom: "3px solid var(--r-border)" }}
      >
        {/* Diamond decorations */}
        <div
          className="absolute top-8 right-16 w-16 h-16 rotate-45"
          style={{ border: "3px solid var(--r-border)" }}
        />
        <div
          className="absolute top-32 right-32 w-10 h-10 rotate-45"
          style={{
            background: "var(--r-primary)",
            border: "2px solid var(--r-border)",
          }}
        />
        <div
          className="absolute bottom-16 left-24 w-12 h-12 rotate-45"
          style={{ border: "2px solid var(--r-border)" }}
        />
        <div
          className="absolute bottom-32 left-8 w-8 h-8 rotate-45"
          style={{ background: "var(--r-primary)" }}
        />
        <div
          className="absolute top-1/2 right-8 w-6 h-6 rotate-45"
          style={{
            background: "var(--r-primary)",
            border: "2px solid var(--r-border)",
          }}
        />

        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-[7rem] font-bold leading-[0.85] tracking-tighter uppercase">
            Move fast.
            <br />
            Break{" "}
            <span className="relative inline-block">
              <span className="relative z-10">conventions.</span>
              <span
                className="absolute bottom-1 left-0 right-0 h-4 -z-0"
                style={{ background: "var(--r-primary)" }}
              />
            </span>
          </h1>
          <p
            className="mt-8 max-w-xl text-xl font-medium"
            style={{ color: "var(--r-text-muted)" }}
          >
            Brutalist design for teams that don&apos;t follow templates.
          </p>
          <div className="mt-12 flex gap-4">
            <button
              className="px-8 py-4 text-base font-bold uppercase"
              style={{
                background: "var(--r-primary)",
                border: "3px solid var(--r-border)",
                boxShadow: "6px 6px 0px var(--r-border)",
              }}
            >
              Start free →
            </button>
            <button
              className="px-8 py-4 text-base font-bold uppercase"
              style={{
                border: "3px solid var(--r-border)",
                boxShadow: "6px 6px 0px var(--r-border)",
              }}
            >
              Watch demo
            </button>
          </div>
        </div>
      </section>

      {/* Diagonal-cut divider + feature section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 -skew-y-3 origin-top-left"
          style={{ background: "var(--r-text)" }}
        />
        <div
          className="relative z-10 px-6 max-w-5xl mx-auto"
          style={{ color: "var(--r-background)" }}
        >
          <h2 className="text-4xl font-bold uppercase tracking-tight mb-16">
            Why Velocity?
          </h2>

          {/* Diamond-shaped feature cards */}
          <div className="grid md:grid-cols-3 gap-0">
            {[
              {
                num: "01",
                title: "INSTANT DEPLOYS",
                desc: "Push to main. See it live in 3 seconds. No build queues, no waiting.",
              },
              {
                num: "02",
                title: "EDGE-FIRST",
                desc: "Every function runs at the edge. 50ms response times from 300 PoPs globally.",
              },
              {
                num: "03",
                title: "ZERO CONFIG",
                desc: "Auto-detect frameworks. Auto-provision infrastructure. Just write code.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="relative p-8"
                style={{ border: "2px solid rgba(255,255,255,0.15)" }}
              >
                {/* Diamond accent in corner */}
                <div
                  className="absolute top-3 right-3 w-4 h-4 rotate-45"
                  style={{ background: "var(--r-primary)" }}
                />
                <span
                  className="text-5xl font-bold"
                  style={{ color: "var(--r-primary)" }}
                >
                  {item.num}
                </span>
                <h3 className="mt-4 text-lg font-bold uppercase tracking-wider">
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-sm"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagonal divider band */}
      <div
        className="relative h-16 overflow-hidden"
        style={{ background: "var(--r-primary)" }}
      >
        <div
          className="absolute inset-0 -skew-y-2 origin-bottom-right"
          style={{ background: "var(--r-background)" }}
        />
      </div>

      {/* Hexagonal grid decoration + stats */}
      <section
        className="px-6 py-24 relative"
        style={{ borderBottom: "3px solid var(--r-border)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold uppercase tracking-tight mb-6">
                Scale without limits
              </h2>
              <div className="space-y-6">
                {[
                  { stat: "2.4M", label: "Deployments per day" },
                  { stat: "99.99%", label: "Uptime guarantee" },
                  { stat: "< 50ms", label: "Cold start latency" },
                  { stat: "300+", label: "Edge locations" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline gap-4"
                    style={{
                      borderBottom: "2px solid var(--r-border)",
                      paddingBottom: "12px",
                    }}
                  >
                    <span
                      className="text-3xl font-bold"
                      style={{ minWidth: "120px" }}
                    >
                      {s.stat}
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--r-text-muted)" }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hexagon grid */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(16)].map((_, i) => {
                const isHighlighted = [2, 5, 6, 9, 10, 13].includes(i);
                return (
                  <div
                    key={i}
                    className="aspect-square flex items-center justify-center"
                    style={{
                      background: isHighlighted
                        ? "var(--r-primary)"
                        : "var(--r-surface)",
                      border: "2px solid var(--r-border)",
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA with bold text */}
      <section
        className="px-6 py-24 text-center"
        style={{
          background: "var(--r-primary)",
          borderBottom: "3px solid var(--r-border)",
        }}
      >
        <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter">
          Stop planning.
          <br />
          Start shipping.
        </h2>
        <p className="mt-6 text-lg font-medium max-w-md mx-auto">
          Join 10,000+ teams that chose speed over ceremony.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <button
            className="px-10 py-5 text-lg font-bold uppercase"
            style={{
              background: "var(--r-text)",
              color: "var(--r-background)",
              border: "3px solid var(--r-border)",
              boxShadow: "6px 6px 0px rgba(0,0,0,0.3)",
            }}
          >
            Get started free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 flex items-center justify-between"
        style={{ borderTop: "3px solid var(--r-border)" }}
      >
        <span className="text-sm font-bold uppercase tracking-tight">
          ◆ VELOCITY © 2026
        </span>
        <div className="flex gap-6 text-sm font-bold uppercase">
          <a href="#" className="hover:line-through">
            GitHub
          </a>
          <a href="#" className="hover:line-through">
            Twitter
          </a>
          <a href="#" className="hover:line-through">
            Careers
          </a>
        </div>
      </footer>
    </div>
  );
}
