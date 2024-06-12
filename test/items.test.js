// test/items.test.mjs
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js'; // Make sure to export your Express app in app.mjs

chai.use(chaiHttp);
const { expect } = chai;

let token;

before((done) => {
  chai.request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'password123'
    })
    .end((err, res) => {
      token = res.body.token;
      done();
    });
});

describe('Items API', () => {
  let itemId;

  it('should create a new item', (done) => {
    chai.request(app)
      .post('/api/items')
      .set('Authorization', token)
      .send({
        title: 'Test Item',
        description: 'This is a test item',
        startingBid: 100,
        endDate: '2024-06-30'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        itemId = res.body.id;
        done();
      });
  });

  it('should retrieve all items', (done) => {
    chai.request(app)
      .get('/api/items')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should retrieve a single item by ID', (done) => {
    chai.request(app)
      .get(`/api/items/${itemId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('title').eql('Test Item');
        done();
      });
  });

  it('should update an item', (done) => {
    chai.request(app)
      .put(`/api/items/${itemId}`)
      .set('Authorization', token)
      .send({
        title: 'Updated Test Item'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('title').eql('Updated Test Item');
        done();
      });
  });

  it('should delete an item', (done) => {
    chai.request(app)
      .delete(`/api/items/${itemId}`)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
