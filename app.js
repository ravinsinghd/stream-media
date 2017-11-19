const express = require('express')
const app = express()
const fs = require('fs');

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

app.listen(3000, () => console.log('Example app listening on port 3000!'))