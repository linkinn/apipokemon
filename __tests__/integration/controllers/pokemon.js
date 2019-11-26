const request = require('supertest');

const factory = require('../../factories');

const app = require('../../../src/app');

const User = require('../../../src/app/schemas/userSchema');

describe('Me', () => {
  beforeEach(async () => {
    await User.remove();
  });

  it('should create a pokemon', async () => {
    const pokemon = await factory.attrs('Pokemon');

    console.log(pokemon);

    const response = await request(app)
      .post('/api/v1/pokemons/')
      .send(pokemon);

    expect(response.body.data).toHaveProperty('name');
  });
});
