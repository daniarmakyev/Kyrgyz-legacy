const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');


router.post('/addWord', wordController.addWord);
router.get('/getWordById/:id', wordController.getWordById); 
router.get('/level/:level', wordController.getWordByLevel);
router.delete('/deleteWord/:id', wordController.deleteWord);

module.exports = router


