(() => {
  const opening = document.getElementById("dy-opening");
  const video = opening?.querySelector("video");
  if (!opening || !video) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    opening.classList.add("is-closing");
    document.body.classList.remove("dy-opening-active");
    window.setTimeout(() => opening.remove(), 760);
  };

  if (reducedMotion) {
    finish();
    return;
  }

  video.defaultMuted = true;
  video.muted = true;
  video.play().catch(finish);
  window.setTimeout(() => opening.classList.add("is-closing"), 3650);
  window.setTimeout(finish, 4500);
  video.addEventListener("ended", finish, { once: true });
})();
