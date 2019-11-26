const { Router } = require('express');

const userRouter = require('./userRouter');

const router = Router();

router.use('/api/v1/users', userRouter);

module.exports = router;
