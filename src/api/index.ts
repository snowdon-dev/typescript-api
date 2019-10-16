import express from 'express';
import bodyParser from 'body-parser';

import passport from 'passport';

import { RegisterInput } from '../app/register/register.in';
import { RegisterPresenterOutput } from './presenter/register/register.presenter';

import { ensureLoggedIn } from 'connect-ensure-login';

import session from 'express-session';

import './config/passport';

import * as loginController from './controllers/login';

const expressApp: express.Application = express();

expressApp.use(
  session({
    secret: 'dale',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }),
);

expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json());

expressApp.use(passport.initialize());
expressApp.use(passport.session());


expressApp.get('/register', loginController.getRegister);
expressApp.post('/register', loginController.postRegister);

expressApp.get('/', async (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`
    <h1>Home</h1>
    <ul>
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
      <li><a href="/authed">Authenticated Route</a></li>
    </ul>
  `);
  res.end();
});

expressApp.get('/login', loginController.getLogin);

expressApp.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), async (req, res) => {
  res.redirect('/authed');
});

expressApp.get('/authed', ensureLoggedIn(), async (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`
      <h1>Authed route</h1>
    `);
});

expressApp.listen(3000, () => {
  console.log('Express listening on 3000');
});
