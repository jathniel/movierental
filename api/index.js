import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config/config';

let mdb;
MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  mdb = db;
});
const apiRouter = express.Router();

apiRouter.get('/', (req, res)=> {
  res.send({data:[]});
});
apiRouter.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(username && password) {
    mdb.collection('user')
       .findOne({ username, password })
       .then(user => {
         if(user) {
           req.session.user = user;
           res.status(200).send('ok');
         } else {
           res.status(404).send('failed');
         }
       })
       .catch(() => res.status(403).send('failed'));
  } else {
    res.send('failed');
  }
});
export default apiRouter;
