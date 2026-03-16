# Testing

## Current State

**No automated tests exist in this project.**

- No test framework installed (no Jest, Vitest, Playwright, Cypress, etc.)
- No test files found anywhere in the codebase
- No test scripts in `package.json`
- No CI/CD test pipeline in `.github/`

## Verification Methods Currently Used

### Manual Testing

- **Dev server:** `npm run dev` → `astro dev` (with `host: true` for network access)
- **Build verification:** `npm run build` → `astro build`
- **Preview:** `npm run preview` → `astro preview`

### Browser Testing

Since this is a heavily animation-driven portfolio site, all verification appears to be manual browser testing:

- Visual inspection of GSAP animations
- Scroll behavior with Lenis
- Responsive layout at various breakpoints
- Theme contrast toggle
- IntersectionObserver visibility states

## Recommended Testing Approach

If tests were to be added, the most valuable would be:

1. **Visual regression testing** (e.g., Playwright screenshots at key breakpoints)
2. **Build smoke test** — Ensure `astro build` completes without errors
3. **Accessibility audit** — axe-core or Lighthouse CI
4. **Link checking** — Ensure no broken internal links
