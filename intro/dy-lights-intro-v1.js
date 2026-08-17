(() => {
  const start = () => {
    if (document.getElementById("dy-opening-intro")) return;

    const intro = document.createElement("div");
    intro.id = "dy-opening-intro";
    intro.setAttribute("aria-label", "DY LIGHTS opening");

    const video = document.createElement("video");
    video.id = "dy-opening-video";
    video.src = "/intro/DY-LIGHTS-final-opening-preview.mp4";
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "auto";

    intro.appendChild(video);
    document.body.appendChild(intro);
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
  };

  const startAfterHydration = () => {
    window.setTimeout(start, 750);
  };

  if (document.readyState === "complete") {
    startAfterHydration();
  } else {
    window.addEventListener("load", startAfterHydration, { once: true });
  }
})();
