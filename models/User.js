const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	id: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	}
});

const User = mongoose.model('User', schema);

module.exports = User;