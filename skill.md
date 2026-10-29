---
name: ship-bar-design-review
description: >-
  use this when an AI agent builds or redesigns a website and you want it to
  stop looking vibe-coded: art direction, a deslop pass, and a separate
  reviewer agent that scores each build against a 9.7/10 ship bar
---
# Ship bar: design review for AI-built websites

## Build
1. Kill the category default. No near-black with a glowing teal/cyan/purple accent, gradient orbs, glass cards, floating tilted devices, or sparkle-emoji "AI".
2. Pick 2-3 real best-in-class reference sites that fit the product's mood.
3. Get a second opinion from another design-minded agent. Where opinions converge, follow them.
4. Write design.md at the repo root: a warm canvas, ink, secondary and hairline colors, ONE accent reserved for the primary action; a display face, a UI grotesk, and mono for data; spacing, radius, hairlines over shadows, motion rules, do/don't lists.
5. Hero = the product's transformation shown working (input becomes output) within one second.
6. Imagery: real product UI as cropped cards with true data. Copy is plain, specific, concrete.
7. Motion: one signature animation plus subtle fade-ups; respect prefers-reduced-motion.
8. Deslop before shipping: gradient text, pill badge above the H1, identical icon-card grids, same fade on everything, uniform rounded-2xl + shadow-lg, unmodified shadcn slate, centered-everything, hype words, fake testimonials.
9. Verify: screenshots at mobile and desktop, Lighthouse, then a reviewer agent scores it before the owner sees it.

## Review (separate reviewer agent; it never edits the repo)
- Screenshots at desktop 1440px and mobile 390px.
- Lighthouse: performance, accessibility, best practices, SEO.
- Console errors: zero.
- Horizontal overflow at 390px: none.
- Computed-style scan for banned patterns: glows, gradients, glassmorphism, floating phones, bento grids, confetti, serif headlines (if your design.md bans them), filler copy.
- Content checks: debug strings shown to users, joke placeholder data, off-palette chips, duplicate rows, raw UTC timestamps, contrast failures, sticky elements covering inputs.

Output: a score out of 10 plus fixes ranked most important first.
Ship bar: 9.7. Below it, the builder fixes the top items and the reviewer re-scores a new build.

## Cohorts (optional)
Run several narrow-lens reviewer agents (for example fun, art, security, pitch), each with its own bar, scoring independently. Merge their fixes into one list ranked by impact. Ship when every lens clears its bar.
