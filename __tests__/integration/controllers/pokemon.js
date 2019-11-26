const request = require('supertest');

const factory = require('../../factories');

const app = require('../../../src/app');

const Pokemon = require('../../../src/app/schemas/pokemonSchema');

describe('Pokemon', () => {
  beforeEach(async () => {
    await Pokemon.remove();
  });

  it('should get all pokemons', async () => {
    await factory.create('Pokemon', {
      name: 'mew'
    });
    await factory.create('Pokemon', {
      name: 'mewtwo'
    });

    const response = await request(app).get('/api/v1/pokemons/');

    expect(response.status).toBe(200);
    expect(response.body.results).toBe(2);
  });

  it('should get one pokemon by ID', async () => {
    const pokemon = await factory.create('Pokemon', {
      name: 'mew'
    });

    const response = await request(app).get(`/api/v1/pokemons/${pokemon._id}`);

    expect(response.status).toBe(200);
    expect(response.body.data.doc.name).toBe('mew');
  });

  it('should not get pokemon with ID invalid', async () => {
    const response = await request(app).get(
      '/api/v1/pokemons/5c8a1d5b0190b214360dc057'
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No document find with that ID!');
  });

  it('should create a pokemon', async () => {
    const pokemon = await factory.attrs('Pokemon');

    const response = await request(app)
      .post('/api/v1/pokemons/')
      .send(pokemon);

    expect(response.status).toBe(201);
    expect(response.body.data.doc).toHaveProperty('name');
  });

  it('should not create a pokemon with the duplicate name', async () => {
    const pokemon = await factory.attrs('Pokemon');

    await request(app)
      .post('/api/v1/pokemons/')
      .send(pokemon);

    const response = await request(app)
      .post('/api/v1/pokemons/')
      .send(pokemon);

    expect(response.status).toBe(400);
  });

  it('should update a pokemon by ID', async () => {
    const pokemon = await factory.create('Pokemon');

    const response = await request(app)
      .patch(`/api/v1/pokemons/${pokemon._id}`)
      .send({ name: 'mew' });

    expect(response.status).toBe(200);
    expect(response.body.data.doc.name).toBe('mew');
  });

  it('should not update a pokemon with the duplicate name', async () => {
    await factory.create('Pokemon', {
      name: 'mew'
    });

    const pokemon = await factory.create('Pokemon', {
      name: 'mewtwo'
    });

    const response = await request(app)
      .patch(`/api/v1/pokemons/${pokemon._id}`)
      .send({ name: 'mew' });

    expect(response.status).toBe(404);
  });

  it('should not update a pokemon with ID invalid', async () => {
    const response = await request(app)
      .patch('/api/v1/pokemons/5c8a1d5b0190b214360dc057')
      .send({ name: 'mew' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No document find with that ID!');
  });

  it('should delete a pokemon by ID', async () => {
    const pokemon = await factory.create('Pokemon');

    const response = await request(app).delete(
      `/api/v1/pokemons/${pokemon._id}`
    );

    expect(response.status).toBe(204);
  });

  it('should not delete a pokemon with ID invalid', async () => {
    const response = await request(app).delete(
      '/api/v1/pokemons/5c8a1d5b0190b214360dc057'
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No document find with that ID!');
  });
});
