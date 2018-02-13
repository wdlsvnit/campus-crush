'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const user = require('./models/user');
const match = require('./models/matches');
const bodyParser = require('body-parser');
const utils = require('./utils');
const configs = require('./config');

mongoose.connect(`mongodb://${configs.db_username}:${configs.db_password}@ds129706.mlab.com:29706/campus-crush`);

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/thankyou', (req, res) => {
  res.render('thankyou');
});

app.post('/', (req, res) => {
  let newUser = new user();
  newUser.name = req.body.name;
  newUser.your_fb = req.body.ownfblink;
  newUser.crush_fb = req.body.crushfblink;
  newUser.mobile_no = req.body.ownconumber;
  newUser.created_at = new Date();

  newUser.save((err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(`User saved: ${data}`);
    utils.checkForMatch(data)
      .then(response => {
        let newMatch = new match();
        newMatch.matches = response.matches;
        console.log(`Saving ${newMatch} to db`);
        newMatch.save(err, res => {
          if (err) return handleError(err);
          console.log(`Match saved: ${res}`);
        });
      })
      .catch(error => { console.log(error); });

  });
  res.redirect('/thankyou');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
