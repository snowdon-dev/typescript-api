import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import session from 'express-session';

import passport from 'passport';

import * as loginController from './controllers/login';
import * as homeController from './controllers/home';

import { web as webRouter } from './web';
import { api as apiRouter } from './api';

import { app } from './register';
import { FindLinkInteractor } from '../app/find-link/find-link.interactor';
import { FindLinkInput } from '../app/find-link/find-link.in';
import { RecordHitInteractor } from '../app/record-hit/record-hit.interactor';

const expressApp: express.Application = express();

const sessionMiddle = [
  session({
    secret: 'dale',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }),
  passport.initialize(),
  passport.session()
]

expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json());

expressApp.get('/register', sessionMiddle, loginController.getRegister);
expressApp.post('/register', sessionMiddle, loginController.postRegister);
expressApp.get('/login', sessionMiddle, loginController.getLogin);
expressApp.post('/login', sessionMiddle, passport.authenticate('local'), loginController.handleLogin);

expressApp.get('/', sessionMiddle, homeController.getIndex);

expressApp.use('/web', sessionMiddle, webRouter);
expressApp.use('/api', apiRouter);

/**
 * Takes links and redirects via the link entry
 */
expressApp.get(
  '/:uid([a-zA-Z0-9]{4})',
  async (req: Request, res: Response): Promise<void> => {
    const input: FindLinkInput = {
      uid: req.params.uid,
    };
    const getLink = app.container.resolve<FindLinkInteractor>('findLinkInteractor');
    const getLinkRes = await getLink.execute(input);
    const recordHit = app.container.resolve<RecordHitInteractor>('recordHitInteractor');
    const result = await recordHit.execute({ uid: req.params.uid });
    if (!result) {
      res.json({ error: 'Service unavaliable' });
      return;
    }
    if (getLinkRes.error) {
      res.json(getLinkRes);
      return;
    }
    res.redirect(getLinkRes.url);
    return;
  },
);

expressApp.listen(3000, () => {
  console.log('Express listening on 3000');
});
