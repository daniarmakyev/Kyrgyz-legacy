const { Question } = require('../models/models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

class QuestionController {
  async getQuestionsBySetId(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'Authorization token is required' });

      jwt.verify(token, JWT_SECRET, (err) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
      });

      const { setId } = req.params; 

      const questions = await Question.findAll({
        where: { questionSetId: setId },
      });

      if (!questions.length) {
        return res.status(404).json({ error: 'No questions found for the specified set ID' });
      }

      res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new QuestionController();
