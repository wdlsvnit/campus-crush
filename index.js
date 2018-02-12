'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const user = require('./models/user.js');

// console.log(user);

mongoose.connect('mongodb://sumedh:campus-crush@ds129706.mlab.com:29706/campus-crush');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
// app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  console.log('post received');
  let newMajnu = new user();
  newMajnu.firstname = 'sumedh';
  console.log(newMajnu);
  res.render('index');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
