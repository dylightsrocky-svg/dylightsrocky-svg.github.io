(() => {
  const root = document.documentElement;
  const durationMs = 4500;
  const poster = "/intro/dy-lights-approved-intro-poster.jpg?v=approved-poster-v1";

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
    video.poster = poster;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.src = "/intro/DY-LIGHTS-final-opening-preview.mp4?v=approved-4p5-posterfix";

    intro.appendChild(video);
    root.appendChild(intro);
    root.classList.add("dy-intro-active");

    let finished = false;
    let retryTimer = 0;
    let videoVisible = false;

    const revealAdvancingVideo = () => {
      if (finished || videoVisible || video.currentTime < 0.05) return;
      videoVisible = true;
      video.classList.add("dy-intro-video-playing");
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(retryTimer);
      video.pause();
      finishPendingState();
      intro.remove();
    };

    const beginPlayback = () => {
      if (finished) return;
      const playback = video.play();
      if (playback && typeof playback.catch === "function") {
        playback.catch(() => {
          if (!finished) retryTimer = window.setTimeout(beginPlayback, 100);
        });
      }
    };

    video.addEventListener("loadeddata", beginPlayback, { once: true });
    video.addEventListener("canplay", beginPlayback, { once: true });
    video.addEventListener("timeupdate", revealAdvancingVideo);

    if (typeof video.requestVideoFrameCallback === "function") {
      const watchDecodedFrames = () => {
        if (finished || videoVisible) return;
        revealAdvancingVideo();
        if (!videoVisible) video.requestVideoFrameCallback(watchDecodedFrames);
      };
      video.requestVideoFrameCallback(watchDecodedFrames);
    }

    video.load();
    if (video.readyState >= 2) beginPlayback();

    window.setTimeout(finish, durationMs);
  };

  start();
})();
