const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');
const multer = require('multer');
const path = require('path');
const authenticateToken = require('../middleware/jwtTokenMiddleware'); // Импортируй middleware

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Добавляем маршруты
router.post('/addWord', authenticateToken, upload.fields([{ name: 'manSound' }, { name: 'womanSound' }]), wordController.addWord); 
router.get('/getWordById/:id', authenticateToken, wordController.getWordById); 
router.get('/level/:level', authenticateToken, wordController.getWordByLevel); 
router.delete('/deleteWord/:id', authenticateToken, wordController.deleteWord); 

module.exports = router;
