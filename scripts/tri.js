/* Три секції — pinned stacking deck + section modal.
   Deck: progressive enhancement — base layout is a static readable stack; on ≥768 and without
   reduced-motion we add .tri--pinned and drive a deck where each slide rises (translateY) to cover
   the previous. The slide position is LERP-smoothed toward the scroll target each frame (floema-
   style glide), and each visualization parallaxes slightly against its slide (--p). Transform only.
   Modal: WIND/ROCK/SUN switcher + lead form, Esc / close / scrim to dismiss, focus trap, lock. */

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const easeOut = (t) => 1 - Math.pow(1 - t, 3);    // cubic ease-out for the intro zoom

/* ----------------------------- Heading entrance reveal ----------------------------- */
(function reveal() {
  const section = document.querySelector('[data-tri]');
  const head = section && section.querySelector('[data-tri-introhead]');
  if (!head) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;  // leave text visible
  section.classList.add('tri--anim');
  const io = new IntersectionObserver((es) => {
    if (es[0].isIntersecting) { section.classList.add('tri--revealed'); io.disconnect(); }
  }, { threshold: 0.3 });
  io.observe(head);
})();

/* --------------------- Intro zoom (FLIP) → smoothed stacking deck --------------------- */
(function deck() {
  const section = document.querySelector('[data-tri]');
  if (!section) return;
  const scene = section.querySelector('[data-tri-scene]');
  const pin = section.querySelector('[data-tri-pin]');
  const slides = Array.from(section.querySelectorAll('[data-tri-slide]'));
  const intro = section.querySelector('[data-tri-intro]');
  const hero = section.querySelector('[data-tri-hero]');     // full-bleed image = slide 0 (WIND)
  const slot = section.querySelector('[data-tri-slot]');     // centre reference box in the row
  const sides = Array.from(section.querySelectorAll('[data-tri-side]'));  // [left, right]
  if (slides.length < 2) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const wide = matchMedia('(min-width: 768px)');
  const N = slides.length;
  const EASE = 0.085;            // deck glide
  const INTRO = 0.34;            // first 34% of the scene is the intro
  const STAGE_A = 0.45;          // intro fraction: centre +20% while sides tuck under
  let current = 0, raf = 0, visible = false, enabled = false;
  // Reverse FLIP: the hero is laid out full-bleed; shrink{} is the transform that packs it into the
  // centre slot. We only ever scale DOWN from native → always sharp; identity = the real slide 0.
  let shrink = { s: 1, tx: 0, ty: 0 };

  function measure() {
    if (!hero || !slot) return;
    const vw = window.innerWidth, vh = window.innerHeight;
    // Match the thumbnails to the viewport aspect so the hero fits its slot exactly (no overflow
    // into the 16px gaps, equal heights with the side thumbs).
    const ar = `${vw} / ${vh}`;
    slot.style.aspectRatio = ar;
    sides.forEach((s) => { s.style.aspectRatio = ar; });
    const r = slot.getBoundingClientRect();
    const pinTop = pin.getBoundingClientRect().top;
    if (r.width < 1 || r.height < 1) return;
    const sx = r.left + r.width / 2, sy = (r.top - pinTop) + r.height / 2;
    // scale a full-bleed box down to cover the slot; translate its centre to the slot centre
    shrink = { s: Math.max(r.width / vw, r.height / vh), tx: sx - vw / 2, ty: sy - vh / 2 };
  }

  function sceneProgress() {
    const top = scene.getBoundingClientRect().top;
    const total = scene.offsetHeight - window.innerHeight;
    return total > 0 ? clamp(-top / total, 0, 1) : 0;
  }

  function applyIntro(pi) {
    // Hero: stage A = thumbnail grows +20% in the slot; stage B = thumbnail → full-bleed (identity).
    let s, tx, ty;
    if (pi <= STAGE_A) {
      s = shrink.s * (1 + 0.2 * (pi / STAGE_A));
      tx = shrink.tx; ty = shrink.ty;
    } else {
      const b = easeOut((pi - STAGE_A) / (1 - STAGE_A));
      const s0 = shrink.s * 1.2;
      s = s0 + (1 - s0) * b;
      tx = shrink.tx * (1 - b); ty = shrink.ty * (1 - b);
    }
    if (hero) hero.style.transform = `translate(${tx}px,${ty}px) scale(${s})`;
    // Sides slide inward UNDER the centre (not away); they stay through stage B.
    const a = easeOut(clamp(pi / STAGE_A, 0, 1));
    if (sides[0]) sides[0].style.transform = `translateX(${a * 92}%) scale(${1 - a * 0.14})`;
    if (sides[1]) sides[1].style.transform = `translateX(${-a * 92}%) scale(${1 - a * 0.14})`;
    // Heading stays; the growing hero covers it. At the very end the layer cross-fades to slide 0
    // (identical image underneath → no visible swap, only the slide's text fades in).
    const o = clamp((pi - 0.9) / 0.1, 0, 1);
    intro.style.opacity = `${1 - o}`;
    intro.style.visibility = o >= 1 ? 'hidden' : 'visible';
    intro.style.pointerEvents = pi > 0 ? 'none' : '';
  }

  function applyDeck(idx) {
    for (let i = 0; i < N; i++) {
      slides[i].style.setProperty('--ty', `${clamp((i - idx) * 100, 0, 100)}%`);
      slides[i].style.setProperty('--p', clamp(i - idx, -1, 1).toFixed(3));
    }
    const a = clamp(Math.round(idx), 0, N - 1);
    slides.forEach((s, i) => s.classList.toggle('is-active', i === a));
  }

  function loop() {
    const t = sceneProgress();
    current += (t - current) * EASE;
    if (Math.abs(t - current) < 1e-4) current = t;
    applyIntro(clamp(current / INTRO, 0, 1));
    applyDeck(clamp((current - INTRO) / (1 - INTRO), 0, 1) * (N - 1));
    raf = requestAnimationFrame(loop);
  }
  const start = () => { if (!raf) raf = requestAnimationFrame(loop); };
  const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };

  const io = new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    // Re-measure the slot when the section comes into view — by now fonts/images have settled, so
    // the hero lands exactly in its slot (a measurement taken at load can be stale → centre adrift).
    if (enabled && visible) { measure(); start(); } else stop();
  }, { rootMargin: '20% 0px 20% 0px' });
  addEventListener('load', () => { if (enabled) measure(); });

  function clearStyles() {
    slides.forEach((s) => { s.style.removeProperty('--ty'); s.style.removeProperty('--p'); });
    if (hero) hero.style.transform = '';
    if (slot) slot.style.aspectRatio = '';
    sides.forEach((it) => { it.style.transform = ''; it.style.opacity = ''; it.style.aspectRatio = ''; });
    intro.style.opacity = ''; intro.style.visibility = ''; intro.style.pointerEvents = '';
  }
  function enable() {
    if (enabled) return; enabled = true;
    section.classList.add('tri--pinned');
    measure();
    current = sceneProgress();
    io.observe(scene);
  }
  function disable() {
    if (!enabled) return; enabled = false;
    section.classList.remove('tri--pinned');
    io.unobserve(scene); stop();
    clearStyles();
  }

  addEventListener('resize', () => { if (enabled) measure(); }, { passive: true });
  const sync = () => { (wide.matches && !reduce.matches) ? enable() : disable(); };
  sync();
  wide.addEventListener('change', sync);
  reduce.addEventListener('change', sync);
})();

/* ----------------------------- Section modal ----------------------------- */
(function modal() {
  const modal = document.querySelector('[data-tri-modal]');
  if (!modal) return;

  // Copy per section — subtitle/description reuse the real on-page copy; infra/date are TODO.
  const DATA = {
    wind: { marker: 'Секція 1', name: 'WIND', sub: 'Світ тиші та відновлення',
      desc: 'WIND створений для соло-гостей, пар, підприємців і топменеджерів, які цінують приватність, якісний сон, wellness і можливість швидко повернути ресурс.' },
    rock: { marker: 'Секція 2', name: 'ROCK', sub: 'Простір рішень і масштабування',
      desc: 'ROCK створений для власників бізнесу, C-level керівників, інвесторів, корпоративних команд, бізнес-спільнот та організаторів подій.' },
    sun: { marker: 'Секція 3', name: 'SUN', sub: 'Світ дому та родинного тяжіння',
      desc: 'SUN створений для сімей із дітьми, великих родин та multi-generation подорожей, де кожне покоління отримує власний сценарій відпочинку.' },
  };
  // TODO: реальні дані по кожній секції.
  const INFRA = 'TODO: перелік ключової інфраструктури секції';
  const DATE = 'TODO: дата введення в експлуатацію (орієнтовно Q4 2028)';

  const dialog = modal.querySelector('.tri-modal__dialog');
  const tabs = Array.from(modal.querySelectorAll('[data-tri-tab]'));
  const el = (sel) => modal.querySelector(sel);
  const page = document.getElementById('top');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let lastFocus = null, closeTimer = 0, current = 'wind';

  function fill(world) {
    const d = DATA[world]; if (!d) return;
    current = world;
    el('[data-tri-info-marker]').textContent = d.marker;
    el('[data-tri-info-name]').textContent = d.name;
    el('[data-tri-info-sub]').textContent = d.sub;
    el('[data-tri-info-desc]').textContent = d.desc;
    el('[data-tri-info-infra]').textContent = INFRA;
    el('[data-tri-info-date]').textContent = DATE;
    el('[data-tri-form-section]').textContent = d.name;
    el('[data-tri-form-field]').value = world;
    tabs.forEach((t) => {
      const sel = t.dataset.triTab === world;
      t.classList.toggle('is-active', sel);
      t.setAttribute('aria-selected', sel ? 'true' : 'false');
    });
  }

  const focusables = () => Array.from(modal.querySelectorAll(
    'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'
  )).filter((n) => n.offsetParent !== null);

  function open(world) {
    clearTimeout(closeTimer);
    lastFocus = document.activeElement;
    fill(world);
    modal.hidden = false;
    void modal.offsetWidth;
    modal.classList.add('is-open');
    document.documentElement.classList.add('is-menu-open');  // reuse the scroll-lock class
    if (page) page.inert = true;
    (focusables()[0] || dialog).focus();
  }
  function close() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    document.documentElement.classList.remove('is-menu-open');
    if (page) page.inert = false;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    const done = () => { modal.hidden = true; };
    clearTimeout(closeTimer);
    reduce.matches ? done() : (closeTimer = setTimeout(done, 300));
  }

  for (const btn of document.querySelectorAll('[data-tri-open]')) {
    btn.addEventListener('click', () => open(btn.dataset.triOpen));
  }
  for (const t of tabs) t.addEventListener('click', () => fill(t.dataset.triTab));
  for (const c of modal.querySelectorAll('[data-tri-modal-close]')) c.addEventListener('click', close);

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables(); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // Placeholder submit handling — no backend yet.
  const form = modal.querySelector('.tri-modal__form');
  if (form) form.addEventListener('submit', (e) => { e.preventDefault(); /* TODO: надіслати лід (section=current) */ });
})();
