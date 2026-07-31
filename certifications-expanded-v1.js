(() => {
  const groups = [
    ["Safety & Electrical",["UL","CB","CE","CCC","SAA","TÜV","ETL"]],
    ["International Market Access",["UKCA","SASO","BIS","EAC","RCM","PSE","KC"]],
    ["Compliance & Performance",["EMC","RoHS","LVD","SELV","FCC","FC","MA"]]
  ];
  const details = [
    ["UL","North American product-safety certification"],["EMC","Electromagnetic compatibility testing"],["CB","International electrical-safety certification system"],["CE","European conformity"],["RoHS","Restricted-substances compliance"],["UKCA","United Kingdom conformity"],["CCC","China compulsory certification"],["SAA","Australia electrical-safety certification"],["SASO","Saudi standards and conformity support"],["MA","Temperature-control compliance requested by applicable customers"],["BIS","India product compliance"],["SELV","Safety extra-low-voltage classification"],["FC","Customer and market-specific compliance support"],["LVD","European Low Voltage Directive testing"],["TÜV","Independent product-safety testing and certification"],["ETL","North American product-safety listing"],["EAC","Eurasian conformity"],["RCM","Australia and New Zealand regulatory compliance mark"],["PSE","Japan electrical-appliance safety compliance"],["KC","Korea certification support"],["FCC","United States electromagnetic-interference compliance"],["ISO 9001","Factory quality-management system"]
  ];
  const groupedMarkup = groups.map(([title,names]) => `<div class="cert-group"><small>${title}</small><div>${names.map(name => `<span>${name}</span>`).join("")}</div></div>`).join("");
  const apply = () => {
    document.querySelectorAll(".cert-line").forEach(line => {
      if (line.dataset.certDesign === "grouped-v1") return;
      line.innerHTML = groupedMarkup;
      line.dataset.certDesign = "grouped-v1";
      line.setAttribute("aria-label", "DY LIGHTS certification and compliance support");
    });
    document.querySelectorAll(".certificate-grid").forEach(grid => {
      if (grid.dataset.expandedCerts === "true") return;
      grid.innerHTML = details.map(([name,description]) => `<article><b>${name}</b><p>${description}</p></article>`).join("");
      grid.dataset.expandedCerts = "true";
    });
  };
  apply();
  new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
})();