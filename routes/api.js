const express = require('express');
const router = express.Router();

const goalController = require('../controllers/GoalController');

router.post('/goal', goalController.createGoal);

module.exports = router;