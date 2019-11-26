const Pokemon = require('../schemas/pokemonSchema');

const FactoryController = require('./FactoryController');

exports.index = FactoryController.index(Pokemon);

exports.show = FactoryController.show(Pokemon);

exports.store = FactoryController.store(Pokemon);

exports.update = FactoryController.update(Pokemon);

exports.delete = FactoryController.delete(Pokemon);
// async (req, res) => {
//   try {
//     const pokemon = await Pokemon.findByIdAndDelete(req.params.id);

//     if (!pokemon) {
//       throw Error('No pokemon find with that ID!');
//     }

//     return res.status(204).json({ status: 'success' });
//   } catch (error) {
//     return res.status(404).json({ status: 'error', message: error.message });
//   }
// };
