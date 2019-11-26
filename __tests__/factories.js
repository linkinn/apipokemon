/* eslint-disable */
const faker = require('faker');
const { factory } = require('factory-girl');

const User = require('../src/app/schemas/userSchema');
const Pokemon = require('../src/app/schemas/pokemonSchema');

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: 'test1234',
  passwordConfirm: 'test1234'
});

factory.define('Pokemon', Pokemon, {
  name: faker.internet.userName(),
  color: faker.color.colorName(),
  type: ['plant', 'monster'],
  weight: faker.base.numberBetween($min = 1, $max = 300),
  height: faker.base.numberBetween($min = 1, $max = 100),
  abilities: ['unnerve', 'pressure']
});

module.exports = factory;
