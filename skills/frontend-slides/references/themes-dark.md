# Dark Themes

Three dark themes with high visual contrast and strong personality. Each includes complete CSS variables, font loading, system fallbacks, and signature element implementations.

---

## Bold Signal

**Vibe:** Confident, bold, modern, high-impact.

**Layout:** Colored card as focal point on dark gradient. Large section numbers (01, 02...) top-left. Navigation breadcrumbs top-right.

### Font Loading

```html
<link
  href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

### CSS Variables

```css
:root {
  /* Colors */
  --bg-primary: #1a1a1a;
  --bg-gradient: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  --card-bg: #ff5722;
  --card-bg-alt: #e91e63;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.6);
  --text-on-card: #1a1a1a;
  --accent: #ff5722;
  --code-bg: rgba(0, 0, 0, 0.4);
  --card-border: rgba(255, 255, 255, 0.08);

  /* Typography */
  --font-display: "Archivo Black", Impact, "Arial Black", sans-serif;
  --font-body: "Space Grotesk", system-ui, -apple-system, sans-serif;
  --font-mono: "Space Mono", "SF Mono", "Cascadia Code", monospace;
}

body {
  background: var(--bg-gradient);
}
```

### Signature Elements

**Colored content card:**

```css
.bold-card {
  background: var(--card-bg);
  color: var(--text-on-card);
  border-radius: clamp(12px, 2vw, 24px);
  padding: clamp(1.5rem, 4vw, 3rem);
  max-width: min(85vw, 900px);
  max-height: min(75vh, 650px);
  position: relative;
}

/* Alternate card colors for variety */
.slide:nth-child(even) .bold-card {
  background: var(--card-bg-alt);
}
```

**Section number overlay:**

```css
.section-number {
  position: absolute;
  top: clamp(1rem, 3vw, 2rem);
  left: clamp(1rem, 3vw, 2rem);
  font-family: var(--font-display);
  font-size: clamp(1rem, 2.5vw, 1.75rem);
  color: var(--text-primary);
  opacity: 0.3;
}
```

**Navigation breadcrumb:**

```css
.slide-nav {
  position: absolute;
  top: clamp(1rem, 3vw, 2rem);
  right: clamp(1rem, 3vw, 2rem);
  display: flex;
  gap: clamp(0.5rem, 1vw, 1rem);
  font-size: var(--small-size);
  font-family: var(--font-body);
}

.slide-nav span {
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 0.3s;
}

.slide-nav span.active {
  opacity: 1;
  color: var(--accent);
}
```

---

## Creative Voltage

**Vibe:** Bold, creative, energetic, retro-modern.

**Layout:** Split panels — electric blue left half, dark right half. Script/mono typography accents. Neon yellow highlights.

### Font Loading

```html
<link
  href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

### CSS Variables

```css
:root {
  /* Colors */
  --bg-primary: #1a1a2e;
  --bg-blue: #0066ff;
  --accent-neon: #d4ff00;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.6);
  --text-on-blue: #ffffff;
  --accent: #d4ff00;
  --code-bg: rgba(0, 0, 0, 0.5);
  --card-bg: rgba(255, 255, 255, 0.05);
  --card-border: rgba(255, 255, 255, 0.1);

  /* Typography */
  --font-display: "Syne", "Trebuchet MS", system-ui, sans-serif;
  --font-body: "Space Mono", "Courier New", monospace;
  --font-mono: "Space Mono", "Courier New", monospace;
}
```

### Signature Elements

**Split panel layout:**

```css
.split-slide {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.split-left {
  background: var(--bg-blue);
  padding: var(--slide-padding);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.split-right {
  background: var(--bg-primary);
  padding: var(--slide-padding);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 600px) {
  .split-slide {
    grid-template-columns: 1fr;
  }
  .split-left,
  .split-right {
    padding: calc(var(--slide-padding) / 2);
  }
}
```

**Halftone texture overlay:**

```css
.halftone::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.08) 1px,
    transparent 1px
  );
  background-size: clamp(8px, 1.5vw, 16px) clamp(8px, 1.5vw, 16px);
  pointer-events: none;
}
```

**Neon badge:**

```css
.neon-badge {
  display: inline-block;
  padding: clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.75rem, 1.5vw, 1.25rem);
  background: var(--accent-neon);
  color: #1a1a2e;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: var(--small-size);
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## Dark Botanical

**Vibe:** Elegant, sophisticated, artistic, premium.

**Layout:** Centered content on near-black background. Abstract soft gradient circles in corners. Warm accent colors (gold, pink, terracotta). No illustrations — only CSS shapes.

### Font Loading

```html
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Sans:wght@300;400;500&display=swap"
  rel="stylesheet"
/>
```

### CSS Variables

```css
:root {
  /* Colors */
  --bg-primary: #0f0f0f;
  --text-primary: #e8e4df;
  --text-secondary: #9a9590;
  --accent-warm: #d4a574;
  --accent-pink: #e8b4b8;
  --accent-gold: #c9b896;
  --accent: #d4a574;
  --code-bg: rgba(255, 255, 255, 0.04);
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-border: rgba(197, 160, 89, 0.15);

  /* Typography */
  --font-display: "Cormorant", Georgia, "Times New Roman", serif;
  --font-body: "IBM Plex Sans", system-ui, -apple-system, sans-serif;
  --font-mono: "IBM Plex Mono", "SF Mono", "Cascadia Code", monospace;
}
```

### Signature Elements

**Abstract gradient circles (decorative background):**

```css
.botanical-bg::before,
.botanical-bg::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}

.botanical-bg::before {
  width: clamp(200px, 30vw, 400px);
  height: clamp(200px, 30vw, 400px);
  background: radial-gradient(circle, var(--accent-pink) 0%, transparent 70%);
  top: -10%;
  right: -5%;
  opacity: 0.15;
}

.botanical-bg::after {
  width: clamp(250px, 35vw, 500px);
  height: clamp(250px, 35vw, 500px);
  background: radial-gradient(circle, var(--accent-gold) 0%, transparent 70%);
  bottom: -15%;
  left: -10%;
  opacity: 0.1;
}
```

**Thin vertical accent line:**

```css
.botanical-line {
  position: absolute;
  left: clamp(2rem, 5vw, 4rem);
  top: 20%;
  height: 60%;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--accent-gold) 30%,
    var(--accent-gold) 70%,
    transparent
  );
  opacity: 0.3;
}
```

**Image framing:**

```css
.botanical-frame {
  border: 1px solid rgba(197, 160, 89, 0.2);
  box-shadow: 0 0 20px rgba(197, 160, 89, 0.08);
  border-radius: clamp(4px, 0.5vw, 8px);
}
```

**Italic signature text:**

```css
.botanical-signature {
  font-family: var(--font-display);
  font-style: italic;
  font-size: var(--h3-size);
  color: var(--accent-warm);
  letter-spacing: 0.02em;
}
```
