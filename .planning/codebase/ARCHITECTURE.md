# Architecture

## Pattern

**Single-Page Application (SPA-like)** built with **Astro** as a static site generator. All content lives on one page (`index.astro`) with section-based scroll navigation.

## Layers

```
┌─────────────────────────────────────────┐
│               index.astro               │  ← Entry point, Site class, intro animation
│  ┌─────────────────────────────────┐    │
│  │         Layout Layer            │    │
│  │   SiteHead  |  SiteFoot         │    │  ← Header nav, footer
│  │   SiteScrollbar | SHireModal    │    │  ← Scrollbar, modal overlay
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │        Section Layer            │    │
│  │   SHero → SAbout → SWork       │    │  ← Content sections (scroll order)
│  │   SMyWay → SLeadCapture → SCTA │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │         Atom Layer              │    │
│  │   ASeparator | AWaves | AWork   │    │  ← Reusable sub-components
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │       Utilities Layer           │    │
│  │   Emitter | Ticker | Noise     │    │  ← JS utility singletons
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │       Styling Layer             │    │
│  │   SCSS Variables → Helpers      │    │  ← Design tokens & mixins
│  │   → CSS Variables → Site/Utils  │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

## Data Flow

### Page Load Sequence

1. **HTML renders** with `is-scroll-blocked` and `theme-contrasted` classes on `<html>`
2. **Site class** constructor runs: detects OS/browser, binds events
3. **`Site.init()`** called on DOMContentLoaded:
   - Initializes Lenis smooth scroll
   - Initializes Ticker (GSAP ticker integration)
   - Fires resize handler
   - Queues intro animation
4. **Intro animation** (GSAP timeline):
   - "KS" logo animates in/out
   - Border elements animate
   - `intro` custom event dispatched → components animate in
   - Intro overlay removed, scroll unblocked

### Event Flow (Emitter Bus)

```
Window Events          Emitter Events           Component Handlers
─────────────          ──────────────           ──────────────────
resize     ──────────→ 'resize'      ──────────→ SHero.onResize()
scroll     ──────────→ 'scroll'      ──────────→ (all scroll listeners)
mousemove  ──────────→ 'mousemove'   ──────────→ (mouse effects)
GSAP tick  ──────────→ 'tick'        ──────────→ SHero.tick()
window.load──────────→ 'siteLoaded'  ──────────→ component init
(manual)   ──────────→ 'updateViewport'────────→ Site.onResize()
(manual)   ──────────→ 'contrastchange'────────→ theme-dependent updates
```

### Scroll-Based Interactions

- **Lenis** handles smooth scrolling, connected to GSAP's `ScrollTrigger`
- **IntersectionObserver** in `Site` class:
  - Watches all `[data-intersect]` elements
  - Adds/removes `is-in-view`, `is-out-of-view-top`, `is-out-of-view-bottom` classes
  - Dispatches custom `intersect` events on elements
- **Data attribute** `data-intersect="fade-up"` triggers CSS fade-up animation

### Theme System

- Two themes: `default` (red #F40C3F primary) and `contrasted` (#FFF2ED primary)
- Toggle via `.theme-contrasted` class on `<html>`
- CSS custom properties (`--color-primary`, etc.) swap values
- Animated transition uses contrast mask overlay with GSAP

## Component Pattern

Each Astro component follows a consistent structure:

```astro
---
// 1. Frontmatter: imports
import Component from './Component.astro'
---

<!-- 2. Template: semantic HTML with BEM-like classes -->
<div class="s-section-name" data-intersect>
  <!-- content -->
</div>

<script>
  // 3. Client-side class: Section
  import Emitter from '../utils/Emitter'
  import { gsap } from 'gsap'
  
  class Section {
    constructor() {
      this.el = document.querySelector('.s-section-name')
      // init, bind events
    }
    
    intro() { /* GSAP timeline */ }
    onResize() { /* responsive updates */ }
    onIntersect(e) { /* visibility handling */ }
    tick() { /* per-frame updates */ }
  }
  
  new Section()
</script>

<style lang="scss">
  // 4. Scoped SCSS with design system helpers
  .s-section-name {
    @include flex(...);
    color: color(secondary);
    font: ... font-family(editorial);
    @include mq(phone) { ... }
  }
</style>
```

## Entry Points

| Entry Point             | Purpose                     |
|-------------------------|-----------------------------|
| `src/pages/index.astro` | Main (only) page            |
| `src/styles/global.scss`| Global style entry          |
| `src/styles/_import.scss`| SCSS shared imports (auto-injected) |
