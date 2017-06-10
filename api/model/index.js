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
     .find().toArray()
     .then(result => result);
};
export default {
  authenticate,
  findMovies
};
