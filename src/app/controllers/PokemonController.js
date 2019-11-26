const Pokemon = require('../schemas/pokemonSchema');

const FactoryController = require('./FactoryController');

exports.index = FactoryController.index(Pokemon);

exports.show = FactoryController.show(Pokemon);

exports.store = FactoryController.store(Pokemon);

exports.update = FactoryController.update(Pokemon);

exports.delete = FactoryController.delete(Pokemon);
