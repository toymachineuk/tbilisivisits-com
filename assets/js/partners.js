/* =========================================
   PARTNERS — AUTO SCROLL
========================================= */

function initPartners() {

  document.querySelectorAll(".tv-partners-track").forEach((track) => {

    if (track.dataset.partnersInitialized) return;

    track.dataset.partnersInitialized = "true";

    let direction = 1;
    let paused = false;
    let resumeTimer;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const speed = 1;
    const interval = 40;


    /* AUTOMATIC MOVEMENT */

    setInterval(() => {

      if (paused || reducedMotion.matches || document.hidden) {
        return;
      }

      const maxScroll =
        track.scrollWidth - track.clientWidth;

      if (maxScroll <= 0) return;

      if (track.scrollLeft >= maxScroll - 1) {
        direction = -1;
      }

      if (track.scrollLeft <= 0) {
        direction = 1;
      }

      track.scrollLeft += speed * direction;

    }, interval);


    /* PAUSE */

    function pause() {
      clearTimeout(resumeTimer);
      paused = true;
    }


    /* RESUME */

    function resume() {

      clearTimeout(resumeTimer);

      resumeTimer = setTimeout(() => {
        paused = false;
      }, 2000);

    }


    /* DESKTOP */

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);


    /* MOBILE */

    track.addEventListener("touchstart", pause, {
      passive: true
    });

    track.addEventListener("touchend", resume, {
      passive: true
    });

    track.addEventListener("touchcancel", resume);


    /* KEYBOARD */

    track.addEventListener("focusin", pause);
    track.addEventListener("focusout", resume);

  });

}


/* INITIALISE */

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initPartners
  );

} else {

  initPartners();

}