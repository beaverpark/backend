const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	email: String,
	password: String,
	first_name: String,
	last_name: String
	// goals: [
	// 	{
	// 		name: String,
	// 		description: String,
	// 		steps: [
	// 			{
	// 				name: String,
	// 				description: String
	// 			}
	// 		]
	// 	}
	// ]
});

const User = mongoose.model('User', schema);

module.exports = User;