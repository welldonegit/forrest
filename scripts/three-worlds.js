/* Three-worlds scene — scroll-scrubbed video (DESIGN.md §8 exception). No dependencies.
   Progress is read in requestAnimationFrame from the wrapper's position (never on the scroll
   event). Seeks are *coalesced*: while a seek is in flight we only remember the latest target and
   fire it once the previous one settles, so fast scroll shows fully-decoded (sharp) frames instead
   of flooding the decoder with half-finished seeks. On top of the video, each active world gets an
   animated ring + a pulsing dot glued to its building (in the video's own coordinate space, so it
   tracks the drifting fly-through) and a connector line from the world label to that dot.
   Falls back to a static poster layout on prefers-reduced-motion, slow seeks, or a failed video. */

const BOUND1 = 6.5;   // WIND -> ROCK
const BOUND2 = 13.5;  // ROCK -> SUN
const EPS = 1 / 30;   // currentTime dead-band (seconds)
const SLOW_SEEK_MS = 80;

/* Building contours, traced off the footage in a 640-wide preview space (scaled to the video's
   native 1620 px by PVW). Two keyframes per world capture the rightward drift + perspective change
   across the section; every point is linearly interpolated between them by scroll progress `p`
   (0..1 of the whole scene). Point order is consistent between the two keyframes so they morph. */
const PVW = 1620 / 640;         // preview px -> video-space px
const DOT_R = 12;               // dot / pulse base radius, video-space units
const WORLDS = [
  { kf: [ // WIND — sand curved building (starts narrow at the right, grows as it nears)
    { p: .027, pts: [[255, 157], [320, 147], [400, 149], [468, 157], [522, 169], [534, 218], [524, 268], [490, 294], [360, 300], [266, 292], [248, 205], [250, 171]] },
    { p: .081, pts: [[268, 159], [342, 147], [427, 148], [503, 159], [550, 174], [563, 223], [550, 268], [503, 288], [367, 292], [280, 287], [263, 206], [265, 174]] },
    { p: .298, pts: [[205, 178], [310, 158], [420, 150], [520, 152], [600, 162], [640, 205], [638, 275], [600, 315], [400, 325], [240, 315], [210, 215], [208, 190]] },
  ] },
  { kf: [ // ROCK — green building (dense keyframes so coverage stays steady across the sweep)
    { p: .433, pts: [[-18, 108], [60, 82], [144, 84], [222, 96], [264, 111], [266, 165], [264, 237], [234, 255], [84, 257], [-15, 252], [-17, 195], [-18, 147]] },
    { p: .487, pts: [[35, 138], [92, 100], [162, 96], [228, 108], [298, 124], [302, 175], [298, 245], [262, 266], [150, 270], [38, 260], [32, 198], [34, 158]] },
    { p: .541, pts: [[148, 128], [205, 104], [275, 98], [340, 108], [408, 124], [416, 178], [410, 242], [368, 264], [238, 268], [150, 258], [142, 196], [144, 156]] },
    { p: .622, pts: [[172, 150], [235, 120], [312, 112], [392, 124], [466, 142], [472, 182], [468, 248], [430, 268], [300, 274], [176, 262], [168, 205], [170, 168]] },
    { p: .676, pts: [[202, 145], [290, 121], [386, 116], [470, 126], [572, 143], [579, 179], [577, 241], [524, 260], [356, 265], [212, 258], [200, 209], [198, 169]] },
  ] },
  { kf: [ // SUN — dark building (extra end-keyframe pulls the left edge in over the last seconds)
    { p: .812, pts: [[2, 92], [50, 60], [130, 56], [210, 62], [285, 82], [288, 140], [285, 225], [255, 252], [110, 258], [4, 252], [2, 190], [2, 140]] },
    { p: .893, pts: [[2, 112], [55, 80], [135, 72], [220, 82], [300, 102], [304, 160], [300, 248], [268, 290], [120, 300], [4, 292], [2, 215], [2, 158]] },
    { p: .974, pts: [[34, 110], [78, 80], [150, 72], [230, 82], [305, 104], [309, 162], [305, 250], [272, 292], [132, 300], [36, 292], [34, 215], [33, 156]] },
  ] },
];

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;

for (const section of document.querySelectorAll('[data-worlds]')) init(section);

function init(section) {
  const scene = section.querySelector('[data-worlds-scene]');
  const pin = section.querySelector('.worlds__pin');
  const video = section.querySelector('[data-worlds-video]');
  const texts = Array.from(section.querySelectorAll('[data-world]'));

  // Marker overlay (optional — degrade gracefully if the markup is absent).
  const fx = section.querySelector('[data-worlds-fx]');
  const link = section.querySelector('[data-worlds-link]');
  const linkLine = link && link.querySelector('.worlds__link-line');
  const linkAnchor = link && link.querySelector('.worlds__link-anchor');
  // Split each world's name into per-letter spans so the reveal can stagger them (CSS reads --i).
  for (const t of texts) {
    const name = t.querySelector('.worlds__name');
    if (!name || name.dataset.split) continue;
    const chars = [...name.textContent];
    name.textContent = '';
    chars.forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'worlds__ch';
      s.textContent = ch === ' ' ? ' ' : ch;
      s.style.setProperty('--i', i);
      name.appendChild(s);
    });
    name.dataset.split = '1';
  }

  // Spotlight scrim: a full-frame dim overlay with a soft-edged hole cut in the shape of the
  // active building, so the dom "lights up" by contrast instead of being ringed. Built here (not
  // in the markup) so each group's mask id stays unique and the hole reuses the ring geometry.
  const SVGNS = 'http://www.w3.org/2000/svg';
  let spotDefs = null;
  if (fx) {
    spotDefs = document.createElementNS(SVGNS, 'defs');
    const blur = document.createElementNS(SVGNS, 'filter');
    blur.setAttribute('id', 'worlds-spot-blur');
    for (const [k, v] of [['x', '-20%'], ['y', '-20%'], ['width', '140%'], ['height', '140%']]) blur.setAttribute(k, v);
    const fe = document.createElementNS(SVGNS, 'feGaussianBlur');
    fe.setAttribute('stdDeviation', '22');   // feather, in video-space px (viewBox 1620)
    blur.appendChild(fe);
    spotDefs.appendChild(blur);
    fx.insertBefore(spotDefs, fx.firstChild);
  }
  const frameRect = (fill) => {
    const r = document.createElementNS(SVGNS, 'rect');
    for (const [k, v] of [['x', '0'], ['y', '0'], ['width', '1620'], ['height', '1080']]) r.setAttribute(k, v);
    if (fill) r.setAttribute('fill', fill);
    return r;
  };

  const fxGroups = fx ? Array.from(fx.querySelectorAll('.worlds__fxg')) : [];
  fxGroups.forEach((g, i) => {
    g._ring = g.querySelector('.worlds__ring');
    g._dot = g.querySelector('.worlds__dot');
    const ps = g.querySelectorAll('.worlds__pulse');
    g._p1 = ps[0]; g._p2 = ps[1];
    for (const c of [g._dot, g._p1, g._p2]) c.setAttribute('r', DOT_R);
    if (!spotDefs) return;
    // mask = white frame (scrim visible) minus a blurred black polygon (building shows through).
    const mask = document.createElementNS(SVGNS, 'mask');
    mask.setAttribute('id', 'worlds-spot-' + i);
    mask.setAttribute('maskUnits', 'userSpaceOnUse');
    for (const [k, v] of [['x', '0'], ['y', '0'], ['width', '1620'], ['height', '1080']]) mask.setAttribute(k, v);
    const hole = document.createElementNS(SVGNS, 'polygon');
    hole.setAttribute('fill', '#000');
    hole.setAttribute('filter', 'url(#worlds-spot-blur)');
    mask.appendChild(frameRect('#fff'));
    mask.appendChild(hole);
    spotDefs.appendChild(mask);
    g._spotHole = hole;
    const spot = frameRect();
    spot.setAttribute('class', 'worlds__spot');
    spot.setAttribute('mask', 'url(#worlds-spot-' + i + ')');
    g.insertBefore(spot, g.firstChild);   // behind the dot/pulse/connector
  });

  let duration = 18.48;
  let scrub = false;      // true only after the seek probe passes
  let staticMode = false;
  let visible = false;
  let raf = 0;
  let activeIdx = -1;
  let seekTarget = -1;

  const mq = matchMedia('(min-width: 768px)');
  let markersOn = mq.matches;
  function refreshMarkers() {
    markersOn = mq.matches && !staticMode && !!fx;
    if (!markersOn && link) link.classList.remove('is-shown');
  }
  mq.addEventListener?.('change', refreshMarkers);

  function setActive(idx) {
    if (idx === activeIdx) return;
    activeIdx = idx;
    texts.forEach((t, i) => {
      const on = i === idx;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    fxGroups.forEach((g, i) => g.classList.toggle('is-active', i === idx));
  }

  let watchdog = 0;
  function goStatic() {
    if (staticMode) return;
    staticMode = true;
    scrub = false;
    clearTimeout(watchdog);
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    section.classList.add('worlds--static');
    refreshMarkers();
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

  // Coalesced seek: never re-seek while one is in flight (that cancels it and shows a half-decoded
  // frame); just keep the latest target and issue it once the video settles. Result: every painted
  // frame during a scroll is a complete decode → visibly sharper scrubbing.
  function applySeek() {
    if (!scrub || video.readyState < 1 || seekTarget < 0) return;
    if (video.seeking) return;
    if (Math.abs(seekTarget - video.currentTime) <= EPS) { seekTarget = -1; return; }
    const t = seekTarget; seekTarget = -1;
    try { video.currentTime = t; } catch (e) { /* ignore transient seek errors */ }
  }
  video.addEventListener('seeked', applySeek);

  // Interpolate the contour to video-space and derive its bbox/centroid for the dot + connector.
  // Piecewise across the world's keyframes: pick the segment holding g, clamp past the ends.
  function anchor(w, g) {
    const kf = w.kf;
    let a = kf[0], b = kf[0];
    if (g >= kf[kf.length - 1].p) { a = b = kf[kf.length - 1]; }
    else if (g > kf[0].p) { for (let i = 0; i < kf.length - 1; i++) { if (g <= kf[i + 1].p) { a = kf[i]; b = kf[i + 1]; break; } } }
    const t = a === b ? 0 : clamp((g - a.p) / (b.p - a.p), 0, 1);
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, sx = 0, sy = 0;
    const pts = a.pts.map((pa, i) => {
      const pb = b.pts[i];
      const x = lerp(pa[0], pb[0], t) * PVW, y = lerp(pa[1], pb[1], t) * PVW;
      if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
      sx += x; sy += y;
      return [x, y];
    });
    return { pts, cx: sx / pts.length, minY, maxY };
  }

  function positionMarkers(g) {
    const k = anchor(WORLDS[activeIdx], g);
    const grp = fxGroups[activeIdx];
    if (!grp) return;
    const ptsStr = k.pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    grp._ring.setAttribute('points', ptsStr);
    if (grp._spotHole) grp._spotHole.setAttribute('points', ptsStr);
    const dx = k.cx, dy = k.minY + (k.maxY - k.minY) * 0.34;   // sit the dot on the upper facade
    for (const c of [grp._dot, grp._p1, grp._p2]) { c.setAttribute('cx', dx.toFixed(1)); c.setAttribute('cy', dy.toFixed(1)); }
    updateLink(dx, dy);
  }

  // Map a video-space point to screen px through the same xMidYMid/slice transform the video uses,
  // then draw the connector from the edge of the active label (whichever side faces the dot) to it.
  function updateLink(vx, vy) {
    if (!link || !linkLine) return;
    const pr = pin.getBoundingClientRect();
    const scale = Math.max(pr.width / 1620, pr.height / 1080);
    const offX = (pr.width - 1620 * scale) / 2, offY = (pr.height - 1080 * scale) / 2;
    const dsx = offX + vx * scale, dsy = offY + vy * scale;
    // Label centre + half-size in pin coords; the tail is where the centre→dot ray leaves the box.
    const tr = texts[activeIdx].getBoundingClientRect();
    const cx = tr.left + tr.width / 2 - pr.left, cy = tr.top + tr.height / 2 - pr.top;
    const hw = tr.width / 2 + 6, hh = tr.height / 2 + 6;
    let ex = dsx - cx, ey = dsy - cy;
    const k = 1 / Math.max(Math.abs(ex) / hw, Math.abs(ey) / hh, 1e-6);
    const tx = cx + ex * k, ty = cy + ey * k;
    linkLine.setAttribute('x1', tx.toFixed(1)); linkLine.setAttribute('y1', ty.toFixed(1));
    linkLine.setAttribute('x2', dsx.toFixed(1)); linkLine.setAttribute('y2', dsy.toFixed(1));
    linkAnchor.setAttribute('cx', tx.toFixed(1)); linkAnchor.setAttribute('cy', ty.toFixed(1));
    linkAnchor.setAttribute('r', 4);
    link.classList.add('is-shown');
  }

  function frame() {
    raf = 0;
    if (!visible || staticMode) return;
    const g = progress();
    const vt = g * duration;
    setActive(vt < BOUND1 ? 0 : vt < BOUND2 ? 1 : 2);
    if (scrub && video.readyState >= 1) { seekTarget = vt; applySeek(); }
    if (markersOn && activeIdx >= 0) positionMarkers(g);
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
