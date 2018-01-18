const player = document.querySelector('.audio-player');
const source = document.querySelector('.player-src');
const next = document.querySelector('.next');
const prev = document.querySelector('.previous');
const random = document.querySelector('.random');
const allSongs = document.querySelectorAll('.song');
const nowPlaying = document.querySelector('.now-playing');
const allSongsLength = allSongs.length;
const socket = io();

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
  songIndex = getPreviousIndex();
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
  if (isRandomEnabled) {
    return randomIntFromInterval(1, allSongsLength);
  } else {
    return Number(songIndex) + 1;
  }
}

function getPreviousIndex() {
  if (isRandomEnabled) {
    return randomIntFromInterval(1, allSongsLength);
  } else {
    return Number(songIndex) - 1;
  }
}

function updateSong() {
  nowPlaying.innerText = songName;
  source.src = `/${songName}`;
  player.load(); //call this to just preload the audio without playing
  player.play();
  songChanged(songName);
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


socket.on('next', () => {
  nextSong();
});

socket.on('prev', () => {
  prevSong();
});

function songChanged(songName) {
  socket.emit('songChanged', songName);
}