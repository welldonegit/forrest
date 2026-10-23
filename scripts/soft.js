/* FORREST soft.html — Lenis smooth scroll + GSAP/ScrollTrigger entrances.
   Animations per the soft-page brief: masked line-rise headings, clip-open image reveals with an
   inner scale, staggered card rises, gentle photo parallax. prefers-reduced-motion → everything
   static and Lenis is never started (the html.s-anim start-states are also gated on motion). */
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Menu: swap the right-hand photo + caption to the hovered/focused primary item ---- */
(function menuMedia() {
  const menu = document.querySelector('[data-menu]');
  const media = menu && menu.querySelector('[data-menu-media]');
  const cap = menu && menu.querySelector('[data-menu-cap]');
  const links = menu ? Array.from(menu.querySelectorAll('.s-menu__link')) : [];
  if (!media || !links.length) return;
  const photos = Array.from(media.querySelectorAll('[data-menu-photo]'));
  const DEFAULT = 'tri';
  const activate = (key) => {
    photos.forEach((p) => p.classList.toggle('is-active', p.dataset.menuPhoto === key));
    const link = links.find((l) => l.dataset.menuItem === key);
    if (cap && link) cap.textContent = link.dataset.cap || '';
  };
  links.forEach((l) => {
    const go = () => activate(l.dataset.menuItem);
    l.addEventListener('pointerenter', go);
    l.addEventListener('focus', go);
  });
  const nav = menu.querySelector('[data-menu-nav]');
  if (nav) nav.addEventListener('pointerleave', () => activate(DEFAULT));
})();

/* ---- Form: contact-method segmented control (always on) ---- */
(function choices() {
  const group = document.querySelector('[data-s-choices]');
  if (!group) return;
  const field = document.querySelector('[data-s-contact]');
  const btns = Array.from(group.querySelectorAll('[data-choice]'));
  for (const b of btns) b.addEventListener('click', () => {
    btns.forEach((x) => {
      const on = x === b;
      x.classList.toggle('is-active', on);
      x.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    if (field) field.value = b.dataset.choice;
  });
})();

/* ---- Language switcher (visual; TODO: wire real i18n) ---- */
(function lang() {
  const group = document.querySelector('[data-lang]');
  if (!group) return;
  const opts = Array.from(group.querySelectorAll('[data-lang-opt]'));
  for (const o of opts) o.addEventListener('click', () => {
    opts.forEach((x) => { const on = x === o; x.classList.toggle('is-active', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
  });
})();

/* ---- Hero season toggle: iris-wave the winter photo in/out ---- */
(function seasonBg() {
  const btn = document.querySelector('[data-season-toggle]');
  const frame = document.querySelector('.s-hero__frame');
  if (!btn || !frame) return;
  const l2 = btn.querySelector('.s-hero__season-l2');
  let winter = false;
  btn.addEventListener('click', () => {
    winter = !winter;
    frame.classList.toggle('is-winter', winter);
    btn.classList.toggle('is-winter', winter);
    btn.setAttribute('aria-pressed', winter ? 'true' : 'false');
    if (l2) l2.textContent = winter ? 'вид влітку' : 'вид взимку';
  });
})();

/* ---- Season video: play on click (poster → inline playback with controls) ---- */
(function seasonVideo() {
  const video = document.querySelector('[data-season-video]');
  const btn = document.querySelector('[data-season-play]');
  if (!video || !btn) return;
  btn.addEventListener('click', () => {
    video.closest('.s-season__media')?.classList.add('is-playing');
    video.setAttribute('controls', '');
    video.muted = false;
    const p = video.play();
    if (p) p.catch(() => {});
  });
})();

/* ---- Header: glass over the hero → solid white once scrolled past most of it ---- */
(function header() {
  const head = document.querySelector('[data-s-head]');
  const hero = document.querySelector('.s-hero');
  if (!head) return;
  let lastY = window.scrollY;
  const update = () => {
    const y = window.scrollY;
    if (hero) head.classList.toggle('is-solid', y > hero.offsetHeight - 120);
    // Smart header: hide when scrolling down (past a threshold), reveal when scrolling up.
    if (y > lastY + 4 && y > 160) head.classList.add('is-hidden');
    else if (y < lastY - 4) head.classList.remove('is-hidden');
    if (y <= 80) head.classList.remove('is-hidden');
    lastY = y;
  };
  update();
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update, { passive: true });
})();

if (!reduce) {
  try {
    /* ---- Lenis smooth scroll (lerp 0.08), driven off the GSAP ticker; feeds ScrollTrigger ---- */
    const lenis = new Lenis({ lerp: 0.08 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    /* ---- Headings — line-by-line rise from under the mask (1.2s, expo.out, stagger 0.08) ---- */
    document.querySelectorAll('.s-split').forEach((h) => {
      gsap.to(h.querySelectorAll('.line-in'), {
        yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: h, start: 'top 88%' },
      });
    });

    /* ---- Lead / CTA — gentle rise + fade ---- */
    document.querySelectorAll('[data-fade]').forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%' },
      });
    });

    /* ---- Cards — rise 40px, stagger 0.12 within each group ---- */
    document.querySelectorAll('[data-cards]').forEach((group) => {
      gsap.to(group.querySelectorAll('.s-card'), {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: group, start: 'top 86%' },
      });
    });

    /* ---- Number cards — premium staggered rise (expo), long + soft ---- */
    document.querySelectorAll('[data-figures]').forEach((group) => {
      gsap.to(group.querySelectorAll('.s-num'), {
        opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.out', stagger: 0.16,
        scrollTrigger: { trigger: group, start: 'top 70%' },
      });
    });

    /* ---- Images — rounded container opens from a strip while the photo scales 1.15→1 (1.6s) ---- */
    document.querySelectorAll('.s-reveal').forEach((wrap) => {
      const img = wrap.querySelector('.s-reveal__img');
      const tl = gsap.timeline({ scrollTrigger: { trigger: wrap, start: 'top 84%' } });
      tl.to(wrap, { clipPath: 'inset(0% 0 0% 0 round 32px)', duration: 1.6, ease: 'expo.out' }, 0);
      if (img) tl.to(img, { scale: 1, duration: 1.6, ease: 'expo.out' }, 0);
    });

    /* ---- Light parallax on photos (shift ≤ 8%) ---- */
    document.querySelectorAll('[data-parallax]').forEach((img) => {
      const trigger = img.closest('.s-hero__frame, .s-figcard, figure, section') || img;
      gsap.fromTo(img, { yPercent: -6 }, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    ScrollTrigger.refresh();
    // The pinned tri deck adds ~400vh to the page AFTER this runs (tri-soft.js), and images decode
    // late — both shift every trigger below them (e.g. the footer). Re-measure once everything has
    // settled so late sections (footer photo + heading) reliably reveal.
    addEventListener('load', () => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 1200);
  } catch (e) {
    // If anything fails, never leave content stuck in its hidden start-state.
    document.documentElement.classList.remove('s-anim');
    console.error('[soft] animation init failed:', e);
  }
}
