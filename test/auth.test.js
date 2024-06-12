// test/auth.test.mjs
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js'; // Make sure to export your Express app in app.mjs

chai.use(chaiHttp);
const { expect } = chai;

describe('Authentication API', () => {
  it('should register a new user', (done) => {
    chai.request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should login the user', (done) => {
    chai.request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should get the user profile', (done) => {
    chai.request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        const token = res.body.token;
        chai.request(app)
          .get('/api/auth/profile')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('email').eql('test@example.com');
            done();
          });
      });
  });
});
