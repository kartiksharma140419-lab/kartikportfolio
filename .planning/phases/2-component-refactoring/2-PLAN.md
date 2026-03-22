---
wave: 1
depends_on: []
files_modified: []
autonomous: true
---

# Phase 2: Component Refactoring

**Goal:** Improve code readability by simplifying Astro components and SCSS consolidation, and synchronizing motion effects globally.
**Requirements:** REFACT-01, REFACT-02, REFACT-03

## Tasks

### 1. Synchronize GSAP Animations
<read_first>
- `src/pages/index.astro`
- `src/components/SWork.astro`
- `src/components/SiteHead.astro`
- `src/components/SHireModal.astro`
- `src/components/SHero.astro`
- `src/components/SCTA.astro`
</read_first>

<action>
Standardize the primary entrance animation easing to `'expo.out'` and duration to `1.2`. Standardize continuous/hover transitions to `'power3.inOut'` and duration to `0.5`. Consolidate any scattered SCSS logic.
</action>

<acceptance_criteria>
- File updates show standardized duration and ease variables.
- `astro check` still passes.
</acceptance_criteria>

## Verification
- Code changes merged successfully and motion effects standardized without breaking the site.
