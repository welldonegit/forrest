/* Plan → room "portal dive". Clicking a plan card rushes the viewer through the plan image and
   lands in the room render (assets/photo.jpg). The zoom is anchored to where you clicked (the
   card centre), driven by CSS keyframes toggled with .is-open. Progressive enhancement; the
   room image is loaded lazily on first open; prefers-reduced-motion is handled in CSS. */
// Resolve the room render through Vite so it is emitted into the build with a hashed name.
// A bare string ('assets/photo.jpg') is invisible to the bundler and 404s in production.
const roomSrc = new URL('../assets/photo.jpg', import.meta.url).href;

const portal = document.querySelector('[data-portal]');
const cards = Array.from(document.querySelectorAll('.plans__card'));

if (portal && cards.length) {
  const planImg = portal.querySelector('[data-portal-plan]');
  const roomImg = portal.querySelector('[data-portal-room]');
  const caption = portal.querySelector('[data-portal-caption]');
  const closeBtn = portal.querySelector('[data-portal-close]');
  let isOpen = false;
  let lastFocus = null;

  // Warm the room render immediately (it's hidden behind a 0% iris, so nothing shows). Decoding it
  // up-front is what makes the *first* dive smooth: otherwise photo.jpg decodes on the main thread
  // mid-animation, drops frames, and the plan appears to lurch/"fly" at you. Cached from #2 on.
  roomImg.src = roomSrc;

  async function open(card, label, trigger) {
    const img = card.querySelector('.plans__image');
    if (!img) return;
    const r = img.getBoundingClientRect();
    portal.style.setProperty('--px', ((r.left + r.width / 2) / window.innerWidth * 100).toFixed(2) + '%');
    portal.style.setProperty('--py', ((r.top + r.height / 2) / window.innerHeight * 100).toFixed(2) + '%');
    planImg.src = img.currentSrc || img.src;
    caption.textContent = label;
    lastFocus = trigger || null;

    // Both frames fully decoded before the dive starts → the first open animates as cleanly as the
    // rest. decode() is best-effort; if it rejects (e.g. cache miss race) we open anyway.
    try { await Promise.all([planImg.decode?.(), roomImg.decode?.()].filter(Boolean)); } catch (e) { /* open regardless */ }
    if (isOpen) return;                // guard against a double-click landing mid-decode

    portal.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    void portal.offsetWidth;           // restart the keyframes from a clean state
    portal.classList.add('is-open');
    isOpen = true;
    closeBtn.focus({ preventScroll: true });
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    portal.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    setTimeout(() => { if (!isOpen) portal.hidden = true; }, 300);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  cards.forEach((card) => {
    const name = (card.querySelector('.plans__name')?.textContent || '').trim();
    const area = (card.querySelector('.plans__area')?.textContent || '').trim();
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'plans__open';
    btn.setAttribute('aria-label', `Відкрити 3D-перегляд: ${name} ${area}`.trim());
    btn.addEventListener('click', () => open(card, [name, area].filter(Boolean).join(' · '), btn));
    card.appendChild(btn);
  });

  closeBtn.addEventListener('click', close);
  portal.addEventListener('click', (e) => { if (e.target === portal) close(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen) close(); });
}
