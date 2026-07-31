(function () {
  function initialiseMobileNavigation() {
  document.querySelectorAll('header nav').forEach(function (desktopNav) {
    var certificationLink = desktopNav.querySelector('a[href*="certifications"]');
    if (certificationLink) desktopNav.appendChild(certificationLink);
  });

  if (document.querySelector('.dy-mobile-nav')) return;

  if (!document.querySelector('link[href="/mobile-nav-v1.css"]')) {
    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/mobile-nav-v1.css';
    document.head.appendChild(stylesheet);
  }

  var nav = document.createElement('header');
  nav.className = 'dy-mobile-nav';
  nav.setAttribute('aria-label', 'Mobile website navigation');
  nav.innerHTML =
    '<div class="dy-mobile-top">' +
      '<a class="dy-mobile-brand" href="/" aria-label="DY LIGHTS home">' +
        '<span class="dy-mobile-logo">DY</span>' +
        '<span>DY LIGHTS × AI<small>INTELLIGENT POWER SOLUTIONS</small></span>' +
      '</a>' +
      '<a class="dy-mobile-quote" href="/quote/">Quotation</a>' +
      '<a class="dy-mobile-certs" href="/certifications/">Certifications</a>' +
    '</div>' +
    '<nav class="dy-mobile-links" aria-label="Quick navigation">' +
      '<a href="/#products">Power Supplies</a>' +
      '<a href="/led-strips/">LED Strips</a>' +
      '<a href="/#contact">Contact</a>' +
      '<a href="/about/">About &amp; Factory</a>' +
    '</nav>';

  document.body.insertBefore(nav, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseMobileNavigation, { once: true });
  } else {
    initialiseMobileNavigation();
  }
})();
