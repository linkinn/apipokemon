const request = require('supertest');

const factory = require('../../factories');

const app = require('../../../src/app');

const User = require('../../../src/app/schemas/userSchema');

describe('Password Update', () => {
  beforeEach(async () => {
    await User.remove();
  });

  it('should check if old password is correct', async () => {
    const user = await factory.create('User', {
      email: 'admin@email.com'
    });

    const response = await request(app)
      .post('/api/v1/users/login')
      .send({ email: user.email, password: 'test1234' });

    const responseUpdate = await request(app)
      .patch('/api/v1/users/updateMyPassowrd')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send({
        oldPassword: 'test1234',
        password: 'pass1234',
        passwordConfirm: 'pass1234'
      });

    expect(responseUpdate.status).toBe(200);
  });

  it('should check if old password is incorrect', async () => {
    const user = await factory.create('User', {
      email: 'admin@email.com'
    });

    const response = await request(app)
      .post('/api/v1/users/login')
      .send({ email: user.email, password: 'test1234' });

    const responseUpdate = await request(app)
      .patch('/api/v1/users/updateMyPassowrd')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send({
        oldPassword: 'passwordincorrect'
      });

    expect(responseUpdate.status).toBe(401);
    expect(responseUpdate.body.message).toBe('Your current password is wrong');
  });
});
