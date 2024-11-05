const { Word } = require('../models/models');
const sequelize = require('../db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

class WordController {
    async addWord(req, res) {
        const transaction = await sequelize.transaction();
        try {
            const {
                wordId,
                word,
                translationRu,
                translationEn,
                translationHi,
                level
            } = req.body;

            const newWord = await Word.create({
                wordId,
                word,
                translationRu,
                translationEn,
                translationHi,
                level,
            }, { transaction });

            await transaction.commit();
            res.status(201).json(newWord);
        } catch (error) {
            await transaction.rollback();
            console.error('Error adding word:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getWordById(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'Authorization token is required' });
            }

            jwt.verify(token, JWT_SECRET, (err) => {
                if (err) {
                    return res.status(403).json({ error: 'Invalid token' });
                }
            });

            const { id } = req.params;

            const word = await Word.findByPk(id);
            if (!word) {
                return res.status(404).json({ error: 'Word not found' });
            }

            res.status(200).json(word);
        } catch (error) {
            console.error('Error fetching word:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getWordByLevel(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'Authorization token is required' });
            }

            jwt.verify(token, JWT_SECRET, (err) => {
                if (err) {
                    return res.status(403).json({ error: 'Invalid token' });
                }
            });

            const { level } = req.params;

            const words = await Word.findAll({
                where: { level }
            });

            if (!words.length) {
                return res.status(404).json({ error: 'No words found for the specified level' });
            }

            res.status(200).json(words);
        } catch (error) {
            console.error('Error fetching words by level:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteWord(req, res) {
        const transaction = await sequelize.transaction();
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'Authorization token is required' });
            }
            jwt.verify(token, JWT_SECRET, (err) => {
                if (err) {
                    return res.status(403).json({ error: 'Invalid token' });
                }
            });

            const { id } = req.params;

            const word = await Word.findByPk(id);
            if (!word) {
                await transaction.rollback();
                return res.status(404).json({ error: 'Word not found' });
            }

            await word.destroy({ transaction });
            await transaction.commit();
            res.status(200).json({ message: 'Word deleted successfully' });
        } catch (error) {
            await transaction.rollback();
            console.error('Error deleting word:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new WordController();
