import express from 'express';
import bodyParser from 'body-parser';

import session from 'express-session';

import passport from 'passport';
import { ensureLoggedIn } from 'connect-ensure-login';
import * as loginController from './controllers/login';
import * as homeController from './controllers/home';

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
expressApp.get('/login', loginController.getLogin);
expressApp.post('/login', passport.authenticate('local'), loginController.handleLogin);

expressApp.get('/', homeController.getIndex);

expressApp.get('/auth', ensureLoggedIn(), async (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`
      <h1>Authed route</h1>
    `);
});

expressApp.listen(3000, () => {
  console.log('Express listening on 3000');
});
