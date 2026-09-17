/* Footer link groups: plain columns on desktop, a tap-to-expand accordion on mobile only.
   Desktop needs no JS (columns are shown by CSS); this only wires the mobile toggle and the
   matching button semantics. The smooth open/close is CSS (grid-template-rows transition). */

const container = document.querySelector('[data-footer-acc]');
if (container) {
  const mq = matchMedia('(max-width: 767px)');
  const groups = Array.from(container.querySelectorAll('.site-footer__group'));

  function toggle(group) {
    const open = group.toggleAttribute('data-open');
    group.querySelector('.site-footer__group-title').setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  // Add/remove button semantics as the viewport crosses the breakpoint.
  function sync() {
    const mobile = mq.matches;
    for (const g of groups) {
      const title = g.querySelector('.site-footer__group-title');
      if (mobile) {
        title.setAttribute('role', 'button');
        title.setAttribute('tabindex', '0');
        title.setAttribute('aria-expanded', g.hasAttribute('data-open') ? 'true' : 'false');
      } else {
        title.removeAttribute('role');
        title.removeAttribute('tabindex');
        title.removeAttribute('aria-expanded');
        g.removeAttribute('data-open'); // desktop is always fully open
      }
    }
  }

  for (const g of groups) {
    const title = g.querySelector('.site-footer__group-title');
    title.addEventListener('click', () => { if (mq.matches) toggle(g); });
    title.addEventListener('keydown', (e) => {
      if (mq.matches && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(g); }
    });
  }

  mq.addEventListener('change', sync);
  sync();
}
