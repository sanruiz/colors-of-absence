const audioElement = document.getElementById('sharedAudio');
const cardContainer = document.querySelector('.card-container');

function getCardHTML(item) {
  return `
    <img src="images/${item.image}" alt="${item.title}" class="card-image" />
    <div class="card-text">
      <div>
        <p class="title">${item.title}
      <span class="ref">Ref: ${item.ref}</span></p>

      </div>
      <p>${item.content}<br />
       <span>
        <svg width="30px" height="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path fill="#000000"
            d="M468.53 236.03H486v39.94h-17.47v-39.94zm-34.426 51.634h17.47v-63.328h-17.47v63.328zm-33.848 32.756h17.47V191.58h-17.47v128.84zm-32.177 25.276h17.47V167.483h-17.47v178.17zm-34.448-43.521h17.47v-92.35h-17.47v92.35zm-34.994 69.879h17.47v-236.06h-17.525v236.06zM264.2 405.9h17.47V106.1H264.2V405.9zm-33.848-46.284h17.47V152.383h-17.47v207.234zm-35.016-58.85h17.47v-87.35h-17.47v87.35zm-33.847-20.823h17.47V231.98h-17.47v48.042zm-33.848 25.66h17.47v-99.24h-17.47v99.272zm-33.302 48.04h17.47V152.678H94.34v201zm-33.847-30.702h17.47V187.333h-17.47v135.642zM26 287.664h17.47v-63.328H26v63.328z"/>
        </svg>
      </span></p>
     
    </div>
  `;
}

fetch('list.json')
  .then(response => response.json())
  .then(data => {
    data.forEach((item, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-audio', 'audio/' + item.sonido);
      // Position cards in a 5x5 grid with slight random offsets for a natural look
      const columns = 5;
      const row     = Math.floor(index / columns);
      const col     = index % columns;
      const baseTop  = row  * 20; // base percentage
      const baseLeft = col  * 20;
      const jitter   = 5;         // maximum offset percentage
      // Random offset between -jitter and +jitter
      const offsetTop  = (Math.random() * jitter * 2) - jitter;
      const offsetLeft = (Math.random() * jitter * 2) - jitter;
      // Clamp positions to stay within viewport (0% to 80%)
      const rawTop    = baseTop  + offsetTop;
      const rawLeft   = baseLeft + offsetLeft;
      const finalTop  = Math.min(Math.max(rawTop,  0), 80);
      const finalLeft = Math.min(Math.max(rawLeft, 0), 80);
      card.style.position = 'absolute';
      card.style.top      = `${finalTop}%`;
      card.style.left     = `${finalLeft}%`;
      // Use template for inner HTML
      card.innerHTML = getCardHTML(item);
      cardContainer.appendChild(card);
      card.addEventListener('click', () => {
        const audioSrc = card.getAttribute('data-audio');
        const isSame   = audioElement.src.includes(audioSrc);
        if (isSame) {
          if (audioElement.paused) {
            audioElement.play();
            card.classList.add('playing');
          } else {
            audioElement.pause();
            card.classList.remove('playing');
          }
        } else {
                    // Remove playing state from any other card
                    cardContainer.querySelectorAll('.card.playing')
                    .forEach(c => c.classList.remove('playing'));
          audioElement.src = audioSrc;
          audioElement.play();
          card.classList.add('playing');

        }
      });
    });
  })
  .catch(error => console.error('Error loading JSON:', error));

  // When audio ends, clear any playing state
audioElement.addEventListener('ended', () => {
  cardContainer.querySelectorAll('.card.playing')
    .forEach(c => c.classList.remove('playing'));
});
