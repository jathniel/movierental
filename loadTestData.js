import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config/config';

MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  db.collection('user').insertMany([
    {
      id: 1,
      username: 'user1@gmail.com',
      password: 'password123',
      role: 'user'
    },
    {
      id: 2,
      username: 'user2@gmail.com',
      password: 'password123',
      role: 'user'
    },
    {
      id: 3,
      username: 'admin1@gmail.com',
      password: 'password123',
      role: 'admin'
    },
    {
      id: 4,
      username: 'admin2@gmail.com',
      password: 'password123',
      role: 'admin'
    }
  ]).then(response => {
    console.info('info', response.insertedCount);
    db.close();
  });
});
