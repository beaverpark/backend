const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	name: String,
	description: String
});

const Step = mongoose.model('Step', schema);

module.exports = Step;