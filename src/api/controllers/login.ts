import { Request, Response } from 'express';

import { app } from '../register';
import { RegisterInput } from '../../app/register/register.in';
import { RegisterPresenter, RegisterPresenterOutput } from '../presenter/register/register.presenter';
import { RegisterInteractor } from '../../app/register/register.interactor';

import '../config/passport';

export const getLogin = (req: Request, res: Response): void => {
  res.render('login/index.html');
};

export const handleLogin = (req: Request, res: Response): void => {
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
  res.render('login/register.html');
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
    res.end(e);
  }
};
