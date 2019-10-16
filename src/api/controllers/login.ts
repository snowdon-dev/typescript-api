import { Request, Response } from 'express';

import { app } from '../register';
import { RegisterInput } from '../../app/register/register.in';
import { RegisterPresenter, RegisterPresenterOutput } from '../presenter/register/register.presenter';
import { RegisterInteractor } from '../../app/register/register.interactor';

import passport from 'passport';
import '../config/passport';
import { IVerifyOptions } from 'passport-local';
import { NextFunction } from 'connect';

export const getLogin = (req: Request, res: Response) => {
  res.set('Content-Type', 'text/html');
  res.send(`
      <h1>Login</h1>
      <form action="/login" method="post">
      <div>
          <label>Email Address:</label>
          <input type="text" name="username"/>
      </div>
      <div>
          <label>Password:</label>
          <input type="password" name="password"/>
      </div>
      <div>
          <input type="submit" value="Log In"/>
      </div>
  </form>
    `);
  res.end();
};

export const handleLogin = (req: Request, res: Response) => {
  res.redirect('/web');
};

const register = async (input: RegisterInput): Promise<RegisterPresenterOutput> => {
  const presenter: RegisterPresenter = app.container.resolve<RegisterPresenter>('registerPresenter');
  const interator: RegisterInteractor = app.container.resolve<RegisterInteractor>('registerInteractor');
  const response = await interator.execute(input); // @todo don't rely on interator implementation
  const output = await presenter.present(response);
  return output;
};

export const getRegister = async (req: Request, res: Response): Promise<void> => {
  res.set('Content-Type', 'text/html');
  res.send(`
    <h1>Register</h1>
    <form action="/register" method="post">
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Email:</label>
        <input type="email" name="email"/>
    </div>
    <div>
        <label>First Name:</label>
        <input type="text" name="firstname"/>
    </div>
    <div>
        <label>Last Name:</label>
        <input type="text" name="lastname"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Register"/>
    </div>
</form>
  `);
  res.end();
};

export const postRegister = async (req: Request, res: Response): Promise<void> => {
  const input: RegisterInput = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const output: RegisterPresenterOutput = await register(input);
    if (output) {
      res.redirect('/login');
    } else {
      res.redirect('/register');
    }
  } catch (e) {
    res.end(e.toString());
  }
};
