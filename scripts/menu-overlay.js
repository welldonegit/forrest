/* MenuOverlay — full-screen navigation (DESIGN.md §7, §8). Open/close orchestration lives in CSS
   (.is-open); this module wires behaviour: scroll lock, inert on the rest of the page, focus trap,
   Esc + close button + link-click to close, and focus return to the trigger. */
const overlay = document.querySelector('[data-menu]');
const openBtn = document.querySelector('[data-menu-open]');

if (overlay && openBtn) {
  const page = document.getElementById('top');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const CLOSE_MS = 560;               // field fade (300ms hold + 250ms) — matches menu-overlay.css
  let lastFocus = null;
  let closeTimer = 0;

  const focusable = () => Array.from(overlay.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter((el) => el.offsetParent !== null);

  function siblings() {
    return page ? Array.from(page.children).filter((el) => el !== overlay) : [];
  }

  function open() {
    if (overlay.classList.contains('is-open')) return;
    clearTimeout(closeTimer);
    lastFocus = document.activeElement;
    overlay.hidden = false;
    void overlay.offsetWidth;                 // reflow so the enter transition runs from the base state
    overlay.classList.add('is-open');
    document.documentElement.classList.add('is-menu-open');
    siblings().forEach((el) => { el.inert = true; });
    openBtn.setAttribute('aria-expanded', 'true');
    (focusable()[0] || overlay).focus();
  }

  function close() {
    if (!overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    document.documentElement.classList.remove('is-menu-open');
    siblings().forEach((el) => { el.inert = false; });
    openBtn.setAttribute('aria-expanded', 'false');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    const done = () => { overlay.hidden = true; };
    clearTimeout(closeTimer);
    if (reduce.matches) done();
    else closeTimer = setTimeout(done, CLOSE_MS);
  }

  openBtn.addEventListener('click', open);
  for (const el of overlay.querySelectorAll('[data-menu-close]')) el.addEventListener('click', close);

  // A nav link / card / messenger navigates in-page: close the overlay, let the hash jump proceed.
  overlay.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (link && !link.hasAttribute('data-menu-close')) close();
  });

  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusable();
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}
