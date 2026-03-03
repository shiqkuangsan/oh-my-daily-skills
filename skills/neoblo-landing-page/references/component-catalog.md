# Component Catalog

Complete HTML + CSS for every Neoblo component. Each component includes all states (default, hover, active, disabled) and responsive behavior.

## Buttons

### Base Button

All buttons share the `.btn` class. The signature animation: lift up-left on hover, push down-right on active.

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  transition:
    transform 0.12s,
    box-shadow 0.12s;
  box-shadow: var(--shadow);
  background: var(--surface);
  color: var(--text);
}
.btn:hover {
  transform: translate(-3px, -3px);
  box-shadow: var(--shadow-hover);
}
.btn:active {
  transform: translate(3px, 3px);
  box-shadow: 2px 2px 0 var(--border);
}
```

### Primary Button

Filled background using `--accent` color:

```css
.btn-primary {
  background: var(--accent);
  color: #fff;
  border-color: var(--border);
}
.btn-primary:hover {
  background: var(--accent-hover);
}
```

```html
<a href="#" class="btn btn-primary">Get Started</a>
```

### Outline Button

Surface background, same border treatment:

```css
.btn-outline {
  background: var(--surface);
}
```

```html
<a href="#" class="btn btn-outline">
  <svg><!-- icon --></svg>
  <span>Source Code</span>
</a>
```

### Small Button

Used in nav for theme/lang toggles:

```css
.btn-sm {
  padding: 6px 14px;
  font-size: 14px;
  box-shadow: 4px 4px 0 var(--border);
}
.btn-sm:hover {
  box-shadow: 6px 6px 0 var(--border);
}
```

### Large Button

Used in CTA sections:

```css
.btn-lg {
  padding: 16px 36px;
  font-size: 18px;
  box-shadow: 8px 8px 0 var(--border);
}
.btn-lg:hover {
  box-shadow: 12px 12px 0 var(--border);
}
```

```html
<a href="#" class="btn btn-primary btn-lg">Get MyApp</a>
```

### Button States Summary

| State    | Transform               | Shadow                            |
| -------- | ----------------------- | --------------------------------- |
| Default  | none                    | `var(--shadow)` (6px 6px)         |
| Hover    | `translate(-3px, -3px)` | `var(--shadow-hover)` (10px 10px) |
| Active   | `translate(3px, 3px)`   | `2px 2px 0 var(--border)`         |
| Disabled | none + `opacity: 0.5`   | `var(--shadow)`                   |

## Feature Cards

### Standard Feature Card

Colorful background via `nth-child`, icon container, title, description. Includes 3D tilt support and spotlight overlay.

```html
<div class="features-grid">
  <div class="feature-card" data-blobity>
    <div class="feature-icon">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    </div>
    <h3>Feature Title</h3>
    <p>Feature description text goes here.</p>
  </div>
  <!-- Repeat for each card -->
</div>
```

### Card CSS

```css
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  perspective: 800px;
}

.feature-card {
  padding: 28px 24px;
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition:
    transform 0.12s,
    box-shadow 0.12s;
  transform-style: preserve-3d;
  position: relative;
  overflow: hidden;
}
.feature-card:hover {
  box-shadow: var(--shadow-hover);
}
```

### Color Cycling (6-Color)

```css
.feature-card:nth-child(1) {
  background: var(--card-1);
} /* lime/green */
.feature-card:nth-child(2) {
  background: var(--card-2);
} /* purple/amber */
.feature-card:nth-child(3) {
  background: var(--card-3);
} /* pink */
.feature-card:nth-child(4) {
  background: var(--card-4);
} /* cyan */
.feature-card:nth-child(5) {
  background: var(--card-5);
} /* orange */
.feature-card:nth-child(6) {
  background: var(--card-6);
} /* yellow */
```

For 8-card grids (4x2 layout like Recopy), extend with `--card-7` and `--card-8`.

### Icon Container

```css
.feature-icon {
  margin-bottom: 14px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--border-width) solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  box-shadow: 3px 3px 0 var(--border);
}
.feature-icon svg {
  width: 28px;
  height: 28px;
}
```

Icons use Feather icon style: `stroke="currentColor"`, `stroke-width="2.5"`, no `fill`. They inherit text color and scale cleanly.

### Card Typography

```css
.feature-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}
.feature-card p {
  font-size: 14px;
  color: var(--text);
  opacity: 0.8;
  line-height: 1.65;
}
```

## Navigation

### Sticky Nav Bar

```html
<nav class="nav">
  <div class="nav-inner">
    <a href="/" class="nav-logo">
      <img src="/icon.png" alt="Logo" width="32" height="32" />
      <span>AppName</span>
    </a>
    <div class="nav-actions">
      <a href="#features" class="nav-link">Features</a>
      <a href="https://github.com/..." target="_blank" class="nav-link"
        >GitHub</a
      >
      <button
        class="btn btn-sm"
        data-theme-icon
        onclick="toggleTheme()"
      ></button>
      <button
        id="lang-toggle"
        class="btn btn-sm"
        onclick="toggleLang()"
      ></button>
    </div>
  </div>
</nav>
```

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--accent); /* or var(--primary) */
  color: #fff;
  border-bottom: var(--border-width) solid var(--border);
}
.nav-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
.nav-link {
  font-weight: 700;
  font-size: 15px;
  padding: 4px 0;
  border-bottom: 3px solid transparent;
  transition: border-color 0.15s;
}
.nav-link:hover {
  border-bottom-color: var(--border);
}
```

### Mobile: Hide Nav Links

```css
@media (max-width: 768px) {
  .nav-link {
    display: none;
  }
}
```

## Hero Section

### Standard Hero

```html
<section class="hero">
  <div class="container">
    <div class="hero-badge">Open Source</div>
    <h1 class="hero-title">Your headline here.</h1>
    <p class="hero-desc">One-sentence value proposition.</p>
    <div class="hero-actions">
      <a href="#" class="btn btn-primary">Primary CTA</a>
      <a href="#" class="btn btn-outline">Secondary CTA</a>
    </div>
  </div>
</section>
```

```css
.hero {
  padding: 80px 0 60px;
  text-align: center;
  background: var(--bg);
}
.hero-badge {
  display: inline-block;
  padding: 6px 18px;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-mono);
  background: var(--primary);
  color: #fff;
  border: var(--border-width) solid var(--border);
  border-radius: 999px;
  box-shadow: 4px 4px 0 var(--border);
  margin-bottom: 28px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.hero-title {
  font-size: clamp(36px, 6vw, 68px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 24px;
}
.hero-desc {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 540px;
  margin: 0 auto 40px;
  line-height: 1.7;
}
.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}
```

## Demo Window

Browser window mockup with macOS traffic light controls:

```html
<section class="demo">
  <div class="container">
    <div class="demo-window">
      <div class="demo-titlebar">
        <span class="demo-dot" style="background:#ff5f57"></span>
        <span class="demo-dot" style="background:#febc2e"></span>
        <span class="demo-dot" style="background:#28c840"></span>
        <span class="demo-titlebar-text">App Name</span>
      </div>
      <img src="demo.gif" alt="Demo" class="demo-img" loading="lazy" />
    </div>
  </div>
</section>
```

```css
.demo {
  padding: 40px 0 80px;
}
.demo-window {
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 10px 10px 0 var(--border);
  background: #1a1a1a;
}
.demo-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  background: #2d2d2d;
  border-bottom: var(--border-width) solid var(--border);
}
.demo-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.3);
}
.demo-titlebar-text {
  flex: 1;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #888;
  font-family: var(--font-mono);
  margin-right: 60px; /* offset for dot width balance */
}
.demo-img {
  display: block;
  width: 100%;
}
```

## Footer

### Simple Footer

```html
<footer class="footer">
  <div class="container footer-inner">
    <span>&copy; 2026 AppName</span>
    <div class="footer-links">
      <a href="privacy.html">Privacy</a>
      <a href="https://github.com/...">GitHub</a>
      <a href="LICENSE">MIT License</a>
    </div>
  </div>
</footer>
```

```css
.footer {
  padding: 24px 0;
  border-top: var(--border-width) solid var(--border);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg);
}
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.footer-links {
  display: flex;
  gap: 24px;
}
.footer-links a {
  font-weight: 600;
  transition: color 0.15s;
}
.footer-links a:hover {
  color: var(--primary);
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
```

## Section Title (Shared)

```css
.section-title {
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px;
  letter-spacing: -1px;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 28px;
  }
}
```

Optional subtitle:

```css
.section-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  text-align: center;
  max-width: 560px;
  margin: -32px auto 48px;
  line-height: 1.7;
}
```

## CTA Section

Full-width colored call-to-action:

```html
<section class="cta">
  <div class="container">
    <h2>Ready to get started?</h2>
    <p>Free, open-source, zero dependencies.</p>
    <a href="#" class="btn btn-primary btn-lg">Get AppName</a>
  </div>
</section>
```

```css
.cta {
  padding: 80px 0;
  text-align: center;
  background: var(--primary);
  color: #fff;
  border-top: var(--border-width) solid var(--border);
  border-bottom: var(--border-width) solid var(--border);
}
.cta h2 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -1px;
}
.cta p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 36px;
}
.cta .btn-primary {
  background: var(--accent);
  color: #fff;
  border-color: var(--border);
  font-size: 20px;
  padding: 18px 40px;
}
.cta .btn-primary:hover {
  background: var(--accent-hover);
}
```

---

## Optional Components

These components are used in specific projects and can be added as needed.

### Comparison Table (Recopy Pattern)

Two-column good/bad comparison with color-coded hover:

```html
<section class="tech-highlights">
  <div class="container">
    <h2 class="section-title">Why Us?</h2>
    <div class="compare-table">
      <div class="compare-header">
        <div class="compare-col compare-col-others">Others</div>
        <div class="compare-col compare-col-recopy">Our App</div>
      </div>
      <div class="compare-row">
        <div class="compare-cell compare-bad">
          <span class="compare-x">&times;</span> Slow and bloated
        </div>
        <div class="compare-cell compare-good">
          <span class="compare-check">&check;</span> Fast and lightweight
        </div>
      </div>
      <!-- More rows -->
    </div>
  </div>
</section>
```

```css
.compare-table {
  max-width: 900px;
  margin: 0 auto;
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}
.compare-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.compare-col {
  padding: 16px 24px;
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  font-family: var(--font-mono);
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: var(--border-width) solid var(--border);
}
.compare-col-others {
  background: var(--bg);
  color: var(--text-secondary);
}
.compare-col-recopy {
  background: var(--primary);
  color: #fff;
  border-left: var(--border-width) solid var(--border);
}
.compare-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 2px solid var(--border);
}
.compare-row:last-child {
  border-bottom: none;
}
.compare-cell {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 24px;
  font-size: 15px;
  line-height: 1.5;
  transition: background 0.15s;
}
.compare-cell:last-child {
  border-left: var(--border-width) solid var(--border);
}
.compare-bad {
  background: var(--bg);
  color: var(--text-secondary);
}
.compare-good {
  background: var(--surface);
  color: var(--text);
  font-weight: 600;
}
.compare-row:hover .compare-bad {
  background: color-mix(in srgb, var(--card-3) 15%, var(--bg));
}
.compare-row:hover .compare-good {
  background: color-mix(in srgb, var(--card-1) 20%, var(--surface));
}
.compare-x,
.compare-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  font-size: 16px;
  font-weight: 800;
  border: 2px solid var(--border);
  border-radius: 50%;
}
.compare-x {
  background: var(--card-3);
  color: #fff;
}
.compare-check {
  background: var(--accent);
  color: #fff;
}
```

### Timeline (Recopy Pattern)

Horizontal numbered steps with dashed connector line:

```html
<section class="how-it-works">
  <div class="container">
    <h2 class="section-title">How It Works</h2>
    <div class="timeline">
      <div class="timeline-line"></div>
      <div class="timeline-step">
        <div class="timeline-number">1</div>
        <div class="timeline-content">
          <div class="timeline-icon">
            <svg><!-- icon --></svg>
          </div>
          <h3>Step Title</h3>
          <p>Step description.</p>
        </div>
      </div>
      <!-- More steps -->
    </div>
  </div>
</section>
```

```css
.how-it-works {
  padding: 80px 0;
  background: var(--bg);
}
.timeline {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;
}
.timeline-line {
  position: absolute;
  top: 24px;
  left: 60px;
  right: 60px;
  height: 4px;
  border-top: 4px dashed var(--border);
  z-index: 0;
}
.timeline-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
}
.timeline-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 22px;
  font-weight: 800;
  font-family: var(--font-mono);
  background: var(--primary);
  color: #fff;
  border: var(--border-width) solid var(--border);
  border-radius: 50%;
  box-shadow: 4px 4px 0 var(--border);
  margin-bottom: 20px;
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s;
}
.timeline-step:hover .timeline-number {
  transform: translateY(-8px) scale(1.15);
  box-shadow: 6px 10px 0 var(--border);
}
.timeline-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  border: var(--border-width) solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  box-shadow: 3px 3px 0 var(--border);
}
.timeline-content h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}
.timeline-content p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.65;
}

/* Mobile: stack vertically, hide connector */
@media (max-width: 768px) {
  .timeline {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
  .timeline-line {
    display: none;
  }
}
```

### Keyboard Shortcuts Showcase (Recopy Pattern)

Physical-feeling key display with press animation:

```html
<section class="shortcuts">
  <div class="container">
    <h2 class="section-title">Keyboard Shortcuts</h2>
    <div class="key-showcase">
      <div class="key-item">
        <div class="key-combo">
          <kbd class="key-lg">&#x2318;</kbd>
          <kbd class="key-lg">C</kbd>
        </div>
        <span class="key-label">Copy</span>
      </div>
      <div class="key-item key-item-accent">
        <div class="key-combo">
          <kbd class="key-lg key-wide">Space</kbd>
        </div>
        <span class="key-label">Preview</span>
      </div>
    </div>
  </div>
</section>
```

```css
.shortcuts {
  padding: 80px 0;
  background: var(--bg);
}
.key-showcase {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;
}
.key-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.key-combo {
  display: flex;
  gap: 8px;
}
.key-lg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  height: 52px;
  padding: 8px 16px;
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 700;
  background: var(--surface);
  color: var(--text);
  border: var(--border-width) solid var(--border);
  border-radius: 10px;
  box-shadow: 0 4px 0 var(--border);
  transition:
    transform 0.1s,
    box-shadow 0.1s;
}
.key-lg:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 var(--border);
}
.key-lg:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 var(--border);
}
.key-wide {
  min-width: 100px;
}
.key-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}
/* Accent variant */
.key-item-accent .key-lg {
  background: var(--primary);
  color: #fff;
}
```

### Homebrew Copy Block (Recopy Pattern)

Click-to-copy command with "Copied!" feedback animation:

```html
<div class="hero-brew-commands">
  <div class="hero-brew-row">
    <span class="hero-brew-label">Install</span>
    <code class="hero-brew-cmd" onclick="copyCmd(this)"
      >brew install myapp</code
    >
  </div>
  <div class="hero-brew-row">
    <span class="hero-brew-label">Upgrade</span>
    <code class="hero-brew-cmd" onclick="copyCmd(this)"
      >brew upgrade myapp</code
    >
  </div>
</div>
```

```js
function copyCmd(el) {
  navigator.clipboard.writeText(el.textContent);
  el.classList.add("copied");
  setTimeout(() => el.classList.remove("copied"), 1200);
}
```

```css
.hero-brew-cmd {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  transition:
    box-shadow 0.15s,
    transform 0.15s;
  position: relative;
}
.hero-brew-cmd:hover {
  box-shadow: var(--shadow);
  transform: translate(-2px, -2px);
}
.hero-brew-cmd.copied::after {
  content: "Copied!";
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: #fff;
  font-family: var(--font);
  font-size: 0.75rem;
  padding: 2px 10px;
  border-radius: 6px;
  pointer-events: none;
  animation: fadeUp 1s forwards;
}
@keyframes fadeUp {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-8px);
  }
}
```

### Lightbox (Recopy Pattern)

Fullscreen image overlay for demo screenshots:

```html
<div class="lightbox" id="lightbox" onclick="closeLightbox()">
  <img id="lightbox-img" src="" alt="Enlarged view" />
</div>
```

```js
function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  document.getElementById("lightbox-img").src = src;
  lb.classList.add("is-open");
  document.addEventListener("keydown", onEscClose);
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("is-open");
  document.removeEventListener("keydown", onEscClose);
}
function onEscClose(e) {
  if (e.key === "Escape") closeLightbox();
}
```

```css
.lightbox {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  cursor: zoom-out;
  align-items: center;
  justify-content: center;
  padding: 40px;
}
.lightbox.is-open {
  display: flex;
  animation: lightbox-in 0.25s ease-out;
}
.lightbox img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: var(--radius);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
}
@keyframes lightbox-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```
