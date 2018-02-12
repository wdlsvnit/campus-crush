const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userschema = new Schema({
	name : { type : String, required : true },
	lastname : { type : String, required : true },
  your_fb : { type : String, required : true },
  crush_fb : { type : String, required : true },
	created_at : Date
});

const User = mongoose.model('User', userschema);
module.exports = User;
