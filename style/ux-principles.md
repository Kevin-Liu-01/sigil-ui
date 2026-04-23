# UX Principles

> Hard rules for how Sigil-powered products should feel. Every feature, page, and interaction
> is measured against these. If a design violates one, fix the design.

## Performance

- **100ms interaction budget.** Every click, keystroke, and hover responds in 100ms
or less. If the real work takes longer, show a skeleton or optimistic update
immediately and reconcile in the background.
- **Skeleton loading states.** Never show a blank screen. Content regions render
placeholder shapes that match the final layout so nothing shifts when data arrives.

## Navigation

- **Three steps max.** Any destination is reachable in three clicks or fewer from
wherever the user currently is.
- **Short, readable URL slugs.** Paths use lowercase words separated by hyphens.
No UUIDs, no base64, no query-param soup. `/servers/brave-search`, not
`/servers/a3f8c1d2-...`.
- **Cmd+K command palette.** Power users can jump anywhere, trigger actions, and
search without touching the mouse.
- **No product tours.** The UI teaches itself through progressive disclosure and
sensible defaults. If something needs a tour, it needs a redesign.

## Visual Design

- **Three-color maximum.** One primary, one secondary, one accent. Everything else
is a tint or shade of those three. More colors means more cognitive load.
Sigil enforces this through the token system — at most 3 active colors plus neutrals per preset.
- **No visible scrollbars.** Use `scrollbar-width: none` / `::-webkit-scrollbar`
hiding. Scroll behavior is still present — the chrome just stays out of the way.
- **Optical alignment over geometric.** Align elements by visual weight, not
bounding box. Text, icons, and shapes that are geometrically centered but look
off-center get nudged until they feel right.
- **Optimized for left-to-right reading.** Primary content, labels, and actions
flow left to right. Secondary metadata and status sit on the right. Scanning a
page should feel like reading a sentence.

## Interaction

- **Larger hit targets.** Buttons and inputs have generous padding. Minimum touch
target is 44x44px. Clickable area extends beyond the visible boundary where
possible.
- **Copy/paste from clipboard.** Anywhere a user might want to grab a value (API
keys, slugs, URLs, code snippets), provide a one-click copy button.
- **Persistent, resumable state.** If the user refreshes, navigates away, or closes
the tab, they come back to exactly where they left off. Forms remember drafts.
Filters persist. Scroll position restores.
- **Honest one-click cancel.** Cancellation is a single action with no guilt trips,
dark patterns, or surveys blocking the exit. Respect the decision.
- **Reassurance about loss.** Before any destructive action (delete, overwrite,
downgrade), tell the user exactly what they will lose and confirm. After the
action, offer undo when possible.

## Copy

- **Active voice, seven words max.** Every label, button, and message uses active
voice. Sentences cap at seven words. If it takes more, split or rewrite.
- **Very minimal tooltips.** Tooltips are a last resort, not a crutch. If the UI
needs a tooltip to be understood, the UI needs work. When tooltips do appear,
they are one short sentence.

## Brand

- **Copyable SVG logo and brand kit.** The logo and brand assets are always
available as clean SVGs that designers and partners can grab without asking.
- **Structural visibility as identity.** Sigil's visual identity is the grid: cross marks,
margin rails, cell boundaries made visible as design elements. The layout itself is
the brand, not decoration layered on top.