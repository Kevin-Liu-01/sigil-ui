"use client";

import { Fragment } from "react";

const OKLCH_RE = /oklch\([^)]+\)/g;

export function OklchText({ children }: { children: string }) {
  const parts: (string | { match: string })[] = [];
  let last = 0;
  for (const m of children.matchAll(OKLCH_RE)) {
    if (m.index! > last) parts.push(children.slice(last, m.index!));
    parts.push({ match: m[0] });
    last = m.index! + m[0].length;
  }
  if (last < children.length) parts.push(children.slice(last));

  if (parts.length === 0) return <>{children}</>;

  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <Fragment key={i}>{p}</Fragment>
        ) : (
          <Fragment key={i}>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: 2,
                background: p.match,
                border: "1px solid var(--s-border)",
                verticalAlign: "middle",
                marginRight: 3,
                flexShrink: 0,
              }}
            />
            {p.match}
          </Fragment>
        ),
      )}
    </>
  );
}
