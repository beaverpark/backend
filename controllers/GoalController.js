const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Goal = require('../models/Goal');
const Step = require('../models/Step');

// TODO: add logger
// TODO: do these only for a single user

// [GET] Get all goals
// 200 (success)
// TODO: pagination if list is too long
exports.getGoals = (req, res, next) => {

	Goal.find()
	.then(goals => {

		console.log(goals);

		res.send(goals);
	})
	.catch(err => {
		next(err);
	});
};

// [GET] Get a goal by its id
// 200 (success), 422 (invalid id), 404 (goal not found)
exports.getGoal = (req, res, next) => {

	const goalId = req.params.id;

	Goal.findById(ObjectId(goalId))
	.then(goal => {
		console.log(goal)

		if(goal == null) {
			res.status(404).end('Not Found');
		} else {
			res.send(goal);
		}
	})
	.catch(err => {
		next(err);
	});
};

// [POST] Create a goal for a user
// 201 (success) with header 'Location' 
exports.createGoal = (req, res) => {

	// TODO: sanitize req.body (use req.body.hasOwnProperty("steps"))

	// TODO: temp
	const userId = "5e3b8ec2c2918321af88b614";

	console.log(req.body)

	const newGoal = new Goal({
		name: req.body.name,
		description: req.body.description,
		steps: req.body.steps,
		user_id: ObjectId(userId)
	});

	Goal.create(newGoal)
	.then((goal) => {
		console.log(goal);

		// TODO: prod url support
		res.setHeader('Location', `http://localhost:3000/goal-management/goals/${goal._id}`);
		res.status(201).send(goal);
	})
	.catch((err) => {
		next(err);
	}) 
};

// [PUT] update a specified goal
// 200 (success), 422 (invalid id), 404 (goal not found)
exports.updateGoal = (req, res) => {

	console.log(req.params)
	console.log(req.body)

	const goalId = req.params.id;

	//TODO: this works, but it actually updates the id of the Steps
	// need to figure out how not to

	const updatedGoal = {
		name: req.body.name,
		description: req.body.description,
		steps: req.body.steps,
		user_id: ObjectId(req.body.user_id)
	};

	Goal.findByIdAndUpdate(goalId, updatedGoal, {new: true})
	.then((goal, a) => {
		console.log(goal);

		if(goal == null) {
			res.status(404).end('Not Found');
		} else {
			res.send(goal);
		}
	})
	.catch((err) => {
		next(err);
	})
};

exports.deleteGoal = (req, res) => {

	console.log(req.params);

	const goalId = req.params.id;

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