"use client";

import { useState, useEffect } from "react";

const PRESETS = ["sigil", "midnight", "editorial", "brutalist", "soft"] as const;

const TABS = [
  "Layout",
  "UI",
  "Navigation",
  "Overlays",
  "Shapes",
  "3D",
  "Diagrams",
  "Marketing",
] as const;

type Tab = (typeof TABS)[number];

/* ------------------------------------------------------------------ */
/*  Inline component examples per tab                                  */
/* ------------------------------------------------------------------ */

function LayoutExamples() {
  return (
    <div className="space-y-8">
      {/* Bento grid */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Bento Grid
        </h3>
        <div className="grid grid-cols-4 grid-rows-2 gap-3" style={{ height: "220px" }}>
          <div
            className="col-span-2 row-span-2 p-5 flex flex-col justify-end"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius)",
            }}
          >
            <span className="text-2xl font-bold">Analytics</span>
            <span className="text-sm mt-1" style={{ color: "var(--r-text-muted)" }}>
              Real-time dashboard
            </span>
          </div>
          <div
            className="p-4 flex items-center justify-center"
            style={{
              background: "var(--r-primary-muted)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius)",
            }}
          >
            <span className="text-3xl font-bold" style={{ color: "var(--r-primary)" }}>
              42k
            </span>
          </div>
          <div
            className="p-4 flex items-center justify-center"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius)",
            }}
          >
            <span className="text-3xl font-bold" style={{ color: "var(--r-success)" }}>
              +12%
            </span>
          </div>
          <div
            className="col-span-2 p-4 flex items-center gap-4"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius)",
            }}
          >
            {[60, 45, 80, 35, 70, 50, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1"
                style={{
                  height: `${h}%`,
                  background: `var(--r-primary)`,
                  opacity: 0.3 + (h / 100) * 0.7,
                  borderRadius: "var(--r-radius-sm)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Split panel */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Split Panel
        </h3>
        <div className="flex gap-3" style={{ height: "120px" }}>
          <div
            className="flex-1 p-4"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius)",
            }}
          >
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--r-text-muted)" }}>
              Sidebar
            </span>
          </div>
          <div
            className="flex-[3] p-4"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius)",
            }}
          >
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--r-text-muted)" }}>
              Content Area
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function UIExamples() {
  return (
    <div className="space-y-8">
      {/* Buttons */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Buttons
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            className="px-5 py-2.5 text-sm font-medium"
            style={{
              background: "var(--r-primary)",
              color: "var(--r-background)",
              borderRadius: "var(--r-radius-sm)",
            }}
          >
            Primary
          </button>
          <button
            className="px-5 py-2.5 text-sm font-medium"
            style={{
              background: "transparent",
              border: "1px solid var(--r-border-strong)",
              borderRadius: "var(--r-radius-sm)",
              color: "var(--r-text)",
            }}
          >
            Secondary
          </button>
          <button
            className="px-5 py-2.5 text-sm font-medium"
            style={{
              background: "var(--r-primary-muted)",
              color: "var(--r-primary)",
              borderRadius: "var(--r-radius-sm)",
            }}
          >
            Ghost
          </button>
          <button
            className="px-5 py-2.5 text-sm font-medium"
            style={{
              background: "var(--r-error)",
              color: "#ffffff",
              borderRadius: "var(--r-radius-sm)",
            }}
          >
            Destructive
          </button>
        </div>
      </div>

      {/* Cards */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Cards
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: "Embeddings", desc: "Vector search with semantic understanding", icon: "◆" },
            { title: "Chat UI", desc: "Streaming interface with markdown support", icon: "◈" },
            { title: "RAG Pipeline", desc: "Retrieval-augmented generation", icon: "◇" },
          ].map((card) => (
            <div
              key={card.title}
              className="p-5"
              style={{
                background: "var(--r-surface)",
                border: "1px solid var(--r-border)",
                borderRadius: "var(--r-radius)",
              }}
            >
              <div
                className="w-9 h-9 flex items-center justify-center text-base mb-3"
                style={{
                  background: "var(--r-primary-muted)",
                  color: "var(--r-primary)",
                  borderRadius: "var(--r-radius-sm)",
                }}
              >
                {card.icon}
              </div>
              <h4 className="text-sm font-semibold">{card.title}</h4>
              <p className="text-xs mt-1" style={{ color: "var(--r-text-muted)" }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Badges & Tags */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Badges
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Active", color: "var(--r-success)" },
            { label: "Pending", color: "var(--r-warning)" },
            { label: "Error", color: "var(--r-error)" },
            { label: "Default", color: "var(--r-text-muted)" },
          ].map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium"
              style={{
                background: `color-mix(in srgb, ${badge.color} 15%, transparent)`,
                color: badge.color,
                borderRadius: "var(--r-radius-sm)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: badge.color }}
              />
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavigationExamples() {
  return (
    <div className="space-y-8">
      {/* Horizontal nav */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Top Bar
        </h3>
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{
            background: "var(--r-surface)",
            border: "1px solid var(--r-border)",
            borderRadius: "var(--r-radius)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7"
              style={{
                background: "var(--r-primary)",
                borderRadius: "var(--r-radius-sm)",
              }}
            />
            <span className="text-sm font-semibold">Acme Inc</span>
          </div>
          <div className="flex items-center gap-5 text-xs" style={{ color: "var(--r-text-muted)" }}>
            <span style={{ color: "var(--r-text)" }}>Dashboard</span>
            <span>Projects</span>
            <span>Team</span>
            <span>Settings</span>
          </div>
          <div
            className="w-7 h-7 flex items-center justify-center text-xs font-medium"
            style={{
              background: "var(--r-primary-muted)",
              color: "var(--r-primary)",
              borderRadius: "9999px",
            }}
          >
            K
          </div>
        </div>
      </div>

      {/* Sidebar nav */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Sidebar
        </h3>
        <div
          className="w-52 p-3 space-y-1"
          style={{
            background: "var(--r-surface)",
            border: "1px solid var(--r-border)",
            borderRadius: "var(--r-radius)",
          }}
        >
          {[
            { label: "Overview", icon: "◈", active: true },
            { label: "Analytics", icon: "◆", active: false },
            { label: "Users", icon: "◇", active: false },
            { label: "Settings", icon: "◆", active: false },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium"
              style={{
                background: item.active ? "var(--r-primary-muted)" : "transparent",
                color: item.active ? "var(--r-primary)" : "var(--r-text-muted)",
                borderRadius: "var(--r-radius-sm)",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Breadcrumb
        </h3>
        <div className="flex items-center gap-2 text-xs">
          <span style={{ color: "var(--r-text-muted)" }}>Home</span>
          <span style={{ color: "var(--r-text-muted)" }}>/</span>
          <span style={{ color: "var(--r-text-muted)" }}>Projects</span>
          <span style={{ color: "var(--r-text-muted)" }}>/</span>
          <span style={{ color: "var(--r-text)" }}>Sigil UI</span>
        </div>
      </div>
    </div>
  );
}

function OverlayExamples() {
  return (
    <div className="space-y-8">
      {/* Modal */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Modal
        </h3>
        <div
          className="relative p-6 max-w-sm"
          style={{
            background: "var(--r-surface-elevated)",
            border: "1px solid var(--r-border)",
            borderRadius: "var(--r-radius-lg)",
            boxShadow: "var(--r-shadow)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold">Confirm action</h4>
            <span className="text-lg cursor-pointer" style={{ color: "var(--r-text-muted)" }}>
              ×
            </span>
          </div>
          <p className="text-sm mb-5" style={{ color: "var(--r-text-muted)" }}>
            Are you sure you want to delete this project? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              className="px-4 py-2 text-xs font-medium"
              style={{
                border: "1px solid var(--r-border-strong)",
                borderRadius: "var(--r-radius-sm)",
                color: "var(--r-text-secondary)",
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-xs font-medium"
              style={{
                background: "var(--r-error)",
                color: "#ffffff",
                borderRadius: "var(--r-radius-sm)",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Toasts
        </h3>
        <div className="space-y-2 max-w-sm">
          {[
            { type: "success", msg: "Changes saved successfully", color: "var(--r-success)" },
            { type: "error", msg: "Failed to deploy. Check logs.", color: "var(--r-error)" },
            { type: "info", msg: "New update available", color: "var(--r-primary)" },
          ].map((t) => (
            <div
              key={t.type}
              className="flex items-center gap-3 px-4 py-3 text-xs"
              style={{
                background: "var(--r-surface-elevated)",
                border: "1px solid var(--r-border)",
                borderLeft: `3px solid ${t.color}`,
                borderRadius: "var(--r-radius-sm)",
              }}
            >
              <span style={{ color: t.color }}>●</span>
              <span>{t.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShapeExamples() {
  return (
    <div className="space-y-8">
      {/* Geometric shapes */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Geometric Shapes
        </h3>
        <div className="flex gap-6 items-center">
          {/* Circle */}
          <div
            className="w-16 h-16"
            style={{
              background: "var(--r-primary)",
              borderRadius: "9999px",
            }}
          />
          {/* Diamond */}
          <div
            className="w-14 h-14 rotate-45"
            style={{
              background: "var(--r-primary-muted)",
              border: "2px solid var(--r-primary)",
            }}
          />
          {/* Hexagon */}
          <div
            className="w-16 h-16"
            style={{
              background: "var(--r-surface)",
              border: "2px solid var(--r-border-strong)",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          />
          {/* Triangle */}
          <div
            className="w-16 h-16"
            style={{
              background: "var(--r-primary)",
              opacity: 0.6,
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            }}
          />
          {/* Cross */}
          <div className="relative w-16 h-16">
            <div
              className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
              style={{ height: "3px", background: "var(--r-primary)" }}
            />
            <div
              className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
              style={{ width: "3px", background: "var(--r-primary)" }}
            />
          </div>
        </div>
      </div>

      {/* Sigil crosshair */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Sigil Grid Cells
        </h3>
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="relative w-12 h-12"
              style={{
                background: "var(--r-surface)",
                border: "1px solid var(--r-border)",
                borderRadius: "var(--r-radius-sm)",
              }}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: "10px", height: "1.5px", background: "var(--r-primary)", opacity: 0.5 }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: "1.5px", height: "10px", background: "var(--r-primary)", opacity: 0.5 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative pattern */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Dot Grid Pattern
        </h3>
        <div
          className="h-24 w-full"
          style={{
            background: "var(--r-surface)",
            border: "1px solid var(--r-border)",
            borderRadius: "var(--r-radius)",
            backgroundImage: `radial-gradient(var(--r-border-strong) 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />
      </div>
    </div>
  );
}

function ThreeDExamples() {
  return (
    <div className="space-y-8">
      {/* Perspective card */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Perspective Card
        </h3>
        <div className="flex gap-6">
          <div style={{ perspective: "500px" }}>
            <div
              className="w-40 h-28 p-4 flex flex-col justify-end"
              style={{
                background: "linear-gradient(135deg, var(--r-surface), var(--r-primary-muted))",
                border: "1px solid var(--r-border)",
                borderRadius: "var(--r-radius)",
                transform: "rotateY(-12deg) rotateX(6deg)",
                boxShadow: "var(--r-shadow)",
              }}
            >
              <span className="text-xs font-medium">3D Card</span>
              <span className="text-[10px]" style={{ color: "var(--r-text-muted)" }}>
                CSS perspective
              </span>
            </div>
          </div>
          <div style={{ perspective: "500px" }}>
            <div
              className="w-40 h-28 p-4 flex flex-col justify-end"
              style={{
                background: "linear-gradient(135deg, var(--r-primary-muted), var(--r-surface))",
                border: "1px solid var(--r-border)",
                borderRadius: "var(--r-radius)",
                transform: "rotateY(12deg) rotateX(6deg)",
                boxShadow: "var(--r-shadow)",
              }}
            >
              <span className="text-xs font-medium">Tilted</span>
              <span className="text-[10px]" style={{ color: "var(--r-text-muted)" }}>
                Opposite rotation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Isometric cube */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Isometric Cube (CSS)
        </h3>
        <div className="relative" style={{ width: "120px", height: "140px", perspective: "400px" }}>
          <div
            style={{
              position: "absolute",
              width: "80px",
              height: "80px",
              background: "var(--r-primary)",
              opacity: 0.8,
              transform: "rotateX(55deg) rotateZ(45deg) translateZ(20px)",
              left: "20px",
              top: "10px",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "80px",
              height: "80px",
              background: "var(--r-primary)",
              opacity: 0.5,
              transform: "rotateX(55deg) rotateZ(45deg)",
              left: "20px",
              top: "30px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function DiagramExamples() {
  return (
    <div className="space-y-8">
      {/* Flow diagram */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Flow Diagram
        </h3>
        <div className="flex items-center gap-3">
          {["Request", "Auth", "Process", "Response"].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div
                className="px-4 py-2.5 text-xs font-medium"
                style={{
                  background: i === 0 ? "var(--r-primary-muted)" : "var(--r-surface)",
                  border: `1px solid ${i === 0 ? "var(--r-primary)" : "var(--r-border)"}`,
                  borderRadius: "var(--r-radius-sm)",
                  color: i === 0 ? "var(--r-primary)" : "var(--r-text)",
                }}
              >
                {step}
              </div>
              {i < 3 && (
                <span style={{ color: "var(--r-text-muted)", fontSize: "14px" }}>→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tree diagram */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Tree Structure
        </h3>
        <div className="text-xs font-mono" style={{ color: "var(--r-text-secondary)" }}>
          <div>
            <span style={{ color: "var(--r-primary)" }}>src/</span>
          </div>
          <div className="ml-4">├── components/</div>
          <div className="ml-8">├── Button.tsx</div>
          <div className="ml-8">├── Card.tsx</div>
          <div className="ml-8">└── Modal.tsx</div>
          <div className="ml-4">├── hooks/</div>
          <div className="ml-8">└── useTheme.ts</div>
          <div className="ml-4">└── index.ts</div>
        </div>
      </div>

      {/* Status pipeline */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Status Pipeline
        </h3>
        <div className="flex gap-1 h-3 overflow-hidden" style={{ borderRadius: "var(--r-radius-sm)" }}>
          <div className="flex-[4]" style={{ background: "var(--r-success)" }} />
          <div className="flex-[2]" style={{ background: "var(--r-warning)" }} />
          <div className="flex-[1]" style={{ background: "var(--r-error)" }} />
          <div className="flex-[3]" style={{ background: "var(--r-border-strong)" }} />
        </div>
        <div className="flex gap-4 mt-2 text-[10px]" style={{ color: "var(--r-text-muted)" }}>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--r-success)" }} /> Passed (40%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--r-warning)" }} /> Pending (20%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--r-error)" }} /> Failed (10%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--r-border-strong)" }} /> Queued (30%)
          </span>
        </div>
      </div>
    </div>
  );
}

function MarketingExamples() {
  return (
    <div className="space-y-8">
      {/* Hero block */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Hero Block
        </h3>
        <div
          className="p-8 text-center relative overflow-hidden"
          style={{
            background: "var(--r-surface)",
            border: "1px solid var(--r-border)",
            borderRadius: "var(--r-radius-lg)",
          }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 0%, var(--r-primary-muted), transparent 70%)`,
            }}
          />
          <div className="relative">
            <span
              className="inline-block px-3 py-1 text-[10px] font-medium uppercase tracking-wider mb-3"
              style={{
                background: "var(--r-primary-muted)",
                color: "var(--r-primary)",
                borderRadius: "var(--r-radius-sm)",
              }}
            >
              New Release
            </span>
            <h2 className="text-2xl font-bold">Build something amazing</h2>
            <p className="text-xs mt-2 max-w-xs mx-auto" style={{ color: "var(--r-text-muted)" }}>
              Production-ready components for your next project.
            </p>
            <button
              className="mt-4 px-5 py-2 text-xs font-medium"
              style={{
                background: "var(--r-primary)",
                color: "var(--r-background)",
                borderRadius: "var(--r-radius-sm)",
              }}
            >
              Get started →
            </button>
          </div>
        </div>
      </div>

      {/* Pricing row */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Pricing Cards
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: "Free", price: "$0", features: ["5 projects", "1GB storage"] },
            { name: "Pro", price: "$29", features: ["Unlimited", "50GB storage"], highlighted: true },
            { name: "Team", price: "$79", features: ["Everything", "SSO + RBAC"] },
          ].map((tier) => (
            <div
              key={tier.name}
              className="p-4"
              style={{
                background: "var(--r-surface)",
                border: tier.highlighted
                  ? "1px solid var(--r-primary)"
                  : "1px solid var(--r-border)",
                borderRadius: "var(--r-radius)",
                boxShadow: tier.highlighted ? `0 0 20px var(--r-primary-muted)` : "none",
              }}
            >
              <h4 className="text-xs font-semibold">{tier.name}</h4>
              <div className="text-xl font-bold mt-1">{tier.price}</div>
              <ul className="mt-3 space-y-1.5">
                {tier.features.map((f) => (
                  <li key={f} className="text-[10px] flex items-center gap-1.5" style={{ color: "var(--r-text-muted)" }}>
                    <span style={{ color: "var(--r-primary)" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--r-text-secondary)" }}>
          Testimonial
        </h3>
        <div
          className="p-5"
          style={{
            background: "var(--r-surface)",
            border: "1px solid var(--r-border)",
            borderRadius: "var(--r-radius)",
          }}
        >
          <p className="text-sm italic" style={{ color: "var(--r-text-secondary)" }}>
            &ldquo;Sigil UI cut our design-to-dev time in half. The preset system is genius.&rdquo;
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div
              className="w-6 h-6 flex items-center justify-center text-[10px] font-medium"
              style={{
                background: "var(--r-primary-muted)",
                color: "var(--r-primary)",
                borderRadius: "9999px",
              }}
            >
              A
            </div>
            <div>
              <span className="text-xs font-medium">Alex Chen</span>
              <span className="text-[10px] ml-2" style={{ color: "var(--r-text-muted)" }}>
                Staff Engineer, Acme
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab content router                                                 */
/* ------------------------------------------------------------------ */

function TabContent({ tab }: { tab: Tab }) {
  switch (tab) {
    case "Layout":
      return <LayoutExamples />;
    case "UI":
      return <UIExamples />;
    case "Navigation":
      return <NavigationExamples />;
    case "Overlays":
      return <OverlayExamples />;
    case "Shapes":
      return <ShapeExamples />;
    case "3D":
      return <ThreeDExamples />;
    case "Diagrams":
      return <DiagramExamples />;
    case "Marketing":
      return <MarketingExamples />;
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("Layout");
  const [preset, setPreset] = useState("sigil");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", preset);
  }, [preset]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--r-background)",
        color: "var(--r-text)",
        fontFamily: "var(--r-font-sans)",
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md"
        style={{
          borderBottom: "1px solid var(--r-border)",
          background: "color-mix(in srgb, var(--r-background) 80%, transparent)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7"
            style={{
              background: "var(--r-primary)",
              borderRadius: "var(--r-radius-sm)",
            }}
          />
          <div>
            <h1 className="text-base font-bold tracking-tight">Component Playground</h1>
            <p className="text-[11px]" style={{ color: "var(--r-text-muted)" }}>
              Explore every component. Switch presets live.
            </p>
          </div>
        </div>

        {/* Preset switcher */}
        <div className="flex items-center gap-3">
          <label
            className="text-xs font-medium"
            style={{ color: "var(--r-text-muted)" }}
            htmlFor="preset-select"
          >
            Preset
          </label>
          <select
            id="preset-select"
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
            className="text-sm font-medium px-3 py-1.5 appearance-none cursor-pointer outline-none"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border-strong)",
              borderRadius: "var(--r-radius-sm)",
              color: "var(--r-text)",
              minWidth: "130px",
            }}
          >
            {PRESETS.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tab bar */}
        <div
          className="flex gap-1 p-1 mb-8 overflow-x-auto"
          style={{
            background: "var(--r-surface)",
            border: "1px solid var(--r-border)",
            borderRadius: "var(--r-radius)",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 text-xs font-medium whitespace-nowrap transition-all"
              style={{
                background: activeTab === tab ? "var(--r-primary-muted)" : "transparent",
                color: activeTab === tab ? "var(--r-primary)" : "var(--r-text-muted)",
                borderRadius: "var(--r-radius-sm)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <TabContent tab={activeTab} />
      </div>
    </div>
  );
}
