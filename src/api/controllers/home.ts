import { Request, Response } from 'express';

export const getIndex = (req: Request, res: Response) => {
  res.set('Content-Type', 'text/html');
  res.send(`
      <h1>Home</h1>
      <ul>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
        <li><a href="/web">Authenticated Route</a></li>
      </ul>
    `);
  res.end();
};
