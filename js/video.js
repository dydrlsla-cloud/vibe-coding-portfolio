/**
 * Autoplay videos — muted loop with viewport fallback
 */
(function () {
  'use strict';

  var videos = document.querySelectorAll('video[autoplay]');

  videos.forEach(function (video) {
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.playsInline = true;

    function tryPlay() {
      var promise = video.play();
      if (promise && typeof promise.catch === 'function') {
        promise.catch(function () {});
      }
    }

    tryPlay();

    video.addEventListener('loadeddata', tryPlay);

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              tryPlay();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(video);
    }
  });
})();
