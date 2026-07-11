---
name: tooyoung:neoblo-landing-page
description: "Use when building or restyling a static marketing page in the repository's Neoblo visual system: neobrutalist borders and shadows, colorful sections, optional Blobity cursor, theme switching, i18n, and card interactions."
metadata:
  version: "1.1.0"
  author: shiqkuangsan
  visibility: public
---

# Neoblo Landing Page

Apply the repository's Neoblo design system: neobrutalist structure with optional Blobity interactions. This skill is a style contract and resource router, not a generic landing-page tutorial.

## Resource Routing

| Need                                    | Read                                  |
| --------------------------------------- | ------------------------------------- |
| Full static starting point              | `references/page-template.md`         |
| Buttons, cards, nav, hero, demo, footer | `references/component-catalog.md`     |
| 3D tilt, theme toggle, i18n             | `references/interactive-behaviors.md` |
| Blobity details                         | `tooyoung:blobity-cursor`             |

Load only the resources needed for the requested page. Adapt the template to the product; do not preserve placeholder sections or copy.

## Style Contract

- Strong 3px borders and hard bottom-right shadows.
- Limited corner radius; avoid soft SaaS card styling.
- Use several distinct card colors, not one hue repeated at different lightness levels.
- Typography defaults to `Space Grotesk` plus `Space Mono`, with system fallbacks.
- Store all palette, border, shadow, spacing, and typography values in CSS custom properties.
- Component CSS consumes tokens; raw colors belong only in token definitions or intentional media details.
- Hover moves elements up-left while enlarging the bottom-right shadow; active state reverses the movement.
- Dark theme must redefine surfaces, text, borders, shadows, and card colors, not merely invert the page.

## Page Composition

Build the actual product page, using only sections justified by content. Typical order:

```text
nav -> hero -> product/demo evidence -> features -> optional proof/process -> CTA -> footer
```

The hero must identify the product or offer in the first viewport. Use real screenshots, demos, or product media when available. Do not fabricate decorative product previews.

## Interaction Rules

- Theme state persists and is applied before first paint.
- i18n text remains data-driven; do not duplicate whole DOM trees per language.
- 3D tilt and Blobity are desktop enhancements and must be disabled for touch input.
- Respect `prefers-reduced-motion`.
- Initialize each behavior once and clean it up on navigation/unmount.

## Responsive Rules

- Desktop: 3-4 feature columns when content fits.
- Tablet: 2 columns.
- Mobile: 1 column; simplify navigation and interactions.
- CJK copy must wrap without splitting identifiers or overflowing buttons/cards.
- Stable media dimensions prevent layout shift.

## Verification

Before completion, inspect desktop and mobile renderings and verify:

- no overflow, overlap, clipped text, or horizontal scroll
- both themes preserve contrast and shadow direction
- keyboard focus remains visible
- touch mode has no cursor/tilt artifacts
- media is real, correctly framed, and nonblank
- optional sections were removed when they lacked meaningful content

## Boundaries

- Do not use Neoblo for dense operational dashboards unless explicitly requested.
- Do not make every section a floating card.
- Do not force Blobity, theme switching, i18n, or tilt into a page that does not need them.
