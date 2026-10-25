const ICONS = {
  play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
  volume: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>',
  muted: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z"/></svg>'
};

function setupPlayer(player) {
  const video = player.querySelector('video');
  const flash = player.querySelector('.flash');
  const mute = player.querySelector('.mute');

  // Reload video and show poster
  video.addEventListener('ended', () => {
    clearTimeout(flashTimer);
    flash.classList.remove('show');
    video.load();
  });

  // Show icon with 1s flash
  let flashTimer;
  function showFlash(kind) {
    flash.innerHTML = ICONS[kind];
    flash.classList.add('show');
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => flash.classList.remove('show'), 1000);
  }

  // Play / Pause
  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      showFlash('play');
    } else {
      video.pause();
      showFlash('pause');
    }
  });

  // Keyboard support (Space) when the video is focused
  video.tabIndex = 0;
  video.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      e.preventDefault();
      video.click();
    }
  });

  // Mute / Unmute
  function updateMuteButton() {
    mute.innerHTML = video.muted ? ICONS.muted : ICONS.volume;
    mute.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
  }
  mute.addEventListener('click', () => {
    video.muted = !video.muted;
    updateMuteButton();
  });
  updateMuteButton();
}

document.querySelectorAll('.player').forEach(setupPlayer);
