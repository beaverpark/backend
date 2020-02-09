const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	name: String,
	description: String,
	steps: [
		{
			name: String,
			description: String
		}
	]
	// ,
	// user_id: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'User'
	// }
});

const Goal = mongoose.model('Goal', schema);

module.exports = Goal;