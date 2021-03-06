import { Router } from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';

import * as webController from './controllers/web';

const app = Router();

app.use(ensureLoggedIn());

app.get('/', webController.getIndex);

app.get('/listing', (req, res) => {
  res.send(`
  <h1>Link listings</h1>
  `);
  res.end();
});

export const web = app;
