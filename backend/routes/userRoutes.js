const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Маршрут для регистрации пользователя
router.post('/register', userController.register);

// Маршрут для входа пользователя
router.post('/login', userController.login);

// Маршрут для проверки валидности токена
router.get('/auth', userController.check);

router.get('/me', userController.getUser);

// Маршрут для обновления access-токена через refresh-токен
router.post('/token/refresh', userController.refresh);

module.exports = router;
