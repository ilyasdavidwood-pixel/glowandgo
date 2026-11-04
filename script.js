
/* glow & go travel — complete website JavaScript */
/* All pictures are in the same folder as index.html */

(() => {
  'use strict';

  // PAGE NAVIGATION
  const routes = new Set([
    'home',
    'about',
    'why-book',
    'destinations',
    'journal',
    'stories',
    'reviews',
    'book',
    'contact',
    'privacy'
  ]);

  const nav = document.getElementById('site-nav');
  const menu = document.querySelector('.menu-toggle');
  const sticky = document.querySelector('.sticky-cta');

  function closeMenu() {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    menu.textContent = '☰';
  }

  function showPage() {
    const requested = location.hash.startsWith('#/')
      ? location.hash.slice(2).split('/')[0]
      : 'home';

    const current = routes.has(requested) ? requested : 'home';

    document.querySelectorAll('[data-page]').forEach(page => {
      page.hidden = page.dataset.page !== current;
    });

    document.querySelectorAll('.nav a').forEach(link => {
      if (link.getAttribute('href') === `#/${current}`) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    const pageTitle = current === 'home'
      ? 'Escape Ordinary. Embrace Freedom.'
      : current
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

    document.title = pageTitle + ' | glow & go travel';

    closeMenu();
    window.scrollTo(0, 0);
  }

  menu.addEventListener('click', () => {
    const open = !nav.classList.contains('open');

    nav.classList.toggle('open', open);
    menu.textContent = open ? '×' : '☰';

    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute(
      'aria-label',
      open ? 'Close navigation' : 'Open navigation'
    );
  });

  document.addEventListener('click', event => {
    if (
      nav.classList.contains('open') &&
      !nav.contains(event.target) &&
      !menu.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('hashchange', showPage);
  showPage();

  document.getElementById('year').textContent =
    new Date().getFullYear();

  // MOBILE BOOKING BUTTON
  const setSticky = () => {
    sticky.classList.toggle('visible', window.scrollY > 450);
  };

  window.addEventListener('scroll', setSticky, { passive: true });
  setSticky();

  // CUSTOMER REVIEW SLIDER
  // First names only.
  const reviews = [
    {
      text: '“Becky was an absolute superstar!”',
      by: 'Gemma, Canada'
    },
    {
      text: '“We had a fabulous time and everything went according to plan.”',
      by: 'Julie, Norwegian fjords'
    },
    {
      text: '“Oh Becky you did good!!!!!!!”',
      by: 'Nicola, Gran Canaria'
    },
    {
      text: '“Great communication throughout and easy booking.”',
      by: 'Sarah, Egypt'
    },
    {
      text: '“Five stars all the way!”',
      by: 'Catherine, Canada'
    },
    {
      text: '“Becky helped me every step of the way!”',
      by: 'Rachel, Mediterranean cruise'
    }
  ];

  let activeReview = 0;

  function updateReview() {
    document.getElementById('slider-quote').textContent =
      reviews[activeReview].text;

    document.getElementById('slider-by').textContent =
      reviews[activeReview].by;
  }

  document.getElementById('review-prev').addEventListener(
    'click',
    () => {
      activeReview =
        (activeReview + reviews.length - 1) % reviews.length;

      updateReview();
    }
  );

  document.getElementById('review-next').addEventListener(
    'click',
    () => {
      activeReview =
        (activeReview + 1) % reviews.length;

      updateReview();
    }
  );

  // PHOTO GALLERY FILTERS
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      document.querySelectorAll('[data-filter]').forEach(other => {
        other.setAttribute(
          'aria-pressed',
          String(other === button)
        );
      });

      document
        .querySelectorAll('.gallery-grid .gallery-card')
        .forEach(card => {
          card.hidden =
            filter !== 'all' &&
            card.dataset.category !== filter;
        });
    });
  });

  // FULL-SCREEN PHOTO VIEWER
  // Image filenames match the GitHub root folder.
  const allowedPhotos = new Set([
    'beach-cove.jpg',
    'beach-just-booked.jpg',
    'becky-coast-portrait.jpg',
    'becky-holiday-friends.jpg',
    'becky-kayaking.jpg',
    'becky-red-outfit.jpg',
    'becky-sunset.jpg',
    'becky-travel-friends.jpg',
    'canada-lake.jpg',
    'canada-rapids.jpg',
    'dolphins-sunset.jpg',
    'gran-canaria-resort.jpg',
    'norway-fjord-cabin.jpg',
    'norway-lake.jpg',
    'norway-sunlight.jpg',
    'norway-village.jpg',
    'waterfront-night.jpg',

    'tropical-lagoon-boat.jpg',
    'becky-evening.jpg',

    'rachel-sea-rocks.jpg',
    'rachel-ancient-arch.jpg',
    'rachel-archaeology-site.jpg',
    'rachel-city-ruins.jpg',
    'rachel-sea-sunset.jpg',
    'rachel-ancient-site.jpg',
    'rachel-acropolis.jpg',
    'rachel-beach.jpg',
    'rachel-lighthouse.jpg',
    'rachel-orange-sunset.jpg',
    'rachel-historic-library.jpg'
  ]);

  const dialog = document.getElementById('image-dialog');
  const dialogImage = dialog.querySelector('img');

  document.querySelectorAll('[data-image]').forEach(button => {
    button.addEventListener('click', () => {
      const filename = button.dataset.image;

      if (!allowedPhotos.has(filename)) return;

      dialogImage.src = filename;
      dialogImage.alt =
        button.dataset.caption || 'Holiday photograph';

      dialog.querySelector('.lightbox-caption').textContent =
        button.dataset.caption || 'Travel photograph';

      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    });
  });

  dialog.querySelector('.lightbox-close').addEventListener(
    'click',
    () => dialog.close()
  );

  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    dialogImage.removeAttribute('src');
  });

  // HOLIDAY ENQUIRY
  // Prepares an email for visitors to send.
  const beckyEmail = 'becky@glowandgotravel.co.uk';

  const clean = value =>
    String(value || '').trim().slice(0, 2000);

  function openEmail(subject, body, form) {
    const message = form.querySelector('.form-status');

    message.textContent =
      'Your email app should open now. Please press Send to finish. If nothing opens, email Becky using the link in the footer.';

    message.classList.add('visible');

    window.location.href =
      `mailto:${beckyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  document.querySelectorAll('.enquiry-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const get = name => clean(data.get(name));

      const body = [
        'Hi Becky',
        '',
        'I would love help planning a holiday. Here are my details:',
        '',
        `Name: ${get('name')}`,
        `Email: ${get('email')}`,
        `Destination: ${get('destination')}`,
        `Dates: ${get('dates') || 'Flexible / not sure'}`,
        `Travellers: ${get('travellers') || 'To discuss'}`,
        `Budget: ${get('budget') || 'To discuss'}`,
        `Other details: ${get('message') || 'None yet'}`,
        '',
        'Please get in touch when you can. Thank you!'
      ].join('\n');

      openEmail(
        `glow & go holiday enquiry, ${get('name')}`,
        body,
        form
      );
    });
  });

  // CUSTOMER REVIEW FORM
  document.querySelectorAll('.review-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const get = name => clean(data.get(name));

      const body = [
        'Hi Becky',
        '',
        'I would like to submit a review:',
        '',
        `First name: ${get('name')}`,
        `Contact email (do not publish): ${get('email')}`,
        `Destination: ${get('destination') || 'Not given'}`,
        `Rating: ${get('rating')} / 5`,
        '',
        get('message'),
        '',
        'I agree to be contacted about whether this review can be published.'
      ].join('\n');

      openEmail(
        `glow & go review, ${get('name')}`,
        body,
        form
      );
    });
  });

  // MAILING LIST
  // Sends a signup request through FormSubmit.
  // Becky must activate the forwarding email first.
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', async event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const status = form.querySelector('.form-status');
      const submit = form.querySelector('[type="submit"]');

      submit.disabled = true;
      status.textContent = 'Sending your request…';
      status.classList.add('visible');

      try {
        const response = await fetch(
          'https://formsubmit.co/ajax/becky@glowandgotravel.co.uk',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json'
            },
            body: new FormData(form)
          }
        );

        const result = await response.json();

        if (
          !response.ok ||
          String(result.success).toLowerCase() === 'false'
        ) {
          throw new Error('Send failed');
        }

        status.textContent =
          'Request submitted. Becky will add you to her mailing list manually.';

        form.reset();

      } catch {
        status.innerHTML =
          'Could not confirm delivery. Please <a href="mailto:becky@glowandgotravel.co.uk?subject=Mailing%20list%20request">email Becky directly</a> to join.';
      } finally {
        submit.disabled = false;
      }
    });
  });
})();
