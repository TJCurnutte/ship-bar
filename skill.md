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


## Cohort: 20 reviewers
Run these as separate reviewer agents. Each gets the same screenshots and measurements, scores out of 10 independently, and returns ranked fixes. Any reviewer can flag a BLOCKER (broken, untrue or unusable).

1. first-time visitor: Do I understand what this is and what to do within five seconds?
2. skeptical buyer: Is every claim backed by something real, or is it hand-waving?
3. art director: Does it have a point of view, or does it look like every other AI site?
4. typographer: Type scale, line length, wraps, orphans, the mono/grotesk split.
5. copy editor: Plain, specific, correct sentences. No filler, no hype.
6. accessibility auditor: WCAG AA contrast, landmarks, focus states, alt text, headings.
7. mobile thumb-user: Tap targets of 24px or more, reach, nothing hidden behind sticky bars at 390px.
8. performance engineer: Lighthouse performance, payload, fonts, layout shift.
9. seo: Title, meta, canonical, headings, sitemap, crawlability.
10. aeo / llm answer engine: Can an answer engine quote a clean, dated answer? JSON-LD, FAQ, llms.txt.
11. brand guardian: The banned list, the palette, and one accent reserved for the primary action.
12. conversion / cta: Is there one obvious next step, and does it work?
13. information architect: Section order, labels, and whether you can find things again.
14. developer copying the skill: Can I paste this and run it today? Is the output format defined?
15. non-native english reader: Jargon, idioms, and sentences that need a second read.
16. screen-reader user: Reading order, button names, live feedback, skip link.
17. trust / legal: Licence, attribution, no fake data, no personal info, honest claims.
18. competitor's designer: What would I steal, and what would I mock?
19. qa breaker: Edge cases: no clipboard, no js, slow images, odd widths, broken links.
20. would i share this: Would I post this link, and does the preview card make sense?

Final score = the median of the 20 scores, plus the list of open blockers.
Ship only when the median is 9.7 or higher AND there are zero blockers.
Merge all fixes into one list ranked by impact, fix from the top, rebuild, and re-score everyone from scratch. Cap it at 3 rounds, then escalate to the owner.

## Output format
```
score: 9.3 / 10
blockers:
  - sticky cta covers the email field at 390px
fixes (most important first):
  1. ...
```
