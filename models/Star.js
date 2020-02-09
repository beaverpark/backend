const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	start_time: Date,
	end_time: Date,
	duration: String,
	step_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User.goals.steps'		
	}
});

const Star = mongoose.model('Star', schema);

module.exports = Star;