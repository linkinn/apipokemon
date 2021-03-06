const request = require('supertest');

const factory = require('../../factories');

const app = require('../../../src/app');

const User = require('../../../src/app/schemas/userSchema');

const getToken = async () => {
  const response = await request(app)
    .post('/api/v1/users/login')
    .send({ email: 'test@email.com', password: 'test1234' });

  return response.body.token;
};

describe('Me', () => {
  beforeEach(async () => {
    await User.remove();
  });

  it('should register an user', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body.data.user).toHaveProperty('email');
  });

  it('should register an user and generate token', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should not register an user with duplicated email', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/api/v1/users/signup')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should update the user data', async () => {
    await factory.create('User', {
      email: 'test@email.com'
    });

    const token = await getToken();

    const responseUpdate = await request(app)
      .patch('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'test2@email.com' });

    expect(responseUpdate.status).toBe(200);
    expect(responseUpdate.body.data.user.email).toBe('test2@email.com');
  });

  it('should not update the user data with a registered email', async () => {
    await factory.create('User', {
      email: 'test1@email.com'
    });
    await factory.create('User', {
      email: 'test@email.com'
    });

    const token = await getToken();

    const responseUpdate = await request(app)
      .patch('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'test1@email.com' });

    expect(responseUpdate.status).toBe(400);
  });

  it('should not update the user data if this route contains the password', async () => {
    await factory.create('User', {
      email: 'test@email.com'
    });

    const token = await getToken();

    const responseUpdate = await request(app)
      .patch('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ password: 'pass1234' });

    expect(responseUpdate.status).toBe(400);
    expect(responseUpdate.body.message).toBe(
      'This route is not for password updates. Please use /updateMyPassword.'
    );
  });

  it('should get the user data', async () => {
    await factory.create('User', {
      email: 'test@email.com'
    });

    const token = await getToken();

    const responseGet = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(responseGet.status).toBe(200);
    expect(responseGet.body.data.user.email).toBe('test@email.com');
  });
});
