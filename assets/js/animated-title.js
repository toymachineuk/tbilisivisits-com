
/* =========================================
   TBILISI VISITS — HERO TITLE ANIMATION

   - Letter-by-letter main title
   - Keeps words together on mobile
   - Smooth secondary title reveal
   - Plays once when entering viewport
   - Replays after scrolling away and back
   - No external libraries
========================================= */

(() => {
  "use strict";

  function initHeroAnimation() {

    const hero = document.querySelector(
      ".tv-editorial-hero"
    );

    if (!hero) return;

    const main = hero.querySelector(
      ".hero-title-main.ml2"
    );

    const secondary = hero.querySelector(
      ".hero-title-secondary"
    );

    if (!main || !secondary) return;

    // Respect reduced-motion preferences

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    /* =====================================
       01. WRAP WORDS AND LETTERS
    ===================================== */

    if (!main.querySelector(".hero-word")) {

      const text = main.textContent.trim();
      const fragment = document.createDocumentFragment();

      let letterIndex = 0;

      text.split(/\s+/).forEach((word, wordIndex) => {

        // Preserve spaces between words

        if (wordIndex > 0) {
          fragment.appendChild(
            document.createTextNode(" ")
          );
        }

        // Keep each word together

        const wordSpan = document.createElement("span");
        wordSpan.className = "hero-word";

        // Create animated letters

        Array.from(word).forEach(char => {

          const letter = document.createElement("span");

          letter.className = "letter";
          letter.textContent = char;

          letter.style.setProperty(
            "--i",
            letterIndex++
          );

          wordSpan.appendChild(letter);

        });

        fragment.appendChild(wordSpan);

      });

      main.replaceChildren(fragment);
    }

    /* =====================================
       02. ANIMATION STATE
    ===================================== */

    let isActive = false;

    /* =====================================
       03. PLAY ANIMATION
    ===================================== */

    function playAnimation() {

      if (isActive) return;

      isActive = true;

      // Restart animations cleanly

      hero.classList.remove("hero-animate");

      // Force browser reflow

      void hero.offsetWidth;

      hero.classList.add("hero-animate");
    }

    /* =====================================
       04. RESET ANIMATION
    ===================================== */

    function resetAnimation() {

      if (!isActive) return;

      isActive = false;

      hero.classList.remove("hero-animate");
    }

    /* =====================================
       05. VIEWPORT OBSERVER
    ===================================== */

    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {

          playAnimation();

        } else {

          resetAnimation();

        }

      },
      {
        threshold: 0.15
      }
    );

    observer.observe(hero);

  }

  /* =====================================
     06. INITIALISE
  ===================================== */

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initHeroAnimation
    );

  } else {

    initHeroAnimation();

  }

})();
