/* HeroScrub — pinned scroll-scrubbed hero that resolves into the second screen (DESIGN.md §8).
   Scroll progress p (0..1 over the 400vh scene) drives four acts, transform/opacity only:
     p 0   →.40  H1 drifts up 120px & fades (slow, eased, ~half the camera); video held on frame 0
     p .65 →.80  panel + stats fade out as the FLIP (video resize) begins
     p .15 →.65  camera: video.currentTime 0 → duration (start → frontal view); no text
     p .65 →1    FLIP: the video frame (natural box = act-2 slot) scales cover→identity into the card
     p .7        header hands over to its scrolled state
     p .75 →1    second-screen text fades in
   Scrubbing reuses the coalesced-seek + decode-probe strategy from three-worlds.js: never re-seek
   while a seek is in flight, and fall back to a static two-screen layout on reduced-motion, slow
   seeks or a failed video. The play controls open a focus-trapped presentation modal. */

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const SLOW_SEEK_MS = 80;
const EPS = 1 / 30;

for (const section of document.querySelectorAll('[data-hs]')) init(section);

function init(section) {
  const scene = section.querySelector('[data-hs-scene]');
  const pin = section.querySelector('[data-hs-pin]');
  const frame = section.querySelector('[data-hs-frame]');
  const video = section.querySelector('[data-hs-video]');
  const title = section.querySelector('[data-hs-title]');
  const bottom = section.querySelector('[data-hs-bottom]');
  const act2 = section.querySelector('[data-hs-act2]');
  const header = document.querySelector('.site-header');

  let duration = 9;
  let scrub = false;        // true only once the decode probe passes
  let staticMode = false;
  let visible = false;
  let raf = 0;
  let seekTarget = -1;
  let cover = { s: 1, tx: 0, ty: 0 };   // cached fullscreen-cover transform for the frame
  let flyDist = 600;                    // px the H1 travels up to clear the top (set in measure)

  /* ---------- Modal (presentation) — wired up regardless of scrub state ---------- */
  setupModal(section);

  function goStatic() {
    if (staticMode) return;
    staticMode = true;
    scrub = false;
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    frame.style.transform = '';
    frame.style.removeProperty('--hs-dark');
    title.style.transform = '';
    title.style.opacity = '';
    bottom.style.opacity = '';
    act2.style.opacity = '';
    act2.classList.add('is-shown');
    header && header.classList.remove('is-hero-transparent');
    section.classList.add('hs--static');
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { goStatic(); return; }
  // <1280: the brief's single-column second screen (text, then full-width card) is taller than
  // 100vh, so it can't live inside a 100vh pin without clipping; touch scrubbing is also fragile.
  // Below 1280 we use the static two-screen stack (hero → scrollable second screen), which yields
  // exactly the brief's tablet/mobile layout. Reported as a deliberate, non-silent simplification.
  // Re-check on resize too: a page loaded ≥1280 then narrowed (responsive testing / orientation /
  // window resize) must also drop to static — otherwise the pinned layout runs at mobile widths,
  // where the absolute H1/panel escape the container and the FLIPing video overlaps the act-2 text.
  const narrow = matchMedia('(max-width: 1279px)');
  narrow.addEventListener('change', (e) => { if (e.matches) goStatic(); });
  if (narrow.matches) { goStatic(); return; }
  if (!video) { goStatic(); return; }

  /* Measure the frame's natural slot box (identity transform) and derive the transform that blows
     it up to fully cover the viewport — a single uniform scale, so the picture never distorts. */
  function measure() {
    // How far the H1 must travel up to fully clear the viewport top (beamed under the header).
    flyDist = title.offsetTop + title.offsetHeight + 40;
    const prev = frame.style.transform;
    frame.style.transform = 'none';
    const r = frame.getBoundingClientRect();
    // Normalize to the frame's rest position (pin stuck at top:0). measure() can fire on
    // re-entry while the sticky pin is still offset, so read that offset out — otherwise the
    // cover transform is captured against the wrong vertical origin and the video lands
    // off-screen the whole time the section is scrolled back into view.
    const pinTop = pin.getBoundingClientRect().top;
    frame.style.transform = prev;
    const vw = window.innerWidth, vh = window.innerHeight;
    if (r.width < 1 || r.height < 1) return;
    const restTop = r.top - pinTop;
    const s = Math.max(vw / r.width, vh / r.height);
    const tx = vw / 2 - (r.left + s * r.width / 2);
    const ty = vh / 2 - (restTop + s * r.height / 2);
    cover = { s, tx, ty };
  }

  function progress() {
    const total = scene.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    return clamp(-scene.getBoundingClientRect().top / total, 0, 1);
  }

  // Coalesced seek — identical discipline to three-worlds.js: one seek in flight at a time.
  function applySeek() {
    if (!scrub || video.readyState < 1 || seekTarget < 0) return;
    if (video.seeking) return;
    if (Math.abs(seekTarget - video.currentTime) <= EPS) { seekTarget = -1; return; }
    const t = seekTarget; seekTarget = -1;
    try { video.currentTime = t; } catch (e) {}
  }
  video.addEventListener('seeked', applySeek);

  function render() {
    raf = 0;
    if (!visible || staticMode) return;
    const p = progress();

    // Act 1 — rest state leaves (0 → .40, ~half the camera playback): H1 drifts up slow & eased.
    // H1 is "beamed up" (0 → .40): starts slow, then accelerates up and off under the header
    // (ease-in), shrinking to 60% and fading as it's sucked away.
    const t1 = clamp(p / 0.40, 0, 1);
    const tf = t1 * t1;                                  // ease-in — accelerating pull upward
    title.style.transform = `translateY(${-flyDist * tf}px) scale(${lerp(1, 0.6, tf)})`;
    title.style.opacity = `${1 - tf}`;
    // Panel + stats stay through the whole camera and only leave once the FLIP (video resize)
    // begins at .65, fading out over .65 → .80.
    const tb = easeInOut(clamp((p - 0.65) / 0.15, 0, 1));
    bottom.style.opacity = `${1 - tb}`;

    // Camera (.15 → .65): map progress to currentTime; held at the ends.
    const camT = clamp((p - 0.15) / 0.5, 0, 1) * duration;
    if (scrub && video.readyState >= 1) { seekTarget = camT; applySeek(); }

    // FLIP (.65 → 1): cover → identity.
    const q = easeInOut(clamp((p - 0.65) / 0.35, 0, 1));
    const s = lerp(cover.s, 1, q), tx = lerp(cover.tx, 0, q), ty = lerp(cover.ty, 0, q);
    frame.style.transform = `translate(${tx}px,${ty}px) scale(${s})`;
    // Reveal the card chrome (60 сек chip, play, CTA) only once the video has settled in place.
    section.classList.toggle('hs--landed', q > 0.93);

    // Header hands over at .7.
    header && header.classList.toggle('is-hero-transparent', p < 0.7);

    // Second screen fades in (.75 → 1). Darken the video more as it settles into the card so the
    // "60 сек" chip + white CTA read — on the frame itself, so no box shows at the landing spot.
    const a2 = clamp((p - 0.75) / 0.25, 0, 1);
    frame.style.setProperty('--hs-dark', (0.5 * a2).toFixed(3));
    act2.style.opacity = `${a2}`;
    act2.classList.toggle('is-shown', a2 > 0.01);

    raf = requestAnimationFrame(render);
  }
  const start = () => { if (!raf && !staticMode) raf = requestAnimationFrame(render); };
  const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

  addEventListener('resize', () => { measure(); if (visible) start(); }, { passive: true });

  // Lazy preload once within ~100vh; watchdog guarantees the static fallback if nothing decodes.
  let loadArmed = false, watchdog = 0;
  function armLoad() {
    if (loadArmed) return;
    loadArmed = true;
    if (video.preload !== 'auto') { video.preload = 'auto'; try { video.load(); } catch (e) {} }
    watchdog = setTimeout(() => { if (!scrub && !staticMode) goStatic(); }, 8000);
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) { visible = e.isIntersecting; if (visible) { armLoad(); measure(); start(); } else stop(); }
  }, { rootMargin: '100% 0px 100% 0px', threshold: 0 });
  io.observe(scene);

  video.addEventListener('error', goStatic);
  video.addEventListener('loadedmetadata', () => {
    if (video.duration && isFinite(video.duration)) duration = video.duration;
    measure();
  });
  video.addEventListener('loadeddata', () => { clearTimeout(watchdog); probe(); }, { once: true });

  // Decode probe: 5 near-start seeks; static only if every one exceeds 80ms (one cold spike is ok).
  function probe() {
    if (staticMode || scrub) return;
    let end = 0;
    try { if (video.buffered.length) end = video.buffered.end(video.buffered.length - 1); } catch (e) {}
    end = Math.min(Math.max(end, 0.25), 3);
    const pts = [0.2, 0.4, 0.6, 0.8, 1.0].map((f) => Math.min(f * end, duration - 0.05));
    let i = 0, slow = 0;
    (function step() {
      if (i >= pts.length) { if (slow >= pts.length) goStatic(); else { scrub = true; start(); } return; }
      const t0 = performance.now();
      function done() {
        video.removeEventListener('seeked', done);
        if (performance.now() - t0 > SLOW_SEEK_MS) slow++;
        i++; step();
      }
      video.addEventListener('seeked', done);
      try { video.currentTime = pts[i]; } catch (e) { goStatic(); }
    })();
  }
}

/* ---------- Presentation modal: open from any [data-hs-play], Esc + focus trap ---------- */
function setupModal(scope) {
  const modal = document.querySelector('[data-hs-modal]');
  if (!modal) return;
  const dialog = modal.querySelector('[data-hs-modal-dialog]');
  const closeBtn = modal.querySelector('[data-hs-modal-close]');
  const video = modal.querySelector('video');
  let lastFocus = null;

  const focusables = () => Array.from(
    modal.querySelectorAll('button, [href], video[controls], [tabindex]:not([tabindex="-1"])')
  ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

  function open() {
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.removeAttribute('hidden');
    document.documentElement.style.overflow = 'hidden';
    (closeBtn || dialog).focus();
    if (video) { try { video.currentTime = 0; video.play().catch(() => {}); } catch (e) {} }
  }
  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('hidden', '');
    document.documentElement.style.overflow = '';
    if (video) { try { video.pause(); } catch (e) {} }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  for (const btn of document.querySelectorAll('[data-hs-play]')) btn.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  modal.addEventListener('mousedown', (e) => { if (e.target === modal) close(); });
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables();
    if (!f.length) { e.preventDefault(); return; }
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}
