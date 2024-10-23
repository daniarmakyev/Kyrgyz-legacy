const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 8080;
const router = require('./routes/index');
const cron = require('node-cron');
const {User} = require('./models/models')
const { Op } = require('sequelize');


const app = express();
const restoreUserLives = async () => {
    try {
        const [numberOfAffectedRows] = await User.update(
            { lives: sequelize.literal('lives + 1') },
            { where: { lives: { [Op.lt]: 5 } } }
        );

        console.log(`Restored lives for ${numberOfAffectedRows} users.`);
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