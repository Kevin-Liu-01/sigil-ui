const kpis = [
  { label: "Total Users", value: "24,891", change: "+12.5%", up: true },
  { label: "Revenue", value: "$84,230", change: "+8.2%", up: true },
  { label: "Active Sessions", value: "1,429", change: "-3.1%", up: false },
  { label: "Conversion Rate", value: "3.24%", change: "+0.8%", up: true },
];

const tableData = [
  { id: "USR-001", name: "Alice Chen", email: "alice@example.com", plan: "Pro", revenue: "$2,340", status: "Active" },
  { id: "USR-002", name: "Bob Martinez", email: "bob@example.com", plan: "Enterprise", revenue: "$12,800", status: "Active" },
  { id: "USR-003", name: "Carol Wu", email: "carol@example.com", plan: "Hobby", revenue: "$0", status: "Churned" },
  { id: "USR-004", name: "David Kim", email: "david@example.com", plan: "Pro", revenue: "$1,920", status: "Active" },
  { id: "USR-005", name: "Eva Johansson", email: "eva@example.com", plan: "Pro", revenue: "$3,100", status: "Active" },
  { id: "USR-006", name: "Frank Okafor", email: "frank@example.com", plan: "Enterprise", revenue: "$18,500", status: "Active" },
  { id: "USR-007", name: "Grace Li", email: "grace@example.com", plan: "Hobby", revenue: "$0", status: "Trial" },
  { id: "USR-008", name: "Hiro Tanaka", email: "hiro@example.com", plan: "Pro", revenue: "$890", status: "Active" },
];

const sidebarItems = [
  { label: "Overview", icon: "◈", active: true },
  { label: "Analytics", icon: "◆" },
  { label: "Users", icon: "◇" },
  { label: "Revenue", icon: "◆" },
  { label: "Settings", icon: "◇" },
];

export default function Page() {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--r-background)", color: "var(--r-text)" }}>
      {/* Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-60 shrink-0 p-4"
        style={{ background: "var(--r-surface)", borderRight: "1px solid var(--r-border)" }}
      >
        <div className="flex items-center gap-2 px-3 py-4 mb-4">
          <div className="h-8 w-8 rounded-lg" style={{ background: "var(--r-primary)" }} />
          <span className="text-base font-semibold">Dashboard</span>
        </div>
        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors"
              style={{
                background: item.active ? "rgba(59,130,246,0.1)" : "transparent",
                color: item.active ? "var(--r-primary)" : "var(--r-text-muted)",
                fontWeight: item.active ? 600 : 400,
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div
          className="mt-auto p-3 rounded-lg text-sm"
          style={{ background: "rgba(59,130,246,0.05)", border: "1px solid var(--r-border)" }}
        >
          <p className="font-medium" style={{ color: "var(--r-primary)" }}>Upgrade to Pro</p>
          <p className="mt-1 text-xs" style={{ color: "var(--r-text-muted)" }}>
            Unlock advanced analytics and unlimited exports.
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Analytics Overview</h1>
              <p className="text-sm mt-1" style={{ color: "var(--r-text-muted)" }}>
                Last 30 days performance
              </p>
            </div>
            <button
              className="px-4 py-2 text-sm font-medium"
              style={{
                background: "var(--r-primary)",
                color: "#ffffff",
                borderRadius: "var(--r-radius-sm)",
              }}
            >
              Export Report
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="p-5"
                style={{
                  background: "var(--r-surface)",
                  border: "1px solid var(--r-border)",
                  borderRadius: "var(--r-radius)",
                }}
              >
                <p className="text-sm mb-1" style={{ color: "var(--r-text-muted)" }}>
                  {kpi.label}
                </p>
                <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
                <p
                  className="text-xs mt-2 font-medium"
                  style={{ color: kpi.up ? "#22c55e" : "#ef4444" }}
                >
                  {kpi.change} vs last period
                </p>
              </div>
            ))}
          </div>

          {/* Chart placeholder */}
          <div
            className="mb-8 p-6 h-48 flex items-center justify-center"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius)",
            }}
          >
            <div className="flex items-end gap-2 h-24">
              {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                <div
                  key={i}
                  className="w-6 rounded-t transition-all"
                  style={{
                    height: `${h}%`,
                    background: `rgba(59,130,246,${0.3 + (h / 100) * 0.7})`,
                    borderRadius: "4px 4px 0 0",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Data Table */}
          <div
            className="overflow-x-auto"
            style={{
              background: "var(--r-surface)",
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius)",
            }}
          >
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--r-border)" }}>
              <h2 className="text-lg font-semibold">Recent Users</h2>
              <div
                className="flex items-center gap-2 px-3 py-1.5 text-sm"
                style={{
                  border: "1px solid var(--r-border)",
                  borderRadius: "var(--r-radius-sm)",
                  color: "var(--r-text-muted)",
                }}
              >
                <span>🔍</span>
                <span>Search users…</span>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--r-border)" }}>
                  {["ID", "Name", "Email", "Plan", "Revenue", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 font-medium text-xs uppercase tracking-wider"
                      style={{ color: "var(--r-text-muted)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-white/[0.02]"
                    style={{
                      borderBottom: i < tableData.length - 1 ? "1px solid var(--r-border)" : "none",
                    }}
                  >
                    <td className="px-5 py-3 font-mono text-xs" style={{ color: "var(--r-text-muted)" }}>
                      {row.id}
                    </td>
                    <td className="px-5 py-3 font-medium">{row.name}</td>
                    <td className="px-5 py-3" style={{ color: "var(--r-text-muted)" }}>
                      {row.email}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className="px-2 py-0.5 text-xs rounded-full font-medium"
                        style={{
                          background:
                            row.plan === "Enterprise"
                              ? "rgba(59,130,246,0.15)"
                              : row.plan === "Pro"
                                ? "rgba(139,92,246,0.15)"
                                : "rgba(255,255,255,0.05)",
                          color:
                            row.plan === "Enterprise"
                              ? "#60a5fa"
                              : row.plan === "Pro"
                                ? "#a78bfa"
                                : "var(--r-text-muted)",
                        }}
                      >
                        {row.plan}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs">{row.revenue}</td>
                    <td className="px-5 py-3">
                      <span
                        className="inline-flex items-center gap-1 text-xs font-medium"
                        style={{
                          color:
                            row.status === "Active"
                              ? "#22c55e"
                              : row.status === "Trial"
                                ? "#eab308"
                                : "#ef4444",
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background:
                              row.status === "Active"
                                ? "#22c55e"
                                : row.status === "Trial"
                                  ? "#eab308"
                                  : "#ef4444",
                          }}
                        />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
