import express from 'express';
import { authenticate } from '../model';


const apiRouter = express.Router();

apiRouter.get('/', (req, res)=> {
  res.send({data:[]});
});
apiRouter.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(username && password) {
    authenticate(username, password)
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
