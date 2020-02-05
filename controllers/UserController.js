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
	
	User.create({_id: '1', email: 'a@a.com', password: 'a', first_name: 'AB', last_name: 'CD'}, (err, user) => {
		if(err) {
			console.log(err);
		}

		console.log("Successfully created User.")
		console.log(user);
	});

}

exports.updateUser = (req, res) => {

}