const express = require('express');
const RateLimit = require('express-rate-limit');
const router = express.Router();
const userController = require('../controllers/userController');
const questionController = require('../controllers/questionController');


const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 300, 
  message: "Слишком много запросов с этого IP, попробуйте позже."
});

router.post('/register', limiter, userController.register);
router.post('/login', limiter, userController.login);
router.get('/auth', limiter, userController.check);
router.patch('/updateUser', limiter, userController.updateUser);
router.post('/token/refresh', limiter, userController.refresh);

router.get('/question', questionController.getQuestionsBySetId);
router.get('/me', userController.getUser);

module.exports = router;
