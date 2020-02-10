const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Step model
const Step = require('./Step');

const schema = new Schema({
	name: String,
	description: String,
	steps: [
		Step.schema
	],
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Goal = mongoose.model('Goal', schema);

module.exports = Goal;