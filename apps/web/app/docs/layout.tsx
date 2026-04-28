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
            <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--s-font-display, system-ui)" }}>
              <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width={18} height={18}>
                <polygon points="0,0 56,0 56,32 40,40 40,56 0,56" fill="currentColor" />
                <polygon points="120,0 120,56 88,56 80,40 64,40 64,0" fill="currentColor" />
                <polygon points="0,120 0,64 32,64 40,80 56,80 56,120" fill="currentColor" />
                <polygon points="120,120 64,120 64,88 80,80 80,64 120,64" fill="var(--s-primary, #18181b)" />
              </svg>
              <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.03em" }}>
                sigil<span style={{ opacity: 0.3, fontWeight: 300 }}>/</span>
                <span style={{ fontWeight: 500, fontSize: 13 }}>UI</span>
              </span>
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
