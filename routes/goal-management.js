const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

const checkValidObjectId = require('../utils').checkValidObjectId;
const goalController = require('../controllers/GoalController');


// =============
// MANAGE GOALS
// =============

// get goals
// 200 (success)
router.get('/goals', goalController.getGoals);

// get the specified goal
// 200 (success), 422 (invalid id), 404 (goal not found)
router.get('/goals/:id', goalController.getGoal);

// create a new goal
// 201 (success) with header 'Location' 
router.post('/goals', jsonParser, goalController.createGoal);

// update the specified goal
// 200 (success), 422 (invalid id), 404 (goal not found)
router.patch('/goals/:id', jsonParser, goalController.updateGoal);

// delete the specified goal
// 200 (success), 422 (invalid id), 404 (goal not found)
router.delete('/goals/:id', goalController.deleteGoal);


// =============
// MANAGE STEPS
// =============

// get all steps with the specified goal
// 200 (success), 422 (invalid id), 404 (goal not found)
router.get('/goals/:id/steps/', jsonParser, goalController.getSteps);

// get the specified step
// 200 (success), 422 (invalid id), 404 (goal/step not found)
router.get('/goals/:goalId/steps/:stepId', jsonParser, goalController.getStep);

// create a new step
// 201 (success) with header 'Location' 
router.post('/goals/:id', jsonParser, goalController.createStep);

// update the specified step
// 200 (success), 422 (invalid id), 404 (goal/step not found)
router.patch('/goals/:goalId/steps/:stepId', jsonParser, goalController.updateStep);

// delete the specified step
// 200 (success), 422 (invalid id), 404 (goal/step not found)
router.delete('/goals/:goalId/steps/:stepId', jsonParser, goalController.deleteStep);


module.exports = router;