# Slide Components

HTML/CSS patterns for each slide type. All rely on base CSS from SKILL.md (viewport fitting, `clamp()` variables, responsive breakpoints).

## Title Slide

```html
<section class="slide title-slide">
  <div class="slide-content">
    <h1
      class="reveal"
      style="font-size: var(--title-size); font-family: var(--font-display);"
    >
      Presentation Title
    </h1>
    <p
      class="reveal"
      style="font-size: var(--h3-size); color: var(--text-secondary); margin-top: var(--element-gap);"
    >
      Subtitle or tagline
    </p>
    <p
      class="reveal"
      style="font-size: var(--small-size); color: var(--text-secondary); margin-top: var(--content-gap);"
    >
      Author Name &mdash; Date
    </p>
  </div>
</section>
```

**CSS (add to theme section):**

```css
.title-slide .slide-content {
  align-items: center;
  text-align: center;
  gap: 0;
}
```

## Content Slide

```html
<section class="slide content-slide">
  <div class="slide-content">
    <h2
      class="reveal"
      style="font-size: var(--h2-size); font-family: var(--font-display);"
    >
      Section Title
    </h2>
    <ul
      class="bullet-list"
      style="margin-top: var(--content-gap); gap: var(--element-gap);"
    >
      <li class="reveal" style="font-size: var(--body-size);">
        First key point
      </li>
      <li class="reveal" style="font-size: var(--body-size);">
        Second key point
      </li>
      <li class="reveal" style="font-size: var(--body-size);">
        Third key point
      </li>
      <li class="reveal" style="font-size: var(--body-size);">
        Fourth key point
      </li>
    </ul>
  </div>
</section>
```

**CSS:**

```css
.bullet-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: clamp(0.4rem, 1vh, 1rem);
}

.bullet-list li {
  padding-left: 1.5em;
  position: relative;
  line-height: 1.5;
}

.bullet-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background: var(--accent, var(--text-primary));
}
```

**Paragraph variant** (replace `<ul>` with):

```html
<div
  style="margin-top: var(--content-gap); display: flex; flex-direction: column; gap: var(--element-gap);"
>
  <p class="reveal" style="font-size: var(--body-size); line-height: 1.6;">
    First paragraph text. Keep it concise — two paragraphs maximum per slide.
  </p>
  <p class="reveal" style="font-size: var(--body-size); line-height: 1.6;">
    Second paragraph text.
  </p>
</div>
```

## Code Slide

```html
<section class="slide code-slide">
  <div class="slide-content">
    <h2
      class="reveal"
      style="font-size: var(--h2-size); font-family: var(--font-display);"
    >
      Code Example
    </h2>
    <div class="code-block reveal" style="margin-top: var(--content-gap);">
      <div class="code-header">
        <span class="code-dots"> <span></span><span></span><span></span> </span>
        <span class="code-filename">example.js</span>
      </div>
      <pre><code>function greet(name) {
  return `Hello, ${name}!`;
}

// Max 8-10 lines
console.log(greet('World'));</code></pre>
    </div>
  </div>
</section>
```

**CSS:**

```css
.code-block {
  background: var(--code-bg, rgba(0, 0, 0, 0.3));
  border-radius: clamp(8px, 1vw, 16px);
  overflow: hidden;
  font-size: var(--small-size);
  max-height: min(60vh, 500px);
}

.code-header {
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 1rem);
  padding: clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1.25rem);
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.code-dots {
  display: flex;
  gap: 6px;
}

.code-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}

.code-dots span:first-child {
  background: #ff5f57;
}
.code-dots span:nth-child(2) {
  background: #ffbd2e;
}
.code-dots span:last-child {
  background: #28c840;
}

.code-filename {
  font-size: var(--small-size);
  color: var(--text-secondary);
  font-family: var(--font-mono, monospace);
}

.code-block pre {
  padding: clamp(0.75rem, 1.5vw, 1.5rem);
  overflow-x: auto;
  line-height: 1.6;
}

.code-block code {
  font-family: var(
    --font-mono,
    "SF Mono",
    "Cascadia Code",
    "Fira Code",
    monospace
  );
  font-size: var(--small-size);
  color: var(--text-primary);
}
```

### Syntax Highlighting (Optional)

Minimal keyword highlighting without external libraries:

```css
.code-block .keyword {
  color: #c792ea;
}
.code-block .string {
  color: #c3e88d;
}
.code-block .comment {
  color: #546e7a;
  font-style: italic;
}
.code-block .function {
  color: #82aaff;
}
.code-block .number {
  color: #f78c6c;
}
```

Apply with `<span class="keyword">` wrapping in the `<code>` block.

## Feature Grid Slide

```html
<section class="slide grid-slide">
  <div class="slide-content">
    <h2
      class="reveal"
      style="font-size: var(--h2-size); font-family: var(--font-display); text-align: center;"
    >
      Key Features
    </h2>
    <div class="feature-grid" style="margin-top: var(--content-gap);">
      <div class="feature-card reveal">
        <div class="feature-icon">&#x1F680;</div>
        <h3 style="font-size: var(--h3-size);">Feature One</h3>
        <p style="font-size: var(--small-size); color: var(--text-secondary);">
          Brief description in one line.
        </p>
      </div>
      <div class="feature-card reveal">
        <div class="feature-icon">&#x26A1;</div>
        <h3 style="font-size: var(--h3-size);">Feature Two</h3>
        <p style="font-size: var(--small-size); color: var(--text-secondary);">
          Brief description in one line.
        </p>
      </div>
      <!-- Max 6 cards -->
    </div>
  </div>
</section>
```

**CSS:**

```css
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: clamp(0.5rem, 1.5vw, 1.5rem);
}

.feature-card {
  padding: clamp(0.75rem, 2vw, 1.5rem);
  border-radius: clamp(8px, 1vw, 16px);
  background: var(--card-bg, rgba(255, 255, 255, 0.05));
  border: 1px solid var(--card-border, rgba(255, 255, 255, 0.1));
  display: flex;
  flex-direction: column;
  gap: var(--element-gap);
}

.feature-icon {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
}
```

## Quote Slide

```html
<section class="slide quote-slide">
  <div class="slide-content" style="align-items: center; text-align: center;">
    <blockquote class="reveal">
      <p
        style="font-size: var(--h2-size); font-family: var(--font-display); font-style: italic; line-height: 1.4; max-width: 80ch;"
      >
        &ldquo;The best presentations are not about the slides. They are about
        the story.&rdquo;
      </p>
      <cite
        class="reveal"
        style="display: block; margin-top: var(--content-gap); font-size: var(--body-size); color: var(--text-secondary); font-style: normal;"
      >
        &mdash; Speaker Name, Title
      </cite>
    </blockquote>
  </div>
</section>
```

**CSS:**

```css
.quote-slide blockquote {
  position: relative;
  max-width: min(90%, 800px);
}

.quote-slide blockquote::before {
  content: "\201C";
  position: absolute;
  top: calc(-1 * clamp(1rem, 3vw, 2rem));
  left: calc(-1 * clamp(0.5rem, 2vw, 1.5rem));
  font-size: clamp(3rem, 8vw, 6rem);
  color: var(--accent, var(--text-secondary));
  opacity: 0.2;
  font-family: Georgia, serif;
  line-height: 1;
}
```

## Two-Column Slide

```html
<section class="slide two-col-slide">
  <div class="slide-content">
    <h2
      class="reveal"
      style="font-size: var(--h2-size); font-family: var(--font-display);"
    >
      Comparison Title
    </h2>
    <div class="two-col" style="margin-top: var(--content-gap);">
      <div class="col reveal">
        <h3
          style="font-size: var(--h3-size); margin-bottom: var(--element-gap);"
        >
          Left Column
        </h3>
        <ul class="bullet-list">
          <li style="font-size: var(--body-size);">Point one</li>
          <li style="font-size: var(--body-size);">Point two</li>
          <li style="font-size: var(--body-size);">Point three</li>
        </ul>
      </div>
      <div class="col reveal">
        <h3
          style="font-size: var(--h3-size); margin-bottom: var(--element-gap);"
        >
          Right Column
        </h3>
        <ul class="bullet-list">
          <li style="font-size: var(--body-size);">Point one</li>
          <li style="font-size: var(--body-size);">Point two</li>
          <li style="font-size: var(--body-size);">Point three</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

**CSS:**

```css
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1rem, 3vw, 3rem);
}

@media (max-width: 600px) {
  .two-col {
    grid-template-columns: 1fr;
  }
}

.col {
  display: flex;
  flex-direction: column;
}
```

## Image Slide

```html
<section class="slide image-slide">
  <div class="slide-content" style="align-items: center; text-align: center;">
    <h2
      class="reveal"
      style="font-size: var(--h2-size); font-family: var(--font-display);"
    >
      Visual Example
    </h2>
    <div class="reveal" style="margin-top: var(--content-gap);">
      <img
        class="slide-image screenshot"
        src="screenshot.png"
        alt="Description of the image"
        loading="lazy"
      />
    </div>
    <p
      class="reveal"
      style="font-size: var(--small-size); color: var(--text-secondary); margin-top: var(--element-gap);"
    >
      Optional caption text
    </p>
  </div>
</section>
```

**CSS** (already in the base template — repeated here for reference):

```css
.slide-image {
  max-width: 100%;
  max-height: min(50vh, 400px);
  object-fit: contain;
  border-radius: 8px;
}

.slide-image.screenshot {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.slide-image.logo {
  max-height: min(30vh, 200px);
}
```

## Section Divider (Bonus)

Use the title slide pattern with a section number for mid-presentation breaks:

```html
<section class="slide title-slide">
  <div class="slide-content" style="align-items: center; text-align: center;">
    <span
      class="reveal"
      style="font-size: clamp(3rem, 10vw, 8rem); font-family: var(--font-display); opacity: 0.15;"
    >
      02
    </span>
    <h2
      class="reveal"
      style="font-size: var(--h2-size); font-family: var(--font-display);"
    >
      Next Section Title
    </h2>
  </div>
</section>
```
