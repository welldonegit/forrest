/* Три секції — soft.html port of the original pinned stacking deck (see scripts/tri.js).
   SAME structure + animation as the main page: heading mask-reveal, intro FLIP-zoom of the centre
   thumbnail into slide 0, then a scroll-driven deck where each slide rises to cover the previous.
   Differences vs the original: no section modal (soft has none), and the FLIP hero keeps a constant
   on-screen corner radius so it reads as a rounded soft card throughout. Transform/clip only. */

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutQuint = (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2);
const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;   // gentle, continuous creep
const ROUND = 40;   // on-screen corner radius (px) kept constant through the FLIP

/* ----------------------------- Heading entrance reveal ----------------------------- */
(function reveal() {
  const section = document.querySelector('[data-tri]');
  const head = section && section.querySelector('[data-tri-introhead]');
  if (!head) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
  const hero = section.querySelector('[data-tri-hero]');
  const slot = section.querySelector('[data-tri-slot]');
  const sides = Array.from(section.querySelectorAll('[data-tri-side]'));
  if (slides.length < 2) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const N = slides.length;
  const EASE = 0.055;            // more trailing glide → smoother, liquid lag
  const INTRO = 0.34;
  const STAGE_A = 0.45;
  const HOLD_PX = 200;
  const DWELL = 0.09, TRANS = 0.44;   // most of the scroll is the slow creep upward
  let current = 0, raf = 0, visible = false, enabled = false;
  let shrink = { s: 1, tx: 0, ty: 0 };
  let mobileIntro = false, clipBandY = 0;

  function measure() {
    if (!hero || !slot) return;
    // The FLIP hero fills the PIN (inset:0), which on the soft page is 12px-inset (100vh − 24px, not
    // the full viewport). Reference everything to the pin's own box so the shrunk thumbnail lands
    // exactly in its slot — otherwise the centre card sits ~12px above the side thumbnails.
    const pr = pin.getBoundingClientRect();
    const W = pr.width, H = pr.height;
    mobileIntro = window.innerWidth < 768;
    const ar = mobileIntro ? '16 / 9' : `${W} / ${H}`;
    slot.style.aspectRatio = ar;
    sides.forEach((s) => { s.style.aspectRatio = ar; });
    clipBandY = mobileIntro ? Math.max(0, (H - W * 9 / 16) / 2) : 0;
    const r = slot.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    const sx = (r.left - pr.left) + r.width / 2, sy = (r.top - pr.top) + r.height / 2;
    shrink = { s: Math.max(r.width / W, r.height / H), tx: sx - W / 2, ty: sy - H / 2 };
  }

  function sceneProgress() {
    const top = scene.getBoundingClientRect().top;
    const total = scene.offsetHeight - window.innerHeight;
    return total > 0 ? clamp(-top / total, 0, 1) : 0;
  }

  function applyIntro(pi) {
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
    if (hero) {
      hero.style.transform = `translate(${tx}px,${ty}px) scale(${s})`;
      // Keep a constant ~ROUND px on-screen radius (radius scales with the element).
      hero.style.borderRadius = `${(ROUND / Math.max(s, 0.0001)).toFixed(1)}px`;
      if (mobileIntro && clipBandY > 0) {
        const openB = pi <= STAGE_A ? 0 : easeOut((pi - STAGE_A) / (1 - STAGE_A));
        hero.style.clipPath = `inset(${(clipBandY * (1 - openB)).toFixed(2)}px 0 round ${(ROUND / Math.max(s, 0.0001)).toFixed(1)}px)`;
      } else {
        hero.style.clipPath = '';
      }
    }
    const a = easeOut(clamp(pi / STAGE_A, 0, 1));
    if (sides[0]) sides[0].style.transform = `translateX(${a * 92}%) scale(${1 - a * 0.14})`;
    if (sides[1]) sides[1].style.transform = `translateX(${-a * 92}%) scale(${1 - a * 0.14})`;
    const o = clamp((pi - 0.9) / 0.1, 0, 1);
    intro.style.opacity = `${1 - o}`;
    intro.style.visibility = o >= 1 ? 'hidden' : 'visible';
    intro.style.pointerEvents = pi > 0 ? 'none' : '';
  }

  function deckIdx(u) {
    const segs = N - 1;
    const total = (segs + 1) * DWELL + segs * TRANS;
    const d = DWELL / total, t = TRANS / total;
    let x = u;
    for (let i = 0; i < segs; i++) {
      if (x < d) return i;
      x -= d;
      if (x < t) return i + easeInOutSine(x / t);
      x -= t;
    }
    return segs;
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
    const pi = clamp(current / INTRO, 0, 1);
    const introPx = INTRO * (scene.offsetHeight - window.innerHeight);
    const delay = introPx > 0 ? clamp(HOLD_PX / introPx, 0, 0.6) : 0;
    applyIntro(clamp((pi - delay) / (1 - delay), 0, 1));
    applyDeck(deckIdx(clamp((current - INTRO) / (1 - INTRO), 0, 1)));
    raf = requestAnimationFrame(loop);
  }
  const start = () => { if (!raf) raf = requestAnimationFrame(loop); };
  const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };

  const io = new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    if (enabled && visible) { measure(); start(); } else stop();
  }, { rootMargin: '20% 0px 20% 0px' });
  addEventListener('load', () => { if (enabled) measure(); });

  function clearStyles() {
    slides.forEach((s) => { s.style.removeProperty('--ty'); s.style.removeProperty('--p'); });
    if (hero) { hero.style.transform = ''; hero.style.clipPath = ''; hero.style.borderRadius = ''; }
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
  const sync = () => { reduce.matches ? disable() : enable(); };
  sync();
  reduce.addEventListener('change', sync);
})();

/* ----------------------------- Section modal (ported from scripts/tri.js) ----------------------------- */
(function modal() {
  const modal = document.querySelector('[data-tri-modal]');
  if (!modal) return;

  const DATA = {
    wind: {
      name: 'WIND', sub: 'Світ тиші та відновлення', date: 'IV квартал 2028 року',
      desc: 'Преміальний Adults Only-простір для гостей, які цінують приватність, тишу та відновлення. Комерційно секція орієнтована на платоспроможну аудиторію, короткі преміальні заїзди та попит у різні сезони, що підсилює потенціал стабільного завантаження протягом року.',
      infra: ['Adults Only', 'прямий Ski In / Ski Out до траси 5G', 'Biohacking & Recovery Center', 'SPA та wellness', 'Rooftop Pool', 'ресторан і бар', 'mini-coworking', 'переговорні кімнати', 'premium recovery services', 'підземний і гостьовий паркінг'],
    },
    rock: {
      name: 'ROCK', sub: 'Простір рішень і масштабування', date: '2030 рік',
      desc: 'Секція створена для ділової аудиторії, корпоративних команд, подій і професійних спільнот. Її ключова перевага для інвестора — окремий B2B-сценарій попиту, який допомагає залучати гостей не лише у високий туристичний сезон, а й у традиційно слабші періоди року.',
      infra: ['прямий Ski In / Ski Out до траси 5G', 'конференц-зона', 'MICE-простори', 'медійний центр', 'streaming-ready інфраструктура', 'коворкінг', 'переговорні кімнати', 'padel-корт', 'rooftop', 'ресторани', 'фітнес-центр', 'простори для приватних і корпоративних подій'],
    },
    sun: {
      name: 'SUN', sub: 'Світ дому, тепла та спільного відпочинку', date: '2030 рік',
      desc: 'Сімейний формат для відпочинку кількох поколінь, розрахований на довші заїзди та повторні візити. Для інвестора це сегмент із потенціалом стабільного family-попиту протягом року завдяки канікулам, святковим періодам і звичці родин повертатися у комфортні для них місця.',
      infra: ['прямий Ski In / Ski Out до траси 5G', 'сімейні апартаменти', 'multi-room формати', 'дитячий центр', 'SPA на два поверхи', 'басейни', 'скалодром', 'мотузковий майданчик', 'family-активності', 'дитячі програми', 'сімейний ресторан', 'rooftop', 'паркінг і сімейна логістика'],
    },
  };

  const dialog = modal.querySelector('.tri-modal__dialog');
  const imgs = Array.from(modal.querySelectorAll('[data-tri-img]'));
  const el = (sel) => modal.querySelector(sel);
  const caption = el('[data-tri-info]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let lastFocus = null, closeTimer = 0, swapTimer = 0, current = 'wind';

  function write(d, world) {
    el('[data-tri-info-name]').textContent = d.name;
    el('[data-tri-info-sub]').textContent = d.sub;
    el('[data-tri-info-desc]').textContent = d.desc;
    el('[data-tri-info-date]').textContent = d.date;
    const list = el('[data-tri-info-infra]');
    list.textContent = '';
    for (const item of d.infra) { const li = document.createElement('li'); li.textContent = item; list.appendChild(li); }
    el('[data-tri-form-title]').textContent = `Отримайте матеріали по ${d.name}`;
    el('[data-tri-form-field]').value = world;
  }

  function fill(world, animate) {
    const d = DATA[world]; if (!d) return;
    current = world;
    imgs.forEach((im) => im.classList.toggle('is-active', im.dataset.triImg === world));
    clearTimeout(swapTimer);
    if (animate && !reduce.matches) {
      caption.classList.add('is-fading');
      swapTimer = setTimeout(() => { write(d, world); caption.classList.remove('is-fading'); }, 200);
    } else { write(d, world); }
  }

  const focusables = () => Array.from(modal.querySelectorAll(
    'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'
  )).filter((n) => n.offsetParent !== null);

  function open(world) {
    clearTimeout(closeTimer);
    lastFocus = document.activeElement;
    fill(world, false);
    dialog.classList.remove('is-form-open');                      // mobile form starts collapsed
    const more = el('[data-tri-more]');
    if (more) { more.textContent = 'Отримати матеріали'; more.setAttribute('aria-expanded', 'false'); }
    if (dialog.scrollTo) dialog.scrollTo(0, 0);
    modal.hidden = false;
    void modal.offsetWidth;
    modal.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    dialog.focus();
  }
  function close() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    const done = () => { modal.hidden = true; };
    clearTimeout(closeTimer);
    reduce.matches ? done() : (closeTimer = setTimeout(done, 400));
  }

  for (const btn of document.querySelectorAll('[data-tri-open]')) btn.addEventListener('click', () => open(btn.dataset.triOpen));
  for (const c of modal.querySelectorAll('[data-tri-modal-close]')) c.addEventListener('click', close);

  const choices = Array.from(modal.querySelectorAll('[data-tri-choice]'));
  const contactField = el('[data-tri-contact-field]');
  for (const c of choices) c.addEventListener('click', () => {
    choices.forEach((x) => { const sel = x === c; x.classList.toggle('is-active', sel); x.setAttribute('aria-checked', sel ? 'true' : 'false'); });
    if (contactField) contactField.value = c.dataset.triChoice;
  });

  // Mobile: the button slides the lead form open under the always-visible details.
  const more = el('[data-tri-more]');
  if (more) more.addEventListener('click', () => {
    const isOpen = dialog.classList.toggle('is-form-open');
    more.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    more.textContent = isOpen ? 'Згорнути' : 'Отримати матеріали';
    if (isOpen) { const f = el('#tri-name'); setTimeout(() => f && f.focus({ preventScroll: true }), 420); }
  });

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables(); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  const form = modal.querySelector('.tri-modal__form');
  if (form) form.addEventListener('submit', (e) => { e.preventDefault(); /* TODO: надіслати лід (section=current) */ });
})();
