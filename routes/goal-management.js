const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

const goalController = require('../controllers/GoalController');



// get goals
router.get('/goals', goalController.getGoals);

// create new goal
router.post('/goals', jsonParser, goalController.createGoal);

// update existing goal
router.put('/goal/:id', goalController.updateGoal);


module.exports = router;