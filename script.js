
/* =============================================
   GLOW & GO TRAVEL
   Complete website JavaScript
   GitHub Pages — images stored at repository root
   ============================================= */

(() => {
  "use strict";

  /* ===========================================
     PAGE NAVIGATION
     =========================================== */

  const routes = new Set([
    "home",
    "about",
    "why-book",
    "destinations",
    "journal",
    "stories",
    "reviews",
    "book",
    "contact",
    "privacy"
  ]);

  const nav = document.getElementById("site-nav");
  const menu = document.querySelector(".menu-toggle");
  const sticky = document.querySelector(".sticky-cta");

  function closeMenu() {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open navigation");
    menu.textContent = "☰";
  }

  function showPage() {
    const requested = location.hash.startsWith("#/")
      ? location.hash.slice(2).split("/")[0]
      : "home";

    const current = routes.has(requested)
      ? requested
      : "home";

    document.querySelectorAll("[data-page]").forEach(page => {
      page.hidden = page.dataset.page !== current;
    });

    document.querySelectorAll(".nav a").forEach(link => {
      if (link.getAttribute("href") === `#/${current}`) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    const pageTitle =
      current === "home"
        ? "Escape Ordinary. Embrace Freedom."
        : current === "journal"
          ? "Becky's Journal"
          : current.split("-").map(word =>
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(" ");

    document.title = `${pageTitle} | glow & go travel`;

    closeMenu();
    window.scrollTo(0, 0);
  }

  menu.addEventListener("click", () => {
    const open = !nav.classList.contains("open");

    nav.classList.toggle("open", open);
    menu.textContent = open ? "×" : "☰";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation"
    );
  });

  document.addEventListener("click", event => {
    if (
      nav.classList.contains("open") &&
      !nav.contains(event.target) &&
      !menu.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("hashchange", showPage);

  showPage();

  document.getElementById("year").textContent =
    new Date().getFullYear();

  /* ===========================================
     STICKY BOOKING BUTTON
     =========================================== */

  function updateSticky() {
    sticky.classList.toggle("visible", window.scrollY > 450);
  }

  window.addEventListener("scroll", updateSticky, {
    passive: true
  });

  updateSticky();

  /* ===========================================
     HOME REVIEW CAROUSEL
     =========================================== */

  const reviews = [
    {
      text: "“Becky was an absolute superstar!”",
      by: "Gemma, Canada"
    },
    {
      text: "“We had a fabulous time and everything went according to plan.”",
      by: "Julie, Norwegian fjords"
    },
    {
      text: "“Oh Becky you did good!!!!!!!”",
      by: "Nicola, Gran Canaria"
    },
    {
      text: "“Great communication throughout and easy booking.”",
      by: "Sarah, Egypt"
    },
    {
      text: "“Five stars all the way!”",
      by: "Catherine, Canada"
    },
    {
      text: "“Becky helped me every step of the way!”",
      by: "Rachel, Mediterranean cruise"
    }
  ];

  let activeReview = 0;

  function updateReview() {
    document.getElementById("slider-quote").textContent =
      reviews[activeReview].text;

    document.getElementById("slider-by").textContent =
      reviews[activeReview].by;
  }

  document.getElementById("review-prev").addEventListener(
    "click",
    () => {
      activeReview =
        (activeReview + reviews.length - 1) % reviews.length;

      updateReview();
    }
  );

  document.getElementById("review-next").addEventListener(
    "click",
    () => {
      activeReview =
        (activeReview + 1) % reviews.length;

      updateReview();
    }
  );

  /* ===========================================
     PHOTO ALBUM DATA

     IMPORTANT:
     All filenames below are ROOT filenames.
     No "assets/" prefix.
     =========================================== */

  const albums = [
    /* BECKY — CRETE */
    {
      id: "albums-crete",
      group: "becky",
      title: "Crete, Greece",
      place: "Becky's travels",
      cover: "becky-crete-pool-sunset.jpg",
      images: [
        "becky-crete-camel.jpg",
        "becky-crete-beach.jpg",
        "becky-crete-pool-sunset.jpg",
        "becky-crete-night-view.jpg",
        "becky-crete-lobby.jpg",
        "becky-crete-poolside.jpg",
        "becky-crete-harbour.jpg",
        "becky-crete-holiday-selfie.jpg",
        "becky-crete-room.jpg"
      ]
    },

    /* BECKY — SARDINIA */
    {
      id: "albums-sardinia",
      group: "becky",
      title: "Sardinia, Italy",
      place: "Becky's travels",
      cover: "becky-sardinia-resort-view.jpg",
      images: [
        "becky-sardinia-night-harbour.jpg",
        "becky-sardinia-resort-view.jpg",
        "becky-sardinia-bedroom.jpg",
        "becky-sardinia-cabana.jpg",
        "becky-sardinia-pool.jpg",
        "becky-sardinia-lake.jpg",
        "becky-sardinia-sea-view.jpg",
        "becky-sardinia-spa.jpg",
        "becky-sardinia-sunset-arch.jpg"
      ]
    },

    /* BECKY — EGYPT */
    {
      id: "albums-egypt",
      group: "becky",
      title: "Sharm El Sheikh, Egypt",
      place: "Becky's travels",
      cover: "becky-egypt-seaside-swing.jpg",
      images: [
        "becky-egypt-seaside-swing.jpg",
        "becky-egypt-mosque.jpg",
        "becky-egypt-desert-selfie.jpg",
        "becky-egypt-boat-photo.jpg",
        "becky-egypt-quad-bike.jpg",
        "becky-egypt-evening.jpg",
        "becky-egypt-reef.jpg"
      ]
    },

    /* BECKY — MSC VIRTUOSA */
    {
      id: "albums-msc",
      group: "becky",
      title: "MSC Virtuosa Cruise",
      place: "Becky's travels",
      cover: "becky-msc-staircase.jpg",
      images: [
        "becky-msc-drinks.jpg",
        "becky-msc-port-sunset.jpg",
        "becky-msc-staircase.jpg",
        "becky-msc-theatre.jpg",
        "becky-msc-gallery.jpg",
        "becky-msc-sunset.jpg",
        "becky-msc-pool-deck.jpg"
      ]
    },

    /* CLIENT — RACHEL */
    {
      id: "albums-rachel",
      group: "client",
      title: "Rachel's Photo Album",
      place: "Mediterranean",
      cover: "rachel-historic-library.jpg",
      images: [
        "rachel-sea-rocks.jpg",
        "rachel-ancient-arch.jpg",
        "rachel-archaeology-site.jpg",
        "rachel-city-ruins.jpg",
        "rachel-sea-sunset.jpg",
        "rachel-ancient-site.jpg",
        "rachel-acropolis.jpg",
        "rachel-beach.jpg",
        "rachel-lighthouse.jpg",
        "rachel-orange-sunset.jpg",
        "rachel-historic-library.jpg"
      ]
    },

    /* CLIENT — KAREN */
    {
      id: "albums-karen",
      group: "client",
      title: "Karen's Photo Album",
      place: "Montenegro",
      cover: "karen-sunset-drinks.jpg",
      images: [
        "karen-sunset-drinks.jpg",
        "karen-sea-cave-boat.jpg",
        "karen-cable-car-station.jpg",
        "karen-turquoise-sea-cave.jpg",
        "karen-sunny-selfie.jpg",
        "karen-golden-sunset.jpg",
        "karen-twilight-bay.jpg",
        "karen-kotor-bay-view.jpg",
        "karen-boat-trip.jpg"
      ]
    },

    /* CLIENT — JULIE */
    {
      id: "albums-julie",
      group: "client",
      title: "Julie's Photo Album",
      place: "Norwegian fjords",
      cover: "julie-fjord-cabin.jpg",
      images: [
        "julie-fjord-cabin.jpg",
        "julie-mountain-lake.jpg",
        "julie-sunlit-fjord.jpg",
        "julie-fjord-village.jpg",
        "julie-forest-rapids.jpg",
        "julie-turquoise-lake.jpg"
      ]
    }
  ];

  /* ===========================================
     GENERATE PHOTO ALBUM CARDS
     =========================================== */

  function escapeHtml(value) {
    return String(value).replace(
      /[&<>"']/g,
      character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]
    );
  }

  function makePhotoLabel(filename) {
    return filename
      .replace(
        /^becky-(crete|sardinia|egypt|msc)-|^(rachel|karen|julie)-/,
        ""
      )
      .replace(/\.jpg$/i, "")
      .replace(/-/g, " ");
  }

  function createAlbum(album) {
    const gridId =
      album.group === "becky"
        ? "becky-album-grid"
        : "client-album-grid";

    const grid = document.getElementById(gridId);

    if (!grid) {
      return;
    }

    const photoButtons = album.images.map(filename => {
      const caption =
        `${album.title} — ${makePhotoLabel(filename)}`;

      return `
        <button
          type="button"
          class="gallery-card"
          data-image="${filename}"
          data-caption="${escapeHtml(caption)}"
        >
          <img
            src="${filename}"
            alt="${escapeHtml(caption)}"
            loading="lazy"
          >
          <span>View photo &nearr;</span>
        </button>
      `;
    }).join("");

    const albumHtml = `
      <div id="${album.id}">
        <details class="photo-album">
          <summary>
            <img
              src="${album.cover}"
              alt="${escapeHtml(album.title)} cover"
              loading="lazy"
            >

            <span class="album-cover-text">
              <strong>${escapeHtml(album.title)}</strong>

              <small>
                ${album.images.length} photos ·
                ${escapeHtml(album.place)}
              </small>

              <span>Open album &nearr;</span>
            </span>
          </summary>

          <div class="album-inner">
            <div class="album-toolbar">
              <h3>${escapeHtml(album.title)}</h3>
              <span>${album.images.length} photographs</span>
            </div>

            <div class="album-photo-grid">
              ${photoButtons}
            </div>
          </div>
        </details>
      </div>
    `;

    grid.insertAdjacentHTML("beforeend", albumHtml);
  }

  albums.forEach(createAlbum);

  /* ===========================================
     JOURNAL "VIEW ALBUM" LINKS
     =========================================== */

  document.querySelectorAll("[data-album-link]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      const section = document.getElementById(
        link.dataset.albumLink
      );

      if (!section) {
        return;
      }

      const details = section.querySelector("details");

      if (details) {
        details.open = true;
      }

      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  /* ===========================================
     MAIN GALLERY FILTERS
     =========================================== */

  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      document.querySelectorAll("[data-filter]").forEach(other => {
        other.setAttribute(
          "aria-pressed",
          String(other === button)
        );
      });

      document
        .querySelectorAll(".gallery-grid .gallery-card")
        .forEach(card => {
          card.hidden =
            filter !== "all" &&
            card.dataset.category !== filter;
        });
    });
  });

  /* ===========================================
     IMAGE LIGHTBOX

     Works with:
     - Homepage images
     - Main gallery
     - Becky's four photo albums
     - Rachel's album
     - Karen's album
     - Julie's album
     =========================================== */

  const dialog = document.getElementById("image-dialog");
  const dialogImage = dialog.querySelector("img");
  const dialogCaption = dialog.querySelector(
    ".lightbox-caption"
  );

  // Only open images already used on the website.
  const allowedPhotos = new Set(
    Array.from(
      document.querySelectorAll("[data-image]"),
      element => element.dataset.image
    )
  );

  document.querySelectorAll("[data-image]").forEach(button => {
    button.addEventListener("click", () => {
      const filename = button.dataset.image;

      if (!allowedPhotos.has(filename)) {
        return;
      }

      const caption =
        button.dataset.caption || "Holiday photograph";

      dialogImage.src = filename;
      dialogImage.alt = caption;
      dialogCaption.textContent = caption;

      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      }
    });
  });

  dialog
    .querySelector(".lightbox-close")
    .addEventListener("click", () => {
      dialog.close();
    });

  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", () => {
    dialogImage.removeAttribute("src");
  });

  /* ===========================================
     HOLIDAY ENQUIRY AND REVIEW EMAILS

     Forms prepare an email in the visitor's
     email application. Visitor presses Send.
     =========================================== */

  const beckyEmail = "becky@glowandgotravel.co.uk";

  function clean(value) {
    return String(value || "").trim().slice(0, 2000);
  }

  function openEmail(subject, body, form) {
    const status = form.querySelector(".form-status");

    status.textContent =
      "Your email app should open now. Please press Send to finish. " +
      "If nothing opens, email Becky using the link in the footer.";

    status.classList.add("visible");

    const mailto =
      `mailto:${beckyEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  /* ===========================================
     HOLIDAY ENQUIRY FORMS
     =========================================== */

  document.querySelectorAll(".enquiry-form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!form.reportValidity()) {
        return;
      }

      const data = new FormData(form);

      function get(name) {
        return clean(data.get(name));
      }

      const body = [
        "Hi Becky",
        "",
        "I would love help planning a holiday.",
        "Here are my details:",
        "",
        `Name: ${get("name")}`,
        `Email: ${get("email")}`,
        `Destination: ${get("destination")}`,
        `Dates: ${get("dates") || "Flexible / not sure"}`,
        `Travellers: ${get("travellers") || "To discuss"}`,
        `Approx. spend per person: ${get("spend") || "To discuss"}`,
        `Preferred board basis: ${get("board") || "Not sure yet"}`,
        `Special assistance: ${get("assistance") || "None specified"}`,
        `Other details: ${get("message") || "None yet"}`,
        "",
        "Please get in touch when you can.",
        "Thank you!"
      ].join("\n");

      const subject =
        `glow & go holiday enquiry, ${get("name")}`;

      openEmail(subject, body, form);
    });
  });

  /* ===========================================
     CUSTOMER REVIEW FORM
     =========================================== */

  document.querySelectorAll(".review-form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!form.reportValidity()) {
        return;
      }

      const data = new FormData(form);

      function get(name) {
        return clean(data.get(name));
      }

      const body = [
        "Hi Becky",
        "",
        "I would like to submit a review:",
        "",
        `First name: ${get("name")}`,
        `Contact email (do not publish): ${get("email")}`,
        `Destination: ${get("destination") || "Not given"}`,
        `Rating: ${get("rating")} / 5`,
        "",
        get("message"),
        "",
        "I agree to be contacted about whether " +
          "this review can be published."
      ].join("\n");

      const subject =
        `glow & go review, ${get("name")}`;

      openEmail(subject, body, form);
    });
  });

  /* ===========================================
     NEWSLETTER SIGN-UP REQUEST

     Uses FormSubmit to forward a request to Becky.
     This does not create an automatic subscription.
     Becky must activate FormSubmit first.
     =========================================== */

  document.querySelectorAll(".newsletter-form").forEach(form => {
    form.addEventListener("submit", async event => {
      event.preventDefault();

      if (!form.reportValidity()) {
        return;
      }

      const status = form.querySelector(".form-status");
      const submit = form.querySelector(
        '[type="submit"]'
      );

      submit.disabled = true;

      status.textContent = "Sending your request…";
      status.classList.add("visible");

      try {
        const response = await fetch(
          "https://formsubmit.co/ajax/becky@glowandgotravel.co.uk",
          {
            method: "POST",
            headers: {
              Accept: "application/json"
            },
            body: new FormData(form)
          }
        );

        const result = await response.json();

        if (
          !response.ok ||
          String(result.success).toLowerCase() === "false"
        ) {
          throw new Error("Delivery failed");
        }

        status.textContent =
          "Request submitted. Becky will add you " +
          "to her mailing list manually.";

        form.reset();

      } catch (error) {
        status.innerHTML =
          'Could not confirm delivery. Please ' +
          '<a href="mailto:becky@glowandgotravel.co.uk' +
          '?subject=Mailing%20list%20request">' +
          'email Becky directly</a> to join.';

      } finally {
        submit.disabled = false;
      }
    });
  });

})();
