import express from 'express';
import bodyParser from 'body-parser';

import session from 'express-session';

import passport from 'passport';

import * as loginController from './controllers/login';
import * as homeController from './controllers/home';

import { web as webRouter } from './web';

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

expressApp.use('/web', webRouter);

expressApp.listen(3000, () => {
  console.log('Express listening on 3000');
});
