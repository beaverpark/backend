const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const User = require('./models/User');

app.use(express.static(path.join(__dirname, 'public')));

//TODO: make api.beaver.com/

app.get('/api/test', (req, res) => {
	console.log('/api/test called');
	res.json(testJSON);
});

// Routes
app.use('/api', require('./routes/api'));
app.use('/dashboard', require('./routes/dashboard'));


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


const port = process.env.port || 3000;

app.listen(port, (error) => {

	if(error) {
	  logger.error(error);
	  process.exit(1);
	}

	console.log(`server listening on port ${port}`)
});
