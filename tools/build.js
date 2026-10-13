// Generates the static EN + AR pages for the Smart Car Wash concept site.
// Output is plain HTML (no runtime build step). Usage: node tools/build.js [siteRoot]
// siteRoot defaults to the repository root (the folder above tools/).
const fs = require('fs');
const path = require('path');
const C = require('./content');
const ROOT = path.resolve(process.argv[2] || path.join(__dirname, '..'));
// Live GitHub Pages URL, used for canonical, hreflang, Open Graph and the sitemap (keep the trailing slash)
const SITE_URL = 'https://shahinalambd.github.io/smart-car-wash-website/';

let L = 'en', P = '';
const t = (o) => (o == null ? '' : typeof o === 'string' ? o : o[L]);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const n = (v) => new Intl.NumberFormat('en-US').format(v);
const price = (v) => (L === 'ar' ? `${n(v)} <span class="cur">${t(C.ui.aed)}</span>` : `<span class="cur">${t(C.ui.aed)}</span> ${n(v)}`);
const priceTxt = (v) => (L === 'ar' ? `${n(v)} ${t(C.ui.aed)}` : `${t(C.ui.aed)} ${n(v)}`);
const FILL = new Set(['star', 'facebook', 'x', 'tiktok', 'youtube', 'quote', 'play']);
const icon = (id, cls = '') => `<svg class="icon${FILL.has(id) ? ' icon--fill' : ''}${cls ? ' ' + cls : ''}" aria-hidden="true" focusable="false"><use href="${P}assets/icons.svg#i-${id}"/></svg>`;
const arrow = () => icon('arrow', 'icon--arrow flip');
const svcIcon = { 'exterior-wash': 'droplet', 'interior-detailing': 'seat', 'ceramic-coating': 'shield', 'paint-protection-film': 'layers', polishing: 'sparkle', 'engine-bay': 'engine' };

function pic(key, o = {}) {
  const m = C.img[key];
  const base = `${P}images/optimized/${m.dir}/${key}`;
  const sizes = o.sizes || '100vw';
  const ws = `${base}-${m.s}.webp ${m.s}w, ${base}.webp ${m.w}w`;
  const js = `${base}-${m.s}.jpg ${m.s}w, ${base}.jpg ${m.w}w`;
  return `<picture${o.cls ? ` class="${o.cls}"` : ''}><source type="image/webp" srcset="${ws}" sizes="${sizes}"><img src="${base}-${m.s}.jpg" srcset="${js}" sizes="${sizes}" alt="${esc(o.alt != null ? o.alt : t(m))}" width="${m.w}" height="${m.h}" loading="${o.eager ? 'eager' : 'lazy'}" decoding="async"${o.priority ? ' fetchpriority="high"' : ''}></picture>`;
}
function heroPic(i, eager) {
  // Slides 2 and 3 keep their URLs in data-* until the slider wakes them: the stacked
  // slides sit inside the viewport, so native lazy loading would fetch them immediately.
  const b = `${P}images/optimized/hero/hero-${i}`;
  const ss = eager ? 'srcset' : 'data-srcset';
  const src = eager ? `src="${b}-desktop-1440.jpg"` : `src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="${b}-desktop-1440.jpg"`;
  return `<picture>
          <source media="(max-width: 767px)" type="image/webp" ${ss}="${b}-mobile.webp">
          <source media="(max-width: 767px)" ${ss}="${b}-mobile.jpg">
          <source type="image/webp" ${ss}="${b}-desktop-1440.webp 1440w, ${b}-desktop.webp 2400w" sizes="100vw">
          <img ${src} ${ss}="${b}-desktop-1440.jpg 1440w, ${b}-desktop.jpg 2400w" sizes="100vw" alt="${esc(t(C.img['hero-' + i]))}" width="2400" height="1200" ${eager ? 'loading="eager" fetchpriority="high"' : 'fetchpriority="low"'} decoding="async">
        </picture>`;
}
const full = (key) => {
  const m = C.img[key];
  const base = `${P}images/optimized/${m.dir}/${key}`;
  return `data-full="${base}.webp" data-full-jpg="${base}.jpg"`;
};

/* ---------------- Shared layout ---------------- */
const PAGES = {
  home: { file: 'index.html',
    title: { en: 'Smart Car Wash | Premium Car Wash & Detailing in Dubai', ar: 'سمارت كار واش | غسيل وعناية فاخرة بالسيارات في دبي' },
    desc: { en: 'Luxury hand wash, interior detailing, ceramic coating and paint protection in Dubai. Book online in under a minute. Concept website for a fictional brand.', ar: 'غسيل يدوي فاخر وتنظيف داخلي وطلاء سيراميك وحماية للطلاء في دبي. احجز موعدك أونلاين في أقل من دقيقة. موقع تجريبي لعلامة تجارية خيالية.' } },
  services: { file: 'services.html',
    title: { en: 'Car Detailing Services in Dubai | Smart Car Wash', ar: 'خدمات العناية بالسيارات في دبي | سمارت كار واش' },
    desc: { en: 'Exterior wash, interior detailing, ceramic coating, paint protection film, polishing and engine bay cleaning in Dubai, with prices in AED.', ar: 'غسيل خارجي وتنظيف داخلي وطلاء سيراميك وأفلام حماية الطلاء وتلميع وتنظيف حجرة المحرك في دبي، مع الأسعار بالدرهم.' } },
  packages: { file: 'packages.html',
    title: { en: 'Car Wash Packages & Pricing in AED | Smart Car Wash', ar: 'باقات وأسعار غسيل السيارات بالدرهم | سمارت كار واش' },
    desc: { en: 'Compare Basic, Premium and Ultimate car care packages for sedans and SUVs, plus Shine Club monthly memberships and add-ons.', ar: 'قارن بين الباقات الأساسية والمميزة والفاخرة للسيارات السيدان والدفع الرباعي، إلى جانب عضويات نادي اللمعان الشهرية والخدمات الإضافية.' } },
  gallery: { file: 'gallery.html',
    title: { en: 'Gallery: Car Detailing Results | Smart Car Wash', ar: 'معرض الصور: نتائج العناية بالسيارات | سمارت كار واش' },
    desc: { en: 'Browse exterior, interior and detailing work from our Dubai studio, including before and after comparisons.', ar: 'تصفّح أعمالنا في العناية الخارجية والداخلية والتفصيلية من استوديو دبي، مع مقارنات قبل وبعد.' } },
  about: { file: 'about.html',
    title: { en: 'About Our Dubai Detailing Studio | Smart Car Wash', ar: 'من نحن: استوديو العناية بالسيارات في دبي | سمارت كار واش' },
    desc: { en: 'Meet the team behind Smart Car Wash, a fictional luxury car care studio in Dubai built on craft, care and premium products.', ar: 'تعرّف على الفريق وراء سمارت كار واش، استوديو خيالي فاخر للعناية بالسيارات في دبي يقوم على الإتقان والاهتمام والمنتجات الفاخرة.' } },
  booking: { file: 'booking.html',
    title: { en: 'Book a Car Wash or Contact Us | Smart Car Wash', ar: 'احجز موعدًا أو تواصل معنا | سمارت كار واش' },
    desc: { en: 'Book a car wash or detailing appointment in Dubai in four quick steps, or send us a message through the contact form.', ar: 'احجز موعدًا لغسيل سيارتك أو العناية بها في دبي في أربع خطوات سريعة، أو أرسل لنا رسالة عبر نموذج التواصل.' } },
  notfound: { file: '404.html', noindex: true,
    title: { en: 'Page not found | Smart Car Wash', ar: 'الصفحة غير موجودة | سمارت كار واش' },
    desc: { en: 'The page you are looking for could not be found.', ar: 'تعذّر العثور على الصفحة المطلوبة.' } },
};

function head(id) {
  const pg = PAGES[id];
  // absolute URLs for canonical / hreflang / Open Graph (index.html is served as the folder URL)
  const page = pg.file === 'index.html' ? '' : pg.file;
  const enHref = SITE_URL + page;
  const arHref = SITE_URL + 'ar/' + page;
  const canonical = L === 'ar' ? arHref : enHref;
  const fonts = L === 'ar'
    ? 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap'
    : 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@500;600;700;800&display=swap';
  const preload = id === 'home'
    ? `\n  <link rel="preload" as="image" type="image/webp" href="${P}images/optimized/hero/hero-1-mobile.webp" media="(max-width: 767px)">\n  <link rel="preload" as="image" type="image/webp" imagesrcset="${P}images/optimized/hero/hero-1-desktop-1440.webp 1440w, ${P}images/optimized/hero/hero-1-desktop.webp 2400w" imagesizes="100vw" media="(min-width: 768px)">`
    : '';
  return `<!doctype html>
<html lang="${L === 'ar' ? 'ar' : 'en'}" dir="${L === 'ar' ? 'rtl' : 'ltr'}" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(t(pg.title))}</title>
  <meta name="description" content="${esc(t(pg.desc))}">${pg.noindex ? '\n  <meta name="robots" content="noindex">' : ''}
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="en" href="${enHref}">
  <link rel="alternate" hreflang="ar" href="${arHref}">
  <link rel="alternate" hreflang="x-default" href="${enHref}">
  <meta name="theme-color" content="#111318">
  <meta name="color-scheme" content="dark">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="${esc(t(C.brand))}">
  <meta property="og:title" content="${esc(t(pg.title))}">
  <meta property="og:description" content="${esc(t(pg.desc))}">
  <meta property="og:image" content="${SITE_URL}images/optimized/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(L === 'ar' ? 'شعار سمارت كار واش فوق سيارة رياضية سوداء في استوديو بدبي' : 'Smart Car Wash logo over a black sports car in a Dubai studio')}">
  <meta property="og:locale" content="${L === 'ar' ? 'ar_AE' : 'en_US'}">
  <meta property="og:locale:alternate" content="${L === 'ar' ? 'en_US' : 'ar_AE'}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${SITE_URL}images/optimized/og-image.jpg">
  <link rel="icon" href="${P}favicon.ico" sizes="32x32">
  <link rel="icon" href="${P}images/optimized/brand/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="${P}images/optimized/brand/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="${fonts}">
  <link rel="stylesheet" href="${P}assets/css/style.css">${preload}
  <script>document.documentElement.classList.replace('no-js','js');window.SCW_ICONS='${P}assets/icons.svg';</script>
  <script src="${P}assets/js/main.js" defer></script>
</head>`;
}

function header(id) {
  const pg = PAGES[id];
  const other = (L === 'ar' ? '../' : 'ar/') + pg.file;
  const bookHref = id === 'home' ? '#book' : id === 'booking' ? '#book' : `${'booking.html'}#book`;
  const links = C.nav.map((x) => `<li><a href="${x.href}"${x.id === id ? ' aria-current="page"' : ''}>${t(x)}</a></li>`).join('');
  const mlinks = C.nav.map((x, i) => `<li style="--i:${i}"><a href="${x.href}"${x.id === id ? ' aria-current="page"' : ''}>${t(x)} ${icon('arrow', 'flip')}</a></li>`).join('');
  return `
<body>
  <a class="skip-link" href="#main">${t(C.ui.skip)}</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="index.html"><img src="${P}images/optimized/brand/logo-light-480.png" srcset="${P}images/optimized/brand/logo-light-480.png 1x, ${P}images/optimized/brand/logo-light-960.png 2x" width="157" height="46" alt="Smart Car Wash${L === 'ar' ? ' – سمارت كار واش' : ''}"></a>
      <nav class="main-nav" aria-label="${t(C.ui.mainNav)}"><ul>${links}</ul></nav>
      <div class="header-actions">
        <a class="lang-switch" href="${other}" hreflang="${L === 'ar' ? 'en' : 'ar'}" lang="${L === 'ar' ? 'en' : 'ar'}" aria-label="${t(C.ui.langLabel)}">${icon('globe')}<span>${t(C.ui.langName)}</span></a>
        <a class="btn btn-primary btn-sm btn-book" href="${bookHref}">${t(C.ui.book)}</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="${t(C.ui.menuOpen)}" data-label-open="${t(C.ui.menuOpen)}" data-label-close="${t(C.ui.menuClose)}"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
  <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
    <nav aria-label="${t(C.ui.mobileNav)}"><ul>${mlinks}</ul></nav>
    <div class="mobile-menu__foot">
      <a class="btn btn-primary btn-block" href="${bookHref}">${t(C.ui.book)}</a>
      <p>${t(C.ui.openDaily)}</p>
    </div>
  </div>
`;
}

function footer() {
  const svc = C.services.map((s) => `<li><a href="services.html#${s.id}">${t(s)}</a></li>`).join('');
  const nav = C.nav.map((x) => `<li><a href="${x.href}">${t(x)}</a></li>`).join('');
  const hours = C.footer.hoursList.map((h) => `<li><span>${t(h)}</span><b dir="ltr">${h.t}</b></li>`).join('');
  const socials = [['instagram', 'Instagram'], ['facebook', 'Facebook'], ['x', 'X'], ['tiktok', 'TikTok'], ['youtube', 'YouTube']]
    .map(([i, nm]) => `<li><span class="social" role="img" aria-label="${nm}">${icon(i)}</span></li>`).join('');
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <a class="footer-logo" href="index.html"><img src="${P}images/optimized/brand/logo-light-480.png" srcset="${P}images/optimized/brand/logo-light-480.png 1x, ${P}images/optimized/brand/logo-light-960.png 2x" width="177" height="52" alt="Smart Car Wash" loading="lazy"></a>
        <p><strong class="accent">${t(C.tagline)}</strong></p>
        <p>${t(C.footer.about)}</p>
        <ul class="socials" aria-label="${t(C.footer.social)}">${socials}</ul>
      </div>
      <div>
        <h2>${t(C.footer.explore)}</h2>
        <ul class="footer-links">${nav}</ul>
      </div>
      <div>
        <h2>${t(C.footer.services)}</h2>
        <ul class="footer-links">${svc}</ul>
      </div>
      <div>
        <h2>${t(C.footer.hours)}</h2>
        <ul class="hours">${hours}</ul>
        <ul class="info-list">
          <li><span class="ico">${icon('pin')}</span><span><b>${t(C.footer.area)}</b></span></li>
          <li><span class="ico">${icon('message')}</span><span><a href="booking.html#contact">${t(C.footer.contactVia)}</a></span></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span data-year>2026</span> ${t(C.footer.rights)}</p>
      <p class="concept-note"><b>${t(C.footer.concept)}</b> ${t(C.footer.demo)}</p>
    </div>
  </footer>
  <button class="icon-btn to-top" type="button" aria-label="${t(C.ui.toTop)}">${icon('arrow-up')}</button>
</body>
</html>
`;
}

function pageHero(o) {
  const crumbs = `<nav class="breadcrumb" aria-label="${t(C.ui.breadcrumb)}"><ol><li><a href="index.html">${t(C.nav[0])}</a></li><li><span aria-current="page">${t(o.crumb)}</span></li></ol></nav>`;
  return `
    <section class="page-hero">
      <div class="hero-media">${pic(o.img, { eager: true, priority: true, alt: o.alt })}</div>
      <div class="container" data-reveal>
        ${crumbs}
        <p class="eyebrow">${t(o.eyebrow)}</p>
        <h1>${t(o.title)}</h1>
        <p class="lead">${t(o.lead)}</p>
      </div>
    </section>`;
}

const head2 = (eyebrow, title, lead, o = {}) => `
        <div class="section-head${o.center ? ' section-head--center' : ''}" data-reveal>
          <p class="eyebrow">${t(eyebrow)}</p>
          <h2 class="h2"${o.id ? ` id="${o.id}"` : ''}>${t(title)}</h2>
          ${lead ? `<p class="lead">${t(lead)}</p>` : ''}
        </div>`;

/* ---------------- Sections ---------------- */
const S = {};

S.hero = () => {
  const slides = [
    { eyebrow: { en: 'Luxury car care · Dubai', ar: 'عناية فاخرة بالسيارات · دبي' }, title: { en: 'Premium care for your car, every time.', ar: 'عناية فاخرة بسيارتك، في كل مرة.' },
      text: { en: 'Hand wash, detailing and long-lasting protection from a studio that treats every car like a showpiece.', ar: 'غسيل يدوي وعناية تفصيلية وحماية تدوم طويلًا، في استوديو يعامل كل سيارة كتحفة فنية.' }, label: { en: 'Signature care', ar: 'عناية مميزة' } },
    { eyebrow: { en: 'Hand-finished detailing', ar: 'عناية يدوية دقيقة' }, title: { en: 'Detail you can see, down to the last drop.', ar: 'تفاصيل تراها بوضوح، حتى آخر قطرة.' },
      text: { en: 'pH-neutral foam, two-bucket washing and soft microfibre for a swirl-free, mirror finish.', ar: 'رغوة متعادلة الحموضة وغسيل بطريقة الدلوين ومايكروفايبر ناعم، للمعة كالمرآة دون خدوش.' }, label: { en: 'Hand detailing', ar: 'عناية يدوية' } },
    { eyebrow: { en: 'Ceramic & paint protection', ar: 'السيراميك وحماية الطلاء' }, title: { en: 'Showroom shine, day or night.', ar: 'لمعة صالة العرض، ليلًا ونهارًا.' },
      text: { en: 'Ceramic coating and paint protection film that keep the gloss and shield your paint from the desert.', ar: 'طلاء سيراميك وأفلام حماية تحافظ على اللمعان وتحمي الطلاء من أجواء الصحراء.' }, label: { en: 'Protection', ar: 'الحماية' } },
  ];
  const s = slides.map((x, i) => `
      <div class="hero-slide${i === 0 ? ' is-active' : ''}" role="group" aria-roledescription="${t(C.ui.slide)}" aria-label="${i + 1} ${t(C.ui.of)} 3"${i ? ' aria-hidden="true"' : ''}>
        <div class="hero-media">
        ${heroPic(i + 1, i === 0)}
        </div>
        <div class="container hero-content">
          <div class="hero-anim">
            <p class="eyebrow">${t(x.eyebrow)}</p>
            ${i === 0 ? `<h1>${t(x.title)}</h1>` : `<p class="h1" role="heading" aria-level="2">${t(x.title)}</p>`}
            <p class="hero-text">${t(x.text)}</p>
            <div class="btn-row">
              <a class="btn btn-primary" href="#book">${t(C.ui.book)} ${arrow()}</a>
              <a class="btn btn-ghost" href="services.html">${L === 'ar' ? 'استكشف الخدمات' : 'Explore services'}</a>
            </div>
          </div>
        </div>
      </div>`).join('');
  const dots = slides.map((x, i) => `<button class="hero-dot" type="button" aria-label="${t(C.ui.goSlide)} ${i + 1}: ${esc(t(x.label))}" aria-current="${i === 0}"><span class="label" aria-hidden="true">0${i + 1} · ${t(x.label)}</span><span class="bar"></span></button>`).join('');
  return `
    <section class="hero" data-hero aria-roledescription="carousel" aria-label="${t(C.ui.featured)}">${s}
      <div class="hero-controls">
        <div class="container">
          <div class="hero-dots">${dots}</div>
          <div class="hero-arrows">
            <button class="icon-btn hero-pause" type="button" aria-label="${t(C.ui.pause)}" aria-pressed="false">${icon('pause', 'icon-pause')}${icon('play', 'icon-play')}</button>
            <button class="icon-btn" type="button" data-hero-prev aria-label="${t(C.ui.prevSlide)}">${icon('chev-l', 'flip')}</button>
            <button class="icon-btn" type="button" data-hero-next aria-label="${t(C.ui.nextSlide)}">${icon('chev-r', 'flip')}</button>
          </div>
        </div>
      </div>
      <span class="scroll-cue" aria-hidden="true">${t(C.ui.scroll)}</span>
    </section>`;
};

S.trust = () => {
  const items = [
    { icon: 'sedan', c: 12500, suf: '+', en: 'Cars washed', ar: 'سيارة مغسولة' },
    { icon: 'users', c: 8200, suf: '+', en: 'Happy customers', ar: 'عميل سعيد' },
    { icon: 'sparkle', c: 6, en: 'Signature services', ar: 'خدمات مميزة' },
    { icon: 'star', c: 4.9, dec: 1, suf: '/5', en: 'Average rating', ar: 'متوسط التقييم' },
  ];
  return `
    <section class="trust" aria-label="${L === 'ar' ? 'أرقامنا (تجريبية)' : 'Our numbers (demo)'}">
      <div class="container">
        <ul>${items.map((x) => `
          <li><span class="trust-icon">${icon(x.icon)}</span><div><span class="num" data-count="${x.c}"${x.dec ? ` data-decimals="${x.dec}"` : ''}${x.suf ? ` data-suffix="${x.suf}"` : ''}><span class="num-val">${x.dec ? x.c.toFixed(x.dec) : n(x.c)}${x.suf || ''}</span></span><span class="label">${t(x)}</span></div></li>`).join('')}
        </ul>
        <p class="trust-note">${t(C.ui.demoFigures)}</p>
      </div>
    </section>`;
};

S.servicesGrid = () => `
    <section class="section section--grey" id="services" aria-labelledby="services-title">
      <div class="container">
        <div class="section-head section-head--split" data-reveal>
          <div>
            <p class="eyebrow">${L === 'ar' ? 'خدماتنا' : 'What we do'}</p>
            <h2 class="h2" id="services-title">${L === 'ar' ? 'ست خدمات مميزة، <span class="accent">ومعيار واحد</span>.' : 'Six signature services, <span class="accent">one standard</span>.'}</h2>
            <p class="lead">${L === 'ar' ? 'من غسيل أسبوعي سريع إلى حماية طويلة الأمد، كل خدمة يقدّمها فنيون مدرَّبون بمنتجات فاخرة.' : 'From a quick weekly wash to long-term protection, every service is delivered by trained detailers using premium products.'}</p>
          </div>
          <a class="btn btn-ghost" href="services.html">${L === 'ar' ? 'جميع الخدمات' : 'All services'} ${arrow()}</a>
        </div>
        <div class="cards">${C.services.map((s, i) => `
          <article class="card" data-reveal style="--d:${i % 3}">
            <div class="card-top"><div class="card-media">${pic(s.img, { sizes: '(min-width: 1100px) 400px, (min-width: 700px) 50vw, 100vw' })}</div><span class="card-icon">${icon(s.icon)}</span></div>
            <div class="card-body">
              <h3><a class="stretched" href="services.html#${s.id}">${t(s)}</a></h3>
              <p>${t(s.short)}</p>
              <div class="card-foot">
                <span class="card-price">${t(C.ui.from)} <b>${priceTxt(s.sedan)}</b></span>
                <span class="link-arrow" aria-hidden="true">${t(C.ui.learnMore)} ${icon('arrow', 'flip')}</span>
              </div>
            </div>
          </article>`).join('')}
        </div>
      </div>
    </section>`;

S.beforeAfter = (id = 'results') => {
  const pairs = [
    { k: 'suv', en: 'Exterior', ar: 'الخارج', c: { en: 'Full exterior detail: decontamination wash, polish and sealant.', ar: 'عناية خارجية كاملة: غسيل لإزالة الملوثات وتلميع وطبقة حماية.' } },
    { k: 'interior', en: 'Interior', ar: 'الداخل', c: { en: 'Interior detailing: deep vacuum, steam clean and leather care.', ar: 'تنظيف داخلي: تنظيف عميق بالمكنسة والبخار مع العناية بالجلد.' } },
    { k: 'wheel', en: 'Wheels', ar: 'الجنوط', c: { en: 'Wheel deep-clean: iron fallout remover, soft brushes and a protective coat.', ar: 'تنظيف عميق للجنوط: مزيل برادة الحديد وفرش ناعمة وطبقة حماية.' } },
  ];
  const tabs = pairs.map((p, i) => `<button class="ba-tab" type="button" role="tab" id="${id}-tab-${p.k}" aria-controls="${id}-panel-${p.k}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>${t(p)}</button>`).join('');
  const panels = pairs.map((p, i) => `
          <div class="ba-panel" role="tabpanel" id="${id}-panel-${p.k}" aria-labelledby="${id}-tab-${p.k}"${i ? ' hidden' : ''}>
            <div class="ba">
              ${pic('after-' + p.k, { cls: 'ba-after', sizes: '(min-width: 1240px) 1180px, 100vw' })}
              ${pic('before-' + p.k, { cls: 'ba-before', sizes: '(min-width: 1240px) 1180px, 100vw' })}
              <span class="ba-label ba-label--before" aria-hidden="true">${L === 'ar' ? 'قبل' : 'Before'}</span>
              <span class="ba-label ba-label--after" aria-hidden="true">${L === 'ar' ? 'بعد' : 'After'}</span>
              <div class="ba-handle" aria-hidden="true"><span class="ba-knob">${icon('arrows-h')}</span></div>
              <input type="range" min="0" max="100" value="50" aria-label="${L === 'ar' ? 'مقارنة قبل وبعد: ' + t(p) : 'Before and after comparison: ' + t(p)}">
            </div>
            <p class="ba-caption">${t(p.c)}</p>
          </div>`).join('');
  return `
    <section class="section section--dark" id="${id}" aria-labelledby="${id}-title">
      <div class="container">
        <div class="section-head section-head--center" data-reveal>
          <p class="eyebrow">${L === 'ar' ? 'قبل وبعد' : 'Before & after'}</p>
          <h2 class="h2" id="${id}-title">${L === 'ar' ? 'اسحب لترى <span class="accent">الفرق</span>.' : 'Drag to see <span class="accent">the difference</span>.'}</h2>
          <p class="lead">${L === 'ar' ? 'اسحب المقبض أو استخدم مفاتيح الأسهم لمقارنة النتائج الحقيقية لعملنا.' : 'Drag the handle, or use the arrow keys, to compare results from our studio.'}</p>
        </div>
        <div data-reveal>
          <div style="text-align:center"><div class="ba-tabs" role="tablist" aria-label="${L === 'ar' ? 'أمثلة المقارنة' : 'Comparison examples'}">${tabs}</div></div>
          ${panels}
        </div>
      </div>
    </section>`;
};

const planCards = (scopeId) => C.packages.map((p, i) => `
          <article class="plan${p.featured ? ' plan--featured' : ''}" data-reveal style="--d:${i}">
            ${p.featured ? `<span class="plan-badge">${L === 'ar' ? 'الأكثر طلبًا' : 'Most popular'}</span>` : ''}
            <h3>${t(p)}</h3>
            <p class="plan-desc">${t(p.desc)}</p>
            <p class="plan-price">${L === 'ar' ? `<span class="amount" data-sedan="${p.sedan}" data-suv="${p.suv}">${n(p.sedan)}</span> <span class="cur">${t(C.ui.aed)}</span>` : `<span class="cur">${t(C.ui.aed)}</span> <span class="amount" data-sedan="${p.sedan}" data-suv="${p.suv}">${n(p.sedan)}</span>`}</p>
            <p class="plan-meta"><span data-sedan="${L === 'ar' ? 'للسيارة السيدان' : 'per sedan'}" data-suv="${L === 'ar' ? 'لسيارة الدفع الرباعي' : 'per SUV / 4x4'}">${L === 'ar' ? 'للسيارة السيدان' : 'per sedan'}</span> · ${t(p.time)}</p>
            <ul class="check-list">${C.features.map((f) => `<li${f.in[i] ? '' : ' class="is-off"'}>${icon(f.in[i] ? 'check' : 'minus')}<span>${t(f)}${f.in[i] ? '' : `<span class="sr-only"> ${L === 'ar' ? '(غير مشمول)' : '(not included)'}</span>`}</span></li>`).join('')}</ul>
            <a class="btn ${p.featured ? 'btn-primary' : 'btn-ghost'} btn-block" data-plan-link="booking.html?service=package-${p.id}" href="booking.html?service=package-${p.id}&amp;vehicle=sedan#book">${L === 'ar' ? 'اختر ' + t(p) : 'Choose ' + t(p)}</a>
          </article>`).join('');

const priceToggle = (scope) => `
          <div class="price-toggle" data-price-toggle="${scope}" data-active="sedan" role="group" aria-label="${L === 'ar' ? 'نوع السيارة' : 'Vehicle type'}">
            <button type="button" data-vehicle="sedan" aria-pressed="true">${icon('sedan')} ${L === 'ar' ? 'سيدان' : 'Sedan'}</button>
            <button type="button" data-vehicle="suv" aria-pressed="false">${icon('suv')} ${L === 'ar' ? 'دفع رباعي' : 'SUV'}</button>
          </div>`;

S.pricing = (o = {}) => `
    <section class="section ${o.theme || 'section--white'}" id="${o.id || 'packages'}" aria-labelledby="${o.id || 'packages'}-title">
      <div class="container">
        <div class="section-head section-head--center" data-reveal>
          <p class="eyebrow">${L === 'ar' ? 'الباقات والأسعار' : 'Packages & pricing'}</p>
          <h2 class="h2" id="${o.id || 'packages'}-title">${L === 'ar' ? 'أسعار واضحة، <span class="accent">ونتائج فاخرة</span>.' : 'Clear prices, <span class="accent">premium results</span>.'}</h2>
          <p class="lead">${L === 'ar' ? 'اختر نوع سيارتك لعرض الأسعار بالدرهم الإماراتي. جميع الباقات تشمل الغسيل اليدوي.' : 'Choose your vehicle type to see prices in AED. Every package includes our signature hand wash.'}</p>
          ${priceToggle('plans-' + (o.id || 'packages'))}
        </div>
        <div class="pricing" id="plans-${o.id || 'packages'}">${planCards()}
        </div>
        <p class="pricing-note">${L === 'ar' ? 'الأسعار تجريبية وتشمل ضريبة القيمة المضافة لأغراض العرض فقط.' : 'Demo prices, shown inclusive of VAT for illustration only.'}${o.more ? ` <a href="packages.html">${L === 'ar' ? 'قارن جميع الباقات' : 'Compare all packages'}</a>` : ''}</p>
      </div>
    </section>`;

S.steps = () => `
    <section class="section section--grey" aria-labelledby="how-title">
      <div class="container">
        ${head2({ en: 'How it works', ar: 'كيف نعمل' }, { en: 'From booking to <span class="accent">brilliant</span> in four steps.', ar: 'من الحجز إلى <span class="accent">اللمعان</span> في أربع خطوات.' }, null, { center: true, id: 'how-title' })}
        <ol class="steps" data-reveal="fade">${C.steps.map((s, i) => `
          <li class="step" style="--i:${i}">
            <span class="step-num">${icon(s.icon)}</span>
            <div>
              <small>${L === 'ar' ? 'الخطوة' : 'Step'} 0${i + 1}</small>
              <h3>${t(s)}</h3>
              <p>${t(s.d)}</p>
            </div>
          </li>`).join('')}
        </ol>
      </div>
    </section>`;

S.membership = () => {
  const m = C.membership[0];
  return `
    <section class="section section--white" aria-labelledby="club-title">
      <div class="container">
        <div class="promo" data-reveal="zoom">
          <div class="hero-media">${pic('banner-membership', { sizes: '(min-width: 1240px) 1180px, 100vw', alt: '' })}</div>
          <div class="promo-content">
            <p class="eyebrow">${L === 'ar' ? 'عضوية شهرية' : 'Monthly membership'}</p>
            <h2 id="club-title">${L === 'ar' ? 'انضم إلى <span class="accent">نادي اللمعان</span> وحافظ على لمعة سيارتك طوال الشهر.' : 'Join the <span class="accent">Shine Club</span> and keep that showroom look all month.'}</h2>
            <p class="promo-price">${L === 'ar' ? `<span class="amount">${n(m.sedan)}</span><span>${t(C.ui.aed)}</span><span class="per">/ شهريًا للسيدان</span>` : `<span>${t(C.ui.aed)}</span><span class="amount">${n(m.sedan)}</span><span class="per">/ month, sedan</span>`}</p>
            <ul class="check-list">${t(m.list).map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
            <div class="btn-row">
              <a class="btn btn-primary" href="booking.html?service=membership#book">${L === 'ar' ? 'انضم الآن' : 'Join the club'} ${arrow()}</a>
              <a class="btn btn-ghost" href="packages.html#membership">${L === 'ar' ? 'تفاصيل العضوية' : 'Membership details'}</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;
};

const gItem = (g, group, i) => `<button class="g-item" type="button" data-lightbox="${group}" data-cat="${g.cat}" ${full(g.img)} data-caption="${esc(t(g))}" data-alt="${esc(t(C.img[g.img]))}" aria-label="${esc(t(C.ui.viewImage) + ' ' + t(g))}"${i != null ? ` data-reveal style="--d:${i % 4}"` : ''}>${pic(g.img, { sizes: '(min-width: 1100px) 300px, (min-width: 720px) 33vw, 50vw' })}<span class="g-cap"><span><small>${t(C.cats[g.cat])}</small>${t(g)}</span><span class="g-zoom">${icon('expand')}</span></span></button>`;

S.galleryPreview = () => `
    <section class="section section--grey" aria-labelledby="gallery-title">
      <div class="container">
        <div class="section-head section-head--split" data-reveal>
          <div>
            <p class="eyebrow">${L === 'ar' ? 'المعرض' : 'Gallery'}</p>
            <h2 class="h2" id="gallery-title">${L === 'ar' ? 'من داخل <span class="accent">الاستوديو</span>.' : 'Inside the <span class="accent">studio</span>.'}</h2>
          </div>
          <a class="btn btn-ghost" href="gallery.html">${L === 'ar' ? 'عرض المعرض كاملًا' : 'View full gallery'} ${arrow()}</a>
        </div>
        <div class="gallery-grid">${[0, 1, 2, 3, 4, 7].map((k, i) => gItem(C.gallery[k], 'home', i)).join('')}</div>
      </div>
    </section>`;

S.testimonials = () => `
    <section class="section section--white" aria-labelledby="reviews-title">
      <div class="container" data-testimonials>
        <div class="section-head section-head--split" data-reveal>
          <div>
            <p class="eyebrow">${L === 'ar' ? 'آراء العملاء' : 'Testimonials'}</p>
            <h2 class="h2" id="reviews-title">${L === 'ar' ? 'سيارات لامعة <span class="accent">وعملاء سعداء</span>.' : 'Shining cars, <span class="accent">happy drivers</span>.'}</h2>
          </div>
          <div class="t-nav">
            <div class="t-dots"></div>
            <button class="icon-btn" type="button" data-t-prev aria-label="${t(C.ui.prevReview)}">${icon('chev-l', 'flip')}</button>
            <button class="icon-btn" type="button" data-t-next aria-label="${t(C.ui.nextReview)}">${icon('chev-r', 'flip')}</button>
          </div>
        </div>
        <div class="t-track" data-reveal tabindex="0" aria-label="${L === 'ar' ? 'تقييمات العملاء' : 'Customer reviews'}" role="region">${C.testimonials.map((r) => `
          <figure class="t-card">
            ${icon('quote', 't-quote-mark')}
            <div class="stars" role="img" aria-label="${t(C.ui.rated)}">${icon('star').repeat(5)}</div>
            <blockquote><p>${t(r.q)}</p></blockquote>
            <figcaption class="t-person"><span class="avatar${r.silver ? ' avatar--silver' : ''}" aria-hidden="true">${t(r.i)}</span><span><b>${t(r.n)}</b><span>${t(r.s)}</span></span></figcaption>
          </figure>`).join('')}
        </div>
        <p class="t-note">${L === 'ar' ? 'تقييمات نموذجية بأسماء عملاء خيالية لهذا الموقع التجريبي.' : 'Sample reviews with fictional customer names for this concept website.'}</p>
      </div>
    </section>`;

S.faq = (items = C.faq, o = {}) => `
    <section class="section ${o.theme || 'section--grey'}" id="faq" aria-labelledby="faq-title">
      <div class="container">
        ${head2({ en: 'FAQ', ar: 'الأسئلة الشائعة' }, { en: 'Questions, <span class="accent">answered</span>.', ar: 'إجابات <span class="accent">لأسئلتك</span>.' }, null, { center: true, id: 'faq-title' })}
        <div class="faq" data-reveal>${items.map((f, i) => `
          <div class="faq-item">
            <h3 class="faq-q"><button type="button" aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}">${t(f.q)}<span class="faq-sign" aria-hidden="true"></span></button></h3>
            <div class="faq-a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}"><div><p>${t(f.a)}</p></div></div>
          </div>`).join('')}
        </div>
      </div>
    </section>`;

S.booking = (o = {}) => {
  const svcOpts = C.services.map((s) => `
                <label class="opt"><input type="radio" name="service" value="${s.id}" data-label="${esc(t(s))}" data-price-sedan="${s.sedan}" data-price-suv="${s.suv}"><span class="opt-box">${icon(s.icon)}<span>${t(s)}<small>${t(C.ui.from)} ${priceTxt(s.sedan)}</small></span></span></label>`).join('');
  const pkgOpts = C.packages.map((p) => `
                <label class="opt"><input type="radio" name="service" value="package-${p.id}" data-label="${esc((L === 'ar' ? 'الباقة ' : '') + t(p) + (L === 'ar' ? '' : ' package'))}" data-price-sedan="${p.sedan}" data-price-suv="${p.suv}"><span class="opt-box">${icon(p.featured ? 'award' : 'tag')}<span>${L === 'ar' ? 'الباقة ' + t(p) : t(p) + ' package'}<small>${priceTxt(p.sedan)}</small></span></span></label>`).join('') + `
                <label class="opt"><input type="radio" name="service" value="membership" data-per="month" data-label="${esc(t(C.membership[0]))}" data-price-sedan="${C.membership[0].sedan}" data-price-suv="${C.membership[0].suv}"><span class="opt-box">${icon('crown')}<span>${t(C.membership[0])}<small>${priceTxt(C.membership[0].sedan)} ${L === 'ar' ? '/ شهريًا' : '/ month'}</small></span></span></label>`;
  const veh = C.vehicles.map((v) => `
                <label class="opt"><input type="radio" name="vehicle" value="${v.id}" data-label="${esc(t(v))}"><span class="opt-box">${icon(v.icon)}<span>${t(v)}<small>${t(v.s)}</small></span></span></label>`).join('');
  const slots = C.slots.map((s) => `<label class="opt opt--slot"><input type="radio" name="time" value="${s}"${C.booked.includes(s) ? ' data-booked="true" disabled' : ''} aria-label="${s}${C.booked.includes(s) ? (L === 'ar' ? ' (محجوز)' : ' (booked)') : ''}"><span class="opt-box" dir="ltr">${s}</span></label>`).join('');
  const stepNames = L === 'ar' ? ['الخدمة', 'السيارة', 'الموعد', 'البيانات'] : ['Service', 'Vehicle', 'Date & time', 'Details'];
  const id = o.id || 'book';
  return `
    <section class="section ${o.theme || 'section--white'}" id="${id}" aria-labelledby="${id}-title">
      <div class="container booking">
        <div class="booking-aside" data-reveal>
          <p class="eyebrow">${L === 'ar' ? 'احجز موعدك' : 'Book online'}</p>
          <h2 id="${id}-title">${L === 'ar' ? 'احجز موعدك في <span class="accent">أقل من دقيقة</span>.' : 'Book your slot in <span class="accent">under a minute</span>.'}</h2>
          <p class="lead">${L === 'ar' ? 'اختر الخدمة ونوع السيارة والموعد المناسب، وسنتولى الباقي.' : 'Choose a service, your vehicle and a time that suits you. We will take care of the rest.'}</p>
          <ul class="info-list">
            <li><span class="ico">${icon('clock')}</span><span><b>${L === 'ar' ? 'مفتوح 7 أيام في الأسبوع' : 'Open 7 days a week'}</b><span>${L === 'ar' ? 'السبت – الخميس' : 'Sat – Thu'} <span dir="ltr">08:00 – 22:00</span> · ${L === 'ar' ? 'الجمعة' : 'Fri'} <span dir="ltr">14:00 – 22:00</span></span></span></li>
            <li><span class="ico">${icon('pin')}</span><span><b>${t(C.footer.area)}</b><span>${L === 'ar' ? 'استوديو العناية بالسيارات' : 'Car care studio'}</span></span></li>
            <li><span class="ico">${icon('refresh')}</span><span><b>${L === 'ar' ? 'تغيير الموعد مجانًا' : 'Free rescheduling'}</b><span>${L === 'ar' ? 'حتى 12 ساعة قبل موعدك' : 'Up to 12 hours before your slot'}</span></span></li>
          </ul>
          <p class="demo-note">${icon('info')}<span>${L === 'ar' ? '<b>نموذج تجريبي:</b> هذا الموقع لعلامة تجارية خيالية، ولا تُرسل بيانات الحجز ولا تُخزَّن.' : '<b>Demo form:</b> this website is for a fictional brand. Booking details are not sent or stored.'}</span></p>
        </div>
        <div class="form-card" data-reveal style="--d:1">
          <form class="booking-form" data-booking data-success="${id}-success" novalidate aria-labelledby="${id}-title">
            <ol class="stepper">${stepNames.map((s, i) => `<li${i === 0 ? ' aria-current="step"' : ''}><span><span class="n" aria-hidden="true">${i + 1}</span><span class="t">${s}</span><span class="sr-only"> (${L === 'ar' ? 'الخطوة' : 'step'} ${i + 1} ${L === 'ar' ? 'من' : 'of'} 4)</span></span></li>`).join('')}</ol>
            <p class="sr-only step-live" aria-live="polite"></p>

            <fieldset class="form-step">
              <legend>${L === 'ar' ? 'اختر الخدمة' : 'Choose a service'}</legend>
              <p class="hint">${L === 'ar' ? 'خدمة منفردة أو باقة متكاملة.' : 'A single service or a complete package.'}</p>
              <div role="radiogroup" data-group="service" data-error-id="${id}-err-service" aria-labelledby="${id}-svc-l" aria-describedby="${id}-err-service">
                <p class="opt-group-label" id="${id}-svc-l">${L === 'ar' ? 'الخدمات' : 'Services'}</p>
                <div class="opt-grid">${svcOpts}
                </div>
                <p class="opt-group-label">${L === 'ar' ? 'أو اختر باقة' : 'Or choose a package'}</p>
                <div class="opt-grid">${pkgOpts}
                </div>
              </div>
              <p class="error-msg group-error" id="${id}-err-service" role="alert"></p>
            </fieldset>

            <fieldset class="form-step" hidden>
              <legend>${L === 'ar' ? 'نوع السيارة' : 'Your vehicle'}</legend>
              <p class="hint">${L === 'ar' ? 'تختلف الأسعار حسب حجم السيارة.' : 'Prices vary by vehicle size.'}</p>
              <div role="radiogroup" data-group="vehicle" data-error-id="${id}-err-vehicle" aria-label="${L === 'ar' ? 'نوع السيارة' : 'Vehicle type'}" aria-describedby="${id}-err-vehicle">
                <div class="opt-grid opt-grid--3">${veh}
                </div>
              </div>
              <p class="error-msg group-error" id="${id}-err-vehicle" role="alert"></p>
            </fieldset>

            <fieldset class="form-step" hidden>
              <legend>${L === 'ar' ? 'التاريخ والوقت' : 'Date & time'}</legend>
              <p class="hint">${L === 'ar' ? 'المواعيد المشطوبة محجوزة بالفعل.' : 'Crossed-out slots are already booked.'}</p>
              <div class="field">
                <label for="${id}-date">${L === 'ar' ? 'التاريخ' : 'Date'}</label>
                <input class="input" type="date" id="${id}-date" name="date" required aria-describedby="${id}-err-date">
                <p class="error-msg" id="${id}-err-date" role="alert"></p>
              </div>
              <div role="radiogroup" data-group="time" data-error-id="${id}-err-time" aria-labelledby="${id}-time-l" aria-describedby="${id}-err-time">
                <p class="opt-group-label" id="${id}-time-l">${L === 'ar' ? 'الوقت' : 'Time'}</p>
                <div class="opt-grid opt-grid--3" style="grid-template-columns:repeat(auto-fill,minmax(96px,1fr))">${slots}</div>
              </div>
              <p class="error-msg group-error" id="${id}-err-time" role="alert"></p>
            </fieldset>

            <fieldset class="form-step" hidden>
              <legend>${L === 'ar' ? 'بياناتك' : 'Your details'}</legend>
              <p class="hint">${L === 'ar' ? 'راجع حجزك ثم أكّده.' : 'Review your booking and confirm.'}</p>
              <div class="field-row">
                <div class="field">
                  <label for="${id}-name">${L === 'ar' ? 'الاسم الكامل' : 'Full name'}</label>
                  <input class="input" type="text" id="${id}-name" name="name" autocomplete="name" required aria-describedby="${id}-err-name">
                  <p class="error-msg" id="${id}-err-name" role="alert"></p>
                </div>
                <div class="field">
                  <label for="${id}-phone">${L === 'ar' ? 'رقم الجوال' : 'Mobile number'}</label>
                  <input class="input" type="tel" id="${id}-phone" name="phone" autocomplete="tel" inputmode="tel" dir="ltr" placeholder="050 000 0000" required aria-describedby="${id}-err-phone">
                  <p class="error-msg" id="${id}-err-phone" role="alert"></p>
                </div>
              </div>
              <div class="field">
                <label for="${id}-email">${L === 'ar' ? 'البريد الإلكتروني' : 'Email'} <span class="opt-label">(${L === 'ar' ? 'اختياري' : 'optional'})</span></label>
                <input class="input" type="email" id="${id}-email" name="email" autocomplete="email" dir="ltr" aria-describedby="${id}-err-email">
                <p class="error-msg" id="${id}-err-email" role="alert"></p>
              </div>
              <div class="field">
                <label for="${id}-notes">${L === 'ar' ? 'ملاحظات' : 'Notes'} <span class="opt-label">(${L === 'ar' ? 'اختياري' : 'optional'})</span></label>
                <textarea class="input" id="${id}-notes" name="notes" rows="3"></textarea>
              </div>
              <dl class="summary">
                <div><dt>${L === 'ar' ? 'الخدمة' : 'Service'}</dt><dd data-sum="service"></dd></div>
                <div><dt>${L === 'ar' ? 'السيارة' : 'Vehicle'}</dt><dd data-sum="vehicle"></dd></div>
                <div><dt>${L === 'ar' ? 'التاريخ' : 'Date'}</dt><dd data-sum="date"></dd></div>
                <div><dt>${L === 'ar' ? 'الوقت' : 'Time'}</dt><dd data-sum="time" dir="ltr"></dd></div>
                <div><dt>${L === 'ar' ? 'السعر التقديري' : 'Estimated price'}</dt><dd data-sum="price"></dd></div>
              </dl>
            </fieldset>

            <div class="form-nav">
              <button class="btn btn-ghost btn-back" type="button" hidden>${icon('arrow', 'flip')}<span>${L === 'ar' ? 'السابق' : 'Back'}</span></button>
              <button class="btn btn-primary btn-next" type="button">${L === 'ar' ? 'التالي' : 'Next'} ${arrow()}</button>
              <button class="btn btn-primary btn-submit" type="submit" hidden>${L === 'ar' ? 'تأكيد الحجز' : 'Confirm booking'} ${icon('check')}</button>
            </div>
          </form>
          <div class="success" id="${id}-success" tabindex="-1" role="status" hidden>
            <svg class="success-icon" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="45"/><path d="M30 52l13 13 27-29"/></svg>
            <h3>${L === 'ar' ? 'شكرًا يا <span data-success-name></span>، تم استلام حجزك!' : 'Thank you, <span data-success-name></span>. Your booking is received!'}</h3>
            <p>${L === 'ar' ? 'هذا عرض تجريبي، لذلك لم يُرسل أي حجز. في الموقع الحقيقي سيصلك تأكيد خلال دقائق.' : 'This is a demo, so no booking has been sent. On a live site you would receive a confirmation within minutes.'}</p>
            <span class="ref">${L === 'ar' ? 'رقم مرجعي تجريبي' : 'Demo reference'}: <span data-success-ref></span></span>
            <div class="btn-row" style="justify-content:center"><button class="btn btn-ghost" type="button" data-book-again>${L === 'ar' ? 'حجز جديد' : 'Make another booking'}</button></div>
          </div>
        </div>
      </div>
    </section>`;
};

S.cta = (o) => `
    <section class="section ${o.theme || 'section--white'}">
      <div class="container">
        <div class="cta-band" data-reveal="zoom">
          <p class="eyebrow" style="justify-content:center">${t(o.eyebrow)}</p>
          <h2>${t(o.title)}</h2>
          <p>${t(o.text)}</p>
          <div class="btn-row">
            <a class="btn btn-primary" href="${o.href || 'booking.html#book'}">${t(o.btn || C.ui.book)} ${arrow()}</a>
            ${o.href2 ? `<a class="btn btn-ghost" href="${o.href2}">${t(o.btn2)}</a>` : ''}
          </div>
        </div>
      </div>
    </section>`;

/* ---------------- Pages ---------------- */
const build = {};

build.home = () => `${head('home')}${header('home')}
  <main id="main" tabindex="-1">${S.hero()}${S.trust()}${S.servicesGrid()}${S.beforeAfter()}${S.pricing({ more: true })}${S.steps()}${S.membership()}${S.galleryPreview()}${S.testimonials()}${S.faq()}${S.booking()}
  </main>${footer()}`;

build.services = () => `${head('services')}${header('services')}
  <main id="main" tabindex="-1">${pageHero({ img: 'service-polishing', crumb: C.nav[1], eyebrow: { en: 'Our services', ar: 'خدماتنا' },
    title: { en: 'Every detail, <span class="accent">perfected</span>.', ar: 'كل التفاصيل، <span class="accent">بإتقان</span>.' },
    lead: { en: 'Six signature services, from a weekly hand wash to multi-year paint protection, each delivered with studio-grade care.', ar: 'ست خدمات مميزة، من الغسيل اليدوي الأسبوعي إلى حماية الطلاء لسنوات، تُقدَّم جميعها بعناية على مستوى الاستوديو.' } })}
    <nav class="chip-nav" aria-label="${L === 'ar' ? 'انتقل إلى خدمة' : 'Jump to a service'}"><div class="container"><ul>${C.services.map((s) => `<li><a href="#${s.id}">${icon(s.icon)}${t(s)}</a></li>`).join('')}</ul></div></nav>
${C.services.map((s, i) => `
    <section class="section svc-band section--${i % 2 ? 'grey' : 'white'}" aria-labelledby="${s.id}-t">
      <div class="container">
        <article class="svc-detail${i % 2 ? ' svc-detail--flip' : ''}" id="${s.id}">
          <div class="svc-media" data-reveal="zoom">${pic(s.img, { sizes: '(min-width: 960px) 600px, 100vw' })}<span class="tag">${t(C.ui.from)} ${priceTxt(s.sedan)}</span></div>
          <div data-reveal style="--d:1">
            <span class="svc-num">0${i + 1} / 06</span>
            <h2 id="${s.id}-t">${t(s)}</h2>
            <p class="lead">${t(s.long)}</p>
            <div class="svc-facts">
              <span class="fact">${icon('clock')}<span><span class="sr-only">${L === 'ar' ? 'المدة: ' : 'Duration: '}</span>${t(s.time)}</span></span>
              <span class="fact">${icon('tag')}<span>${t(C.ui.from)} ${priceTxt(s.sedan)} · ${L === 'ar' ? 'الدفع الرباعي' : 'SUV'} ${priceTxt(s.suv)}</span></span>
              <span class="fact">${icon('award')}<span><span class="sr-only">${L === 'ar' ? 'مثالي لـ: ' : 'Ideal for: '}</span>${t(s.ideal)}</span></span>
            </div>
            <h3 class="sr-only">${L === 'ar' ? 'ما الذي تشمله الخدمة' : 'What is included'}</h3>
            <ul class="check-list">${t(s.list).map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
            <div class="btn-row">
              <a class="btn btn-primary" href="booking.html?service=${s.id}#book">${L === 'ar' ? 'احجز هذه الخدمة' : 'Book this service'} ${arrow()}</a>
              <a class="btn btn-ghost" href="packages.html">${L === 'ar' ? 'عرض الباقات' : 'See packages'}</a>
            </div>
          </div>
        </article>
      </div>
    </section>`).join('')}
    <section class="section section--white">
      <div class="container">
        <div class="promo" data-reveal="zoom">
          <div class="hero-media">${pic('banner-booking', { sizes: '(min-width: 1240px) 1180px, 100vw', alt: '' })}</div>
          <div class="promo-content">
            <p class="eyebrow">${L === 'ar' ? 'لست متأكدًا؟' : 'Not sure what you need?'}</p>
            <h2>${L === 'ar' ? 'دعنا نقترح <span class="accent">العناية المناسبة</span> لسيارتك.' : 'Let us recommend <span class="accent">the right care</span> for your car.'}</h2>
            <p>${L === 'ar' ? 'أخبرنا عن سيارتك وطريقة استخدامها، وسيقترح فريقنا الخدمة الأنسب دون أي التزام.' : 'Tell us about your car and how you drive it, and our team will suggest the best fit, with no obligation.'}</p>
            <div class="btn-row"><a class="btn btn-primary" href="booking.html#contact">${L === 'ar' ? 'اطلب استشارة' : 'Ask for advice'} ${arrow()}</a></div>
          </div>
        </div>
      </div>
    </section>
  </main>${footer()}`;

build.packages = () => `${head('packages')}${header('packages')}
  <main id="main" tabindex="-1">${pageHero({ img: 'service-ceramic-coating', crumb: C.nav[2], eyebrow: { en: 'Packages & pricing', ar: 'الباقات والأسعار' },
    title: { en: 'Pick your level of <span class="accent">shine</span>.', ar: 'اختر مستوى <span class="accent">اللمعان</span> المناسب لك.' },
    lead: { en: 'Transparent prices in AED for sedans and SUVs, monthly memberships and add-ons to tailor every visit.', ar: 'أسعار واضحة بالدرهم للسيارات السيدان والدفع الرباعي، مع عضويات شهرية وخدمات إضافية تناسب كل زيارة.' } })}
    ${S.pricing({ id: 'plans', theme: 'section--white' })}
    <section class="section section--grey" aria-labelledby="compare-title">
      <div class="container">
        ${head2({ en: 'Compare', ar: 'المقارنة' }, { en: 'What is included in <span class="accent">each package</span>.', ar: 'ما تشمله <span class="accent">كل باقة</span>.' }, null, { center: true, id: 'compare-title' })}
        <div class="table-wrap" data-reveal tabindex="0" role="region" aria-labelledby="compare-title">
          <table class="compare">
            <caption>${L === 'ar' ? 'أسعار السيدان / الدفع الرباعي بالدرهم الإماراتي. أسعار تجريبية.' : 'Sedan / SUV prices in AED. Demo prices.'}</caption>
            <thead><tr><th scope="col">${L === 'ar' ? 'الميزة' : 'Feature'}</th>${C.packages.map((p) => `<th scope="col"${p.featured ? ' class="is-featured"' : ''}>${t(p)}<br><small style="font-weight:500;color:var(--muted)">${n(p.sedan)} / ${n(p.suv)}</small></th>`).join('')}</tr></thead>
            <tbody>${C.features.map((f) => `<tr><th scope="row">${t(f)}</th>${f.in.map((v, i) => `<td${C.packages[i].featured ? ' class="is-featured"' : ''}>${v ? icon('check') + `<span class="sr-only">${L === 'ar' ? 'مشمول' : 'Included'}</span>` : icon('minus', 'no') + `<span class="sr-only">${L === 'ar' ? 'غير مشمول' : 'Not included'}</span>`}</td>`).join('')}</tr>`).join('')}
              <tr><th scope="row">${L === 'ar' ? 'المدة التقريبية' : 'Approx. duration'}</th>${C.packages.map((p) => `<td${p.featured ? ' class="is-featured"' : ''}>${t(p.time)}</td>`).join('')}</tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <section class="section section--white" id="membership" aria-labelledby="membership-title">
      <div class="container">
        <div class="section-head section-head--center" data-reveal>
          <p class="eyebrow">${L === 'ar' ? 'العضوية الشهرية' : 'Monthly membership'}</p>
          <h2 class="h2" id="membership-title">${L === 'ar' ? 'نادي اللمعان: <span class="accent">لمعة دائمة</span>.' : 'Shine Club: <span class="accent">always clean</span>.'}</h2>
          <p class="lead">${L === 'ar' ? 'اشتراك شهري مرن يمكنك إيقافه أو إلغاؤه في أي وقت (شروط تجريبية).' : 'A flexible monthly plan you can pause or cancel any time (demo terms).'}</p>
          ${priceToggle('club-plans')}
        </div>
        <div class="pricing" id="club-plans" style="max-width:860px;margin-inline:auto;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))">${C.membership.map((m, i) => `
          <article class="plan${i === 0 ? ' plan--featured' : ''}" data-reveal style="--d:${i}">
            ${i === 0 ? `<span class="plan-badge">${L === 'ar' ? 'الأفضل قيمة' : 'Best value'}</span>` : ''}
            <h3>${icon('crown')} ${t(m)}</h3>
            <p class="plan-desc">${t(m.desc)}</p>
            <p class="plan-price">${L === 'ar' ? `<span class="amount" data-sedan="${m.sedan}" data-suv="${m.suv}">${n(m.sedan)}</span> <span class="cur">${t(C.ui.aed)}</span>` : `<span class="cur">${t(C.ui.aed)}</span> <span class="amount" data-sedan="${m.sedan}" data-suv="${m.suv}">${n(m.sedan)}</span>`}</p>
            <p class="plan-meta">${L === 'ar' ? 'شهريًا' : 'per month'} · <span data-sedan="${L === 'ar' ? 'سيدان' : 'sedan'}" data-suv="${L === 'ar' ? 'دفع رباعي' : 'SUV / 4x4'}">${L === 'ar' ? 'سيدان' : 'sedan'}</span></p>
            <ul class="check-list">${t(m.list).map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
            <a class="btn ${i === 0 ? 'btn-primary' : 'btn-ghost'} btn-block" data-plan-link="booking.html?service=membership" href="booking.html?service=membership&amp;vehicle=sedan#book">${L === 'ar' ? 'اشترك الآن' : 'Join now'}</a>
          </article>`).join('')}
        </div>
      </div>
    </section>
    <section class="section section--grey" aria-labelledby="addons-title">
      <div class="container">
        ${head2({ en: 'Add-ons', ar: 'خدمات إضافية' }, { en: 'Tailor any visit with <span class="accent">extras</span>.', ar: 'خصّص زيارتك <span class="accent">بإضافات</span> مميزة.' }, { en: 'Add these to any service or package when you book.', ar: 'أضفها إلى أي خدمة أو باقة عند الحجز.' }, { center: true, id: 'addons-title' })}
        <div class="tiles">${C.addons.map((a, i) => `
          <div class="tile" data-reveal style="--d:${i % 3}"><span class="ico">${icon(a.icon)}</span><h3>${t(a)}</h3><p>${t(a.d)}</p><span class="tile-price">${t(C.ui.from)} <b>${priceTxt(a.p)}</b></span></div>`).join('')}
        </div>
      </div>
    </section>
    ${S.faq([C.faq[0], C.faq[4], C.faq[3], C.faq[5]], { theme: 'section--white' })}
    ${S.cta({ theme: 'section--grey', eyebrow: { en: 'Ready when you are', ar: 'جاهزون متى شئت' }, title: { en: 'Your car deserves <span class="accent">the premium treatment</span>.', ar: 'سيارتك تستحق <span class="accent">عناية فاخرة</span>.' }, text: { en: 'Book online in four quick steps and choose a time that suits you.', ar: 'احجز أونلاين في أربع خطوات سريعة واختر الموعد المناسب لك.' }, href2: 'services.html', btn2: { en: 'Explore services', ar: 'استكشف الخدمات' } })}
  </main>${footer()}`;

build.gallery = () => {
  const counts = { all: C.gallery.length };
  C.gallery.forEach((g) => { counts[g.cat] = (counts[g.cat] || 0) + 1; });
  return `${head('gallery')}${header('gallery')}
  <main id="main" tabindex="-1">${pageHero({ img: 'gallery-8-exterior-finish', crumb: C.nav[3], eyebrow: { en: 'Gallery', ar: 'المعرض' },
    title: { en: 'Results that <span class="accent">speak for themselves</span>.', ar: 'نتائج <span class="accent">تتحدث عن نفسها</span>.' },
    lead: { en: 'A look inside our Dubai studio: exterior washes, interior detailing and protection work.', ar: 'نظرة إلى داخل استوديو دبي: غسيل خارجي وتنظيف داخلي وأعمال حماية.' } })}
    <section class="section section--white" aria-labelledby="work-title">
      <div class="container">
        <h2 class="sr-only" id="work-title">${L === 'ar' ? 'أعمالنا' : 'Our work'}</h2>
        <div class="filter-bar" data-filter-bar role="group" aria-label="${L === 'ar' ? 'تصفية الصور' : 'Filter images'}">${Object.keys(C.cats).map((k, i) => `<button class="filter-btn" type="button" data-filter="${k}" aria-pressed="${i === 0}">${t(C.cats[k])}<span class="count">${counts[k]}</span></button>`).join('')}</div>
        <p class="filter-status" aria-live="polite"></p>
        <div class="gallery-grid gallery-grid--4">${C.gallery.map((g, i) => gItem(g, 'gallery', i)).join('')}</div>
      </div>
    </section>
    ${S.beforeAfter('compare')}
    ${S.cta({ eyebrow: { en: 'Your car next?', ar: 'هل سيارتك التالية؟' }, title: { en: 'Get the <span class="accent">gallery finish</span> on your car.', ar: 'امنح سيارتك <span class="accent">لمسة المعرض</span>.' }, text: { en: 'Choose a service and a time slot. It takes less than a minute.', ar: 'اختر الخدمة والموعد في أقل من دقيقة.' } })}
  </main>${footer()}`;
};

build.about = () => `${head('about')}${header('about')}
  <main id="main" tabindex="-1">${pageHero({ img: 'about-team', crumb: C.nav[4], eyebrow: { en: 'About us', ar: 'من نحن' },
    title: { en: 'Car care, <span class="accent">crafted</span> in Dubai.', ar: 'عناية بالسيارات <span class="accent">بإتقان</span> في دبي.' },
    lead: { en: 'We started Smart Car Wash with a simple belief: every car deserves the attention of a showroom, every single visit.', ar: 'أسسنا سمارت كار واش على قناعة بسيطة: كل سيارة تستحق عناية صالة العرض، في كل زيارة.' } })}
    <section class="section section--white" aria-labelledby="story-title">
      <div class="container grid-2">
        <div data-reveal>
          <img class="story-logo" src="${P}images/optimized/brand/logo-dark-480.png" srcset="${P}images/optimized/brand/logo-dark-480.png 1x, ${P}images/optimized/brand/logo-dark-960.png 2x" width="360" height="106" alt="Smart Car Wash" loading="lazy">
          <p class="eyebrow">${L === 'ar' ? 'قصتنا' : 'Our story'}</p>
          <h2 class="h2" id="story-title">${L === 'ar' ? 'شغف بالتفاصيل منذ اليوم الأول.' : 'Obsessed with detail from day one.'}</h2>
          <p>${L === 'ar' ? 'بدأنا بفريق صغير من عشاق السيارات أرادوا تقديم مستوى العناية الذي توفره استوديوهات التلميع الراقية، ولكن بسهولة الحجز السريع. اليوم يجمع استوديو دبي بين الفنيين المدرَّبين والمنتجات الفاخرة والتقنيات الحديثة.' : 'We began as a small team of car enthusiasts who wanted to offer the standard of a high-end detailing studio with the convenience of quick online booking. Today our Dubai studio brings together trained detailers, premium products and modern techniques.'}</p>
          <p>${L === 'ar' ? 'نؤمن بالشفافية في الأسعار، والصدق في النصيحة، وبأن النتيجة النهائية يجب أن تتحدث عن نفسها.' : 'We believe in transparent pricing, honest advice and results that speak for themselves.'}</p>
          <div class="stats">
            <div><b>2018</b><span>${L === 'ar' ? 'سنة التأسيس (خيالية)' : 'Founded (fictional)'}</span></div>
            <div><b>24</b><span>${L === 'ar' ? 'فنيًا مدرَّبًا' : 'Trained detailers'}</span></div>
            <div><b>6</b><span>${L === 'ar' ? 'خدمات مميزة' : 'Signature services'}</span></div>
            <div><b>4.9/5</b><span>${L === 'ar' ? 'متوسط التقييم (تجريبي)' : 'Average rating (demo)'}</span></div>
          </div>
        </div>
        <div class="media-frame" data-reveal="zoom" style="--d:1">${pic('about-team', { sizes: '(min-width: 900px) 600px, 100vw' })}</div>
      </div>
    </section>
    <section class="section section--grey" aria-labelledby="values-title">
      <div class="container">
        ${head2({ en: 'Our values', ar: 'قيمنا' }, { en: 'What every visit <span class="accent">stands for</span>.', ar: 'ما تمثله <span class="accent">كل زيارة</span>.' }, null, { center: true, id: 'values-title' })}
        <div class="tiles">${[
          { icon: 'award', en: 'Craft first', ar: 'الإتقان أولًا', d: { en: 'Trained detailers and proven techniques, never shortcuts.', ar: 'فنيون مدرَّبون وتقنيات مجرَّبة، دون أي اختصار.' } },
          { icon: 'shield', en: 'Safe for your paint', ar: 'آمن على الطلاء', d: { en: 'pH-neutral products and clean microfibre for every car.', ar: 'منتجات متعادلة الحموضة ومايكروفايبر نظيف لكل سيارة.' } },
          { icon: 'leaf', en: 'Water-wise', ar: 'ترشيد المياه', d: { en: 'Filtered, recycled rinse water and low-waste processes.', ar: 'مياه شطف مفلترة ومعاد تدويرها، وعمليات تقلل الهدر.' } },
          { icon: 'clock', en: 'On time', ar: 'في الموعد', d: { en: 'Your slot is your slot. We respect your schedule.', ar: 'موعدك محفوظ، ونحترم وقتك دائمًا.' } },
        ].map((v, i) => `<div class="tile" data-reveal style="--d:${i}"><span class="ico">${icon(v.icon)}</span><h3>${t(v)}</h3><p>${t(v.d)}</p></div>`).join('')}
        </div>
      </div>
    </section>
    <section class="section section--white" aria-labelledby="studio-title">
      <div class="container grid-2">
        <div class="media-frame" data-reveal="zoom">${pic('about-craft', { sizes: '(min-width: 900px) 600px, 100vw' })}<div class="media-badge"><b>1,200 m²</b><span>${L === 'ar' ? 'استوديو مكيّف (خيالي)' : 'Climate-controlled studio (fictional)'}</span></div></div>
        <div data-reveal style="--d:1">
          <p class="eyebrow">${L === 'ar' ? 'الاستوديو' : 'The studio'}</p>
          <h2 class="h2" id="studio-title">${L === 'ar' ? 'مصمم <span class="accent">للدقة</span>.' : 'Built for <span class="accent">precision</span>.'}</h2>
          <p class="lead">${L === 'ar' ? 'إضاءة تفصيلية تكشف كل عيب، ومساحات مكيّفة لمعالجة الطلاءات، ومحطة مياه مفلترة لنتائج خالية من البقع.' : 'Detailing lights that reveal every flaw, climate-controlled bays for curing coatings and a filtered water system for spot-free results.'}</p>
          <ul class="check-list">${(L === 'ar' ? ['إضاءة تفصيلية بدرجات ألوان متعددة', 'غرف معالجة بالأشعة تحت الحمراء', 'مياه منزوعة المعادن للشطف النهائي', 'صالة انتظار مريحة'] : ['Multi-temperature detailing lights', 'Infrared curing bays', 'De-ionised water for the final rinse', 'Comfortable customer lounge']).map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
        </div>
      </div>
    </section>
    <section class="section section--grey" aria-labelledby="team-title">
      <div class="container">
        ${head2({ en: 'The team', ar: 'الفريق' }, { en: 'The people behind <span class="accent">the shine</span>.', ar: 'الفريق وراء <span class="accent">اللمعان</span>.' }, { en: 'Fictional team members for this concept website.', ar: 'أعضاء فريق خياليون لهذا الموقع التجريبي.' }, { center: true, id: 'team-title' })}
        <div class="team">${C.team.map((m, i) => `<div class="member" data-reveal style="--d:${i}"><span class="avatar${m.silver ? ' avatar--silver' : ''}" aria-hidden="true">${t(m.i)}</span><h3>${t(m.n)}</h3><span class="role">${t(m.r)}</span><p>${t(m.d)}</p></div>`).join('')}</div>
      </div>
    </section>
    ${S.cta({ eyebrow: { en: 'Visit the studio', ar: 'زُر الاستوديو' }, title: { en: 'Experience <span class="accent">Smart Car Wash</span> for yourself.', ar: 'جرّب <span class="accent">سمارت كار واش</span> بنفسك.' }, text: { en: 'Book a wash, a full detail or a protection consultation today.', ar: 'احجز غسيلًا أو عناية كاملة أو استشارة حماية اليوم.' }, href2: 'services.html', btn2: { en: 'Explore services', ar: 'استكشف الخدمات' } })}
  </main>${footer()}`;

build.booking = () => `${head('booking')}${header('booking')}
  <main id="main" tabindex="-1">${pageHero({ img: 'banner-booking', crumb: C.nav[5], eyebrow: { en: 'Booking & contact', ar: 'الحجز والتواصل' },
    title: { en: 'Let us take care of <span class="accent">your car</span>.', ar: 'دعنا نعتني <span class="accent">بسيارتك</span>.' },
    lead: { en: 'Book an appointment in four quick steps, or send us a message and our team will get back to you.', ar: 'احجز موعدك في أربع خطوات سريعة، أو أرسل لنا رسالة وسيتواصل معك فريقنا.' } })}
    ${S.booking()}
    <section class="section section--grey" id="contact" aria-labelledby="contact-title">
      <div class="container booking">
        <div class="booking-aside" data-reveal>
          <p class="eyebrow">${L === 'ar' ? 'تواصل معنا' : 'Contact'}</p>
          <h2 id="contact-title">${L === 'ar' ? 'لديك سؤال؟ <span class="accent">راسلنا</span>.' : 'Have a question? <span class="accent">Write to us</span>.'}</h2>
          <p class="lead">${L === 'ar' ? 'نسعد بمساعدتك في اختيار الخدمة المناسبة أو الإجابة عن أي استفسار.' : 'We are happy to help you choose the right service or answer any question.'}</p>
          <ul class="info-list">
            <li><span class="ico">${icon('pin')}</span><span><b>${t(C.footer.area)}</b><span>${L === 'ar' ? 'نخدم جميع مناطق دبي' : 'Serving customers across Dubai'}</span></span></li>
            <li><span class="ico">${icon('clock')}</span><span><b>${L === 'ar' ? 'الرد خلال يوم عمل واحد' : 'Reply within one working day'}</b><span>${L === 'ar' ? 'ضمن ساعات العمل' : 'During opening hours'}</span></span></li>
            <li><span class="ico">${icon('message')}</span><span><b>${L === 'ar' ? 'نموذج التواصل فقط' : 'Contact form only'}</b><span>${L === 'ar' ? 'لا توجد أرقام هواتف أو عناوين بريد حقيقية في هذا الموقع التجريبي' : 'No real phone numbers or emails on this concept site'}</span></span></li>
          </ul>
          <ul class="hours">${C.footer.hoursList.map((h) => `<li><span>${t(h)}</span><b dir="ltr">${h.t}</b></li>`).join('')}</ul>
        </div>
        <div class="form-card" data-reveal style="--d:1">
          <form data-contact data-success="contact-success" novalidate aria-labelledby="contact-title">
            <div class="field-row">
              <div class="field">
                <label for="c-name">${L === 'ar' ? 'الاسم الكامل' : 'Full name'}</label>
                <input class="input" type="text" id="c-name" name="name" autocomplete="name" required aria-describedby="c-err-name">
                <p class="error-msg" id="c-err-name" role="alert"></p>
              </div>
              <div class="field">
                <label for="c-email">${L === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                <input class="input" type="email" id="c-email" name="email" autocomplete="email" dir="ltr" required aria-describedby="c-err-email">
                <p class="error-msg" id="c-err-email" role="alert"></p>
              </div>
            </div>
            <div class="field">
              <label for="c-topic">${L === 'ar' ? 'الموضوع' : 'Topic'}</label>
              <select class="input" id="c-topic" name="topic" required aria-describedby="c-err-topic">
                <option value="">${L === 'ar' ? 'اختر موضوعًا' : 'Choose a topic'}</option>
                <option>${L === 'ar' ? 'استفسار عن خدمة' : 'Service question'}</option>
                <option>${L === 'ar' ? 'طلب عرض سعر' : 'Quote request'}</option>
                <option>${L === 'ar' ? 'العضوية' : 'Membership'}</option>
                <option>${L === 'ar' ? 'أخرى' : 'Other'}</option>
              </select>
              <p class="error-msg" id="c-err-topic" role="alert"></p>
            </div>
            <div class="field">
              <label for="c-message">${L === 'ar' ? 'الرسالة' : 'Message'}</label>
              <textarea class="input" id="c-message" name="message" rows="5" required aria-describedby="c-err-message"></textarea>
              <p class="error-msg" id="c-err-message" role="alert"></p>
            </div>
            <p class="demo-note" style="margin-block-end:22px">${icon('info')}<span>${L === 'ar' ? 'نموذج تجريبي: لن تُرسل رسالتك.' : 'Demo form: your message will not be sent.'}</span></p>
            <button class="btn btn-primary" type="submit">${L === 'ar' ? 'إرسال الرسالة' : 'Send message'} ${arrow()}</button>
          </form>
          <div class="success" id="contact-success" tabindex="-1" role="status" hidden>
            <svg class="success-icon" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="45"/><path d="M30 52l13 13 27-29"/></svg>
            <h3>${L === 'ar' ? 'شكرًا لتواصلك معنا!' : 'Thanks for your message!'}</h3>
            <p>${L === 'ar' ? 'هذا عرض تجريبي، لذلك لم تُرسل رسالتك. في الموقع الحقيقي سيرد فريقنا خلال يوم عمل واحد.' : 'This is a demo, so your message was not sent. On a live site our team would reply within one working day.'}</p>
            <div class="btn-row" style="justify-content:center"><button class="btn btn-ghost" type="button" data-contact-again>${L === 'ar' ? 'إرسال رسالة أخرى' : 'Send another message'}</button></div>
          </div>
        </div>
      </div>
    </section>
  </main>${footer()}`;

build.notfound = () => `${head('notfound')}${header('notfound')}
  <main id="main" tabindex="-1">${pageHero({ img: 'gallery-8-exterior-finish', crumb: { en: '404', ar: '404' }, eyebrow: { en: 'Error 404', ar: 'خطأ 404' },
    title: { en: 'This page took a <span class="accent">wrong turn</span>.', ar: 'يبدو أن هذه الصفحة <span class="accent">ضلّت الطريق</span>.' },
    lead: { en: 'The page you are looking for does not exist. Head back home or book your next wash.', ar: 'الصفحة التي تبحث عنها غير موجودة. عد إلى الرئيسية أو احجز غسيلك القادم.' } })}
    ${S.cta({ eyebrow: { en: 'Keep exploring', ar: 'تابع التصفح' }, title: { en: 'Back to <span class="accent">the shine</span>.', ar: 'عودة إلى <span class="accent">اللمعان</span>.' }, text: { en: 'Find our services, packages and booking from the home page.', ar: 'تجد خدماتنا وباقاتنا والحجز في الصفحة الرئيسية.' }, href: 'index.html', btn: { en: 'Go to home', ar: 'الصفحة الرئيسية' }, href2: 'booking.html#book', btn2: C.ui.book })}
  </main>${footer()}`;

/* ---------------- Write ---------------- */
for (const lang of ['en', 'ar']) {
  L = lang; P = lang === 'ar' ? '../' : '';
  const dir = lang === 'ar' ? path.join(ROOT, 'ar') : ROOT;
  fs.mkdirSync(dir, { recursive: true });
  for (const id of Object.keys(build)) {
    if (id === 'notfound') continue; // skipped: a root 404 would be served from nested paths where relative links break
    let html = build[id]();
    if (id === 'notfound') html = html.replace(/href="(?!https?:|#|\/)([^"]+\.html[^"]*)"/g, 'href="./$1"');
    fs.writeFileSync(path.join(dir, PAGES[id].file), html.replace(/[ \t]+\n/g, '\n'));
    console.log('wrote', lang, PAGES[id].file, (html.length / 1024).toFixed(1) + 'KB');
  }
}

/* ---------------- Sitemap + robots ---------------- */
{
  const pages = Object.keys(PAGES).filter((id) => !PAGES[id].noindex).map((id) => (PAGES[id].file === 'index.html' ? '' : PAGES[id].file));
  const urls = pages.flatMap((pg) => ['', 'ar/'].map((pre) => `  <url>
    <loc>${SITE_URL}${pre}${pg}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${pg}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${SITE_URL}ar/${pg}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${pg}"/>
  </url>`));
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`);
  fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`);
  console.log('wrote sitemap.xml (' + urls.length + ' URLs) and robots.txt');
}
