import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { source } from "../../lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider>
      <DocsLayout
        tree={source.pageTree}
        nav={{
          title: (
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--s-font-mono)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="1.5" />
                <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              sigil
            </span>
          ),
          url: "/",
        }}
        sidebar={{
          defaultOpenLevel: 1,
        }}
      >
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
