import config from './config/config.js';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

import express from 'express';
const app = express();

app.use(sassMiddleware({
  src: path.join(__dirname, 'style'),
  dest: path.join(__dirname, 'public')
}));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});
app.use('/api', apiRouter);
app.use(express.static('public'));
app.listen(config.port, () => {
  console.info('Express listening on port ', config.port);
});
