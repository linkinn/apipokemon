const request = require('supertest');
const moongose = require('mongoose');

const factory = require('../../factories');

const app = require('../../../src/app');

const User = require('../../../src/app/schemas/userSchema');

describe('Session', () => {
  beforeEach(async () => {
    await User.remove();
  });

  it('should email and password login valid', async () => {
    await factory.create('User', {
      email: 'test@email.com'
    });

    const response = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'test@email.com',
        password: 'test1234'
      });

    expect(response.status).toBe(200);
  });

  it('should show error because email and passowrd not exist', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Please provide email and password!');
  });

  it('should show email or password invalid', async () => {
    await factory.create('User', {
      email: 'test@email.com'
    });

    const response = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'test2@email.com', password: 'test' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Incorrect email or password!');
  });

  it('should return token user', async () => {
    await factory.create('User', {
      email: 'test@email.com'
    });

    const response = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'test@email.com', password: 'test1234' });

    expect(response.body).toHaveProperty('token');
  });

  it('should access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      email: 'test@email.com'
    });

    const token = user.generateToken(user._id);

    const response = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not acess private routes when not authenticated', async () => {
    const response = await request(app).get('/api/v1/users');

    expect(response.status).toBe(401);
  });

  it('should not access private routes with token invalid', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer 12345`);

    expect(response.status).toBe(401);
  });

  it('should not access private routes with token id invalid', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDgzY2Q5NDBlODFkMmZhNGI5M2FlZiIsImlhdCI6MTU3NDQ1MjQ0MSwiZXhwIjoxNTc1MDU3MjQxfQ.GaCg130vKak7CS0o8DQNxsLeEiw49S0gGQPe0wYOweM';

    const response = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      'The user belonging to this user does no longer exist.'
    );
  });

  afterAll(() => {
    moongose.connection.close();
  });
});
