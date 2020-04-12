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

app.listen(port, (err) => {

	if(err) {
	  logger.error(err);
	  process.exit(1);
	}

	console.log(`server listening on port ${port}`)
});

// console.log(app.locals)


// catch any unsupported route for displaying 404
app.use((req, res, next) => {
	res.status(404).end('Not Found');
});

// custom error handler
app.use((err, req, res, next) => {
	// in dev, just use the default error handler
	if(req.app.get('env') === 'development') {
		next(err);
	} else {
		// in production, log the actual error and show 500 Internal Server Error
		// TODO: log the error somewhere
		console.log(err);

	  res.status(500).send('Internal Server Error');
	}
});