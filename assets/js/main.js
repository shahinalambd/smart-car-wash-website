/* Smart Car Wash — concept website for a fictional brand.
   Vanilla JS, no dependencies. Every module is guarded so pages only run what they contain. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var LANG = (doc.lang || 'en').slice(0, 2) === 'ar' ? 'ar' : 'en';
  var RTL = doc.dir === 'rtl';
  var DIR = RTL ? -1 : 1;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var T = {
    en: {
      pause: 'Pause slideshow', play: 'Play slideshow',
      choose: 'Please choose an option.', name: 'Please enter your full name.',
      phone: 'Enter a UAE mobile number, e.g. 050 000 0000.', email: 'Enter a valid email address.',
      date: 'Choose a date from today onwards.', dateFar: 'Bookings open up to 60 days ahead.',
      time: 'Choose an available time slot.', message: 'Please write a short message (at least 10 characters).',
      showing: 'Showing {n} images', viewer: 'Image viewer', close: 'Close', prev: 'Previous image', next: 'Next image',
      imageOf: '{n} / {t}', review: 'Show review {n}', before: '{p}% before',
      aed: 'AED', month: '/ month', optional: 'Not provided'
    },
    ar: {
      pause: 'إيقاف العرض', play: 'تشغيل العرض',
      choose: 'يرجى اختيار أحد الخيارات.', name: 'يرجى إدخال الاسم الكامل.',
      phone: 'أدخل رقم جوال إماراتي، مثل 050 000 0000.', email: 'أدخل بريدًا إلكترونيًا صحيحًا.',
      date: 'اختر تاريخًا من اليوم فصاعدًا.', dateFar: 'يمكن الحجز حتى 60 يومًا مقدمًا.',
      time: 'اختر موعدًا متاحًا.', message: 'يرجى كتابة رسالة قصيرة (10 أحرف على الأقل).',
      showing: 'عرض {n} صور', viewer: 'عارض الصور', close: 'إغلاق', prev: 'الصورة السابقة', next: 'الصورة التالية',
      imageOf: '{n} / {t}', review: 'عرض التقييم {n}', before: '{p}% قبل',
      aed: 'درهم', month: '/ شهريًا', optional: 'غير مُدخل'
    }
  }[LANG];

  var LOCALE = LANG === 'ar' ? 'ar-AE-u-nu-latn' : 'en-AE';
  var fmt = function (s, o) { return s.replace(/\{(\w+)\}/g, function (_, k) { return o[k]; }); };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var num = function (n, d) { return new Intl.NumberFormat(LOCALE, { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }).format(n); };

  doc.classList.remove('no-js');
  doc.classList.add('js');

  /* ---------- Header: solid on scroll, back-to-top ---------- */
  var header = $('.site-header');
  var toTop = $('.to-top');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-solid', y > 30 || document.body.classList.contains('menu-open'));
    if (toTop) toTop.classList.toggle('is-visible', y > 900);
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    var target = $('#main');
    if (target) target.focus({ preventScroll: true });
  });

  /* ---------- Mobile menu ---------- */
  var toggle = $('.menu-toggle');
  var menu = $('#mobile-menu');
  if (toggle && menu) {
    var mainEls = $$('main, .site-footer');
    var setMenu = function (open, restoreFocus) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('no-scroll', open);
      document.body.classList.toggle('menu-open', open);
      mainEls.forEach(function (el) { el.inert = open; });
      if (open) { menu.inert = false; var first = $('a', menu); if (first) setTimeout(function () { first.focus(); }, 60); }
      else { menu.inert = true; if (restoreFocus) toggle.focus(); }
      onScroll();
    };
    menu.inert = true;
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true', true); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false, false); });
    document.addEventListener('keydown', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (e.key === 'Escape') { setMenu(false, true); return; }
      if (e.key !== 'Tab') return;
      var items = [toggle].concat($$('a, button', menu));
      var i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    });
    window.matchMedia('(min-width: 1081px)').addEventListener('change', function (m) { if (m.matches) setMenu(false, false); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Hero slider ---------- */
  var hero = $('[data-hero]');
  if (hero) {
    var slides = $$('.hero-slide', hero);
    var dots = $$('.hero-dot', hero);
    var pauseBtn = $('.hero-pause', hero);
    var current = 0;
    var isStatic = reduceMotion.matches;
    var loaded = document.readyState === 'complete';
    // swap in deferred image sources (see the build note on hero slides 2 and 3)
    var wake = function (s) {
      $$('[data-srcset]', s).forEach(function (el) { el.srcset = el.dataset.srcset; el.removeAttribute('data-srcset'); });
      $$('img[data-src]', s).forEach(function (img) { img.src = img.dataset.src; img.removeAttribute('data-src'); });
    };
    if (!loaded) window.addEventListener('load', function () {
      loaded = true;
      wake(slides[(current + 1) % slides.length]);
    });

    var go = function (i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        var on = k === current;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', String(!on));
        s.inert = !on;
        // load the active slide and the one after it, so the next fade never shows a blank frame
        if (on || (loaded && k === (current + 1) % slides.length)) wake(s);
      });
      dots.forEach(function (d, k) {
        if (k === current) {
          d.removeAttribute('aria-current');
          void d.offsetWidth; // restart the progress animation
          d.setAttribute('aria-current', 'true');
        } else d.setAttribute('aria-current', 'false');
      });
    };
    var setStatic = function (on) { isStatic = on; hero.classList.toggle('is-static', on); };
    setStatic(isStatic);
    reduceMotion.addEventListener('change', function (m) { setStatic(m.matches); });

    dots.forEach(function (d, k) {
      d.addEventListener('click', function () { go(k); });
      $('.bar', d).addEventListener('animationend', function () {
        if (!isStatic && k === current) go(current + 1);
      });
    });
    $$('[data-hero-prev]', hero).forEach(function (b) { b.addEventListener('click', function () { go(current - 1); }); });
    $$('[data-hero-next]', hero).forEach(function (b) { b.addEventListener('click', function () { go(current + 1); }); });

    if (pauseBtn) pauseBtn.addEventListener('click', function () {
      var paused = hero.classList.toggle('is-paused');
      pauseBtn.setAttribute('aria-label', paused ? T.play : T.pause);
      pauseBtn.setAttribute('aria-pressed', String(paused));
    });
    var hold = function (on) { hero.classList.toggle('is-hold', on); };
    hero.addEventListener('mouseenter', function () { hold(true); });
    hero.addEventListener('mouseleave', function () { hold(false); });
    hero.addEventListener('focusin', function () { hold(true); });
    hero.addEventListener('focusout', function (e) { if (!hero.contains(e.relatedTarget)) hold(false); });
    document.addEventListener('visibilitychange', function () { hero.classList.toggle('is-hidden-tab', document.hidden); hold(document.hidden); });

    // swipe
    var sx = null, sy = null;
    hero.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') { sx = e.clientX; sy = e.clientY; } });
    hero.addEventListener('pointerup', function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1) * DIR);
      sx = null;
    });
    hero.addEventListener('keydown', function (e) {
      if (!e.target.closest('.hero-controls')) return;
      if (e.key === 'ArrowRight') go(current + DIR);
      if (e.key === 'ArrowLeft') go(current - DIR);
    });

    go(0);
  }

  /* ---------- Counters ---------- */
  var counters = $$('[data-count]');
  if (counters.length) {
    var runCounter = function (el) {
      var end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.decimals || '0', 10);
      var suffix = el.dataset.suffix || '', out = $('.num-val', el) || el;
      if (reduceMotion.matches) { out.textContent = num(end, dec) + suffix; return; }
      var t0 = null, dur = 1800;
      var step = function (t) {
        if (!t0) t0 = t;
        var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        out.textContent = num(end * e, dec) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); } });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { cio.observe(c); });
    } else counters.forEach(runCounter);
  }

  /* ---------- Before / after ---------- */
  $$('.ba').forEach(function (ba) {
    var input = $('input[type="range"]', ba);
    var set = function (p) {
      p = Math.max(0, Math.min(100, p));
      ba.style.setProperty('--pos', p + '%');
      input.value = Math.round(p);
      input.setAttribute('aria-valuetext', fmt(T.before, { p: Math.round(p) }));
    };
    var fromPointer = function (e) {
      var r = ba.getBoundingClientRect();
      var x = RTL ? r.right - e.clientX : e.clientX - r.left;
      set((x / r.width) * 100);
    };
    var dragging = false, startX = 0, startY = 0, decided = false;
    ba.addEventListener('pointerdown', function (e) {
      dragging = true; decided = e.pointerType === 'mouse'; startX = e.clientX; startY = e.clientY;
      if (decided) { ba.setPointerCapture(e.pointerId); ba.classList.add('is-dragging'); fromPointer(e); }
    });
    ba.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      if (!decided) {
        var dx = Math.abs(e.clientX - startX), dy = Math.abs(e.clientY - startY);
        if (dx < 6 && dy < 6) return;
        if (dy > dx) { dragging = false; return; } // let the page scroll
        decided = true; ba.setPointerCapture(e.pointerId); ba.classList.add('is-dragging');
      }
      fromPointer(e);
    });
    var end = function (e) {
      if (dragging && !decided && e.type === 'pointerup') fromPointer(e); // tap to jump
      dragging = false; ba.classList.remove('is-dragging');
    };
    ba.addEventListener('pointerup', end);
    ba.addEventListener('pointercancel', end);
    input.addEventListener('keydown', function (e) {
      var v = parseFloat(input.value), step = e.shiftKey ? 10 : 2, map = {
        ArrowRight: step * DIR, ArrowLeft: -step * DIR, ArrowUp: step, ArrowDown: -step, PageUp: 10, PageDown: -10
      };
      if (e.key in map) { e.preventDefault(); set(v + map[e.key]); }
      else if (e.key === 'Home') { e.preventDefault(); set(0); }
      else if (e.key === 'End') { e.preventDefault(); set(100); }
    });
    input.addEventListener('input', function () { set(parseFloat(input.value)); });
    set(parseFloat(input.value || 50));
  });

  /* ---------- Tabs (before/after) ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var k = { ArrowRight: DIR, ArrowLeft: -DIR }[e.key];
        if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true); }
        if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
        if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
  });

  /* ---------- Pricing toggle ---------- */
  $$('[data-price-toggle]').forEach(function (tg) {
    var scope = document.getElementById(tg.dataset.priceToggle) || document;
    var btns = $$('button[data-vehicle]', tg);
    var apply = function (v, animate) {
      tg.dataset.active = v;
      btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.vehicle === v)); });
      $$('[data-sedan]', scope).forEach(function (el) {
        var val = el.dataset[v];
        if (el.classList.contains('amount')) {
          el.textContent = num(parseFloat(val));
          if (animate && !reduceMotion.matches) { el.classList.remove('is-changing'); void el.offsetWidth; el.classList.add('is-changing'); }
        } else el.textContent = val;
      });
      $$('a[data-plan-link]', scope).forEach(function (a) { a.href = a.dataset.planLink + '&vehicle=' + v + '#book'; });
    };
    btns.forEach(function (b) { b.addEventListener('click', function () { apply(b.dataset.vehicle, true); }); });
    apply(tg.dataset.active || 'sedan', false);
  });

  /* ---------- FAQ accordion ---------- */
  $$('.faq-item').forEach(function (item) {
    var btn = $('button', item), panel = $('.faq-a', item);
    var set = function (open) {
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      panel.inert = !open;
    };
    set(item.classList.contains('is-open'));
    btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
  });

  /* ---------- Testimonials ---------- */
  $$('[data-testimonials]').forEach(function (wrap) {
    var track = $('.t-track', wrap), cards = $$('.t-card', track), dotsWrap = $('.t-dots', wrap);
    var idx = 0;
    var dots = cards.map(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', fmt(T.review, { n: i + 1 }));
      b.addEventListener('click', function () { show(i); });
      dotsWrap.appendChild(b);
      return b;
    });
    var mark = function (i) { idx = i; dots.forEach(function (d, k) { d.setAttribute('aria-current', String(k === i)); }); };
    var show = function (i) {
      i = (i + cards.length) % cards.length;
      var tr = track.getBoundingClientRect(), cr = cards[i].getBoundingClientRect();
      var delta = RTL ? cr.right - tr.right : cr.left - tr.left;
      track.scrollBy({ left: delta, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      mark(i);
    };
    $('[data-t-prev]', wrap).addEventListener('click', function () { show(idx - 1); });
    $('[data-t-next]', wrap).addEventListener('click', function () { show(idx + 1); });
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting && en.intersectionRatio > 0.6) mark(cards.indexOf(en.target)); });
    }, { root: track, threshold: [0.6] });
    cards.forEach(function (c) { tio.observe(c); });
    mark(0);
  });

  /* ---------- Lightbox ---------- */
  var lbItems = $$('[data-lightbox]');
  if (lbItems.length && typeof HTMLDialogElement === 'function') {
    var dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.setAttribute('aria-label', T.viewer);
    dlg.innerHTML =
      '<div class="lb-top"><span class="lb-count" aria-live="polite"></span>' +
      '<button type="button" class="icon-btn lb-close" aria-label="' + T.close + '"><svg class="icon" aria-hidden="true"><use href="' + window.SCW_ICONS + '#i-close"/></svg></button></div>' +
      '<div class="lb-stage"><picture><source type="image/webp"><img alt="" decoding="async"></picture>' +
      '<button type="button" class="icon-btn lb-prev" aria-label="' + T.prev + '"><svg class="icon flip" aria-hidden="true"><use href="' + window.SCW_ICONS + '#i-chev-l"/></svg></button>' +
      '<button type="button" class="icon-btn lb-next" aria-label="' + T.next + '"><svg class="icon flip" aria-hidden="true"><use href="' + window.SCW_ICONS + '#i-chev-r"/></svg></button></div>' +
      '<p class="lb-caption"></p>';
    document.body.appendChild(dlg);
    var lbImg = $('img', dlg), lbSrc = $('source', dlg), lbCap = $('.lb-caption', dlg), lbCount = $('.lb-count', dlg);
    var group = [], gi = 0, opener = null;
    var render = function () {
      var it = group[gi];
      lbImg.classList.add('is-loading');
      lbSrc.srcset = it.dataset.full;
      lbImg.src = it.dataset.fullJpg;
      lbImg.alt = it.dataset.alt || '';
      lbCap.textContent = it.dataset.caption || '';
      lbCount.textContent = fmt(T.imageOf, { n: num(gi + 1), t: num(group.length) });
    };
    lbImg.addEventListener('load', function () {
      lbImg.classList.remove('is-loading', 'is-in'); void lbImg.offsetWidth; lbImg.classList.add('is-in');
    });
    var move = function (d) { gi = (gi + d + group.length) % group.length; render(); };
    lbItems.forEach(function (it) {
      it.addEventListener('click', function () {
        group = lbItems.filter(function (x) { return x.dataset.lightbox === it.dataset.lightbox && !x.hidden; });
        gi = group.indexOf(it); opener = it;
        render();
        dlg.showModal();
        document.body.classList.add('no-scroll');
      });
    });
    $('.lb-close', dlg).addEventListener('click', function () { dlg.close(); });
    $('.lb-prev', dlg).addEventListener('click', function () { move(-1); });
    $('.lb-next', dlg).addEventListener('click', function () { move(1); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.classList.contains('lb-stage')) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') move(DIR);
      if (e.key === 'ArrowLeft') move(-DIR);
    });
    dlg.addEventListener('close', function () { document.body.classList.remove('no-scroll'); if (opener) opener.focus(); });
    var lx = null;
    dlg.addEventListener('pointerdown', function (e) { lx = e.clientX; });
    dlg.addEventListener('pointerup', function (e) {
      if (lx === null) return; var dx = e.clientX - lx; lx = null;
      if (Math.abs(dx) > 50) move((dx < 0 ? 1 : -1) * DIR);
    });
  }

  /* ---------- Gallery filter ---------- */
  var filterBar = $('[data-filter-bar]');
  if (filterBar) {
    var gItems = $$('[data-cat]');
    var status = $('.filter-status');
    var fBtns = $$('[data-filter]', filterBar);
    fBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.dataset.filter;
        fBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        var shown = 0;
        gItems.forEach(function (it) {
          var match = f === 'all' || it.dataset.cat === f;
          if (match) shown++;
          if (reduceMotion.matches) { it.hidden = !match; return; }
          if (match && it.hidden) {
            it.hidden = false; it.classList.add('is-hiding');
            requestAnimationFrame(function () { requestAnimationFrame(function () { it.classList.remove('is-hiding'); }); });
          } else if (!match && !it.hidden) {
            it.classList.add('is-hiding');
            setTimeout(function () { if (it.classList.contains('is-hiding')) it.hidden = true; }, 380);
          }
        });
        if (status) status.textContent = fmt(T.showing, { n: num(shown) });
      });
    });
  }

  /* ---------- Section chip nav (services page) ---------- */
  var chips = $$('.chip-nav a');
  if (chips.length && 'IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        chips.forEach(function (c) {
          var on = c.getAttribute('href') === '#' + en.target.id;
          c.classList.toggle('is-active', on);
          if (on) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    chips.forEach(function (c) { var t = document.querySelector(c.getAttribute('href')); if (t) sio.observe(t); });
  }

  /* ---------- Form helpers ---------- */
  var setError = function (field, msg) {
    var id = field.getAttribute('aria-describedby') || field.dataset.errorId;
    var box = id ? document.getElementById(id.split(' ')[0]) : null;
    if (field.matches('input, textarea, select, [role="radiogroup"]')) field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (box) box.textContent = msg || '';
    return !msg;
  };
  var phoneOk = function (v) { return /^(?:\+?971|00971|0)?5\d{8}$/.test(v.replace(/[\s()-]/g, '')); };
  var emailOk = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); };
  var isoDate = function (d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  var makeRef = function () { var s = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', r = ''; for (var i = 0; i < 6; i++) r += s[Math.floor(Math.random() * s.length)]; return 'SCW-' + r; };

  /* ---------- Booking wizard ---------- */
  $$('[data-booking]').forEach(function (form) {
    var steps = $$('.form-step', form);
    var indicators = $$('.stepper li', form);
    var back = $('.btn-back', form), next = $('.btn-next', form), submit = $('.btn-submit', form);
    var success = document.getElementById(form.dataset.success);
    var live = $('.step-live', form);
    var at = 0;
    var dateInput = $('input[name="date"]', form);
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var maxDay = new Date(today); maxDay.setDate(maxDay.getDate() + 60);
    if (dateInput) { dateInput.min = isoDate(today); dateInput.max = isoDate(maxDay); }

    // preselect from the URL (?service=…&vehicle=…)
    var params = new URLSearchParams(location.search);
    ['service', 'vehicle'].forEach(function (k) {
      var v = params.get(k);
      if (!v) return;
      var r = $('input[name="' + k + '"][value="' + CSS.escape(v) + '"]', form);
      if (r) r.checked = true;
    });

    var radioVal = function (name) { var r = $('input[name="' + name + '"]:checked', form); return r ? r : null; };

    var updateSlots = function () {
      if (!dateInput) return;
      var isToday = dateInput.value === isoDate(new Date());
      var nowMin = new Date().getHours() * 60 + new Date().getMinutes() + 60;
      $$('input[name="time"]', form).forEach(function (r) {
        var p = r.value.split(':'), m = +p[0] * 60 + +p[1];
        var booked = r.dataset.booked === 'true';
        r.disabled = booked || (isToday && m < nowMin);
        if (r.disabled && r.checked) r.checked = false;
      });
    };
    if (dateInput) dateInput.addEventListener('change', function () { updateSlots(); validateStep(2, false); });
    updateSlots();

    var validateStep = function (i, show) {
      var ok = true, fs = steps[i];
      var check = function (el, msg) { if (show || el.getAttribute('aria-invalid') === 'true') setError(el, msg); if (msg) ok = false; };
      $$('[data-group]', fs).forEach(function (g) {
        var name = g.dataset.group;
        check(g, $('input[name="' + name + '"]:checked', fs) ? '' : (name === 'time' ? T.time : T.choose));
      });
      $$('input:not([type="radio"]):not([type="checkbox"]), textarea', fs).forEach(function (el) {
        var v = el.value.trim(), msg = '';
        if (el.name === 'name' && v.length < 2) msg = T.name;
        if (el.name === 'phone' && !phoneOk(v)) msg = T.phone;
        if (el.name === 'email' && v && !emailOk(v)) msg = T.email;
        if (el.name === 'date') {
          if (!v || v < el.min) msg = T.date; else if (v > el.max) msg = T.dateFar;
        }
        check(el, msg);
      });
      return ok;
    };

    var summary = function () {
      var dl = $('.summary', form);
      if (!dl) return;
      var svc = radioVal('service'), veh = radioVal('vehicle'), time = radioVal('time');
      var v = veh ? veh.value : 'sedan';
      var price = svc ? parseFloat(svc.dataset[v === 'suv' ? 'priceSuv' : 'priceSedan']) : 0;
      var dateTxt = dateInput && dateInput.value ? new Intl.DateTimeFormat(LANG === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(dateInput.value + 'T12:00:00')) : '';
      var val = function (k, t) { var dd = $('[data-sum="' + k + '"]', dl); if (dd) dd.textContent = t; };
      val('service', svc ? svc.dataset.label : '');
      val('vehicle', veh ? veh.dataset.label : '');
      val('date', dateTxt);
      val('time', time ? time.value : '');
      val('price', price ? (LANG === 'ar' ? num(price) + ' ' + T.aed : T.aed + ' ' + num(price)) + (svc.dataset.per === 'month' ? ' ' + T.month : '') : '');
    };

    var show = function (i, focus) {
      at = i;
      steps.forEach(function (s, k) {
        s.hidden = k !== i;
        if (k === i && !reduceMotion.matches) { s.classList.remove('is-entering'); void s.offsetWidth; s.classList.add('is-entering'); }
      });
      indicators.forEach(function (li, k) {
        li.classList.toggle('is-done', k < i);
        if (k === i) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      });
      back.hidden = i === 0;
      next.hidden = i === steps.length - 1;
      submit.hidden = i !== steps.length - 1;
      if (i === steps.length - 1) summary();
      if (live) live.textContent = indicators[i] ? indicators[i].textContent.trim() : '';
      if (focus) { steps[i].setAttribute('tabindex', '-1'); steps[i].focus({ preventScroll: true }); form.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' }); }
    };

    var firstInvalid = function () { var el = $('[aria-invalid="true"]', steps[at]); if (el) { var f = el.matches('[data-group]') ? $('input', el) : el; f.focus(); } };

    next.addEventListener('click', function () {
      if (validateStep(at, true)) show(at + 1, true); else firstInvalid();
    });
    back.addEventListener('click', function () { show(at - 1, true); });
    form.addEventListener('change', function (e) {
      if (e.target.type === 'radio') { var g = e.target.closest('[data-group]'); if (g) setError(g, ''); }
    });
    form.addEventListener('input', function (e) { if (e.target.getAttribute('aria-invalid') === 'true') validateStep(at, false); });
    form.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target.tagName === 'INPUT' && at < steps.length - 1) { e.preventDefault(); next.click(); }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      for (var i = 0; i < steps.length; i++) {
        if (!validateStep(i, true)) { show(i, true); firstInvalid(); return; }
      }
      // Demo only: nothing is sent or stored.
      form.hidden = true;
      if (success) {
        var name = $('input[name="name"]', form).value.trim().split(/\s+/)[0];
        $$('[data-success-name]', success).forEach(function (n) { n.textContent = name; });
        $$('[data-success-ref]', success).forEach(function (n) { n.textContent = makeRef(); });
        success.hidden = false;
        success.focus();
      }
    });
    if (success) {
      var again = $('[data-book-again]', success);
      if (again) again.addEventListener('click', function () {
        form.reset(); updateSlots();
        $$('[aria-invalid]', form).forEach(function (el) { setError(el, ''); });
        success.hidden = true; form.hidden = false; show(0, true);
      });
    }
    show(0, false);
  });

  /* ---------- Contact form ---------- */
  $$('[data-contact]').forEach(function (form) {
    var success = document.getElementById(form.dataset.success);
    var validate = function (show) {
      var ok = true;
      $$('input, textarea, select', form).forEach(function (el) {
        var v = el.value.trim(), msg = '';
        if (el.name === 'name' && v.length < 2) msg = T.name;
        if (el.name === 'email' && !emailOk(v)) msg = T.email;
        if (el.name === 'topic' && !v) msg = T.choose;
        if (el.name === 'message' && v.length < 10) msg = T.message;
        if (show || el.getAttribute('aria-invalid') === 'true') setError(el, msg);
        if (msg) ok = false;
      });
      return ok;
    };
    form.addEventListener('input', function () { validate(false); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(true)) { var bad = $('[aria-invalid="true"]', form); if (bad) bad.focus(); return; }
      form.hidden = true;
      if (success) { success.hidden = false; success.focus(); }
    });
    if (success) {
      var again = $('[data-contact-again]', success);
      if (again) again.addEventListener('click', function () { form.reset(); success.hidden = true; form.hidden = false; $('input', form).focus(); });
    }
  });

  /* ---------- Misc ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
