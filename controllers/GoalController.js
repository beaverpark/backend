const mongoose = require('mongoose');
const Goal = require('../models/Goal');
const Step = require('../models/Step');

// TODO: add logger

// TODO: do this only for a user
// Get all goals of a user
exports.getGoals = (req, res) => {

	Goal.find()
	.then(goals => {

		console.log(goals);

		res.send(goals);
	})
	.catch(err => {
		console.log(err);
	});
};

// Create a goal for a user
exports.createGoal = (req, res) => {

	// TODO: sanitize req.body (use req.body.hasOwnProperty("steps"))

	// TODO: temp
	const userId = "5e3b8ec2c2918321af88b614";

	console.log(req.body)

	const newGoal = new Goal({
		name: req.body.name,
		description: req.body.description,
		steps: req.body.steps,
		user_id: mongoose.Types.ObjectId(userId)
	});

	Goal.create(newGoal)
	.then((goal) => {
		console.log(goal);
	})
	.catch((err) => {
		console.log(err);
	}) 

};

// Update a goal by its goal id
exports.updateGoal = (req, res) => {

	const goalId = req.params.id;

	console.log(goalId)

	//update

	res.send(goalId);
}

exports.deleteGoal = (req, res) => {

}

exports.createStep = (req, res) => {

}

exports.updateStep = (req, res) => {

}

exports.deleteStep = (req, res) => {

}

exports.createStar = (req, res) => {

}

exports.updateStar = (req, res) => {

}

exports.deleteStar = (req, res) => {

}