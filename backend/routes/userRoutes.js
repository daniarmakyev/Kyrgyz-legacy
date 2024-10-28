const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const questionCotroller = require('../controllers/questionCotroller');

router.post('/register', userController.register);

router.get('/question', questionCotroller.getQuestionsBySetId)

router.post('/login', userController.login);

router.get('/auth', userController.check);

router.get('/me', userController.getUser);

router.patch('/updateUser', userController.updateUser);

router.post('/token/refresh', userController.refresh);

module.exports = router;