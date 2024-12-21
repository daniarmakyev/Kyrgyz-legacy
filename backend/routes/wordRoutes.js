const express = require('express');
const RateLimit = require('express-rate-limit');
const router = express.Router();
const multer = require('multer');
const wordController = require('../controllers/wordController');
const storage = multer.memoryStorage(); 
const upload = multer({ storage });
const authenticateToken = require('../middleware/jwtTokenMiddleware');

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: "Слишком много запросов с этого IP, попробуйте позже."
});

router.post('/addWord', limiter, upload.fields([{ name: 'manSound' }, { name: 'womanSound' }]), wordController.addWord);
router.get('/getWordById/:id', limiter, authenticateToken, wordController.getWordById);
router.get('/level/:level', limiter, authenticateToken, wordController.getWordByLevel);
router.delete('/deleteWord/:id', limiter, authenticateToken, wordController.deleteWord);

module.exports = router;
