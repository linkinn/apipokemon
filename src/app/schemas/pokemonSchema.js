const mongoose = require('mongoose');

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

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
