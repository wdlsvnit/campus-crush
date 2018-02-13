const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchschema = new Schema({
  matches: { type: [], required: false }
});

const Match = mongoose.model('match', matchschema);
module.exports = Match;
