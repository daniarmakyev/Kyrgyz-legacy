const { User } = require('../models/models');
const sequelize = require('../db');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Секретный ключ и время жизни токена
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

class UserController {
    // Генерация JWT токена
    generateToken(user) {
        return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
    }

    async register(req, res) {
        const transaction = await sequelize.transaction();
        try {
            const { email, password, passwordConfirm, lang } = req.body;
            
            console.log("Received data:", { email, password, passwordConfirm, lang });

            if (!email || !validator.isEmail(email)) {
                await transaction.rollback();
                return res.status(400).json({ error: 'Incorrect mail format' });
            }

            const allowedLangs = ['ru', 'en', 'hi'];
            if (!allowedLangs.includes(lang)) {
                await transaction.rollback();
                return res.status(400).json({ error: 'Invalid language selected' });
            }

            const passwordErrors = [];
            if (password.length < 8) {
                passwordErrors.push('The password must contain at least 8 characters');
            }
            if (!/[a-z]/.test(password)) {
                passwordErrors.push('The password must contain at least one letter');
            }
            if (!/[0-9]/.test(password)) {
                passwordErrors.push('The password must contain at least one number');
            }
            if (password !== passwordConfirm) {
                passwordErrors.push('Passwords do not match');
            }

            if (passwordErrors.length) {
                await transaction.rollback();
                return res.status(400).json({ errors: passwordErrors });
            }

            const existingUser = await User.findOne({ where: { email } }, { transaction });
            if (existingUser) {
                await transaction.rollback(); 
                return res.status(400).json({ error: 'A user with this email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                email,
                password: hashedPassword,
                lang,
                lives: 5
            }, { transaction });

            await transaction.commit(); 

            const token = this.generateToken(newUser); // Генерация токена
            res.status(201).json({ user: newUser, token });
        } catch (error) {
            await transaction.rollback(); 
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const token = this.generateToken(user); // Генерация токена при логине
            res.status(200).json({ user, token });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async check(req, res) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            res.status(200).json(decoded);
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    }
}

module.exports = new UserController();
