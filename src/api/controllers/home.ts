import { Request, Response } from 'express';

export const getIndex = (req: Request, res: Response): void => {
  res.render('home/index.html');
};
