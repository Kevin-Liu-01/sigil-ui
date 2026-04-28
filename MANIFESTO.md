# Why Sigil Exists

Every AI-coded site looks the same.

Centered hero. Blurred gradient blob. Pill buttons. Inter. The same six Tailwind blues. A dashboard screenshot floating at an angle with a drop shadow. "Built for the modern web."

You've seen it. A thousand times. You'll see it a thousand more, because the tools make it the path of least resistance. Copy a component library, prompt an agent, get the same output everyone else gets. The "AI-generated" aesthetic isn't a style — it's the absence of one. It's what happens when nobody makes a decision.

Sigil is the decision.

## The Problem

Design systems today give you components. They don't give you a point of view. You get a button, a card, an input — all competently built, all visually interchangeable with every other component library. The moment you want your product to look like *your product*, you're back to hand-editing dozens of files, overriding defaults, fighting the system you adopted to save time.

AI agents make this worse. They're excellent at producing code that compiles. They're terrible at producing code that has taste. An agent will happily generate a pixel-perfect page that looks like it was designed by committee — because in a sense, it was. The training data *is* the committee.

## The Inevitability

Here's the thing: agent-first design isn't coming. It's here. The majority of new UI will be written — or at least drafted — by agents within a few years. Fighting that is pointless. The question isn't *whether* agents will build your frontend. It's whether the tools they use produce sameness or distinction.

Most design systems weren't built for this. They were built for humans browsing docs and copy-pasting snippets. An agent interacting with those systems does what any agent does: takes the path of least resistance, produces the median output, moves on. The system has no interface *for* the agent — so the agent defaults to generic.

Sigil is one of the first design systems built to be **agent-interfaceable**. Not agent-proof. Not agent-resistant. Agent-native. The entire architecture assumes an AI agent is the primary operator, and gives it a surface that channels its strengths — structured editing, pattern consistency, exhaustive coverage — while constraining its weakness: taste.

## The Belief

Visual identity should be a **first-class primitive**, not a weekend project after the features ship.

A design system should have opinions. Not just about how components behave, but about how they *feel* — the weight of a border, the tension in a radius, the rhythm of spacing, the attitude of a typeface. These aren't cosmetic details. They're the difference between a product people remember and one they don't.

## The Bet

AI agents are great at editing structured documents. They're bad at making aesthetic judgments from a blank canvas. So give them structure.

Sigil puts every visual decision — colors, type, spacing, radius, motion, borders, shadows, 259 tokens total — into a token layer that an agent can read, reason about, and modify. The markdown file covers the core override surface; typed presets cover the full system. Components don't own their appearance. The token spec does. Change the spec, everything updates.

The agent doesn't need taste. The preset has taste. The agent just needs to follow the spec — and that's exactly what agents are good at.

This means:

- An agent can switch from "warm editorial" to "cold industrial" by swapping a preset, not rewriting components
- A designer can lock down the token spec and hand it to an agent with confidence
- Two projects using Sigil can look nothing alike, because the system was designed for divergence, not convergence
- The agent has a legible, structured interface to the entire visual system — not scattered Tailwind classes across hundreds of files

## The Name

A sigil is a mark with intention. Not decoration — designation. Every preset in this system is a distinct sigil: a coherent set of visual decisions that says something specific about the product wearing it.

Forty-four presets. Not forty-four themes. Themes are wallpaper. Presets are identities.

## The Standard

If it looks like every other AI-generated site, it failed. That's the bar.