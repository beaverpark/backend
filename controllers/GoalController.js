const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Goal = require('../models/Goal');
const Step = require('../models/Step');

// TODO: add logger

// TODO: do this only for a user
// [GET] Get all goals
// success: 200
// server error: 500
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
// success: 200
// no goal found: 404
// server error: 500
exports.getGoal = (req, res, next) => {

	const goalId = req.params.id;

	Goal.findById(ObjectId(goalId))
	.then(goal => {
		console.log(goal)

		if(goal == null) {
			res.status(404).send('Goal not found');
		} else {
			res.send(goal);
		}
	})
	.catch(err => {
		next(err);
	});
};


// If a new resource is created, the origin server MUST inform the user agent 
// via the 201 (Created) response. If an existing resource is modified, either 
// the 200 (OK) or 204 (No Content) response codes SHOULD be sent to indicate 
// successful completion of the request.

// 204 No Content is however, very useful for ajax web services which may want 
// to indicate success without having to return something. (Especially in cases 
// like DELETE or POSTs that don't require feedback). If the resource is 
// successfully deleted


// [POST] Create a goal for a user
// success: 201 (created)
// server error: 500 
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
		res.status(201).send(goal);
	})
	.catch((err) => {
		console.log(err);
		res.sendStatus(500);
	}) 
};


// Update a goal by its goal id
exports.updateGoal = (req, res) => {

	console.log(req.params);

	const goalId = req.params.id;

	//update

	res.send(goalId);
}

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