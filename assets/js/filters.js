
/* =========================================
   TBILISI VISITS — UNIVERSAL FILTERS
   Automatic counters + optional filtering
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  const CARD_SELECTOR = [
    ".tv-square-card",
    ".tv-rectangle-card"
  ].join(", ");

  const COUNTER_SELECTOR = ".tv-filter-count";

  const FILTER_SELECTOR =
    ".tv-filters .tv-filter[data-filter]";

  const counters = document.querySelectorAll(
    COUNTER_SELECTOR
  );

  const initialized = new Set();


  /* =========================================
     FIND CARDS FOR A COUNTER
  ========================================= */

  function findGroup(counter) {

    let element = counter.parentElement;

    while (element && element !== document.body) {

      const cards = element.querySelectorAll(
        CARD_SELECTOR
      );

      if (cards.length) {
        return element;
      }

      element = element.parentElement;

    }

    return null;

  }


  /* =========================================
     INITIALIZE EACH GROUP
  ========================================= */

  counters.forEach(function (counter) {

    const group = findGroup(counter);

    if (!group) return;

    if (initialized.has(group)) return;

    initialized.add(group);


    /* =====================================
       ELEMENTS
    ====================================== */

    const cards = Array.from(
      group.querySelectorAll(CARD_SELECTOR)
    );

    const filters = group.querySelectorAll(
      FILTER_SELECTOR
    );

    const total = cards.length;


    /* =====================================
       UPDATE COUNTER
    ====================================== */

    function updateCounter() {

      const visible = cards.filter(function (card) {

        return getComputedStyle(card).display !== "none";

      }).length;

      const groupCounters = group.querySelectorAll(
        COUNTER_SELECTOR
      );

      groupCounters.forEach(function (item) {

        const strong = item.querySelector("strong");

        if (strong) {
          strong.textContent =
            `Showing ${visible} out of ${total}`;
        }

      });

    }


    /* =====================================
       APPLY FILTER
    ====================================== */

    function applyFilter(category) {

      cards.forEach(function (card) {

        const categories = (
          card.dataset.category || ""
        ).trim().split(/\s+/);

        const matches =
          category === "all" ||
          categories.includes(category);

        card.style.display =
          matches ? "" : "none";

      });


      /* ACTIVE BUTTONS */

      filters.forEach(function (button) {

        const active =
          button.dataset.filter === category;

        button.classList.toggle(
          "active",
          active
        );

        button.setAttribute(
          "aria-pressed",
          String(active)
        );

      });


      updateCounter();

    }


    /* =====================================
       FILTER EVENTS
    ====================================== */

    filters.forEach(function (button) {

      button.addEventListener("click", function () {

        applyFilter(button.dataset.filter);

      });

    });


    /* =====================================
       INITIAL STATE
    ====================================== */

    if (filters.length) {

      const activeFilter = Array.from(
        filters
      ).find(function (button) {

        return button.classList.contains(
          "active"
        );

      });

      applyFilter(
        activeFilter
          ? activeFilter.dataset.filter
          : "all"
      );

    } else {

      updateCounter();

    }

  });

});
