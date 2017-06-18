import { MongoClient, ObjectID } from 'mongodb';
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
  .find().limit(10).toArray()
  .then(result => result);
};
const findMoviesById = (id) => {
  return mdb.collection('Movies')
  .findOne({ _id: ObjectID(id)})
  .then(result => result);
};
const searchMovies = (title='', limit=10) => {
  return mdb.collection('Movies')
  .find({
    title: {$regex:title, $options: 'i'}
  }).limit(limit).toArray()
  .then(result => result);
};

const rentMovie = (movieId, userId, quantity) => {
  return mdb.collection('rent').insertOne({movieId: movieId, userId}).then(() => {
    return mdb.collection('Movies')
    .updateOne({_id:ObjectID(movieId)},{$set:{quantity}})
    .then(result => result);
  });
};
const checkRented = (movieId, userId) => {
  return mdb.collection('rent')
     .findOne({movieId: movieId, userId})
     .then(result => result);
};

const addMovies = (form) => {
  return mdb.collection('Movies')
   .insertOne(form)
   .then((result) => result);
};
const deleteMovie = (id) => {
  return mdb.collection('Movies')
   .deleteOne({_id: ObjectID(id)})
   .then((result) => result);
};
const updateMovie = (id, form) => {
  return mdb.collection('Movies')
   .updateOne({_id: ObjectID(id)}, {$set: form})
   .then((result) => result);

};
const getMovieRating = (movieId) => {
  return mdb.collection('Rating')
  .count({movieId})
  .then(result => {
    return mdb.collection('Rating')
    .aggregate([{$match : {movieId}},
      {$match : {movieId}},
      {$group : {_id : null,
        total : {$sum : '$rating'}
      }
      }]).toArray()
      .then(sum => {
        if(sum.length <= 0) {
          return 0;
        }
        return (sum[0].total / result).toFixed(2);
      });
  });
};
const rateMovie = (form) => {
  return mdb.collection('Rating')
   .updateOne({userId: form.userId},
      {$set: form},
      {upsert:true})
   .then((result) => result);
};
export default {
  authenticate,
  findMovies,
  searchMovies,
  findMoviesById,
  rentMovie,
  checkRented,
  addMovies,
  deleteMovie,
  updateMovie,
  getMovieRating,
  rateMovie
};
