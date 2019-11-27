const request = require('supertest');

const app = require('../../../src/app');

const factory = require('../../factories');

const User = require('../../../src/app/schemas/userSchema');

const FactoryController = require('../../../src/app/controllers/FactoryController');

describe('Factory', () => {
  beforeEach(async () => {
    await User.remove();
  });

  it('should get a doc', async () => {
    const user = await factory.create('User');

    app.get('/factories/:id', FactoryController.show(User));
    const response = await request(app).get(`/factories/${user._id}`);

    expect(response.status).toBe(200);
    expect(response.body.data.doc.email).toBe(user.email);
  });

  it('should not get a doc with invalid id', async () => {
    app.get('/factories/:id', FactoryController.show(User));
    const response = await request(app).get(
      `/factories/5c8a1d5b0190b214360d9999`
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No document find with that ID!');
  });

  it('should get all docs', async () => {
    await factory.create('User', {
      email: 'teste1@email.com'
    });
    await factory.create('User');

    app.get('/factories', FactoryController.index(User));

    const response = await request(app).get('/factories');

    expect(response.status).toBe(200);
    expect(response.body.results).toBe(2);
  });

  it('should create a doc', async () => {
    const user = await factory.attrs('User');

    app.post('/factories', FactoryController.store(User));

    const response = await request(app)
      .post('/factories')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
  });

  it('should not create a duplicated doc', async () => {
    const user = await factory.attrs('User', {
      email: 'admin@email.com'
    });

    app.post('/factories', FactoryController.store(User));

    await request(app)
      .post('/factories')
      .send(user);

    const response = await request(app)
      .post('/factories')
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
  });

  it('should update a doc', async () => {
    const user = await factory.create('User');

    app.patch('/factories/:id', FactoryController.update(User));

    const response = await request(app)
      .patch(`/factories/${user._id}`)
      .send({ email: 'teste@email.com' });

    expect(response.status).toBe(200);
    expect(response.body.data.doc.email).toBe('teste@email.com');
  });

  it('should not update a doc with invalid id', async () => {
    app.patch('/factories/:id', FactoryController.update(User));

    const response = await request(app)
      .patch(`/factories/5c8a1d5b0190b214360d9999`)
      .send({ email: 'teste@email.com' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No document find with that ID!');
  });

  it('should delete a doc', async () => {
    const user = await factory.create('User');

    app.delete('/factories/:id', FactoryController.delete(User));

    const response = await request(app).delete(`/factories/${user._id}`);

    expect(response.status).toBe(204);
  });

  it('should not delete a doc with invalid id', async () => {
    app.delete('/factories/:id', FactoryController.delete(User));

    const response = await request(app).delete(
      `/factories/5c8a1d5b0190b214360d9999`
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No document find with that ID!');
  });
});
