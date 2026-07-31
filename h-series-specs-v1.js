(() => {
  const products = {
    "dy-36w-12-24-h":  ["36W",  "3A / 1.5A",    "<100mV", "AC 110–250V", "≥88% / ≥89.1%",  "125 × 38 × 21 mm", "0.17 kg"],
    "dy-60w-12-24-h":  ["60W",  "5.1A / 2.5A",  "<150mV", "AC 110–250V", "≥85.6% / ≥89.1%","150 × 38 × 21 mm", "0.20 kg"],
    "dy-100w-12-24-h": ["100W", "8.3A / 4.2A",  "<250mV", "AC 110–250V", "≥88% / ≥88.6%",  "190 × 53 × 19 mm", "0.33 kg"],
    "dy-150w-12-24-h": ["150W", "12.5A / 6.3A", "<150mV", "AC 110–250V", "≥86.6% / ≥89.9%","215 × 60 × 24 mm", "0.35 kg"],
    "dy-200w-12-24-h": ["200W", "16.6A / 8.33A","<200mV", "AC 110–250V", "≥88.6% / ≥90.9%","215 × 60 × 24 mm", "0.55 kg"],
    "dy-250w-12-24-h": ["250W", "20.8A / 10.4A","<220mV", "AC 175–265V", "≥88% / ≥88.5%",  "220 × 78 × 32 mm", "0.95 kg"],
    "dy-300w-12-24-h": ["300W", "25A / 12.5A",  "<400mV", "AC 175–265V", "≥89.6% / ≥90.1%","220 × 78 × 32 mm", "0.95 kg"],
    "dy-400w-12-24-h": ["400W", "33.3A / 16.6A","<400mV", "AC 178–250V", "≥89% / ≥90.8%",  "240 × 78 × 32 mm", "1.10 kg"],
    "dy-600w-12-24-h": ["600W", "50A / 25A",    "<400mV", "AC 178–250V", "≥89% / ≥90.1%",  "260 × 78 × 32 mm", "1.30 kg"]
  };
  const slug = location.pathname.split("/").filter(Boolean).pop();
  const spec = products[slug];
  if (!spec) return;
  const rows = [
    ["Rated power", spec[0]], ["Output voltage", "DC 12V / 24V"],
    ["Rated output current (12V / 24V)", spec[1]], ["Ripple & noise", spec[2]],
    ["Input voltage", spec[3]], ["Efficiency (12V / 24V)", spec[4]],
    ["Waterproof rating", "IP67"], ["Dimensions", spec[5]], ["Net weight", spec[6]],
    ["Protections", "Short circuit / overload / over-current / over-voltage"],
    ["Safety approvals", "UL 62368-1 / EN 62368-1 / EAC TP TC 004"],
    ["EMC", "EN 55032 / CISPR 32 Class B / EN 55024"], ["Warranty", "3 years"]
  ];
  const apply = () => {
    document.querySelectorAll(".detail-category").forEach((node) => {
      if (node.textContent !== "IP67 waterproof LED power supply") node.textContent = "IP67 waterproof LED power supply";
    });
    document.querySelectorAll(".feature-grid span").forEach((node) => {
      if (/IP68 protection/i.test(node.textContent)) node.textContent = "IP67 protection";
    });
    document.querySelectorAll(".detail-spec-table").forEach((table) => {
      if (table.dataset.hSeriesVerified === "true") return;
      table.innerHTML = rows.map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join("");
      table.dataset.hSeriesVerified = "true";
    });
    document.querySelectorAll(".verification-note").forEach((node) => {
      const note = "Verified against the official DY LIGHTS H Series datasheet. Confirm voltage and model requirements before ordering.";
      if (node.textContent !== note) node.textContent = note;
    });
  };
  apply();
  new MutationObserver(apply).observe(document.documentElement, {childList: true, subtree: true});
})();