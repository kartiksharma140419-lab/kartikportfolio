# Technology Stack

## Runtime & Language

| Layer       | Technology               | Version   |
| ----------- | ------------------------ | --------- |
| Runtime     | Node.js                  | (system)  |
| Language    | TypeScript (loose)       | via Astro |
| Templating  | Astro components         | ^5.7.13   |
| Styling     | SCSS (Sass)              | ^1.89.0   |
| Module Type | ESM (`"type": "module"`) | —         |

## Framework

- **Astro 5** — Static site generator, single-page portfolio
- Site URL configured as `https://public.wodniack.dev` in `astro.config.mjs`
- Custom domain via `CNAME` file
- Scoped style strategy: `class`
- Dev toolbar: disabled
- Vite alias: `@/` → `src/`
- SCSS global injection: `@use 'sass:math'; @use 'sass:map'; @use "@/styles/import" as *;`

## Dependencies

### Production

| Package            | Version  | Purpose                        |
| ------------------ | -------- | ------------------------------ |
| `astro`            | ^5.7.13  | Core framework                 |
| `autoprefixer`     | ^10.4.21 | CSS vendor prefixing (PostCSS) |
| `gsap`             | ^3.13.0  | Animation library              |
| `lenis`            | ^1.3.3   | Smooth scroll                  |
| `modern-normalize` | ^3.0.1   | CSS reset/normalize            |
| `sass`             | ^1.89.0  | SCSS preprocessor              |

### Dev

| Package                 | Version | Purpose          |
| ----------------------- | ------- | ---------------- |
| `prettier`              | ^3.8.1  | Code formatting  |
| `prettier-plugin-astro` | ^0.14.1 | Astro formatting |

### GSAP Plugins Used (in components)

- `ScrollTrigger` — Scroll-based animations
- `DrawSVGPlugin` — SVG path drawing (Club GreenSock)
- `SplitText` — Character/word animation (Club GreenSock)

## Build & Tooling

| Tool       | Config File          | Purpose                                          |
| ---------- | -------------------- | ------------------------------------------------ |
| Astro      | `astro.config.mjs`   | Framework config                                 |
| Vite       | (in astro config)    | Bundler, SCSS, aliases                           |
| PostCSS    | `postcss.config.cjs` | Autoprefixer                                     |
| TypeScript | `tsconfig.json`      | Extends `astro/tsconfigs/base`                   |
| Prettier   | `.prettierrc`        | Formatting: no semi, single quotes, 2-space tabs |
| Git        | `.gitignore`         | Ignores dist/, .astro/, node_modules/            |

## Fonts (Self-Hosted)

| Font Family      | Weights             | Format      | Location        |
| ---------------- | ------------------- | ----------- | --------------- |
| Bigger Display   | Regular             | woff, woff2 | `public/fonts/` |
| PP Editorial New | Regular, Ultralight | woff, woff2 | `public/fonts/` |
| PP Fraktion Mono | Regular, Bold       | woff, woff2 | `public/fonts/` |

All fonts are preloaded in `index.astro` `<head>` for performance.

## Scripts

| Command   | Action          |
| --------- | --------------- |
| `dev`     | `astro dev`     |
| `start`   | `astro dev`     |
| `build`   | `astro build`   |
| `preview` | `astro preview` |
