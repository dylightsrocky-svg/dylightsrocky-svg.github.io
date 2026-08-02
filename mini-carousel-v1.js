(() => {
  if (!document.querySelector('link[href^="/mini-carousel-v1.css"]')) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/mini-carousel-v1.css?v=1";
    document.head.appendChild(stylesheet);
  }

  const products = [
    ["60", "/assets/mini-carousel/mini-60w.webp"],
    ["100", "/assets/mini-carousel/mini-100w.webp"],
    ["150", "/assets/mini-carousel/mini-150w.webp"],
    ["200", "/assets/mini-carousel/mini-200w.webp"],
    ["36", "/assets/mini-carousel/mini-36w.webp"],
  ];
  let active = 0;
  let timer;

  products.forEach(([, src]) => {
    const image = new Image();
    image.src = src;
  });

  const renderProduct = (carousel) => {
    const [wattage, src] = products[active];
    const image = document.createElement("img");
    image.src = src;
    image.alt = `${wattage}W MINI LED power supply`;
    image.dataset.size = wattage;
    image.decoding = "async";
    carousel.replaceChildren(image);
  };

  const install = () => {
    if ((location.pathname.replace(/\/$/, "") || "/") !== "/") return;
    const hero = document.querySelector(".hero");
    const copy = hero?.querySelector(".hero-copy");
    const stage = hero?.querySelector(".hero-glow");
    if (!hero || !copy || !stage) return;

    hero.classList.add("dy-mini-hero");
    const eyebrow = copy.querySelector(".eyebrow");
    const heading = copy.querySelector("h1");
    const description = copy.querySelector(".hero-text");
    const primary = copy.querySelector(".primary-button");
    const secondary = copy.querySelector(".text-button");
    if (eyebrow) eyebrow.innerHTML = "<span></span> NEW TECHNOLOGY · MINI SERIES";
    if (heading) heading.innerHTML = "MINI SIZE.<br><em>BIG PERFORMANCE.</em>";
    if (description) description.textContent = "Compact power engineered for modern lighting. Five wattages, one ultra-slim MINI platform.";
    if (primary) { primary.href = "/series/mini-series"; primary.innerHTML = "Explore MINI Series <b>↗</b>"; }
    if (secondary) { secondary.href = "/quote/"; secondary.innerHTML = "Request a quote <span>→</span>"; }

    if (!copy.querySelector(".hero-features")) {
      const features = document.createElement("div");
      features.className = "hero-features";
      features.innerHTML = `<div class="hero-feature"><b>15mm</b><span>ULTRA-SLIM</span></div><div class="hero-feature"><b>110–265V</b><span>WIDE INPUT</span></div><div class="hero-feature"><b>Stable</b><span>OUTPUT</span></div><div class="hero-feature"><b>Safe</b><span>PROTECTION</span></div><div class="hero-feature"><b>3 years</b><span>WARRANTY</span></div>`;
      copy.querySelector(".hero-actions")?.before(features);
    }

    let bestSellers = document.querySelector(".dy-global-sellers");
    if (!bestSellers) {
      bestSellers = document.createElement("section");
      bestSellers.className = "dy-global-sellers";
      bestSellers.setAttribute("aria-labelledby", "dy-global-sellers-title");
      bestSellers.innerHTML = `<div class="dy-sellers-heading"><p>DY LIGHTS · ENGINEERED POWER</p><h2 id="dy-global-sellers-title">GLOBAL BEST SELLERS</h2><span>Trusted power solutions for professional lighting projects worldwide.</span></div><div class="dy-seller-grid"><a class="dy-seller-card" href="/series/hp-series"><div><small>BEST SELLER</small><h3>HP Series</h3><p>Premium IP67 waterproof</p></div><img src="/products/hp/hp-400w.png" alt="HP Series waterproof LED power supply"><b>View Series <span>→</span></b></a><a class="dy-seller-card" href="/series/rz-series"><div><small>PROFESSIONAL CHOICE</small><h3>RZ Series</h3><p>Semi-potted protected power</p></div><img src="/products/rz/rz-400w.png" alt="RZ Series LED power supply"><b>View Series <span>→</span></b></a><a class="dy-seller-card" href="/series/mini-series"><div><small>MARKET LEADING</small><h3>MINI Series</h3><p>Ultra-compact installation</p></div><img src="/products/mini/mini-60w.png" alt="MINI Series compact LED power supply"><b>View Series <span>→</span></b></a></div><div class="dy-quality-band"><i>✓</i><div><strong>QUALITY COMES FIRST.</strong><span>Engineered with care. Built to perform.</span></div></div>`;
      hero.insertAdjacentElement("afterend", bestSellers);
    }

    const legacyQuality = stage.querySelector(".hero-quality-first");
    if (legacyQuality) legacyQuality.remove();

    let carousel = stage.querySelector(".dy-mini-carousel");
    if (!carousel) {
      carousel = document.createElement("div");
      carousel.className = "dy-mini-carousel";
      carousel.setAttribute("aria-live", "polite");
      stage.prepend(carousel);
      renderProduct(carousel);
    }

    if (!timer) {
      timer = window.setInterval(() => {
        active = (active + 1) % products.length;
        const current = document.querySelector(".dy-mini-carousel");
        if (current) renderProduct(current);
      }, 5000);
    }
  };

  install();
  new MutationObserver(install).observe(document.documentElement, { childList: true, subtree: true });
})();
