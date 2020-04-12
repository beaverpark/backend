const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Goal = require('../models/Goal');
const Step = require('../models/Step');
const checkValidObjectId = require('../utils').checkValidObjectId;

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

	if(!checkValidObjectId(goalId)) {
		res.status(422).end('Not a valid object id.');
		return;
	}

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
		console.log(err)
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
	});
};

// [PATCH] update the specified goal
// 200 (success), 422 (invalid id), 404 (goal not found)
exports.updateGoal = (req, res, next) => {

	const goalId = req.params.id;

	if(!checkValidObjectId(goalId)) {
		res.status(422).end('Not a valid object id.');
		return;
	}

	// console.log(req.params)
	console.log(req.body)

	const updatedGoal = {
		name: req.body.name,
		description: req.body.description
	};

	Goal.findOneAndUpdate({'_id': goalId}, updatedGoal, {new: true})
	.then((goal) => {
		console.log(goal);

		if(goal == null) {
			res.status(404).end('Not Found');
		} else {
			res.send(goal);
		}
	})
	.catch((err) => {
		next(err);
	});
};

// [DELETE] delete the specified goal
// 200 (success), 422 (invalid id), 404 (goal not found)
exports.deleteGoal = (req, res) => {

	console.log(req.params);

	const goalId = req.params.id;

	if(!checkValidObjectId(goalId)) {
		res.status(422).end('Not a valid object id.');
		return;
	}

	Goal.deleteOne({'_id': goalId})
	.then((result) => {
		console.log(result)

		if(result.deletedCount == 0) {
			res.status(404).end('Not Found');
		} else {
			res.status(200).end();
		}
	})
	.catch((err) => {
		next(err);
	});
}

// [GET] Get all steps for the specified goal
// 200 (success), 422 (invalid id), 404 (goal not found)
// TODO: pagination if list is too long
exports.getSteps = (req, res, next) => {

	const goalId = req.params.id;

	if(!checkValidObjectId(goalId)) {
		res.status(422).end('Not a valid object id.');
		return;
	}

  // db.goals.find({"_id":ObjectId("...")}, {_id:0, steps:1})
	Goal.find({'_id': goalId}, {_id:0, steps:1})
	.then(goal => {
		console.log(goal);

		if(goal == null || goal.length == 0) {
			res.status(404).end('Not Found');
		} else {
			res.send(goal[0].steps);
		}
	})
	.catch(err => {
		next(err);
	});
};

// [GET] Get the specified step
// 200 (success), 422 (invalid id), 404 (goal/step not found)
exports.getStep = (req, res, next) => {

	const goalId = req.params.goalId;
	const stepId = req.params.stepId;

	if(!checkValidObjectId(goalId) || !checkValidObjectId(stepId)) {
		res.status(422).end('Not a valid object id.');
		return;
	}

	// db.goals.find({"_id":ObjectId("..."), "steps._id":ObjectId("...")}, {_id:0, "steps.$":1})
	Goal.find({'_id': goalId, 'steps._id': stepId}, {_id:0, 'steps.$':1})
	.then(goal => {
		console.log(goal);

		if(goal == null || goal.length == 0) {
			res.status(404).end('Not Found');
		} else {
			res.send(goal[0].steps[0]);
		}
	})
	.catch(err => {
		console.log(err)
		next(err);
	});
};

// [POST] Create a new step for the specified goal
// 201 (success) with header 'Location', 422 (invalid id), 404 (goal not found)
exports.createStep = (req, res) => {

	const goalId = req.params.id;

	if(!checkValidObjectId(goalId)) {
		res.status(422).end('Not a valid object id.');
		return;
	}

	const newStep = new Step({
		name: req.body.name,
		description: req.body.description
	});

	const pushStep = {
		'$push': {'steps': newStep}
	};

	// db.goals.findOneAndUpdate({"_id": ObjectId("...")}, {$push:{ "steps": "..."}}, {returnNewDocument: true})
	Goal.findOneAndUpdate({'_id': goalId}, pushStep, {new: true})
	.then((goal) => {
		console.log(goal);

		if(goal == null) {
			res.status(404).end('Not Found');
		} else {

			res.setHeader('Location', `http://localhost:3000/goal-management/goals/${goal._id}/steps/${newStep._id}`);
			res.status(201).send(newStep);

			// res.send(goal);
		}
	})
	.catch((err) => {
		next(err);
	});
}

// [PATCH] update the specified step in a goal
// 200 (success), 422 (invalid id), 404 (goal/step not found)
exports.updateStep = (req, res, next) => {

	const goalId = req.params.goalId;
	const stepId = req.params.stepId;

	if(!checkValidObjectId(goalId) || !checkValidObjectId(stepId)) {
		res.status(422).end('Not a valid object id.');
		return;
	}

	console.log(req.body)

	const updatedStep = {
		'steps.$.name': req.body.name,
		'steps.$.description': req.body.description
	};

	// db.goals.findOneAndUpdate({"_id": ObjectId("..."), "steps._id": ObjectId("...")}, {$set:{ "steps.$.name": "..."}}, {returnNewDocument: true})
	Goal.findOneAndUpdate({'_id': goalId, 'steps._id': stepId}, updatedStep, {new: true})
	.then((goal) => {
		console.log(goal);

		if(goal == null) {
			res.status(404).end('Not Found');
		} else {
			res.send(goal);
		}
	})
	.catch((err) => {
		next(err);
	});
}

// [DELETE] delete the specified step in a goal
// 200 (success), 422 (invalid id), 404 (goal/step not found)
exports.deleteStep = (req, res) => {

	const goalId = req.params.goalId;
	const stepId = req.params.stepId;

	if(!checkValidObjectId(goalId) || !checkValidObjectId(stepId)) {
		res.status(422).end('Not a valid object id.');
		return;
	}

	const pullStep = {
		'$pull': {'steps': {'_id':stepId}}
	};

	// db.goals.findOneAndUpdate({"_id":ObjectId("..."),"steps._id": ObjectId("...")}, {$pull: {"steps" : {"_id":ObjectId("...")}}}, {returnNewDocument: true})
	Goal.findOneAndUpdate({'_id': goalId, 'steps._id': stepId}, pullStep, {new: true})
	.then((goal) => {
		console.log(goal)

		if(goal == null) {
			res.status(404).end('Not Found');
		} else {
			res.send(goal);
		}
	})
	.catch((err) => {
		next(err);
	});
}

exports.createStar = (req, res) => {

}

exports.updateStar = (req, res) => {

}

exports.deleteStar = (req, res) => {

}