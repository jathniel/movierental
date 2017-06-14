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
        res.status(200).send(user.role);
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
  if(req.session.user.id) {
    model.findMoviesById(req.params.id)
    .then(result => {
      model.findCastByMovieId(req.params.id).then(resp => {
        result.cast = resp;
        model.checkRented(req.params.id, req.session.user.id).then(rented => {
          if(rented) {
            result.isRented = true;
            res.status(200).send(result);
          } else {
            result.isRented = false;
            res.status(200).send(result);
          }
        });
      });
    }).catch(() => res.status(403).send('failed'));
  } else {
    res.status(403).send('failed');
  }
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
apiRouter.post('/movies/add', (req, res)=> {
  const form = req.body.form;
  const cast = req.body.cast;
  model.addMovies(form, cast)
  .then(result => {
    console.log(result);
    res.status(200).send(result);
  })
  .catch(() => res.status(403).send('failed'));
});
apiRouter.post('/rent', (req, res)=> {
  const movieId = req.body.movieId;
  const user = req.session.user.id;
  const quantity = req.body.quantity - 1;
  if(user && movieId) {
    model.rentMovie(movieId, user, quantity)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(() => res.status(403).send('failed'));
  } else {
    res.status(403).send('failed');
  }
});
apiRouter.delete('/cast/:id', (req, res) => {
  if(req.params.id) {
    model.deleteCast(req.params.id)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(() => res.status(403).send('failed'));
  } else {
    res.status(403).send('failed');
  }

});
export default apiRouter;
