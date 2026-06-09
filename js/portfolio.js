/**
 * Portfolio filter and business area navigation
 */
(function () {
  'use strict';

  var FILTER_DURATION = 420;
  var filterBtns = document.querySelectorAll('.filter-btn');
  var portfolioItems = document.querySelectorAll('.portfolio-item');
  var businessCards = document.querySelectorAll('.business-card');
  var portfolioGrid = document.querySelector('.portfolio__grid');
  var currentFilter = 'all';
  var isAnimating = false;

  portfolioItems.forEach(function (item) {
    var img = item.querySelector('.portfolio-item__img');
    if (!img) return;

    var jpgSrc = img.getAttribute('src') || '';
    var svgSrc = jpgSrc.replace(/\.jpe?g$/i, '.svg');

    if (!item.querySelector('.portfolio-item__bg')) {
      var bg = document.createElement('div');
      bg.className = 'portfolio-item__bg';
      bg.setAttribute('aria-hidden', 'true');
      bg.style.backgroundImage = 'url("' + svgSrc + '")';
      item.insertBefore(bg, img);
    }
  });

  function itemShouldShow(item, filterValue) {
    var category = item.getAttribute('data-category');
    return filterValue === 'all' || category === filterValue;
  }

  function updateFilterButtons(filterValue) {
    filterBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filterValue);
    });
  }

  function setItemVisibility(item, show) {
    item.classList.toggle('hidden', !show);
    item.setAttribute('aria-hidden', show ? 'false' : 'true');
  }

  function clearMotionClasses() {
    portfolioItems.forEach(function (item) {
      item.classList.remove('is-hiding', 'is-appearing');
    });
    if (portfolioGrid) portfolioGrid.classList.remove('is-filtering');
  }

  function animateAppear(item) {
    item.classList.add('is-appearing');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        item.classList.remove('is-appearing');
      });
    });
  }

  function applyFilterWithFallback(filterValue) {
    if (portfolioGrid) portfolioGrid.classList.add('is-filtering');

    portfolioItems.forEach(function (item) {
      var show = itemShouldShow(item, filterValue);
      var wasHidden = item.classList.contains('hidden');

      if (!show && !wasHidden) {
        item.classList.add('is-hiding');
      }
    });

    window.setTimeout(function () {
      portfolioItems.forEach(function (item) {
        var show = itemShouldShow(item, filterValue);
        var wasHidden = item.classList.contains('hidden');

        item.classList.remove('is-hiding');

        if (show && wasHidden) {
          setItemVisibility(item, true);
          animateAppear(item);
        } else if (!show) {
          setItemVisibility(item, false);
        }
      });

      if (portfolioGrid) portfolioGrid.classList.remove('is-filtering');
      currentFilter = filterValue;
      isAnimating = false;
    }, FILTER_DURATION);
  }

  function applyFilter(filterValue) {
    if (filterValue === currentFilter || isAnimating) return;

    isAnimating = true;
    updateFilterButtons(filterValue);
    clearMotionClasses();

    var previouslyHidden = [];
    portfolioItems.forEach(function (item) {
      if (item.classList.contains('hidden')) previouslyHidden.push(item);
    });

    var commitFilter = function () {
      portfolioItems.forEach(function (item) {
        setItemVisibility(item, itemShouldShow(item, filterValue));
      });
      currentFilter = filterValue;
    };

    var finishTransition = function () {
      portfolioItems.forEach(function (item) {
        if (itemShouldShow(item, filterValue) && previouslyHidden.indexOf(item) !== -1) {
          animateAppear(item);
        }
      });
      isAnimating = false;
    };

    if (typeof document.startViewTransition === 'function') {
      var transition = document.startViewTransition(commitFilter);
      if (transition && typeof transition.finished.then === 'function') {
        transition.finished.then(finishTransition).catch(function () {
          isAnimating = false;
        });
      } else {
        finishTransition();
      }
      return;
    }

    applyFilterWithFallback(filterValue);
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  businessCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var filter = card.getAttribute('data-filter-target');
      if (!filter) return;

      var portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }

      window.setTimeout(function () {
        applyFilter(filter);
      }, 400);
    });
  });

  if (window.location.hash === '#portfolio') {
    var params = new URLSearchParams(window.location.search);
    var filter = params.get('filter');
    if (filter) {
      window.setTimeout(function () {
        currentFilter = '';
        applyFilter(filter);
      }, 300);
    }
  }
})();
