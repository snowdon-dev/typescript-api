import { Request, Response } from 'express';

export const getIndex = (req: Request, res: Response): void => {
  res.set('Content-Type', 'text/html');
  res.send(`
        <h1>Authed route</h1>
      `);
};
