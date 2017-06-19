import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', req.session.user);
});
router.get('/login', (req, res) => {
  res.render('login', req.session.user);
});
router.get('/movies', (req, res) => {
  if(req.session.user) {
    res.render('movies', req.session.user);
  } else {
    res.redirect('/');
  }
});
router.get('/admin', (req, res) => {
  if(req.session.user && req.session.user.role === 'admin') {
    res.render('admin', req.session.user);
  } else {
    res.redirect('/');
  }
});
router.get('/logout', (req, res)=> {
  req.session.destroy();
  res.redirect('/login');
});
export default router;
