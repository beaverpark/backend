const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/my-page', userController.getUser);

router.post('/signup', userController.createUser);

userController.createUser();

module.exports = router;