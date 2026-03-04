# Specialty Themes

Two genre-specific themes with strong visual identity. Each includes complete CSS variables, font loading, system fallbacks, and signature element implementations.

---

## Neon Cyber

**Vibe:** Futuristic, techy, confident.

**Layout:** Deep navy background with grid pattern overlay. Neon glow accents in cyan and magenta. Particle backgrounds on title slides. Grid lines as subtle texture.

### Font Loading

```html
<link
  href="https://api.fontshare.com/v2/css?f[]=clash-display@700&f[]=satoshi@400,500,700&display=swap"
  rel="stylesheet"
/>
```

### CSS Variables

```css
:root {
  /* Colors */
  --bg-primary: #0a0f1c;
  --bg-secondary: #111827;
  --text-primary: #ffffff;
  --text-secondary: #9ca3af;
  --accent: #00ffcc;
  --accent-glow: rgba(0, 255, 204, 0.3);
  --accent-magenta: #ff00aa;
  --accent-magenta-glow: rgba(255, 0, 170, 0.3);
  --code-bg: rgba(17, 24, 39, 0.8);
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-border: rgba(0, 255, 204, 0.15);

  /* Typography */
  --font-display: "Clash Display", system-ui, -apple-system, sans-serif;
  --font-body: "Satoshi", system-ui, -apple-system, sans-serif;
  --font-mono:
    "JetBrains Mono", "SF Mono", "Cascadia Code", "Fira Code", monospace;
}
```

### Signature Elements

**Grid pattern background:**

```css
.cyber-grid {
  position: relative;
}

.cyber-grid::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 255, 204, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 204, 0.03) 1px, transparent 1px);
  background-size: clamp(30px, 5vw, 60px) clamp(30px, 5vw, 60px);
  pointer-events: none;
}
```

**Neon glow text:**

```css
.neon-text {
  color: var(--accent);
  text-shadow:
    0 0 10px var(--accent-glow),
    0 0 40px var(--accent-glow),
    0 0 80px rgba(0, 255, 204, 0.1);
}

.neon-text-magenta {
  color: var(--accent-magenta);
  text-shadow:
    0 0 10px var(--accent-magenta-glow),
    0 0 40px var(--accent-magenta-glow);
}
```

**Neon border card:**

```css
.cyber-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: clamp(4px, 0.5vw, 8px);
  padding: clamp(1rem, 2vw, 2rem);
  position: relative;
  backdrop-filter: blur(10px);
}

.cyber-card::after {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    var(--accent-glow),
    transparent 50%,
    var(--accent-magenta-glow)
  );
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-card:hover::after {
  opacity: 1;
}
```

**Particle background (canvas for title slides):**

```html
<canvas class="particles" id="particleCanvas"></canvas>
```

```css
.particles {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
```

```javascript
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(
      60,
      Math.floor((canvas.width * canvas.height) / 15000),
    );
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 255, 204, ${0.1 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 255, 204, 0.6)";
      ctx.fill();

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(draw);
  }

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  resize();
  createParticles();
  draw();
  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
}

// Call on DOMContentLoaded for each canvas
document.addEventListener("DOMContentLoaded", () => {
  initParticles("particleCanvas");
});
```

**Scan line overlay (subtle):**

```css
.scan-lines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  pointer-events: none;
}
```

---

## Terminal Green

**Vibe:** Developer-focused, hacker aesthetic, retro terminal.

**Layout:** GitHub-dark background. Everything in monospace. Terminal-style prompt prefixes. Blinking cursor after headings. Scan line overlay. Green-on-dark color scheme.

### Font Loading

```html
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400&display=swap"
  rel="stylesheet"
/>
```

### CSS Variables

```css
:root {
  /* Colors */
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  --text-primary: #c9d1d9;
  --text-secondary: #8b949e;
  --accent: #39d353;
  --accent-glow: rgba(57, 211, 83, 0.3);
  --accent-dim: #238636;
  --code-bg: #161b22;
  --card-bg: rgba(22, 27, 34, 0.8);
  --card-border: #30363d;

  /* Typography — monospace everything */
  --font-display:
    "JetBrains Mono", "SF Mono", "Cascadia Code", "Fira Code", monospace;
  --font-body:
    "JetBrains Mono", "SF Mono", "Cascadia Code", "Fira Code", monospace;
  --font-mono:
    "JetBrains Mono", "SF Mono", "Cascadia Code", "Fira Code", monospace;
}
```

### Signature Elements

**Terminal prompt prefix:**

```css
.terminal-prompt::before {
  content: "$ ";
  color: var(--accent);
  font-weight: 700;
}

.terminal-prompt-root::before {
  content: "# ";
  color: var(--accent);
  font-weight: 700;
}

.terminal-prompt-arrow::before {
  content: "> ";
  color: var(--accent);
  font-weight: 700;
}
```

**Blinking cursor:**

```css
.blink-cursor::after {
  content: "_";
  color: var(--accent);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .blink-cursor::after {
    animation: none;
    opacity: 1;
  }
}
```

**Terminal window frame:**

```css
.terminal-window {
  background: var(--bg-secondary);
  border: 1px solid var(--card-border);
  border-radius: clamp(6px, 0.8vw, 12px);
  overflow: hidden;
  max-width: min(90vw, 900px);
  max-height: min(80vh, 650px);
}

.terminal-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: clamp(0.4rem, 0.8vw, 0.65rem) clamp(0.75rem, 1.5vw, 1.25rem);
  background: var(--bg-primary);
  border-bottom: 1px solid var(--card-border);
}

.terminal-titlebar .dots {
  display: flex;
  gap: 6px;
}

.terminal-titlebar .dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.terminal-titlebar .dots span:nth-child(1) {
  background: #ff5f57;
}
.terminal-titlebar .dots span:nth-child(2) {
  background: #ffbd2e;
}
.terminal-titlebar .dots span:nth-child(3) {
  background: #28c840;
}

.terminal-titlebar .title {
  font-size: var(--small-size);
  color: var(--text-secondary);
  flex: 1;
  text-align: center;
}

.terminal-body {
  padding: clamp(1rem, 2vw, 2rem);
}
```

**Scan lines (full screen):**

```css
.terminal-scanlines::after {
  content: "";
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.05) 2px,
    rgba(0, 0, 0, 0.05) 4px
  );
  pointer-events: none;
  z-index: 999;
}
```

**ASCII art section divider:**

```css
.ascii-divider {
  font-family: var(--font-mono);
  font-size: var(--small-size);
  color: var(--accent-dim);
  white-space: pre;
  text-align: center;
  line-height: 1.2;
}
```

Example usage in HTML:

```html
<div class="ascii-divider reveal">═══════════════════════════════════════</div>
```

**Green highlight text:**

```css
.terminal-highlight {
  color: var(--accent);
  text-shadow: 0 0 8px var(--accent-glow);
}

.terminal-badge {
  display: inline-block;
  padding: clamp(0.15rem, 0.3vw, 0.25rem) clamp(0.4rem, 0.8vw, 0.65rem);
  background: var(--accent-dim);
  color: #ffffff;
  font-size: var(--small-size);
  border-radius: 4px;
  font-weight: 700;
}
```
