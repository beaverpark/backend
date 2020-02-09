const User = require('../models/User');

exports.getUser = (req, res) => {

	User.find((err, users) => {
		if(err) {
			console.log(err)
		}

		console.log(users)

		res.send(users);
	});
}

exports.createUser = (req, res) => {
	
	User.create({email: 'a@a.com', password: 'A', first_name: 'Ryan', last_name: 'Park'}, (err, user) => {
		if(err) {
			console.log(err);
		}

		console.log("Successfully created User.")
		console.log(user);
	});

}

exports.updateUser = (req, res) => {

}