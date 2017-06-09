import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../../config';

let mdb;
MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  mdb = db;
});
export const authenticate = (username, password) => {
  return mdb.collection('user')
     .findOne({ username, password })
     .then(result => result);
};
