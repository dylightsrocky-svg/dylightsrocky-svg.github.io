(() => {
  const intro = document.getElementById("dy-opening-intro");
  const video = document.getElementById("dy-opening-video");

  if (!intro || !video) return;

  document.documentElement.classList.add("dy-intro-active");

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    document.documentElement.classList.remove("dy-intro-active");
    intro.remove();
  };

  video.addEventListener("ended", finish, { once: true });
  video.addEventListener("error", finish, { once: true });

  const playback = video.play();
  if (playback && typeof playback.catch === "function") {
    playback.catch(() => {
      video.muted = true;
      video.play().catch(finish);
    });
  }

  window.setTimeout(finish, 6000);
})();
