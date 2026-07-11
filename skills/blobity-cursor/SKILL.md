---
name: tooyoung:blobity-cursor
description: "Use when adding or repairing Blobity cursor effects in HTML, React, Vue, or Astro, especially for theme-aware colors, tooltip mode, touch-device behavior, and SPA lifecycle cleanup."
metadata:
  version: "1.1.0"
  author: shiqkuangsan
  visibility: public
---

# Blobity Cursor

Integrate Blobity as a desktop-only progressive enhancement. The value of this skill is the library-specific lifecycle, blend-mode math, and framework adapters; ordinary UI implementation stays with the agent.

## Resource Routing

- Read `references/frameworks.md` only for the framework in use: React, Vue 3, Vue 2, or Astro.
- Read `references/color-math.md` when `invert: true` produces black, invisible, or off-brand colors.
- For plain HTML, use the minimal contract below without loading framework references.

## Minimal Contract

```js
import Blobity from "blobity";

const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
if (!isTouch) {
  const blobity = new Blobity({
    licenseKey: "opensource",
    invert: true,
    color: "#ffffff",
    dotColor: "#10b981",
    radius: 6,
    magnetic: false,
    zIndex: 50,
    focusableElements: "a, button, [data-blobity], [data-blobity-tooltip]",
  });
}
```

Install from npm in bundled projects. For a no-build static page, use the pinned ESM import `https://esm.sh/blobity@0.2.3`; do not use an unpinned `latest` URL.

Hide the native cursor only after Blobity initializes successfully. Scope `cursor: none` to a class such as `body.blobity-active`, and remove the class during cleanup.

## Theme Rule

With `invert: true`, output is approximately `abs(page - canvas)`:

- dark background: use a light Blobity `color`
- light background: use a dark Blobity `color`
- update `color`, `dotColor`, and `fontColor` when the app theme changes

Do not guess custom light-theme colors when visual fidelity matters; use `references/color-math.md`.

## Interaction and Lifecycle

- Add `data-blobity` for shape expansion and `data-blobity-tooltip="..."` for labels.
- Include both attributes in `focusableElements`.
- Skip initialization on touch devices; do not replace tap behavior with hover behavior.
- On SPA unmount, route transition, or Astro swap: disconnect observers, call `blobity.destroy()`, and remove `blobity-active`.
- Keep the canvas above page content but below dialogs that must own pointer context.
- Respect `prefers-reduced-motion`; disable optional bounce and magnetic effects when reduction is requested.

## Verification

Verify on desktop and touch-sized viewports:

- default cursor is hidden only while Blobity is active
- links/buttons remain clickable because the canvas has no pointer events
- light and dark themes keep the cursor visible
- tooltips are readable
- navigation does not leave duplicate canvases
- touch devices receive the normal cursor-free mobile experience

## Boundaries

- Do not add Blobity when the user requests native cursor behavior or the product is primarily touch-driven.
- Do not copy all framework templates into the answer; load and adapt only the matching section.
- Peer dependency warnings alone are not a reason to install unused React/Vue bindings.
