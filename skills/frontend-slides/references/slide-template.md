# Slide Template

Complete HTML skeleton for all presentations. Copy this, replace `<!-- THEME CSS -->` with chosen theme variables and `<!-- SLIDES -->` with slide content.

## Full HTML Skeleton

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><!-- PRESENTATION TITLE --></title>

    <!-- Web fonts (optional — system fallbacks in theme CSS handle offline) -->
    <!-- FONT LINK -->

    <style>
      /* =============================================
       RESET + VIEWPORT FITTING
       From SKILL.md — do NOT modify
       ============================================= */
      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        scroll-snap-type: y mandatory;
        scroll-behavior: smooth;
        height: 100%;
      }

      body {
        font-family: var(--font-body);
        background: var(--bg-primary);
        color: var(--text-primary);
        overflow-x: hidden;
        height: 100%;
      }

      .slide {
        width: 100vw;
        height: 100vh;
        height: 100dvh;
        overflow: hidden;
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;
        position: relative;
      }

      .slide-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-height: 100%;
        overflow: hidden;
        padding: var(--slide-padding);
      }

      /* =============================================
       BASE VARIABLES
       ============================================= */
      :root {
        /* Typography — clamp() for viewport scaling */
        --title-size: clamp(1.5rem, 5vw, 4rem);
        --h2-size: clamp(1.25rem, 3.5vw, 2.5rem);
        --h3-size: clamp(1rem, 2.5vw, 1.75rem);
        --body-size: clamp(0.75rem, 1.5vw, 1.125rem);
        --small-size: clamp(0.65rem, 1vw, 0.875rem);

        /* Spacing */
        --slide-padding: clamp(1rem, 4vw, 4rem);
        --content-gap: clamp(0.5rem, 2vw, 2rem);
        --element-gap: clamp(0.25rem, 1vw, 1rem);

        /* Animation */
        --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
        --duration-normal: 0.6s;
      }

      /* =============================================
       THEME CSS — replace this block per theme
       ============================================= */
      /* <!-- THEME CSS --> */

      /* =============================================
       PROGRESS BAR
       ============================================= */
      .progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--accent, #00ffcc);
        z-index: 1000;
        transition: width 0.3s ease;
        width: 0%;
      }

      /* =============================================
       NAVIGATION DOTS
       ============================================= */
      .nav-dots {
        position: fixed;
        right: clamp(0.75rem, 2vw, 1.5rem);
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: clamp(0.4rem, 0.8vh, 0.6rem);
        z-index: 100;
      }

      .nav-dot {
        width: clamp(6px, 0.6vw, 10px);
        height: clamp(6px, 0.6vw, 10px);
        border-radius: 50%;
        background: var(--text-secondary, rgba(255, 255, 255, 0.3));
        border: none;
        cursor: pointer;
        transition: all 0.3s var(--ease-out-expo);
        padding: 0;
      }

      .nav-dot.active {
        background: var(--accent, var(--text-primary));
        transform: scale(1.4);
      }

      .nav-dot:hover {
        background: var(--accent, var(--text-primary));
        transform: scale(1.2);
      }

      /* =============================================
       KEYBOARD HINT
       ============================================= */
      .keyboard-hint {
        position: fixed;
        bottom: clamp(0.75rem, 2vh, 1.5rem);
        left: 50%;
        transform: translateX(-50%);
        font-size: var(--small-size);
        color: var(--text-secondary, rgba(255, 255, 255, 0.4));
        z-index: 100;
        opacity: 1;
        transition: opacity 0.5s ease;
        pointer-events: none;
      }

      .keyboard-hint.hidden {
        opacity: 0;
      }

      /* =============================================
       REVEAL ANIMATIONS
       ============================================= */
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

      .reveal:nth-child(1) {
        transition-delay: 0.1s;
      }
      .reveal:nth-child(2) {
        transition-delay: 0.2s;
      }
      .reveal:nth-child(3) {
        transition-delay: 0.3s;
      }
      .reveal:nth-child(4) {
        transition-delay: 0.4s;
      }
      .reveal:nth-child(5) {
        transition-delay: 0.5s;
      }
      .reveal:nth-child(6) {
        transition-delay: 0.6s;
      }

      /* =============================================
       IMAGE CONSTRAINTS
       ============================================= */
      .slide-image {
        max-width: 100%;
        max-height: min(50vh, 400px);
        object-fit: contain;
        border-radius: 8px;
      }

      .slide-image.screenshot {
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }

      .slide-image.logo {
        max-height: min(30vh, 200px);
      }

      /* =============================================
       RESPONSIVE (from SKILL.md)
       ============================================= */
      @media (max-height: 700px) {
        :root {
          --slide-padding: clamp(0.75rem, 3vw, 2rem);
          --content-gap: clamp(0.4rem, 1.5vw, 1rem);
          --title-size: clamp(1.25rem, 4.5vw, 2.5rem);
          --h2-size: clamp(1rem, 3vw, 1.75rem);
        }
      }

      @media (max-height: 600px) {
        :root {
          --slide-padding: clamp(0.5rem, 2.5vw, 1.5rem);
          --content-gap: clamp(0.3rem, 1vw, 0.75rem);
          --title-size: clamp(1.1rem, 4vw, 2rem);
          --body-size: clamp(0.7rem, 1.2vw, 0.95rem);
        }
        .nav-dots,
        .keyboard-hint,
        .decorative {
          display: none;
        }
      }

      @media (max-height: 500px) {
        :root {
          --slide-padding: clamp(0.4rem, 2vw, 1rem);
          --title-size: clamp(1rem, 3.5vw, 1.5rem);
          --h2-size: clamp(0.9rem, 2.5vw, 1.25rem);
          --body-size: clamp(0.65rem, 1vw, 0.85rem);
        }
      }

      @media (max-width: 600px) {
        :root {
          --title-size: clamp(1.25rem, 7vw, 2.5rem);
        }
        .grid {
          grid-template-columns: 1fr;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.2s !important;
        }
        html {
          scroll-behavior: auto;
        }
      }
    </style>
  </head>
  <body>
    <!-- Progress bar -->
    <div class="progress-bar" id="progressBar"></div>

    <!-- Navigation dots — generated by JS -->
    <nav class="nav-dots" id="navDots"></nav>

    <!-- Keyboard hint — auto-hides after first interaction -->
    <div class="keyboard-hint" id="keyboardHint">
      Use <kbd>&uarr;</kbd><kbd>&darr;</kbd> or scroll to navigate
    </div>

    <!-- ==========================================
       SLIDES — replace with actual content
       ========================================== -->

    <!-- SLIDES -->

    <!-- ==========================================
       NAVIGATION JS
       ========================================== -->
    <script>
      class SlidePresentation {
        constructor() {
          this.slides = document.querySelectorAll(".slide");
          this.currentSlide = 0;
          this.isAnimating = false;
          this.touchStartY = 0;

          this.createNavDots();
          this.bindEvents();
          this.observeSlides();
          this.updateProgress();

          // Show first slide immediately
          this.slides[0]?.classList.add("visible");
        }

        createNavDots() {
          const nav = document.getElementById("navDots");
          this.slides.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.className = `nav-dot${i === 0 ? " active" : ""}`;
            dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
            dot.addEventListener("click", () => this.goToSlide(i));
            nav.appendChild(dot);
          });
          this.dots = nav.querySelectorAll(".nav-dot");
        }

        bindEvents() {
          // Keyboard navigation
          document.addEventListener("keydown", (e) => {
            this.hideKeyboardHint();
            switch (e.key) {
              case "ArrowDown":
              case "ArrowRight":
              case " ":
                e.preventDefault();
                this.next();
                break;
              case "ArrowUp":
              case "ArrowLeft":
                e.preventDefault();
                this.prev();
                break;
              case "Home":
                e.preventDefault();
                this.goToSlide(0);
                break;
              case "End":
                e.preventDefault();
                this.goToSlide(this.slides.length - 1);
                break;
            }
          });

          // Touch navigation
          document.addEventListener(
            "touchstart",
            (e) => {
              this.touchStartY = e.touches[0].clientY;
              this.hideKeyboardHint();
            },
            { passive: true },
          );

          document.addEventListener(
            "touchend",
            (e) => {
              const diff = this.touchStartY - e.changedTouches[0].clientY;
              if (Math.abs(diff) > 50) {
                diff > 0 ? this.next() : this.prev();
              }
            },
            { passive: true },
          );

          // Scroll-based detection (updates dots/progress on native scroll)
          let scrollTimeout;
          window.addEventListener(
            "scroll",
            () => {
              clearTimeout(scrollTimeout);
              scrollTimeout = setTimeout(() => {
                const scrollPos = window.scrollY;
                const windowHeight = window.innerHeight;
                const newSlide = Math.round(scrollPos / windowHeight);
                if (newSlide !== this.currentSlide) {
                  this.currentSlide = newSlide;
                  this.updateUI();
                }
              }, 50);
            },
            { passive: true },
          );
        }

        observeSlides() {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("visible");
                }
              });
            },
            { threshold: 0.3 },
          );
          this.slides.forEach((slide) => observer.observe(slide));
        }

        goToSlide(index) {
          if (index < 0 || index >= this.slides.length || this.isAnimating)
            return;
          this.isAnimating = true;
          this.currentSlide = index;
          this.slides[index].scrollIntoView({ behavior: "smooth" });
          this.updateUI();
          setTimeout(() => {
            this.isAnimating = false;
          }, 600);
        }

        next() {
          this.goToSlide(this.currentSlide + 1);
        }
        prev() {
          this.goToSlide(this.currentSlide - 1);
        }

        updateUI() {
          // Update nav dots
          this.dots?.forEach((dot, i) => {
            dot.classList.toggle("active", i === this.currentSlide);
          });
          this.updateProgress();
        }

        updateProgress() {
          const progress = ((this.currentSlide + 1) / this.slides.length) * 100;
          const bar = document.getElementById("progressBar");
          if (bar) bar.style.width = `${progress}%`;
        }

        hideKeyboardHint() {
          const hint = document.getElementById("keyboardHint");
          if (hint) hint.classList.add("hidden");
        }
      }

      // Initialize when DOM is ready
      document.addEventListener("DOMContentLoaded", () => {
        new SlidePresentation();
      });
    </script>
  </body>
</html>
```

## Usage Notes

- Replace `<!-- PRESENTATION TITLE -->` with the actual title.
- Replace `<!-- FONT LINK -->` with the `<link>` tag for the chosen theme's web fonts.
- Replace `/* <!-- THEME CSS --> */` with the theme's `:root` block and signature element styles from the relevant theme reference file.
- Replace `<!-- SLIDES -->` with `<section class="slide">` elements using patterns from `slide-components.md`.
- The progress bar color uses `var(--accent)` — set this in your theme CSS.
- Nav dots and progress bar are auto-generated by the JS — no HTML editing needed.
- The keyboard hint auto-hides on first user interaction.
- The `IntersectionObserver` triggers `.visible` class for reveal animations when slides enter the viewport.
