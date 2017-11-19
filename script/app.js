const player = document.querySelector('.audio-player');
const source = document.querySelector('.player-src');
const next = document.querySelector('.next');
const prev = document.querySelector('.previous');

let songIndex = 0;
let songName = '';

document.querySelector('.songs').addEventListener('click', (event) => {
  if (event.target.classList.contains('song')) {
    songName = event.target.getAttribute('data-song');
    songIndex = event.target.getAttribute('data-index');
    updateSong();
  }
})

player.addEventListener('ended', (event) => {
  nextSong();
})

next.addEventListener('click', () => {
  nextSong();
})

prev.addEventListener('click', () => {
  prevSong();
})

function prevSong() {
  songIndex = Number(songIndex) - 1;
  const nextEle = document.querySelector(`[data-index="${songIndex}"]`);
  songName = nextEle.getAttribute('data-song');
  updateSong();
}

function nextSong() {
  songIndex = Number(songIndex) + 1;
  const nextEle = document.querySelector(`[data-index="${songIndex}"]`);
  songName = nextEle.getAttribute('data-song');
  updateSong();
}

function updateSong() {
  source.src = `/${songName}`;
  player.load(); //call this to just preload the audio without playing
  player.play();
}