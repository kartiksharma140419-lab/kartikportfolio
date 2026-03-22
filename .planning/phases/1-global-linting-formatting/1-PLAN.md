---
wave: 1
depends_on: []
files_modified: []
autonomous: true
---

# Phase 1: Global Linting & Formatting

**Goal:** Establish a baseline of clean, formatted code without syntax errors.
**Requirements:** AUDIT-01, FMT-01, FMT-02

## Tasks

### 1. Run Prettier
<read_first>
- `package.json`
- `.prettierrc`
</read_first>

<action>
Run `npx prettier --write "src/**/*.{astro,ts,scss}"` to enforce standardized formatting across all files.
</action>

<acceptance_criteria>
- Running `npx prettier --check "src/**/*.{astro,ts,scss}"` exits with 0.
</acceptance_criteria>

### 2. Run Astro Check & Fix Types
<read_first>
- `package.json`
- astro components failing the check
</read_first>

<action>
Run `npm run astro check`. For any errors reported, modify the files to fix the typing and syntax errors.
</action>

<acceptance_criteria>
- Running `npm run astro check` reports 0 errors.
</acceptance_criteria>

## Verification
- Prettier and Astro Check tools pass successfully.
