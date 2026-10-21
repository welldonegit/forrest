/* Header behaviour:
   - .is-scrolled: once the page is scrolled it gains the hairline-bottom state.
   - .is-hidden: hide on scroll down, reveal on scroll up (always visible near the top).
   The ink colour never changes — readability is by colour. */
const header = document.querySelector('.site-header');
if (header) {
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);

    const delta = y - lastY;
    if (Math.abs(delta) > 4) {
      // Hide when scrolling down past the first ~120px; reveal on any upward move or near the top.
      if (delta > 0 && y > 120) header.classList.add('is-hidden');
      else header.classList.remove('is-hidden');
      lastY = y;
    }
    if (y <= 120) header.classList.remove('is-hidden');
  };

  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };

  update();
  addEventListener('scroll', onScroll, { passive: true });
}
