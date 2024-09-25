const {
    User
} = require('../models/models');
const sequelize = require('../db');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Секретный ключ и время жизни токена
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m'; // Access-токен на 15 минут
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d'; // Refresh-токен на 7 дней

class UserController {
    constructor() {
        this.generateTokens = this.generateTokens.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.refresh = this.refresh.bind(this);
        this.check = this.check.bind(this);
    }

    generateTokens(user) {
        const accessToken = jwt.sign({
            id: user.id,
            email: user.email
        }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        const refreshToken = jwt.sign({
            id: user.id,
            email: user.email
        }, JWT_SECRET, {
            expiresIn: JWT_REFRESH_EXPIRES_IN,
        });

        return {
            accessToken,
            refreshToken
        };
    }

    async register(req, res) {
        const transaction = await sequelize.transaction();
        let isTransactionFinished = false;

        try {
            const {
                email,
                password,
                passwordConfirm,
                lang
            } = req.body;

            console.log("Received data:", {
                email,
                password,
                passwordConfirm,
                lang
            });

            if (!email || !validator.isEmail(email)) {
                return res.status(400).json({
                    error: 'Incorrect mail format'
                });
            }

            const allowedLangs = ['ru', 'en', 'hi'];
            if (!allowedLangs.includes(lang)) {
                return res.status(400).json({
                    error: 'Invalid language selected'
                });
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
                return res.status(400).json({
                    errors: passwordErrors
                });
            }

            const existingUser = await User.findOne({
                where: {
                    email
                }
            }, {
                transaction
            });
            if (existingUser) {
                return res.status(400).json({
                    error: 'A user with this email already exists'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = await User.create({
                email,
                password: hashedPassword,
                lang,
                lives: 5
            }, {
                transaction
            });

            await transaction.commit();
            isTransactionFinished = true;

            const {
                accessToken,
                refreshToken
            } = this.generateTokens(newUser); // Генерация токенов
            res.status(201).json({
                user: newUser,
                accessToken,
                refreshToken
            });
        } catch (error) {
            console.error('Error registering user:', error);
            if (!isTransactionFinished) {
                await transaction.rollback();
            }
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    };

    // Логин пользователя
    async login(req, res) {
        const {
            email,
            password
        } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    email
                }
            });

            if (!user) {
                return res.status(400).json({
                    error: 'User not found'
                });
            }

            // console.log("Stored hashed password:", user.password);
            // console.log("Password to compare:", password);

            // const isPasswordValid = await bcrypt.compare( user.password,password); // Дождаться результата

            // if (!isPasswordValid) {
            //     return res.status(400).json({
            //         error: 'Invalid password'
            //     });
            // }

            const {
                accessToken,
                refreshToken
            } = this.generateTokens(user);
            await user.update({
                refreshToken
            });

            res.status(200).json({
                user,
                accessToken,
                refreshToken
            });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    }

async getUser(req, res) {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required' });
        }
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findOne({
            where: {
                id: decoded.id
            },
            attributes: ['id', 'email', 'role', 'level', 'lives', 'lang', 'createdAt', 'updatedAt'] // Указываем, какие поля возвращать
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



    async refresh(req, res) {
        const {
            refreshToken
        } = req.body;

        if (!refreshToken) {
            return res.status(401).json({
                error: 'Refresh token is required'
            });
        }

        try {
            const user = await User.findOne({
                where: {
                    refreshToken
                }
            });

            if (!user) {
                return res.status(403).json({
                    error: 'Invalid refresh token'
                });
            }

            jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        error: 'Invalid refresh token'
                    });
                }

                const newAccessToken = jwt.sign({
                    id: user.id,
                    email: user.email
                }, JWT_SECRET, {
                    expiresIn: JWT_EXPIRES_IN,
                });

                res.status(200).json({
                    accessToken: newAccessToken
                });
            });
        } catch (error) {
            console.error('Error during token refresh:', error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    }
    async check(req, res) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            res.status(200).json(decoded);
        } catch (error) {
            res.status(401).json({
                error: 'Invalid token'
            });
        }
    }
}

module.exports = new UserController();