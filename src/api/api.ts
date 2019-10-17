import { Router } from 'express';
import * as shortenController from './controllers/shorten';

const app = Router();

app.get('/shorten', shortenController.getShorten);

export const api = app;
