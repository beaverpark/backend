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
	
	User.create({id: 2, email: 'b@b.com', password: 'b', firstName: 'AB', lastName: 'CD'}, (err, user) => {
		if(err) {
			console.log(err);
		}

		console.log("Successfully created User.")
		console.log(user);
	})

}

exports.updateUser = (req, res) => {

}