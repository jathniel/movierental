import express from 'express';

const router = express.Router();

router.get('/', (req, res)=> {
  res.render('index');
});
router.get('/login', (req, res)=> {
  res.render('login');
});
router.get('/movies', (req, res)=> {
  if(req.session.user) {
    res.render('movies', req.session.user);
  } else {
    res.redirect('/');
  }
});


export default router;
