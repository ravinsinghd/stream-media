const next = document.querySelector('.next');
const prev = document.querySelector('.previous');
const random = document.querySelector('.random');
const nowPlaying = document.querySelector('.now-playing');
const socket = io();



next.addEventListener('click', () => {
  socket.emit('next');
})

prev.addEventListener('click', () => {
  socket.emit('prev');
})

random.addEventListener('click', () => {
  enableRandom();
})

socket.on('songChanged', (songName) => {
  nowPlaying.innerText = songName;
})