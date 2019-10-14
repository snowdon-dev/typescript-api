import express from 'express';
import bodyParser from 'body-parser';
import { app } from './register';
import { RegisterInput } from '../app/register/register.in';
import { RegisterPresenter, RegisterPresenterOutput } from './presenter/register/register.presenter';
import { RegisterInteractor } from '../app/register/register.interactor';

const expressApp: express.Application = express();

expressApp.use(bodyParser.urlencoded());
expressApp.use(bodyParser.json());

const register = async (input: RegisterInput): Promise<RegisterPresenterOutput> => {
  const presenter: RegisterPresenter = app.container.resolve<RegisterPresenter>('registerPresenter');
  const interator: RegisterInteractor = app.container.resolve<RegisterInteractor>('registerInteractor');
  const response = await interator.execute(input); // @todo don't rely on interator implementation
  const output = await presenter.present(response);
  return output;
};

expressApp.post('/user', async (req, res) => {
  const input: RegisterInput = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const output: RegisterPresenterOutput = await register(input);
    res.json(output);
  } catch (e) {
    res.end(e.toString());
  }
});

expressApp.listen(3000, () => {
  console.log('Express listening on 3000');
});
