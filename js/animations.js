/**
 * Scroll animations using Intersection Observer
 */
(function () {
  'use strict';

  const animatedElements = document.querySelectorAll('[data-animate]');

  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(function (el) {
      el.classList.add('animated');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(function () {
            entry.target.classList.add('animated');
          }, parseInt(delay, 10));
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });
})();
