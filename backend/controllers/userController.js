const { User } = require('../models/models');
const sequelize = require('../db');
const validator = require('validator');
const bcrypt = require('bcrypt');

class UserController {
    async register(req, res) {
        const transaction = await sequelize.transaction();
        try {
            const { email, password, passwordConfirm } = req.body;
            
            console.log("Received data:", { email, password, passwordConfirm }); // Добавьте это для отладки
    
            if (!email || !validator.isEmail(email)) {
                await transaction.rollback();
                return res.status(400).json({ error: 'Incorrect mail format' });
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
                lives: 5
            }, { transaction });
    
            await transaction.commit(); 
            res.status(201).json(newUser);
        } catch (error) {
            await transaction.rollback(); 
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    

    async login(req, res) {
        // Логика для логина
    }

    async check(req, res) {
        const { id } = req.query;
        res.json(id);
    }
}

module.exports = new UserController();




// router.get('/', async (req, res) => {
//     try {
//         const users = await User.findAll();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Получить пользователя по ID
// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findByPk(req.params.id);
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Создать нового пользователя
// router.post('/register', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const newUser = await User.create({ email, password, role, lives: 5 }); // Устанавливаем 5 жизней по умолчанию
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password, role } = req.body;
//         const newUser = await User.create({ email, password, role, lives: 5 }); 
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// // Обновить пользователя по ID
// router.put('/:id', async (req, res) => {
//     try {
//         const user = await User.findByPk(req.params.id);
//         if (user) {
//             const { email, password, role, lives } = req.body;
//             user.email = email !== undefined ? email : user.email;
//             user.password = password !== undefined ? password : user.password;
//             user.role = role !== undefined ? role : user.role;
//             user.lives = lives !== undefined ? lives : user.lives; // Не меняем количество жизней при обычном обновлении
//             await user.save();
//             res.json(user);
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Частично обновить пользователя по ID
// router.patch('/:id', async (req, res) => {
//     try {
//         const user = await User.findByPk(req.params.id);
//         if (user) {
//             const { email, password, role, lives } = req.body;
//             if (email !== undefined) user.email = email;
//             if (password !== undefined) user.password = password;
//             if (role !== undefined) user.role = role;
//             if (lives !== undefined) user.lives = lives; // Позволяем менять количество жизней только через этот маршрут
//             await user.save();
//             res.json(user);
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Удалить пользователя по ID
// router.delete('/:id', async (req, res) => {
//     try {
//         const user = await User.findByPk(req.params.id);
//         if (user) {
//             await user.destroy();
//             res.status(204).end();
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// module.exports = router;