# Light Themes

Three light themes with distinctive physical or editorial personalities. Each includes complete CSS variables, font loading, system fallbacks, and signature element implementations.

---

## Notebook Tabs

**Vibe:** Editorial, organized, elegant, tactile.

**Layout:** Cream paper card centered on dark outer background. Colorful section tabs on right edge (vertical text). Binder hole decorations on left side.

### Font Loading

```html
<link
  href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

### CSS Variables

```css
:root {
  /* Colors */
  --bg-primary: #2d2d2d;
  --bg-page: #f8f6f1;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --accent: #98d4bb;
  --tab-1: #98d4bb; /* Mint */
  --tab-2: #c7b8ea; /* Lavender */
  --tab-3: #f4b8c5; /* Pink */
  --tab-4: #a8d8ea; /* Sky */
  --tab-5: #ffe6a7; /* Cream */
  --code-bg: #f0ede6;
  --card-bg: #ffffff;
  --card-border: rgba(0, 0, 0, 0.08);

  /* Typography */
  --font-display: "Bodoni Moda", Didot, Georgia, serif;
  --font-body: "DM Sans", system-ui, -apple-system, sans-serif;
  --font-mono: "DM Mono", "SF Mono", "Cascadia Code", monospace;
}

body {
  background: var(--bg-primary);
}
```

### Signature Elements

**Paper container:**

```css
.notebook-page {
  background: var(--bg-page);
  color: var(--text-primary);
  border-radius: clamp(4px, 0.5vw, 8px);
  max-width: min(90vw, 1000px);
  max-height: min(85vh, 700px);
  margin: auto;
  padding: clamp(2rem, 4vw, 4rem);
  padding-left: clamp(3rem, 6vw, 5rem);
  position: relative;
  box-shadow:
    0 2px 20px rgba(0, 0, 0, 0.15),
    0 0 60px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
```

**Binder holes:**

```css
.notebook-page::before {
  content: "";
  position: absolute;
  left: clamp(0.75rem, 2vw, 1.5rem);
  top: 15%;
  width: clamp(8px, 1vw, 12px);
  height: 70%;
  background-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.12) clamp(3px, 0.4vw, 5px),
    transparent clamp(3px, 0.4vw, 5px)
  );
  background-size: clamp(8px, 1vw, 12px) clamp(28px, 4vh, 40px);
  background-repeat: repeat-y;
}
```

**Section tabs (right edge):**

```css
.tab-container {
  position: absolute;
  right: calc(-1 * clamp(28px, 3.5vw, 44px));
  top: 10%;
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 0.5vh, 8px);
}

.tab {
  width: clamp(28px, 3.5vw, 44px);
  height: clamp(48px, 8vh, 80px);
  border-radius: 0 clamp(4px, 0.5vw, 8px) clamp(4px, 0.5vw, 8px) 0;
  display: flex;
  align-items: center;
  justify-content: center;
  writing-mode: vertical-rl;
  font-family: var(--font-body);
  font-size: clamp(0.5rem, 1vh, 0.7rem);
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab:nth-child(1) {
  background: var(--tab-1);
}
.tab:nth-child(2) {
  background: var(--tab-2);
}
.tab:nth-child(3) {
  background: var(--tab-3);
}
.tab:nth-child(4) {
  background: var(--tab-4);
}
.tab:nth-child(5) {
  background: var(--tab-5);
}

.tab.active {
  width: clamp(36px, 4.5vw, 56px);
  font-weight: 700;
}
```

---

## Pastel Geometry

**Vibe:** Friendly, organized, modern, approachable.

**Layout:** White/cream card centered on soft pastel background. Vertical colored pills on right edge with varying heights. Clean, rounded corners everywhere.

### Font Loading

```html
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap"
  rel="stylesheet"
/>
```

### CSS Variables

```css
:root {
  /* Colors */
  --bg-primary: #c8d9e6;
  --card-bg: #faf9f7;
  --text-primary: #1a1a1a;
  --text-secondary: #6b7280;
  --accent: #5a7c6a;
  --pill-pink: #f0b4d4;
  --pill-mint: #a8d4c4;
  --pill-sage: #5a7c6a;
  --pill-lavender: #9b8dc4;
  --pill-violet: #7c6aad;
  --code-bg: #f0ede8;
  --card-border: rgba(0, 0, 0, 0.06);

  /* Typography */
  --font-display: "Plus Jakarta Sans", system-ui, -apple-system, sans-serif;
  --font-body: "Plus Jakarta Sans", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", "SF Mono", "Cascadia Code", monospace;
}
```

### Signature Elements

**Rounded card:**

```css
.pastel-card {
  background: var(--card-bg);
  color: var(--text-primary);
  border-radius: clamp(16px, 2.5vw, 32px);
  max-width: min(90vw, 1000px);
  max-height: min(85vh, 700px);
  margin: auto;
  padding: clamp(1.5rem, 4vw, 3.5rem);
  position: relative;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
```

**Vertical pills (right edge):**

```css
.pill-container {
  position: absolute;
  right: calc(-1 * clamp(10px, 1.5vw, 18px));
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: clamp(4px, 0.5vh, 8px);
}

.pill {
  width: clamp(10px, 1.5vw, 18px);
  border-radius: clamp(5px, 0.75vw, 9px);
  transition: all 0.3s ease;
}

/* Varying heights: short -> medium -> tall -> medium -> short */
.pill:nth-child(1) {
  height: clamp(20px, 3vh, 36px);
  background: var(--pill-pink);
}
.pill:nth-child(2) {
  height: clamp(32px, 5vh, 56px);
  background: var(--pill-mint);
}
.pill:nth-child(3) {
  height: clamp(48px, 8vh, 80px);
  background: var(--pill-sage);
}
.pill:nth-child(4) {
  height: clamp(32px, 5vh, 56px);
  background: var(--pill-lavender);
}
.pill:nth-child(5) {
  height: clamp(20px, 3vh, 36px);
  background: var(--pill-violet);
}

.pill.active {
  width: clamp(14px, 2vw, 24px);
}
```

**Category badge:**

```css
.geo-badge {
  display: inline-block;
  padding: clamp(0.2rem, 0.4vw, 0.35rem) clamp(0.5rem, 1vw, 0.85rem);
  background: var(--pill-mint);
  color: var(--text-primary);
  font-size: var(--small-size);
  font-weight: 600;
  border-radius: 100px;
  letter-spacing: 0.02em;
}
```

---

## Vintage Editorial

**Vibe:** Witty, confident, editorial, personality-driven.

**Layout:** Centered content on warm cream background. Abstract geometric shapes (circle outlines, lines, dots) as accent decorations. Bold bordered CTA boxes. Strong type hierarchy with serif headlines. No illustrations — only geometric CSS shapes.

### Font Loading

```html
<link
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,400&family=Work+Sans:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

### CSS Variables

```css
:root {
  /* Colors */
  --bg-primary: #f5f3ee;
  --text-primary: #1a1a1a;
  --text-secondary: #555555;
  --accent: #1a1a1a;
  --accent-warm: #e8d4c0;
  --accent-red: #c55a3f;
  --code-bg: #eae7e0;
  --card-bg: #ffffff;
  --card-border: #1a1a1a;

  /* Typography */
  --font-display: "Fraunces", Georgia, Palatino, serif;
  --font-body: "Work Sans", system-ui, -apple-system, sans-serif;
  --font-mono: "DM Mono", "SF Mono", "Cascadia Code", monospace;
}
```

### Signature Elements

**Geometric shape decoration:**

```css
.editorial-shapes {
  position: absolute;
  pointer-events: none;
  z-index: 0;
}

/* Large circle outline */
.shape-circle {
  position: absolute;
  width: clamp(80px, 15vw, 200px);
  height: clamp(80px, 15vw, 200px);
  border: 2px solid var(--accent-warm);
  border-radius: 50%;
  top: 10%;
  right: 8%;
  opacity: 0.4;
}

/* Diagonal line */
.shape-line {
  position: absolute;
  width: clamp(60px, 10vw, 150px);
  height: 2px;
  background: var(--accent-warm);
  bottom: 20%;
  right: 12%;
  transform: rotate(-30deg);
  opacity: 0.3;
}

/* Small dot */
.shape-dot {
  position: absolute;
  width: clamp(6px, 0.8vw, 12px);
  height: clamp(6px, 0.8vw, 12px);
  background: var(--accent-red);
  border-radius: 50%;
  top: 25%;
  right: 20%;
}
```

**Bold bordered CTA box:**

```css
.editorial-cta {
  display: inline-block;
  padding: clamp(0.5rem, 1vw, 0.85rem) clamp(1rem, 2vw, 1.75rem);
  border: 2px solid var(--card-border);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--body-size);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-primary);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.editorial-cta:hover {
  background: var(--text-primary);
  color: var(--bg-primary);
}
```

**Pull quote accent:**

```css
.editorial-pull-quote {
  border-left: 3px solid var(--accent-red);
  padding-left: clamp(0.75rem, 1.5vw, 1.5rem);
  font-family: var(--font-display);
  font-style: italic;
  font-size: var(--h3-size);
  color: var(--text-secondary);
}
```
