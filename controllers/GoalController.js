// TODO:temp import
const mongoose = require('mongoose');

const Goal = require('../models/Goal');
const Step = require('../models/Step');

// const goal = new Goal({
// 	name: "Read more books",
// 	description: "get more knowledge by finishing 1 book per month",
// 	steps: [
// 		{
// 			name: "test1",
// 			description: "test2"
// 		},
// 		{
// 			name: "test3",
// 			description: "test4"
// 		}
// 	],
// 	user_id: mongoose.Types.ObjectId("5e3b8ed3c6590621c60b2bd1")
// });

// Goal.create(goal, (err, goal) => {

// 	if(err) {
// 		console.log(err);
// 	}

// 	console.log("Successfully created Goal.")
// 	console.log(goal);

// });




exports.createGoal = (req, res) => {

	const goal = new Goal({
		name: req.body.name,
		description: req.body.description,
		steps: [
			{
				name: "test1",
				description: "test2"
			},
			{
				name: "test3",
				description: "test4"
			}
		],
		user_id: ObjectId(req.user._id)
	});

	Goal.create(goal, (err, goal) => {

		if(err) {
			console.log(err);
		}

		console.log("Successfully created Goal.")
		console.log(goal);

	});

}

exports.updateGoal = (req, res) => {

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