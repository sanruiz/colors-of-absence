const audioCard = document.getElementById('audioCard');
const audio = document.getElementById('cardAudio');

audioCard.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});