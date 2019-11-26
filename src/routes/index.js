const { Router } = require('express');

const userRouter = require('./userRouter');
const pokemonRouter = require('./pokemonRouter');

const router = Router();

router.use('/api/v1/users', userRouter);
router.use('/api/v1/pokemons', pokemonRouter);

module.exports = router;
