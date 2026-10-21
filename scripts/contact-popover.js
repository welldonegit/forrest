/* Header contact popover — "Зв'яжіться з нами" discloses a panel with the phone + messengers.
   Toggle on click, close on outside click / Esc / choosing an option. */
const wrap = document.querySelector('[data-contact]');
if (wrap) {
  const btn = wrap.querySelector('[data-contact-toggle]');
  const pop = wrap.querySelector('[data-contact-pop]');

  const open = () => { wrap.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); };
  const close = () => {
    if (!wrap.classList.contains('is-open')) return;
    wrap.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    wrap.classList.contains('is-open') ? close() : open();
  });
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); btn.focus(); } });
  pop && pop.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
}
