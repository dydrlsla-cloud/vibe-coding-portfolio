/**
 * Portfolio lightbox — click to view full image
 */
(function () {
  'use strict';

  var lightbox = document.getElementById('portfolioLightbox');
  if (!lightbox) return;

  var backdrop = lightbox.querySelector('.lightbox__backdrop');
  var closeBtn = lightbox.querySelector('.lightbox__close');
  var lightboxImg = lightbox.querySelector('.lightbox__img');
  var lightboxTitle = lightbox.querySelector('.lightbox__title');
  var lightboxDesc = lightbox.querySelector('.lightbox__desc');
  var items = document.querySelectorAll('.portfolio-item');

  function openLightbox(item) {
    var img = item.querySelector('.portfolio-item__img');
    var title = item.querySelector('.portfolio-item__overlay h4');
    var desc = item.querySelector('.portfolio-item__overlay p');

    if (!img) return;

    lightboxImg.src = img.getAttribute('src');
    lightboxImg.alt = img.getAttribute('alt') || '';
    lightboxTitle.textContent = title ? title.textContent : '';
    lightboxDesc.textContent = desc ? desc.textContent : '';

    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  items.forEach(function (item) {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');

    item.addEventListener('click', function () {
      openLightbox(item);
    });

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
