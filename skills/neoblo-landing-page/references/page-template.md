# Page Template

Complete single-file HTML landing page template. Copy-paste into `index.html` and open in a browser — works immediately with no build step.

## Customization Checklist

Before deploying, replace these placeholders:

- [ ] `MyApp` — your app name (nav logo, title, footer)
- [ ] `Your headline here` — hero title
- [ ] `One-sentence value proposition` — hero description
- [ ] `#install-link` / `#source-link` — hero button URLs
- [ ] Feature card titles, descriptions, and icons (6 cards)
- [ ] CTA heading and description
- [ ] Footer links (privacy, GitHub, license)
- [ ] OG/Twitter meta tags (title, description, image URL)
- [ ] Favicon paths
- [ ] Google Fonts (or remove if using system fonts)

## Full Template

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MyApp — Your headline here.</title>
    <meta
      name="description"
      content="One-sentence value proposition for SEO."
    />

    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- OG Meta Tags -->
    <meta property="og:title" content="MyApp — Your headline here." />
    <meta property="og:description" content="One-sentence value proposition." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://example.com/og-image.png" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="MyApp — Your headline here." />
    <meta
      name="twitter:description"
      content="One-sentence value proposition."
    />
    <meta name="twitter:image" content="https://example.com/og-image.png" />

    <!-- Theme init: prevent flash of wrong theme -->
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

    <!-- Google Fonts -->
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
      rel="stylesheet"
    />

    <style>
      /* ============================================================
       Design Tokens
       ============================================================ */
      :root {
        --bg: #fafaf9;
        --surface: #ffffff;
        --text: #0a0a0a;
        --text-secondary: #525252;
        --primary: #6366f1;
        --primary-hover: #4f46e5;
        --accent: #059669;
        --accent-hover: #047857;
        --border: #0a0a0a;
        --border-width: 3px;
        --shadow: 6px 6px 0 #0a0a0a;
        --shadow-hover: 10px 10px 0 #0a0a0a;
        --radius: 12px;
        --font: "Space Grotesk", system-ui, sans-serif;
        --font-mono: "Space Mono", monospace;

        /* Card color cycling */
        --card-1: #6ee7b7;
        --card-2: #a78bfa;
        --card-3: #fb7185;
        --card-4: #67e8f9;
        --card-5: #fdba74;
        --card-6: #facc15;
      }

      [data-theme="dark"] {
        --bg: #1a1a2e;
        --surface: #16213e;
        --text: #f5f5f5;
        --text-secondary: #a3a3a3;
        --border: #e5e5e5;
        --shadow: 6px 6px 0 #e5e5e5;
        --shadow-hover: 10px 10px 0 #e5e5e5;

        --card-1: #365314;
        --card-2: #4c1d95;
        --card-3: #9f1239;
        --card-4: #155e75;
        --card-5: #9a3412;
        --card-6: #854d0e;
      }

      /* ============================================================
       Reset & Base
       ============================================================ */
      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        font-family: var(--font);
        color: var(--text);
        background: var(--bg);
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
      }

      .container {
        max-width: 1080px;
        margin: 0 auto;
        padding: 0 24px;
      }

      img {
        max-width: 100%;
        height: auto;
      }
      a {
        color: inherit;
        text-decoration: none;
      }

      /* Blobity: hide default cursor when active */
      body.blobity-active,
      body.blobity-active a,
      body.blobity-active button,
      body.blobity-active [data-blobity],
      body.blobity-active [data-blobity-tooltip] {
        cursor: none !important;
      }

      /* ============================================================
       Buttons
       ============================================================ */
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
      .btn-primary {
        background: var(--accent);
        color: #fff;
        border-color: var(--border);
      }
      .btn-primary:hover {
        background: var(--accent-hover);
      }
      .btn-outline {
        background: var(--surface);
      }
      .btn-sm {
        padding: 6px 14px;
        font-size: 14px;
        box-shadow: 4px 4px 0 var(--border);
      }
      .btn-sm:hover {
        box-shadow: 6px 6px 0 var(--border);
      }
      .btn-lg {
        padding: 16px 36px;
        font-size: 18px;
        box-shadow: 8px 8px 0 var(--border);
      }
      .btn-lg:hover {
        box-shadow: 12px 12px 0 var(--border);
      }

      /* ============================================================
       Nav
       ============================================================ */
      .nav {
        position: sticky;
        top: 0;
        z-index: 100;
        background: var(--accent);
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

      /* ============================================================
       Hero
       ============================================================ */
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

      /* ============================================================
       Demo Window
       ============================================================ */
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
        margin-right: 60px;
      }
      .demo-img {
        display: block;
        width: 100%;
      }

      /* ============================================================
       Features
       ============================================================ */
      .features {
        padding: 80px 0;
        background: var(--surface);
        border-top: var(--border-width) solid var(--border);
        border-bottom: var(--border-width) solid var(--border);
      }
      .section-title {
        font-size: 40px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 48px;
        letter-spacing: -1px;
      }
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
      .feature-card.is-tilting {
        transition: none;
      }
      .feature-card.is-tilting:hover {
        transform: none;
      }

      /* Card color cycling */
      .feature-card:nth-child(1) {
        background: var(--card-1);
      }
      .feature-card:nth-child(2) {
        background: var(--card-2);
      }
      .feature-card:nth-child(3) {
        background: var(--card-3);
      }
      .feature-card:nth-child(4) {
        background: var(--card-4);
      }
      .feature-card:nth-child(5) {
        background: var(--card-5);
      }
      .feature-card:nth-child(6) {
        background: var(--card-6);
      }

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

      /* ============================================================
       CTA
       ============================================================ */
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

      /* ============================================================
       Footer
       ============================================================ */
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

      /* ============================================================
       Responsive
       ============================================================ */
      @media (max-width: 768px) {
        .features-grid {
          grid-template-columns: 1fr;
        }
        .hero {
          padding: 48px 0 40px;
        }
        .hero-title {
          font-size: 32px;
          letter-spacing: -1px;
        }
        .hero-desc {
          font-size: 16px;
        }
        .section-title {
          font-size: 28px;
        }
        .cta h2 {
          font-size: 28px;
        }
        .nav-link {
          display: none;
        }
        .footer-inner {
          flex-direction: column;
          gap: 12px;
          text-align: center;
        }
      }
    </style>
  </head>
  <body>
    <!-- Nav -->
    <nav class="nav">
      <div class="nav-inner">
        <a href="/" class="nav-logo">MyApp</a>
        <div class="nav-actions">
          <a
            href="https://github.com/yourname/yourapp"
            target="_blank"
            class="nav-link"
            data-en="GitHub"
            data-zh="GitHub"
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

    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div class="hero-badge" data-en="Open Source" data-zh="开源项目">
          Open Source
        </div>
        <h1
          class="hero-title"
          data-en="Your headline here."
          data-zh="你的标题在这里。"
        >
          Your headline here.
        </h1>
        <p
          class="hero-desc"
          data-en="One-sentence value proposition that explains what your product does and why people should care."
          data-zh="一句话价值主张，解释你的产品做什么、为什么值得关注。"
        >
          One-sentence value proposition that explains what your product does
          and why people should care.
        </p>
        <div class="hero-actions">
          <a
            href="#install-link"
            class="btn btn-primary"
            data-en="Get Started"
            data-zh="立即开始"
            >Get Started</a
          >
          <a href="#source-link" class="btn btn-outline">
            <span data-en="Source Code" data-zh="源代码">Source Code</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Demo -->
    <section class="demo">
      <div class="container">
        <div class="demo-window">
          <div class="demo-titlebar">
            <span class="demo-dot" style="background:#ff5f57"></span>
            <span class="demo-dot" style="background:#febc2e"></span>
            <span class="demo-dot" style="background:#28c840"></span>
            <span class="demo-titlebar-text">MyApp</span>
          </div>
          <img src="demo.gif" alt="Demo" class="demo-img" loading="lazy" />
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="container">
        <h2 class="section-title" data-en="Features" data-zh="功能特性">
          Features
        </h2>
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
            <h3 data-en="Feature One" data-zh="功能一">Feature One</h3>
            <p
              data-en="Description of what this feature does and why it matters."
              data-zh="描述这个功能做什么以及为什么重要。"
            >
              Description of what this feature does and why it matters.
            </p>
          </div>
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
                <path d="m12 2 10 5-10 5L2 7z" />
                <path d="m2 17 10 5 10-5" />
                <path d="m2 12 10 5 10-5" />
              </svg>
            </div>
            <h3 data-en="Feature Two" data-zh="功能二">Feature Two</h3>
            <p
              data-en="Description of what this feature does and why it matters."
              data-zh="描述这个功能做什么以及为什么重要。"
            >
              Description of what this feature does and why it matters.
            </p>
          </div>
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
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3 data-en="Feature Three" data-zh="功能三">Feature Three</h3>
            <p
              data-en="Description of what this feature does and why it matters."
              data-zh="描述这个功能做什么以及为什么重要。"
            >
              Description of what this feature does and why it matters.
            </p>
          </div>
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
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3 data-en="Feature Four" data-zh="功能四">Feature Four</h3>
            <p
              data-en="Description of what this feature does and why it matters."
              data-zh="描述这个功能做什么以及为什么重要。"
            >
              Description of what this feature does and why it matters.
            </p>
          </div>
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
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </div>
            <h3 data-en="Feature Five" data-zh="功能五">Feature Five</h3>
            <p
              data-en="Description of what this feature does and why it matters."
              data-zh="描述这个功能做什么以及为什么重要。"
            >
              Description of what this feature does and why it matters.
            </p>
          </div>
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
                <circle cx="12" cy="12" r="4" />
                <path
                  d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m12.73-12.73 1.41-1.41"
                />
              </svg>
            </div>
            <h3 data-en="Feature Six" data-zh="功能六">Feature Six</h3>
            <p
              data-en="Description of what this feature does and why it matters."
              data-zh="描述这个功能做什么以及为什么重要。"
            >
              Description of what this feature does and why it matters.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="container">
        <h2 data-en="Ready to get started?" data-zh="准备开始了吗？">
          Ready to get started?
        </h2>
        <p
          data-en="Free, open-source, zero dependencies."
          data-zh="免费、开源、零依赖。"
        >
          Free, open-source, zero dependencies.
        </p>
        <a
          href="#install-link"
          class="btn btn-primary btn-lg"
          data-en="Get MyApp"
          data-zh="获取 MyApp"
          >Get MyApp</a
        >
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-inner">
        <span>&copy; 2026 MyApp</span>
        <div class="footer-links">
          <a href="privacy.html" data-en="Privacy" data-zh="隐私政策"
            >Privacy</a
          >
          <a href="https://github.com/yourname/yourapp">GitHub</a>
          <a href="https://github.com/yourname/yourapp/blob/main/LICENSE"
            >MIT License</a
          >
        </div>
      </div>
    </footer>

    <script>
      // ============================================================
      // i18n
      // ============================================================
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
          if (el.children.length === 0) {
            el.textContent = text;
          } else {
            el.innerHTML = text;
          }
        });

        const btn = document.getElementById("lang-toggle");
        if (btn) btn.textContent = currentLang === "en" ? "中文" : "English";

        document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
      }

      // ============================================================
      // Theme Toggle (light -> dark -> system -> light)
      // ============================================================
      function getSystemTheme() {
        return matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      function getEffectiveTheme(pref) {
        if (pref === "system" || !pref) return getSystemTheme();
        return pref;
      }
      function updateThemeIcon(pref) {
        const btn = document.querySelector("[data-theme-icon]");
        if (!btn) return;
        if (pref === "light") btn.textContent = "\u2600\uFE0F";
        else if (pref === "dark") btn.textContent = "\uD83C\uDF19";
        else btn.textContent = "\uD83D\uDDA5\uFE0F";
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
      (function initTheme() {
        const saved = localStorage.getItem("theme");
        applyTheme(saved || "light");
        matchMedia("(prefers-color-scheme: dark)").addEventListener(
          "change",
          () => {
            const current = localStorage.getItem("theme");
            if (current === "system" || !current) applyTheme("system");
          },
        );
      })();

      // ============================================================
      // 3D Card Tilt
      // ============================================================
      function initCardTilt() {
        const cards = document.querySelectorAll(".feature-card");
        cards.forEach((card) => {
          const spotlight = document.createElement("div");
          spotlight.className = "card-spotlight";
          card.appendChild(spotlight);

          let isActive = false,
            cardRect = null,
            pointerX = 0,
            pointerY = 0,
            rafId = 0;
          const maxTilt = 12,
            edgePadding = 14;
          const tiltStartInset = 12,
            tiltRampDistance = 26,
            leaveTolerance = 2;

          function isInside(cx, cy, tol) {
            if (!cardRect) return false;
            return (
              cx >= cardRect.left - tol &&
              cx <= cardRect.right + tol &&
              cy >= cardRect.top - tol &&
              cy <= cardRect.bottom + tol
            );
          }
          function reset() {
            if (!isActive) return;
            isActive = false;
            cardRect = null;
            card.classList.remove("is-tilting");
            card.style.transform = "";
            card.style.boxShadow = "";
            spotlight.style.background = "";
            window.removeEventListener("pointermove", onMove);
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = 0;
            }
          }
          function update() {
            rafId = 0;
            if (!isActive || !cardRect) return;
            if (!isInside(pointerX, pointerY, leaveTolerance)) {
              reset();
              return;
            }

            const rawX = pointerX - cardRect.left;
            const rawY = pointerY - cardRect.top;
            const bX = Math.min(Math.max(rawX, 0), cardRect.width);
            const bY = Math.min(Math.max(rawY, 0), cardRect.height);
            const x = Math.min(
              Math.max(rawX, edgePadding),
              cardRect.width - edgePadding,
            );
            const y = Math.min(
              Math.max(rawY, edgePadding),
              cardRect.height - edgePadding,
            );
            const cX = cardRect.width / 2,
              cY = cardRect.height / 2;
            const edge = Math.min(
              bX,
              cardRect.width - bX,
              bY,
              cardRect.height - bY,
            );
            const lin = Math.min(
              Math.max((edge - tiltStartInset) / tiltRampDistance, 0),
              1,
            );
            const str = lin * lin * (3 - 2 * lin); // smoothstep

            const rY = ((x - cX) / cX) * maxTilt * str;
            const rX = ((cY - y) / cY) * maxTilt * str;
            const sc = 1 + 0.03 * str;

            card.style.transform = `perspective(800px) rotateX(${rX}deg) rotateY(${rY}deg) scale(${sc})`;
            card.style.boxShadow = `${-rY}px ${rX}px 0 var(--border)`;
            spotlight.style.background = `radial-gradient(circle 180px at ${rawX}px ${rawY}px, rgba(255,255,255,0.25), transparent)`;
          }
          function queue() {
            if (!rafId) rafId = requestAnimationFrame(update);
          }
          function onMove(e) {
            pointerX = e.clientX;
            pointerY = e.clientY;
            queue();
          }
          function onEnter(e) {
            if (e.pointerType === "touch" || isActive) return;
            cardRect = card.getBoundingClientRect();
            isActive = true;
            card.classList.add("is-tilting");
            pointerX = e.clientX;
            pointerY = e.clientY;
            window.addEventListener("pointermove", onMove, { passive: true });
            queue();
          }
          function onLeave(e) {
            if (!isActive) return;
            pointerX = e.clientX;
            pointerY = e.clientY;
            requestAnimationFrame(() => {
              if (!isActive) return;
              if (!isInside(pointerX, pointerY, leaveTolerance)) reset();
            });
          }

          card.addEventListener("pointerenter", onEnter);
          card.addEventListener("pointerleave", onLeave);
          card.addEventListener("pointercancel", reset);
          window.addEventListener("blur", reset);
        });
      }

      // ============================================================
      // Blobity Cursor (ESM CDN, skip touch devices)
      // ============================================================
      import("https://esm.sh/blobity@0.2.3")
        .then(({ default: Blobity }) => {
          if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
          const blobity = new Blobity({
            licenseKey: "opensource",
            invert: true,
            zIndex: 50,
            color: "#190a11",
            dotColor: "#6366f1",
            radius: 6,
            magnetic: false,
            mode: "normal",
            focusableElements: "a, button, [data-blobity]",
            focusableElementsOffsetX: 5,
            focusableElementsOffsetY: 4,
            font: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 15,
            fontWeight: 600,
            fontColor: "#000000",
            tooltipPadding: 12,
          });
          window.__blobity = blobity;
          document.body.classList.add("blobity-active");
          if (document.documentElement.getAttribute("data-theme") === "dark") {
            blobity.updateOptions({
              color: "#ffffff",
              dotColor: "#059669",
              fontColor: "#0d1117",
            });
          }
          let scrollTimeout = null;
          window.addEventListener(
            "scroll",
            () => {
              if (scrollTimeout) return;
              scrollTimeout = setTimeout(() => {
                blobity.bounce();
                scrollTimeout = null;
              }, 150);
            },
            { passive: true },
          );
        })
        .catch(() => {
          /* Blobity load failed — default cursor stays */
        });

      // ============================================================
      // Init
      // ============================================================
      document.addEventListener("DOMContentLoaded", () => {
        applyLang();
        initCardTilt();
      });
    </script>
  </body>
</html>
```
