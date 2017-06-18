let chai = require('chai');
let chaiHttp = require('chai-http');
import app from '../server';
let should = chai.should();

chai.use(chaiHttp);
var agent = chai.request.agent(app);
var movieId = '';
describe('Pages', () => {
  beforeEach((done) => {
     agent
     .post('/api/login')
     .send({
       username:'user1@gmail.com',
       password: 'password123'
     })
     .end((err, res) => {
       res.should.have.status(200);
       done();
     })
  });
  describe('Movies', () => {
    it('should load the home page', (done) => {
      agent
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should load the admin page', (done) => {
      agent
        .get('/admin')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should load the movies page', (done) => {
      agent
        .get('/movies')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

  });
});
