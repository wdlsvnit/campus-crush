const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userschema = new Schema({
	data : { type : String, required : true }
});

const User = mongoose.model('user', userschema);
module.exports = User;
