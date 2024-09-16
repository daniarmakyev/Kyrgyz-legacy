const { Word } = require('../models/models');
const sequelize = require('../db');

class WordController {
    async addWord(req, res) {
        const transaction = await sequelize.transaction();
        try {
            const { wordId, word, translationRu, translationEn, translationHi, sound, level } = req.body; // добавлено wordId

            const newWord = await Word.create({
                wordId, 
                word,
                translationRu,
                translationEn,
                translationHi,
                sound,
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
            const { level } = req.params; 

            const words = await Word.findAll({ where: { level } });
    
            if (!words.length) {
                return res.status(404).json({ error: 'No words found for the specified level' });
            }
    
            // Отправить массив слов в ответе
            res.status(200).json(words);
        } catch (error) {
            console.error('Error fetching words by level:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    async deleteWord(req, res) {
        const transaction = await sequelize.transaction();
        try {
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
