const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const checkValidObjectId = require('../utils').checkValidObjectId;


const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

const goalController = require('../controllers/GoalController');


// get goals
// 200 (success)
router.get('/goals', goalController.getGoals);

// get the specified goal
// 200 (success), 422 (invalid id), 404 (goal not found)
router.get('/goals/:id', checkValidObjectId, goalController.getGoal);

// create a new goal
// 201 (success) with header 'Location' 
router.post('/goals', jsonParser, goalController.createGoal);

// update the specified goal
// 200 (success), 422 (invalid id), 404 (goal not found)
router.put('/goals/:id', checkValidObjectId, jsonParser, goalController.updateGoal);

// TODO: patch for partial update is also available (doesn't need to be idempotent)

// delete the specified goal
router.delete('/goals/:id', goalController.deleteGoal);



module.exports = router;