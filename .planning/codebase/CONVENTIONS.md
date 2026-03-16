# Conventions

## Code Style

### Prettier Config (`.prettierrc`)

- **Tab width:** 2 spaces
- **Semicolons:** No (`"semi": false`)
- **Quotes:** Single (`"singleQuote": true`)
- **HTML whitespace:** Ignore
- **Astro plugin:** `prettier-plugin-astro`

### General Patterns

- **ESM imports** throughout (`import ... from '...'`)
- **No semicolons** in JS/TS
- **Single quotes** for strings
- **Template literals** rarely used (inline SCSS values)
- **`const`** preferred over `let`, `var` not used

## Component Structure

Each `.astro` file follows this exact order:

```
1. --- (frontmatter: imports, data)
2. HTML template
3. <script> (client-side TypeScript class)
4. <style lang="scss"> (scoped styles)
```

### Client-Side Pattern

Every section component instantiates a `Section` class:

```typescript
class Section {
  el: HTMLElement           // root element
  isPaused: boolean         // intersection visibility flag
  
  constructor() {
    this.el = document.querySelector('.s-section-name')
    // ... setup
  }
  
  init() { ... }            // deferred init
  bindEvents() { ... }      // event binding
  intro() { ... }           // GSAP intro timeline
  onResize() { ... }        // resize handler
  onIntersect(e) { ... }    // visibility toggle
  tick() { ... }            // per-frame update (optional)
}

new Section()               // auto-instantiate
```

### Key Patterns

- **DOM queries use `querySelector`** with `.js-*` or `.s-section` selectors
- **`Emitter`** used for all inter-component communication
- **`Ticker.nextTick()`** used to defer work to next animation frame
- **`isPaused` flag** — components stop processing when not visible (IntersectionObserver)
- **GSAP timelines** for coordinated multi-element animations

## SCSS Conventions

### Design System Helpers

| Helper              | Usage                    | File                     |
|---------------------|--------------------------|--------------------------|
| `color(name)`       | CSS variable color       | `helpers/_colors.scss`   |
| `font-family(name)` | CSS variable font family | `helpers/_fonts.scss`    |
| `@include t(base)`  | Apply text style preset  | `helpers/_fonts.scss`    |
| `@include mq(name)` | Media query breakpoint   | `helpers/_responsive.scss`|
| `ease(name)`        | CSS easing function      | `helpers/_easing.scss`   |
| `@include flex()`   | Flexbox shorthand        | `helpers/_grid.scss`     |

### SCSS → CSS Variable Flow

```
variables-scss/_colors.scss     →  $theme-colors (SCSS map)
    ↓
variables-css/_colors.scss      →  :root { --color-primary: ... }
                                   .theme-contrasted { --color-primary: ... }
    ↓
helpers/_colors.scss            →  color(primary) → var(--color-primary)
```

### Breakpoint Usage

```scss
// Always use mq() mixin, never raw @media
.element {
  font-size: 2rem;

  @include mq(tablet) { font-size: 1.5rem; }
  @include mq(phone) { font-size: 1rem; }
}
```

Available breakpoints: `desktop-xl`, `desktop-lg`, `desktop-md`, `desktop-sm`, `desktop-xs`, `tablet`, `tablet-portrait`, `tablet-landscape`, `tablet-sm`, `phone`, `phone-landscape`, `sm-height`, `phone-sm`, `phone-xs`

### Naming in SCSS

- BEM-inspired but simplified: `.block__element`, `.block--modifier`
- Component root: `.s-section-name` (sections), `.sb-block-name` (sub-blocks)
- CSS custom properties for theming: `--color-*`, `--font-*`

## Animation Conventions

### GSAP Patterns

- **Intro animations:** Triggered by custom `intro` DOM event
- **Scroll animations:** Use `ScrollTrigger` with Lenis integration
- **Character animations:** `SplitText` for word/char splitting
- **SVG animations:** `DrawSVGPlugin` for line drawing effects
- **Easing:** Primarily `expo.inOut`, `expo.out`, `power4.inOut`

### CSS Animations

- `will-change` used sparingly on animated elements
- `transform: translate3d()` for GPU-accelerated transforms
- Custom `@keyframes` defined within component `<style>` blocks

## Accessibility

- `.u-sr-only` class for screen-reader-only text
- `role="presentation"` on decorative elements
- Touch target sizing: min 44x44px on mobile via `_text.scss`
- Font size forced to `max(16px, 1em)` on inputs to prevent iOS zoom
