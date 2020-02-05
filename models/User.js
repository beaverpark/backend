const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: implement auto increment

const schema = new Schema({
	_id : Number,
	email: String,
	password: String,
	first_name: String,
	last_name: String
});

const User = mongoose.model('User', schema);

module.exports = User;