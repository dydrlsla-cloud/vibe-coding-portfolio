/**
 * Portfolio filter and business area navigation
 */
(function () {
  'use strict';

  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const businessCards = document.querySelectorAll('.business-card');

  portfolioItems.forEach(function (item) {
    const img = item.querySelector('.portfolio-item__img');
    if (!img) return;

    const jpgSrc = img.getAttribute('src') || '';
    const svgSrc = jpgSrc.replace(/\.jpe?g$/i, '.svg');

    if (!item.querySelector('.portfolio-item__bg')) {
      const bg = document.createElement('div');
      bg.className = 'portfolio-item__bg';
      bg.setAttribute('aria-hidden', 'true');
      bg.style.backgroundImage = 'url("' + svgSrc + '")';
      item.insertBefore(bg, img);
    }
  });

  function applyFilter(filterValue) {
    filterBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filterValue);
    });

    portfolioItems.forEach(function (item) {
      const category = item.getAttribute('data-category');
      const show = filterValue === 'all' || category === filterValue;
      item.classList.toggle('hidden', !show);
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  businessCards.forEach(function (card) {
    card.addEventListener('click', function () {
      const filter = card.getAttribute('data-filter-target');
      if (!filter) return;

      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }

      setTimeout(function () {
        applyFilter(filter);
      }, 400);
    });
  });

  if (window.location.hash === '#portfolio') {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get('filter');
    if (filter) {
      setTimeout(function () {
        applyFilter(filter);
      }, 300);
    }
  }
})();
