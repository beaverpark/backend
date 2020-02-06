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
	
	User.create({email: 'b@b.com', password: 'b', first_name: 'David', last_name: 'Kim'}, (err, user) => {
		if(err) {
			console.log(err);
		}

		console.log("Successfully created User.")
		console.log(user);
	});

}

exports.updateUser = (req, res) => {

}