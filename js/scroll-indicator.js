/**
 * Fixed scroll indicator — follows viewport, adapts to section background
 */
(function () {
  'use strict';

  var indicator = document.getElementById('scrollIndicator');
  if (!indicator) return;

  var contactSection = document.getElementById('contact');
  var footer = document.querySelector('.footer');
  var lightSections = ['partners'];

  function getActiveSection() {
    var centerY = window.scrollY + window.innerHeight * 0.85;
    var sections = document.querySelectorAll('section[id]');
    var active = null;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      if (centerY >= top && centerY < bottom) {
        active = section;
      }
    });

    return active;
  }

  function updateIndicator() {
    var scrollBottom = window.scrollY + window.innerHeight;
    var docHeight = document.documentElement.scrollHeight;
    var hideAtContact = contactSection && scrollYNear(contactSection.offsetTop - window.innerHeight * 0.3);

    if (hideAtContact || scrollBottom >= docHeight - 40) {
      indicator.classList.add('is-hidden');
      return;
    }

    indicator.classList.remove('is-hidden');

    var active = getActiveSection();
    var isLight = active && lightSections.indexOf(active.id) !== -1;

    indicator.classList.toggle('scroll-indicator--light', isLight);
    indicator.classList.toggle('scroll-indicator--dark', !isLight);
  }

  function scrollYNear(threshold) {
    return window.scrollY >= threshold;
  }

  window.addEventListener('scroll', updateIndicator, { passive: true });
  window.addEventListener('resize', updateIndicator, { passive: true });
  updateIndicator();
})();
