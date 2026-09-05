/**
 * Injecte l'année courante dans l'élément `.cv__year` du footer.
 */
function initYear() {
  const year                 = document.querySelector('.cv__year');
  if (year) year.textContent = String(new Date().getFullYear());
}

/**
 * Active/désactive le header sticky en comparant `window.pageYOffset`
 * à `sentinel.offsetTop`.
 *
 * `offsetTop` est toujours à jour sans recalcul explicite : il reflète
 * le layout actuel, que ce soit après un scroll ou un resize.
 * La largeur et la position left du header sticky sont calquées sur `.cv`
 * via `getBoundingClientRect()` au moment de l'activation.
 */
function initStickyHeader() {
  const header   = document.querySelector('.cv__header');
  if (!header) return;

  const cv       = document.querySelector('.cv');
  const sentinel = document.querySelector('.cv__header-sentinel');

  /**
   * Applique ou retire l'état sticky et ajuste left/width sur `.cv`.
   *
   * @param {boolean} isAbove - true si le scroll dépasse le seuil du header
   */
  function applySticky(isAbove) {
    header.classList.toggle('cv__header--sticky', isAbove);
    if (isAbove && cv) {
      const rect = cv.getBoundingClientRect();
      header.style.left  = rect.left + 'px';
      header.style.width = rect.width + 'px';
    } else {
      header.removeAttribute('style');
    }
  }

  /** Retourne la position absolue du sentinel depuis le haut du document. */
  function getThreshold() {
    return sentinel.offsetTop;
  }

  /** Vérifie si le scroll dépasse le seuil du header. */
  function isAbove() {
    return window.pageYOffset > getThreshold();
  }

  window.addEventListener('scroll', function () {
    applySticky(isAbove());
  });

  window.addEventListener('resize', function () {
    applySticky(isAbove());
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initYear();
  initStickyHeader();
});
