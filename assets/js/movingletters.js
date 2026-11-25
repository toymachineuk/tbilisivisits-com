/* =========================================================
   TV MOVING ANIMATION — UNIVERSAL ML8
========================================================= */

(function () {

  function initMovingAnimations() {

    if (typeof anime !== 'function') {
      console.warn('Moving animation: Anime.js is not loaded.');
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    document.querySelectorAll('.tv-moving-animation').forEach(function (container) {

      if (container.dataset.animationInitialized) return;

      const greeting = container.querySelector('.ml8');

      if (!greeting) return;

      const target = selector => greeting.querySelector(selector);


      /* GREETING TIMELINE */

      const timeline = anime.timeline({
        loop: false,
        autoplay: false
      });

      timeline

        .add({
          targets: target('.circle-white'),
          scale: [0, 3],
          opacity: [1, 0],
          easing: 'easeInOutExpo',
          rotateZ: 360,
          duration: 1100
        })

        .add({
          targets: target('.circle-container'),
          scale: [0, 1],
          duration: 1100,
          easing: 'easeInOutExpo',
          offset: '-=1000'
        })

        .add({
          targets: target('.circle-dark'),
          scale: [0, 1],
          duration: 1100,
          easing: 'easeOutExpo',
          offset: '-=600'
        })

        .add({
          targets: target('.letters-left'),
          scale: [0, 1],
          duration: 1200,
          offset: '-=550'
        })

        .add({
          targets: target('.bang'),
          scale: [0, 1],
          opacity: [0, 1],
          rotateZ: 15,
          duration: 1200,
          offset: '-=1000'
        });


      /* CONTINUOUS CIRCLE ROTATION */

      const rotation = anime({
        targets: target('.circle-dark-dashed'),
        rotateZ: 360,
        duration: 8000,
        easing: 'linear',
        loop: true,
        autoplay: false
      });


      /* PLAY ONCE */

      function playAnimation() {
        timeline.play();
        rotation.play();
      }


      /* PLAY WHEN VISIBLE */

      if ('IntersectionObserver' in window) {

        const observer = new IntersectionObserver(function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {
              playAnimation();
              observer.unobserve(container);
            }

          });

        }, {
          threshold: 0.15
        });

        observer.observe(container);

      } else {

        playAnimation();

      }

      container.dataset.animationInitialized = 'true';

    });

  }


  /* INITIALIZATION */

  if (document.readyState === 'loading') {

    document.addEventListener(
      'DOMContentLoaded',
      initMovingAnimations
    );

  } else {

    initMovingAnimations();

  }

})();