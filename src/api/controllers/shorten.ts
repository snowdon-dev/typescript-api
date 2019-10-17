import { Request, Response } from 'express';

import { app } from '../register';
import { ShortenInteractor } from '../../app/shorten/shorten.interactor';
import { ShortenInput } from '../../app/shorten/shorten.in';

export const getShorten = async (req: Request, res: Response): Promise<void> => {
  const interactor = app.container.resolve<ShortenInteractor>('shortenInteractor');
  const request: ShortenInput = {
    awinaffid: req.query.awinaffid,
    awinmid: req.query.awinmid,
    platform: req.query.platform,
    endpoint: decodeURIComponent(req.query.p)
      // unsure if required but..
      .replace('[[', '')
      .replace(']]', ''),
  };
  const repsonse = await interactor.execute(request);
  res.json(repsonse);
};
