import config from './config';
import apiRouter from './api/routes/api';
import router from './api/routes/pages';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import bodyParser from 'body-parser';

import session from 'express-session';
import express from 'express';
const app = express();

app.use(bodyParser.json());

app.use(session({ secret: 'movie' }));
app.use(sassMiddleware({
  src: path.join(__dirname, 'style'),
  dest: path.join(__dirname, 'public')
}));


app.set('view engine', 'ejs');
app.use('/api', apiRouter);
app.use('/', router);
app.use(express.static('public'));
app.listen(config.port, () => {
  console.info('Express listening on port ', config.port);
});
export default app;
