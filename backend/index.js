const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 8080;
const router = require('./routes/index');
const cron = require('node-cron');
const {User} = require('./models/models')

const app = express();

const restoreUserLives = async () => {
    try {
        const allUsers = await User.findAll();

        for (const user of allUsers) {
            if (user.lives < 5) {
                user.lives += 1;
                await user.save();
                console.log(`Restored life for user: ${user.id}, new lives: ${user.lives}`);
            }
        }
    } catch (error) {
        console.error('Error restoring lives:', error);
    }
};

cron.schedule('*/15 * * * * *', () => {
    console.log('Running restoreUserLives task');
    restoreUserLives();
});

app.use(cors());
app.use(express.json());

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();
