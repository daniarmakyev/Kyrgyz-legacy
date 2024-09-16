const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const cors = require('cors');

const PORT = process.env.PORT || 9000;
const router = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());

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
