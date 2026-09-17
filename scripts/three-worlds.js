/* Three-worlds scene — scroll-scrubbed video (DESIGN.md §8 exception). No dependencies.
   Progress is read in requestAnimationFrame from the wrapper's position (never on the scroll
   event); currentTime is only nudged when it drifts > 1/30 s so the decoder isn't flooded.
   Falls back to a static poster layout on prefers-reduced-motion, slow seeks, or a failed video. */

const BOUND1 = 6.5;   // WIND -> ROCK
const BOUND2 = 13.5;  // ROCK -> SUN
const EPS = 1 / 30;   // currentTime dead-band (seconds)
const SLOW_SEEK_MS = 80;

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

for (const section of document.querySelectorAll('[data-worlds]')) init(section);

function init(section) {
  const scene = section.querySelector('[data-worlds-scene]');
  const video = section.querySelector('[data-worlds-video]');
  const texts = Array.from(section.querySelectorAll('[data-world]'));
  const progs = Array.from(section.querySelectorAll('[data-prog]'));

  let duration = 18.48;
  let scrub = false;      // true only after the seek probe passes
  let staticMode = false;
  let visible = false;
  let raf = 0;
  let activeIdx = -1;

  function setActive(idx) {
    if (idx === activeIdx) return;
    activeIdx = idx;
    texts.forEach((t, i) => {
      const on = i === idx;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    progs.forEach((p, i) => p.classList.toggle('is-active', i === idx));
  }

  let watchdog = 0;
  function goStatic() {
    if (staticMode) return;
    staticMode = true;
    scrub = false;
    clearTimeout(watchdog);
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    section.classList.add('worlds--static');
    // Reveal all three texts as a stacked, readable list.
    texts.forEach((t) => { t.classList.remove('is-active'); t.setAttribute('aria-hidden', 'false'); });
  }

  // Reduced motion: no scroll-driven movement at all.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { goStatic(); return; }
  if (!video) { goStatic(); return; }

  function progress() {
    const total = scene.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    return clamp(-scene.getBoundingClientRect().top / total, 0, 1);
  }

  function frame() {
    raf = 0;
    if (!visible || staticMode) return;
    const vt = progress() * duration;
    setActive(vt < BOUND1 ? 0 : vt < BOUND2 ? 1 : 2);
    if (scrub && video.readyState >= 1 && Math.abs(vt - video.currentTime) > EPS) {
      try { video.currentTime = vt; } catch (e) { /* ignore transient seek errors */ }
    }
    raf = requestAnimationFrame(frame);
  }
  const start = () => { if (!raf && !staticMode) raf = requestAnimationFrame(frame); };
  const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

  // Lazy: only bump to full preload the first time the scene is within ~100vh. A watchdog
  // guarantees the static fallback if no decodable frame arrives (blocked/failed video),
  // since a <video> with <source media> children doesn't reliably fire its own error event.
  let loadArmed = false;
  function armLoad() {
    if (loadArmed) return;
    loadArmed = true;
    if (video.preload !== 'auto') { video.preload = 'auto'; try { video.load(); } catch (e) {} }
    watchdog = setTimeout(() => { if (!scrub && !staticMode) goStatic(); }, 8000);
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      visible = e.isIntersecting;
      if (e.isIntersecting) { armLoad(); start(); } else stop();
    }
  }, { rootMargin: '100% 0px 100% 0px', threshold: 0 });
  io.observe(scene);

  video.addEventListener('error', goStatic);
  video.addEventListener('loadedmetadata', () => {
    if (video.duration && isFinite(video.duration)) duration = video.duration;
  });
  // Probe once a frame is decodable: 5 near-start seeks measure decode cost, not network.
  video.addEventListener('loadeddata', () => { clearTimeout(watchdog); probe(); }, { once: true });

  // Static only if every one of the first 5 seeks is slow (a single cold-start spike is
  // tolerated) — matches the spec's "first 5 seeks take > 80 ms each". Seeks stay inside the
  // already-buffered head so we measure decode cost (the iOS/weak-device signal), not network.
  function probe() {
    if (staticMode || scrub) return;
    let end = 0;
    try { if (video.buffered.length) end = video.buffered.end(video.buffered.length - 1); } catch (e) {}
    end = Math.min(Math.max(end, 0.25), 3);
    const pts = [0.2, 0.4, 0.6, 0.8, 1.0].map((f) => Math.min(f * end, duration - 0.05));
    let i = 0, slow = 0;
    function step() {
      if (i >= pts.length) { if (slow >= pts.length) goStatic(); else scrub = true; return; }
      const t0 = performance.now();
      function done() {
        video.removeEventListener('seeked', done);
        if (performance.now() - t0 > SLOW_SEEK_MS) slow++;
        i++; step();
      }
      video.addEventListener('seeked', done);
      try { video.currentTime = pts[i]; } catch (e) { goStatic(); }
    }
    step();
  }
}
