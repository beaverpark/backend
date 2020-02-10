const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const User = require('./models/User');

app.use(express.static(path.join(__dirname, 'public')));

//TODO: make api.beaver.com/
//TODO: make accounts.beaver.com/

app.get('/api/test', (req, res) => {
	console.log('/api/test called');
	res.json(testJSON);
});

// Routes
app.use('/goal-management', require('./routes/goal-management'));
app.use('/temp', require('./routes/temp'));

const port = process.env.port || 3000;

app.listen(port, (error) => {

	if(error) {
	  logger.error(error);
	  process.exit(1);
	}

	console.log(`server listening on port ${port}`)
});
