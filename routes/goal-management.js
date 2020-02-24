const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const checkValidObjectId = require('../utils').checkValidObjectId;


const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

const goalController = require('../controllers/GoalController');


// get goals
router.get('/goals', goalController.getGoals);

// create a new goal
router.post('/goals', jsonParser, goalController.createGoal);

// get the specified goal
router.get('/goals/:id', checkValidObjectId, goalController.getGoal);

// update the specified goal
router.put('/goals/:id', goalController.updateGoal);

// delete the specified goal
router.delete('/goals/:id', goalController.deleteGoal);



module.exports = router;