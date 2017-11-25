const express = require('express')
const app = express()
const fs = require('fs');
var http = require('http').Server(app);
var io = require('socket.io')(http);

let testFolder = 'F:/media/song';

app.set('view engine', 'pug')
app.use(express.static(testFolder));
app.use(express.static('./style'));
app.use(express.static('./script'));

app.get('/', (req, res) => {

  fs.readdir(testFolder, (err, files) => {
    res.render('index', {
      title: 'OPUS',
      message: 'Welcome to the awesome player',
      values: files
    })
  })

})

app.get('/remote', (req, res) => {

  fs.readdir(testFolder, (err, files) => {
    res.render('remote', {
      title: 'OPUS',
      message: 'Welcome to the awesome remote',
      values: files
    })
  })

})

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('next', () => {
    io.emit('next');
  });

  socket.on('prev', () => {
    io.emit('prev');
  });

});

http.listen(3000, () => console.log('Example app listening on port 3000!'))