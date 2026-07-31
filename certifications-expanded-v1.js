(() => {
  const names = ["UL","EMC","CB","CE","RoHS","UKCA","CCC","SAA","SASO","MA","BIS","SELV","FC","LVD","TÜV","ETL","EAC","RCM","PSE","KC","FCC"];
  const details = [
    ["UL","North American product-safety certification"],
    ["EMC","Electromagnetic compatibility testing"],
    ["CB","International electrical-safety certification system"],
    ["CE","European conformity"],
    ["RoHS","Restricted-substances compliance"],
    ["UKCA","United Kingdom conformity"],
    ["CCC","China compulsory certification"],
    ["SAA","Australia electrical-safety certification"],
    ["SASO","Saudi standards and conformity support"],
    ["MA","Temperature-control compliance requested by applicable customers"],
    ["BIS","India product compliance"],
    ["SELV","Safety extra-low-voltage classification"],
    ["FC","Customer and market-specific compliance support"],
    ["LVD","European Low Voltage Directive testing"],
    ["TÜV","Independent product-safety testing and certification"],
    ["ETL","North American product-safety listing"],
    ["EAC","Eurasian conformity"],
    ["RCM","Australia and New Zealand regulatory compliance mark"],
    ["PSE","Japan electrical-appliance safety compliance"],
    ["KC","Korea certification support"],
    ["FCC","United States electromagnetic-interference compliance"],
    ["ISO 9001","Factory quality-management system"]
  ];
  const apply = () => {
    document.querySelectorAll(".cert-line").forEach(line => {
      const expected = names.join("|");
      if (line.dataset.expandedCerts === expected) return;
      line.innerHTML = names.map(name => `<span>${name}</span>`).join("");
      line.dataset.expandedCerts = expected;
      line.setAttribute("aria-label", "DY LIGHTS certification and compliance support");
    });
    document.querySelectorAll(".certificate-grid").forEach(grid => {
      if (grid.dataset.expandedCerts === "true") return;
      grid.innerHTML = details.map(([name, description]) => `<article><b>${name}</b><p>${description}</p></article>`).join("");
      grid.dataset.expandedCerts = "true";
    });
  };
  apply();
  new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
})();