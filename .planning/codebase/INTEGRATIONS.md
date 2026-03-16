# Integrations

## External Services

This is a **fully static portfolio site** with minimal external integrations.

### None Detected

- **No database** — Static HTML output
- **No authentication** — No login/signup
- **No external APIs** — No fetch/axios calls to third-party services
- **No analytics** — No Google Analytics, Plausible, etc.
- **No CMS** — Content is hardcoded in Astro components

## Internal Integrations

### GSAP (GreenSock Animation Platform)

- **ScrollTrigger** — Scroll-based animation triggers, integrated with Lenis
- **DrawSVGPlugin** — SVG line drawing animations (Club GreenSock license)
- **SplitText** — Text splitting for character-level animation (Club GreenSock license)
- Integration pattern: `gsap.registerPlugin(...)` in component `<script>` tags

### Lenis Smooth Scroll

- Initialized in `src/pages/index.astro` within the `Site` class
- Connected to GSAP's `ScrollTrigger.update` via `lenis.on('scroll', ScrollTrigger.update)`
- RAF loop: `gsap.ticker.add()` drives `lenis.raf()`
- Exposed globally: `window.lenis`

### Custom Event System

- `src/utils/Emitter.js` — Singleton pub/sub event bus
- Used for inter-component communication: `resize`, `scroll`, `mousemove`, `tick`, `siteLoaded`, `intro`, `updateViewport`, `contrastchange`

### Form (SHireModal)

- `src/components/SHireModal.astro` — Modal contact form
- **No backend endpoint detected** — Form submission handler needs verification

## Hosting

- **GitHub Pages** (implied by `.github/` dir and `CNAME` file)
- Custom domain: content of `CNAME` file
