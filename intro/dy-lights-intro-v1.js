(() => {
  const root = document.documentElement;

  const finishPendingState = () => {
    root.classList.remove("dy-intro-pending", "dy-intro-active");
  };

  const start = () => {
    if (document.getElementById("dy-opening-intro")) return;

    const intro = document.createElement("div");
    intro.id = "dy-opening-intro";
    intro.setAttribute("aria-label", "DY LIGHTS opening");

    const video = document.createElement("video");
    video.id = "dy-opening-video";
    video.autoplay = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.src = "/intro/DY-LIGHTS-final-opening-preview.mp4?v=approved-4p5-loadfix";

    intro.appendChild(video);
    root.appendChild(intro);
    root.classList.add("dy-intro-active");

    let finished = false;
    let started = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      finishPendingState();
      intro.remove();
    };

    const beginPlayback = () => {
      if (finished || started) return;
      started = true;
      const playback = video.play();
      if (playback && typeof playback.catch === "function") {
        playback.catch(() => {
          started = false;
          window.setTimeout(beginPlayback, 100);
        });
      }
    };

    video.addEventListener("loadeddata", beginPlayback, { once: true });
    video.addEventListener("canplay", beginPlayback, { once: true });
    video.addEventListener("ended", finish, { once: true });
    video.addEventListener("error", finish, { once: true });

    video.load();
    if (video.readyState >= 2) beginPlayback();

    window.setTimeout(() => {
      if (!started && video.readyState < 2) finish();
    }, 3500);
    window.setTimeout(finish, 7000);
  };

  start();
})();