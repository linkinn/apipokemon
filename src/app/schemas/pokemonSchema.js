const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please give pokemon a name!']
  },
  color: {
    type: String,
    required: [true, 'Please provide a color!']
  },
  type: {
    type: Array,
    required: [true, 'Please provide a type!']
  },
  weight: {
    type: Number,
    required: [true, 'Please provide a weight!']
  },
  height: {
    type: Number,
    required: [true, 'Please provide a height!']
  },
  abilities: {
    type: Array,
    required: [true, 'Please provide a abilities!']
  }
});

pokemonSchema.plugin(uniqueValidator);

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
