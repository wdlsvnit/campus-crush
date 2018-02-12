const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userschema = new Schema({
	// firstname : { type : String, required : true },
	name : { type : String, required : true },
  your_fb : { type : String, required : true },
  crush_fb : { type : String, required : true },
	mobile_no: { type: Number, required: true },
	created_at : Date
});

const User = mongoose.model('user', userschema);
module.exports = User;
