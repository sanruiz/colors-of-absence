const audioElement = document.getElementById('sharedAudio');

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const audioSrc = card.getAttribute('data-audio');

    if (audioElement.src.includes(audioSrc)) {
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    } else {
      audioElement.src = audioSrc;
      audioElement.play();
    }
  });
});
