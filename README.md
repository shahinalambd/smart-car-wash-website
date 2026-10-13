# Smart Car Wash — Website

A premium, bilingual (English + Arabic) website for **Smart Car Wash**, a luxury car wash and detailing studio in Dubai. It's dark and sleek where it matters and bright everywhere else, with orange brand accents, smooth animations and a fully right-to-left Arabic version.

> **Concept website for a fictional brand, built as a portfolio demo. Not affiliated with any real business.**
> All prices, reviews, figures and team members are demo content. Forms are demos: nothing is sent or stored.

**Live demo:** https://shahinalambd.github.io/smart-car-wash-website/

## Features

- **Bilingual:** 6 pages in English, and the same 6 in Arabic with a true RTL layout (`/ar/`). There's a language switcher on every page.
- **Hero slider:** fade and slow-zoom transitions, an animated headline, progress indicators, pause control and swipe support.
- **Interactive sections:**
  - Animated counters and scroll-reveal animations
  - A services grid with hover effects and icon badges
  - A before/after comparison slider (drag, touch or keyboard) with tabs
  - Sedan/SUV pricing toggle in AED, a package comparison table and membership plans
  - An animated "how it works" timeline
  - A filterable gallery with an accessible lightbox
  - A testimonials slider and an FAQ accordion
  - A multi-step booking form with validation, plus a contact form
- **Accessibility:** semantic HTML, keyboard navigation, visible focus states, ARIA where needed, and WCAG AA colour contrast on both light and dark sections. It respects `prefers-reduced-motion`.
- **Performance:** responsive WebP images with JPG fallbacks, lazy loading, deferred hero slides and minimal JavaScript.
- **SEO:** page titles and meta descriptions in both languages, canonical and `hreflang` links, Open Graph tags with a share image, and a sitemap.

## Tech

- HTML5, CSS3 (custom properties, logical properties for RTL) and vanilla JavaScript: no frameworks, no dependencies
- Google Fonts: Sora and Inter (English), Cairo (Arabic)
- Hosted on GitHub Pages; there is no build step to run the site

```
index.html … booking.html   English pages
ar/                          Arabic (RTL) pages
assets/css/style.css         Design tokens, components, light/dark themes, RTL
assets/js/main.js            All interactions
assets/icons.svg             SVG icon sprite
images/optimized/            Production images, brand files, share image
tools/                       Page generator (see tools/README.md)
```

## Run locally

Serve the folder with any static server, for example `npx serve .` or `python -m http.server 8080`, then open the printed address.

## Editing content

The HTML pages are generated from `tools/content.js` (all English and Arabic text) and `tools/build.js` (templates, header and footer). After editing either file, run `node tools/build.js`. See [tools/README.md](tools/README.md).
