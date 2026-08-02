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
