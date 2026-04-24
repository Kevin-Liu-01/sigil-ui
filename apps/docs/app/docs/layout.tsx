import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";

function SigilLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
      >
        <polygon points="0,0 56,0 56,32 40,40 40,56 0,56" fill="currentColor" />
        <polygon points="120,0 120,56 88,56 80,40 64,40 64,0" fill="currentColor" />
        <polygon points="0,120 0,64 32,64 40,80 56,80 56,120" fill="currentColor" />
        <polygon points="120,120 64,120 64,88 80,80 80,64 120,64" fill="var(--s-primary, #6366f1)" />
      </svg>
      <span className="font-semibold text-sm tracking-[-0.03em]">
        sigil<span className="opacity-40 font-normal">/</span>
        <span className="font-medium text-[13px]">UI</span>
      </span>
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: <SigilLogo />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
