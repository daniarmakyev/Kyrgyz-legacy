const Router = require('express');
const userRouter = require('./userRoutes');
const wordRouter = require('./wordRoutes');
const router = new Router();

router.use('/users', userRouter);
router.use('/words', wordRouter)
module.exports = router;
