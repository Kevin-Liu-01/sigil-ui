"use client";

import { useState } from "react";

const sidebarSections = [
  { label: "Getting Started", items: ["Installation", "Quick Start", "Authentication"] },
  { label: "Core Concepts", items: ["Components", "Presets", "Tokens", "Themes"] },
  { label: "API Reference", items: ["REST API", "GraphQL", "Webhooks", "Rate Limits"], active: "REST API" },
  { label: "Guides", items: ["Migration", "Custom Presets", "Deployment"] },
];

const endpoints = [
  { method: "GET", path: "/api/components", description: "List all components", status: "Stable" },
  { method: "POST", path: "/api/components", description: "Create a component", status: "Stable" },
  { method: "GET", path: "/api/presets", description: "List available presets", status: "Stable" },
  { method: "PUT", path: "/api/presets/:id", description: "Update a preset", status: "Beta" },
  { method: "DELETE", path: "/api/components/:id", description: "Delete a component", status: "Stable" },
];

const restCode = `curl -X GET https://api.sigil-ui.dev/v1/components \\
  -H "Authorization: Bearer rui_sk_live_..." \\
  -H "Content-Type: application/json"

# Response
{
  "data": [
    {
      "id": "comp_button",
      "name": "Button",
      "category": "actions",
      "variants": ["default", "outline", "ghost"]
    }
  ],
  "meta": { "total": 42, "page": 1 }
}`;

const graphqlCode = `query ListComponents($category: String) {
  components(category: $category) {
    id
    name
    category
    variants
    props {
      name
      type
      required
      default
    }
  }
}

# Variables
{ "category": "actions" }`;

export default function Page() {
  const [activeTab, setActiveTab] = useState<"rest" | "graphql">("rest");

  return (
    <div className="min-h-screen" style={{ background: "var(--r-background)", color: "var(--r-text)" }}>
      {/* Top navbar */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-sm"
        style={{
          background: "rgba(250,249,246,0.9)",
          borderBottom: "1px solid var(--r-border)",
          fontFamily: "var(--r-font-heading)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-md" style={{ background: "var(--r-primary)" }} />
          <span className="text-base font-semibold" style={{ color: "var(--r-text)" }}>
            Sigil UI
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#e5e7eb", color: "var(--r-text-muted)" }}>
            v2.4.0
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm" style={{ color: "var(--r-text-muted)" }}>
          <a href="#" className="hover:text-black transition-colors">Docs</a>
          <a href="#" className="hover:text-black transition-colors">Components</a>
          <a href="#" className="hover:text-black transition-colors">GitHub</a>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className="hidden lg:block w-64 shrink-0 p-6 overflow-y-auto sticky top-[49px] h-[calc(100vh-49px)]"
          style={{ borderRight: "1px solid var(--r-border)", fontFamily: "var(--r-font-heading)" }}
        >
          {sidebarSections.map((section) => (
            <div key={section.label} className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--r-text-muted)" }}>
                {section.label}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="block px-3 py-1.5 text-sm rounded transition-colors"
                      style={{
                        background: section.active === item ? "rgba(30,64,175,0.08)" : "transparent",
                        color: section.active === item ? "var(--r-primary)" : "var(--r-text-muted)",
                        fontWeight: section.active === item ? 600 : 400,
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-3xl px-8 py-10 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8" style={{ fontFamily: "var(--r-font-heading)" }}>
            <a href="#" style={{ color: "var(--r-text-muted)" }} className="hover:text-black transition-colors">
              Docs
            </a>
            <span style={{ color: "var(--r-text-muted)" }}>/</span>
            <a href="#" style={{ color: "var(--r-text-muted)" }} className="hover:text-black transition-colors">
              API Reference
            </a>
            <span style={{ color: "var(--r-text-muted)" }}>/</span>
            <span style={{ color: "var(--r-primary)", fontWeight: 500 }}>REST API</span>
          </nav>

          <h1
            className="text-4xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: "var(--r-font-heading)" }}
          >
            API Reference
          </h1>
          <p className="text-base leading-relaxed mb-10" style={{ color: "var(--r-text-muted)", lineHeight: 1.8 }}>
            The Sigil UI API lets you programmatically manage components, presets,
            and design tokens. All endpoints require authentication via Bearer token.
          </p>

          {/* Tabs */}
          <div className="mb-8">
            <div
              className="flex gap-0"
              style={{ borderBottom: "1px solid var(--r-border)", fontFamily: "var(--r-font-heading)" }}
            >
              {(["rest", "graphql"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-2.5 text-sm font-medium transition-colors relative"
                  style={{
                    color: activeTab === tab ? "var(--r-primary)" : "var(--r-text-muted)",
                    borderBottom: activeTab === tab ? "2px solid var(--r-primary)" : "2px solid transparent",
                    marginBottom: "-1px",
                  }}
                >
                  {tab === "rest" ? "REST" : "GraphQL"}
                </button>
              ))}
            </div>

            {/* Code block */}
            <div
              className="mt-4 overflow-x-auto"
              style={{
                background: "#1e1e2e",
                borderRadius: "var(--r-radius)",
                border: "1px solid var(--r-border)",
              }}
            >
              <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-xs" style={{ color: "#888", fontFamily: "var(--r-font-mono)" }}>
                  {activeTab === "rest" ? "bash" : "graphql"}
                </span>
                <button className="text-xs px-2 py-1 rounded hover:bg-white/10 transition-colors" style={{ color: "#888" }}>
                  Copy
                </button>
              </div>
              <pre className="p-4 text-sm leading-relaxed" style={{ fontFamily: "var(--r-font-mono)", color: "#cdd6f4" }}>
                <code>{activeTab === "rest" ? restCode : graphqlCode}</code>
              </pre>
            </div>
          </div>

          {/* Table */}
          <h2 className="text-2xl font-bold mb-4 mt-12" style={{ fontFamily: "var(--r-font-heading)" }}>
            Endpoints
          </h2>
          <div
            className="overflow-x-auto"
            style={{
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius)",
              background: "var(--r-surface)",
            }}
          >
            <table className="w-full text-sm" style={{ fontFamily: "var(--r-font-heading)" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--r-border)", background: "var(--r-background)" }}>
                  <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--r-text-muted)" }}>
                    Method
                  </th>
                  <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--r-text-muted)" }}>
                    Path
                  </th>
                  <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--r-text-muted)" }}>
                    Description
                  </th>
                  <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--r-text-muted)" }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((ep, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: i < endpoints.length - 1 ? "1px solid var(--r-border)" : "none",
                    }}
                  >
                    <td className="px-4 py-3">
                      <span
                        className="inline-block px-2 py-0.5 text-xs font-mono font-semibold rounded"
                        style={{
                          background:
                            ep.method === "GET"
                              ? "rgba(34,197,94,0.1)"
                              : ep.method === "POST"
                                ? "rgba(59,130,246,0.1)"
                                : ep.method === "PUT"
                                  ? "rgba(234,179,8,0.1)"
                                  : "rgba(239,68,68,0.1)",
                          color:
                            ep.method === "GET"
                              ? "#16a34a"
                              : ep.method === "POST"
                                ? "#2563eb"
                                : ep.method === "PUT"
                                  ? "#ca8a04"
                                  : "#dc2626",
                        }}
                      >
                        {ep.method}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ fontFamily: "var(--r-font-mono)", fontSize: "0.8125rem" }}>
                      {ep.path}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--r-text-muted)" }}>
                      {ep.description}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: ep.status === "Stable" ? "rgba(34,197,94,0.1)" : "rgba(234,179,8,0.1)",
                          color: ep.status === "Stable" ? "#16a34a" : "#ca8a04",
                        }}
                      >
                        {ep.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 flex items-center justify-between text-sm" style={{ color: "var(--r-text-muted)", fontFamily: "var(--r-font-heading)" }}>
            <a href="#" className="hover:text-black transition-colors">← Authentication</a>
            <a href="#" className="hover:text-black transition-colors" style={{ color: "var(--r-primary)" }}>
              GraphQL →
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
