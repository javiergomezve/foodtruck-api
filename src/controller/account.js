import { Router } from 'express';
import passport from 'passport';

import { generateAccessToken, respond, authenticate } from '../middleware/auth';
import Account from '../model/account';

export default ({config, db}) => {
  const api = Router();

  api.post('/register', (req, res) => {
    Account.register(new Account({
      username: req.body.email,
    }), req.body.password, (err, account) => {
      if (err) {
        if (err.name === "UserExistsError") {
          console.log("User Exists");
          return res.status(409).send(err);
        } else {
          return res.status(500).send(err);
        }
      }

      passport.authenticate('local', {
        session: false
      })(req, res, () => {
          res.status(200).send('Successfully created new account');
      });
    });
  });

  api.post('/login',passport.authenticate(
    'local', {
     session: false,
     scope: []
    }), generateAccessToken, respond);

  api.get('/logout', authenticate, (req, res) => {
    req.logout();
    res.status(200).send('Successfully logout');
  });

  api.get('/me', authenticate, (req, res) => {
     res.status(200).json(req.user);
  });

  return api;
}
