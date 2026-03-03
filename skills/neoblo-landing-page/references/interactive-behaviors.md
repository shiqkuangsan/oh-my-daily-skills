# Interactive Behaviors

Complete JavaScript implementations for the three core interaction systems: 3D card tilt, theme toggle, and i18n. Each section includes the full code, parameter reference, and edge case handling.

## 3D Card Tilt

Pointer-driven 3D rotation with spotlight gradient overlay. Uses `perspective` + `rotateX/Y` transforms with smoothstep easing to prevent jarring border-runs-away effects at card edges.

### Parameters

| Parameter          | Value | Description                                           |
| ------------------ | ----- | ----------------------------------------------------- |
| `maxTilt`          | 12    | Maximum rotation in degrees                           |
| `perspective`      | 800px | Set on parent grid, controls 3D depth perception      |
| `scale`            | 1.03  | Max scale factor at full tilt strength                |
| `edgePadding`      | 14    | Pixel inset to clamp raw pointer position near edges  |
| `tiltStartInset`   | 12    | Distance from edge (px) before tilt begins ramping up |
| `tiltRampDistance` | 26    | Distance (px) over which tilt strength ramps 0 to 1   |
| `leaveTolerance`   | 2     | Extra pixel margin for inside-rect checks on leave    |

### How It Works

1. **Pointer enters card** — capture `getBoundingClientRect()`, start listening to `pointermove` on `window` (not card, to handle projection shifts)
2. **Each move** — RAF-throttled update calculates:
   - Edge distance from all 4 sides
   - Smoothstep strength: `t * t * (3 - 2 * t)` where `t` is normalized edge distance
   - Rotation angles scaled by strength (prevents instant max tilt at edges)
   - Dynamic shadow offset mirrors rotation: `${-rotateY}px ${rotateX}px`
   - Spotlight gradient follows raw (unclamped) pointer for smooth tracking
3. **Pointer leaves** — deferred by one frame to check if truly outside (3D transforms shift the bounding rect)

### Touch Device Handling

Skip tilt entirely on touch — the `pointerenter` handler checks `e.pointerType === 'touch'` and returns early. This prevents stuck-tilt states from tap interactions.

### Full Implementation

```js
function initCardTilt() {
  const cards = document.querySelectorAll(".feature-card");

  cards.forEach((card) => {
    // Inject spotlight overlay
    const spotlight = document.createElement("div");
    spotlight.className = "card-spotlight";
    card.appendChild(spotlight);

    let isActive = false;
    let cardRect = null;
    let pointerX = 0;
    let pointerY = 0;
    let rafId = 0;

    const maxTilt = 12;
    const edgePadding = 14;
    const tiltStartInset = 12;
    const tiltRampDistance = 26;
    const leaveTolerance = 2;

    function isInsideCardRect(clientX, clientY, tolerance = 0) {
      if (!cardRect) return false;
      return (
        clientX >= cardRect.left - tolerance &&
        clientX <= cardRect.right + tolerance &&
        clientY >= cardRect.top - tolerance &&
        clientY <= cardRect.bottom + tolerance
      );
    }

    function resetTilt() {
      if (!isActive) return;
      isActive = false;
      cardRect = null;
      card.classList.remove("is-tilting");
      card.style.transform = "";
      card.style.boxShadow = "";
      spotlight.style.background = "";
      window.removeEventListener("pointermove", onPointerMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    function updateTiltFrame() {
      rafId = 0;
      if (!isActive || !cardRect) return;

      // Verify pointer is still inside (handles 3D projection edge cases)
      if (!isInsideCardRect(pointerX, pointerY, leaveTolerance)) {
        resetTilt();
        return;
      }

      const rawX = pointerX - cardRect.left;
      const rawY = pointerY - cardRect.top;
      const boundedRawX = Math.min(Math.max(rawX, 0), cardRect.width);
      const boundedRawY = Math.min(Math.max(rawY, 0), cardRect.height);

      // Clamp the very edge to keep the first few pixels stable on entry
      const x = Math.min(
        Math.max(rawX, edgePadding),
        cardRect.width - edgePadding,
      );
      const y = Math.min(
        Math.max(rawY, edgePadding),
        cardRect.height - edgePadding,
      );
      const centerX = cardRect.width / 2;
      const centerY = cardRect.height / 2;
      const edgeDistance = Math.min(
        boundedRawX,
        cardRect.width - boundedRawX,
        boundedRawY,
        cardRect.height - boundedRawY,
      );

      // Smoothstep ease-in from card edge
      const linearStrength = Math.min(
        Math.max((edgeDistance - tiltStartInset) / tiltRampDistance, 0),
        1,
      );
      const tiltStrength =
        linearStrength * linearStrength * (3 - 2 * linearStrength);

      const rotateY = ((x - centerX) / centerX) * maxTilt * tiltStrength;
      const rotateX = ((centerY - y) / centerY) * maxTilt * tiltStrength;
      const scale = 1 + 0.03 * tiltStrength;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

      // Shadow mirrors rotation for convincing 3D depth
      card.style.boxShadow = `${-rotateY}px ${rotateX}px 0 var(--border)`;

      // Spotlight follows raw pointer (unclamped) for smooth edge tracking
      spotlight.style.background = `radial-gradient(circle 180px at ${rawX}px ${rawY}px, rgba(255,255,255,0.25), transparent)`;
    }

    function queueTiltFrame() {
      if (rafId) return;
      rafId = requestAnimationFrame(updateTiltFrame);
    }

    function onPointerMove(e) {
      pointerX = e.clientX;
      pointerY = e.clientY;
      queueTiltFrame();
    }

    function onPointerEnter(e) {
      // Skip touch devices entirely
      if (e.pointerType === "touch" || isActive) return;
      cardRect = card.getBoundingClientRect();
      isActive = true;
      card.classList.add("is-tilting");
      pointerX = e.clientX;
      pointerY = e.clientY;
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      queueTiltFrame();
    }

    function onPointerLeave(e) {
      if (!isActive) return;
      pointerX = e.clientX;
      pointerY = e.clientY;

      // Defer reset: some leaves are caused by 3D projection changes
      requestAnimationFrame(() => {
        if (!isActive) return;
        if (!isInsideCardRect(pointerX, pointerY, leaveTolerance)) {
          resetTilt();
        }
      });
    }

    card.addEventListener("pointerenter", onPointerEnter);
    card.addEventListener("pointerleave", onPointerLeave);
    card.addEventListener("pointercancel", resetTilt);
    window.addEventListener("blur", resetTilt);
  });
}
```

### Required CSS

```css
/* Parent grid needs perspective */
.features-grid {
  perspective: 800px;
}

/* Cards need 3D transform context */
.feature-card {
  transform-style: preserve-3d;
  position: relative;
  overflow: hidden;
}

/* Spotlight overlay */
.feature-card .card-spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: inherit;
  z-index: 1;
}
.feature-card:hover .card-spotlight {
  opacity: 1;
}

/* Disable CSS transition when JS controls transform */
.feature-card.is-tilting {
  transition: none;
}
.feature-card.is-tilting:hover {
  transform: none;
}
```

## Theme Toggle

Three-state cycle: light -> dark -> system -> light. Persisted in `localStorage`. Includes FOUC prevention and system preference listener.

### FOUC Prevention Script

This **must** be in `<head>` before any CSS loads. It runs synchronously to set the `data-theme` attribute before the first paint:

```html
<script>
  (function () {
    const saved = localStorage.getItem("theme");
    const theme =
      saved === "system" || !saved
        ? matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : saved;
    document.documentElement.setAttribute("data-theme", theme);
  })();
</script>
```

### Full Implementation

```js
function getSystemTheme() {
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getEffectiveTheme(pref) {
  if (pref === "system" || !pref) return getSystemTheme();
  return pref;
}

function updateThemeIcon(pref) {
  const btn = document.querySelector("[data-theme-icon]");
  if (!btn) return;
  if (pref === "light")
    btn.textContent = "\u2600\uFE0F"; // sun
  else if (pref === "dark")
    btn.textContent = "\uD83C\uDF19"; // moon
  else btn.textContent = "\uD83D\uDDA5\uFE0F"; // monitor
}

function updateBlobityForTheme(theme) {
  if (!window.__blobity) return;
  if (theme === "dark") {
    window.__blobity.updateOptions({
      color: "#ffffff",
      dotColor: "#059669",
      fontColor: "#0d1117",
    });
  } else {
    window.__blobity.updateOptions({
      color: "#190a11",
      dotColor: "#6366f1",
      fontColor: "#000000",
    });
  }
}

function applyTheme(pref) {
  const effective = getEffectiveTheme(pref);
  document.documentElement.setAttribute("data-theme", effective);
  updateThemeIcon(pref);
  updateBlobityForTheme(effective);
}

function toggleTheme() {
  const saved = localStorage.getItem("theme") || "light";
  const next =
    saved === "light" ? "dark" : saved === "dark" ? "system" : "light";
  localStorage.setItem("theme", next);
  applyTheme(next);
}

// Initialize on load
(function initTheme() {
  const saved = localStorage.getItem("theme");
  const pref = saved || "light";
  applyTheme(pref);

  // Listen for OS-level theme changes when preference is "system"
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const current = localStorage.getItem("theme");
    if (current === "system" || !current) applyTheme("system");
  });
})();
```

### CSS Variables for Theme

All theme-dependent values use CSS custom properties on `:root` (light) and `[data-theme="dark"]`:

```css
:root {
  --bg: #fafaf9;
  --surface: #ffffff;
  --text: #0a0a0a;
  --text-secondary: #525252;
  --border: #0a0a0a;
  --shadow: 6px 6px 0 #0a0a0a;
  --shadow-hover: 10px 10px 0 #0a0a0a;
}

[data-theme="dark"] {
  --bg: #1a1a2e;
  --surface: #16213e;
  --text: #f5f5f5;
  --text-secondary: #a3a3a3;
  --border: #e5e5e5;
  --shadow: 6px 6px 0 #e5e5e5;
  --shadow-hover: 10px 10px 0 #e5e5e5;
}
```

### Blobity Color Mapping

Blobity uses `invert: true` (`mix-blend-mode: difference`), so the visible color is the complement of the specified value:

| Theme | `color` option | Visible result | `dotColor` option | Visible dot |
| ----- | -------------- | -------------- | ----------------- | ----------- |
| Light | `#190a11`      | Soft warm tint | `#6366f1`         | Purple      |
| Dark  | `#ffffff`      | White blob     | `#059669`         | Emerald     |

## i18n (Internationalization)

Attribute-based i18n system using `data-en` and `data-zh` attributes. No build step, no JSON files, no framework required.

### Pattern

```html
<h1 data-en="Hello World" data-zh="你好世界">Hello World</h1>
```

The default text content serves as fallback. JavaScript reads the appropriate `data-{lang}` attribute and replaces the element's content.

### Full Implementation

```js
let currentLang =
  localStorage.getItem("lang") ||
  (navigator.language.startsWith("zh") ? "zh" : "en");

function toggleLang() {
  currentLang = currentLang === "en" ? "zh" : "en";
  localStorage.setItem("lang", currentLang);
  applyLang();
}

function applyLang() {
  document.querySelectorAll("[data-en][data-zh]").forEach((el) => {
    const text = el.getAttribute(`data-${currentLang}`);
    // Preserve child elements (e.g., <br> in titles)
    if (el.children.length === 0) {
      el.textContent = text;
    } else {
      el.innerHTML = text;
    }
  });

  // Update toggle button label
  const btn = document.getElementById("lang-toggle");
  if (btn) {
    btn.textContent = currentLang === "en" ? "中文" : "English";
  }

  // Update document lang attribute
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
}
```

### Usage Notes

- **HTML inside attributes**: Use `<br>` in `data-zh="第一行<br>第二行"` — the `innerHTML` branch handles this when the element has child nodes
- **Dynamic elements**: Call `applyLang()` after inserting new DOM elements with `data-en`/`data-zh` attributes
- **Title tag**: Update `document.title` separately in `applyLang()` since `<title>` doesn't support data attributes easily
- **Extending to more languages**: Add `data-ja`, `data-ko` etc., and modify the toggle cycle accordingly

### Language Detection Priority

1. `localStorage.getItem('lang')` — user's explicit choice (survives page reloads)
2. `navigator.language.startsWith('zh')` — browser language auto-detection
3. `'en'` — default fallback

### Dynamic Demo Images (Optional)

For apps with theme-aware screenshots, construct the image path from current state:

```js
function updateDemoImage() {
  const img = document.querySelector(".demo-img");
  if (!img) return;
  const theme = document.documentElement.getAttribute("data-theme") || "light";
  img.src = `preview-${theme}-${currentLang}.webp`;
}
```

This requires 4 image variants: `preview-light-en.webp`, `preview-light-zh.webp`, `preview-dark-en.webp`, `preview-dark-zh.webp`.

## Initialization Order

The timing of initialization is critical to prevent visual glitches:

```
1. <head> inline script    — Theme FOUC prevention (synchronous, before CSS)
2. CSS loads               — Styles apply with correct theme already set
3. DOMContentLoaded        — i18n applyLang() + initCardTilt()
4. Dynamic import          — Blobity cursor (async, non-blocking)
```

```js
// In <head> — runs synchronously before first paint
(function () {
  const saved = localStorage.getItem("theme");
  const theme =
    saved === "system" || !saved
      ? matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : saved;
  document.documentElement.setAttribute("data-theme", theme);
})();

// At end of <body> or in deferred script
document.addEventListener("DOMContentLoaded", () => {
  applyLang();
  initCardTilt();
});

// Blobity — async, non-critical
import("https://esm.sh/blobity@0.2.3")
  .then(({ default: Blobity }) => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
    // ... init
  })
  .catch(() => {});
```
