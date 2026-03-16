# Concerns

## Technical Debt

### Large Component Files

Several components are very large single files, mixing template, script, and styles:

| Component          | Size     | Lines (est.) |
|--------------------|----------|-------------|
| `SMyWay.astro`     | 31,169 B | ~800+       |
| `SAbout.astro`     | 27,431 B | ~700+       |
| `SWork.astro`      | 25,315 B | ~650+       |
| `SCTA.astro`       | 24,469 B | ~630+       |
| `SHireModal.astro` | 16,440 B | ~420+       |
| `SLeadCapture.astro` | 14,856 B | ~380+    |

These files could become difficult to maintain as the project grows.

### GSAP Club GreenSock Plugins

The project uses premium GSAP plugins (`DrawSVGPlugin`, `SplitText`) which require a Club GreenSock membership. If the license expires:
- SVG line drawing animations will break
- Character-level text animations will break

### Global `window` Mutations

The `Site` class in `index.astro` attaches several properties to `window`:
- `window.safeWidth`, `window.safeHeight`
- `window.maxScrollTop`, `window.scrollProgress`
- `window.lenis`

This creates implicit global state coupling.

### Singleton Pattern in Utilities

`Emitter.js` and `Ticker.js` export singleton instances (`export default new Emitter()`). This works for a single-page site but could cause issues with:
- Server-side rendering (if ever migrated)
- Testing isolation
- Multiple page navigation

## Performance Concerns

### Animation-Heavy Page

- Multiple concurrent GSAP timelines
- Per-frame `tick` events via Emitter
- Perlin noise calculations (`Noise.js`) likely running per-frame
- `will-change` used on several elements

On low-end devices, the cumulative animation load may cause jank.

### No Lazy Loading on Images

Images in `public/images/` and `src/assets/` are not explicitly lazy-loaded. The work section images could benefit from `loading="lazy"`.

### Font Preloading

All 5 font files are preloaded regardless of whether the user needs them immediately. This increases initial page load.

## Security

### No Major Security Concerns

- Static site with no backend
- No user input stored server-side
- No credentials or API keys in code

### Minor: Form Without Backend

`SHireModal.astro` contains a form but the form submission handler/endpoint is unclear. This could lead to a broken user experience if the form appears functional but doesn't actually submit data.

## Fragile Areas

### Intro Animation Timing

The intro animation in `index.astro` uses hardcoded time offsets (`'-=1.85'`, `5`). Changing any part of the intro sequence requires careful adjustment of all subsequent timing values.

### IntersectionObserver + GSAP Interplay

The `intersect` event system relies on precise coordination between:
- IntersectionObserver thresholds
- Emitter events
- GSAP ScrollTrigger
- Lenis scroll position

Changing any one of these could break scroll-triggered animations.

### Theme System Coupling

The theme toggle in `SiteHead.astro` directly manipulates the `<html>` class and broadcasts via Emitter. Components that depend on theme colors must handle both CSS variable changes and the `contrastchange` event, creating dual coupling.

## Missing Features

- **No 404 page** — Only `index.astro` exists
- **No sitemap** — Would help SEO
- **No robots.txt** — Though meta robots tag exists
- **No automated tests** — See `TESTING.md`
- **No error tracking** — No Sentry or similar
