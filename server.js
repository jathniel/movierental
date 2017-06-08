import config from './config/config';
import apiRouter from './api';
import router from './config/routes';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import session from 'express-session';
import express from 'express';
const app = express();

app.use(bodyParser.json());
app.use(cookieParser);
// app.use(session({ secret: 'example' }));
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
