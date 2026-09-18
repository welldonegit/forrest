/* Header: transparent spruce ink over the hero sky; once the page is scrolled it gains an air
   background with a bottom hairline. The ink colour never changes — readability is by colour. */
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });
}
