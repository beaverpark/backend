const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	_id: Number,
	name: String,
	description: String
});

const Goal = mongoose.model('Goal', schema);

module.exports = Goal;