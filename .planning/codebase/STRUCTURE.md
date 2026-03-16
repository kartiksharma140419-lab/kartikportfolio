# Directory Structure

```
AW-2025-Portfolio/
├── .github/                    # GitHub config (workflows, pages deployment)
├── .vscode/                    # VS Code settings
├── public/                     # Static assets (served as-is)
│   ├── fonts/                  # Self-hosted font files (.woff, .woff2, .css)
│   │   ├── Bigger-Display.*
│   │   ├── PPEditorialNew-*.*
│   │   ├── PPFraktionMono-*.*
│   │   ├── bigger-display.css
│   │   ├── editorial-new.css
│   │   └── fraktion-mono.css
│   ├── icons/                  # Favicons, PWA icons, manifest
│   │   ├── favicon.svg / .ico / .png
│   │   ├── apple-touch-icon.png
│   │   └── site.webmanifest
│   └── images/                 # Static images
│       ├── aw-creative-developer.png   # OG image
│       ├── asset-star.svg              # Hero star asset
│       ├── asset-smiley--*.svg         # Smiley icons (themed)
│       ├── asset-world.svg             # World icon
│       ├── qr-code.svg                 # QR code
│       ├── sprite-vanish.png           # Sprite sheet
│       └── works/                      # Project screenshots
├── src/
│   ├── assets/                 # Astro-processed assets
│   │   ├── frames/             # Frame/border images
│   │   └── works/              # Work section images
│   ├── components/             # All Astro components (13 files)
│   │   ├── SiteHead.astro      # Header with nav, logo, contrast toggle
│   │   ├── SiteFoot.astro      # Footer
│   │   ├── SiteScrollbar.astro # Custom scrollbar
│   │   ├── SHero.astro         # Hero section (animated title)
│   │   ├── SAbout.astro        # About section
│   │   ├── SWork.astro         # Work/portfolio section
│   │   ├── SMyWay.astro        # "My Way" philosophy section
│   │   ├── SCTA.astro          # Call-to-action section
│   │   ├── SLeadCapture.astro  # Lead capture form
│   │   ├── SHireModal.astro    # Hire me modal overlay
│   │   ├── ASeparator.astro    # Reusable separator (atom)
│   │   ├── AWaves.astro        # SVG wave animation (atom)
│   │   └── AWork.astro         # Single work item (atom)
│   ├── pages/
│   │   └── index.astro         # Main page (only page)
│   ├── styles/
│   │   ├── _import.scss        # Shared SCSS imports (auto-injected by Vite)
│   │   ├── global.scss         # Global style entry point
│   │   ├── variables-scss/     # SCSS variables (compile-time)
│   │   │   ├── _breakpoints.scss
│   │   │   ├── _colors.scss
│   │   │   └── _fonts.scss
│   │   ├── variables-css/      # CSS custom properties (runtime)
│   │   │   ├── _colors.scss
│   │   │   └── _fonts.scss
│   │   ├── helpers/            # SCSS mixins & functions
│   │   │   ├── _responsive.scss  # mq() mixin
│   │   │   ├── _colors.scss      # color() function
│   │   │   ├── _fonts.scss       # font-family(), t() mixin
│   │   │   ├── _easing.scss      # ease() function
│   │   │   └── _grid.scss        # flex() mixin
│   │   ├── site/               # Base global styles
│   │   │   ├── _base.scss        # Reset, html/body, selection
│   │   │   └── _text.scss        # p, a, button base styles
│   │   └── utilities/          # Utility classes
│   │       └── _visibility.scss  # .u-sr-only, fade-up intersect
│   ├── utils/                  # JavaScript utilities
│   │   ├── Emitter.js          # Singleton event bus (pub/sub)
│   │   ├── Ticker.js           # GSAP ticker wrapper, nextTick
│   │   └── Noise.js            # Perlin noise (2D) generator
│   └── env.d.ts                # Astro env types
├── astro.config.mjs            # Astro + Vite config
├── tsconfig.json               # TypeScript config
├── postcss.config.cjs          # PostCSS (autoprefixer)
├── package.json                # Dependencies & scripts
├── .prettierrc                 # Prettier config
├── .gitignore                  # Git ignores
├── CNAME                       # Custom domain for GitHub Pages
├── LICENSE.md                  # License
└── README.md                   # Project readme
```

## Naming Conventions

### Components

| Prefix | Meaning         | Examples                           |
|--------|-----------------|------------------------------------|
| `S`    | Section         | `SHero`, `SAbout`, `SWork`, `SCTA` |
| `A`    | Atom (reusable) | `ASeparator`, `AWaves`, `AWork`    |
| `Site` | Site-level      | `SiteHead`, `SiteFoot`, `SiteScrollbar` |

### CSS Classes

| Pattern            | Usage                    | Example              |
|--------------------|--------------------------|----------------------|
| `s-section-name`   | Section root             | `.s-hero`            |
| `s__element`       | Section child (BEM-ish)  | `.s__title`          |
| `sb-block`         | Sub-block within section | `.sb-logo`, `.sb-menu` |
| `sb__element`      | Sub-block child          | `.sb__text`          |
| `site-*`           | Site-level elements      | `.site-head`, `.site-wrapper` |
| `js-*`             | JS hooks (no styling)    | `.js-content`, `.js-word` |
| `is-*`             | State classes            | `.is-in-view`, `.is-scroll-blocked` |
| `u-*`              | Utility classes          | `.u-sr-only`         |
| `theme-*`          | Theme classes            | `.theme-contrasted`  |
| `data-intersect`   | IntersectionObserver target | `data-intersect="fade-up"` |

### SCSS Files

- Prefixed with `_` (Sass partials): `_breakpoints.scss`, `_colors.scss`
- Entry files without prefix: `global.scss`, `_import.scss`

## Key Locations

| Purpose              | Path                              |
|----------------------|-----------------------------------|
| Add a new page       | `src/pages/`                      |
| Add a new component  | `src/components/`                 |
| Modify colors        | `src/styles/variables-scss/_colors.scss` |
| Modify breakpoints   | `src/styles/variables-scss/_breakpoints.scss` |
| Modify fonts         | `src/styles/variables-scss/_fonts.scss` |
| Add CSS variables    | `src/styles/variables-css/`       |
| Add utility classes  | `src/styles/utilities/`           |
| Add SCSS helpers     | `src/styles/helpers/`             |
| Add static assets    | `public/`                         |
| Add processed assets | `src/assets/`                     |
