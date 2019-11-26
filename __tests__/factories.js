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
  color: faker.internet.color(),
  type: ['plant', 'monster'],
  weight: faker.random.number(),
  height: faker.random.number(),
  abilities: ['unnerve', 'pressure']
});

module.exports = factory;
