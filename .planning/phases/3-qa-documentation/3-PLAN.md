---
wave: 1
depends_on: []
files_modified: []
autonomous: true
---

# Phase 3: QA & Documentation

**Goal:** Address edge cases, align with design tokens, and document the codebase conventions.
**Requirements:** AUDIT-02, AUDIT-03, FMT-03, DOCS-01, DOCS-02

## Tasks

### 1. Update Documentation & Comments
<read_first>
- `.planning/codebase/CONVENTIONS.md`
- `src/pages/index.astro`
</read_first>

<action>
Add inline comments to the complex intro animation timeline in `index.astro` to explain the sequential stages. Update the `CONVENTIONS.md` file to record the new standard GSAP animation durations (`1.2s` for primary entrances, `expo.out`).
</action>

<acceptance_criteria>
- `index.astro` contains explanatory comments above `tl.fromTo(logoLinesV...`.
- `CONVENTIONS.md` explicitly mentions GSAP standardized easings (`expo.out`) and duration (`1.2` or `0.5`).
</acceptance_criteria>

## Verification
- Code has clear documentation. Check standard formatting is retained.
