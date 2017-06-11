import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../../config';

let mdb;
MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  mdb = db;
});
const authenticate = (username, password) => {
  return mdb.collection('user')
     .findOne({ username, password })
     .then(result => result);
};
const findMovies = () => {
  return mdb.collection('Movies')
  .find().limit(7).toArray()
  .then(result => result);
};
const findMoviesById = (id) => {
  return mdb.collection('Movies')
  .findOne({ id: Number(id) })
  .then(result => result);
};
const searchMovies = (title='', limit=7) => {
  return mdb.collection('Movies')
  .find({
    title: {$regex:title, $options: 'i'}
  }).limit(limit).toArray()
  .then(result => result);
};
const findCastByMovieId = (movieId) => {
  return mdb.collection('Cast')
  .find({movieId: Number(movieId)}).project({
    name: 1
  }).toArray()
  .then(result => result);
};
export default {
  authenticate,
  findMovies,
  searchMovies,
  findMoviesById,
  findCastByMovieId
};
