import { Request, Response } from 'express';

import { app } from '../register';
import { ShortenInteractor } from '../../app/shorten/shorten.interactor';
import { ShortenInput } from '../../app/shorten/shorten.in';

export const requestShorten = async (req: Request, res: Response): Promise<void> => {
  const interactor = app.container.resolve<ShortenInteractor>('shortenInteractor');
  const lookup = req.method === 'POST' ? 'body' : 'query';
  const request: ShortenInput = {
    awinaffid: req[lookup].awinaffid,
    awinmid: req[lookup].awinmid,
    platform: req[lookup].platform,
    endpoint:
      req[lookup].p &&
      decodeURIComponent(req[lookup].p)
        // unsure if required but..
        .replace('[[', '')
        .replace(']]', ''),
  };
  try {
    const repsonse = await interactor.execute(request);
    res.json(repsonse);
    return;
  } catch (e) {
    res.json(e.toString());
  }
};
