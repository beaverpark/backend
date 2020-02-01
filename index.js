const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');

const User = require('./models/User');

// console.log(User);

//TODO: if I require mongoose and connect once, 
//subsequence mongose import in other files get conneciton too?
// how does User get connection?

app.use(express.static(path.join(__dirname, 'public')));

//TODO: make api.beaver.com/

app.get('/api/test', (req, res) => {
	console.log('/api/test called');
	res.json(testJSON);
});

User.find((err, users) => {
	// console.log("hi")

	// if(err) {
	// 	console.log(err)
	// }

	// 	// console.log(1);
	// console.log(users)
});



app.get('/users', (req, res) => {

	mongoose.model('User').find((err, users) => {
		console.log(1);
		// console.log(users)
	});


mongoose.model('User').find((err, users) => {
	console.log(2);
	// console.log(users)
});




});

// db.model('')	

// auth
// 0. login user
// /signin

// 1. create user
// POST /signup

// 2. update user
// PUT /api/user

// 3. delete user
// DELETE /api/user




// actions
// 1. add goal
// /api/user
// - 201 response

// 2. add step
// /api/user
// - 201 response

// 3. mark start time for a step
// 4. mark end time for a started step
// 

app.post('/api/user/', (req, res) => {



});




const port = process.env.port || 3000;

app.listen(port, (error) => {

	if(error) {
	  logger.error(error);
	  process.exit(1);
	}

	console.log(`server listening on port ${port}`)
});
