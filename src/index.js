import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

import config from './config';
import routes from './routes';
import Account from './model/account';

const app = express();
app.server = http.createServer(app);

// middleware
app.use(bodyParser.json({
    limit: config.bodyLimit
}));

// passport config
app.use(passport.initialize());
passport.use(new LocalStrategy({
  usernameField: 'email',
  passportField: 'passport'
  }, Account.authenticate())
);
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// api routes v1
app.use('/api/v1', routes);

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

export default app;
