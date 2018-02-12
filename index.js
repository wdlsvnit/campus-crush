'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const user = require('./models/user');
const bodyParser = require('body-parser');

// console.log(user);

// mongoose.connect('mongodb://kevin:kevin@ds129706.mlab.com:29706/campus-crush');
mongoose.connect('mongodb://sumedh:campus-crush@ds129706.mlab.com:29706/campus-crush');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());
// app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  let newMajnu = new user();
  newMajnu.name = req.body.name;
  newMajnu.your_fb = req.body.ownfblink;
  newMajnu.crush_fb = req.body.crushfblink;
  newMajnu.mobile_no = req.body.ownconumber;
  newMajnu.created_at = new Date();
  newMajnu.save((err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });
  res.render('index');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
