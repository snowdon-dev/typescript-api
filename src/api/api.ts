import { Router } from 'express';
import * as shortenController from './controllers/shorten';

const app = Router();

app.get('/shorten', shortenController.requestShorten);
app.post('/shorten', shortenController.requestShorten);

export const api = app;
