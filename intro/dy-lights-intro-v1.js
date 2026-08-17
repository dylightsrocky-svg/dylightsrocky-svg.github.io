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
    video.src = "/intro/DY-LIGHTS-final-opening-preview.mp4?v=approved-4p5-autoplay";

    intro.appendChild(video);
    root.appendChild(intro);
    root.classList.add("dy-intro-active");

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      finishPendingState();
      intro.remove();
    };

    video.addEventListener("ended", finish, { once: true });
    video.addEventListener("error", finish, { once: true });

    const playback = video.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(finish);
    }

    window.setTimeout(finish, 5500);
  };

  start();
})();
