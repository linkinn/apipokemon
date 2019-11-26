const { Router } = require('express');

const PokemonController = require('../app/controllers/PokemonController');

const AuthMiddleware = require('../app/middlewares/authMiddleware');

const router = Router();

router.use(AuthMiddleware.protect);

router
  .route('/')
  .get(PokemonController.index)
  .post(PokemonController.store);

router
  .route('/:id')
  .get(PokemonController.show)
  .patch(PokemonController.update)
  .delete(PokemonController.delete);

module.exports = router;
