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

// [PUT] replace entire document with specified one
// Note: if '_id' of steps are missing, new objects are created with new '_id's
// 200 (success), 422 (invalid id), 404 (goal not found)
exports.replaceGoal = (req, res, next) => {

	console.log(req.params)
	console.log(req.body)

	const goalId = req.params.id;

	const replacedGoal = {
		name: req.body.name,
		description: req.body.description,
		steps: req.body.steps,
		user_id: ObjectId(req.body.user_id)
	};

	Goal.findOneAndReplace({'_id': goalId}, replacedGoal, {new: true})
	.then((goal) => {

		if(goal == null) {
			res.status(404).end('Not Found');
		} else {
			console.log(goal);

			res.send(goal);
		}
	})
	.catch((err) => {
		next(err);
	})
};

// [PATCH] update a specified goal
// 200 (success), 422 (invalid id), 404 (goal not found)
exports.updateGoal = (req, res, next) => {

	console.log(req.params)
	console.log(req.body)

	const goalId = req.params.id;

	const updatedGoal = {
		name: req.body.name,
		description: req.body.description,
		steps: req.body.steps,
		user_id: ObjectId(req.body.user_id)
	};

	Goal.findOne({'_id': goalId})
	.then((goal) => {

		if(goal == null) {
			res.status(404).end('Not Found');
		} else {
			console.log(goal);

			//TODO: only update fields that are specified			


			res.send(goal);
		}
	})
	.catch((err) => {
		next(err);
	})
};


// NOTE: findOneAndReplace() matches with PUT while findOneAndUpdate() matches with PATCH

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