const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// valid mongodb id checker middleware
exports.checkValidObjectId = (req, res, next) => {

	const id = req.params.id;

	try {
		const objectId = mongoose.Types.ObjectId(id);

		if(objectId == id) {
			// if valid id, move on to next middleware
			next();

		} else {
			// catches id that is 24-character hex, but not a valid mongodb id
			res.status(422).end('Not a valid object id.');
		}
	} catch(err) {
		// catches any id that is not 24-character hex
		res.status(422).end('Not a valid object id.');
	}
}
