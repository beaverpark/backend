const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	step_id: Number,
	start_time: Date,
	end_time: Date,
	duration: String
});

const Star = mongoose.model('Star', schema);

module.exports = Star;