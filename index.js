'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;
const bodyparser = require('body-parser');

app.set('view engine', 'hbs');
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));
// app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  console.log(req.body);
  alert("ok");
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
