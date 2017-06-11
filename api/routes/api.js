import express from 'express';
import model from '../model';


const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send({data:[]});
});

apiRouter.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(username && password) {
    model.authenticate(username, password)
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

apiRouter.get('/movies', (req, res) => {
  model.findMovies()
  .then(result => {
    res.status(200).send(result);
  })
  .catch(() => res.status(403).send('failed'));
});
apiRouter.get('/movies/:id', (req, res) => {

  model.findMoviesById(req.params.id)
  .then(result => {
    model.findCastByMovieId(req.params.id).then(resp => {
      result.cast = resp;
      res.status(200).send(result);
    }).catch(() => res.status(403).send('failed'));
  }).catch(() => res.status(403).send('failed'));
});
apiRouter.post('/movies', (req, res)=> {
  const search = req.body.search;
  const limit = req.body.limit;
  model.searchMovies(search, limit)
  .then(result => {
    res.status(200).send(result);
  })
  .catch(() => res.status(403).send('failed'));
});
export default apiRouter;
