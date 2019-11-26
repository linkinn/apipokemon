const { Router } = require('express');

const PokemonController = require('../app/controllers/PokemonController');

const router = Router();

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
