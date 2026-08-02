(() => {
  const qualityStyle = document.createElement("style");
  qualityStyle.dataset.dyQualityFirst = "v1";
  qualityStyle.textContent = `.hero-quality-first{position:absolute;z-index:3;top:47%;left:50%;width:72%;transform:translate(-50%,-50%);text-align:center;pointer-events:none}.hero-quality-first strong{display:block;color:#171d25;font-size:clamp(16px,1.55vw,24px);font-weight:800;letter-spacing:.055em;line-height:1.05}.hero-quality-first span{display:block;margin-top:8px;color:#687482;font-size:clamp(10px,.82vw,13px);font-weight:600;letter-spacing:.035em}@media(max-width:560px){.hero-quality-first{top:47%;width:76%}.hero-quality-first strong{font-size:13px;letter-spacing:.04em}.hero-quality-first span{margin-top:5px;font-size:8px}}`;
  document.head.appendChild(qualityStyle);
  const path = location.pathname.replace(/\/$/, "") || "/";
  const sections = {
    "/": `<section class="trust-section trust-dark" data-dy-trust="home"><div class="trust-heading"><div><span class="trust-kicker">BUYER CONFIDENCE</span><h2>Clear information.<br>Direct factory support.</h2></div><p>Professional purchasing requires more than a product picture. DY LIGHTS supports buyers with model-level information, factory engineering, current compliance documents and clear warranty guidance.</p></div><div class="trust-grid"><article class="trust-card"><small>01 / FACTORY</small><h3>Manufacturing support</h3><p>Work directly with a DY LIGHTS team focused on LED power supplies and LED strip lighting.</p><a href="/about">View company & factory →</a></article><article class="trust-card"><small>02 / SELECTION</small><h3>Engineer-confirmed matching</h3><p>Input, output, power and installation environment are reviewed before the final model is confirmed.</p><a href="/#ai">Use product finder →</a></article><article class="trust-card"><small>03 / COMPLIANCE</small><h3>Model-specific documents</h3><p>Certificate availability varies by product. Request current files for the exact model and destination market.</p><a href="/certifications">View certification support →</a></article><article class="trust-card"><small>04 / WARRANTY</small><h3>Clear warranty information</h3><p>Warranty terms are shown by series and model, with HP Series offering up to five years.</p><a href="/#products">Compare product series →</a></article></div><div class="trust-proofline"><div><b>ISO 9001</b><span>Factory quality management</span></div><div><b>OEM support</b><span>Flexible project cooperation</span></div><div><b>Model data</b><span>Detailed product specifications</span></div><div><b>Global support</b><span>Market and project assistance</span></div></div></section>`,
    "/about": `<section class="trust-section" data-dy-trust="about"><div class="trust-heading"><div><span class="trust-kicker">HOW WE SUPPORT YOUR PROJECT</span><h2>From requirement<br>to reliable delivery.</h2></div><p>Our role is to help buyers reduce selection risk and move from project requirements to the correct product with clear technical and commercial communication.</p></div><div class="trust-grid"><article class="trust-card"><small>STEP 01</small><h3>Requirement review</h3><p>We confirm application, input voltage, output voltage, power and installation environment.</p></article><article class="trust-card"><small>STEP 02</small><h3>Product matching</h3><p>The suitable series and model are selected from confirmed DY LIGHTS product information.</p></article><article class="trust-card"><small>STEP 03</small><h3>Production & verification</h3><p>Controlled manufacturing and model-specific quality checks support stable project performance.</p></article><article class="trust-card"><small>STEP 04</small><h3>Documents & support</h3><p>Current datasheets, applicable certificates and warranty information are prepared for the selected model.</p></article></div><div class="trust-actions"><a href="https://wa.me/8618938794941">Discuss your project ↗</a><a href="/certifications">Review certification support</a></div></section>`,
    "/certifications": `<section class="trust-section" data-dy-trust="certifications"><div class="trust-heading"><div><span class="trust-kicker">RESPONSIBLE COMPLIANCE</span><h2>Documents matched<br>to the exact model.</h2></div><p>Certification marks should never be assumed to apply to every product. DY LIGHTS confirms the current certificate or report for the selected model and destination market before ordering.</p></div><div class="trust-grid"><article class="trust-card"><small>01 / MODEL</small><h3>Exact product check</h3><p>Tell us the complete model number, output voltage and wattage required.</p></article><article class="trust-card"><small>02 / MARKET</small><h3>Destination review</h3><p>Compliance requirements are checked against the customer’s intended sales or installation market.</p></article><article class="trust-card"><small>03 / FILES</small><h3>Current documentation</h3><p>Request the latest available certificate, report and datasheet instead of relying on an old file.</p></article><article class="trust-card"><small>04 / CONFIRMATION</small><h3>Before ordering</h3><p>Final documentation and product configuration should be confirmed with the DY LIGHTS sales team.</p></article></div><div class="trust-actions"><a href="mailto:topsales22@dylights.com">Request compliance files ↗</a><a href="/about">View company & factory</a></div></section>`
  };
  const addHeroQuality = () => {
    if (path !== "/" || document.querySelector(".hero-quality-first")) return;
    const heroProducts = document.querySelector(".hero-glow");
    if (heroProducts) heroProducts.insertAdjacentHTML("beforeend", `<div class="hero-quality-first"><strong>QUALITY COMES FIRST.</strong><span>Engineered with care. Built to perform.</span></div>`);
  };
  const insert = () => {
    addHeroQuality();
    const html = sections[path];
    if (!html || document.querySelector(`[data-dy-trust]`)) return;
    const target = document.querySelector(path === "/" ? ".contact-section" : ".page-cta");
    if (target) target.insertAdjacentHTML("beforebegin", html);
  };
  insert();
  new MutationObserver(insert).observe(document.documentElement, {childList:true, subtree:true});
})();

if ((location.pathname.replace(/\/$/, "") || "/") === "/" && !document.querySelector('script[src^="/mini-carousel-v1.js"]')) {
  const miniCarousel = document.createElement("script");
  miniCarousel.src = "/mini-carousel-v1.js?v=1";
  miniCarousel.defer = true;
  document.head.appendChild(miniCarousel);
}
