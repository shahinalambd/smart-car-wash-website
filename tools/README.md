# Page generator

The 12 HTML pages (6 English at the root, 6 Arabic in `/ar/`) are generated from two files:

- `content.js`: all text in English and Arabic (services, prices, packages, FAQ, testimonials, team, gallery captions, image alt texts).
- `build.js`: the page templates, including the shared `<head>` (titles, meta descriptions, Open Graph), header, mobile menu, footer and every section.

The site itself has no build step. The generated HTML is committed, and GitHub Pages serves it as-is. You only need this tool when you change content or layout.

## Rebuild

Requires Node.js 18 or newer. There are no dependencies to install.

```
node tools/build.js
```

Run it from the repository root. It overwrites all 12 `.html` pages.

## Rules

- **Edit `content.js` or `build.js`, not the generated `.html` files.** Manual edits to the HTML are lost on the next rebuild.
- **Change both languages.** Every string is an `{ en, ar }` pair, so update both values.
- **Header and footer:** edit `header()` and `footer()` in `build.js`. Navigation links live in `C.nav` in `content.js`.
- **Page titles and descriptions:** edit `PAGES` in `build.js`.
- **CSS and JavaScript are not generated.** Edit `assets/css/style.css` and `assets/js/main.js` directly.

## Swapping an image

Keep the same file name in `images/optimized/...` and no rebuild is needed. If the name changes, update the key in `C.img` (and wherever it is used) in `content.js`, then rebuild.

After rebuilding, check the result with `git diff` before committing.
