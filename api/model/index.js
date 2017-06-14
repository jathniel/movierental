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
  .find().limit(10).toArray()
  .then(result => result);
};
const findMoviesById = (id) => {
  return mdb.collection('Movies')
  .findOne({ id: Number(id)})
  .then(result => result);
};
const searchMovies = (title='', limit=10) => {
  return mdb.collection('Movies')
  .find({
    title: {$regex:title, $options: 'i'}
  }).limit(limit).toArray()
  .then(result => result);
};
const findCastByMovieId = (movieId) => {
  return mdb.collection('Cast')
  .find({movieId:Number(movieId)}).project({
    name: 1,
    id: 1
  }).toArray()
  .then(result => result);
};
const rentMovie = (movieId, userId, quantity) => {
  return mdb.collection('rent').insertOne({movieId: Number(movieId), userId}).then(() => {
    return mdb.collection('Movies')
    .updateOne({id:Number(movieId)},{$set:{quantity}})
    .then(result => result);
  });
};
const checkRented = (movieId, userId) => {
  return mdb.collection('rent')
     .findOne({movieId: Number(movieId), userId})
     .then(result => result);
};
const deleteCast = (id) => {
  return mdb.collection('Cast')
     .deleteOne({id: Number(id)})
     .then(result => result);
};
const addMovies = (form, casts) => {
  return mdb.collection('Movies').count()
  .then((count) => {
    form.id = count + 1;
    return mdb.collection('Movies')
     .insertOne(form)
     .then(() => {
       return mdb.collection('Cast').count()
       .then(castCount => {
         casts.forEach((cast) => {
           cast.movieId = form.id;
           cast.id = castCount;
           castCount++;
           console.log(cast);
           return mdb.collection('Cast')
              .insertOne(cast)
              .then((result) => result);
         });
       });
     });
  });
};
export default {
  authenticate,
  findMovies,
  searchMovies,
  findMoviesById,
  findCastByMovieId,
  rentMovie,
  checkRented,
  deleteCast,
  addMovies
};
