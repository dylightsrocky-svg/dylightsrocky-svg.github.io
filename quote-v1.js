(() => {
  const form = document.querySelector("#quote-form");
  const preview = document.querySelector("#quote-preview-text");
  if (!form || !preview) return;
  const value = name => (form.elements[name]?.value || "").trim();
  const line = (label, name) => `${label}: ${value(name) || "Not specified"}`;
  const build = () => [
    "Hello DY LIGHTS,", "",
    "I would like to request a quotation and product recommendation.", "",
    line("Company / customer", "company"), line("Destination country", "country"),
    line("Product type", "productType"), line("Preferred series or model", "model"),
    line("Application / environment", "application"), line("Input voltage", "inputVoltage"),
    line("Output voltage", "outputVoltage"), line("Required power", "power"),
    line("Quantity", "quantity"), line("Required certifications", "certifications"),
    line("Project notes", "notes"), "",
    "Please confirm the suitable model and send the price, datasheet, applicable certification documents, warranty information and delivery time.", "", "Thank you."
  ].join("\n");
  const update = () => { preview.textContent = build(); };
  form.addEventListener("input", update);
  form.addEventListener("change", update);
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    window.open(`https://wa.me/8618938794941?text=${encodeURIComponent(build())}`, "_blank", "noopener");
  });
  document.querySelector("#send-email")?.addEventListener("click", () => {
    if (!form.reportValidity()) return;
    const subject = `Quotation request - ${value("model") || value("productType") || "DY LIGHTS product"}`;
    location.href = `mailto:topsales22@dylights.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(build())}`;
  });
  update();
})();