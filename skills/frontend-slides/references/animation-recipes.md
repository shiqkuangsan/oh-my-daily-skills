# Animation Recipes

Reusable animation patterns for slide presentations. All animations respect `prefers-reduced-motion` via the base CSS in the slide template.

## Reveal Animations

### Fade Up (Default)

Already included in the slide template. Apply `.reveal` class to any element.

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity var(--duration-normal) var(--ease-out-expo),
    transform var(--duration-normal) var(--ease-out-expo);
}

.slide.visible .reveal {
  opacity: 1;
  transform: translateY(0);
}
```

### Slide In from Left

```css
.reveal-left {
  opacity: 0;
  transform: translateX(-50px);
  transition:
    opacity 0.6s var(--ease-out-expo),
    transform 0.6s var(--ease-out-expo);
}

.slide.visible .reveal-left {
  opacity: 1;
  transform: translateX(0);
}
```

### Slide In from Right

```css
.reveal-right {
  opacity: 0;
  transform: translateX(50px);
  transition:
    opacity 0.6s var(--ease-out-expo),
    transform 0.6s var(--ease-out-expo);
}

.slide.visible .reveal-right {
  opacity: 1;
  transform: translateX(0);
}
```

### Scale In

```css
.reveal-scale {
  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity 0.6s var(--ease-out-expo),
    transform 0.6s var(--ease-out-expo);
}

.slide.visible .reveal-scale {
  opacity: 1;
  transform: scale(1);
}
```

### Blur In

```css
.reveal-blur {
  opacity: 0;
  filter: blur(10px);
  transition:
    opacity 0.8s var(--ease-out-expo),
    filter 0.8s var(--ease-out-expo);
}

.slide.visible .reveal-blur {
  opacity: 1;
  filter: blur(0);
}
```

## Stagger Patterns

### Sequential Children

Already in base template for `.reveal:nth-child(1-6)`. For custom delays:

```css
/* Faster stagger (snappy lists) */
.stagger-fast > :nth-child(1) {
  transition-delay: 0.05s;
}
.stagger-fast > :nth-child(2) {
  transition-delay: 0.1s;
}
.stagger-fast > :nth-child(3) {
  transition-delay: 0.15s;
}
.stagger-fast > :nth-child(4) {
  transition-delay: 0.2s;
}
.stagger-fast > :nth-child(5) {
  transition-delay: 0.25s;
}
.stagger-fast > :nth-child(6) {
  transition-delay: 0.3s;
}

/* Slower stagger (dramatic reveals) */
.stagger-slow > :nth-child(1) {
  transition-delay: 0.2s;
}
.stagger-slow > :nth-child(2) {
  transition-delay: 0.4s;
}
.stagger-slow > :nth-child(3) {
  transition-delay: 0.6s;
}
.stagger-slow > :nth-child(4) {
  transition-delay: 0.8s;
}
.stagger-slow > :nth-child(5) {
  transition-delay: 1s;
}
.stagger-slow > :nth-child(6) {
  transition-delay: 1.2s;
}
```

### Grid Stagger (for feature cards)

```css
.stagger-grid > :nth-child(1) {
  transition-delay: 0.1s;
}
.stagger-grid > :nth-child(2) {
  transition-delay: 0.15s;
}
.stagger-grid > :nth-child(3) {
  transition-delay: 0.2s;
}
.stagger-grid > :nth-child(4) {
  transition-delay: 0.3s;
}
.stagger-grid > :nth-child(5) {
  transition-delay: 0.35s;
}
.stagger-grid > :nth-child(6) {
  transition-delay: 0.4s;
}
```

## Typewriter Effect

For title slides or key phrases. Pure CSS for short text, JS for longer.

### CSS Typewriter (Fixed Width)

```css
.typewriter {
  overflow: hidden;
  border-right: 2px solid var(--accent, currentColor);
  white-space: nowrap;
  width: 0;
  animation:
    typing 2s steps(20) 0.5s forwards,
    blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  0%,
  100% {
    border-color: transparent;
  }
  50% {
    border-color: var(--accent, currentColor);
  }
}

@media (prefers-reduced-motion: reduce) {
  .typewriter {
    width: 100%;
    animation: none;
    border-right: none;
  }
}
```

### JS Typewriter (Dynamic)

```javascript
function typeWriter(element, text, speed = 50) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    element.textContent = text;
    return;
  }

  let i = 0;
  element.textContent = "";
  element.style.borderRight = "2px solid var(--accent, currentColor)";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Keep cursor blinking for 2s then remove
      setTimeout(() => {
        element.style.borderRight = "none";
      }, 2000);
    }
  }

  type();
}

// Usage: triggered when slide becomes visible
// typeWriter(document.querySelector('.typed-title'), 'Hello World');
```

## Background Effects

### Gradient Mesh

```css
.gradient-mesh {
  background:
    radial-gradient(
      ellipse at 20% 80%,
      rgba(120, 0, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 20%,
      rgba(0, 255, 200, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 50% 50%,
      rgba(255, 0, 120, 0.05) 0%,
      transparent 50%
    ),
    var(--bg-primary);
}
```

### Animated Gradient

```css
.gradient-animate {
  background: linear-gradient(
    -45deg,
    var(--bg-primary),
    var(--bg-secondary, #1a1a2e),
    var(--bg-primary),
    var(--bg-secondary, #1a1a2e)
  );
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gradient-animate {
    animation: none;
    background-size: 100% 100%;
  }
}
```

### Floating Particles (CSS-only, lightweight)

```css
.floating-dots {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.floating-dots span {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent, rgba(255, 255, 255, 0.3));
  border-radius: 50%;
  animation: float-up linear infinite;
}

.floating-dots span:nth-child(1) {
  left: 10%;
  animation-duration: 8s;
  animation-delay: 0s;
}
.floating-dots span:nth-child(2) {
  left: 25%;
  animation-duration: 12s;
  animation-delay: 2s;
}
.floating-dots span:nth-child(3) {
  left: 45%;
  animation-duration: 10s;
  animation-delay: 4s;
}
.floating-dots span:nth-child(4) {
  left: 65%;
  animation-duration: 14s;
  animation-delay: 1s;
}
.floating-dots span:nth-child(5) {
  left: 85%;
  animation-duration: 9s;
  animation-delay: 3s;
}

@keyframes float-up {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-10vh) scale(1);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .floating-dots span {
    animation: none;
    opacity: 0.3;
  }
}
```

HTML for floating dots:

```html
<div class="floating-dots">
  <span></span><span></span><span></span><span></span><span></span>
</div>
```

## Interactive Effects

### 3D Tilt on Hover

For feature cards or hero elements.

```javascript
function addTilt(selector, maxDeg = 8) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll(selector).forEach((el) => {
    el.style.transformStyle = "preserve-3d";
    el.style.transition = "transform 0.15s ease";

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
    });
  });
}

// Usage: addTilt('.feature-card', 6);
```

### Counter Animation

For stats slides — animates numbers from 0 to target.

```javascript
function animateCounters(selector) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = el.dataset.target;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const duration = 1500;
          const start = performance.now();

          function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(update);
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll(selector).forEach((el) => observer.observe(el));
}

// Usage: <span class="counter" data-target="1500">0</span>
// animateCounters('.counter');
```

## Text Scramble Effect

For techy/cyber themes — characters scramble before settling.

```javascript
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.frameRequest = null;
  }

  setText(newText) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.el.textContent = newText;
      return Promise.resolve();
    }

    const oldText = this.el.textContent;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => {
      this.resolve = resolve;
    });

    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span style="color:var(--accent,#00ffcc)">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(() => this.update());
      this.frame++;
    }
  }
}

// Usage:
// const scramble = new TextScramble(document.querySelector('.scramble-text'));
// scramble.setText('Hello World');
```
