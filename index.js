'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const user = require('./models/encryptedUser');
const bodyParser = require('body-parser');
// const utils = require('./utils');
// const utils = require('./utils');
const utils = require('./utils');
// console.log(utils.encrypt('sumedh'));

mongoose.connect('mongodb://sumedh:campus-crush@ds129706.mlab.com:29706/campus-crush');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());
// app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  let newUser = {};
  let encryptedUser = new user();
  newUser.name = req.body.name;
  newUser.your_fb = req.body.ownfblink;
  newUser.crush_fb = req.body.crushfblink;
  newUser.mobile_no = req.body.ownconumber;
  newUser.created_at = new Date();

  utils.encrypt(newUser).then(data => {
    encryptedUser.data = data;
    console.log(encryptedUser);
    encryptedUser.save((err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(`Saved data: ${data}`);
    });
  });
  res.render('index');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
