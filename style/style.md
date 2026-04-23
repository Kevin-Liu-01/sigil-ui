# The Sigil Style Guide

A guide to writing code that lasts.

> **Companion guides:** [Design & Animation](design.md) | [UX Principles](ux-principles.md)

## Quick Hitters

- **Write for easy reading.** Sentences should be short. Break ideas down into simple clauses.

- **Readers hate extra words.** Why waste time say lot word when few word do trick?

- **Optimize for glanceability.** A reviewer should be able to understand the file's shape from its names, signatures, and section order before reading bodies. If folding the function bodies would make the file incomprehensible, the structure is wrong.

- **Fail closed.** If the system cannot prove a required invariant, reject the request or refuse readiness. Silent fallback to a weaker mode hides broken behavior.

- **Share code behind stable contracts.** In this monorepo, this means the `packages/` directory. Any public API or interface should expect to be imported and used. Design the function well the first time around since changing it afterwards is expensive.

- **Keep edit/test/debug loops fast.** Reality should be the basis of all decisions. Get in the habit of making the feedback loop as short as humanly possible.

- **Land changes atomically with tests.** Inline module testing keeps tests and code close together. Separate `tests/` folders are for integration and end-to-end only.

## Hard Limits

Functions stay under 70 lines. Files stay under 500 (not including inlined tests). Nesting stays under 3 levels. Arguments stay under 5.

If a function name contains "and", it is doing two things. Split it into two functions and let the caller compose them.

## Designing a Function Well

- Parameters should be type annotated.
- Docstrings should be clear with the header line being a short imperative sentence.
- Call sites should read like English.
- Early returns are highly encouraged.
- Split compound assertions: prefer `assert(a); assert(b);` over `assert(a and b);`.
- Split compound functions the same way. `if is_stale() { rebuild() }` at the call site is composable. `rebuild_if_stale()` locks the decision and action into one opaque body.
- Define errors extremely specifically.
- The return statement should be saved to its own variable for debuggability.

## The Token-First Principle

This is the equivalent of "edit the token spec, not the components" applied to code:

- When you want to change how something looks, change the token.
- When you want to change how something behaves, change the component.
- When you want to change the entire aesthetic, change the preset.

One token edit replaces dozens of component edits. One preset swap replaces hundreds of token edits. This is the leverage hierarchy.

## On YAGNI

YAGNI means: delete speculative code. The `legacy_compat` flag nobody asked for. The `experimental_v2` parameter for a v2 that will never ship. The "flexible" API that handles twelve cases when you have one.

But YAGNI does not mean: skip foundational quality work because it looks like "extra." Token infrastructure, proper error handling, clean abstractions — these reduce bugs. That's not speculation, that's engineering.

## The First Time Around

> "The second time around may never happen."

The best code is written by people who assume they won't get a second chance. They try to get it right the first time around.

The urgent thing is always something else. You say you're gonna revisit it eventually. Then a bug comes up. Prod catches on fire. You never get the chance to revisit your half-baked code.

Anyone can ship slop quickly. That is not what we are looking for. The goal is to ship as fast as possible *given* quality constraints.

> "Simplicity and elegance are unpopular because they require hard work and discipline to achieve."
>
> Edsger Dijkstra

Simplicity and elegance are features of intelligence and skill because it requires knowing so much about a topic that you compress its essence down to the very core constituents that it needs to exist. No more, no less.

## Post-LLM Operating Principles

- **Understanding is the only thing that matters.** You should be committing code that you understand fully.
- **Target minute-level iteration loops.** Decompose tasks into smaller tasks that LLMs can do while bound to a style guide such as this one.
- **AI handles syntax and mechanical tasks; humans handle taste and risk.** AI handles syntax and writing tests. Humans are the final say in judgment and taste.

**Design goals**: Safety, testability, clarity. In that order.

## TypeScript Rules

- `type` over `interface` unless declaration merging is needed.
- `unknown` over `any`. If `any` is unavoidable, add justification comment.
- Use `satisfies` to validate shapes without widening.
- Import types with `import type`.
- Derive types from values with `as const`.
- Early returns over deeply nested conditionals.

## React Rules

- Hooks at top level only — never inside conditions, loops, or callbacks.
- Exhaustive dependency arrays — never suppress `react-hooks/exhaustive-deps`.
- `forwardRef` on every component that wraps a DOM element.
- Accept `className` prop on every component for Tailwind overrides.
- Use `cn()` from utils for class merging (clsx + tailwind-merge).
- Named exports, never default exports for components.

## Component Rules (Sigil-Specific)

- Prefix CSS classes with `sigil-`.
- Reference ONLY `var(--s-*)` for visual properties — never hardcoded hex, px, or font names.
- Expose variants as typed props (`variant`, `size`, `intent`).
- Use `clsx` + `tailwind-merge` for class composition.
- All interactive components must be keyboard-accessible.
- All components include JSDoc comments.
