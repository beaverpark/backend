const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/mydb';

mongoose.connect(url, {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useFindAndModify: false
})

mongoose.connection.on('connected', () => {
	console.log('MongoDB successfully connected.');
});

mongoose.connection.on('error', (err) => {
	console.log('MongoDB connection error: ' + err);
});

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log('MongoDB connection closed due to app termination.');
		process.exit(0);
	});
})

module.exports = mongoose;