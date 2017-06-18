let chai = require('chai');
let chaiHttp = require('chai-http');
import app from '../server';
let should = chai.should();

chai.use(chaiHttp);
var agent = chai.request.agent(app);
var movieId = '';
describe('Movies', () => {
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
  describe('Movies API', () => {
    it('should list ALL Movies on /api/movies GET', (done) => {
      agent
        .get('/api/movies')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an.array;
          movieId = res.body[0]._id;
          done();
        });
    });
    it('should list a SINGLE Movie on /api/movie/<id> GET', (done) => {
      agent
        .get(`/api/movies/${movieId}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should add a SINGLE Movie on /api/movie/add POST', (done) => {
      agent
        .post('/api/movies/add')
        .send({form:{
          'title': 'Amityville The Awakening',
          'image': '/images/movies/1.jpg',
          'synopsis' : 'When some footage dating back to 1976 is discovered, the case of the haunted house in Amityville is reopened. An ambitious woman who is working as a television news intern seizes the opportunity to advance her career and is soon leading a team of journalists, clergymen, and paranormal researchers into the house, but she may have unwittingly opened a door to the unreal that she will never be able to close.',
          'director': 'Franck Khalfoun',
          'year': 2017,
          'quantity': 10,
          'casts':['Bella Thorne', 'Cameron Monaghan', 'Jennifer Jason Leigh', 'Thomas Mann', 'Mckenna Grace']
        }})
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should update a SINGLE Movie on /api/movie/<id> PUT', (done) => {
      agent
        .put(`/api/movies/${movieId}`)
        .send({form:{
          'title': 'Change due to test',
          'image': '/images/movies/1.jpg',
          'synopsis' : 'When some footage dating back to 1976 is discovered, the case of the haunted house in Amityville is reopened. An ambitious woman who is working as a television news intern seizes the opportunity to advance her career and is soon leading a team of journalists, clergymen, and paranormal researchers into the house, but she may have unwittingly opened a door to the unreal that she will never be able to close.',
          'director': 'Franck Khalfoun',
          'year': 2017,
          'quantity': 10,
          'casts':['Bella Thorne', 'Cameron Monaghan', 'Jennifer Jason Leigh', 'Thomas Mann', 'Mckenna Grace']
        }})
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should delete a SINGLE Movie on /api/movie/<id> DELETE', (done) => {
      agent
        .delete(`/api/movies/${movieId}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
describe('Rent', () => {
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
  describe('Rent API', () => {
    it('should list ALL Movies on /api/movies GET', (done) => {
      agent
        .get('/api/movies')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an.array;
          movieId = res.body[0]._id;
          done();
        });
    });
    it('should list a SINGLE Movie on /api/movie/<id> GET', (done) => {
      agent
        .get(`/api/movies/${movieId}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should rent a  Movie on /api/rent POST', (done) => {
      agent
        .post('/api/movies')
        .send({
          movieId: movieId,
          quantity: 10
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an.array;
          movieId = res.body[0]._id;
          done();
        });
    });
  });
});
describe('Rate Movie API', () => {
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
  describe('Rent API', () => {
    it('should list ALL Movies on /api/movies GET', (done) => {
      agent
        .get('/api/movies')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an.array;
          movieId = res.body[0]._id;
          done();
        });
    });
    it('should list a SINGLE Movie on /api/movies/<id> GET', (done) => {
      agent
        .get(`/api/movies/${movieId}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should get the Rate of the Movie on /api/movies/<id>/rating GET', (done) => {
      agent
        .get(`/api/movies/${movieId}/rating`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should Rate a  Movie on /api/movies/<id>/rating POST', (done) => {
      agent
        .post(`/api/movies/${movieId}/rating`)
        .send({
          rating: 5
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
describe('Access to Movies without login', () => {

  describe('Movies API', () => {
    it('should fail list ALL Movies on /api/movies GET', (done) => {
      chai.request(app)
        .get('/api/movies')
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it('should fail to list a SINGLE Movie on /api/movie/<id> GET', (done) => {
      chai.request(app)
        .get(`/api/movies/${movieId}`)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it('should not add a SINGLE Movie on /api/movie/add POST', (done) => {
      chai.request(app)
        .post('/api/movies/add')
        .send({form:{
          'title': 'Amityville The Awakening',
          'image': '/images/movies/1.jpg',
          'synopsis' : 'When some footage dating back to 1976 is discovered, the case of the haunted house in Amityville is reopened. An ambitious woman who is working as a television news intern seizes the opportunity to advance her career and is soon leading a team of journalists, clergymen, and paranormal researchers into the house, but she may have unwittingly opened a door to the unreal that she will never be able to close.',
          'director': 'Franck Khalfoun',
          'year': 2017,
          'quantity': 10,
          'casts':['Bella Thorne', 'Cameron Monaghan', 'Jennifer Jason Leigh', 'Thomas Mann', 'Mckenna Grace']
        }})
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it('should not update a SINGLE Movie on /api/movie/<id> PUT', (done) => {
      chai.request(app)
        .put(`/api/movies/${movieId}`)
        .send({form:{
          'title': 'Change due to test',
          'image': '/images/movies/1.jpg',
          'synopsis' : 'When some footage dating back to 1976 is discovered, the case of the haunted house in Amityville is reopened. An ambitious woman who is working as a television news intern seizes the opportunity to advance her career and is soon leading a team of journalists, clergymen, and paranormal researchers into the house, but she may have unwittingly opened a door to the unreal that she will never be able to close.',
          'director': 'Franck Khalfoun',
          'year': 2017,
          'quantity': 10,
          'casts':['Bella Thorne', 'Cameron Monaghan', 'Jennifer Jason Leigh', 'Thomas Mann', 'Mckenna Grace']
        }})
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it('should not delete a SINGLE Movie on /api/movie/<id> DELETE', (done) => {
      chai.request(app)
        .delete(`/api/movies/${movieId}`)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
});
