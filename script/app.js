const player = document.querySelector('.audio-player');
const source = document.querySelector('.player-src');
const next = document.querySelector('.next');
const prev = document.querySelector('.previous');
const random = document.querySelector('.random');
const allSongs = document.querySelectorAll('.song');
const allSongsLength = allSongs.length;

let songIndex = 0;
let songName = '';
let isRandomEnabled = false;

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

random.addEventListener('click', () => {
  enableRandom();
})

function prevSong() {
  songIndex = Number(songIndex) - 1;
  const nextEle = document.querySelector(`[data-index="${songIndex}"]`);
  songName = nextEle.getAttribute('data-song');
  updateSong();
}

function nextSong() {
  songIndex = getNextIndex();
  const nextEle = document.querySelector(`[data-index="${songIndex}"]`);
  songName = nextEle.getAttribute('data-song');
  updateSong();
}

function getNextIndex() {
  if (random) {
    return randomIntFromInterval(1, allSongsLength);
  } else {
    return Number(songIndex) + 1;
  }
}

function updateSong() {
  source.src = `/${songName}`;
  player.load(); //call this to just preload the audio without playing
  player.play();
}

function enableRandom() {
  isRandomEnabled = !isRandomEnabled;
  if (isRandomEnabled) {
    random.value = 'off random';
  } else {
    random.value = 'on random';
  }

}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}