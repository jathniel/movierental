import express from 'express';
import model from '../model';
import multer from 'multer';
import {ObjectID } from 'mongodb';
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
  if(req.session.user) {
    model.findMovies()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(() => res.status(403).send('failed'));
  } else {
    res.status(403).send('failed');
  }
});
apiRouter.get('/movies/:id', (req, res) => {
  if(req.session.user) {
    model.findMoviesById(req.params.id)
    .then(result => {
      model.checkRented(req.params.id, req.session.user.id).then(rented => {
        if(rented) {
          result.isRented = true;
          res.status(200).send(result);
        } else {
          result.isRented = false;
          res.status(200).send(result);
        }

      });
    }).catch(() => res.status(403).send('failed'));
  } else {
    res.status(403).send('failed');
  }
});
apiRouter.post('/movies', (req, res)=> {
  if(req.session.user) {
    const search = req.body.search;
    const limit = req.body.limit;
    model.searchMovies(search, limit)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(() => res.status(403).send('failed'));
  } else {
    res.status(403).send('failed');
  }
});
apiRouter.post('/movies/add', (req, res)=> {
  if(!req.session.user) {
    res.status(403).send('failed');
  }
  const form = req.body.form;
  model.addMovies(form)
  .then(result => {
    res.status(200).send(result);
  })
  .catch(() => res.status(403).send('failed'));
});
apiRouter.post('/rent', (req, res)=> {
  if(!req.session.user) {
    res.status(403).send('failed');
  }
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

apiRouter.delete('/movies/:id', (req, res) => {
  if(!req.session.user) {
    res.status(403).send('failed');
  }
  if(req.params.id) {
    model.deleteMovie(req.params.id)
    .then(result => {
      res.status(200).send(result);
    })
    .catch((e) => res.status(403).send(e));
  } else {
    res.status(404).send('failed');
  }
});
apiRouter.put('/movies/:id', (req, res)=> {
  if(!req.session.user) {
    res.status(403).send('failed');
  }
  if(req.params.id) {
    const form = req.body.form;
    model.updateMovie(req.params.id, form)
    .then(result => {
      res.status(200).send(result);
    })
    .catch((e) => res.status(403).send(e));
  } else {
    res.status(404).send('failed');
  }
});

apiRouter.put('/movies/:id', (req, res)=> {
  if(!req.session.user) {
    res.status(403).send('failed');
  }
  if(req.params.id) {
    const form = req.body.form;
    model.updateMovie(req.params.id, form)
    .then(result => {
      res.status(200).send(result);
    })
    .catch((e) => res.status(403).send(e));
  } else {
    res.status(404).send('failed');
  }
});
const storage = multer.diskStorage({
  destination: './public/images/movies',
  filename(req, file, cb) {
    cb(null, `${ObjectID()}${file.originalname}`);
  },
});

const upload = multer({ storage });
apiRouter.post('/files', upload.single('file'), (req, res) => {
  const file = req.file; // file passed from client
  res.status(200).send(`/images/movies/${file.filename}`);
});
apiRouter.get('/movies/:id/rating', (req, res) => {
  if(!req.session.user) {
    res.status(403).send('failed');
  }
  model.getMovieRating(req.params.id)
  .then(result => {
    res.status(200).send({data:result.toString()});
  })
  .catch((e) => res.status(403).send(e));
});
apiRouter.post('/movies/:id/rating', (req, res) => {
  if(!req.session.user) {
    res.status(403).send('failed');
  }
  let form = {
    rating: req.body.rating,
    movieId: req.params.id,
    userId: req.session.user.id
  };
  model.rateMovie(form)
  .then(result => {
    res.status(200).send(result);
  })
  .catch((e) => res.status(403).send(e));
});
export default apiRouter;
